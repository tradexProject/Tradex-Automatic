import { NextResponse } from 'next/server';
import { verifyAdmin } from '../../../../../backend/utils/verifyToken';
import { sequelize } from '../../../../../backend/utils/db-connect';
import { SubscriptionRequest } from '../../../../../backend/models/subscriptionRequest';
import { Code } from '../../../../../backend/models/code';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const tradeXLogo = `<span style="font-family: Arial, sans-serif; font-weight: 600; letter-spacing: 1px; color: #111;">Trade<span style="color: #1E90FF;">X</span></span>`;

// =========================================================================
// ⚙️ Support Link Configuration
// =========================================================================
const SUPPORT_LINK = "https://t.me/+6rlsxZgNZy1kNzM0";
// =========================================================================

export async function POST(req, { params }) {
  const auth = verifyAdmin(req);
  if (!auth.success) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  const body = await req.json();
  const { action, rejectReason } = body; 

  const transaction = await sequelize.transaction();

  try {
    const requestItem = await SubscriptionRequest.findByPk(id, { transaction });
    
    if (!requestItem) {
      await transaction.rollback();
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    if (requestItem.status !== 'pending') {
      await transaction.rollback();
      return NextResponse.json({ error: "This request has already been processed" }, { status: 400 });
    }

    if (action === 'reject') {
      if (!rejectReason) {
        await transaction.rollback();
        return NextResponse.json({ error: "Rejection reason is required" }, { status: 400 });
      }

      requestItem.status = 'rejected';
      await requestItem.save({ transaction });

      await transporter.sendMail({
        from: `TradeX Support <${process.env.EMAIL_USER}>`,
        to: requestItem.email,
        subject: 'Update regarding your TradeX subscription',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; color: #000; max-width: 500px; margin: 0 auto; border-radius: 8px;">
            <div style="margin-bottom: 20px; font-size: 24px; text-align: center;">${tradeXLogo}</div>
            <h2 style="color: #1E90FF; margin-top: 0; text-align: center;">Hello,</h2>
            <p>We regret to inform you that your subscription request for the <strong>${requestItem.planName}</strong> plan was not approved.</p>
            <div style="background: #fafafa; padding: 15px; border-left: 4px solid #ef4444; margin: 20px 0;">
              <strong>Reason:</strong> ${rejectReason}
            </div>
            <p>Transaction ID: <span style="font-family: monospace;">${requestItem.transactionId}</span></p>           
            <p style="margin-bottom: 5px;">Please review your payment details or contact ${tradeXLogo} Support.</p>        
            <p style="margin: 0; color: #666; font-size: 14px;">If you face any issues or have questions, please <a href="${SUPPORT_LINK}" style="color: #1E90FF; text-decoration: none; font-weight: bold;">contact our support team</a>.</p>
          </div>
        `
      });

      await transaction.commit();
      return NextResponse.json({ message: "Request rejected and user notified" }, { status: 200 });
    }

    if (action === 'approve') {
      const availableCode = await Code.findOne({
        where: { planName: requestItem.planName, isUsed: false },
        lock: transaction.LOCK.UPDATE,
        transaction
      });

      if (!availableCode) {
        await transaction.rollback();
        return NextResponse.json({ error: "No activation codes available for this plan. Please add inventory." }, { status: 400 });
      }

      availableCode.isUsed = true;
      availableCode.usedBy = requestItem.email; 
      availableCode.usedAt = new Date();
      await availableCode.save({ transaction });

      requestItem.status = 'approved';
      await requestItem.save({ transaction });

      await transporter.sendMail({
        from: `TradeX Support <${process.env.EMAIL_USER}>`,
        to: requestItem.email,
        subject: 'Your TradeX Subscription is Active! 🚀',
        html: `
          <div style="font-family: Arial, sans-serif; text-align: center; padding: 30px; border: 1px solid #eee; color: #000; max-width: 500px; margin: 0 auto; border-radius: 8px;">
            <div style="margin-bottom: 20px; font-size: 32px;">${tradeXLogo}</div>
            <h2 style="color: #1E90FF; margin-top: 0;">Welcome Aboard!</h2>
            <p>Your subscription for the <strong>${requestItem.planName}</strong> plan has been successfully approved.</p>
            
            <div style="background: #f4f4f4; color: #1E90FF; padding: 20px; font-size: 28px; font-weight: bold; letter-spacing: 4px; border-radius: 8px; margin: 30px auto; max-width: 400px; border: 1px solid #1E90FF;">
              ${availableCode.activationCode}
            </div>
            
            <p style="margin-bottom: 5px; color: #666; font-size: 14px;">Use this activation code to access your services.</p>
            <p style="margin: 0; color: #666; font-size: 14px;">If you face any issues or need assistance getting started, please <a href="${SUPPORT_LINK}" style="color: #1E90FF; text-decoration: none; font-weight: bold;">reach out to us</a>.</p>
          </div>
        `
      });

      await transaction.commit();
      return NextResponse.json({ message: "Request approved and code sent to user" }, { status: 200 });
    }

  } catch (error) {
    await transaction.rollback();
    console.error("TradeX Processing Request Error:", error);
    return NextResponse.json({ error: "Internal server error during request processing" }, { status: 500 });
  }
}
