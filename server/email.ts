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
    console.log('🔧 Initializing email service...');

    const emailConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    };

    console.log(`📧 Email config: ${emailConfig.host}:${emailConfig.port} | User: ${emailConfig.auth.user} | Secure: ${emailConfig.secure}`);
    console.log(`🔑 Auth configured: User=${!!emailConfig.auth.user} | Pass=${!!emailConfig.auth.pass} (${emailConfig.auth.pass.length} chars)`);

    if (emailConfig.auth.user && emailConfig.auth.pass) {
      try {
        this.transporter = nodemailer.createTransport(emailConfig);
        console.log('✅ Email transporter created successfully');

        // Test the connection immediately
        this.verifyConnection().catch(error => {
          console.error('❌ Email connection verification failed during initialization:', error);
        });
      } catch (error) {
        console.error('❌ Failed to create email transporter:', error);
        this.transporter = null;
      }
    } else {
      console.warn('⚠️ Email service not configured. Missing SMTP_USER or SMTP_PASS environment variables.');
      console.log(`   SMTP_USER present: ${!!process.env.SMTP_USER}`);
      console.log(`   SMTP_PASS present: ${!!process.env.SMTP_PASS}`);
    }
  }

  async sendEmail(options: EmailOptions, retries: number = 3): Promise<boolean> {
    console.log(`📤 Attempting to send email to: ${options.to.join(', ')} | Subject: "${options.subject}"`);

    if (!this.transporter) {
      console.error('❌ Email not sent - email service not configured or transporter is null');
      return false;
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@strivetech.ai',
      to: options.to.join(', '),
      subject: options.subject,
      text: options.text || options.html.replace(/<[^>]*>/g, ''),
      html: options.html,
    };

    console.log(`📧 Mail options: From=${mailOptions.from} | To=${mailOptions.to}`);

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`🔄 Email send attempt ${attempt}/${retries}...`);
        const info = await this.transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to: ${options.to.join(', ')} (attempt ${attempt})`);
        console.log(`📄 Message info:`, {
          messageId: info.messageId,
          response: info.response,
          accepted: info.accepted,
          rejected: info.rejected
        });
        return true;
      } catch (error) {
        console.error(`❌ Email sending failed on attempt ${attempt}:`, error);

        // Log specific error details
        if (error instanceof Error) {
          console.error(`   Error name: ${error.name}`);
          console.error(`   Error message: ${error.message}`);
          if ('code' in error) console.error(`   Error code: ${(error as any).code}`);
          if ('command' in error) console.error(`   SMTP command: ${(error as any).command}`);
        }

        if (attempt === retries) {
          console.error(`💥 Failed to send email after ${retries} attempts to: ${options.to.join(', ')}`);
          return false;
        }

        // Exponential backoff: wait 1s, then 2s, then 4s
        const waitTime = Math.pow(2, attempt - 1) * 1000;
        console.log(`⏳ Retrying email send in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }

    return false;
  }

  async verifyConnection(): Promise<boolean> {
    if (!this.transporter) {
      console.warn('⚠️ Cannot verify email connection - transporter not configured');
      return false;
    }

    try {
      console.log('🔍 Verifying SMTP connection...');
      await this.transporter.verify();
      console.log('✅ Email service connection verified successfully');
      return true;
    } catch (error) {
      console.error('❌ Email service connection verification failed:', error);

      // Log specific error details
      if (error instanceof Error) {
        console.error(`   Verification error: ${error.name}: ${error.message}`);
        if ('code' in error) console.error(`   Error code: ${(error as any).code}`);
        if ('errno' in error) console.error(`   Error number: ${(error as any).errno}`);
        if ('syscall' in error) console.error(`   System call: ${(error as any).syscall}`);
        if ('hostname' in error) console.error(`   Hostname: ${(error as any).hostname}`);
      }

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
    const content = `
    <tr>
      <td class="content-padding" style="padding: 40px 30px;">
        
        <!-- Welcome Message -->
        <div style="text-align: center; margin-bottom: 35px;">
          <h1 style="color: #0f172a; font-size: 28px; font-weight: 700; margin: 0 0 15px 0; line-height: 1.3;">
            🎉 Welcome to the Strive Tech Community!
          </h1>
          <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #ff7033, #f97316); margin: 0 auto 20px;"></div>
          <p style="color: #64748b; font-size: 18px; margin: 0; font-weight: 400;">
            Thank you for subscribing to our newsletter. You're now part of an exclusive community of forward-thinking business leaders.
          </p>
        </div>

        <!-- What You'll Receive -->
        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 30px; border-radius: 12px; border-left: 4px solid #ff7033; margin: 30px 0;">
          <h3 style="color: #0f172a; font-size: 20px; margin: 0 0 25px 0; font-weight: 600; text-align: center;">
            📬 What You'll Receive
          </h3>
          
          <div style="display: grid; gap: 20px;">
            <div style="display: flex; align-items: flex-start;">
              <span style="background: #ff7033; color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; margin-right: 15px; flex-shrink: 0;">🚀</span>
              <div>
                <strong style="color: #0f172a; font-size: 16px; display: block; margin-bottom: 5px;">AI Industry Insights</strong>
                <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Latest trends, breakthrough technologies, and how they impact your industry specifically.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start;">
              <span style="background: #ff7033; color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; margin-right: 15px; flex-shrink: 0;">📊</span>
              <div>
                <strong style="color: #0f172a; font-size: 16px; display: block; margin-bottom: 5px;">Success Stories & Case Studies</strong>
                <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Real transformation stories from companies like yours, with measurable results and lessons learned.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start;">
              <span style="background: #ff7033; color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; margin-right: 15px; flex-shrink: 0;">🎯</span>
              <div>
                <strong style="color: #0f172a; font-size: 16px; display: block; margin-bottom: 5px;">Exclusive Resources</strong>
                <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Whitepapers, implementation guides, and tools available only to newsletter subscribers.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start;">
              <span style="background: #ff7033; color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; margin-right: 15px; flex-shrink: 0;">🎁</span>
              <div>
                <strong style="color: #0f172a; font-size: 16px; display: block; margin-bottom: 5px;">Special Offers & Early Access</strong>
                <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.5;">Priority access to new services, exclusive webinars, and subscriber-only discounts.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Newsletter Schedule -->
        <div style="background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%); padding: 25px; border-radius: 12px; border: 1px solid #fed7aa; margin: 30px 0; text-align: center;">
          <h3 style="color: #ea580c; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">
            📅 Newsletter Schedule
          </h3>
          <p style="color: #9a3412; margin: 0; font-size: 15px; line-height: 1.5;">
            <strong>Weekly AI Insights:</strong> Every Tuesday<br>
            <strong>Monthly Deep Dive:</strong> First Friday of each month<br>
            <strong>Breaking News:</strong> As needed for major industry developments
          </p>
          <p style="color: #9a3412; margin: 15px 0 0 0; font-size: 13px; font-style: italic;">
            Don't worry - we respect your time and your inbox. Quality content, no spam.
          </p>
        </div>

        <!-- Get Started -->
        <div style="text-align: center; margin: 35px 0;">
          <h3 style="color: #0f172a; font-size: 20px; margin: 0 0 20px 0; font-weight: 600;">
            Start Exploring While You Wait
          </h3>
          <p style="color: #64748b; font-size: 16px; margin: 0 0 25px 0; line-height: 1.5;">
            Discover our comprehensive resources and see how AI can transform your business today.
          </p>
          
          <div style="margin: 20px 0;">
            <div style="display: inline-block; margin: 10px;">
              <a href="https://strivetech.ai/solutions" class="button" style="display: inline-block; padding: 14px 28px; background-color: #ff7033; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
                Explore AI Solutions
              </a>
            </div>
            
            <div style="display: inline-block; margin: 10px;">
              <a href="https://strivetech.ai/resources" class="button" style="display: inline-block; padding: 14px 28px; background-color: transparent; color: #ff7033; text-decoration: none; border: 2px solid #ff7033; border-radius: 8px; font-weight: 600; font-size: 15px;">
                Browse Resources
              </a>
            </div>
          </div>
        </div>

        <!-- Ready for More -->
        <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; border: 1px solid #bbf7d0; margin: 30px 0; text-align: center;">
          <h3 style="color: #166534; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">
            💡 Ready to Take the Next Step?
          </h3>
          <p style="color: #15803d; margin: 0 0 20px 0; font-size: 15px; line-height: 1.5;">
            Don't wait for transformation to happen. Schedule a free consultation to discuss your specific AI needs.
          </p>
          <a href="https://strivetech.ai/request" style="display: inline-block; padding: 12px 24px; background-color: #16a34a; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
            Request Free Consultation
          </a>
        </div>

        <!-- Team Signature -->
        <div style="text-align: center; margin: 40px 0 20px;">
          <p style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 10px 0;">
            Welcome aboard,
          </p>
          <p style="color: #ff7033; font-size: 20px; font-weight: 700; margin: 0 0 8px 0;">
            The Strive Tech Team
          </p>
          <p style="color: #64748b; font-size: 14px; margin: 0; font-style: italic;">
            Your AI transformation partners
          </p>
        </div>

        <!-- Unsubscribe Notice -->
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 30px;">
          <p style="color: #64748b; font-size: 12px; margin: 0; text-align: center; line-height: 1.4;">
            You can manage your subscription preferences or unsubscribe at any time by 
            <a href="mailto:contact@strivetech.ai?subject=Newsletter%20Unsubscribe" style="color: #ff7033; text-decoration: none;">contacting us</a>.
            Your email: <strong>${email}</strong>
          </p>
        </div>
        
      </td>
    </tr>
    `;

    const html = this.wrapContent(content);

    return await this.sendEmail({
      to: [email],
      subject: '🎉 Welcome to Strive Tech Newsletter - Your AI Journey Starts Here!',
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
    const content = `
    <tr>
      <td class="content-padding" style="padding: 40px 30px;">
        
        <!-- Main Greeting -->
        <div style="text-align: center; margin-bottom: 35px;">
          <h1 style="color: #0f172a; font-size: 28px; font-weight: 700; margin: 0 0 15px 0; line-height: 1.3;">
            Thank You, ${formData.firstName}! 
          </h1>
          <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #ff7033, #f97316); margin: 0 auto 20px;"></div>
          <p style="color: #64748b; font-size: 18px; margin: 0; font-weight: 400;">
            Your message has been received and is now in our priority queue.
          </p>
        </div>

        <!-- Confirmation Details -->
        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 25px; border-radius: 12px; border-left: 4px solid #ff7033; margin: 30px 0;">
          <h3 style="color: #0f172a; font-size: 18px; margin: 0 0 20px 0; font-weight: 600;">
            📋 Your Inquiry Details
          </h3>
          
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 120px;">Name:</span>
            <span style="color: #0f172a; font-weight: 500;">${formData.firstName} ${formData.lastName}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 120px;">Company:</span>
            <span style="color: #0f172a; font-weight: 500;">${formData.company || 'Individual Inquiry'}</span>
          </div>
          
          ${formData.companySize ? `
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 120px;">Company Size:</span>
            <span style="color: #0f172a; font-weight: 500;">${formData.companySize}</span>
          </div>
          ` : ''}
          
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 120px;">Email:</span>
            <span style="color: #0f172a; font-weight: 500;">${formData.email}</span>
          </div>
          
          <div style="margin-top: 20px;">
            <span style="color: #475569; font-weight: 600;">Your Message:</span>
            <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-top: 8px; border: 1px solid #e2e8f0;">
              <p style="color: #334155; margin: 0; line-height: 1.6;">${formData.message}</p>
            </div>
          </div>
        </div>

        <!-- What Happens Next -->
        <div style="background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%); padding: 25px; border-radius: 12px; border: 1px solid #fed7aa; margin: 30px 0;">
          <h3 style="color: #ea580c; font-size: 18px; margin: 0 0 20px 0; font-weight: 600; display: flex; align-items: center;">
            <span style="margin-right: 10px;">⏰</span>
            What Happens Next
          </h3>
          
          <div style="margin: 15px 0;">
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <span style="background: #ff7033; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</span>
              <div>
                <strong style="color: #ea580c; font-size: 15px;">Initial Review (Within 2 hours)</strong>
                <p style="color: #9a3412; margin: 5px 0 0 0; font-size: 14px; line-height: 1.4;">Our team will review your inquiry and identify the best specialist to help you.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <span style="background: #ff7033; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</span>
              <div>
                <strong style="color: #ea580c; font-size: 15px;">Personal Response (Within 24 hours)</strong>
                <p style="color: #9a3412; margin: 5px 0 0 0; font-size: 14px; line-height: 1.4;">You'll receive a detailed response with next steps tailored to your specific needs.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start;">
              <span style="background: #ff7033; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0;">3</span>
              <div>
                <strong style="color: #ea580c; font-size: 15px;">Discovery Call (If Applicable)</strong>
                <p style="color: #9a3412; margin: 5px 0 0 0; font-size: 14px; line-height: 1.4;">For complex inquiries, we'll schedule a call to better understand your requirements.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- While You Wait -->
        <div style="text-align: center; margin: 35px 0;">
          <h3 style="color: #0f172a; font-size: 20px; margin: 0 0 20px 0; font-weight: 600;">
            While You Wait, Explore Our Solutions
          </h3>
          <p style="color: #64748b; font-size: 16px; margin: 0 0 25px 0; line-height: 1.5;">
            Discover how we've helped companies like yours transform their operations with AI.
          </p>
          
          <div style="display: inline-block; margin: 10px;">
            <a href="https://strivetech.ai/solutions" class="button" style="display: inline-block; padding: 14px 28px; background-color: #ff7033; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
              View Industry Solutions
            </a>
          </div>
          
          <div style="display: inline-block; margin: 10px;">
            <a href="https://strivetech.ai/resources" class="button" style="display: inline-block; padding: 14px 28px; background-color: transparent; color: #ff7033; text-decoration: none; border: 2px solid #ff7033; border-radius: 8px; font-weight: 600; font-size: 15px;">
              Browse Resources
            </a>
          </div>
        </div>

        <!-- Team Signature -->
        <div style="text-align: center; margin: 40px 0 20px;">
          <p style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 10px 0;">
            Best regards,
          </p>
          <p style="color: #ff7033; font-size: 20px; font-weight: 700; margin: 0 0 8px 0;">
            The Strive Tech Team
          </p>
          <p style="color: #64748b; font-size: 14px; margin: 0; font-style: italic;">
            Your partners in AI transformation
          </p>
        </div>

        <!-- Emergency Contact -->
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 30px;">
          <p style="color: #475569; font-size: 13px; margin: 0; text-align: center; line-height: 1.4;">
            <strong>Need immediate assistance?</strong><br>
            For urgent matters, please call us directly or send a follow-up email to 
            <a href="mailto:contact@strivetech.ai" style="color: #ff7033; text-decoration: none; font-weight: 600;">contact@strivetech.ai</a>
            with "URGENT" in the subject line.
          </p>
        </div>
        
      </td>
    </tr>
    `;

    const html = this.wrapContent(content);

    return await this.sendEmail({
      to: [formData.email],
      subject: 'Thank you for contacting Strive Tech - We\'ll be in touch within 24 hours!',
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

    const content = `
    <tr>
      <td class="content-padding" style="padding: 40px 30px;">
        
        <!-- Main Confirmation -->
        <div style="text-align: center; margin-bottom: 35px;">
          <h1 style="color: #0f172a; font-size: 28px; font-weight: 700; margin: 0 0 15px 0; line-height: 1.3;">
            🎯 Your Request is Confirmed!
          </h1>
          <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #ff7033, #f97316); margin: 0 auto 20px;"></div>
          <p style="color: #64748b; font-size: 18px; margin: 0; font-weight: 400;">
            Thank you for your interest in <strong>${serviceList}</strong>, ${requestData.firstName}!<br>
            We'll contact you within 24 hours to schedule your sessions.
          </p>
        </div>

        <!-- Request Summary -->
        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 25px; border-radius: 12px; border-left: 4px solid #ff7033; margin: 30px 0;">
          <h3 style="color: #0f172a; font-size: 18px; margin: 0 0 20px 0; font-weight: 600;">
            📋 Your Request Summary
          </h3>
          
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 140px;">Name:</span>
            <span style="color: #0f172a; font-weight: 500;">${requestData.firstName} ${requestData.lastName}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 140px;">Company:</span>
            <span style="color: #0f172a; font-weight: 500;">${requestData.company}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 140px;">Services:</span>
            <span style="color: #ff7033; font-weight: 600;">${serviceList}</span>
          </div>
          
          ${requestData.industry ? `
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 140px;">Industry:</span>
            <span style="color: #0f172a; font-weight: 500;">${requestData.industry}</span>
          </div>
          ` : ''}
          
          ${requestData.companySize ? `
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 140px;">Company Size:</span>
            <span style="color: #0f172a; font-weight: 500;">${requestData.companySize}</span>
          </div>
          ` : ''}
          
          ${currentChallenges.length > 0 ? `
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: block; margin-bottom: 5px;">Current Challenges:</span>
            <div style="margin-left: 0;">
              ${currentChallenges.map((challenge: string) => `
                <span style="background: #fef3e2; color: #ea580c; padding: 4px 8px; border-radius: 6px; font-size: 12px; margin: 2px 4px 2px 0; display: inline-block;">${challenge}</span>
              `).join('')}
            </div>
          </div>
          ` : ''}
          
          ${demoFocusAreas.length > 0 ? `
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: block; margin-bottom: 5px;">Focus Areas:</span>
            <div style="margin-left: 0;">
              ${demoFocusAreas.map((area: string) => `
                <span style="background: #f0f9ff; color: #0369a1; padding: 4px 8px; border-radius: 6px; font-size: 12px; margin: 2px 4px 2px 0; display: inline-block;">${area}</span>
              `).join('')}
            </div>
          </div>
          ` : ''}
          
          ${requestData.projectTimeline ? `
          <div style="margin-bottom: 15px;">
            <span style="color: #475569; font-weight: 600; display: inline-block; width: 140px;">Timeline:</span>
            <span style="color: #0f172a; font-weight: 500;">${requestData.projectTimeline}</span>
          </div>
          ` : ''}
          
          ${requestData.additionalRequirements ? `
          <div style="margin-top: 20px;">
            <span style="color: #475569; font-weight: 600;">Additional Requirements:</span>
            <div style="background: #ffffff; padding: 15px; border-radius: 8px; margin-top: 8px; border: 1px solid #e2e8f0;">
              <p style="color: #334155; margin: 0; line-height: 1.6;">${requestData.additionalRequirements}</p>
            </div>
          </div>
          ` : ''}
        </div>

        <!-- What to Expect -->
        <div style="background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%); padding: 25px; border-radius: 12px; border: 1px solid #fed7aa; margin: 30px 0;">
          <h3 style="color: #ea580c; font-size: 18px; margin: 0 0 20px 0; font-weight: 600; display: flex; align-items: center;">
            <span style="margin-right: 10px;">⏰</span>
            What to Expect Next
          </h3>
          
          <div style="margin: 15px 0;">
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <span style="background: #ff7033; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</span>
              <div>
                <strong style="color: #ea580c; font-size: 15px;">Personal Outreach (Within 24 hours)</strong>
                <p style="color: #9a3412; margin: 5px 0 0 0; font-size: 14px; line-height: 1.4;">A dedicated team member will contact you to confirm details and understand your specific needs.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <span style="background: #ff7033; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</span>
              <div>
                <strong style="color: #ea580c; font-size: 15px;">Calendar Invites & Preparation</strong>
                <p style="color: #9a3412; margin: 5px 0 0 0; font-size: 14px; line-height: 1.4;">You'll receive detailed calendar invites with preparation materials tailored to your industry.</p>
              </div>
            </div>
            
            <div style="display: flex; align-items: flex-start;">
              <span style="background: #ff7033; color: white; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 15px; flex-shrink: 0;">3</span>
              <div>
                <strong style="color: #ea580c; font-size: 15px;">Customized Sessions</strong>
                <p style="color: #9a3412; margin: 5px 0 0 0; font-size: 14px; line-height: 1.4;">Sessions will be customized to your specific business needs, challenges, and industry requirements.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Service-Specific Information -->
        <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; border: 1px solid #bbf7d0; margin: 30px 0;">
          <h3 style="color: #166534; font-size: 18px; margin: 0 0 20px 0; font-weight: 600;">
            🎯 Your Personalized Experience
          </h3>
          
          <div style="margin: 15px 0;">
            ${requestTypes.includes('demo') ? `
            <div style="margin-bottom: 20px;">
              <h4 style="color: #15803d; font-size: 16px; margin: 0 0 8px 0; font-weight: 600;">📺 Product Demo Session</h4>
              <ul style="color: #16a34a; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                <li>Live demonstration of AI solutions relevant to your industry</li>
                <li>Interactive Q&A with our technical experts</li>
                <li>Customized use case scenarios based on your challenges</li>
                <li>ROI projections and implementation timelines</li>
              </ul>
            </div>
            ` : ''}
            
            ${requestTypes.includes('showcase') ? `
            <div style="margin-bottom: 20px;">
              <h4 style="color: #15803d; font-size: 16px; margin: 0 0 8px 0; font-weight: 600;">🏆 Solution Showcase</h4>
              <ul style="color: #16a34a; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                <li>Deep dive into solutions addressing your specific challenges</li>
                <li>Case studies from similar companies in your industry</li>
                <li>Detailed technical architecture and integration plans</li>
                <li>Custom proposal with pricing and timeline</li>
              </ul>
            </div>
            ` : ''}
            
            ${requestTypes.includes('assessment') ? `
            <div style="margin-bottom: 20px;">
              <h4 style="color: #15803d; font-size: 16px; margin: 0 0 8px 0; font-weight: 600;">🔍 AI Assessment</h4>
              <ul style="color: #16a34a; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                <li>Comprehensive evaluation of your current AI readiness</li>
                <li>Detailed analysis of your data infrastructure and capabilities</li>
                <li>Strategic roadmap with prioritized recommendations</li>
                <li>Implementation plan with milestones and success metrics</li>
              </ul>
            </div>
            ` : ''}
          </div>
        </div>

        <!-- Preparation Tips -->
        <div style="background: #f0f9ff; padding: 25px; border-radius: 12px; border: 1px solid #bae6fd; margin: 30px 0;">
          <h3 style="color: #0369a1; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">
            📚 How to Prepare
          </h3>
          <ul style="color: #0284c7; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
            <li><strong>Gather stakeholders:</strong> Identify key team members who should participate</li>
            <li><strong>Document processes:</strong> Note current workflows you'd like to improve</li>
            <li><strong>Define goals:</strong> Think about specific outcomes you want to achieve</li>
            <li><strong>Prepare questions:</strong> List any specific concerns or requirements</li>
            <li><strong>Review your data:</strong> Consider what data sources you have available</li>
          </ul>
        </div>

        <!-- Team Signature -->
        <div style="text-align: center; margin: 40px 0 20px;">
          <p style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 10px 0;">
            We're excited to show you what's possible,
          </p>
          <p style="color: #ff7033; font-size: 20px; font-weight: 700; margin: 0 0 8px 0;">
            The Strive Tech Team
          </p>
          <p style="color: #64748b; font-size: 14px; margin: 0; font-style: italic;">
            Your AI transformation experts
          </p>
        </div>

        <!-- Contact Information -->
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 30px;">
          <p style="color: #475569; font-size: 13px; margin: 0; text-align: center; line-height: 1.4;">
            <strong>Questions or need to reschedule?</strong><br>
            Reply to this email or contact us directly at 
            <a href="mailto:contact@strivetech.ai" style="color: #ff7033; text-decoration: none; font-weight: 600;">contact@strivetech.ai</a>
          </p>
        </div>
        
      </td>
    </tr>
    `;

    const html = this.wrapContent(content);

    return await this.sendEmail({
      to: [requestData.email],
      subject: `🎯 Your ${serviceList} Request Confirmed - We'll Contact You Within 24 Hours!`,
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
          <p><strong>Name:</strong> ${requestData.firstName} ${requestData.lastName}</p>
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
      subject: `New ${serviceList} Request from ${requestData.firstName} ${requestData.lastName}`,
      html,
    });
  }

  // Professional email template helpers
  private getEmailHeader(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Strive Tech</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .header-logo { height: 40px !important; max-width: 160px !important; }
      .content-padding { padding: 20px 15px !important; }
      .button { padding: 12px 20px !important; font-size: 16px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Inter', 'Segoe UI', 'Arial', sans-serif; line-height: 1.6;">
  
  <!-- Header Section -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);">
    <tr>
      <td style="padding: 40px 20px; text-align: center;">
        <img src="https://strivetech.ai/assets/STRIVE_Orange_Text_Transparent_1483x320px.webp" 
             alt="Strive Tech" class="header-logo" style="height: 50px; max-width: 200px; display: block; margin: 0 auto;">
        <div style="height: 2px; background: linear-gradient(90deg, transparent, #ff7033, transparent); margin: 25px auto 15px; max-width: 300px;"></div>
        <p style="color: #94a3b8; font-size: 14px; margin: 0; font-weight: 300;">Transforming Business with AI Solutions</p>
      </td>
    </tr>
  </table>
  
  <!-- Main Content Container -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" style="width: 100%; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 0;">
`;
  }

  private getEmailFooter(): string {
    return `
  </table>
  
  <!-- Footer Section -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);">
    <tr>
      <td style="padding: 40px 20px; text-align: center;">
        <div style="border-top: 1px solid #334155; padding-top: 30px; margin-bottom: 25px;"></div>
        
        <!-- Social Links & Quick Actions -->
        <div style="margin-bottom: 25px;">
          <a href="https://strivetech.ai/solutions" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background-color: #ff7033; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">Explore Solutions</a>
          <a href="https://strivetech.ai/request" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background-color: transparent; color: #ff7033; text-decoration: none; border: 1px solid #ff7033; border-radius: 6px; font-size: 14px; font-weight: 500;">Request Demo</a>
        </div>
        
        <!-- Contact Information -->
        <div style="color: #94a3b8; font-size: 14px; margin-bottom: 20px;">
          <p style="margin: 5px 0;">
            <strong style="color: #f8fafc;">Contact:</strong> 
            <a href="mailto:contact@strivetech.ai" style="color: #ff7033; text-decoration: none;">contact@strivetech.ai</a>
          </p>
          <p style="margin: 5px 0;">
            <strong style="color: #f8fafc;">Website:</strong> 
            <a href="https://strivetech.ai" style="color: #ff7033; text-decoration: none;">strivetech.ai</a>
          </p>
        </div>
        
        <!-- Company Info -->
        <div style="color: #64748b; font-size: 12px; line-height: 1.4;">
          <p style="margin: 8px 0;">© 2024 Strive Tech. All rights reserved.</p>
          <p style="margin: 8px 0;">Empowering businesses through cutting-edge artificial intelligence solutions.</p>
          <p style="margin: 8px 0;">
            <a href="https://strivetech.ai/privacy" style="color: #64748b; text-decoration: none;">Privacy Policy</a> | 
            <a href="https://strivetech.ai/terms" style="color: #64748b; text-decoration: none;">Terms of Service</a>
          </p>
        </div>
      </td>
    </tr>
  </table>
  
</body>
</html>
`;
  }

  private wrapContent(content: string): string {
    return this.getEmailHeader() + content + this.getEmailFooter();
  }
}

export const emailService = new EmailService();