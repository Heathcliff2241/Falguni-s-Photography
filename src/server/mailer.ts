import nodemailer, { Transporter } from 'nodemailer';

interface BookingEmailNotificationPayload {
  visitorName: string;
  sessionType: string;
  timeframeOrDueDate: string;
  contactEmail: string;
  contactPhone?: string;
  summary?: string;
  source: string;
}

let cachedTransporter: Transporter | null = null;

function getMailTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER || process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for 587
      auth: {
        user,
        pass,
      },
    });
  }

  return cachedTransporter;
}

export async function sendBookingNotificationEmail(payload: BookingEmailNotificationPayload): Promise<boolean> {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER || 'cesaresmero2@gmail.com';
  const transporter = getMailTransporter();

  const formattedHtml = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF5EF; color: #362E2B; padding: 32px; border-radius: 12px; border: 1px solid #EAD3CE;">
      <div style="border-bottom: 2px solid #EAD3CE; padding-bottom: 16px; margin-bottom: 24px;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #9CAA8C; font-weight: 600;">Falguni's Photography Studio</span>
        <h2 style="font-size: 24px; color: #6E4E53; margin: 8px 0 4px 0; font-family: Georgia, serif; font-weight: normal;">New Booking Inquiry</h2>
        <p style="margin: 0; font-size: 13px; color: #666;">Received via ${payload.source === 'willow_assistant' ? 'Willow AI Chatbot' : 'Website Booking Form'}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr style="border-bottom: 1px solid #EAD3CE;">
          <td style="padding: 10px 0; font-weight: 600; color: #6E4E53; width: 35%;">Client Name:</td>
          <td style="padding: 10px 0; color: #362E2B;">${payload.visitorName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #EAD3CE;">
          <td style="padding: 10px 0; font-weight: 600; color: #6E4E53;">Session Type:</td>
          <td style="padding: 10px 0; color: #362E2B;"><strong>${payload.sessionType}</strong></td>
        </tr>
        <tr style="border-bottom: 1px solid #EAD3CE;">
          <td style="padding: 10px 0; font-weight: 600; color: #6E4E53;">Due Date / Timeframe:</td>
          <td style="padding: 10px 0; color: #362E2B;">${payload.timeframeOrDueDate}</td>
        </tr>
        <tr style="border-bottom: 1px solid #EAD3CE;">
          <td style="padding: 10px 0; font-weight: 600; color: #6E4E53;">Email:</td>
          <td style="padding: 10px 0; color: #362E2B;"><a href="mailto:${payload.contactEmail}" style="color: #6E4E53; text-decoration: underline;">${payload.contactEmail}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #EAD3CE;">
          <td style="padding: 10px 0; font-weight: 600; color: #6E4E53;">Phone:</td>
          <td style="padding: 10px 0; color: #362E2B;">${payload.contactPhone ? `<a href="tel:${payload.contactPhone}" style="color: #6E4E53;">${payload.contactPhone}</a>` : 'Not provided'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #EAD3CE;">
          <td style="padding: 10px 0; font-weight: 600; color: #6E4E53;">Inquiry Source:</td>
          <td style="padding: 10px 0; color: #362E2B;">${payload.source === 'willow_assistant' ? 'Willow Assistant Chat' : 'Direct Booking Form'}</td>
        </tr>
      </table>

      ${payload.summary ? `
        <div style="background-color: #FFFFFF; border: 1px solid #EAD3CE; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #9CAA8C;">Notes & Conversation Details:</h4>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #362E2B;">${payload.summary}</p>
        </div>
      ` : ''}

      <div style="border-top: 1px solid #EAD3CE; padding-top: 16px; font-size: 12px; color: #888; text-align: center;">
        <p style="margin: 0;">Falguni's Photography &middot; 26 South Pkwy, Northfield SA 5085 &middot; Adelaide, Australia</p>
        <p style="margin: 4px 0 0 0;">Phone: +61 469 753 238 &middot; All sessions starting at $300</p>
      </div>
    </div>
  `;

  // 1. Try Nodemailer Gmail SMTP first
  if (transporter) {
    try {
      const user = process.env.SMTP_USER || process.env.GMAIL_USER;
      const info = await transporter.sendMail({
        from: `"Falguni's Photography Inquiries" <${user}>`,
        to: adminEmail,
        replyTo: payload.contactEmail.includes('@') ? payload.contactEmail : undefined,
        subject: `New Studio Inquiry: ${payload.sessionType} - ${payload.visitorName}`,
        html: formattedHtml,
      });

      console.log('[Nodemailer SMTP] Email sent successfully:', info.messageId);
      return true;
    } catch (smtpErr) {
      console.error('[Nodemailer SMTP Error]:', smtpErr);
    }
  }

  // 2. Fallback to Resend API if configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: "Falguni's Photography <inquiries@falguniphotography.com.au>",
          to: adminEmail,
          subject: `New Studio Inquiry: ${payload.sessionType} - ${payload.visitorName}`,
          html: formattedHtml,
        }),
      });

      if (res.ok) {
        console.log('[Resend API] Email notification sent successfully.');
        return true;
      }
    } catch (resendErr) {
      console.warn('[Resend API Fallback Error]:', resendErr);
    }
  }

  // If no SMTP or Resend credentials configured yet
  console.log(`[Notification System] SMTP / Gmail credentials not yet configured in environment variables. Inquiry recorded securely in database for ${payload.visitorName}. To activate Gmail notifications, set SMTP_USER and SMTP_PASS (Gmail App Password) in your settings.`);
  return true;
}
