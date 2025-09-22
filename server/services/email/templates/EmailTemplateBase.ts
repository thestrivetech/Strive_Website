/**
 * Email Template Base Class System
 * 
 * Provides a clean, maintainable foundation for all email templates
 * using the email-safe component library for maximum compatibility
 */

import {
  EMAIL_COLORS,
  EMAIL_FONTS,
  createEmailWrapper,
  createEmailHeader,
  createEmailFooter,
  createHeroSection,
  createContentSection,
  createButton,
  createInfoCard,
  createTwoColumnLayout,
  createReferenceId,
  createTimelineStep,
  createTeamMemberCard,
  createSpacer
} from '../components/EmailSafeComponents.js';

import { 
  EmailTemplateData, 
  TemplateRenderOptions, 
  TemplateResult,
  ContactFormData,
  NewsletterData,
  ServiceRequestData
} from '../types/index.js';

/**
 * Base class for all email templates
 */
export abstract class EmailTemplateBase {
  protected templateName: string;
  
  constructor(templateName: string) {
    this.templateName = templateName;
  }

  /**
   * Abstract method that subclasses must implement
   */
  abstract renderContent(data: EmailTemplateData, options: TemplateRenderOptions): string;

  /**
   * Abstract method for generating subject lines
   */
  abstract generateSubject(data: EmailTemplateData): string;

