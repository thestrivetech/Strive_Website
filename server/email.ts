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
      this.transporter = nodemailer.createTransport(emailConfig);
    } else {
      console.warn('Email service not configured. Set SMTP_USER and SMTP_PASS environment variables.');
    }
  }

  async sendEmail(options: EmailOptions, retries: number = 3): Promise<boolean> {
    if (!this.transporter) {
      console.warn('Email not sent - email service not configured');
      return false;
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@strivetech.ai',
      to: options.to.join(', '),
      subject: options.subject,
      text: options.text || options.html.replace(/<[^>]*>/g, ''),
      html: options.html,
    };

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await this.transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to: ${options.to.join(', ')} (attempt ${attempt})`);
        return true;
      } catch (error) {
        console.error(`Email sending failed on attempt ${attempt}:`, error);
        
        if (attempt === retries) {
          console.error(`Failed to send email after ${retries} attempts to: ${options.to.join(', ')}`);
          return false;
        }
        
        // Exponential backoff: wait 1s, then 2s, then 4s
        const waitTime = Math.pow(2, attempt - 1) * 1000;
        console.log(`Retrying email send in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    
    return false;
  }

  async verifyConnection(): Promise<boolean> {
    if (!this.transporter) {
      console.warn('Cannot verify email connection - transporter not configured');
      return false;
    }

    try {
      await this.transporter.verify();
      console.log('Email service connection verified successfully');
      return true;
    } catch (error) {
      console.error('Email service connection verification failed:', error);
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

  async sendContactFormConfirmation(formData: any) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff7033;">Thank You for Contacting Strive Tech!</h2>
        <p>Dear ${formData.firstName},</p>
        <p>Thank you for reaching out to us! We've received your message and will get back to you within one business day.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Your Message Details:</h3>
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Company:</strong> ${formData.company}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: white; padding: 15px; border-radius: 3px;">${formData.message}</p>
        </div>

        <p>In the meantime, feel free to explore our <a href="https://strivetech.ai/solutions" style="color: #ff7033;">AI solutions</a> and learn more about how we can help transform your business.</p>
        
        <p>Best regards,<br>The Strive Tech Team</p>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This is an automated confirmation email. If you need immediate assistance, please call us directly.
        </p>
      </div>
    `;

    return await this.sendEmail({
      to: [formData.email],
      subject: 'Thank you for contacting Strive Tech - We\'ll be in touch soon!',
      html,
    });
  }

  async sendRequestConfirmation(requestData: any) {
    // Parse request types from comma-separated string
    const requestTypes = requestData.requestTypes ? requestData.requestTypes.split(',') : [];
    const serviceList = requestTypes.map((type: string) => {
      switch(type) {
        case 'demo': return 'Product Demo';
        case 'showcase': return 'Solution Showcase';
        case 'assessment': return 'AI Assessment';
        default: return type;
      }
    }).join(', ');

    // Parse arrays from JSON strings
    const currentChallenges = requestData.currentChallenges ? JSON.parse(requestData.currentChallenges) : [];
    const demoFocusAreas = requestData.demoFocusAreas ? JSON.parse(requestData.demoFocusAreas) : [];

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff7033;">Your Request is Confirmed!</h2>
        <p>Dear ${requestData.firstName || requestData.fullName.split(' ')[0]},</p>
        <p>Thank you for your interest in Strive Tech's AI solutions! We've received your request for <strong>${serviceList}</strong> and will contact you within one business day to schedule your sessions.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Your Request Details:</h3>
          <p><strong>Name:</strong> ${requestData.fullName}</p>
          <p><strong>Company:</strong> ${requestData.company}</p>
          <p><strong>Services Requested:</strong> ${serviceList}</p>
          ${requestData.industry ? `<p><strong>Industry:</strong> ${requestData.industry}</p>` : ''}
          ${requestData.companySize ? `<p><strong>Company Size:</strong> ${requestData.companySize}</p>` : ''}
          ${currentChallenges.length > 0 ? `<p><strong>Current Challenges:</strong> ${currentChallenges.join(', ')}</p>` : ''}
          ${demoFocusAreas.length > 0 ? `<p><strong>Focus Areas:</strong> ${demoFocusAreas.join(', ')}</p>` : ''}
          ${requestData.projectTimeline ? `<p><strong>Timeline:</strong> ${requestData.projectTimeline}</p>` : ''}
          ${requestData.additionalRequirements ? `<p><strong>Additional Requirements:</strong></p><p style="background-color: white; padding: 15px; border-radius: 3px;">${requestData.additionalRequirements}</p>` : ''}
        </div>

        <div style="background-color: #e8f4fd; padding: 15px; border-radius: 5px; border-left: 4px solid #ff7033;">
          <h3 style="color: #333; margin-top: 0;">What to Expect:</h3>
          <ul style="margin: 10px 0;">
            <li>A team member will contact you within 24 hours to confirm details</li>
            <li>You'll receive calendar invites for all requested services</li>
            <li>Sessions will be tailored to your specific business needs and industry</li>
            ${requestTypes.includes('demo') ? '<li>Live product demonstrations of our AI solutions</li>' : ''}
            ${requestTypes.includes('showcase') ? '<li>Custom solution presentations based on your challenges</li>' : ''}
            ${requestTypes.includes('assessment') ? '<li>Comprehensive AI readiness evaluation and recommendations</li>' : ''}
          </ul>
        </div>
        
        <p>We're excited to show you how Strive Tech can help transform your business with cutting-edge AI solutions!</p>
        
        <p>Best regards,<br>The Strive Tech Team</p>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This is an automated confirmation email. If you have any questions or need to reschedule, please reply to this email.
        </p>
      </div>
    `;

    return await this.sendEmail({
      to: [requestData.email],
      subject: `Your ${serviceList} Request with Strive Tech - Confirmed!`,
      html,
    });
  }

  async sendRequestNotification(requestData: any) {
    const recipients = [
      'garrettholland@strivetech.ai',
      'jeffmeyer@strivetech.ai', 
      'grantramey@strivetech.ai',
      'contact@strivetech.ai'
    ];

    // Parse request types and arrays
    const requestTypes = requestData.requestTypes ? requestData.requestTypes.split(',') : [];
    const serviceList = requestTypes.map((type: string) => {
      switch(type) {
        case 'demo': return 'Product Demo';
        case 'showcase': return 'Solution Showcase';  
        case 'assessment': return 'AI Assessment';
        default: return type;
      }
    }).join(', ');

    const currentChallenges = requestData.currentChallenges ? JSON.parse(requestData.currentChallenges) : [];
    const demoFocusAreas = requestData.demoFocusAreas ? JSON.parse(requestData.demoFocusAreas) : [];

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff7033;">New Service Request</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Services Requested:</strong> ${serviceList}</p>
          <p><strong>Name:</strong> ${requestData.fullName}</p>
          <p><strong>Email:</strong> ${requestData.email}</p>
          <p><strong>Phone:</strong> ${requestData.phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${requestData.company}</p>
          <p><strong>Job Title:</strong> ${requestData.jobTitle || 'Not provided'}</p>
          <p><strong>Industry:</strong> ${requestData.industry || 'Not provided'}</p>
          <p><strong>Company Size:</strong> ${requestData.companySize || 'Not provided'}</p>
          <p><strong>Timeline:</strong> ${requestData.projectTimeline || 'Not specified'}</p>
          <p><strong>Budget:</strong> ${requestData.budgetRange || 'Not specified'}</p>
          
          ${currentChallenges.length > 0 ? `
            <p><strong>Current Challenges:</strong></p>
            <ul>${currentChallenges.map((challenge: string) => `<li>${challenge}</li>`).join('')}</ul>
          ` : ''}
          
          ${demoFocusAreas.length > 0 ? `
            <p><strong>Focus Areas:</strong></p>
            <ul>${demoFocusAreas.map((area: string) => `<li>${area}</li>`).join('')}</ul>
          ` : ''}
          
          ${requestData.additionalRequirements ? `
            <p><strong>Additional Requirements:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 3px;">${requestData.additionalRequirements}</p>
          ` : ''}
        </div>
        
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin-top: 15px; border-left: 4px solid #ff7033;">
          <h3 style="color: #333; margin-top: 0;">Next Steps:</h3>
          <ul style="margin: 10px 0;">
            <li>Contact within 24 hours to schedule ${serviceList.toLowerCase()}</li>
            <li>Send calendar invites for all requested services</li>
            <li>Prepare materials based on their industry and challenges</li>
            ${requestTypes.includes('assessment') ? '<li>Schedule technical assessment session</li>' : ''}
          </ul>
        </div>
      </div>
    `;

    return await this.sendEmail({
      to: recipients,
      subject: `New ${serviceList} Request from ${requestData.fullName}`,
      html,
    });
  }
}

export const emailService = new EmailService();