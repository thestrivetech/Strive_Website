import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string[];
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    const emailConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    };

    if (emailConfig.auth.user && emailConfig.auth.pass) {
      this.transporter = nodemailer.createTransporter(emailConfig);
    } else {
      console.warn('Email service not configured. Set SMTP_USER and SMTP_PASS environment variables.');
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.transporter) {
      console.warn('Email not sent - email service not configured');
      return false;
    }

    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@strivetech.ai',
        to: options.to.join(', '),
        subject: options.subject,
        text: options.text || options.html.replace(/<[^>]*>/g, ''),
        html: options.html,
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully to:', options.to.join(', '));
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendContactFormNotification(formData: any) {
    const recipients = [
      'garrettholland@strivetech.ai',
      'jeffmeyer@strivetech.ai',
      'grantramey@strivetech.ai',
      'contact@strivetech.ai'
    ];

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff7033;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
          <p><strong>Company Size:</strong> ${formData.companySize || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: white; padding: 15px; border-radius: 3px;">${formData.message}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This email was sent from the Strive Tech contact form.
        </p>
      </div>
    `;

    return await this.sendEmail({
      to: recipients,
      subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
      html,
    });
  }

  async sendNewsletterConfirmation(email: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff7033;">Welcome to Strive Tech Newsletter!</h2>
        <p>Thank you for subscribing to our newsletter. You'll receive updates about:</p>
        <ul>
          <li>Latest AI innovations and solutions</li>
          <li>Industry insights and best practices</li>
          <li>Exclusive offers and events</li>
        </ul>
        <p>If you have any questions, feel free to reach out to us at contact@strivetech.ai</p>
      </div>
    `;

    return await this.sendEmail({
      to: [email],
      subject: 'Welcome to Strive Tech Newsletter',
      html,
    });
  }

  async sendMeetingRequestNotification(requestData: any) {
    const recipients = [
      'garrettholland@strivetech.ai',
      'jeffmeyer@strivetech.ai',
      'grantramey@strivetech.ai',
      'contact@strivetech.ai'
    ];

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff7033;">New Meeting Request</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${requestData.firstName} ${requestData.lastName}</p>
          <p><strong>Email:</strong> ${requestData.email}</p>
          <p><strong>Company:</strong> ${requestData.company}</p>
          <p><strong>Phone:</strong> ${requestData.phone || 'Not provided'}</p>
          <p><strong>Meeting Type:</strong> ${requestData.meetingType || 'General'}</p>
          <p><strong>Preferred Date:</strong> ${requestData.preferredDate || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: white; padding: 15px; border-radius: 3px;">${requestData.message || 'No additional message'}</p>
        </div>
      </div>
    `;

    return await this.sendEmail({
      to: recipients,
      subject: `New Meeting Request from ${requestData.firstName} ${requestData.lastName}`,
      html,
    });
  }
}

export const emailService = new EmailService();