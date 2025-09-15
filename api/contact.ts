import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const insertContactSubmissionSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  company: z.string(),
  phone: z.string().optional(),
  companySize: z.string().optional(),
  message: z.string(),
  privacyConsent: z.union([z.boolean(), z.string()]).transform((val) => String(val)),
});

// Email configuration
const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const sendNotificationEmail = async (data: any) => {
  const transporter = createTransporter();
  if (!transporter) return false;

  const recipients = ['garrettholland@strivetech.ai', 'jeffmeyer@strivetech.ai', 'grantramey@strivetech.ai', 'contact@strivetech.ai'];

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: recipients.join(','),
    subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Company Size:</strong> ${data.companySize || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
      <p><strong>Privacy Consent:</strong> ${data.privacyConsent}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

const sendConfirmationEmail = async (data: any) => {
  const transporter = createTransporter();
  if (!transporter) return false;

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: data.email,
    subject: 'Thank you for contacting Strive Tech',
    html: `
      <h2>Thank you for reaching out!</h2>
      <p>Dear ${data.firstName},</p>
      <p>We've received your message and will get back to you within one business day.</p>
      <p>Best regards,<br>The Strive Tech Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Confirmation email failed:', error);
    return false;
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const validatedData = insertContactSubmissionSchema.parse(req.body);

    // Send email notifications
    try {
      await sendNotificationEmail(validatedData);
      await sendConfirmationEmail(validatedData);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.json({
      success: true,
      message: "Thank you for your message. We'll get back to you within one business day."
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Invalid form data - please check all required fields",
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to submit contact form. Please try again or contact us directly."
      });
    }
  }
}