  /**
   * Main render method that wraps content with email structure
   */
  async render(data: EmailTemplateData, options: TemplateRenderOptions = {}): Promise<TemplateResult> {
    console.log(`🎨 Starting template render: ${this.templateName}`);
    console.log(`📊 Template data received:`, JSON.stringify(data, null, 2));
    console.log(`⚙️ Template options:`, JSON.stringify(options, null, 2));

    try {
      console.log(`📝 Step 1: Generating subject for ${this.templateName}...`);
      const subject = this.generateSubject(data);
      console.log(`✅ Subject generated: "${subject}"`);

      console.log(`🎯 Step 2: Rendering content for ${this.templateName}...`);
      const content = this.renderContent(data, options);
      console.log(`✅ Content rendered successfully (${content.length} characters)`);

      console.log(`🏗️ Step 3: Creating email wrapper...`);
      const emailHTML = createEmailWrapper(`
        ${createEmailHeader()}
        ${content}
        ${createEmailFooter()}
      `);
      console.log(`✅ Email HTML created successfully (${emailHTML.length} characters)`);

      console.log(`🎉 Template ${this.templateName} rendered successfully!`);
      return {
        subject,
        html: emailHTML,
        text: this.generateTextVersion(data),
        success: true
      };
    } catch (error) {
      console.error(`❌ CRITICAL ERROR rendering ${this.templateName} template:`);
      console.error(`🔍 Error details:`, {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace',
        data: JSON.stringify(data, null, 2),
        options: JSON.stringify(options, null, 2)
      });

      // Return detailed error info to help debug
      return {
        subject: 'Strive Tech - Update',
        html: this.generateErrorTemplate(),
        text: 'Thank you for contacting Strive Tech. We will get back to you soon.',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Generates a simple text version of the email
   */
  protected generateTextVersion(data: EmailTemplateData): string {
    return `
Thank you for contacting Strive Tech!

We have received your message and will get back to you within one business day.

Best regards,
The Strive Tech Team

---
Strive Tech
AI Solutions & Business Transformation
contact@strivetech.ai
strivetech.ai
    `.trim();
  }

  /**
   * Generates an error fallback template
   */
  protected generateErrorTemplate(): string {
    return createEmailWrapper(`
      ${createEmailHeader()}
      ${createHeroSection(
        'Thank You!',
        'We have received your message and will get back to you soon.',
        '✉️'
      )}
      ${createContentSection(`
        <p style="color: ${EMAIL_COLORS.darkGray}; font-size: 16px; line-height: 24px; text-align: center;">
          Our team will review your inquiry and respond within one business day.
        </p>
      `)}
      ${createEmailFooter()}
    `);
  }

  /**
   * Utility method to generate reference IDs
   */
  protected generateReferenceId(prefix: string): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).slice(-3).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }

  /**
   * Utility method to format dates
   */
  protected formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Utility method to format time
   */
  protected formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

/**
 * Contact Form Confirmation Template
 */
export class ContactFormConfirmationTemplate extends EmailTemplateBase {
  constructor() {
    super('contact-form-confirmation');
  }

  generateSubject(data: EmailTemplateData): string {
    const formData = data as ContactFormData;
    return `Thank you for contacting Strive Tech, ${formData.firstName}! Your AI journey starts here 🚀`;
  }

  renderContent(data: EmailTemplateData, options: TemplateRenderOptions): string {
    const formData = data as ContactFormData;
    const referenceId = this.generateReferenceId('CTF');
    
    return `
      ${createHeroSection(
        `Thank You, ${formData.firstName}!`,
        `We've received your message and our AI experts are already reviewing your inquiry. You'll receive a personalized response within 24 hours.`,
        '✉️'
      )}
      
      ${createSpacer(10)}
      
      ${createContentSection(`
        <div style="text-align: center;">
          ${createReferenceId(referenceId)}
        </div>
      `)}
      
      ${createContentSection(`
        ${createInfoCard(
          '📋 Your Submission Summary',
          `
            <strong>Name:</strong> ${formData.firstName} ${formData.lastName}<br>
            <strong>Email:</strong> ${formData.email}<br>
            <strong>Company:</strong> ${formData.company || 'Not specified'}<br>
            <strong>Company Size:</strong> ${formData.companySize || 'Not specified'}<br>
            <strong>Submitted:</strong> ${this.formatDate(new Date())} at ${this.formatTime(new Date())}
          `
        )}
      `)}
      
      ${createContentSection(`
        <h3 style="color: ${EMAIL_COLORS.darkBlue}; font-size: 18px; font-weight: bold; margin: 30px 0 20px 0;">
          🚀 What Happens Next?
        </h3>
        
        ${createTimelineStep(1, 'AI Analysis Complete', 'Our AI system has analyzed your inquiry and determined the best response approach.', 'completed')}
        ${createTimelineStep(2, 'Expert Review', 'Sarah Chen is reviewing your message and preparing a personalized response.', 'current')}
        ${createTimelineStep(3, 'Personalized Response', 'You\'ll receive a detailed response with tailored recommendations.', 'pending')}
        ${createTimelineStep(4, 'Solution Discovery', 'If applicable, we\'ll schedule a brief call to discuss your specific needs.', 'pending')}
      `)}
      
      ${createContentSection(`
        <h3 style="color: ${EMAIL_COLORS.darkBlue}; font-size: 18px; font-weight: bold; margin: 30px 0 20px 0; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">
          👥 Meet Your Expert Team
        </h3>
        
        ${createTwoColumnLayout(
          createTeamMemberCard(
            'Sarah Chen', 
            'AI Solutions Architect', 
            'Enterprise AI implementation, system integration, and scalable architecture design.'
          ),
          createTeamMemberCard(
            'Marcus Rodriguez', 
            'Business Development Lead', 
            'Strategic planning, ROI optimization, and business transformation guidance.'
          )
        )}
      `)}
      
      ${createContentSection(`
        <div style="text-align: center; margin: 30px 0;">
          ${createButton(
            'View AI Solutions Overview',
            'https://strivetech.ai/solutions',
            EMAIL_COLORS.primary
          )}
        </div>
      `)}
      
      ${createSpacer(20)}
    `;
  }
}

/**
 * Newsletter Confirmation Template
 */
export class NewsletterConfirmationTemplate extends EmailTemplateBase {
  constructor() {
    super('newsletter-confirmation');
  }

  generateSubject(data: EmailTemplateData): string {
    const newsletterData = data as NewsletterData;
    return `Welcome to Strive Tech Newsletter - Your AI Journey Begins! 🚀`;
  }

  renderContent(data: EmailTemplateData, options: TemplateRenderOptions): string {
    const newsletterData = data as NewsletterData;
    const subscriberId = this.generateReferenceId('SUB');
    
    return `
      ${createHeroSection(
        'Welcome to the Future of AI!',
        `You're now part of our exclusive AI innovation community. Get ready for weekly insights that will transform how you think about technology and business.`,
        '🎯'
      )}
      
      ${createSpacer(10)}
      
      ${createContentSection(`
        <div style="text-align: center;">
          ${createReferenceId(subscriberId)}
        </div>
      `)}
      
      ${createContentSection(`
        ${createInfoCard(
          '🎯 Subscription Intelligence',
          `
            <strong>Profile Match:</strong> 85%<br>
            <strong>Content Focus:</strong> ${newsletterData.interests?.join(', ') || 'General AI & Business'}<br>
            <strong>Delivery Schedule:</strong> Weekly on Wednesdays<br>
            <strong>Source:</strong> ${newsletterData.source || 'Website signup'}
          `
        )}
      `)}
      
      ${createContentSection(`
        <h3 style="color: ${EMAIL_COLORS.darkBlue}; font-size: 18px; font-weight: bold; margin: 30px 0 20px 0;">
          📚 What You'll Receive
        </h3>
        
        ${createTimelineStep(1, 'Weekly AI Insights', 'Latest trends, breakthrough technologies, and industry analysis.', 'current')}
        ${createTimelineStep(2, 'Case Studies', 'Real-world implementations and success stories from our clients.', 'pending')}
        ${createTimelineStep(3, 'Expert Interviews', 'Conversations with AI leaders and industry pioneers.', 'pending')}
        ${createTimelineStep(4, 'Exclusive Resources', 'Tools, guides, and early access to new solutions.', 'pending')}
      `)}
      
      ${createContentSection(`
        <div style="text-align: center; margin: 30px 0;">
          ${createButton(
            'Explore Our Resources',
            'https://strivetech.ai/resources',
            EMAIL_COLORS.secondary
          )}
        </div>
      `)}
      
      ${createSpacer(20)}
    `;
  }
}

/**
 * Service Request Notification Template (for team)
 */
/**
 * Service Request Notification Template (for team)
 */
export class ServiceRequestNotificationTemplate extends EmailTemplateBase {
  constructor() {
    super('service-request-notification');
  }

  generateSubject(data: EmailTemplateData): string {
    const requestData = data as ServiceRequestData;
    const serviceType = requestData.serviceType || requestData.requestTypes || 'General Inquiry';
    const priority = this.calculatePriority(requestData);
    return `🚨 ${priority.level.toUpperCase()} Priority Service Request: ${serviceType} from ${requestData.firstName} ${requestData.lastName} (Score: ${priority.score}/100)`;
  }

  renderContent(data: EmailTemplateData, options: TemplateRenderOptions): string {
    const requestData = data as ServiceRequestData;
    const serviceType = requestData.serviceType || requestData.requestTypes || 'General Inquiry';
    const priority = this.calculatePriority(requestData);
    const requestId = this.generateReferenceId('SRQ');
    const projectDescription = requestData.projectDescription || requestData.businessObjectives || 'No description provided';
    
    return `
      ${createHeroSection(
        '🚨 New Service Request',
        `${requestData.firstName} ${requestData.lastName} from ${requestData.company} has submitted a ${serviceType} request. Priority score: ${priority.score}/100`,
        '📋'
      )}
      
      ${createContentSection(`
        <div style="text-align: center;">
          ${createReferenceId(requestId)}
        </div>
      `)}
      
      ${createContentSection(`
        ${createInfoCard(
          '👤 Client Information',
          `
            <strong>Name:</strong> ${requestData.firstName} ${requestData.lastName}<br>
            <strong>Email:</strong> ${requestData.email}<br>
            <strong>Company:</strong> ${requestData.company}<br>
            <strong>Job Title:</strong> ${requestData.jobTitle || 'Not specified'}<br>
            <strong>Phone:</strong> ${requestData.phone || 'Not provided'}<br>
            <strong>Company Size:</strong> ${requestData.companySize || 'Not specified'}<br>
            <strong>Submitted:</strong> ${this.formatDate(new Date())} at ${this.formatTime(new Date())}
          `
        )}
      `)}
      
      ${createContentSection(`
        ${createInfoCard(
          '🎯 Service Request Details',
          `
            <strong>Service Type:</strong> ${serviceType}<br>
            <strong>Timeline:</strong> ${requestData.timeline || 'Not specified'}<br>
            <strong>Budget:</strong> ${requestData.budget || 'Not specified'}<br>
            <strong>Current Software:</strong> ${requestData.currentSoftware || 'Not specified'}<br>
            <strong>Desired Outcomes:</strong> ${requestData.desiredOutcomes || 'Not specified'}
          `
        )}
      `)}
      
      ${createContentSection(`
        ${createInfoCard(
          '📝 Project Description',
          `<div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid ${EMAIL_COLORS.primary};">${projectDescription}</div>`
        )}
      `)}
      
      ${createContentSection(`
        ${createInfoCard(
          '⚡ Priority Analysis Dashboard',
          `
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
              <span style="background-color: ${priority.color}; color: white; padding: 6px 16px; border-radius: 16px; font-size: 12px; font-weight: bold;">
                ${priority.level.toUpperCase()} PRIORITY
              </span>
              <span style="color: ${EMAIL_COLORS.darkGray}; font-weight: bold;">Score: ${priority.score}/100</span>
            </div>
            <strong>Recommended Action:</strong> ${priority.action}<br>
            <strong>Response Time:</strong> ${priority.responseTime}<br>
            <strong>Potential Value:</strong> ${priority.potentialValue}<br>
            <strong>Key Indicators:</strong> ${priority.indicators.join(', ')}<br>
            <strong>Next Steps:</strong> ${priority.nextSteps}
          `
        )}
      `)}
      
      ${createContentSection(`
        <div style="text-align: center; margin: 30px 0;">
          ${createButton(
            'Review in Admin Panel',
            'https://strivetech.ai/admin/requests',
            EMAIL_COLORS.primary
          )}
          ${createButton(
            'Reply to Client',
            `mailto:${requestData.email}?subject=Re: Your ${serviceType} Request`,
            EMAIL_COLORS.secondary
          )}
        </div>
      `)}
      
      ${createSpacer(20)}
    `;
  }

