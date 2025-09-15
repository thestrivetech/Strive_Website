import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const insertNewsletterSubscriptionSchema = z.object({
  email: z.string().email(),
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

const sendNewsletterConfirmation = async (email: string) => {
  const transporter = createTransporter();
  if (!transporter) return false;

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Welcome to Strive Tech Newsletter!',
    html: `
      <h2>Welcome to our newsletter!</h2>
      <p>Thank you for subscribing to the Strive Tech newsletter.</p>
      <p>You'll receive updates about our latest AI solutions and industry insights.</p>
      <p>Best regards,<br>The Strive Tech Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Newsletter confirmation email failed:', error);
    return false;
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);

    // Send confirmation email
    try {
      await sendNewsletterConfirmation(validatedData.email);
    } catch (emailError) {
      console.error('Newsletter confirmation email failed:', emailError);
    }

    res.json({
      success: true,
      message: "Successfully subscribed to our newsletter!"
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Invalid email address",
        errors: error.errors
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to subscribe to newsletter. Please try again."
      });
    }
  }
}