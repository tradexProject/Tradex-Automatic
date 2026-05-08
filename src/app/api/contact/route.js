import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '../../../backend/utils/rateLimit';

const sanitize = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
};
const tradeXLogo = `<span style="font-family: Arial, sans-serif; font-weight: 600; letter-spacing: 1px; color: #111;">Trade<span style="color: #1E90FF;">X</span></span>`;

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown_ip';
    const rateLimitResult = checkRateLimit(ip, 3, 10 * 60 * 1000); 

    if (!rateLimitResult.success) {
      return NextResponse.json({ error: "Too many requests. Please try again after 10 minutes." }, { status: 429 });
    }

    const body = await req.json();
    let { name, phone, email, reason, message } = body;

    if (!name || !email || !reason || !message) {
      return NextResponse.json({ error: 'Missing required fields in TradeX form' }, { status: 400 });
    }

    name = sanitize(name);
    email = sanitize(email);
    reason = sanitize(reason);
    message = sanitize(message);
    phone = sanitize(phone);

    const htmlRegex = /<[^>]*>?/gm;
    if (htmlRegex.test(name) || htmlRegex.test(message) || htmlRegex.test(email)) {
      return NextResponse.json({ error: 'Security alert: Invalid characters detected' }, { status: 403 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `TradeX Contact <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `TradeX Inquiry: ${reason} - From ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #000; padding: 20px; border: 1px solid #eee;">
          <h2 style="border-bottom: 2px solid #1E90FF; padding-bottom: 10px; margin-top: 0;">
            <span style="font-size: 24px;">${tradeXLogo}</span> <span style="color: #666; font-size: 20px; font-weight: normal;">- New Support Inquiry</span>
          </h2>
          <p>You have received a new message through the ${tradeXLogo} contact form:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f4f4f4;">Full Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f4f4f4;"><strong>${name}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f4f4f4;">Email Address:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f4f4f4;"><strong>${email}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f4f4f4;">Phone Number:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f4f4f4;"><strong>${phone || 'Not provided'}</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f4f4f4;">Reason for Inquiry:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f4f4f4;"><strong>${reason}</strong></td>
            </tr>
          </table>

          <div style="padding: 15px; border: 1px solid #f4f4f4; background-color: #fafafa;">
            <p style="margin-top: 0; font-weight: bold; color: #1E90FF;">User Message:</p>
            <p style="line-height: 1.6;">${message}</p>
          </div>

          <p style="font-size: 12px; color: #888; margin-top: 20px;">
            Sent via ${tradeXLogo} Support System.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Your message has been sent to TradeX' }, { status: 200 });

  } catch (error) {
    console.error('TradeX Email API Error:', error);
    return NextResponse.json({ error: 'TradeX was unable to process your request' }, { status: 500 });
  }
}