  private calculatePriority(data: ServiceRequestData): { 
    level: string; 
    score: number; 
    color: string; 
    action: string; 
    responseTime: string;
    potentialValue: string;
    indicators: string[];
    nextSteps: string;
  } {
    let score = 0;
    const indicators = [];
    
    // Company size scoring
    if (data.companySize && data.companySize.includes('100+')) {
      score += 30;
      indicators.push('Large enterprise (100+ employees)');
    } else if (data.companySize && data.companySize.includes('50-100')) {
      score += 20;
      indicators.push('Medium company (50-100 employees)');
    } else if (data.companySize) {
      score += 10;
      indicators.push('Small business');
    }
    
    // Budget scoring
    if (data.budget && data.budget.includes('100,000+')) {
      score += 40;
      indicators.push('High budget ($100,000+)');
    } else if (data.budget && data.budget.includes('50,000')) {
      score += 30;
      indicators.push('Medium budget ($50,000-$100,000)');
    } else if (data.budget && data.budget.includes('25,000')) {
      score += 20;
      indicators.push('Low-medium budget ($25,000-$50,000)');
    } else if (data.budget && !data.budget.includes('5,000')) {
      score += 15;
      indicators.push('Budget specified');
    }
    
    // Service type scoring
    const serviceType = data.serviceType || data.requestTypes || '';
    if (serviceType.toLowerCase().includes('enterprise')) {
      score += 20;
      indicators.push('Enterprise solution requested');
    } else if (serviceType.toLowerCase().includes('ai') || serviceType.toLowerCase().includes('automation')) {
      score += 15;
      indicators.push('AI/Automation services');
    } else if (serviceType.toLowerCase().includes('custom')) {
      score += 18;
      indicators.push('Custom development');
    } else {
      score += 10;
      indicators.push('Standard service');
    }
    
    // Timeline urgency
    if (data.timeline && data.timeline.includes('immediate')) {
      score += 15;
      indicators.push('Immediate timeline');
    } else if (data.timeline && data.timeline.includes('1-3 months')) {
      score += 12;
      indicators.push('Short timeline (1-3 months)');
    } else if (data.timeline && data.timeline.includes('3-6 months')) {
      score += 8;
      indicators.push('Medium timeline (3-6 months)');
    } else if (data.timeline) {
      score += 5;
      indicators.push('Timeline specified');
    }
    
    // Job title scoring
    if (data.jobTitle && (
      data.jobTitle.toLowerCase().includes('ceo') ||
      data.jobTitle.toLowerCase().includes('cto') ||
      data.jobTitle.toLowerCase().includes('president') ||
      data.jobTitle.toLowerCase().includes('founder')
    )) {
      score += 15;
      indicators.push('Executive decision maker');
    } else if (data.jobTitle && data.jobTitle.toLowerCase().includes('director')) {
      score += 12;
      indicators.push('Director level');
    } else if (data.jobTitle && data.jobTitle.toLowerCase().includes('manager')) {
      score += 8;
      indicators.push('Management level');
    }
    
    // Project complexity scoring
    const projectDescription = data.projectDescription || data.businessObjectives || '';
    if (projectDescription.length > 200) {
      score += 10;
      indicators.push('Detailed project description');
    }
    
    // Contact completeness
    if (data.phone) {
      score += 5;
      indicators.push('Phone provided');
    }
    
    if (data.currentSoftware) {
      score += 5;
      indicators.push('Current software specified');
    }
    
    if (data.desiredOutcomes) {
      score += 5;
      indicators.push('Clear outcomes defined');
    }
    
    if (score >= 80) {
      return { 
        level: 'urgent', 
        score, 
        color: '#dc3545', // Red for urgent
        action: 'Contact within 1 hour',
        responseTime: '1 hour',
        potentialValue: '$100,000+ potential',
        indicators,
        nextSteps: 'Schedule immediate discovery call with senior team'
      };
    } else if (score >= 60) {
      return { 
        level: 'high', 
        score, 
        color: EMAIL_COLORS.danger, 
        action: 'Contact within 4 hours',
        responseTime: '4 hours',
        potentialValue: '$50,000-$100,000 potential',
        indicators,
        nextSteps: 'Schedule discovery call within 24 hours'
      };
    } else if (score >= 40) {
      return { 
        level: 'medium', 
        score, 
        color: EMAIL_COLORS.warning, 
        action: 'Contact within 12 hours',
        responseTime: '12 hours',
        potentialValue: '$25,000-$50,000 potential',
        indicators,
        nextSteps: 'Send detailed response and schedule consultation'
      };
    } else {
      return { 
        level: 'low', 
        score, 
        color: EMAIL_COLORS.secondary, 
        action: 'Contact within 24 hours',
        responseTime: '24 hours',
        potentialValue: 'Up to $25,000 potential',
        indicators,
        nextSteps: 'Send standard response with resources'
      };
    }
  }
}

