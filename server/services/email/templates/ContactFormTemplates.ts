/**
 * Contact Form Email Templates
 *
 * Dedicated templates for contact form submissions including
 * confirmation emails for users and notification emails for the team
 */

import {
  EMAIL_COLORS,
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
  ContactFormData
} from '../types/index.js';

import { EmailTemplateBase } from './EmailTemplateBase.js';
import { calculateContactFormPriority } from '../helpers/TemplateHelpers.js';

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
            `${this.getSiteUrl()}/solutions`,
            EMAIL_COLORS.primary
          )}
        </div>
      `)}

      ${createSpacer(20)}
    `;
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
    const priority = calculateContactFormPriority(formData);
    return `🚨 ${priority.level.toUpperCase()} Priority Lead: ${formData.firstName} ${formData.lastName} (Score: ${priority.score}/100)`;
  }

  renderContent(data: EmailTemplateData, options: TemplateRenderOptions): string {
    const formData = data as ContactFormData;
    const priority = calculateContactFormPriority(formData);
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
            `${this.getSiteUrl()}/admin/contacts`,
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

}