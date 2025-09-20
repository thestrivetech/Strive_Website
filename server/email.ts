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

  // Helper method for keyword extraction
  private extractKeywords(message: string): string[] {
    const keywords = ['AI', 'artificial intelligence', 'machine learning', 'automation', 'demo', 'consultation', 'budget', 'urgent', 'implementation', 'solution', 'transform', 'digital', 'analytics', 'data'];
    const messageWords = message.toLowerCase().split(/\s+/);
    return keywords.filter(keyword => 
      messageWords.some(word => word.includes(keyword.toLowerCase()))
    ).slice(0, 5);
  }

  async sendContactFormNotification(formData: any) {
    const recipients = [
      'garrettholland@strivetech.ai',
      'jeffmeyer@strivetech.ai',
      'grantramey@strivetech.ai',
      'contact@strivetech.ai'
    ];

    // AI-powered lead scoring logic
    const calculateLeadScore = (data: any): { score: number; priority: 'high' | 'medium' | 'low'; reasoning: string[] } => {
      let score = 0;
      const reasoning: string[] = [];
      
      // Company size scoring
      if (data.companySize) {
        if (data.companySize.includes('500+') || data.companySize.includes('1000+')) {
          score += 30;
          reasoning.push('Enterprise company size indicates high-value prospect');
        } else if (data.companySize.includes('100-499') || data.companySize.includes('50-99')) {
          score += 20;
          reasoning.push('Mid-market company shows growth potential');
        } else {
          score += 10;
          reasoning.push('Small business with scalability needs');
        }
      }
      
      // Message analysis scoring
      if (data.message) {
        const message = data.message.toLowerCase();
        if (message.includes('ai') || message.includes('artificial intelligence') || message.includes('machine learning')) {
          score += 25;
          reasoning.push('Explicit AI interest indicates qualified prospect');
        }
        if (message.includes('urgent') || message.includes('asap') || message.includes('quickly')) {
          score += 20;
          reasoning.push('Urgency suggests immediate opportunity');
        }
        if (message.includes('budget') || message.includes('investment') || message.includes('cost')) {
          score += 15;
          reasoning.push('Budget discussion indicates serious buyer intent');
        }
        if (message.includes('demo') || message.includes('presentation') || message.includes('showcase')) {
          score += 15;
          reasoning.push('Demo request shows high purchase intent');
        }
      }
      
      // Contact completeness scoring
      if (data.phone) {
        score += 10;
        reasoning.push('Phone number provided shows engagement willingness');
      }
      if (data.company) {
        score += 10;
        reasoning.push('Company information indicates business context');
      }
      
      // Priority determination
      let priority: 'high' | 'medium' | 'low';
      if (score >= 60) priority = 'high';
      else if (score >= 30) priority = 'medium';
      else priority = 'low';
      
      return { score, priority, reasoning };
    };

    const leadAnalysis = calculateLeadScore(formData);
    const responseDeadline = new Date(Date.now() + (leadAnalysis.priority === 'high' ? 2 : leadAnalysis.priority === 'medium' ? 4 : 24) * 60 * 60 * 1000);
    
    const content = `
    <tr>
      <td class="content-padding" style="padding: 40px 30px;">
        
        <!-- Lead Alert Header -->
        <div style="text-align: center; margin-bottom: 35px;">
          <div style="display: inline-flex; align-items: center; gap: 12px; background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); padding: 16px 24px; border-radius: 12px; border: 1px solid #fecaca; margin-bottom: 20px;">
            <span style="font-size: 24px;">🚨</span>
            <h1 class="heading-lg text-gray-900" style="color: #111827; font-size: 24px; line-height: 30px; font-weight: 600; margin: 0;">
              NEW LEAD ALERT
            </h1>
            ${this.createPriorityBadge(leadAnalysis.priority)}
          </div>
          
          <!-- Lead Score Display -->
          <div style="background: linear-gradient(135deg, #ff7033 0%, #f97316 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 8px 25px -5px rgba(255, 112, 51, 0.3);">
            <h2 class="heading-xl text-white" style="color: #ffffff; font-size: 32px; line-height: 38px; font-weight: 700; margin: 0 0 8px 0;">
              Lead Score: ${leadAnalysis.score}/100
            </h2>
            <p class="body-base text-white" style="color: #ffffff; font-size: 16px; margin: 0; opacity: 0.9;">
              Response Required by: <strong>${responseDeadline.toLocaleString()}</strong>
            </p>
          </div>
        </div>

        <!-- Contact Profile Card -->
        <div class="card-premium" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; border: 1px solid #d1d5db; border-left: 4px solid #ff7033; padding: 25px; margin: 30px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <div style="background: #ff7033; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-right: 20px; box-shadow: 0 4px 6px -1px rgba(255, 112, 51, 0.25);">
              👤
            </div>
            <div>
              <h3 class="heading-lg text-gray-900" style="color: #111827; font-size: 24px; line-height: 30px; font-weight: 600; margin: 0 0 4px 0;">
                ${formData.firstName} ${formData.lastName}
              </h3>
              <p class="body-base text-gray-600" style="color: #4b5563; font-size: 16px; margin: 0;">
                ${formData.company || 'Individual Contact'}
              </p>
            </div>
          </div>
          
          <!-- Contact Methods -->
          <div style="display: grid; gap: 16px; margin: 20px 0;">
            <div style="display: flex; align-items: center; padding: 12px; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
              <span style="color: #ff7033; font-size: 18px; margin-right: 12px;">📧</span>
              <div>
                <span class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; font-weight: 500;">Email:</span>
                <a href="mailto:${formData.email}" style="color: #ff7033; text-decoration: none; font-weight: 600; margin-left: 8px;">
                  ${formData.email}
                </a>
              </div>
            </div>
            
            ${formData.phone ? `
            <div style="display: flex; align-items: center; padding: 12px; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
              <span style="color: #ff7033; font-size: 18px; margin-right: 12px;">📞</span>
              <div>
                <span class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; font-weight: 500;">Phone:</span>
                <a href="tel:${formData.phone}" style="color: #ff7033; text-decoration: none; font-weight: 600; margin-left: 8px;">
                  ${formData.phone}
                </a>
              </div>
            </div>
            ` : ''}
            
            ${formData.companySize ? `
            <div style="display: flex; align-items: center; padding: 12px; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
              <span style="color: #ff7033; font-size: 18px; margin-right: 12px;">🏢</span>
              <div>
                <span class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; font-weight: 500;">Company Size:</span>
                <span style="color: #111827; font-weight: 600; margin-left: 8px;">${formData.companySize}</span>
              </div>
            </div>
            ` : ''}
          </div>
        </div>

        <!-- AI Lead Analysis -->
        <div class="card-success" style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-radius: 12px; border: 1px solid #bbf7d0; padding: 25px; margin: 30px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <span style="color: #059669; font-size: 24px; margin-right: 12px;">🧠</span>
            <h3 class="heading-md" style="color: #166534; font-size: 20px; line-height: 26px; font-weight: 600; margin: 0;">
              AI Lead Intelligence
            </h3>
          </div>
          
          ${this.createProgressBar(leadAnalysis.score, 'Lead Quality Score')}
          
          <div style="margin: 20px 0;">
            <h4 class="heading-md" style="color: #166534; font-size: 16px; line-height: 20px; font-weight: 600; margin: 0 0 12px 0;">
              Key Insights:
            </h4>
            <ul style="margin: 0; padding-left: 20px; color: #15803d;">
              ${leadAnalysis.reasoning.map(reason => `<li style="margin: 8px 0; font-size: 14px; line-height: 1.5;">${reason}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Message Analysis -->
        <div class="card" style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; padding: 25px; margin: 30px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <span style="color: #ff7033; font-size: 24px; margin-right: 12px;">💬</span>
            <h3 class="heading-md text-gray-900" style="color: #111827; font-size: 20px; line-height: 26px; font-weight: 600; margin: 0;">
              Lead Message & Intent
            </h3>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #ff7033; margin: 16px 0;">
            <p class="body-base text-gray-700" style="color: #374151; font-size: 16px; margin: 0; line-height: 1.6; white-space: pre-wrap;">
              "${formData.message}"
            </p>
          </div>
          
          <!-- Message Keywords -->
          <div style="margin: 20px 0;">
            <p class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">
              Key Terms Detected:
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${this.extractKeywords(formData.message).map(keyword => `
                <span class="badge badge-primary" style="background: rgba(255, 112, 51, 0.1); color: #ff7033; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 600;">
                  ${keyword}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Quick Action Center -->
        <div class="card-warning" style="background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%); border-radius: 12px; border: 1px solid #fed7aa; padding: 25px; margin: 30px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <span style="color: #d97706; font-size: 24px; margin-right: 12px;">⚡</span>
            <h3 class="heading-md" style="color: #ea580c; font-size: 20px; line-height: 26px; font-weight: 600; margin: 0;">
              Immediate Actions Required
            </h3>
          </div>
          
          <div style="text-align: center; margin: 25px 0;">
            ${this.createQuickActionButton('📧 Reply Now', `mailto:${formData.email}?subject=Re: Your Inquiry to Strive Tech&body=Hi ${formData.firstName},%0A%0AThank you for contacting Strive Tech...`, 'primary', '📧')}
            ${this.createQuickActionButton('📅 Schedule Call', `https://calendly.com/strivetech/discovery-call?prefill_email=${formData.email}&prefill_name=${formData.firstName} ${formData.lastName}`, 'success', '📅')}
            ${this.createQuickActionButton('🎯 Add to CRM', '#', 'secondary', '🎯')}
          </div>
          
          <!-- Response Timeline -->
          <div style="background: rgba(255, 255, 255, 0.7); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 class="heading-md" style="color: #ea580c; font-size: 16px; line-height: 20px; font-weight: 600; margin: 0 0 12px 0;">
              Recommended Response Timeline:
            </h4>
            ${this.createTimelineStep(1, 'Initial Response', `Send personalized response within ${leadAnalysis.priority === 'high' ? '2 hours' : leadAnalysis.priority === 'medium' ? '4 hours' : '24 hours'}`, 'active', leadAnalysis.priority === 'high' ? '2h' : leadAnalysis.priority === 'medium' ? '4h' : '24h')}
            ${this.createTimelineStep(2, 'Discovery Call', 'Schedule and conduct needs assessment', 'pending', '1-3 days')}
            ${this.createTimelineStep(3, 'Proposal', 'Deliver customized solution proposal', 'pending', '5-7 days')}
          </div>
        </div>

        <!-- Team Assignment -->
        <div class="card" style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; padding: 25px; margin: 30px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <span style="color: #ff7033; font-size: 24px; margin-right: 12px;">👥</span>
            <h3 class="heading-md text-gray-900" style="color: #111827; font-size: 20px; line-height: 26px; font-weight: 600; margin: 0;">
              Recommended Team Assignment
            </h3>
          </div>
          
          ${this.createTeamMemberCard('Garrett Holland', 'CEO & Lead Solutions Architect', 'garrettholland@strivetech.ai')}
          ${this.createTeamMemberCard('Jeff Meyer', 'CTO & Technical Director', 'jeffmeyer@strivetech.ai')}
          ${this.createTeamMemberCard('Grant Ramey', 'VP of Client Success', 'grantramey@strivetech.ai')}
        </div>

        <!-- Performance Metrics -->
        <div style="text-align: center; margin: 35px 0;">
          <h3 class="heading-md text-gray-900" style="color: #111827; font-size: 20px; line-height: 26px; font-weight: 600; margin: 0 0 20px 0;">
            Team Performance Metrics
          </h3>
          <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
            ${this.createMetricCard('Avg Response Time', '2.3 hrs', 'down', '15%')}
            ${this.createMetricCard('Lead Conversion', '34%', 'up', '8%')}
            ${this.createMetricCard('Client Satisfaction', '4.8/5', 'up', '0.2')}
          </div>
        </div>

        <!-- Lead Source Intelligence -->
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border: 1px solid #bae6fd; margin-top: 30px;">
          <p class="caption text-gray-600" style="color: #4b5563; font-size: 12px; margin: 0; text-align: center; line-height: 1.4;">
            <strong>Lead Source:</strong> Website Contact Form • 
            <strong>Timestamp:</strong> ${new Date().toLocaleString()} • 
            <strong>User Agent:</strong> ${formData.userAgent || 'Not available'} •
            <strong>IP Location:</strong> ${formData.location || 'Not tracked'}
          </p>
        </div>
        
      </td>
    </tr>
    `;

    const html = this.wrapContent(content);

    return await this.sendEmail({
      to: recipients,
      subject: `🚨 ${leadAnalysis.priority.toUpperCase()} PRIORITY LEAD: ${formData.firstName} ${formData.lastName} (Score: ${leadAnalysis.score}/100)`,
      html,
    });
  }

  async sendNewsletterConfirmation(email: string) {
    // Generate member ID and welcome sequence
    const memberId = `SUB-${Date.now().toString().slice(-6)}-${Math.random().toString(36).slice(-3).toUpperCase()}`;
    const joinDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const nextNewsletter = new Date();
    nextNewsletter.setDate(nextNewsletter.getDate() + (9 - nextNewsletter.getDay()) % 7); // Next Tuesday
    
    // Personalized welcome gift selection
    const welcomeGifts = [
      { title: 'AI ROI Calculator', description: 'Calculate potential returns for your industry', url: 'https://strivetech.ai/roi-calculator', icon: '📊' },
      { title: 'Implementation Roadmap Template', description: 'Step-by-step AI adoption blueprint', url: 'https://strivetech.ai/resources/roadmap', icon: '🗺️' },
      { title: 'Industry Benchmark Report', description: 'See how your peers are using AI', url: 'https://strivetech.ai/resources/benchmarks', icon: '📈' },
      { title: 'Executive AI Glossary', description: 'Essential AI terms for business leaders', url: 'https://strivetech.ai/resources/glossary', icon: '📚' }
    ];
    
    const content = `
    <tr>
      <td class="content-padding" style="padding: 40px 30px;">
        
        <!-- Newsletter Welcome -->
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%); padding: 40px 30px; border-radius: 20px; border: 1px solid #fed7aa; margin-bottom: 30px; position: relative; overflow: hidden;">
            <!-- Celebration Elements -->
            <div style="position: absolute; top: 10px; left: 10px; font-size: 24px; opacity: 0.3;">🎉</div>
            <div style="position: absolute; top: 20px; right: 20px; font-size: 20px; opacity: 0.3;">✨</div>
            <div style="position: absolute; bottom: 15px; left: 20px; font-size: 18px; opacity: 0.3;">🚀</div>
            <div style="position: absolute; bottom: 20px; right: 15px; font-size: 22px; opacity: 0.3;">🎯</div>
            
            <div style="position: relative; z-index: 2;">
              <!-- VIP Crown Icon -->
              <div style="background: linear-gradient(135deg, #ff7033 0%, #f97316 100%); color: white; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px; box-shadow: 0 12px 30px -5px rgba(255, 112, 51, 0.4); border: 4px solid #ffffff;">
                <span style="font-size: 36px;">👑</span>
              </div>
              
              <h1 class="heading-xl text-gray-900" style="color: #111827; font-size: 32px; line-height: 38px; font-weight: 700; margin: 0 0 16px 0;">
                Welcome to Strive Tech!
              </h1>
              
              <!-- Animated Divider -->
              <div style="width: 120px; height: 4px; background: linear-gradient(90deg, #ff7033, #f97316, #ff7033); margin: 0 auto 25px; border-radius: 2px; box-shadow: 0 2px 6px rgba(255, 112, 51, 0.4);"></div>
              
              <p class="body-lg text-gray-600" style="color: #4b5563; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
                You've just joined an exclusive community of <strong>forward-thinking leaders</strong> transforming their industries with AI.
              </p>
              
              <!-- Member ID Badge -->
              <div style="background: rgba(255, 255, 255, 0.8); padding: 12px 20px; border-radius: 8px; display: inline-block; border: 1px solid #fed7aa;">
                <p class="body-sm text-gray-600" style="color: #4b5563; font-size: 12px; margin: 0 0 4px 0; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">
                  Subscriber ID
                </p>
                <p class="heading-md text-primary" style="color: #ff7033; font-size: 16px; line-height: 20px; font-weight: 700; margin: 0; letter-spacing: 2px; font-family: monospace;">
                  ${memberId}
                </p>
              </div>
            </div>
          </div>
          
          <!-- Member Since Badge -->
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); padding: 16px 24px; border-radius: 12px; border: 1px solid #bbf7d0; display: inline-block;">
            <p class="body-sm" style="color: #166534; font-size: 14px; margin: 0; font-weight: 600;">
              🌟 Subscriber Since: ${joinDate}
            </p>
          </div>
        </div>

        <!-- Exclusive Benefits Overview -->
        <div class="card-premium" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; border: 1px solid #d1d5db; border-left: 4px solid #ff7033; padding: 35px; margin: 35px 0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 class="heading-lg text-gray-900" style="color: #111827; font-size: 24px; line-height: 30px; font-weight: 600; margin: 0 0 12px 0;">
              🎁 Your Subscriber Benefits
            </h2>
            <p class="body-base text-gray-600" style="color: #4b5563; font-size: 16px; margin: 0; line-height: 1.6;">
              As a subscriber, you get access to weekly AI insights, case studies, and implementation resources delivered directly to your inbox.
            </p>
          </div>
          
          <div style="display: grid; gap: 25px;">
            ${this.createFeatureHighlight('🚀', 'AI Industry Intelligence', 'Weekly insider insights, breakthrough technologies, and trend analysis from our research team - delivered every Tuesday.')}
            ${this.createFeatureHighlight('📊', 'Exclusive Case Studies', 'In-depth transformation stories with ROI data, implementation details, and lessons learned from real companies.')}
            ${this.createFeatureHighlight('🎯', 'Subscriber Resources', 'Weekly industry insights, case studies, implementation guides, and AI strategy resources delivered to your inbox.')}
            ${this.createFeatureHighlight('⚡', 'Early Access Privileges', 'First access to new services, exclusive webinars, beta features, and subscriber-only discounts up to 25%.')}
            ${this.createFeatureHighlight('🧠', 'Expert Office Hours', 'Monthly live Q&A sessions with our AI experts - ask questions directly and get personalized advice.')}
            ${this.createFeatureHighlight('🎥', 'Premium Video Library', 'Access to our complete library of solution demos, case study videos, and technical deep-dives.')}
          </div>
        </div>

        <!-- Welcome Gift Selection -->
        <div class="card-success" style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-radius: 16px; border: 1px solid #bbf7d0; padding: 35px; margin: 35px 0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: #10b981; color: white; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 8px 25px -5px rgba(16, 185, 129, 0.4);">
              <span style="font-size: 24px;">🎁</span>
            </div>
            <h2 class="heading-lg" style="color: #166534; font-size: 22px; line-height: 28px; font-weight: 600; margin: 0 0 12px 0;">
              Choose Your Welcome Gift
            </h2>
            <p style="color: #15803d; font-size: 16px; margin: 0; line-height: 1.6;">
              Select one premium resource to download immediately as our welcome gift to you.
            </p>
          </div>
          
          <div style="display: grid; gap: 20px;">
            ${welcomeGifts.map((gift, index) => `
              <div style="background: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #bbf7d0; display: flex; align-items: center; transition: all 0.3s ease;">
                <div style="background: #10b981; color: white; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0;">
                  <span style="font-size: 20px;">${gift.icon}</span>
                </div>
                <div style="flex: 1; margin-right: 20px;">
                  <h4 style="color: #166534; font-size: 16px; font-weight: 600; margin: 0 0 6px 0;">${gift.title}</h4>
                  <p style="color: #15803d; font-size: 14px; margin: 0; line-height: 1.4;">${gift.description}</p>
                </div>
                <div>
                  ${this.createQuickActionButton('Download', gift.url, 'success', '⬇️')}
                </div>
              </div>
            `).join('')}
          </div>
          
          <div style="text-align: center; margin-top: 25px; padding-top: 25px; border-top: 1px solid #bbf7d0;">
            <p style="color: #15803d; font-size: 13px; margin: 0; font-style: italic;">
              💡 Pro Tip: Download all four resources throughout your first month as a subscriber
            </p>
          </div>
        </div>

        <!-- Content Calendar & Schedule -->
        <div class="card-warning" style="background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%); border-radius: 16px; border: 1px solid #fed7aa; padding: 35px; margin: 35px 0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: #f59e0b; color: white; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 8px 25px -5px rgba(245, 158, 11, 0.4);">
              <span style="font-size: 24px;">📅</span>
            </div>
            <h2 class="heading-lg" style="color: #ea580c; font-size: 22px; line-height: 28px; font-weight: 600; margin: 0 0 12px 0;">
              Your Content Calendar
            </h2>
            <p style="color: #9a3412; font-size: 16px; margin: 0; line-height: 1.6;">
              Premium content delivered on a schedule designed for busy executives.
            </p>
          </div>
          
          <div style="display: grid; gap: 20px;">
            <div style="background: rgba(255, 255, 255, 0.8); padding: 20px; border-radius: 12px; border: 1px solid #fed7aa;">
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <span style="background: #f59e0b; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 16px;">📬</span>
                <h4 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0;">Weekly AI Insights - Every Tuesday</h4>
              </div>
              <p style="color: #9a3412; font-size: 14px; margin: 0; line-height: 1.5;">
                Curated industry news, technology breakthroughs, and strategic insights delivered to your inbox. <strong>Next edition: ${nextNewsletter.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</strong>
              </p>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.8); padding: 20px; border-radius: 12px; border: 1px solid #fed7aa;">
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <span style="background: #f59e0b; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 16px;">🎯</span>
                <h4 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0;">Monthly Deep Dive - First Friday</h4>
              </div>
              <p style="color: #9a3412; font-size: 14px; margin: 0; line-height: 1.5;">
                Comprehensive analysis of emerging trends, detailed case studies, and actionable implementation strategies.
              </p>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.8); padding: 20px; border-radius: 12px; border: 1px solid #fed7aa;">
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <span style="background: #f59e0b; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 16px;">⚡</span>
                <h4 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0;">Breaking AI News - As It Happens</h4>
              </div>
              <p style="color: #9a3412; font-size: 14px; margin: 0; line-height: 1.5;">
                Immediate alerts for major industry developments, funding announcements, and game-changing innovations.
              </p>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.8); padding: 20px; border-radius: 12px; border: 1px solid #fed7aa;">
              <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <span style="background: #f59e0b; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 16px;">🎤</span>
                <h4 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0;">Expert Office Hours - Third Thursday</h4>
              </div>
              <p style="color: #9a3412; font-size: 14px; margin: 0; line-height: 1.5;">
                Live Q&A sessions with our AI experts. Submit questions in advance or join live for real-time interaction.
              </p>
            </div>
          </div>
          
          <div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 25px 0 0 0; border: 1px solid #fed7aa;">
            <p style="color: #9a3412; font-size: 13px; margin: 0; text-align: center; line-height: 1.4;">
              <strong>📧 Smart Delivery Promise:</strong> We respect your time and inbox. Quality over quantity, always. Average read time: 3-5 minutes.
            </p>
          </div>
        </div>

        <!-- Immediate Access Hub -->
        <div class="card" style="background: #ffffff; border-radius: 16px; box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; padding: 35px; margin: 35px 0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: linear-gradient(135deg, #ff7033 0%, #f97316 100%); color: white; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 8px 25px -5px rgba(255, 112, 51, 0.4);">
              <span style="font-size: 24px;">🚀</span>
            </div>
            <h2 class="heading-lg text-gray-900" style="color: #111827; font-size: 22px; line-height: 28px; font-weight: 600; margin: 0 0 12px 0;">
              Start Exploring Immediately
            </h2>
            <p class="body-base text-gray-600" style="color: #4b5563; font-size: 16px; margin: 0; line-height: 1.6;">
              Don't wait for your first newsletter. Dive into our premium content library right now.
            </p>
          </div>
          
          <div style="display: grid; gap: 20px; margin: 25px 0;">
            <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; align-items: center;">
              <div style="background: #ff7033; color: white; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0;">
                <span style="font-size: 20px;">🎥</span>
              </div>
              <div style="flex: 1; margin-right: 20px;">
                <h4 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 6px 0;">Solution Demo Library</h4>
                <p style="color: #4b5563; font-size: 14px; margin: 0;">Watch AI & Automation, Data Analytics, and Business Intelligence solutions in action</p>
              </div>
              ${this.createQuickActionButton('Watch Now', 'https://strivetech.ai/demos', 'primary', '▶️')}
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; align-items: center;">
              <div style="background: #ff7033; color: white; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0;">
                <span style="font-size: 20px;">📚</span>
              </div>
              <div style="flex: 1; margin-right: 20px;">
                <h4 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 6px 0;">Resource Center</h4>
                <p style="color: #4b5563; font-size: 14px; margin: 0;">Access whitepapers, guides, and tools exclusive to members</p>
              </div>
              ${this.createQuickActionButton('Browse', 'https://strivetech.ai/vip-resources', 'secondary', '📖')}
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; align-items: center;">
              <div style="background: #ff7033; color: white; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0;">
                <span style="font-size: 20px;">🏆</span>
              </div>
              <div style="flex: 1; margin-right: 20px;">
                <h4 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 6px 0;">Success Story Gallery</h4>
                <p style="color: #4b5563; font-size: 14px; margin: 0;">Real case studies with detailed ROI and implementation data</p>
              </div>
              ${this.createQuickActionButton('Explore', 'https://strivetech.ai/case-studies', 'secondary', '📈')}
            </div>
          </div>
        </div>

        <!-- VIP Community Access -->
        <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 30px; border-radius: 16px; border: 1px solid #bae6fd; margin: 35px 0; text-align: center;">
          <div style="background: #0ea5e9; color: white; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 8px 25px -5px rgba(14, 165, 233, 0.4);">
            <span style="font-size: 24px;">🤝</span>
          </div>
          <h2 style="color: #0369a1; font-size: 20px; margin: 0 0 15px 0; font-weight: 600;">
            Join the Community
          </h2>
          <p style="color: #0284c7; margin: 0 0 25px 0; font-size: 16px; line-height: 1.6;">
            Connect with fellow AI pioneers, share insights, and get answers from our expert community.
          </p>
          
          <div style="margin: 20px 0;">
            ${this.createQuickActionButton('🌟 Join Community', 'https://strivetech.ai/community', 'primary')}
            ${this.createQuickActionButton('💬 Live Chat', 'https://strivetech.ai/chat', 'secondary')}
          </div>
          
          <p style="color: #0284c7; font-size: 13px; margin: 15px 0 0 0;">
            <strong>2,847 subscribers</strong> are already transforming their businesses together
          </p>
        </div>

        <!-- Personalization Options -->
        <div class="card" style="background: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; padding: 35px; margin: 35px 0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <span style="color: #ff7033; font-size: 32px; display: block; margin-bottom: 16px;">⚙️</span>
            <h2 class="heading-lg text-gray-900" style="color: #111827; font-size: 20px; line-height: 26px; font-weight: 600; margin: 0 0 12px 0;">
              Customize Your Experience
            </h2>
            <p class="body-base text-gray-600" style="color: #4b5563; font-size: 16px; margin: 0; line-height: 1.6;">
              Tell us about your interests to receive the most relevant content for your business.
            </p>
          </div>
          
          <div style="text-align: center; margin: 25px 0;">
            ${this.createQuickActionButton('🎯 Set Preferences', 'https://strivetech.ai/preferences?email=' + encodeURIComponent(email), 'primary')}
            ${this.createQuickActionButton('📋 Take Survey', 'https://strivetech.ai/vip-survey', 'secondary')}
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <h4 style="color: #111827; font-size: 14px; font-weight: 600; margin: 0 0 12px 0; text-align: center;">Popular Customization Options:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
              <span class="badge badge-primary" style="background: rgba(255, 112, 51, 0.1); color: #ff7033; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">Healthcare AI</span>
              <span class="badge badge-primary" style="background: rgba(255, 112, 51, 0.1); color: #ff7033; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">Financial Services</span>
              <span class="badge badge-primary" style="background: rgba(255, 112, 51, 0.1); color: #ff7033; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">Manufacturing</span>
              <span class="badge badge-primary" style="background: rgba(255, 112, 51, 0.1); color: #ff7033; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">Retail & E-commerce</span>
              <span class="badge badge-primary" style="background: rgba(255, 112, 51, 0.1); color: #ff7033; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">Enterprise AI</span>
            </div>
          </div>
        </div>

        <!-- Ready for Next Level -->
        <div class="card-success" style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-radius: 16px; border: 1px solid #bbf7d0; padding: 35px; margin: 35px 0; text-align: center;">
          <div style="background: #16a34a; color: white; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 8px 25px -5px rgba(22, 163, 74, 0.4);">
            <span style="font-size: 24px;">🚀</span>
          </div>
          <h2 style="color: #166534; font-size: 20px; margin: 0 0 15px 0; font-weight: 600;">
            Ready to Transform Your Business?
          </h2>
          <p style="color: #15803d; margin: 0 0 25px 0; font-size: 16px; line-height: 1.6;">
            Don't just read about AI transformation - experience it. Schedule a free assessment with our experts.
          </p>
          
          <div style="margin: 20px 0;">
            ${this.createQuickActionButton('🎯 Schedule Assessment', 'https://strivetech.ai/request', 'success')}
            ${this.createQuickActionButton('📊 ROI Assessment', 'https://strivetech.ai/assessment', 'secondary')}
          </div>
          
          <p style="color: #15803d; font-size: 13px; margin: 15px 0 0 0;">
            <strong>Subscriber Benefit:</strong> Priority scheduling and dedicated support
          </p>
        </div>

        <!-- VIP Team Introduction -->
        <div class="card" style="background: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; padding: 35px; margin: 35px 0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <span style="color: #ff7033; font-size: 32px; display: block; margin-bottom: 16px;">👥</span>
            <h2 class="heading-lg text-gray-900" style="color: #111827; font-size: 20px; line-height: 26px; font-weight: 600; margin: 0 0 12px 0;">
              Meet Your Support Team
            </h2>
            <p class="body-base text-gray-600" style="color: #4b5563; font-size: 16px; margin: 0; line-height: 1.6;">
              The experts behind your premium content and available for direct consultation.
            </p>
          </div>
          
          ${this.createTeamMemberCard('Garrett Holland', 'CEO & Chief AI Strategist', 'garrettholland@strivetech.ai')}
          ${this.createTeamMemberCard('Jeff Meyer', 'CTO & Technical Innovation Lead', 'jeffmeyer@strivetech.ai')}
          ${this.createTeamMemberCard('Grant Ramey', 'VP of Member Success', 'grantramey@strivetech.ai')}
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0; text-align: center;">
            <p style="color: #4b5563; font-size: 14px; margin: 0;">
              <strong>Subscriber Perk:</strong> Direct access to our leadership team for strategic AI guidance
            </p>
          </div>
        </div>

        <!-- Welcome Signature -->
        <div style="text-align: center; margin: 45px 0 25px;">
          <p class="body-lg text-gray-900" style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 12px 0;">
            Welcome to the future of business intelligence,
          </p>
          <p class="heading-lg text-primary" style="color: #ff7033; font-size: 24px; line-height: 30px; font-weight: 700; margin: 0 0 8px 0;">
            The Strive Tech Team
          </p>
          <p class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; margin: 0; font-style: italic;">
            Your dedicated AI transformation partners
          </p>
        </div>

        <!-- Member Management -->
        <div style="background: #f8fafc; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0; margin-top: 35px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h4 style="color: #374151; font-size: 16px; margin: 0 0 16px 0; font-weight: 600;">
              Newsletter Management
            </h4>
          </div>
          
          <div style="display: grid; gap: 16px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
              <span style="color: #ff7033; font-size: 16px;">📧</span>
              <span style="color: #4b5563; font-size: 14px;">Member Email:</span>
              <span style="color: #111827; font-weight: 600; font-size: 14px;">${email}</span>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
              <span style="color: #ff7033; font-size: 16px;">🆔</span>
              <span style="color: #4b5563; font-size: 14px;">Member ID:</span>
              <span style="color: #ff7033; font-weight: 600; font-size: 14px; font-family: monospace;">${memberId}</span>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
              <span style="color: #ff7033; font-size: 16px;">⚙️</span>
              <a href="https://strivetech.ai/preferences?email=${encodeURIComponent(email)}" style="color: #ff7033; text-decoration: none; font-weight: 600; font-size: 14px;">Manage Preferences</a>
              <span style="color: #d1d5db;">•</span>
              <a href="mailto:contact@strivetech.ai?subject=Newsletter%20Support%20-%20${memberId}" style="color: #ff7033; text-decoration: none; font-weight: 600; font-size: 14px;">Newsletter Support</a>
            </div>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; margin: 20px 0 0 0; padding: 15px 0 0 0;">
            <p style="color: #64748b; font-size: 12px; margin: 0; text-align: center; line-height: 1.4;">
              Questions about your newsletter subscription? Contact our support team anytime.
              <br>To update preferences or unsubscribe, 
              <a href="mailto:contact@strivetech.ai?subject=VIP%20Newsletter%20-%20${memberId}" style="color: #ff7033; text-decoration: none;">email us directly</a>.
            </p>
          </div>
        </div>
        
      </td>
    </tr>
    `;

    const html = this.wrapContent(content);

    return await this.sendEmail({
      to: [email],
      subject: `🚀 Welcome to Strive Tech! Your AI intelligence starts now (Subscriber: ${memberId})`,
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

    // Calculate meeting priority based on request details
    let priorityScore = 0;
    if (requestData.meetingType) {
      if (requestData.meetingType.includes('Enterprise') || requestData.meetingType.includes('Strategic')) priorityScore += 25;
      else if (requestData.meetingType.includes('Technical') || requestData.meetingType.includes('Demo')) priorityScore += 15;
      else if (requestData.meetingType.includes('Consultation')) priorityScore += 10;
    }
    if (requestData.preferredDate) {
      const preferredDate = new Date(requestData.preferredDate);
      const daysFromNow = Math.ceil((preferredDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
      if (daysFromNow <= 3) priorityScore += 20;
      else if (daysFromNow <= 7) priorityScore += 10;
    }
    if (requestData.message && requestData.message.toLowerCase().includes('urgent')) priorityScore += 15;

    const priorityLevel = priorityScore >= 40 ? 'HIGH' : priorityScore >= 20 ? 'MEDIUM' : 'STANDARD';
    const priorityColors = {
      'HIGH': { bg: '#fef2f2', border: '#fca5a5', text: '#dc2626', badge: '#dc2626' },
      'MEDIUM': { bg: '#fef3e2', border: '#fed7aa', text: '#ea580c', badge: '#ea580c' },
      'STANDARD': { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a', badge: '#16a34a' }
    };

    const colors = priorityColors[priorityLevel];
    const now = new Date();
    const responseDeadline = new Date(now.getTime() + 12 * 60 * 60 * 1000); // 12 hours for meetings

    // Parse preferred date for better display
    const preferredDate = requestData.preferredDate ? new Date(requestData.preferredDate) : null;
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    };

    const content = `
    <tr>
      <td class="content-padding" style="padding: 0;">
        
        <!-- Meeting Request Notification -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%); padding: 40px; text-align: center; position: relative; overflow: hidden;">
          <!-- Animated background pattern -->
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(circle at 40% 60%, rgba(255,255,255,0.03) 0%, transparent 50%);"></div>
          
          <div style="position: relative; z-index: 2;">
            <!-- Meeting icon with pulse animation -->
            <div style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 0 30px rgba(59,130,246,0.4), 0 0 60px rgba(59,130,246,0.2);">
              <span style="font-size: 36px;">📅</span>
            </div>
            
            <h1 style="color: white; font-size: 32px; font-weight: 800; margin: 0 0 12px 0; line-height: 1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.5);">
              Meeting Request Notification
            </h1>
            <div style="width: 100px; height: 3px; background: linear-gradient(90deg, #3b82f6, #2563eb); margin: 0 auto 16px; border-radius: 2px;"></div>
            <p style="color: #cbd5e1; font-size: 18px; font-weight: 500; margin: 0;">
              New ${requestData.meetingType || 'Meeting'} Request from ${requestData.firstName} ${requestData.lastName}
            </p>
          </div>
        </div>

        <!-- Priority & Urgency Alert -->
        <div style="background: ${colors.bg}; border: 2px solid ${colors.border}; padding: 25px 40px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center;">
            <div style="background: ${colors.badge}; color: white; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 14px; margin-right: 20px;">
              ${priorityLevel} PRIORITY
            </div>
            <div>
              <h3 style="color: ${colors.text}; font-size: 18px; font-weight: 700; margin: 0 0 4px 0;">
                Meeting Score: ${priorityScore}/100
              </h3>
              <p style="color: ${colors.text}; font-size: 14px; margin: 0; opacity: 0.8;">
                ${preferredDate ? `Requested: ${formatDate(preferredDate)}` : 'No specific date provided'} • Response by: ${responseDeadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
              </p>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="background: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <span style="color: #0f172a; font-size: 24px; font-weight: 800;">${priorityScore}</span>
              <span style="color: #64748b; font-size: 12px; font-weight: 600; display: block;">URGENCY SCORE</span>
            </div>
          </div>
        </div>

        <!-- Quick Action Command Center -->
        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 30px 40px;">
          <h3 style="color: white; font-size: 18px; font-weight: 600; margin: 0 0 20px 0; text-align: center;">
            ⚡ Immediate Scheduling Actions
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px;">
            ${this.createQuickActionButton('📞 Call Immediately', `tel:${requestData.phone || 'N/A'}`, 'primary', '📞')}
            ${this.createQuickActionButton('📧 Send Availability', `mailto:${requestData.email}?subject=Re: Meeting Request&body=Hi ${requestData.firstName},%0A%0AThank you for your meeting request...`, 'success', '📧')}
            ${this.createQuickActionButton('📅 Calendar Link', `https://calendly.com/strivetech/meeting?prefill_email=${requestData.email}&prefill_name=${requestData.firstName} ${requestData.lastName}`, 'secondary', '📅')}
            ${this.createQuickActionButton('🎯 Add to Calendar', '#', 'warning', '🎯')}
          </div>
        </div>

        <!-- Meeting Intelligence Dashboard -->
        <div style="background: white; padding: 40px;">
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 20px; padding: 35px; border: 1px solid #e2e8f0; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 10px 30px rgba(139,92,246,0.3);">
                <span style="font-size: 28px;">🧠</span>
              </div>
              <h2 style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 8px 0;">
                Meeting Intelligence Analysis
              </h2>
              <p style="color: #64748b; font-size: 16px; margin: 0;">
                Smart insights and coordination recommendations for optimal scheduling
              </p>
            </div>
            
            <!-- Intelligence Cards Grid -->
            <div style="display: grid; gap: 25px;">
              
              <!-- Contact & Meeting Details -->
              <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 8px 25px rgba(0,0,0,0.08); overflow: hidden;">
                <div style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 20px; display: flex; align-items: center;">
                  <div style="background: rgba(255,255,255,0.2); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 20px;">👤</span>
                  </div>
                  <div>
                    <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700;">Meeting Request Details</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 14px;">Comprehensive request information and contact data</p>
                  </div>
                </div>
                <div style="padding: 25px;">
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div>
                      <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Attendee Name</span>
                      <p style="color: #0f172a; font-weight: 700; font-size: 16px; margin: 4px 0 0 0;">${requestData.firstName} ${requestData.lastName}</p>
                    </div>
                    <div>
                      <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</span>
                      <p style="color: #0f172a; font-weight: 700; font-size: 16px; margin: 4px 0 0 0;">${requestData.email}</p>
                    </div>
                    <div>
                      <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</span>
                      <p style="color: #0f172a; font-weight: 700; font-size: 16px; margin: 4px 0 0 0;">${requestData.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Company</span>
                      <p style="color: #0f172a; font-weight: 700; font-size: 16px; margin: 4px 0 0 0;">${requestData.company}</p>
                    </div>
                    <div>
                      <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Meeting Type</span>
                      <p style="color: #0f172a; font-weight: 700; font-size: 16px; margin: 4px 0 0 0;">${requestData.meetingType || 'General Meeting'}</p>
                    </div>
                    ${preferredDate ? `
                    <div>
                      <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Preferred Date</span>
                      <p style="color: #0f172a; font-weight: 700; font-size: 16px; margin: 4px 0 0 0;">${formatDate(preferredDate)}</p>
                    </div>
                    ` : ''}
                  </div>
                </div>
              </div>

              <!-- Meeting Context & Message -->
              ${requestData.message ? `
              <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 8px 25px rgba(0,0,0,0.08); overflow: hidden;">
                <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; display: flex; align-items: center;">
                  <div style="background: rgba(255,255,255,0.2); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 20px;">💬</span>
                  </div>
                  <div>
                    <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700;">Meeting Context & Message</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 14px;">Additional context and specific requirements</p>
                  </div>
                </div>
                <div style="padding: 25px;">
                  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <p style="color: #334155; margin: 0; line-height: 1.6; font-size: 15px; font-weight: 500;">${requestData.message}</p>
                  </div>
                  
                  <!-- Message Analysis -->
                  <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                      ${requestData.message.toLowerCase().includes('urgent') ? '<span style="background: #fef2f2; color: #dc2626; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">🚨 Urgent Request</span>' : ''}
                      ${requestData.message.toLowerCase().includes('demo') ? '<span style="background: #f0f9ff; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">🎯 Demo Interest</span>' : ''}
                      ${requestData.message.toLowerCase().includes('partnership') || requestData.message.toLowerCase().includes('collaborate') ? '<span style="background: #f0fdf4; color: #15803d; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">🤝 Partnership Opportunity</span>' : ''}
                      ${requestData.message.toLowerCase().includes('budget') || requestData.message.toLowerCase().includes('cost') ? '<span style="background: #fef3e2; color: #ea580c; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">💰 Budget Discussion</span>' : ''}
                    </div>
                  </div>
                </div>
              </div>
              ` : ''}

              <!-- Scheduling Intelligence -->
              <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 8px 25px rgba(0,0,0,0.08); overflow: hidden;">
                <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 20px; display: flex; align-items: center;">
                  <div style="background: rgba(255,255,255,0.2); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 20px;">📊</span>
                  </div>
                  <div>
                    <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700;">Scheduling Intelligence</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 14px;">Smart recommendations for optimal meeting coordination</p>
                  </div>
                </div>
                <div style="padding: 25px;">
                  <div style="display: grid; gap: 16px;">
                    
                    <!-- Timing Analysis -->
                    <div style="background: #fef3e2; padding: 16px; border-radius: 8px; border: 1px solid #fed7aa;">
                      <h4 style="color: #ea580c; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">⏰ Timing Analysis</h4>
                      ${preferredDate ? `
                        <p style="color: #9a3412; font-size: 13px; margin: 0; line-height: 1.5;">
                          <strong>Requested Date:</strong> ${formatDate(preferredDate)}<br>
                          <strong>Days from Now:</strong> ${Math.ceil((preferredDate.getTime() - now.getTime()) / (1000 * 3600 * 24))} days<br>
                          <strong>Urgency Level:</strong> ${Math.ceil((preferredDate.getTime() - now.getTime()) / (1000 * 3600 * 24)) <= 3 ? 'High - Schedule ASAP' : Math.ceil((preferredDate.getTime() - now.getTime()) / (1000 * 3600 * 24)) <= 7 ? 'Medium - This Week' : 'Standard - Next Week+'}
                        </p>
                      ` : `
                        <p style="color: #9a3412; font-size: 13px; margin: 0; line-height: 1.5;">
                          <strong>No specific date provided</strong><br>
                          Recommend offering multiple options in next 7-14 days
                        </p>
                      `}
                    </div>

                    <!-- Meeting Type Recommendations -->
                    <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; border: 1px solid #bae6fd;">
                      <h4 style="color: #0369a1; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">🎯 Meeting Format Recommendations</h4>
                      <p style="color: #0284c7; font-size: 13px; margin: 0; line-height: 1.5;">
                        ${requestData.meetingType === 'Demo' || requestData.meetingType === 'Product Demo' ? 
                          '<strong>Technical Demo Session:</strong> 45-60 minutes, include technical team lead, prepare live demonstrations' :
                        requestData.meetingType === 'Consultation' || requestData.meetingType === 'Strategy' ?
                          '<strong>Strategic Consultation:</strong> 30-45 minutes, senior leadership recommended, focus on business outcomes' :
                        requestData.meetingType === 'Partnership' ?
                          '<strong>Partnership Discussion:</strong> 60-90 minutes, include business development team, prepare partnership framework' :
                          '<strong>Discovery Meeting:</strong> 30-45 minutes, needs assessment focus, prepare qualifying questions'}
                      </p>
                    </div>

                    <!-- Team Assignment Recommendation -->
                    <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; border: 1px solid #bbf7d0;">
                      <h4 style="color: #15803d; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">👥 Recommended Team Assignment</h4>
                      <div style="color: #16a34a; font-size: 13px; line-height: 1.5;">
                        <div style="margin-bottom: 6px;">
                          <strong>Primary:</strong> ${priorityLevel === 'HIGH' ? 'Garrett Holland (CEO)' : 'Grant Ramey (VP Client Success)'}
                        </div>
                        ${requestData.meetingType && (requestData.meetingType.includes('Demo') || requestData.meetingType.includes('Technical')) ? 
                          '<div style="margin-bottom: 6px;"><strong>Technical Lead:</strong> Jeff Meyer (CTO)</div>' : ''}
                        <div><strong>Support:</strong> Full team coordination for seamless experience</div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Meeting Action Plan -->
        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); padding: 40px;">
          <div style="text-align: center; margin-bottom: 35px;">
            <div style="background: linear-gradient(135deg, #16a34a, #15803d); color: white; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 10px 30px rgba(22,163,74,0.3);">
              <span style="font-size: 28px;">📋</span>
            </div>
            <h2 style="color: #166534; font-size: 24px; font-weight: 700; margin: 0 0 8px 0;">
              Meeting Action Plan
            </h2>
            <p style="color: #15803d; font-size: 16px; margin: 0;">
              Step-by-step coordination protocol for optimal meeting success
            </p>
          </div>
          
          <div style="display: grid; gap: 20px; max-width: 900px; margin: 0 auto;">
            
            <!-- Immediate Actions (0-2 hours) -->
            <div style="background: white; padding: 25px; border-radius: 16px; border: 1px solid #bbf7d0; box-shadow: 0 8px 25px rgba(22,163,74,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="background: #dc2626; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                  <span style="font-size: 18px;">⚡</span>
                </div>
                <h3 style="color: #166534; font-size: 18px; font-weight: 600; margin: 0;">Immediate Actions (0-2 Hours)</h3>
              </div>
              <ul style="color: #15803d; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
                <li><strong>Acknowledge receipt</strong> with personalized email response within 30 minutes</li>
                <li><strong>Send calendar availability</strong> with multiple time slot options for next 7-14 days</li>
                <li><strong>Assign team lead</strong> based on meeting type and priority level</li>
                <li><strong>Create meeting preparation document</strong> with agenda and materials</li>
                <li><strong>Add to team calendar</strong> and set internal coordination reminders</li>
              </ul>
            </div>

            <!-- Preparation Phase (2-24 hours) -->
            <div style="background: white; padding: 25px; border-radius: 16px; border: 1px solid #bbf7d0; box-shadow: 0 8px 25px rgba(22,163,74,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="background: #f59e0b; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                  <span style="font-size: 18px;">📋</span>
                </div>
                <h3 style="color: #166534; font-size: 18px; font-weight: 600; margin: 0;">Preparation Phase (2-24 Hours)</h3>
              </div>
              <ul style="color: #15803d; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
                <li><strong>Research attendee and company</strong> background for contextual conversation</li>
                <li><strong>Prepare meeting agenda</strong> tailored to their specific meeting type and needs</li>
                <li><strong>Coordinate team schedules</strong> and confirm all required attendees</li>
                <li><strong>Set up meeting technology</strong> (Zoom/Teams links, screen sharing, recording)</li>
                <li><strong>Prepare follow-up materials</strong> and next-step options</li>
              </ul>
            </div>

            <!-- Meeting Execution -->
            <div style="background: white; padding: 25px; border-radius: 16px; border: 1px solid #bbf7d0; box-shadow: 0 8px 25px rgba(22,163,74,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="background: #3b82f6; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                  <span style="font-size: 18px;">🎯</span>
                </div>
                <h3 style="color: #166534; font-size: 18px; font-weight: 600; margin: 0;">Meeting Execution Excellence</h3>
              </div>
              <ul style="color: #15803d; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
                <li><strong>Professional meeting setup</strong> with branded backgrounds and quality audio/video</li>
                <li><strong>Structured agenda execution</strong> with time management and engagement tracking</li>
                <li><strong>Active needs discovery</strong> through strategic questioning and listening</li>
                <li><strong>Solution presentation</strong> tailored to their specific requirements and context</li>
                <li><strong>Clear next steps</strong> with defined timelines and mutual commitments</li>
              </ul>
            </div>

            <!-- Post-Meeting Protocol -->
            <div style="background: white; padding: 25px; border-radius: 16px; border: 1px solid #bbf7d0; box-shadow: 0 8px 25px rgba(22,163,74,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="background: #8b5cf6; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                  <span style="font-size: 18px;">📤</span>
                </div>
                <h3 style="color: #166534; font-size: 18px; font-weight: 600; margin: 0;">Post-Meeting Follow-Up</h3>
              </div>
              <ul style="color: #15803d; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
                <li><strong>Send meeting summary</strong> within 2 hours with key discussion points and agreements</li>
                <li><strong>Deliver promised materials</strong> and resources mentioned during the meeting</li>
                <li><strong>Schedule follow-up meetings</strong> or next steps as appropriate</li>
                <li><strong>Update CRM system</strong> with meeting notes, outcomes, and next actions</li>
                <li><strong>Internal team debrief</strong> to ensure aligned follow-up strategy</li>
              </ul>
            </div>

          </div>
        </div>

        <!-- Resource Preparation Hub -->
        <div style="background: white; padding: 40px;">
          <div style="background: linear-gradient(135deg, #fef3e2 0%, #fed7aa 100%); border-radius: 20px; padding: 35px; border: 1px solid #fed7aa;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 10px 30px rgba(245,158,11,0.3);">
                <span style="font-size: 28px;">📚</span>
              </div>
              <h2 style="color: #ea580c; font-size: 24px; font-weight: 700; margin: 0 0 8px 0;">
                Meeting Resource Preparation
              </h2>
              <p style="color: #9a3412; font-size: 16px; margin: 0;">
                Curated resources and materials for different meeting types
              </p>
            </div>
            
            <div style="display: grid; gap: 20px;">
              
              <!-- Meeting Type Specific Resources -->
              <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(245,158,11,0.2);">
                <h4 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">📁 Meeting-Specific Resource Kit</h4>
                
                ${requestData.meetingType === 'Demo' || (requestData.message && requestData.message.toLowerCase().includes('demo')) ? `
                <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin-bottom: 12px; border: 1px solid #bae6fd;">
                  <h5 style="color: #0369a1; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">🎯 Demo Meeting Resources</h5>
                  <ul style="color: #0284c7; margin: 0; padding-left: 16px; font-size: 13px; line-height: 1.6;">
                    <li>Live demonstration environment and test data</li>
                    <li>Industry-specific use case scenarios</li>
                    <li>ROI calculator and pricing materials</li>
                    <li>Technical specification documents</li>
                  </ul>
                </div>
                ` : ''}
                
                ${requestData.meetingType === 'Consultation' || requestData.meetingType === 'Strategy' ? `
                <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; margin-bottom: 12px; border: 1px solid #bbf7d0;">
                  <h5 style="color: #15803d; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">💡 Consultation Resources</h5>
                  <ul style="color: #16a34a; margin: 0; padding-left: 16px; font-size: 13px; line-height: 1.6;">
                    <li>Strategic assessment framework and questionnaire</li>
                    <li>Industry benchmark and best practices guide</li>
                    <li>Implementation roadmap templates</li>
                    <li>Change management and adoption strategies</li>
                  </ul>
                </div>
                ` : ''}
                
                <div style="background: #faf5ff; padding: 16px; border-radius: 8px; border: 1px solid #e9d5ff;">
                  <h5 style="color: #7c3aed; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">📊 Universal Meeting Kit</h5>
                  <ul style="color: #8b5cf6; margin: 0; padding-left: 16px; font-size: 13px; line-height: 1.6;">
                    <li>Company overview and capabilities presentation</li>
                    <li>Case studies and success stories</li>
                    <li>Discovery question frameworks</li>
                    <li>Follow-up templates and next steps guides</li>
                  </ul>
                </div>
              </div>

              <!-- Team Action Checklist -->
              <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(245,158,11,0.2);">
                <h4 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">✅ Team Action Checklist</h4>
                <div style="display: grid; gap: 8px;">
                  <div style="color: #9a3412; font-size: 13px; padding: 8px 0; border-bottom: 1px solid rgba(245,158,11,0.2); display: flex; align-items: center;">
                    <span style="background: #16a34a; color: white; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; margin-right: 12px;">✓</span>
                    Assign primary meeting owner and backup coordinator
                  </div>
                  <div style="color: #9a3412; font-size: 13px; padding: 8px 0; border-bottom: 1px solid rgba(245,158,11,0.2); display: flex; align-items: center;">
                    <span style="background: #16a34a; color: white; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; margin-right: 12px;">✓</span>
                    Create shared preparation document for team alignment
                  </div>
                  <div style="color: #9a3412; font-size: 13px; padding: 8px 0; border-bottom: 1px solid rgba(245,158,11,0.2); display: flex; align-items: center;">
                    <span style="background: #16a34a; color: white; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; margin-right: 12px;">✓</span>
                    Schedule internal pre-meeting alignment session
                  </div>
                  <div style="color: #9a3412; font-size: 13px; padding: 8px 0; border-bottom: 1px solid rgba(245,158,11,0.2); display: flex; align-items: center;">
                    <span style="background: #16a34a; color: white; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; margin-right: 12px;">✓</span>
                    Prepare role assignments and speaking points
                  </div>
                  <div style="color: #9a3412; font-size: 13px; padding: 8px 0; display: flex; align-items: center;">
                    <span style="background: #16a34a; color: white; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; margin-right: 12px;">✓</span>
                    Set up post-meeting debrief and follow-up protocol
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Meeting Success Metrics -->
        <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 40px;">
          <div style="text-align: center; margin-bottom: 35px;">
            <div style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 10px 30px rgba(14,165,233,0.3);">
              <span style="font-size: 28px;">📈</span>
            </div>
            <h2 style="color: #0369a1; font-size: 24px; font-weight: 700; margin: 0 0 8px 0;">
              Meeting Success Framework
            </h2>
            <p style="color: #0284c7; font-size: 16px; margin: 0;">
              Key performance indicators and success metrics for optimal outcomes
            </p>
          </div>
          
          <div style="display: grid; gap: 25px; max-width: 800px; margin: 0 auto;">
            
            <!-- Primary Success Metrics -->
            <div style="background: white; padding: 25px; border-radius: 16px; border: 1px solid #bae6fd; box-shadow: 0 8px 25px rgba(14,165,233,0.1);">
              <h3 style="color: #0369a1; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; display: flex; align-items: center;">
                <span style="margin-right: 10px;">🎯</span>
                Primary Success Indicators
              </h3>
              <div style="display: grid; gap: 12px;">
                <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; border: 1px solid #bae6fd;">
                  <strong style="color: #0369a1; font-size: 14px;">Engagement Quality:</strong>
                  <span style="color: #0284c7; font-size: 13px; margin-left: 8px;">Active participation, quality questions, demonstration interest</span>
                </div>
                <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; border: 1px solid #bae6fd;">
                  <strong style="color: #0369a1; font-size: 14px;">Information Gathering:</strong>
                  <span style="color: #0284c7; font-size: 13px; margin-left: 8px;">Complete needs assessment, stakeholder identification, timeline clarity</span>
                </div>
                <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; border: 1px solid #bae6fd;">
                  <strong style="color: #0369a1; font-size: 14px;">Next Step Commitment:</strong>
                  <span style="color: #0284c7; font-size: 13px; margin-left: 8px;">Agreed timeline, additional meetings scheduled, proposal request</span>
                </div>
              </div>
            </div>

            <!-- Relationship Building Goals -->
            <div style="background: white; padding: 25px; border-radius: 16px; border: 1px solid #bae6fd; box-shadow: 0 8px 25px rgba(14,165,233,0.1);">
              <h3 style="color: #0369a1; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; display: flex; align-items: center;">
                <span style="margin-right: 10px;">🤝</span>
                Relationship Building Objectives
              </h3>
              <ul style="color: #0284c7; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
                <li><strong>Trust establishment</strong> through expertise demonstration and transparent communication</li>
                <li><strong>Value positioning</strong> by clearly articulating solutions to their specific challenges</li>
                <li><strong>Strategic partnership</strong> mindset rather than vendor-client relationship</li>
                <li><strong>Long-term vision</strong> alignment and mutual success planning</li>
              </ul>
            </div>

            <!-- Follow-Up Success Plan -->
            <div style="background: white; padding: 25px; border-radius: 16px; border: 1px solid #bae6fd; box-shadow: 0 8px 25px rgba(14,165,233,0.1);">
              <h3 style="color: #0369a1; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; display: flex; align-items: center;">
                <span style="margin-right: 10px;">📋</span>
                Post-Meeting Success Protocol
              </h3>
              <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; border: 1px solid #bae6fd;">
                <p style="color: #0284c7; font-size: 13px; margin: 0; line-height: 1.6;">
                  <strong>Quick Follow-up:</strong> Our team will send comprehensive follow-up with meeting summary, resource links, and clear next steps within 2-4 hours of meeting completion. Calendar invites for any scheduled follow-ups and all promised materials will be delivered promptly.
                </p>
              </div>
            </div>

          </div>
        </div>

        <!-- Meeting Notification Footer -->
        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 30px 40px; text-align: center;">
          <h3 style="color: white; font-size: 18px; font-weight: 600; margin: 0 0 20px 0;">
            📅 Meeting Request Logged - Team Notified
          </h3>
          <p style="color: #cbd5e1; font-size: 14px; margin: 0 0 20px 0; line-height: 1.6;">
            This meeting request has been processed and is ready for team coordination. Begin immediate scheduling and preparation procedures.
          </p>
          
          <!-- Quick Response Stats -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 20px; margin: 20px 0; max-width: 600px; margin-left: auto; margin-right: auto;">
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">
              <div style="color: white; font-size: 20px; font-weight: 700;">${priorityScore}</div>
              <div style="color: #cbd5e1; font-size: 12px;">Priority Score</div>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">
              <div style="color: white; font-size: 20px; font-weight: 700;">12h</div>
              <div style="color: #cbd5e1; font-size: 12px;">Response Target</div>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">
              <div style="color: white; font-size: 20px; font-weight: 700;">${requestData.meetingType ? '1' : '0'}</div>
              <div style="color: #cbd5e1; font-size: 12px;">Meeting Type</div>
            </div>
            ${preferredDate ? `
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">
              <div style="color: white; font-size: 20px; font-weight: 700;">${Math.ceil((preferredDate.getTime() - now.getTime()) / (1000 * 3600 * 24))}</div>
              <div style="color: #cbd5e1; font-size: 12px;">Days to Preferred</div>
            </div>
            ` : ''}
          </div>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.1); margin: 25px 0 0 0; padding: 20px 0 0 0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0; line-height: 1.4;">
              Meeting ID: MT-${Date.now().toString().slice(-6)} • Generated: ${now.toLocaleString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: '2-digit'
              })}<br>
              Automated notification from Strive Tech Meeting System.
            </p>
          </div>
        </div>
        
      </td>
    </tr>
    `;

    const html = this.wrapContent(content);

    return await this.sendEmail({
      to: recipients,
      subject: `📅 ${priorityLevel} Priority: New Meeting Request from ${requestData.firstName} ${requestData.lastName} - ${requestData.meetingType || 'General Meeting'}`,
      html,
    });
  }

  async sendContactFormConfirmation(formData: any) {
    // Calculate estimated response time based on inquiry complexity
    const calculateResponseTime = (data: any): { hours: number; specialist: string; urgency: 'standard' | 'priority' | 'urgent' } => {
      const message = data.message?.toLowerCase() || '';
      const isUrgent = message.includes('urgent') || message.includes('asap') || message.includes('immediate');
      const isComplex = message.includes('integration') || message.includes('enterprise') || message.includes('custom');
      const hasAI = message.includes('ai') || message.includes('machine learning') || message.includes('artificial intelligence');
      
      if (isUrgent) return { hours: 2, specialist: 'Priority Response Team', urgency: 'urgent' };
      if (hasAI && isComplex) return { hours: 4, specialist: 'Senior AI Solutions Architect', urgency: 'priority' };
      if (hasAI) return { hours: 6, specialist: 'AI Solutions Specialist', urgency: 'priority' };
      if (isComplex) return { hours: 8, specialist: 'Enterprise Solutions Team', urgency: 'standard' };
      return { hours: 12, specialist: 'Customer Success Team', urgency: 'standard' };
    };

    const responseInfo = calculateResponseTime(formData);
    const responseTime = new Date(Date.now() + responseInfo.hours * 60 * 60 * 1000);
    const ticketId = `ST-${Date.now().toString().slice(-6)}-${Math.random().toString(36).slice(-3).toUpperCase()}`;
    
    const content = `
    <tr>
      <td class="content-padding" style="padding: 40px 30px;">
        
        <!-- Premium Welcome Header -->
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); padding: 30px; border-radius: 16px; border: 1px solid #bbf7d0; margin-bottom: 30px; position: relative; overflow: hidden;">
            <!-- Success Animation -->
            <div style="position: absolute; top: -10px; right: -10px; width: 80px; height: 80px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; opacity: 0.1;"></div>
            <div style="position: absolute; bottom: -10px; left: -10px; width: 60px; height: 60px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; opacity: 0.1;"></div>
            
            <div style="position: relative; z-index: 2;">
              <div style="background: #10b981; color: white; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 8px 25px -5px rgba(16, 185, 129, 0.4);">
                <span style="font-size: 28px;">✅</span>
              </div>
              
              <h1 class="heading-xl text-gray-900" style="color: #111827; font-size: 32px; line-height: 38px; font-weight: 700; margin: 0 0 16px 0;">
                Thank You, ${formData.firstName}!
              </h1>
              
              <!-- Animated Divider -->
              <div style="width: 80px; height: 4px; background: linear-gradient(90deg, #ff7033, #f97316); margin: 0 auto 20px; border-radius: 2px; box-shadow: 0 2px 4px rgba(255, 112, 51, 0.3);"></div>
              
              <p class="body-lg text-gray-600" style="color: #4b5563; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
                Your message has been received and prioritized in our concierge system.
              </p>
              
              <!-- Priority Badge -->
              <div style="display: inline-flex; align-items: center; gap: 8px; background: ${responseInfo.urgency === 'urgent' ? '#fef2f2' : responseInfo.urgency === 'priority' ? '#fef3e2' : '#f0f9ff'}; color: ${responseInfo.urgency === 'urgent' ? '#dc2626' : responseInfo.urgency === 'priority' ? '#d97706' : '#0369a1'}; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                <span>${responseInfo.urgency === 'urgent' ? '🔥' : responseInfo.urgency === 'priority' ? '⚡' : '📋'}</span>
                ${responseInfo.urgency.toUpperCase()} PRIORITY
              </div>
            </div>
          </div>
          
          <!-- Ticket Reference -->
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 30px;">
            <p class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">
              Your Reference Number
            </p>
            <h2 class="heading-lg text-primary" style="color: #ff7033; font-size: 24px; line-height: 30px; font-weight: 600; margin: 0; letter-spacing: 2px;">
              ${ticketId}
            </h2>
            <p class="caption text-gray-500" style="color: #6b7280; font-size: 12px; margin: 8px 0 0 0;">
              Please reference this number in all future communications
            </p>
          </div>
        </div>

        <!-- Response Timeline Card -->
        <div class="card-premium" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; border: 1px solid #d1d5db; border-left: 4px solid #ff7033; padding: 30px; margin: 30px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 25px;">
            <div style="background: #ff7033; color: white; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-right: 20px; box-shadow: 0 4px 6px -1px rgba(255, 112, 51, 0.25);">
              ⏰
            </div>
            <div>
              <h3 class="heading-lg text-gray-900" style="color: #111827; font-size: 20px; line-height: 26px; font-weight: 600; margin: 0 0 4px 0;">
                Your Dedicated Response Schedule
              </h3>
              <p class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; margin: 0;">
                Assigned to: <strong>${responseInfo.specialist}</strong>
              </p>
            </div>
          </div>
          
          <!-- Interactive Timeline -->
          <div style="background: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #e5e7eb;">
            ${this.createTimelineStep(1, 'Message Received', 'Your inquiry has been logged and categorized', 'completed')}
            ${this.createTimelineStep(2, 'Expert Assignment', 'Routing to our best specialist for your needs', 'active', 'In Progress')}
            ${this.createTimelineStep(3, 'Personalized Response', `Detailed response from ${responseInfo.specialist}`, 'pending', `By ${responseTime.toLocaleString()}`)}
            ${this.createTimelineStep(4, 'Solution Discovery', 'Schedule follow-up assessment if needed', 'pending', '1-3 days')}
          </div>
          
          <!-- Urgency Indicator -->
          <div style="background: ${responseInfo.urgency === 'urgent' ? 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)' : responseInfo.urgency === 'priority' ? 'linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%)' : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'}; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid ${responseInfo.urgency === 'urgent' ? '#fecaca' : responseInfo.urgency === 'priority' ? '#fed7aa' : '#bae6fd'};">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 24px;">${responseInfo.urgency === 'urgent' ? '🚨' : responseInfo.urgency === 'priority' ? '⚡' : '⏱️'}</span>
              <div>
                <h4 style="color: ${responseInfo.urgency === 'urgent' ? '#dc2626' : responseInfo.urgency === 'priority' ? '#d97706' : '#0369a1'}; font-size: 16px; font-weight: 600; margin: 0 0 4px 0;">
                  Expected Response Time: ${responseInfo.hours} hours
                </h4>
                <p style="color: ${responseInfo.urgency === 'urgent' ? '#991b1b' : responseInfo.urgency === 'priority' ? '#92400e' : '#1e40af'}; font-size: 14px; margin: 0;">
                  ${responseInfo.urgency === 'urgent' ? 'Our fastest response team is on your case' : responseInfo.urgency === 'priority' ? 'Priority handling by senior specialists' : 'Standard professional service timeline'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Your Inquiry Summary -->
        <div class="card" style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; padding: 30px; margin: 30px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 25px;">
            <span style="color: #ff7033; font-size: 24px; margin-right: 16px;">📋</span>
            <h3 class="heading-lg text-gray-900" style="color: #111827; font-size: 20px; line-height: 26px; font-weight: 600; margin: 0;">
              Your Inquiry Summary
            </h3>
          </div>
          
          <!-- Contact Information Grid -->
          <div style="display: grid; gap: 20px; margin: 25px 0;">
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <h4 class="heading-md text-gray-900" style="color: #111827; font-size: 16px; line-height: 20px; font-weight: 600; margin: 0 0 16px 0;">
                Contact Details
              </h4>
              
              <div style="display: grid; gap: 12px;">
                <div style="display: flex; align-items: center;">
                  <span style="color: #ff7033; margin-right: 12px; font-size: 16px;">👤</span>
                  <span class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; font-weight: 500; width: 100px;">Name:</span>
                  <span class="body-sm text-gray-900" style="color: #111827; font-weight: 600; font-size: 14px;">${formData.firstName} ${formData.lastName}</span>
                </div>
                
                <div style="display: flex; align-items: center;">
                  <span style="color: #ff7033; margin-right: 12px; font-size: 16px;">📧</span>
                  <span class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; font-weight: 500; width: 100px;">Email:</span>
                  <span class="body-sm text-gray-900" style="color: #111827; font-weight: 600; font-size: 14px;">${formData.email}</span>
                </div>
                
                <div style="display: flex; align-items: center;">
                  <span style="color: #ff7033; margin-right: 12px; font-size: 16px;">🏢</span>
                  <span class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; font-weight: 500; width: 100px;">Company:</span>
                  <span class="body-sm text-gray-900" style="color: #111827; font-weight: 600; font-size: 14px;">${formData.company || 'Individual Inquiry'}</span>
                </div>
                
                ${formData.companySize ? `
                <div style="display: flex; align-items: center;">
                  <span style="color: #ff7033; margin-right: 12px; font-size: 16px;">📊</span>
                  <span class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; font-weight: 500; width: 100px;">Size:</span>
                  <span class="body-sm text-gray-900" style="color: #111827; font-weight: 600; font-size: 14px;">${formData.companySize}</span>
                </div>
                ` : ''}
                
                ${formData.phone ? `
                <div style="display: flex; align-items: center;">
                  <span style="color: #ff7033; margin-right: 12px; font-size: 16px;">📞</span>
                  <span class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; font-weight: 500; width: 100px;">Phone:</span>
                  <span class="body-sm text-gray-900" style="color: #111827; font-weight: 600; font-size: 14px;">${formData.phone}</span>
                </div>
                ` : ''}
              </div>
            </div>
            
            <!-- Message Content -->
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #ff7033;">
              <h4 class="heading-md text-gray-900" style="color: #111827; font-size: 16px; line-height: 20px; font-weight: 600; margin: 0 0 16px 0;">
                Your Message
              </h4>
              <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <p class="body-base text-gray-700" style="color: #374151; font-size: 16px; margin: 0; line-height: 1.6; white-space: pre-wrap;">
                  "${formData.message}"
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Immediate Value Section -->
        <div class="card-success" style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-radius: 12px; border: 1px solid #bbf7d0; padding: 30px; margin: 30px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 25px;">
            <span style="color: #059669; font-size: 24px; margin-right: 16px;">🎁</span>
            <h3 class="heading-lg" style="color: #166534; font-size: 20px; line-height: 26px; font-weight: 600; margin: 0;">
              Immediate Value While You Wait
            </h3>
          </div>
          
          <div style="display: grid; gap: 20px;">
            ${this.createFeatureHighlight('📚', 'Exclusive Resource Library', 'Access our comprehensive AI implementation guides and industry best practices while we prepare your response.')}
            ${this.createFeatureHighlight('🎥', 'Solution Preview Videos', 'Watch real demonstrations of AI & Automation, Data Analytics, and Computer Vision solutions across different industries.')}
            ${this.createFeatureHighlight('📊', 'ROI Calculator Tool', 'Estimate the potential return on investment for AI implementation in your specific business context.')}
            ${this.createFeatureHighlight('🏆', 'Success Story Gallery', 'Explore detailed case studies from companies similar to yours who have transformed with our solutions.')}
          </div>
          
          <div style="text-align: center; margin: 30px 0 20px 0;">
            ${this.createQuickActionButton('🎯 Explore Solutions', 'https://strivetech.ai/solutions', 'success')}
            ${this.createQuickActionButton('📚 Access Resources', 'https://strivetech.ai/resources', 'secondary')}
            ${this.createQuickActionButton('📊 Calculate ROI', 'https://strivetech.ai/roi-calculator', 'secondary')}
          </div>
        </div>

        <!-- Expert Team Preview -->
        <div class="card" style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; padding: 30px; margin: 30px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 25px;">
            <span style="color: #ff7033; font-size: 24px; margin-right: 16px;">👥</span>
            <h3 class="heading-lg text-gray-900" style="color: #111827; font-size: 20px; line-height: 26px; font-weight: 600; margin: 0;">
              Meet Your Potential Response Team
            </h3>
          </div>
          
          <p class="body-base text-gray-600" style="color: #4b5563; font-size: 16px; margin: 0 0 25px 0; line-height: 1.6;">
            Based on your inquiry, you'll be matched with one of our specialized experts:
          </p>
          
          ${this.createTeamMemberCard('Garrett Holland', 'CEO & Lead Solutions Architect', 'garrettholland@strivetech.ai', 'https://ui-avatars.com/api/?name=Garrett+Holland&background=ff7033&color=ffffff&size=48')}
          ${this.createTeamMemberCard('Jeff Meyer', 'CTO & Technical Director', 'jeffmeyer@strivetech.ai', 'https://ui-avatars.com/api/?name=Jeff+Meyer&background=ff7033&color=ffffff&size=48')}
          ${this.createTeamMemberCard('Grant Ramey', 'VP of Client Success', 'grantramey@strivetech.ai', 'https://ui-avatars.com/api/?name=Grant+Ramey&background=ff7033&color=ffffff&size=48')}
        </div>

        <!-- Premium Guarantee -->
        <div style="background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%); padding: 25px; border-radius: 12px; border: 1px solid #fed7aa; margin: 30px 0; text-align: center;">
          <div style="background: #ff7033; color: white; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 4px 6px -1px rgba(255, 112, 51, 0.25);">
            <span style="font-size: 20px;">🛡️</span>
          </div>
          <h3 class="heading-md" style="color: #ea580c; font-size: 18px; line-height: 24px; font-weight: 600; margin: 0 0 12px 0;">
            Our Concierge Service Guarantee
          </h3>
          <p style="color: #9a3412; margin: 0; font-size: 15px; line-height: 1.6;">
            If we don't respond within our promised timeframe, your next assessment is complimentary. 
            We're committed to delivering exceptional service that matches our technological excellence.
          </p>
        </div>

        <!-- Quick Actions -->
        <div style="background: #f0f9ff; padding: 25px; border-radius: 12px; border: 1px solid #bae6fd; margin: 30px 0;">
          <h3 style="color: #0369a1; font-size: 18px; margin: 0 0 20px 0; font-weight: 600; text-align: center;">
            Need Something Sooner?
          </h3>
          
          <div style="text-align: center;">
            ${this.createQuickActionButton('📞 Schedule Immediate Call', 'https://calendly.com/strivetech/urgent', 'primary')}
            ${this.createQuickActionButton('💬 Live Chat Support', 'https://strivetech.ai/chat', 'secondary')}
          </div>
          
          <p style="color: #0369a1; font-size: 13px; margin: 15px 0 0 0; text-align: center;">
            For urgent matters, use the "URGENT" tag in your subject line when emailing us directly.
          </p>
        </div>

        <!-- Signature -->
        <div style="text-align: center; margin: 40px 0 20px;">
          <p class="body-lg text-gray-900" style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 12px 0;">
            Looking forward to transforming your business,
          </p>
          <p class="heading-lg text-primary" style="color: #ff7033; font-size: 24px; line-height: 30px; font-weight: 700; margin: 0 0 8px 0;">
            The Strive Tech Concierge Team
          </p>
          <p class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; margin: 0; font-style: italic;">
            Your dedicated partners in AI transformation
          </p>
        </div>

        <!-- Contact Information -->
        <div style="background: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 30px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h4 style="color: #374151; font-size: 16px; margin: 0 0 16px 0; font-weight: 600;">
              Multiple Ways to Reach Us
            </h4>
          </div>
          
          <div style="display: grid; gap: 16px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
              <span style="color: #ff7033; font-size: 16px;">📧</span>
              <span style="color: #4b5563; font-size: 14px;">Direct Email:</span>
              <a href="mailto:contact@strivetech.ai?subject=Follow-up to ${ticketId}" style="color: #ff7033; text-decoration: none; font-weight: 600;">contact@strivetech.ai</a>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
              <span style="color: #ff7033; font-size: 16px;">🌐</span>
              <span style="color: #4b5563; font-size: 14px;">Website:</span>
              <a href="https://strivetech.ai" style="color: #ff7033; text-decoration: none; font-weight: 600;">strivetech.ai</a>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
              <span style="color: #ff7033; font-size: 16px;">🎫</span>
              <span style="color: #4b5563; font-size: 14px;">Reference ID:</span>
              <span style="color: #111827; font-weight: 600; font-family: monospace;">${ticketId}</span>
            </div>
          </div>
        </div>
        
      </td>
    </tr>
    `;

    const html = this.wrapContent(content);

    return await this.sendEmail({
      to: [formData.email],
      subject: `✅ Thank you for contacting Strive Tech - We'll respond within 2-4 hours`,
      html,
    });
  }

  async sendRequestConfirmation(requestData: any) {
    // Parse request types from comma-separated string
    const requestTypes = requestData.requestTypes ? requestData.requestTypes.split(',') : [];
    const serviceList = requestTypes.map((type: string) => {
      switch(type) {
        case 'demo': return 'Demo Showcase';
        case 'showcase': return 'Solution Showcase';
        case 'assessment': return 'AI Assessment Meeting';
        default: return type;
      }
    }).join(', ');

    // Parse arrays from JSON strings
    const currentChallenges = requestData.currentChallenges ? JSON.parse(requestData.currentChallenges) : [];
    const demoFocusAreas = requestData.demoFocusAreas ? JSON.parse(requestData.demoFocusAreas) : [];

    // Calculate journey timeline
    const now = new Date();
    const contactDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // +24 hours
    const sessionDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // +3 days
    const followUpDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 days

    const content = `
    <tr>
      <td class="content-padding" style="padding: 0;">
        
        <!-- Hero Section with Journey Start Animation -->
        <div style="background: linear-gradient(135deg, #ff7033 0%, #f97316 50%, #ea580c 100%); padding: 50px 40px; text-align: center; position: relative; overflow: hidden;">
          <!-- Animated background elements -->
          <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px; animation: drift 20s linear infinite; opacity: 0.3;"></div>
          
          <div style="position: relative; z-index: 2;">
            <!-- Success checkmark animation -->
            <div style="background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px; border: 3px solid rgba(255,255,255,0.3); box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
              <span style="color: white; font-size: 48px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">🎯</span>
            </div>
            
            <h1 style="color: white; font-size: 36px; font-weight: 800; margin: 0 0 16px 0; line-height: 1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.3);">
              Your Journey Begins Now!
            </h1>
            <div style="width: 80px; height: 4px; background: linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4)); margin: 0 auto 20px; border-radius: 2px;"></div>
            <p style="color: rgba(255,255,255,0.95); font-size: 22px; font-weight: 500; margin: 0 0 8px 0; line-height: 1.4;">
              Welcome to your personalized ${serviceList} experience, ${requestData.firstName}!
            </p>
            <p style="color: rgba(255,255,255,0.85); font-size: 18px; font-weight: 400; margin: 0; line-height: 1.5;">
              Your transformation roadmap has been created and our experts are standing by
            </p>
          </div>
        </div>

        <!-- Journey Roadmap Timeline -->
        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 50px 40px; position: relative;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h2 style="color: #0f172a; font-size: 28px; font-weight: 700; margin: 0 0 12px 0;">
              🗺️ Your Transformation Roadmap
            </h2>
            <p style="color: #64748b; font-size: 18px; margin: 0; font-weight: 400;">
              A personalized journey designed specifically for ${requestData.company}
            </p>
          </div>

          <!-- Timeline Container -->
          <div style="position: relative; max-width: 800px; margin: 0 auto;">
            <!-- Timeline Line -->
            <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, #ff7033, #f97316, #ea580c); transform: translateX(-50%); border-radius: 2px; box-shadow: 0 0 20px rgba(255,112,51,0.3);"></div>
            
            <!-- Timeline Items -->
            <div style="display: grid; gap: 40px; position: relative;">
              
              <!-- Step 1: Immediate Contact -->
              <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 30px; align-items: center;">
                <div style="text-align: right;">
                  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 25px; border-radius: 16px; box-shadow: 0 10px 30px rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.2);">
                    <h3 style="color: white; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">📞 Personal Outreach</h3>
                    <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 0 0 12px 0;">Within next 2-4 hours</p>
                    <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 0; line-height: 1.4;">Dedicated team member contacts you to confirm details and understand your specific needs</p>
                  </div>
                </div>
                <div style="position: relative; z-index: 2;">
                  <div style="background: linear-gradient(135deg, #10b981, #059669); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 6px #f8fafc, 0 0 0 10px rgba(16,185,129,0.2); color: white; font-weight: bold; font-size: 16px;">1</div>
                </div>
                <div style="color: #64748b; font-size: 14px;">
                  <strong style="color: #0f172a;">Expected: ${contactDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</strong><br>
                  Your dedicated consultant will reach out
                </div>
              </div>

              <!-- Step 2: Session Scheduling -->
              <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 30px; align-items: center;">
                <div style="color: #64748b; font-size: 14px; text-align: right;">
                  <strong style="color: #0f172a;">Timeline: ${sessionDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</strong><br>
                  Customized sessions tailored to your needs
                </div>
                <div style="position: relative; z-index: 2;">
                  <div style="background: linear-gradient(135deg, #3b82f6, #2563eb); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 6px #f8fafc, 0 0 0 10px rgba(59,130,246,0.2); color: white; font-weight: bold; font-size: 16px;">2</div>
                </div>
                <div>
                  <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 25px; border-radius: 16px; box-shadow: 0 10px 30px rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.2);">
                    <h3 style="color: white; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">📅 Customized Sessions</h3>
                    <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 0 0 12px 0;">Interactive demonstrations</p>
                    <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 0; line-height: 1.4;">Sessions customized to your business needs, challenges, and industry requirements</p>
                  </div>
                </div>
              </div>

              <!-- Step 3: Strategy & Next Steps -->
              <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 30px; align-items: center;">
                <div style="text-align: right;">
                  <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 25px; border-radius: 16px; box-shadow: 0 10px 30px rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.2);">
                    <h3 style="color: white; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">🚀 Strategic Planning</h3>
                    <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 0 0 12px 0;">Implementation roadmap</p>
                    <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 0; line-height: 1.4;">Detailed plan with timelines, milestones, and next steps for your AI transformation</p>
                  </div>
                </div>
                <div style="position: relative; z-index: 2;">
                  <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 6px #f8fafc, 0 0 0 10px rgba(139,92,246,0.2); color: white; font-weight: bold; font-size: 16px;">3</div>
                </div>
                <div style="color: #64748b; font-size: 14px;">
                  <strong style="color: #0f172a;">Follow-up: ${followUpDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</strong><br>
                  Comprehensive strategy and implementation plan
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Request Intelligence Dashboard -->
        <div style="background: white; padding: 50px 40px;">
          <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 20px; padding: 40px; border: 1px solid #bae6fd; box-shadow: 0 20px 40px rgba(14,165,233,0.1);">
            <div style="text-align: center; margin-bottom: 35px;">
              <div style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 10px 30px rgba(14,165,233,0.3);">
                <span style="font-size: 28px;">📊</span>
              </div>
              <h2 style="color: #0369a1; font-size: 26px; font-weight: 700; margin: 0 0 12px 0;">
                Your Request Intelligence
              </h2>
              <p style="color: #0284c7; font-size: 16px; margin: 0;">
                AI-powered analysis of your business transformation needs
              </p>
            </div>
            
            <!-- Intelligence Grid -->
            <div style="display: grid; gap: 25px; margin: 30px 0;">
              
              <!-- Company Profile Card -->
              <div style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); padding: 25px; border-radius: 16px; border: 1px solid rgba(14,165,233,0.1); box-shadow: 0 8px 25px rgba(14,165,233,0.1);">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                  <div style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 18px;">🏢</span>
                  </div>
                  <h3 style="color: #0369a1; font-size: 18px; font-weight: 600; margin: 0;">Company Profile</h3>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                  <div>
                    <span style="color: #0284c7; font-weight: 600; font-size: 14px;">Organization:</span>
                    <p style="color: #0f172a; font-weight: 600; font-size: 16px; margin: 4px 0 0 0;">${requestData.company}</p>
                  </div>
                  <div>
                    <span style="color: #0284c7; font-weight: 600; font-size: 14px;">Contact:</span>
                    <p style="color: #0f172a; font-weight: 600; font-size: 16px; margin: 4px 0 0 0;">${requestData.firstName} ${requestData.lastName}</p>
                  </div>
                  ${requestData.industry ? `
                  <div>
                    <span style="color: #0284c7; font-weight: 600; font-size: 14px;">Industry:</span>
                    <p style="color: #0f172a; font-weight: 600; font-size: 16px; margin: 4px 0 0 0;">${requestData.industry}</p>
                  </div>
                  ` : ''}
                  ${requestData.companySize ? `
                  <div>
                    <span style="color: #0284c7; font-weight: 600; font-size: 14px;">Scale:</span>
                    <p style="color: #0f172a; font-weight: 600; font-size: 16px; margin: 4px 0 0 0;">${requestData.companySize}</p>
                  </div>
                  ` : ''}
                </div>
              </div>

              <!-- Services Requested -->
              <div style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); padding: 25px; border-radius: 16px; border: 1px solid rgba(14,165,233,0.1); box-shadow: 0 8px 25px rgba(14,165,233,0.1);">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                  <div style="background: linear-gradient(135deg, #ff7033, #f97316); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 18px;">🎯</span>
                  </div>
                  <h3 style="color: #0369a1; font-size: 18px; font-weight: 600; margin: 0;">Requested Services</h3>
                </div>
                
                <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                  ${requestTypes.map(type => {
                    const serviceConfig = {
                      'demo': { label: 'Demo Showcase', color: '#10b981', bg: '#f0fdf4' },
                      'showcase': { label: 'Solution Showcase', color: '#3b82f6', bg: '#f0f9ff' },
                      'assessment': { label: 'AI Assessment Meeting', color: '#8b5cf6', bg: '#faf5ff' }
                    };
                    const config = serviceConfig[type] || { label: type, color: '#64748b', bg: '#f8fafc' };
                    return `
                      <div style="background: ${config.bg}; color: ${config.color}; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 600; border: 1px solid ${config.color}20;">
                        ${config.label}
                      </div>
                    `;
                  }).join('')}
                </div>
                
                ${requestData.projectTimeline ? `
                <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(14,165,233,0.1);">
                  <span style="color: #0284c7; font-weight: 600; font-size: 14px;">Timeline:</span>
                  <p style="color: #0f172a; font-weight: 600; font-size: 16px; margin: 4px 0 0 0;">${requestData.projectTimeline}</p>
                </div>
                ` : ''}
              </div>

              ${currentChallenges.length > 0 ? `
              <!-- Current Challenges Analysis -->
              <div style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); padding: 25px; border-radius: 16px; border: 1px solid rgba(14,165,233,0.1); box-shadow: 0 8px 25px rgba(14,165,233,0.1);">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                  <div style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 18px;">⚡</span>
                  </div>
                  <h3 style="color: #0369a1; font-size: 18px; font-weight: 600; margin: 0;">Challenge Analysis</h3>
                </div>
                
                <div style="display: grid; gap: 12px;">
                  ${currentChallenges.map((challenge: string) => `
                    <div style="background: #fef3e2; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 8px;">
                      <p style="color: #92400e; font-size: 14px; font-weight: 500; margin: 0;">${challenge}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
              ` : ''}

              ${demoFocusAreas.length > 0 ? `
              <!-- Focus Areas -->
              <div style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); padding: 25px; border-radius: 16px; border: 1px solid rgba(14,165,233,0.1); box-shadow: 0 8px 25px rgba(14,165,233,0.1);">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                  <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 18px;">🔍</span>
                  </div>
                  <h3 style="color: #0369a1; font-size: 18px; font-weight: 600; margin: 0;">Priority Focus Areas</h3>
                </div>
                
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                  ${demoFocusAreas.map((area: string) => `
                    <span style="background: #f0fdf4; color: #15803d; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600; border: 1px solid #bbf7d0;">${area}</span>
                  `).join('')}
                </div>
              </div>
              ` : ''}

              ${requestData.additionalRequirements ? `
              <!-- Additional Requirements -->
              <div style="background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); padding: 25px; border-radius: 16px; border: 1px solid rgba(14,165,233,0.1); box-shadow: 0 8px 25px rgba(14,165,233,0.1);">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                  <div style="background: linear-gradient(135deg, #6366f1, #5338f3); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 18px;">📝</span>
                  </div>
                  <h3 style="color: #0369a1; font-size: 18px; font-weight: 600; margin: 0;">Special Requirements</h3>
                </div>
                
                <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <p style="color: #334155; margin: 0; line-height: 1.6; font-size: 14px;">${requestData.additionalRequirements}</p>
                </div>
              </div>
              ` : ''}

            </div>
          </div>
        </div>

        <!-- Service-Specific Experience Preview -->
        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); padding: 50px 40px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <div style="background: linear-gradient(135deg, #16a34a, #15803d); color: white; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 10px 30px rgba(22,163,74,0.3);">
              <span style="font-size: 28px;">🎯</span>
            </div>
            <h2 style="color: #166534; font-size: 26px; font-weight: 700; margin: 0 0 12px 0;">
              Your Personalized Experience Preview
            </h2>
            <p style="color: #15803d; font-size: 16px; margin: 0;">
              What to expect from your customized ${serviceList.toLowerCase()} sessions
            </p>
          </div>
          
          <div style="display: grid; gap: 25px; max-width: 800px; margin: 0 auto;">
            ${requestTypes.includes('demo') ? `
            <div style="background: white; padding: 30px; border-radius: 16px; border: 1px solid #bbf7d0; box-shadow: 0 10px 30px rgba(22,163,74,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
                  <span style="font-size: 20px;">📺</span>
                </div>
                <h3 style="color: #166534; font-size: 20px; font-weight: 600; margin: 0;">Product Demo Experience</h3>
              </div>
              <ul style="color: #15803d; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.8;">
                <li><strong>Live AI demonstrations</strong> tailored to your industry and use cases</li>
                <li><strong>Interactive Q&A sessions</strong> with our technical experts and solution architects</li>
                <li><strong>Real-world scenarios</strong> showing how our solutions address your specific challenges</li>
                <li><strong>ROI projections</strong> and detailed implementation timelines for your organization</li>
                <li><strong>Hands-on exploration</strong> of features most relevant to your business goals</li>
              </ul>
            </div>
            ` : ''}
            
            ${requestTypes.includes('showcase') ? `
            <div style="background: white; padding: 30px; border-radius: 16px; border: 1px solid #bbf7d0; box-shadow: 0 10px 30px rgba(22,163,74,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
                  <span style="font-size: 20px;">🏆</span>
                </div>
                <h3 style="color: #166534; font-size: 20px; font-weight: 600; margin: 0;">Solution Showcase Deep-Dive</h3>
              </div>
              <ul style="color: #15803d; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.8;">
                <li><strong>Comprehensive solution walkthrough</strong> addressing your documented challenges</li>
                <li><strong>Industry-specific case studies</strong> from similar companies with detailed results</li>
                <li><strong>Technical architecture review</strong> and integration planning for your infrastructure</li>
                <li><strong>Custom proposal development</strong> with transparent pricing and delivery timelines</li>
                <li><strong>Stakeholder alignment sessions</strong> to ensure organization-wide buy-in</li>
              </ul>
            </div>
            ` : ''}
            
            ${requestTypes.includes('assessment') ? `
            <div style="background: white; padding: 30px; border-radius: 16px; border: 1px solid #bbf7d0; box-shadow: 0 10px 30px rgba(22,163,74,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
                  <span style="font-size: 20px;">🔍</span>
                </div>
                <h3 style="color: #166534; font-size: 20px; font-weight: 600; margin: 0;">AI Readiness Assessment</h3>
              </div>
              <ul style="color: #15803d; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.8;">
                <li><strong>Comprehensive AI readiness evaluation</strong> across all business dimensions</li>
                <li><strong>Data infrastructure analysis</strong> and capability assessment with gap identification</li>
                <li><strong>Strategic transformation roadmap</strong> with prioritized recommendations and milestones</li>
                <li><strong>Custom implementation plan</strong> with realistic timelines and success metrics</li>
                <li><strong>Change management strategy</strong> to ensure smooth organizational adoption</li>
              </ul>
            </div>
            ` : ''}
          </div>
        </div>

        <!-- Preparation Excellence Hub -->
        <div style="background: white; padding: 50px 40px;">
          <div style="background: linear-gradient(135deg, #fef3e2 0%, #fed7aa 100%); border-radius: 20px; padding: 40px; border: 1px solid #fed7aa;">
            <div style="text-align: center; margin-bottom: 35px;">
              <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 10px 30px rgba(245,158,11,0.3);">
                <span style="font-size: 28px;">🎯</span>
              </div>
              <h2 style="color: #ea580c; font-size: 26px; font-weight: 700; margin: 0 0 12px 0;">
                Maximize Your Session Value
              </h2>
              <p style="color: #9a3412; font-size: 16px; margin: 0;">
                Strategic preparation tips to ensure maximum ROI from your sessions
              </p>
            </div>
            
            <div style="display: grid; gap: 20px;">
              <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(245,158,11,0.2);">
                <div style="display: flex; align-items: flex-start;">
                  <div style="background: #f59e0b; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 16px; flex-shrink: 0;">1</div>
                  <div>
                    <h4 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">🧑‍💼 Assemble Your Dream Team</h4>
                    <p style="color: #9a3412; font-size: 14px; margin: 0; line-height: 1.5;">Identify and invite key stakeholders, decision-makers, and technical team members who should participate in your sessions</p>
                  </div>
                </div>
              </div>
              
              <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(245,158,11,0.2);">
                <div style="display: flex; align-items: flex-start;">
                  <div style="background: #f59e0b; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 16px; flex-shrink: 0;">2</div>
                  <div>
                    <h4 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">📊 Document Current State</h4>
                    <p style="color: #9a3412; font-size: 14px; margin: 0; line-height: 1.5;">Map out existing workflows, processes, and pain points that you'd like to optimize or transform with AI</p>
                  </div>
                </div>
              </div>
              
              <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(245,158,11,0.2);">
                <div style="display: flex; align-items: flex-start;">
                  <div style="background: #f59e0b; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 16px; flex-shrink: 0;">3</div>
                  <div>
                    <h4 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">🎯 Define Success Metrics</h4>
                    <p style="color: #9a3412; font-size: 14px; margin: 0; line-height: 1.5;">Clarify specific outcomes, KPIs, and transformation goals you want to achieve through AI implementation</p>
                  </div>
                </div>
              </div>
              
              <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(245,158,11,0.2);">
                <div style="display: flex; align-items: flex-start;">
                  <div style="background: #f59e0b; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 16px; flex-shrink: 0;">4</div>
                  <div>
                    <h4 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">❓ Prepare Strategic Questions</h4>
                    <p style="color: #9a3412; font-size: 14px; margin: 0; line-height: 1.5;">List specific questions about implementation, integration challenges, timeline concerns, or industry requirements</p>
                  </div>
                </div>
              </div>
              
              <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(245,158,11,0.2);">
                <div style="display: flex; align-items: flex-start;">
                  <div style="background: #f59e0b; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 16px; flex-shrink: 0;">5</div>
                  <div>
                    <h4 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">💾 Assess Data Readiness</h4>
                    <p style="color: #9a3412; font-size: 14px; margin: 0; line-height: 1.5;">Review available data sources, quality, and accessibility that could power your AI solutions</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="background: #fff7ed; padding: 20px; border-radius: 12px; margin: 25px 0 0 0; border: 1px solid #fed7aa; text-align: center;">
              <p style="color: #9a3412; font-size: 14px; margin: 0; font-weight: 500;">
                💡 <strong>Pro Tip:</strong> The more prepared you are, the more value you'll extract from our time together. Our experts will customize the experience based on your preparation level.
              </p>
            </div>
          </div>
        </div>

        <!-- Premium Support & Resources -->
        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 50px 40px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h2 style="color: #0f172a; font-size: 26px; font-weight: 700; margin: 0 0 12px 0;">
              🚀 Immediate Value & Resources
            </h2>
            <p style="color: #64748b; font-size: 16px; margin: 0;">
              Don't wait for your sessions - start exploring right now
            </p>
          </div>
          
          <div style="display: grid; gap: 25px; max-width: 900px; margin: 0 auto;">
            <div style="background: white; padding: 25px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 8px 25px rgba(0,0,0,0.05); display: flex; align-items: center;">
              <div style="background: linear-gradient(135deg, #ff7033, #f97316); color: white; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 24px; flex-shrink: 0; box-shadow: 0 8px 25px rgba(255,112,51,0.3);">
                <span style="font-size: 24px;">🎥</span>
              </div>
              <div style="flex: 1; margin-right: 20px;">
                <h3 style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">Solution Demo Library</h3>
                <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.5;">Watch AI & Automation, Data Analytics, and Business Intelligence solutions in action across ${requestData.industry || 'various'} industries with real ROI data</p>
              </div>
              ${this.createQuickActionButton('▶️ Watch Demos', 'https://strivetech.ai/demos', 'primary')}
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 8px 25px rgba(0,0,0,0.05); display: flex; align-items: center;">
              <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 24px; flex-shrink: 0; box-shadow: 0 8px 25px rgba(16,185,129,0.3);">
                <span style="font-size: 24px;">📊</span>
              </div>
              <div style="flex: 1; margin-right: 20px;">
                <h3 style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">AI ROI Calculator</h3>
                <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.5;">Estimate potential return on investment for AI implementation in your specific business context</p>
              </div>
              ${this.createQuickActionButton('📈 Calculate ROI', 'https://strivetech.ai/roi-calculator', 'success')}
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 8px 25px rgba(0,0,0,0.05); display: flex; align-items: center;">
              <div style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 24px; flex-shrink: 0; box-shadow: 0 8px 25px rgba(59,130,246,0.3);">
                <span style="font-size: 24px;">📚</span>
              </div>
              <div style="flex: 1; margin-right: 20px;">
                <h3 style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">Industry Resource Hub</h3>
                <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.5;">Access whitepapers, case studies, and implementation guides specific to your industry</p>
              </div>
              ${this.createQuickActionButton('📖 Explore Resources', 'https://strivetech.ai/resources', 'secondary')}
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 8px 25px rgba(0,0,0,0.05); display: flex; align-items: center;">
              <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 24px; flex-shrink: 0; box-shadow: 0 8px 25px rgba(139,92,246,0.3);">
                <span style="font-size: 24px;">🏆</span>
              </div>
              <div style="flex: 1; margin-right: 20px;">
                <h3 style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">Success Story Gallery</h3>
                <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.5;">Detailed transformation stories with implementation details and measurable business impact</p>
              </div>
              ${this.createQuickActionButton('🎯 View Case Studies', 'https://strivetech.ai/case-studies', 'secondary')}
            </div>
          </div>
        </div>

        <!-- Expert Team Introduction -->
        <div style="background: white; padding: 50px 40px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <div style="background: linear-gradient(135deg, #ff7033, #f97316); color: white; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 10px 30px rgba(255,112,51,0.3);">
              <span style="font-size: 28px;">👥</span>
            </div>
            <h2 style="color: #0f172a; font-size: 26px; font-weight: 700; margin: 0 0 12px 0;">
              Meet Your Transformation Team
            </h2>
            <p style="color: #64748b; font-size: 16px; margin: 0;">
              The AI experts who will guide your journey from concept to implementation
            </p>
          </div>
          
          <div style="display: grid; gap: 25px; max-width: 800px; margin: 0 auto;">
            ${this.createTeamMemberCard('Garrett Holland', 'CEO & Chief AI Strategist', 'garrettholland@strivetech.ai')}
            ${this.createTeamMemberCard('Jeff Meyer', 'CTO & Technical Innovation Lead', 'jeffmeyer@strivetech.ai')}
            ${this.createTeamMemberCard('Grant Ramey', 'VP of Client Success & Transformation', 'grantramey@strivetech.ai')}
          </div>
          
          <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 25px; border-radius: 16px; border: 1px solid #bae6fd; margin: 30px auto 0; max-width: 600px; text-align: center;">
            <p style="color: #0284c7; font-size: 15px; margin: 0; font-weight: 500;">
              <strong>Direct Access Guarantee:</strong> You'll have direct communication with our leadership team throughout your transformation journey, ensuring the highest level of strategic guidance and technical expertise.
            </p>
          </div>
        </div>

        <!-- Journey Commitment -->
        <div style="background: linear-gradient(135deg, #ff7033 0%, #f97316 50%, #ea580c 100%); padding: 50px 40px; text-align: center; position: relative; overflow: hidden;">
          <!-- Animated background -->
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%); opacity: 0.6;"></div>
          
          <div style="position: relative; z-index: 2;">
            <div style="background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px; border: 3px solid rgba(255,255,255,0.3);">
              <span style="color: white; font-size: 36px;">🚀</span>
            </div>
            
            <h2 style="color: white; font-size: 32px; font-weight: 800; margin: 0 0 16px 0; line-height: 1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.3);">
              Your Transformation Starts Today
            </h2>
            <p style="color: rgba(255,255,255,0.95); font-size: 20px; font-weight: 500; margin: 0 0 30px 0; line-height: 1.5;">
              We're committed to making your AI journey successful, ${requestData.firstName}
            </p>
            
            <div style="margin: 30px 0;">
              ${this.createQuickActionButton('🎯 Schedule Urgent Call', 'https://calendly.com/strivetech/urgent', 'success')}
              ${this.createQuickActionButton('💬 Chat with Expert', 'https://strivetech.ai/chat', 'secondary')}
            </div>
            
            <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 20px 0 0 0; font-weight: 500;">
              Questions? Reply to this email or contact us at 
              <a href="mailto:contact@strivetech.ai" style="color: white; text-decoration: underline; font-weight: 700;">contact@strivetech.ai</a>
            </p>
          </div>
        </div>

        <!-- Professional Footer -->
        <div style="background: #f8fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h3 style="color: #0f172a; font-size: 20px; font-weight: 700; margin: 0 0 8px 0;">
              The Strive Tech Transformation Team
            </h3>
            <p style="color: #64748b; font-size: 14px; margin: 0; font-style: italic;">
              Your dedicated AI transformation partners
            </p>
          </div>
          
          <div style="display: grid; gap: 16px; max-width: 500px; margin: 0 auto;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
              <span style="color: #ff7033; font-size: 16px;">📧</span>
              <span style="color: #64748b; font-size: 14px;">Email:</span>
              <span style="color: #0f172a; font-weight: 600; font-size: 14px;">${requestData.email}</span>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
              <span style="color: #ff7033; font-size: 16px;">🆔</span>
              <span style="color: #64748b; font-size: 14px;">Request ID:</span>
              <span style="color: #ff7033; font-weight: 600; font-size: 14px; font-family: monospace;">${Date.now().toString().slice(-6)}</span>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
              <span style="color: #ff7033; font-size: 16px;">⚙️</span>
              <a href="mailto:contact@strivetech.ai?subject=Request%20Update%20-%20${requestData.firstName}%20${requestData.lastName}" style="color: #ff7033; text-decoration: none; font-weight: 600; font-size: 14px;">Update Request</a>
              <span style="color: #d1d5db;">•</span>
              <a href="mailto:contact@strivetech.ai?subject=Support%20-%20${requestData.firstName}%20${requestData.lastName}" style="color: #ff7033; text-decoration: none; font-weight: 600; font-size: 14px;">Contact Support</a>
            </div>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; margin: 25px 0 0 0; padding: 20px 0 0 0;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0; text-align: center; line-height: 1.5;">
              This email was sent in response to your service request on strivetech.ai<br>
              For questions about your request, reply directly to this email or contact our support team.
            </p>
          </div>
        </div>
        
      </td>
    </tr>
    `;

    const html = this.wrapContent(content);

    return await this.sendEmail({
      to: [requestData.email],
      subject: `🎯 Your ${serviceList} Journey Begins - Transformation Roadmap Inside!`,
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
        case 'demo': return 'Demo Showcase';
        case 'showcase': return 'Solution Showcase';  
        case 'assessment': return 'AI Assessment Meeting';
        default: return type;
      }
    }).join(', ');

    const currentChallenges = requestData.currentChallenges ? JSON.parse(requestData.currentChallenges) : [];
    const demoFocusAreas = requestData.demoFocusAreas ? JSON.parse(requestData.demoFocusAreas) : [];

    // Calculate priority score based on company size, timeline, and services
    let priorityScore = 0;
    if (requestData.companySize) {
      if (requestData.companySize.includes('1000+') || requestData.companySize.includes('Enterprise')) priorityScore += 30;
      else if (requestData.companySize.includes('500-999') || requestData.companySize.includes('Large')) priorityScore += 20;
      else if (requestData.companySize.includes('100-499') || requestData.companySize.includes('Medium')) priorityScore += 10;
    }
    if (requestData.projectTimeline === 'ASAP') priorityScore += 25;
    else if (requestData.projectTimeline === '1-3 months') priorityScore += 15;
    if (requestTypes.length > 1) priorityScore += 10;
    if (requestData.budgetRange && (requestData.budgetRange.includes('100k') || requestData.budgetRange.includes('250k'))) priorityScore += 20;

    const priorityLevel = priorityScore >= 50 ? 'HIGH' : priorityScore >= 25 ? 'MEDIUM' : 'STANDARD';
    const priorityColors = {
      'HIGH': { bg: '#fef2f2', border: '#fca5a5', text: '#dc2626', badge: '#dc2626' },
      'MEDIUM': { bg: '#fef3e2', border: '#fed7aa', text: '#ea580c', badge: '#ea580c' },
      'STANDARD': { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a', badge: '#16a34a' }
    };

    const colors = priorityColors[priorityLevel];
    const now = new Date();
    const responseDeadline = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const content = `
    <tr>
      <td class="content-padding" style="padding: 0;">
        
        <!-- Command Center Header -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%); padding: 40px; text-align: center; position: relative; overflow: hidden;">
          <!-- Background pattern -->
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%); opacity: 0.8;"></div>
          
          <div style="position: relative; z-index: 2;">
            <!-- Alert Badge -->
            <div style="background: linear-gradient(135deg, #ff7033, #f97316); color: white; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 0 30px rgba(255,112,51,0.4), 0 0 60px rgba(255,112,51,0.2);">
              <span style="font-size: 36px;">🚨</span>
            </div>
            
            <h1 style="color: white; font-size: 32px; font-weight: 800; margin: 0 0 12px 0; line-height: 1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.5);">
              Service Request Command Center
            </h1>
            <div style="width: 100px; height: 3px; background: linear-gradient(90deg, #ff7033, #f97316); margin: 0 auto 16px; border-radius: 2px;"></div>
            <p style="color: #cbd5e1; font-size: 18px; font-weight: 500; margin: 0;">
              High-Priority ${serviceList} Request from ${requestData.company}
            </p>
          </div>
        </div>

        <!-- Priority Alert System -->
        <div style="background: ${colors.bg}; border: 2px solid ${colors.border}; padding: 25px 40px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center;">
            <div style="background: ${colors.badge}; color: white; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 14px; margin-right: 20px;">
              ${priorityLevel} PRIORITY
            </div>
            <div>
              <h3 style="color: ${colors.text}; font-size: 18px; font-weight: 700; margin: 0 0 4px 0;">
                Priority Score: ${priorityScore}/100
              </h3>
              <p style="color: ${colors.text}; font-size: 14px; margin: 0; opacity: 0.8;">
                Response Required by: ${responseDeadline.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
              </p>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="background: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <span style="color: #0f172a; font-size: 24px; font-weight: 800;">${priorityScore}</span>
              <span style="color: #64748b; font-size: 12px; font-weight: 600; display: block;">PRIORITY SCORE</span>
            </div>
          </div>
        </div>

        <!-- Quick Action Command Bar -->
        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 30px 40px;">
          <h3 style="color: white; font-size: 18px; font-weight: 600; margin: 0 0 20px 0; text-align: center;">
            ⚡ Immediate Action Required
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
            ${this.createQuickActionButton('📞 Call Now', `tel:${requestData.phone || 'N/A'}`, 'primary', '📞')}
            ${this.createQuickActionButton('📧 Reply Email', `mailto:${requestData.email}?subject=Re: ${serviceList} Request&body=Hi ${requestData.firstName},%0A%0AThank you for your interest in ${serviceList}...`, 'success', '📧')}
            ${this.createQuickActionButton('📅 Schedule Call', `https://calendly.com/strivetech/discovery-call?prefill_email=${requestData.email}&prefill_name=${requestData.firstName} ${requestData.lastName}`, 'secondary', '📅')}
            ${this.createQuickActionButton('🎯 Add to CRM', '#', 'warning', '🎯')}
          </div>
        </div>

        <!-- Lead Intelligence Dashboard -->
        <div style="background: white; padding: 40px;">
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 20px; padding: 35px; border: 1px solid #e2e8f0; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 10px 30px rgba(59,130,246,0.3);">
                <span style="font-size: 28px;">📊</span>
              </div>
              <h2 style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 8px 0;">
                Lead Intelligence Analysis
              </h2>
              <p style="color: #64748b; font-size: 16px; margin: 0;">
                AI-powered insights and actionable intelligence for this prospect
              </p>
            </div>
            
            <!-- Intelligence Grid -->
            <div style="display: grid; gap: 20px;">
              
              <!-- Contact Information Card -->
              <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 8px 25px rgba(0,0,0,0.08); overflow: hidden;">
                <div style="background: linear-gradient(135deg, #ff7033, #f97316); color: white; padding: 20px; display: flex; align-items: center;">
                  <div style="background: rgba(255,255,255,0.2); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 20px;">👤</span>
                  </div>
                  <div>
                    <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700;">Contact Profile</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 14px;">Primary decision maker analysis</p>
                  </div>
                </div>
                <div style="padding: 25px;">
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div>
                      <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</span>
                      <p style="color: #0f172a; font-weight: 700; font-size: 16px; margin: 4px 0 0 0;">${requestData.firstName} ${requestData.lastName}</p>
                    </div>
                    <div>
                      <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</span>
                      <p style="color: #0f172a; font-weight: 700; font-size: 16px; margin: 4px 0 0 0;">${requestData.email}</p>
                    </div>
                    <div>
                      <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</span>
                      <p style="color: #0f172a; font-weight: 700; font-size: 16px; margin: 4px 0 0 0;">${requestData.phone || 'Not provided'}</p>
                    </div>
                    ${requestData.jobTitle ? `
                    <div>
                      <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Job Title</span>
                      <p style="color: #0f172a; font-weight: 700; font-size: 16px; margin: 4px 0 0 0;">${requestData.jobTitle}</p>
                    </div>
                    ` : ''}
                  </div>
                </div>
              </div>

              <!-- Company Intelligence Card -->
              <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 8px 25px rgba(0,0,0,0.08); overflow: hidden;">
                <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; display: flex; align-items: center;">
                  <div style="background: rgba(255,255,255,0.2); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 20px;">🏢</span>
                  </div>
                  <div>
                    <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700;">Company Intelligence</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 14px;">Organization profile and market position</p>
                  </div>
                </div>
                <div style="padding: 25px;">
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div>
                      <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Company Name</span>
                      <p style="color: #0f172a; font-weight: 700; font-size: 16px; margin: 4px 0 0 0;">${requestData.company}</p>
                    </div>
                    ${requestData.industry ? `
                    <div>
                      <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Industry Sector</span>
                      <p style="color: #0f172a; font-weight: 700; font-size: 16px; margin: 4px 0 0 0;">${requestData.industry}</p>
                    </div>
                    ` : ''}
                    ${requestData.companySize ? `
                    <div>
                      <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Company Scale</span>
                      <p style="color: #0f172a; font-weight: 700; font-size: 16px; margin: 4px 0 0 0;">${requestData.companySize}</p>
                    </div>
                    ` : ''}
                    ${requestData.projectTimeline ? `
                    <div>
                      <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Project Timeline</span>
                      <p style="color: #0f172a; font-weight: 700; font-size: 16px; margin: 4px 0 0 0;">${requestData.projectTimeline}</p>
                    </div>
                    ` : ''}
                    ${requestData.budgetRange ? `
                    <div>
                      <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Budget Range</span>
                      <p style="color: #0f172a; font-weight: 700; font-size: 16px; margin: 4px 0 0 0;">${requestData.budgetRange}</p>
                    </div>
                    ` : ''}
                  </div>
                </div>
              </div>

              <!-- Service Request Analysis -->
              <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 8px 25px rgba(0,0,0,0.08); overflow: hidden;">
                <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 20px; display: flex; align-items: center;">
                  <div style="background: rgba(255,255,255,0.2); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 20px;">🎯</span>
                  </div>
                  <div>
                    <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700;">Service Request Analysis</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 14px;">Detailed breakdown of requested services</p>
                  </div>
                </div>
                <div style="padding: 25px;">
                  <div style="margin-bottom: 20px;">
                    <span style="color: #64748b; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Requested Services</span>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
                      ${requestTypes.map(type => {
                        const serviceConfig = {
                          'demo': { label: 'Demo Showcase', color: '#10b981', bg: '#f0fdf4' },
                          'showcase': { label: 'Solution Showcase', color: '#3b82f6', bg: '#f0f9ff' },
                          'assessment': { label: 'AI Assessment Meeting', color: '#8b5cf6', bg: '#faf5ff' }
                        };
                        const config = serviceConfig[type] || { label: type, color: '#64748b', bg: '#f8fafc' };
                        return `
                          <div style="background: ${config.bg}; color: ${config.color}; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600; border: 1px solid ${config.color}20;">
                            ${config.label}
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                  
                  <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <p style="color: #475569; font-size: 14px; margin: 0; font-weight: 500;">
                      <strong>Revenue Potential:</strong> Based on company size and requested services, estimated deal value: 
                      <span style="color: #16a34a; font-weight: 700;">
                        ${requestData.companySize && requestData.companySize.includes('1000+') ? '$75K - $200K' : 
                          requestData.companySize && requestData.companySize.includes('500-999') ? '$50K - $125K' : 
                          requestData.companySize && requestData.companySize.includes('100-499') ? '$25K - $75K' : '$10K - $40K'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              ${currentChallenges.length > 0 ? `
              <!-- Challenge Analysis -->
              <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 8px 25px rgba(0,0,0,0.08); overflow: hidden;">
                <div style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 20px; display: flex; align-items: center;">
                  <div style="background: rgba(255,255,255,0.2); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 20px;">⚡</span>
                  </div>
                  <div>
                    <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700;">Pain Point Analysis</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 14px;">Current challenges and opportunity mapping</p>
                  </div>
                </div>
                <div style="padding: 25px;">
                  <div style="display: grid; gap: 12px;">
                    ${currentChallenges.map((challenge: string, index: number) => `
                      <div style="background: #fef3e2; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; display: flex; align-items: flex-start;">
                        <div style="background: #f59e0b; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; margin-right: 12px; flex-shrink: 0;">${index + 1}</div>
                        <div>
                          <p style="color: #92400e; font-size: 14px; font-weight: 600; margin: 0 0 4px 0;">${challenge}</p>
                          <p style="color: #b45309; font-size: 12px; margin: 0; opacity: 0.8;">High-priority pain point requiring immediate attention</p>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
              ` : ''}

              ${demoFocusAreas.length > 0 ? `
              <!-- Focus Areas Intelligence -->
              <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 8px 25px rgba(0,0,0,0.08); overflow: hidden;">
                <div style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 20px; display: flex; align-items: center;">
                  <div style="background: rgba(255,255,255,0.2); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 20px;">🔍</span>
                  </div>
                  <div>
                    <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700;">Strategic Focus Areas</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 14px;">Priority areas for solution demonstration</p>
                  </div>
                </div>
                <div style="padding: 25px;">
                  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${demoFocusAreas.map((area: string) => `
                      <div style="background: #f0fdf4; color: #15803d; padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; border: 1px solid #bbf7d0;">
                        ${area}
                      </div>
                    `).join('')}
                  </div>
                  
                  <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin-top: 16px; border: 1px solid #bae6fd;">
                    <p style="color: #0369a1; font-size: 13px; margin: 0; font-weight: 500;">
                      <strong>Demo Strategy:</strong> Customize demonstration to highlight solutions addressing these specific focus areas for maximum impact
                    </p>
                  </div>
                </div>
              </div>
              ` : ''}

              ${requestData.additionalRequirements ? `
              <!-- Special Requirements -->
              <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 8px 25px rgba(0,0,0,0.08); overflow: hidden;">
                <div style="background: linear-gradient(135deg, #6366f1, #5338f3); color: white; padding: 20px; display: flex; align-items: center;">
                  <div style="background: rgba(255,255,255,0.2); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                    <span style="font-size: 20px;">📝</span>
                  </div>
                  <div>
                    <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700;">Special Requirements</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 14px;">Custom requirements and special considerations</p>
                  </div>
                </div>
                <div style="padding: 25px;">
                  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <p style="color: #334155; margin: 0; line-height: 1.6; font-size: 14px; font-weight: 500;">${requestData.additionalRequirements}</p>
                  </div>
                </div>
              </div>
              ` : ''}

            </div>
          </div>
        </div>

        <!-- Strategic Recommendations Engine -->
        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); padding: 40px;">
          <div style="text-align: center; margin-bottom: 35px;">
            <div style="background: linear-gradient(135deg, #16a34a, #15803d); color: white; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 10px 30px rgba(22,163,74,0.3);">
              <span style="font-size: 28px;">🧠</span>
            </div>
            <h2 style="color: #166534; font-size: 24px; font-weight: 700; margin: 0 0 8px 0;">
              AI Strategic Recommendations
            </h2>
            <p style="color: #15803d; font-size: 16px; margin: 0;">
              Intelligent insights and next-step recommendations for this prospect
            </p>
          </div>
          
          <div style="display: grid; gap: 20px; max-width: 900px; margin: 0 auto;">
            
            <!-- Immediate Actions -->
            <div style="background: white; padding: 25px; border-radius: 16px; border: 1px solid #bbf7d0; box-shadow: 0 8px 25px rgba(22,163,74,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="background: #dc2626; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                  <span style="font-size: 18px;">⚡</span>
                </div>
                <h3 style="color: #166534; font-size: 18px; font-weight: 600; margin: 0;">Immediate Actions Required</h3>
              </div>
              <ul style="color: #15803d; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
                <li><strong>Contact within 2-4 hours</strong> to schedule ${serviceList.toLowerCase()} sessions</li>
                <li><strong>Send personalized calendar invites</strong> for all requested services with preparation materials</li>
                <li><strong>Prepare industry-specific materials</strong> based on ${requestData.industry || 'their sector'} and documented challenges</li>
                ${requestTypes.includes('assessment') ? '<li><strong>Schedule technical discovery session</strong> to assess AI readiness and infrastructure</li>' : ''}
                <li><strong>Assign dedicated account manager</strong> based on company size and deal potential</li>
              </ul>
            </div>

            <!-- Preparation Strategy -->
            <div style="background: white; padding: 25px; border-radius: 16px; border: 1px solid #bbf7d0; box-shadow: 0 8px 25px rgba(22,163,74,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="background: #f59e0b; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                  <span style="font-size: 18px;">📋</span>
                </div>
                <h3 style="color: #166534; font-size: 18px; font-weight: 600; margin: 0;">Session Preparation Strategy</h3>
              </div>
              <ul style="color: #15803d; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
                <li><strong>Customize demonstrations</strong> to address their documented pain points and focus areas</li>
                <li><strong>Prepare industry case studies</strong> from similar companies in ${requestData.industry || 'their sector'}</li>
                <li><strong>Create ROI projections</strong> based on company size and potential implementation scope</li>
                <li><strong>Research company background</strong> and recent news for contextual conversation</li>
                <li><strong>Prepare technical architecture</strong> overview suitable for their organization scale</li>
              </ul>
            </div>

            <!-- Success Metrics -->
            <div style="background: white; padding: 25px; border-radius: 16px; border: 1px solid #bbf7d0; box-shadow: 0 8px 25px rgba(22,163,74,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="background: #3b82f6; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                  <span style="font-size: 18px;">🎯</span>
                </div>
                <h3 style="color: #166534; font-size: 18px; font-weight: 600; margin: 0;">Success Metrics & Goals</h3>
              </div>
              <ul style="color: #15803d; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
                <li><strong>Primary Goal:</strong> Secure follow-up meeting with decision-makers and technical stakeholders</li>
                <li><strong>Secondary Goal:</strong> Obtain detailed requirements and implementation timeline preferences</li>
                <li><strong>Conversion Target:</strong> Move to proposal stage within 2-3 touchpoints</li>
                <li><strong>Relationship Goal:</strong> Establish trust and position as strategic technology partner</li>
                <li><strong>Timeline Goal:</strong> Complete discovery and present initial proposal within 2 weeks</li>
              </ul>
            </div>

          </div>
        </div>

        <!-- Team Assignment & Next Steps -->
        <div style="background: white; padding: 40px;">
          <div style="background: linear-gradient(135deg, #fef3e2 0%, #fed7aa 100%); border-radius: 20px; padding: 35px; border: 1px solid #fed7aa;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 10px 30px rgba(245,158,11,0.3);">
                <span style="font-size: 28px;">👥</span>
              </div>
              <h2 style="color: #ea580c; font-size: 24px; font-weight: 700; margin: 0 0 8px 0;">
                Team Assignment & Management
              </h2>
              <p style="color: #9a3412; font-size: 16px; margin: 0;">
                Recommended team structure for optimal engagement
              </p>
            </div>
            
            <div style="display: grid; gap: 20px;">
              
              <!-- Recommended Team Assignment -->
              <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(245,158,11,0.2);">
                <h4 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">🎯 Recommended Team Assignment</h4>
                <div style="display: grid; gap: 12px;">
                  <div style="display: flex; align-items: center;">
                    <span style="background: #16a34a; color: white; width: 8px; height: 8px; border-radius: 50%; margin-right: 12px;"></span>
                    <span style="color: #9a3412; font-size: 14px;"><strong>Lead Contact:</strong> ${priorityLevel === 'HIGH' ? 'Garrett Holland (CEO)' : 'Grant Ramey (VP Client Success)'}</span>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <span style="background: #3b82f6; color: white; width: 8px; height: 8px; border-radius: 50%; margin-right: 12px;"></span>
                    <span style="color: #9a3412; font-size: 14px;"><strong>Technical Lead:</strong> Jeff Meyer (CTO) - for demos and technical discussions</span>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <span style="background: #8b5cf6; color: white; width: 8px; height: 8px; border-radius: 50%; margin-right: 12px;"></span>
                    <span style="color: #9a3412; font-size: 14px;"><strong>Support:</strong> Full team coordination for seamless experience</span>
                  </div>
                </div>
              </div>

              <!-- Timeline & Milestones -->
              <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(245,158,11,0.2);">
                <h4 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">📅 Engagement Timeline</h4>
                <div style="display: grid; gap: 8px;">
                  <div style="color: #9a3412; font-size: 13px; padding: 8px 0; border-bottom: 1px solid rgba(245,158,11,0.2);">
                    <strong>Hour 1-6:</strong> Initial response and calendar invite sent
                  </div>
                  <div style="color: #9a3412; font-size: 13px; padding: 8px 0; border-bottom: 1px solid rgba(245,158,11,0.2);">
                    <strong>Day 1-2:</strong> Discovery call and needs assessment completed
                  </div>
                  <div style="color: #9a3412; font-size: 13px; padding: 8px 0; border-bottom: 1px solid rgba(245,158,11,0.2);">
                    <strong>Day 3-5:</strong> Customized demonstration and solution showcase
                  </div>
                  <div style="color: #9a3412; font-size: 13px; padding: 8px 0;">
                    <strong>Week 2:</strong> Proposal presentation and next steps discussion
                  </div>
                </div>
              </div>

              <!-- Internal Notes -->
              <div style="background: rgba(255,255,255,0.8); padding: 20px; border-radius: 12px; border: 1px solid rgba(245,158,11,0.2);">
                <h4 style="color: #ea580c; font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">📝 Internal Team Notes</h4>
                <ul style="color: #9a3412; margin: 0; padding-left: 16px; font-size: 13px; line-height: 1.6;">
                  <li>Update CRM with all prospect details and priority classification</li>
                  <li>Create shared preparation document for team coordination</li>
                  <li>Schedule internal alignment meeting before client engagement</li>
                  <li>Prepare customized materials based on industry and company size</li>
                  <li>Set follow-up reminders and milestone check-ins</li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        <!-- Command Center Footer -->
        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 30px 40px; text-align: center;">
          <h3 style="color: white; font-size: 18px; font-weight: 600; margin: 0 0 20px 0;">
            🚨 Request Processed - Action Required
          </h3>
          <p style="color: #cbd5e1; font-size: 14px; margin: 0 0 20px 0; line-height: 1.6;">
            This request has been logged in the system. Team members should acknowledge receipt and begin immediate follow-up procedures.
          </p>
          
          <!-- Quick Stats -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin: 20px 0; max-width: 600px; margin-left: auto; margin-right: auto;">
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">
              <div style="color: white; font-size: 20px; font-weight: 700;">${priorityScore}</div>
              <div style="color: #cbd5e1; font-size: 12px;">Priority Score</div>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">
              <div style="color: white; font-size: 20px; font-weight: 700;">24h</div>
              <div style="color: #cbd5e1; font-size: 12px;">Response Target</div>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">
              <div style="color: white; font-size: 20px; font-weight: 700;">${requestTypes.length}</div>
              <div style="color: #cbd5e1; font-size: 12px;">Services Requested</div>
            </div>
          </div>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.1); margin: 25px 0 0 0; padding: 20px 0 0 0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0; line-height: 1.4;">
              Request ID: SR-${Date.now().toString().slice(-6)} • Generated: ${now.toLocaleString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: '2-digit'
              })}<br>
              This is an automated notification from the Strive Tech CRM system.
            </p>
          </div>
        </div>
        
      </td>
    </tr>
    `;

    const html = this.wrapContent(content);

    return await this.sendEmail({
      to: recipients,
      subject: `🚨 ${priorityLevel} Priority: New ${serviceList} Request from ${requestData.firstName} ${requestData.lastName} (${requestData.company})`,
      html,
    });
  }

  // ========================================
  // PROFESSIONAL EMAIL TEMPLATE SYSTEM
  // World-Class $10,000 Quality Design
  // ========================================

  private getEmailHeader(): string {
    return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Strive Tech - AI Solutions That Transform Business</title>
  
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  
  <style type="text/css">
    /* ========================================
       ADVANCED EMAIL CSS FRAMEWORK
       ======================================== */
    
    /* Reset and normalize */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      margin: 0;
      padding: 0;
    }
    
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse;
    }
    
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    
    /* Professional Typography System */
    .font-primary {
      font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
    }
    
    .heading-xl {
      font-size: 32px !important;
      line-height: 38px !important;
      font-weight: 700 !important;
      letter-spacing: -0.025em !important;
    }
    
    .heading-lg {
      font-size: 24px !important;
      line-height: 30px !important;
      font-weight: 600 !important;
      letter-spacing: -0.02em !important;
    }
    
    .heading-md {
      font-size: 20px !important;
      line-height: 26px !important;
      font-weight: 600 !important;
      letter-spacing: -0.015em !important;
    }
    
    .body-lg {
      font-size: 18px !important;
      line-height: 28px !important;
      font-weight: 400 !important;
    }
    
    .body-base {
      font-size: 16px !important;
      line-height: 24px !important;
      font-weight: 400 !important;
    }
    
    .body-sm {
      font-size: 14px !important;
      line-height: 20px !important;
      font-weight: 400 !important;
    }
    
    .caption {
      font-size: 12px !important;
      line-height: 16px !important;
      font-weight: 400 !important;
    }
    
    /* Premium Color System */
    .bg-gradient-primary {
      background: linear-gradient(135deg, #ff7033 0%, #f97316 100%) !important;
    }
    
    .bg-gradient-dark {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;
    }
    
    .bg-gradient-light {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
    }
    
    .text-primary { color: #ff7033 !important; }
    .text-primary-dark { color: #e6541c !important; }
    .text-white { color: #ffffff !important; }
    .text-gray-900 { color: #111827 !important; }
    .text-gray-700 { color: #374151 !important; }
    .text-gray-600 { color: #4b5563 !important; }
    .text-gray-500 { color: #6b7280 !important; }
    .text-gray-400 { color: #9ca3af !important; }
    
    .bg-white { background-color: #ffffff !important; }
    .bg-gray-50 { background-color: #f9fafb !important; }
    .bg-gray-100 { background-color: #f3f4f6 !important; }
    .bg-primary { background-color: #ff7033 !important; }
    .bg-success { background-color: #10b981 !important; }
    .bg-warning { background-color: #f59e0b !important; }
    .bg-error { background-color: #ef4444 !important; }
    
    /* Advanced Button System */
    .btn {
      display: inline-block !important;
      padding: 14px 28px !important;
      border-radius: 8px !important;
      text-decoration: none !important;
      font-weight: 600 !important;
      font-size: 16px !important;
      line-height: 20px !important;
      transition: all 0.3s ease !important;
      cursor: pointer !important;
      border: none !important;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #ff7033 0%, #f97316 100%) !important;
      color: #ffffff !important;
      box-shadow: 0 4px 6px -1px rgba(255, 112, 51, 0.25) !important;
    }
    
    .btn-secondary {
      background: #ffffff !important;
      color: #ff7033 !important;
      border: 2px solid #ff7033 !important;
      padding: 12px 26px !important;
    }
    
    .btn-success {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
      color: #ffffff !important;
      box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.25) !important;
    }
    
    /* Card System */
    .card {
      background: #ffffff !important;
      border-radius: 12px !important;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
      border: 1px solid #e5e7eb !important;
    }
    
    .card-premium {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
      border: 1px solid #d1d5db !important;
      border-left: 4px solid #ff7033 !important;
    }
    
    .card-success {
      background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%) !important;
      border: 1px solid #bbf7d0 !important;
    }
    
    .card-warning {
      background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%) !important;
      border: 1px solid #fed7aa !important;
    }
    
    /* Spacing System */
    .p-4 { padding: 16px !important; }
    .p-6 { padding: 24px !important; }
    .p-8 { padding: 32px !important; }
    .py-6 { padding-top: 24px !important; padding-bottom: 24px !important; }
    .px-6 { padding-left: 24px !important; padding-right: 24px !important; }
    .mt-4 { margin-top: 16px !important; }
    .mt-6 { margin-top: 24px !important; }
    .mb-4 { margin-bottom: 16px !important; }
    .mb-6 { margin-bottom: 24px !important; }
    
    /* Dark Mode Support */
    @media (prefers-color-scheme: dark) {
      .dark-bg { background-color: #1f2937 !important; }
      .dark-text { color: #f9fafb !important; }
      .dark-text-muted { color: #d1d5db !important; }
      .dark-border { border-color: #374151 !important; }
      .dark-card { background-color: #374151 !important; }
    }
    
    /* Mobile Optimization */
    @media only screen and (max-width: 600px) {
      .mobile-center { text-align: center !important; }
      .mobile-hide { display: none !important; }
      .mobile-full { width: 100% !important; }
      .mobile-p-4 { padding: 16px !important; }
      .mobile-text-sm { font-size: 14px !important; line-height: 20px !important; }
      
      .heading-xl {
        font-size: 28px !important;
        line-height: 34px !important;
      }
      
      .heading-lg {
        font-size: 22px !important;
        line-height: 28px !important;
      }
      
      .btn {
        padding: 12px 24px !important;
        font-size: 16px !important;
        width: auto !important;
        display: block !important;
        margin: 8px auto !important;
      }
      
      .container { 
        width: 100% !important; 
        max-width: 100% !important;
      }
      
      .header-logo { 
        height: 40px !important; 
        max-width: 160px !important; 
      }
      
      .content-padding { 
        padding: 20px 16px !important; 
      }
    }
    
    /* Animation Support */
    .fade-in {
      animation: fadeIn 0.6s ease-in-out !important;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* Interactive Elements */
    .progress-bar {
      background: #e5e7eb !important;
      border-radius: 9999px !important;
      height: 8px !important;
      overflow: hidden !important;
    }
    
    .progress-fill {
      background: linear-gradient(90deg, #ff7033 0%, #f97316 100%) !important;
      height: 100% !important;
      border-radius: 9999px !important;
    }
    
    .badge {
      display: inline-block !important;
      padding: 4px 12px !important;
      border-radius: 6px !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.05em !important;
    }
    
    .badge-primary {
      background: rgba(255, 112, 51, 0.1) !important;
      color: #ff7033 !important;
    }
    
    .badge-success {
      background: rgba(16, 185, 129, 0.1) !important;
      color: #059669 !important;
    }
    
    .badge-warning {
      background: rgba(245, 158, 11, 0.1) !important;
      color: #d97706 !important;
    }
    
    /* High Priority Styles */
    .priority-high {
      border-left: 4px solid #ef4444 !important;
      background: linear-gradient(135deg, #fef2f2 0%, #fef2f2 100%) !important;
    }
    
    .priority-medium {
      border-left: 4px solid #f59e0b !important;
      background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%) !important;
    }
    
    .priority-low {
      border-left: 4px solid #10b981 !important;
      background: linear-gradient(135deg, #f0fdf4 0%, #f0fdf4 100%) !important;
    }
    
    /* Team Member Cards */
    .team-avatar {
      width: 48px !important;
      height: 48px !important;
      border-radius: 50% !important;
      border: 3px solid #ffffff !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
    }
    
    /* Social Icons */
    .social-icon {
      width: 24px !important;
      height: 24px !important;
      border-radius: 4px !important;
      margin: 0 4px !important;
    }
    
    /* Outlook Support */
    <!--[if mso]>
    .btn {
      border: none !important;
      font-family: Arial, sans-serif !important;
    }
    <![endif]-->
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6;">
  
  <!-- Preheader Text (Hidden) -->
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">
    Strive Tech - Transforming Business with AI Solutions
  </div>
  
  <!-- Email Wrapper -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        
        <!-- Main Email Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" style="width: 100%; max-width: 600px; background: #ffffff; border-radius: 16px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); overflow: hidden;">
          
          <!-- Premium Header Section -->
          <tr>
            <td class="bg-gradient-dark" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 30px; text-align: center; position: relative;">
              
              <!-- Animated Background Elements -->
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.05\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>') repeat; opacity: 0.3;"></div>
              
              <!-- Logo and Branding -->
              <div style="position: relative; z-index: 2;">
                <img src="https://strivetech.ai/assets/STRIVE_Orange_Text_Transparent_1483x320px.webp" 
                     alt="Strive Tech" 
                     class="header-logo fade-in" 
                     style="height: 60px; max-width: 240px; display: block; margin: 0 auto; filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));">
                
                <!-- Animated Divider -->
                <div style="height: 3px; background: linear-gradient(90deg, transparent, #ff7033, #f97316, transparent); margin: 30px auto 20px; max-width: 320px; border-radius: 2px; box-shadow: 0 2px 4px rgba(255, 112, 51, 0.3);"></div>
                
                <!-- Tagline -->
                <p class="body-base text-gray-400" style="color: #94a3b8; font-size: 16px; margin: 0; font-weight: 400; letter-spacing: 0.025em;">
                  Transforming Business with AI Solutions
                </p>
                
                <!-- Trust Indicators -->
                <div style="margin-top: 20px; display: flex; justify-content: center; align-items: center; gap: 20px;">
                  <span class="badge badge-primary" style="background: rgba(255, 112, 51, 0.2); color: #ff8c5a; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                    AI Experts
                  </span>
                  <span class="badge badge-success" style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                    Trusted Partner
                  </span>
                </div>
              </div>
            </td>
          </tr>
          
          <!-- Main Content Container -->`;
  }

  private getEmailFooter(): string {
    return `
          <!-- Premium Footer Section -->
          <tr>
            <td class="bg-gradient-dark" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 50px 30px; text-align: center; position: relative;">
              
              <!-- Footer Background Pattern -->
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"dots\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\"><circle cx=\"10\" cy=\"10\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.03\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23dots)\"/></svg>') repeat; opacity: 0.5;"></div>
              
              <!-- Footer Content -->
              <div style="position: relative; z-index: 2;">
                
                <!-- Premium Divider -->
                <div style="height: 1px; background: linear-gradient(90deg, transparent, #334155, transparent); margin-bottom: 40px;"></div>
                
                <!-- Quick Action Buttons -->
                <div style="margin-bottom: 35px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                    <tr>
                      <td style="padding: 0 8px;">
                        <a href="https://strivetech.ai/solutions" class="btn btn-primary" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #ff7033 0%, #f97316 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(255, 112, 51, 0.25);">
                          🚀 Explore Solutions
                        </a>
                      </td>
                      <td style="padding: 0 8px;">
                        <a href="https://strivetech.ai/request" class="btn btn-secondary" style="display: inline-block; padding: 10px 22px; background: #ffffff; color: #ff7033; text-decoration: none; border: 2px solid #ff7033; border-radius: 8px; font-weight: 600; font-size: 14px;">
                          📞 Request Demo
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>
                
                <!-- Contact Information Grid -->
                <div style="margin-bottom: 30px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                    <tr>
                      <td style="padding: 0 20px; vertical-align: top;">
                        <div style="text-align: center;">
                          <div style="background: rgba(255, 112, 51, 0.1); width: 40px; height: 40px; border-radius: 50%; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #ff7033; font-size: 18px;">📧</span>
                          </div>
                          <p class="body-sm text-gray-400" style="color: #94a3b8; font-size: 14px; margin: 0 0 6px 0; font-weight: 500;">
                            Email Us
                          </p>
                          <a href="mailto:contact@strivetech.ai" style="color: #ff7033; text-decoration: none; font-size: 14px; font-weight: 600;">
                            contact@strivetech.ai
                          </a>
                        </div>
                      </td>
                      <td style="padding: 0 20px; vertical-align: top;">
                        <div style="text-align: center;">
                          <div style="background: rgba(255, 112, 51, 0.1); width: 40px; height: 40px; border-radius: 50%; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #ff7033; font-size: 18px;">🌐</span>
                          </div>
                          <p class="body-sm text-gray-400" style="color: #94a3b8; font-size: 14px; margin: 0 0 6px 0; font-weight: 500;">
                            Visit Website
                          </p>
                          <a href="https://strivetech.ai" style="color: #ff7033; text-decoration: none; font-size: 14px; font-weight: 600;">
                            strivetech.ai
                          </a>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
                
                <!-- Social Media & Resources -->
                <div style="margin-bottom: 30px;">
                  <p class="body-sm text-gray-400" style="color: #94a3b8; font-size: 14px; margin: 0 0 15px 0; font-weight: 500;">
                    Stay Connected & Informed
                  </p>
                  <div style="display: inline-block;">
                    <a href="https://strivetech.ai/resources" style="display: inline-block; margin: 0 8px; padding: 8px 16px; background: rgba(255, 255, 255, 0.05); color: #94a3b8; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: 500; border: 1px solid rgba(255, 255, 255, 0.1);">
                      📚 Resources
                    </a>
                    <a href="https://strivetech.ai/case-studies" style="display: inline-block; margin: 0 8px; padding: 8px 16px; background: rgba(255, 255, 255, 0.05); color: #94a3b8; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: 500; border: 1px solid rgba(255, 255, 255, 0.1);">
                      🏆 Case Studies
                    </a>
                    <a href="https://strivetech.ai/blog" style="display: inline-block; margin: 0 8px; padding: 8px 16px; background: rgba(255, 255, 255, 0.05); color: #94a3b8; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: 500; border: 1px solid rgba(255, 255, 255, 0.1);">
                      📝 Blog
                    </a>
                  </div>
                </div>
                
                <!-- Trust Indicators -->
                <div style="margin-bottom: 25px;">
                  <div style="display: inline-block; margin: 0 10px;">
                    <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                      ✅ SOC 2 Compliant
                    </span>
                  </div>
                  <div style="display: inline-block; margin: 0 10px;">
                    <span class="badge" style="background: rgba(59, 130, 246, 0.2); color: #60a5fa; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                      🔒 GDPR Ready
                    </span>
                  </div>
                  <div style="display: inline-block; margin: 0 10px;">
                    <span class="badge" style="background: rgba(168, 85, 247, 0.2); color: #a78bfa; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                      🏅 ISO 27001
                    </span>
                  </div>
                </div>
                
                <!-- Company Information -->
                <div style="color: #64748b; font-size: 12px; line-height: 1.6; margin-bottom: 20px;">
                  <p style="margin: 0 0 8px 0; font-weight: 600; color: #94a3b8;">
                    © 2024 Strive Tech. All rights reserved.
                  </p>
                  <p style="margin: 0 0 15px 0;">
                    Empowering businesses through cutting-edge artificial intelligence solutions.
                  </p>
                  <p style="margin: 0;">
                    <a href="https://strivetech.ai/privacy" style="color: #64748b; text-decoration: none; margin: 0 8px;">Privacy Policy</a>
                    <span style="color: #4b5563;">•</span>
                    <a href="https://strivetech.ai/terms" style="color: #64748b; text-decoration: none; margin: 0 8px;">Terms of Service</a>
                    <span style="color: #4b5563;">•</span>
                    <a href="mailto:contact@strivetech.ai?subject=Newsletter%20Unsubscribe" style="color: #64748b; text-decoration: none; margin: 0 8px;">Unsubscribe</a>
                  </p>
                </div>
                
                <!-- Powered By Badge -->
                <div style="margin-top: 25px;">
                  <p style="color: #4b5563; font-size: 11px; margin: 0; opacity: 0.7;">
                    Powered by cutting-edge AI technology
                  </p>
                </div>
                
              </div>
            </td>
          </tr>
          
        </table>
        
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

  // ========================================
  // PREMIUM COMPONENT LIBRARY
  // ========================================

  private createProgressBar(percentage: number, label?: string): string {
    return `
      <div style="margin: 20px 0;">
        ${label ? `<p class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">${label}</p>` : ''}
        <div class="progress-bar" style="background: #e5e7eb; border-radius: 9999px; height: 8px; overflow: hidden;">
          <div class="progress-fill" style="background: linear-gradient(90deg, #ff7033 0%, #f97316 100%); height: 100%; border-radius: 9999px; width: ${percentage}%;"></div>
        </div>
        <p class="caption text-gray-500" style="color: #6b7280; font-size: 12px; margin: 4px 0 0 0; text-align: right;">${percentage}% Complete</p>
      </div>
    `;
  }

  private createPriorityBadge(priority: 'high' | 'medium' | 'low'): string {
    const configs = {
      high: { bg: '#fef2f2', color: '#dc2626', icon: '🔥', text: 'High Priority' },
      medium: { bg: '#fef3e2', color: '#d97706', icon: '⚡', text: 'Medium Priority' },
      low: { bg: '#f0fdf4', color: '#059669', icon: '📋', text: 'Low Priority' }
    };
    
    const config = configs[priority];
    return `
      <span class="badge" style="background: ${config.bg}; color: ${config.color}; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 4px;">
        <span>${config.icon}</span>
        ${config.text}
      </span>
    `;
  }

  private createTeamMemberCard(name: string, role: string, email: string, avatar?: string): string {
    return `
      <div style="display: flex; align-items: center; padding: 16px; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; margin: 12px 0;">
        <div style="margin-right: 16px;">
          <img src="${avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=ff7033&color=ffffff&size=48'}" 
               alt="${name}" 
               class="team-avatar" 
               style="width: 48px; height: 48px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        </div>
        <div style="flex: 1;">
          <h4 class="heading-md text-gray-900" style="color: #111827; font-size: 16px; line-height: 20px; font-weight: 600; margin: 0 0 4px 0;">${name}</h4>
          <p class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; margin: 0 0 6px 0;">${role}</p>
          <a href="mailto:${email}" style="color: #ff7033; text-decoration: none; font-size: 13px; font-weight: 500;">
            📧 ${email}
          </a>
        </div>
      </div>
    `;
  }

  private createServiceTypeIndicator(services: string[]): string {
    const serviceIcons: { [key: string]: string } = {
      'demo': '🎥',
      'showcase': '🏆', 
      'assessment': '🔍',
      'consultation': '💡',
      'implementation': '⚙️',
      'training': '📚'
    };

    return `
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0;">
        ${services.map(service => `
          <span class="badge badge-primary" style="background: rgba(255, 112, 51, 0.1); color: #ff7033; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
            <span>${serviceIcons[service.toLowerCase()] || '🎯'}</span>
            ${service}
          </span>
        `).join('')}
      </div>
    `;
  }

  private createTimelineStep(step: number, title: string, description: string, status: 'completed' | 'active' | 'pending', estimatedTime?: string): string {
    const statusConfigs = {
      completed: { bg: '#10b981', icon: '✅', color: '#ffffff' },
      active: { bg: '#ff7033', icon: '⏳', color: '#ffffff' },
      pending: { bg: '#e5e7eb', icon: '⏸️', color: '#6b7280' }
    };
    
    const config = statusConfigs[status];
    
    return `
      <div style="display: flex; align-items: flex-start; margin: 20px 0; position: relative;">
        <!-- Step Circle -->
        <div style="background: ${config.bg}; color: ${config.color}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; margin-right: 16px; flex-shrink: 0; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          ${status === 'completed' ? config.icon : step}
        </div>
        
        <!-- Step Content -->
        <div style="flex: 1; padding-top: 2px;">
          <h4 class="heading-md text-gray-900" style="color: #111827; font-size: 16px; line-height: 20px; font-weight: 600; margin: 0 0 6px 0;">
            ${title}
            ${estimatedTime ? `<span class="caption text-gray-500" style="color: #6b7280; font-size: 12px; font-weight: 400; margin-left: 8px;">(${estimatedTime})</span>` : ''}
          </h4>
          <p class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; margin: 0; line-height: 1.5;">
            ${description}
          </p>
        </div>
        
        <!-- Connector Line (except for last item) -->
        <div style="position: absolute; left: 19px; top: 50px; width: 2px; height: 30px; background: ${status === 'pending' ? '#e5e7eb' : '#d1d5db'};"></div>
      </div>
    `;
  }

  private createMetricCard(label: string, value: string, trend?: 'up' | 'down' | 'neutral', trendValue?: string): string {
    const trendConfigs = {
      up: { color: '#10b981', icon: '📈', prefix: '+' },
      down: { color: '#ef4444', icon: '📉', prefix: '-' },
      neutral: { color: '#6b7280', icon: '➡️', prefix: '' }
    };
    
    const trendConfig = trend ? trendConfigs[trend] : null;
    
    return `
      <div class="card" style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; padding: 20px; text-align: center; margin: 12px; min-width: 120px;">
        <h3 class="heading-lg text-primary" style="color: #ff7033; font-size: 24px; line-height: 30px; font-weight: 600; margin: 0 0 8px 0;">
          ${value}
        </h3>
        <p class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">
          ${label}
        </p>
        ${trendConfig ? `
          <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
            <span style="color: ${trendConfig.color}; font-size: 12px;">${trendConfig.icon}</span>
            <span style="color: ${trendConfig.color}; font-size: 12px; font-weight: 600;">
              ${trendConfig.prefix}${trendValue}
            </span>
          </div>
        ` : ''}
      </div>
    `;
  }

  private createQuickActionButton(label: string, url: string, type: 'primary' | 'secondary' | 'success' | 'warning' = 'primary', icon?: string): string {
    const buttonClasses = {
      primary: 'btn-primary',
      secondary: 'btn-secondary', 
      success: 'btn-success',
      warning: 'btn-warning'
    };
    
    const buttonStyles = {
      primary: 'background: linear-gradient(135deg, #ff7033 0%, #f97316 100%); color: #ffffff; box-shadow: 0 4px 6px -1px rgba(255, 112, 51, 0.25);',
      secondary: 'background: #ffffff; color: #ff7033; border: 2px solid #ff7033;',
      success: 'background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.25);',
      warning: 'background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #ffffff; box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.25);'
    };
    
    return `
      <a href="${url}" class="btn ${buttonClasses[type]}" style="display: inline-block; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; line-height: 20px; ${buttonStyles[type]} margin: 8px;">
        ${icon ? `<span style="margin-right: 8px;">${icon}</span>` : ''}${label}
      </a>
    `;
  }

  private createDataCard(title: string, data: { [key: string]: string }, priority?: 'high' | 'medium' | 'low'): string {
    const priorityClass = priority ? `priority-${priority}` : '';
    const priorityStyles = {
      high: 'border-left: 4px solid #ef4444; background: linear-gradient(135deg, #fef2f2 0%, #fef2f2 100%);',
      medium: 'border-left: 4px solid #f59e0b; background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%);',
      low: 'border-left: 4px solid #10b981; background: linear-gradient(135deg, #f0fdf4 0%, #f0fdf4 100%);'
    };
    
    return `
      <div class="card ${priorityClass}" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; border: 1px solid #d1d5db; ${priority ? priorityStyles[priority] : 'border-left: 4px solid #ff7033;'} padding: 24px; margin: 20px 0;">
        <h3 class="heading-md text-gray-900" style="color: #111827; font-size: 18px; line-height: 24px; font-weight: 600; margin: 0 0 20px 0;">
          ${title}
        </h3>
        
        <div style="space-y: 12px;">
          ${Object.entries(data).map(([key, value]) => `
            <div style="margin-bottom: 12px;">
              <span class="body-sm text-gray-600" style="color: #4b5563; font-weight: 600; display: inline-block; width: 140px; font-size: 14px;">${key}:</span>
              <span class="body-sm text-gray-900" style="color: #111827; font-weight: 500; font-size: 14px;">${value}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private createFeatureHighlight(icon: string, title: string, description: string): string {
    return `
      <div style="display: flex; align-items: flex-start; margin: 20px 0;">
        <div style="background: #ff7033; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; margin-right: 16px; flex-shrink: 0; box-shadow: 0 4px 6px -1px rgba(255, 112, 51, 0.25);">
          ${icon}
        </div>
        <div style="flex: 1;">
          <h4 class="heading-md text-gray-900" style="color: #111827; font-size: 16px; line-height: 20px; font-weight: 600; margin: 0 0 8px 0;">
            ${title}
          </h4>
          <p class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; margin: 0; line-height: 1.5;">
            ${description}
          </p>
        </div>
      </div>
    `;
  }
}

export const emailService = new EmailService();