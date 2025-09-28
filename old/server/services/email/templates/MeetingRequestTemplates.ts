/**
 * Meeting Request Email Templates
 *
 * Enhanced templates for meeting request submissions including
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
  MeetingRequestData
} from '../types/index.js';

import { EmailTemplateBase } from './EmailTemplateBase.js';
import { calculateMeetingRequestPriority } from '../helpers/TemplateHelpers.js';

/**
 * Meeting Request Confirmation Template (for users)
 */
export class MeetingRequestConfirmationTemplate extends EmailTemplateBase {
  constructor() {
    super('meeting-request-confirmation');
  }

  generateSubject(data: EmailTemplateData): string {
    const meetingData = data as MeetingRequestData;
    return `Meeting Request Confirmed - Thank you, ${meetingData.firstName}! 📅`;
  }

  renderContent(data: EmailTemplateData, options: TemplateRenderOptions): string {
    const meetingData = data as MeetingRequestData;
    const referenceId = this.generateReferenceId('MTG');
    const meetingType = meetingData.meetingType || 'General Consultation';

    return `
      ${createHeroSection(
        `Thank You, ${meetingData.firstName}!`,
        `Your meeting request for ${meetingType} has been received. Our team will contact you within 4 hours to schedule your consultation.`,
        '📅'
      )}

      ${createSpacer(10)}

      ${createContentSection(`
        <div style="text-align: center;">
          ${createReferenceId(referenceId)}
        </div>
      `)}

      ${createContentSection(`
        ${createInfoCard(
          '📋 Your Meeting Request Summary',
          `
            <strong>Meeting Type:</strong> ${meetingType}<br>
            <strong>Company:</strong> ${meetingData.company || 'Not specified'}<br>
            <strong>Preferred Contact:</strong> ${meetingData.preferredContact || 'Email'}<br>
            <strong>Submitted:</strong> ${this.formatDate(new Date())} at ${this.formatTime(new Date())}
          `
        )}
      `)}

      ${meetingData.message ? createContentSection(`
        ${createInfoCard(
          '💭 Your Message',
          `<div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid ${EMAIL_COLORS.primary};">${meetingData.message}</div>`
        )}
      `) : ''}

      ${createContentSection(`
        <h3 style="color: ${EMAIL_COLORS.darkBlue}; font-size: 18px; font-weight: bold; margin: 30px 0 20px 0;">
          🚀 What Happens Next?
        </h3>

        ${createTimelineStep(1, 'Request Received', 'Your meeting request has been logged and assigned to our scheduling team.', 'completed')}
        ${createTimelineStep(2, 'Schedule Coordination', 'We\'re reviewing your availability and preparing for your consultation.', 'current')}
        ${createTimelineStep(3, 'Meeting Confirmation', 'You\'ll receive calendar invite with meeting details within 4 hours.', 'pending')}
        ${createTimelineStep(4, 'Consultation Call', 'Join our experts for your scheduled consultation session.', 'pending')}
      `)}

      ${createContentSection(`
        <h3 style="color: ${EMAIL_COLORS.darkBlue}; font-size: 18px; font-weight: bold; margin: 30px 0 20px 0; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">
          👥 Meet Your Consultation Team
        </h3>

        ${createTwoColumnLayout(
          createTeamMemberCard(
            'Sarah Chen',
            'AI Solutions Architect',
            'Leading technical consultations and solution design.'
          ),
          createTeamMemberCard(
            'Marcus Rodriguez',
            'Business Strategy Consultant',
            'Focusing on business value and implementation strategy.'
          )
        )}
      `)}

      ${createContentSection(`
        <div style="text-align: center; margin: 30px 0;">
          ${createButton(
            'Prepare for Your Meeting',
            `${this.getSiteUrl()}/meeting-prep`,
            EMAIL_COLORS.primary
          )}
          ${createButton(
            'View Our Solutions',
            `${this.getSiteUrl()}/solutions`,
            EMAIL_COLORS.secondary
          )}
        </div>
      `)}

      ${createSpacer(20)}
    `;
  }
}

/**
 * Meeting Request Notification Template (for team)
 */
export class MeetingRequestNotificationTemplate extends EmailTemplateBase {
  constructor() {
    super('meeting-request-notification');
  }