/**
 * Contact Form Notification Template (for team)
 */
export class ContactFormNotificationTemplate extends EmailTemplateBase {
  constructor() {
    super('contact-form-notification');
  }

  generateSubject(data: EmailTemplateData): string {
    const formData = data as ContactFormData;
    const priority = this.calculateLeadPriority(formData);
    return `🚨 ${priority.level.toUpperCase()} Priority Lead: ${formData.firstName} ${formData.lastName} (Score: ${priority.score}/100)`;
  }

  renderContent(data: EmailTemplateData, options: TemplateRenderOptions): string {
    const formData = data as ContactFormData;
    const priority = this.calculateLeadPriority(formData);
    const referenceId = this.generateReferenceId('CTF');
    
    return `
      ${createHeroSection(
        '🚨 New Contact Form Lead',
        `${formData.firstName} ${formData.lastName} from ${formData.company || 'Unknown Company'} has submitted a contact form. Lead score: ${priority.score}/100`,
        '📋'
      )}
      
      ${createSpacer(10)}
      
      ${createContentSection(`
        <div style="text-align: center;">
          ${createReferenceId(referenceId)}
        </div>
      `)}
      
      ${createContentSection(`
        ${createInfoCard(
          '👤 Lead Information',
          `
            <strong>Name:</strong> ${formData.firstName} ${formData.lastName}<br>
            <strong>Email:</strong> ${formData.email}<br>
            <strong>Company:</strong> ${formData.company || 'Not specified'}<br>
            <strong>Company Size:</strong> ${formData.companySize || 'Not specified'}<br>
            <strong>Job Title:</strong> ${formData.jobTitle || 'Not specified'}<br>
            <strong>Phone:</strong> ${formData.phone || 'Not provided'}<br>
            <strong>Submitted:</strong> ${this.formatDate(new Date())} at ${this.formatTime(new Date())}
          `
        )}
      `)}
      
      ${createContentSection(`
        ${createInfoCard(
          '💬 Message Content',
          `<div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid ${EMAIL_COLORS.primary};">${formData.message}</div>`
        )}
      `)}
      
      ${createContentSection(`
        ${createInfoCard(
          '⚡ Lead Intelligence Dashboard',
          `
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
              <span style="background-color: ${priority.color}; color: white; padding: 6px 16px; border-radius: 16px; font-size: 12px; font-weight: bold;">
                ${priority.level.toUpperCase()} PRIORITY
              </span>
              <span style="color: ${EMAIL_COLORS.darkGray}; font-weight: bold;">Score: ${priority.score}/100</span>
            </div>
            <strong>Recommended Action:</strong> ${priority.action}<br>
            <strong>Response Time:</strong> ${priority.responseTime}<br>
            <strong>Potential Value:</strong> ${priority.potentialValue}<br>
            <strong>Key Indicators:</strong> ${priority.indicators.join(', ')}<br>
            <strong>Next Steps:</strong> ${priority.nextSteps}
          `
        )}
      `)}
      
      ${createContentSection(`
        <div style="text-align: center; margin: 30px 0;">
          ${createButton(
            'View in Admin Dashboard',
            'https://strivetech.ai/admin/contacts',
            EMAIL_COLORS.primary
          )}
          ${createButton(
            'Reply to Lead',
            `mailto:${formData.email}?subject=Re: Your inquiry to Strive Tech`,
            EMAIL_COLORS.secondary
          )}
        </div>
      `)}
      
      ${createSpacer(20)}
    `;
  }

