import { NextResponse } from 'next/server';
import { SubscriptionRequest } from '../../../backend/models/subscriptionRequest';
import { checkRateLimit } from '../../../backend/utils/rateLimit';
import nodemailer from 'nodemailer';

const sanitize = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
};

const tradeXLogo = `<span style="font-family: Arial, sans-serif; font-weight: 600; letter-spacing: 1px; color: #111;">Trade<span style="color: #1E90FF;">X</span></span>`;

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown_ip';
    const rateLimitResult = checkRateLimit(ip);
    
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: "Too many requests. Please try again after 10 minutes." }, { status: 429 });
    }

    const body = await req.json();
    let { email, phone, transactionId, planName, paymentMethod, website_url_honeypot } = body;

    if (website_url_honeypot) {
      return NextResponse.json({ error: "Automated request detected and blocked." }, { status: 403 });
    }

    if (!email || !transactionId || !planName) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    email = sanitize(email);
    phone = sanitize(phone);
    transactionId = sanitize(transactionId);
    planName = sanitize(planName);
    paymentMethod = sanitize(paymentMethod);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }
    
    if (transactionId.length > 200 || planName.length > 50) {
      return NextResponse.json({ error: "Input length exceeds allowed limits." }, { status: 400 });
    }

    const existingRequest = await SubscriptionRequest.findOne({ where: { transactionId } });
    if (existingRequest) {
      return NextResponse.json({ error: "This Transaction ID / Link is already registered with TradeX." }, { status: 400 });
    }

    const newRequest = await SubscriptionRequest.create({
      email,
      phone,
      transactionId,
      planName,
      paymentMethod,
      status: 'pending'
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const adminMailOptions = {
      from: `TradeX System <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, 
      subject: `TradeX Action Required: New Subscription - ${planName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #000; padding: 20px; border: 1px solid #eee;">
          <h2 style="border-bottom: 2px solid #1E90FF; padding-bottom: 10px; margin-top: 0;">
            <span style="font-size: 24px;">${tradeXLogo}</span> <span style="color: #666; font-size: 20px; font-weight: normal;">- New Request</span>
          </h2>
          <p>A new subscription request has been submitted and requires verification.</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 10px; border-bottom: 1px solid #f4f4f4;">Plan Requested:</td><td style="padding: 10px; border-bottom: 1px solid #f4f4f4;"><strong>${planName}</strong></td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #f4f4f4;">User Email:</td><td style="padding: 10px; border-bottom: 1px solid #f4f4f4;"><strong>${email}</strong></td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #f4f4f4;">Phone Number:</td><td style="padding: 10px; border-bottom: 1px solid #f4f4f4;"><strong>${phone || 'N/A'}</strong></td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #f4f4f4;">Payment Method:</td><td style="padding: 10px; border-bottom: 1px solid #f4f4f4;"><strong>${paymentMethod || 'N/A'}</strong></td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #f4f4f4;">Transaction ID/Link:</td><td style="padding: 10px; border-bottom: 1px solid #f4f4f4; color: #1E90FF;"><strong>${transactionId}</strong></td></tr>
          </table>
          <a href="${process.env.NEXT_PUBLIC_APP_URL_Admin_Login}" style="display: inline-block; background-color: #1E90FF; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
        </div>
      `
    };

    const userMailOptions = {
      from: `TradeX Support <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `TradeX Subscription Received - ${planName}`, 
      html: `
        <div style="font-family: Arial, sans-serif; color: #000; padding: 20px; border: 1px solid #eee;">
          <div style="margin-bottom: 20px; font-size: 32px; text-align: center;">${tradeXLogo}</div>
          <h2 style="color: #1E90FF; margin-top: 0;">Subscription Received</h2>
          <p>Hello,</p>
          <p>We have successfully received your subscription request for the <strong>${planName}</strong> plan.</p>
          <p>Our team is currently verifying your transaction via <strong>${paymentMethod}</strong> with ID/Link: <strong style="color: #1E90FF;">${transactionId}</strong>.</p>
          <p>Once approved, you will receive another email from ${tradeXLogo} containing your access details.</p>
          <br />
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #888; line-height: 1.5;">
            If you have any questions, feel free to contact ${tradeXLogo} support.<br/>
            &copy; ${new Date().getFullYear()} ${tradeXLogo}. All rights reserved.
          </p>
        </div>
      `
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    return NextResponse.json({ success: true, message: "Request sent to TradeX successfully" }, { status: 201 });

  } catch (error) {
    console.error("TradeX Submit Error:", error);
    return NextResponse.json({ error: "A TradeX system error occurred." }, { status: 500 });
  }
}