import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const insertRequestSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string(),
  jobTitle: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  currentChallenges: z.string().optional(),
  projectTimeline: z.string().optional(),
  budgetRange: z.string().optional(),
  requestTypes: z.string(),
  demoFocusAreas: z.string().optional(),
  additionalRequirements: z.string().optional(),
  preferredDate: z.string().optional().nullable(),
});

// Email configuration
const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const sendRequestNotification = async (data: any) => {
  const transporter = createTransporter();
  if (!transporter) return false;

  const recipients = ['garrettholland@strivetech.ai', 'jeffmeyer@strivetech.ai', 'grantramey@strivetech.ai', 'contact@strivetech.ai'];

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: recipients.join(','),
    subject: `New ${data.requestTypes} Request from ${data.firstName} ${data.lastName}`,
    html: `
      <h2>New ${data.requestTypes} Request</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Job Title:</strong> ${data.jobTitle || 'Not provided'}</p>
      <p><strong>Industry:</strong> ${data.industry || 'Not provided'}</p>
      <p><strong>Company Size:</strong> ${data.companySize || 'Not provided'}</p>
      <p><strong>Request Types:</strong> ${data.requestTypes}</p>
      <p><strong>Project Timeline:</strong> ${data.projectTimeline || 'Not provided'}</p>
      <p><strong>Budget Range:</strong> ${data.budgetRange || 'Not provided'}</p>
      <p><strong>Current Challenges:</strong> ${data.currentChallenges || 'Not provided'}</p>
      <p><strong>Demo Focus Areas:</strong> ${data.demoFocusAreas || 'Not provided'}</p>
      <p><strong>Additional Requirements:</strong> ${data.additionalRequirements || 'Not provided'}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Request notification email failed:', error);
    return false;
  }
};

const sendRequestConfirmation = async (data: any) => {
  const transporter = createTransporter();
  if (!transporter) return false;

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: data.email,
    subject: 'Thank you for your request - Strive Tech',
    html: `
      <h2>Thank you for your request!</h2>
      <p>Dear ${data.firstName},</p>
      <p>We've received your ${data.requestTypes} request and will contact you within one business day to schedule your demo.</p>
      <p>Best regards,<br>The Strive Tech Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Request confirmation email failed:', error);
    return false;
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const validatedData = insertRequestSchema.parse(req.body);

    // Send email notifications
    try {
      await sendRequestNotification(validatedData);
      await sendRequestConfirmation(validatedData);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.json({
      success: true,
      message: "Thank you for your request! We'll contact you within one business day to schedule your demo."
    });
  } catch (error) {
    console.error('Request submission error:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Invalid form data",
        errors: error.errors
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to submit request. Please try again or contact us directly."
      });
    }
  }
}