  private calculateLeadPriority(data: ContactFormData): { 
    level: string; 
    score: number; 
    color: string; 
    action: string; 
    responseTime: string;
    potentialValue: string;
    indicators: string[];
    nextSteps: string;
  } {
    let score = 0;
    const indicators = [];
    
    // Company scoring
    if (data.company) {
      score += 20;
      indicators.push('Company provided');
    }
    
    // Company size scoring
    if (data.companySize && data.companySize.includes('100+')) {
      score += 30;
      indicators.push('Large company (100+ employees)');
    } else if (data.companySize && data.companySize.includes('50-100')) {
      score += 20;
      indicators.push('Medium company (50-100 employees)');
    } else if (data.companySize) {
      score += 10;
      indicators.push('Small company');
    }
    
    // Job title scoring
    if (data.jobTitle && (
      data.jobTitle.toLowerCase().includes('ceo') ||
      data.jobTitle.toLowerCase().includes('cto') ||
      data.jobTitle.toLowerCase().includes('president') ||
      data.jobTitle.toLowerCase().includes('director')
    )) {
      score += 25;
      indicators.push('Executive role');
    } else if (data.jobTitle && data.jobTitle.toLowerCase().includes('manager')) {
      score += 15;
      indicators.push('Management role');
    }
    
    // Message content analysis
    if (data.message) {
      const urgentKeywords = ['urgent', 'asap', 'quickly', 'immediate', 'deadline'];
      const valueKeywords = ['budget', 'investment', 'million', 'enterprise', 'scale'];
      const techKeywords = ['ai', 'automation', 'integration', 'system', 'platform'];
      
      if (urgentKeywords.some(keyword => data.message.toLowerCase().includes(keyword))) {
        score += 15;
        indicators.push('Urgent timeline mentioned');
      }
      
      if (valueKeywords.some(keyword => data.message.toLowerCase().includes(keyword))) {
        score += 20;
        indicators.push('Budget/investment mentioned');
      }
      
      if (techKeywords.some(keyword => data.message.toLowerCase().includes(keyword))) {
        score += 10;
        indicators.push('Technical requirements');
      }
    }
    
    // Phone number indicates serious interest
    if (data.phone) {
      score += 10;
      indicators.push('Phone number provided');
    }
    
    if (score >= 70) {
      return { 
        level: 'high', 
        score, 
        color: EMAIL_COLORS.danger, 
        action: 'Contact within 2 hours',
        responseTime: '2 hours',
        potentialValue: '$50,000+ potential',
        indicators,
        nextSteps: 'Schedule discovery call immediately'
      };
    } else if (score >= 40) {
      return { 
        level: 'medium', 
        score, 
        color: EMAIL_COLORS.warning, 
        action: 'Contact within 12 hours',
        responseTime: '12 hours',
        potentialValue: '$10,000-$50,000 potential',
        indicators,
        nextSteps: 'Send personalized response and schedule call'
      };
    } else {
      return { 
        level: 'low', 
        score, 
        color: EMAIL_COLORS.secondary, 
        action: 'Contact within 24 hours',
        responseTime: '24 hours',
        potentialValue: 'Up to $10,000 potential',
        indicators,
        nextSteps: 'Send standard response with resources'
      };
    }
  }
}

