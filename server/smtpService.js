import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Creates and verifies nodemailer transport with configured environment credentials.
 */
export function getMailTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER || 'jmenterprise.softique@gmail.com';
  const pass = process.env.SMTP_PASS;

  if (!pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Handles incoming website enquiry data and sends an HTML formatted notification email via SMTP.
 */
export async function handleSendEmail(data) {
  const {
    name = 'Prospective Client',
    businessName = 'Not Provided',
    contact = '',
    email = '',
    phone = '',
    enquiryType = 'Wholesale Supply Inquiry',
    packetQty = '',
    estimatedTotal = '',
    message = '',
    source = 'Website Form',
  } = data || {};

  const recipient = process.env.SMTP_TO || 'jmenterprise.softique@gmail.com';
  const fromAddress = process.env.SMTP_FROM || `"Softique Website" <${process.env.SMTP_USER || 'jmenterprise.softique@gmail.com'}>`;
  const contactInfo = contact || [phone, email].filter(Boolean).join(' / ') || 'Not provided';
  const replyTo = email || (contact.includes('@') ? contact : undefined);

  const transporter = getMailTransporter();

  // If SMTP password is not configured yet, give helpful diagnostics
  if (!transporter) {
    console.warn('[SMTP Service] SMTP_PASS is missing in .env. Email cannot be dispatched to SMTP server.');
    return {
      success: false,
      code: 'SMTP_NOT_CONFIGURED',
      message: 'SMTP credentials not configured yet. Please set SMTP_PASS in your .env file.',
      fallbackData: {
        to: recipient,
        name,
        contact: contactInfo,
        message,
      },
    };
  }

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #F8F6F0; margin: 0; padding: 24px; color: #1C1E21; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E5DFD4; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
          .header { background: #12151A; padding: 28px 32px; color: #ffffff; }
          .header h1 { margin: 0; font-size: 24px; letter-spacing: 0.5px; font-family: Georgia, serif; }
          .header p { margin: 6px 0 0; color: #C5A880; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
          .content { padding: 32px; }
          .badge { display: inline-block; background: #E6F0FA; color: #0E63B8; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; margin-bottom: 20px; }
          .grid { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .grid td { padding: 12px 14px; border-bottom: 1px solid #F0ECE4; font-size: 14px; }
          .label { width: 38%; color: #736E62; font-weight: 500; }
          .value { width: 62%; color: #1C1E21; font-weight: 600; }
          .message-box { background: #FAF9F5; border-left: 4px solid #C5A880; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-top: 10px; font-size: 14px; line-height: 1.6; color: #333333; }
          .footer { background: #FAF8F5; padding: 20px 32px; border-top: 1px solid #EAE4D7; font-size: 12px; color: #8A8374; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Softique™</h1>
            <p>New Business Lead • JM ENTERPRISE</p>
          </div>
          <div class="content">
            <span class="badge">Source: ${source}</span>
            <table class="grid">
              <tr>
                <td class="label">Client Name</td>
                <td class="value">${name}</td>
              </tr>
              <tr>
                <td class="label">Business / Firm</td>
                <td class="value">${businessName}</td>
              </tr>
              <tr>
                <td class="label">Contact (Phone / Email)</td>
                <td class="value">${contactInfo}</td>
              </tr>
              <tr>
                <td class="label">Inquiry Category</td>
                <td class="value">${enquiryType}</td>
              </tr>
              ${packetQty ? `
              <tr>
                <td class="label">Requested Quantity</td>
                <td class="value">${packetQty} Packets</td>
              </tr>
              ` : ''}
              ${estimatedTotal ? `
              <tr>
                <td class="label">Est. Ex-Factory Value</td>
                <td class="value">₹${estimatedTotal}</td>
              </tr>
              ` : ''}
              <tr>
                <td class="label">Received At</td>
                <td class="value">${timestamp} IST</td>
              </tr>
            </table>

            <div style="font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #736E62; margin-top: 16px;">
              Message Details:
            </div>
            <div class="message-box">
              ${message ? message.replace(/\n/g, '<br>') : 'Client requested general wholesale rates and specifications catalog.'}
            </div>
          </div>
          <div class="footer">
            Manufactured by JM ENTERPRISE • Kothariya Chokdi, Rajkot - 360022, Gujarat<br>
            Direct Factory Dispatch & Wholesale Supply
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
New Softique Website Enquiry:
-----------------------------
Client Name: ${name}
Business / Firm: ${businessName}
Contact Info: ${contactInfo}
Category: ${enquiryType}
${packetQty ? `Quantity: ${packetQty} Packets\n` : ''}${estimatedTotal ? `Est. Total: ₹${estimatedTotal}\n` : ''}Source: ${source}
Timestamp: ${timestamp} IST

Message:
${message || 'No additional message provided.'}
-----------------------------
Manufactured by JM ENTERPRISE, Kothariya Chokdi, Rajkot - 360022, Gujarat
  `;

  const mailOptions = {
    from: fromAddress,
    to: recipient,
    replyTo: replyTo || undefined,
    subject: `[Softique Enquiry] ${enquiryType} from ${name}${businessName !== 'Not Provided' ? ' (' + businessName + ')' : ''}`,
    text: textContent,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('[SMTP Service] Email dispatched successfully! Message ID:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      message: 'Enquiry sent successfully via SMTP!',
    };
  } catch (error) {
    console.error('[SMTP Service] Error sending email via SMTP:', error.message);
    return {
      success: false,
      code: 'SMTP_SEND_FAILED',
      error: error.message,
      message: 'Could not send email through SMTP server: ' + error.message,
    };
  }
}