  generateSubject(data: EmailTemplateData): string {
    const meetingData = data as MeetingRequestData;
    const priority = calculateMeetingRequestPriority(meetingData);
    return `🗓️ ${priority.level.toUpperCase()} Priority Meeting Request: ${meetingData.firstName} ${meetingData.lastName} (Score: ${priority.score}/100)`;
  }

  renderContent(data: EmailTemplateData, options: TemplateRenderOptions): string {
    const meetingData = data as MeetingRequestData;
    const priority = calculateMeetingRequestPriority(meetingData);
    const referenceId = this.generateReferenceId('MTG');
    const meetingType = meetingData.meetingType || 'General Consultation';

    return `
      ${createHeroSection(
        '🗓️ New Meeting Request',
        `${meetingData.firstName} ${meetingData.lastName} from ${meetingData.company || 'Unknown Company'} has requested a meeting. Priority score: ${priority.score}/100`,
        '📅'
      )}

      ${createSpacer(10)}

      ${createContentSection(`
        <div style="text-align: center;">
          ${createReferenceId(referenceId)}
        </div>
      `)}

      ${createContentSection(`
        ${createInfoCard(
          '👤 Meeting Request Information',
          `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
              <strong style="color: ${EMAIL_COLORS.darkBlue};">Contact Details:</strong>
              <span style="color: ${EMAIL_COLORS.darkGray}; font-weight: bold;">Score: ${priority.score}/100</span>
            </div>
            <strong>Name:</strong> ${meetingData.firstName} ${meetingData.lastName}<br>
            <strong>Email:</strong> <a href="mailto:${meetingData.email}" style="color: ${EMAIL_COLORS.primary};">${meetingData.email}</a><br>
            <strong>Company:</strong> ${meetingData.company || 'Not specified'}<br>
            <strong>Meeting Type:</strong> ${meetingType}<br>
            <strong>Preferred Contact:</strong> ${meetingData.preferredContact || 'Email'}<br>
            ${meetingData.phone ? `<strong>Phone:</strong> <a href="tel:${meetingData.phone}" style="color: ${EMAIL_COLORS.primary};">${meetingData.phone}</a><br>` : ''}
            <strong>Submitted:</strong> ${this.formatDate(new Date())} at ${this.formatTime(new Date())}
          `
        )}
      `)}

      ${meetingData.message ? createContentSection(`
        ${createInfoCard(
          '💭 Client Message',
          `<div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid ${EMAIL_COLORS.primary}; font-style: italic;">"${meetingData.message}"</div>`
        )}
      `) : ''}

      ${createContentSection(`
        ${createInfoCard(
          '🎯 Priority Analysis Dashboard',
          `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h3 style="margin: 0; font-size: 18px;">Priority Level: ${priority.level.toUpperCase()}</h3>
                  <p style="margin: 5px 0 0 0; opacity: 0.9;">Response Required: ${priority.urgencyIndicators.length > 0 ? priority.urgencyIndicators[0] : 'Standard timeframe'}</p>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 28px; font-weight: bold;">${priority.score}</div>
                  <div style="font-size: 12px; opacity: 0.8;">out of 100</div>
                </div>
              </div>
            </div>

            <div style="margin-top: 20px;">
              <strong>Key Factors:</strong><br>
              ${priority.factors.map(factor => `• ${factor}`).join('<br>')}
            </div>

            ${priority.urgencyIndicators.length > 0 ? `
              <div style="margin-top: 15px; padding: 10px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                <strong>Urgency Indicators:</strong><br>
                ${priority.urgencyIndicators.map(indicator => `• ${indicator}`).join('<br>')}
              </div>
            ` : ''}
          `
        )}
      `)}

      ${createContentSection(`
        <div style="text-align: center; margin: 30px 0;">
          ${createButton(
            'Reply to Client',
            `mailto:${meetingData.email}?subject=Re: Meeting Request - ${referenceId}`,
            EMAIL_COLORS.primary
          )}
          ${createButton(
            'Schedule Meeting',
            `${this.getSiteUrl()}/admin/meetings?request=${referenceId}`,
            EMAIL_COLORS.secondary
          )}
        </div>
      `)}

      ${createSpacer(20)}
    `;
  }
}