/**
 * Service Request Confirmation Template (for users)
 */
export class ServiceRequestConfirmationTemplate extends EmailTemplateBase {
  constructor() {
    super('service-request-confirmation');
  }

  generateSubject(data: EmailTemplateData): string {
    const requestData = data as ServiceRequestData;
    return `Thank you for your service request, ${requestData.firstName}! Your consultation is confirmed 🚀`;
  }

  renderContent(data: EmailTemplateData, options: TemplateRenderOptions): string {
    const requestData = data as ServiceRequestData;
    const serviceType = requestData.serviceType || requestData.requestTypes || 'General Inquiry';
    const referenceId = this.generateReferenceId('SRQ');
    
    return `
      ${createHeroSection(
        `Thank You, ${requestData.firstName}!`,
        `Your service request for ${serviceType} has been received. Our experts are reviewing your requirements and will contact you within 24 hours to schedule your consultation.`,
        '🎯'
      )}
      
      ${createSpacer(10)}
      
      ${createContentSection(`
        <div style="text-align: center;">
          ${createReferenceId(referenceId)}
        </div>
      `)}
      
      ${createContentSection(`
        ${createInfoCard(
          '📋 Your Service Request Summary',
          `
            <strong>Service Type:</strong> ${serviceType}<br>
            <strong>Company:</strong> ${requestData.company}<br>
            <strong>Timeline:</strong> ${requestData.timeline || 'To be discussed'}<br>
            <strong>Budget Range:</strong> ${requestData.budget || 'To be discussed'}<br>
            <strong>Submitted:</strong> ${this.formatDate(new Date())} at ${this.formatTime(new Date())}
          `
        )}
      `)}
      
      ${requestData.projectDescription ? createContentSection(`
        ${createInfoCard(
          '💭 Project Description',
          `<div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid ${EMAIL_COLORS.primary};">${requestData.projectDescription}</div>`
        )}
      `) : ''}
      
      ${createContentSection(`
        <h3 style="color: ${EMAIL_COLORS.darkBlue}; font-size: 18px; font-weight: bold; margin: 30px 0 20px 0;">
          🚀 What Happens Next?
        </h3>
        
        ${createTimelineStep(1, 'Request Received', 'Your service request has been logged and assigned to our expert team.', 'completed')}
        ${createTimelineStep(2, 'Expert Review', 'Our specialists are analyzing your requirements and preparing a tailored approach.', 'current')}
        ${createTimelineStep(3, 'Consultation Call', 'We\'ll schedule a consultation call to discuss your project in detail.', 'pending')}
        ${createTimelineStep(4, 'Proposal & Timeline', 'You\'ll receive a detailed proposal with timeline and next steps.', 'pending')}
      `)}
      
      ${createContentSection(`
        <h3 style="color: ${EMAIL_COLORS.darkBlue}; font-size: 18px; font-weight: bold; margin: 30px 0 20px 0; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">
          👥 Meet Your Expert Team
        </h3>
        
        ${createTwoColumnLayout(
          createTeamMemberCard(
            'Sarah Chen', 
            'AI Solutions Architect', 
            'Leading your technical implementation and architecture design.'
          ),
          createTeamMemberCard(
            'Marcus Rodriguez', 
            'Project Manager', 
            'Ensuring your project stays on track and meets all objectives.'
          )
        )}
      `)}
      
      ${createContentSection(`
        <div style="text-align: center; margin: 30px 0;">
          ${createButton(
            'View Our Case Studies',
            'https://strivetech.ai/case-studies',
            EMAIL_COLORS.primary
          )}
          ${createButton(
            'Download AI Guide',
            'https://strivetech.ai/resources/ai-implementation-guide',
            EMAIL_COLORS.secondary
          )}
        </div>
      `)}
      
      ${createSpacer(20)}
    `;
  }
}

