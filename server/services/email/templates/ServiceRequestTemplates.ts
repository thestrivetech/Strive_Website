/**
 * Service Request Email Templates
 *
 * Contains template classes for service request notifications and confirmations
 * extracted from EmailTemplateBase.original.ts
 */

import { EmailTemplateBase } from './EmailTemplateBase.js';
import {
  EMAIL_COLORS,
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
  ServiceRequestData
} from '../types/index.js';
import { calculateServiceRequestPriority } from '../helpers/TemplateHelpers.js';

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
    const priority = calculateServiceRequestPriority(requestData);
    return `🚨 ${priority.level.toUpperCase()} Priority Service Request: ${serviceType} from ${requestData.firstName} ${requestData.lastName} (Score: ${priority.score}/100)`;
  }

  renderContent(data: EmailTemplateData, options: TemplateRenderOptions): string {
    const requestData = data as ServiceRequestData;
    const serviceType = requestData.serviceType || requestData.requestTypes || 'General Inquiry';
    const priority = calculateServiceRequestPriority(requestData);
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
            `${this.getSiteUrl()}/admin/requests`,
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
            `${this.getSiteUrl()}/case-studies`,
            EMAIL_COLORS.primary
          )}
          ${createButton(
            'Download AI Guide',
            `${this.getSiteUrl()}/resources/ai-implementation-guide`,
            EMAIL_COLORS.secondary
          )}
        </div>
      `)}

      ${createSpacer(20)}
    `;
  }
}