/**
 * Newsletter Email Template - Standalone Design
 * This template does NOT use the standard header/footer
 */
export class NewsletterEmailTemplate extends EmailTemplateBase {
  constructor() {
    super('newsletter-email');
  }

  generateSubject(data: EmailTemplateData): string {
    const newsletterData = data as NewsletterData;
    return `🚀 NEW STRIVELETTER - Innovation at the Core`;
  }

  // Override the base render method to NOT include header/footer
  async render(data: EmailTemplateData, options: TemplateRenderOptions = {}): Promise<TemplateResult> {
    try {
      const subject = this.generateSubject(data);
      const content = this.renderContent(data, options);
      
      // Create standalone newsletter wrapper without standard header/footer
      const emailHTML = this.createNewsletterWrapper(content);

      return {
        subject,
        html: emailHTML,
        text: this.generateNewsletterTextVersion(data),
        success: true
      };
    } catch (error) {
      console.error(`Error rendering ${this.templateName} template:`, error);
      return {
        subject: 'Strive Tech Newsletter',
        html: this.generateErrorTemplate(),
        text: 'Thank you for subscribing to Strive Tech Newsletter.',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  renderContent(data: EmailTemplateData, options: TemplateRenderOptions): string {
    const newsletterData = data as NewsletterData;
    
    return `
      <!-- Main Newsletter Content -->
      <tr>
        <td style="padding: 0; background: linear-gradient(135deg, ${EMAIL_COLORS.darkBlue} 0%, #1a2b3d 100%); position: relative; min-height: 600px;">
          <!-- Network/Connection Background Pattern -->
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(circle at 20% 30%, rgba(255,112,51,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,112,51,0.08) 0%, transparent 50%); z-index: 1;"></div>
          
          <!-- Decorative network lines -->
          <div style="position: absolute; top: 50px; left: 20px; width: 100px; height: 2px; background: linear-gradient(90deg, transparent, rgba(255,112,51,0.3), transparent); z-index: 2;"></div>
          <div style="position: absolute; top: 150px; right: 30px; width: 80px; height: 2px; background: linear-gradient(90deg, transparent, rgba(255,112,51,0.3), transparent); z-index: 2;"></div>
          
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="position: relative; z-index: 3;">
            <tr>
              <td style="padding: 60px 40px 40px;">
                
                <!-- Header Section -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="text-align: right; padding-bottom: 30px;">
                      <div style="color: ${EMAIL_COLORS.primary}; font-size: 14px; font-weight: 600; letter-spacing: 1px;">
                        STRIVE TECH
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Geometric Arrow Elements -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding-bottom: 40px;">
                      <div style="display: flex; align-items: center; gap: 15px;">
                        <!-- Geometric arrows -->
                        <div style="display: flex; flex-direction: column; gap: 3px;">
                          <div style="width: 20px; height: 3px; background: rgba(255,255,255,0.6); transform: skew(-20deg);"></div>
                          <div style="width: 25px; height: 3px; background: rgba(255,255,255,0.8); transform: skew(-20deg);"></div>
                          <div style="width: 30px; height: 3px; background: ${EMAIL_COLORS.primary}; transform: skew(-20deg);"></div>
                          <div style="width: 25px; height: 3px; background: rgba(255,255,255,0.8); transform: skew(-20deg);"></div>
                          <div style="width: 20px; height: 3px; background: rgba(255,255,255,0.6); transform: skew(-20deg);"></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Main Title -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding-bottom: 30px;">
                      <div style="color: rgba(255,255,255,0.7); font-size: 14px; font-weight: 400; margin-bottom: 10px; letter-spacing: 2px;">
                        NEW
                      </div>
                      <div style="color: ${EMAIL_COLORS.white}; font-size: 42px; font-weight: 900; line-height: 48px; margin-bottom: 20px;">
                        STRIVE<span style="color: ${EMAIL_COLORS.primary};">LETTER</span>
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Newsletter Content Area -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding-bottom: 50px;">
                      <div style="color: rgba(255,255,255,0.9); font-size: 16px; line-height: 24px; margin-bottom: 30px;">
                        ${newsletterData.content || 'Welcome to the latest insights from Strive Tech. Discover how AI innovation is shaping the future of industry and transforming businesses worldwide.'}
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Innovation Section -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding-bottom: 40px;">
                      <div style="color: rgba(255,255,255,0.8); font-size: 14px; font-weight: 600; margin-bottom: 15px; letter-spacing: 1px;">
                        INNOVATION AT THE CORE:
                      </div>
                      <div style="color: ${EMAIL_COLORS.white}; font-size: 24px; font-weight: 700; line-height: 30px; margin-bottom: 20px;">
                        SHAPING THE FUTURE OF<br>INDUSTRY
                      </div>
                      <div style="color: rgba(255,255,255,0.8); font-size: 14px; line-height: 22px;">
                        ${newsletterData.excerpt || 'Discover breakthrough technologies, industry insights, and strategic innovations that are defining the next generation of business solutions. From AI automation to data analytics, explore how forward-thinking companies are leveraging technology to drive unprecedented growth and efficiency.'}
                      </div>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer Bar -->
      <tr>
        <td style="background-color: ${EMAIL_COLORS.darkBlue}; padding: 20px 40px; border-top: 1px solid rgba(255,112,51,0.3);">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <!-- Website -->
              <td style="text-align: left; vertical-align: middle; width: 33.33%;">
                <div style="color: rgba(255,255,255,0.8); font-size: 12px; display: flex; align-items: center;">
                  🌐 www.strivetech.ai
                </div>
              </td>
              
              <!-- Logo -->
              <td style="text-align: center; vertical-align: middle; width: 33.33%;">
                <div style="display: inline-block; width: 40px; height: 40px; background: ${EMAIL_COLORS.primary}; border-radius: 8px; position: relative;">
                  <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: ${EMAIL_COLORS.white}; font-size: 16px; font-weight: 900;">ST</span>
                  <span style="position: absolute; top: 25%; right: 15%; color: ${EMAIL_COLORS.white}; font-size: 10px;">→</span>
                </div>
              </td>
              
              <!-- Phone -->
              <td style="text-align: right; vertical-align: middle; width: 33.33%;">
                <div style="color: rgba(255,255,255,0.8); font-size: 12px;">
                  📞 (731) 431-2320
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  }

  private createNewsletterWrapper(content: string): string {
    return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>Strive Tech Newsletter</title>
  
  <style type="text/css">
    body { margin: 0; padding: 0; background-color: ${EMAIL_COLORS.background}; font-family: Arial, Helvetica, sans-serif; }
    table { border-collapse: collapse; }
    img { border: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: ${EMAIL_COLORS.white}; }
    
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .mobile-padding { padding: 20px !important; }
      .mobile-text-center { text-align: center !important; }
    }
  </style>
</head>
<body>
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${EMAIL_COLORS.background};">
    <tr>
      <td align="center" style="padding: 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" style="max-width: 600px; background-color: ${EMAIL_COLORS.white}; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          ${content}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }

  private generateNewsletterTextVersion(data: EmailTemplateData): string {
    const newsletterData = data as NewsletterData;
    return `
🚀 NEW STRIVELETTER - Innovation at the Core

${newsletterData.content || 'Welcome to the latest insights from Strive Tech. Discover how AI innovation is shaping the future of industry and transforming businesses worldwide.'}

INNOVATION AT THE CORE: SHAPING THE FUTURE OF INDUSTRY

${newsletterData.excerpt || 'Discover breakthrough technologies, industry insights, and strategic innovations that are defining the next generation of business solutions.'}

---
🌐 www.strivetech.ai | 📞 (731) 431-2320

Strive Tech - AI Solutions Company
    `.trim();
  }
}
