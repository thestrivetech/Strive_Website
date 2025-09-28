/**
 * Email-Safe Component Library
 *
 * Built specifically for maximum email client compatibility using:
 * - Table-based layouts only
 * - Enhanced CSS framework integration
 * - Email-safe colors and fonts
 * - Outlook VML support where needed
 */

import { defaultEmailStyles } from '../styles/EmailStyles.js';


// Email-safe color palette - Website-Matched Brand Colors
export const EMAIL_COLORS = {
  primary: '#ff7033',
  primaryDark: '#d6551e',
  darkBlue: '#020a1c',
  darkBlueMid: '#0f172a',
  secondary: '#0066cc',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  dark: '#020a1c',
  darkGray: '#666666',
  mediumGray: '#999999',
  lightGray: '#cccccc',
  background: '#ffffffeb',
  white: '#ffffff',
  white90: 'rgba(255,255,255,0.9)',
  white80: 'rgba(255,255,255,0.8)',
  white60: 'rgba(255,255,255,0.6)',
  white20: 'rgba(255,255,255,0.2)',
  white10: 'rgba(255,255,255,0.1)',
  black: '#000000'
} as const;

// Email-safe fonts
export const EMAIL_FONTS = {
  primary: 'Arial, Helvetica, sans-serif',
  secondary: 'Georgia, Times, serif',
  monospace: 'Courier, monospace'
} as const;

/**
 * Creates the main email wrapper with proper table structure
 * Enhanced with mobile responsiveness and accessibility
 */
export function createEmailWrapper(content: string, maxWidth: number = 600): string {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no">
  <title>Strive Tech</title>
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->

  <!-- Enhanced CSS Framework Integration -->
  ${defaultEmailStyles.generateCompleteCSS()}

  <!-- Mobile Responsive Styles -->
  <style type="text/css">
    /* Mobile-first responsive design */
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 0 !important;
      }
      .mobile-padding {
        padding: 20px !important;
      }
      .mobile-hide {
        display: none !important;
      }
      .mobile-text-center {
        text-align: center !important;
      }
      .mobile-full-width {
        width: 100% !important;
        display: block !important;
      }
      /* Increase touch target sizes for mobile */
      .button-link {
        min-height: 44px !important;
        padding: 14px 30px !important;
        font-size: 16px !important;
      }
      /* Stack columns on mobile */
      .mobile-stack {
        display: block !important;
        width: 100% !important;
      }
      /* Adjust font sizes for mobile readability */
      .heading-xl {
        font-size: 28px !important;
      }
      .heading-lg {
        font-size: 24px !important;
      }
      .heading-md {
        font-size: 20px !important;
      }
      /* Logo responsive sizing */
      .email-logo {
        width: 140px !important;
        height: auto !important;
      }
      .email-logo-icon {
        width: 44px !important;
        height: 44px !important;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .email-body {
        background-color: #1a1a1a !important;
      }
      .email-container {
        background-color: #2d2d2d !important;
      }
    }
  </style>
</head>
<body class="email-body" style="margin: 0; padding: 0; background-color: ${EMAIL_COLORS.background}; font-family: ${EMAIL_FONTS.primary};">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-wrapper" style="background-color: ${EMAIL_COLORS.background};">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="${maxWidth}" class="email-container" style="max-width: ${maxWidth}px; background-color: ${EMAIL_COLORS.white}; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          ${content}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Creates email header with logo image - Website-matched design
 * Real logo image with exact gradient and styling from website
 */
export function createEmailHeader(emailType?: string): string {
  return `
  <tr>
    <td style="padding: 24px 40px; background: linear-gradient(135deg, ${EMAIL_COLORS.darkBlue} 0%, ${EMAIL_COLORS.darkBlueMid} 100%); border-bottom: 1px solid ${EMAIL_COLORS.white10}; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td align="center">
            <a href="https://strivetech.ai" style="text-decoration: none; display: inline-block;">
              <img
                src="https://strivetech.ai/email-assets/strive-logo-200.png"
                alt="Strive Tech - AI Solutions & Innovation"
                width="200"
                height="43"
                class="email-logo"
                style="display: block; border: 0; outline: none;"
              />
            </a>
            ${emailType ? `
            <div style="margin-top: 12px; color: ${EMAIL_COLORS.white80}; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">
              ${emailType}
            </div>
            ` : ''}
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

/**
 * Creates email footer with logo - Website-matched design
 * Real logo icon with exact gradient and styling from website
 */
export function createEmailFooter(includeUnsubscribe: boolean = false): string {
  return `
  <tr>
    <td style="padding: 40px; background: linear-gradient(135deg, ${EMAIL_COLORS.darkBlue} 0%, ${EMAIL_COLORS.darkBlueMid} 100%); text-align: center; border-top: 1px solid ${EMAIL_COLORS.white10};">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding-bottom: 20px;">
            <!-- ST Icon Logo -->
            <img
              src="https://strivetech.ai/email-assets/st-icon-60.png"
              alt="ST"
              width="60"
              height="60"
              class="email-logo-icon"
              style="display: block; margin: 0 auto 16px; border: 0;"
            />

            <!-- Company Info -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td style="text-align: center; padding-bottom: 20px;">
                  <div style="color: ${EMAIL_COLORS.white}; font-size: 24px; font-weight: 900; margin-bottom: 8px; font-family: ${EMAIL_FONTS.primary};">
                    STRIVE<span style="color: ${EMAIL_COLORS.primary};">TECH</span>
                  </div>
                  <div style="color: ${EMAIL_COLORS.white80}; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px; font-weight: 600;">
                    AI Solutions & Innovation
                  </div>
                  <div style="color: ${EMAIL_COLORS.white60}; font-size: 11px; margin-top: 8px;">
                    📍 Memphis, TN | Serving clients nationwide
                  </div>
                </td>
              </tr>
            </table>

            <!-- Contact Info -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-top: 1px solid ${EMAIL_COLORS.white10}; padding-top: 20px; margin-top: 5px;">
              <tr>
                <td style="text-align: center; padding: 15px 0;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                    <tr>
                      <td style="padding: 0 12px; border-right: 1px solid ${EMAIL_COLORS.white20};">
                        <a href="mailto:contact@strivetech.ai" style="color: ${EMAIL_COLORS.primary}; text-decoration: none; font-size: 13px; font-weight: 500;">📧 contact@strivetech.ai</a>
                      </td>
                      <td style="padding: 0 12px; border-right: 1px solid ${EMAIL_COLORS.white20};">
                        <a href="https://strivetech.ai" style="color: ${EMAIL_COLORS.primary}; text-decoration: none; font-size: 13px; font-weight: 500;">🌐 strivetech.ai</a>
                      </td>
                      <td style="padding: 0 12px;">
                        <a href="tel:+17314312320" style="color: ${EMAIL_COLORS.white80}; text-decoration: none; font-size: 13px;">📞 (731) 431-2320</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Social Media Links -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 20px;">
              <tr>
                <td style="text-align: center; padding: 15px 0;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                    <tr>
                      <td style="padding: 0 10px;">
                        <a href="https://www.linkedin.com/company/strivetech" style="display: inline-block; width: 36px; height: 36px; background-color: rgba(255,112,51,0.15); border-radius: 6px; text-align: center; line-height: 36px; text-decoration: none; font-size: 18px; transition: background-color 0.3s;" title="LinkedIn">
                          <span style="color: ${EMAIL_COLORS.primary};">in</span>
                        </a>
                      </td>
                      <td style="padding: 0 10px;">
                        <a href="https://twitter.com/strivetech" style="display: inline-block; width: 36px; height: 36px; background-color: rgba(255,112,51,0.15); border-radius: 6px; text-align: center; line-height: 36px; text-decoration: none; font-size: 18px;" title="Twitter/X">
                          <span style="color: ${EMAIL_COLORS.primary};">𝕏</span>
                        </a>
                      </td>
                      <td style="padding: 0 10px;">
                        <a href="https://github.com/strivetech" style="display: inline-block; width: 36px; height: 36px; background-color: rgba(255,112,51,0.15); border-radius: 6px; text-align: center; line-height: 36px; text-decoration: none; font-size: 18px;" title="GitHub">
                          <span style="color: ${EMAIL_COLORS.primary};">⚡</span>
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Legal Links & Copyright -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td style="text-align: center; padding-top: 20px; border-top: 1px solid ${EMAIL_COLORS.white10}; margin-top: 20px;">
                  <!-- Legal Links -->
                  <div style="margin-bottom: 15px;">
                    <a href="https://strivetech.ai/privacy" style="color: ${EMAIL_COLORS.white60}; text-decoration: none; font-size: 11px; margin: 0 10px;">Privacy Policy</a>
                    <span style="color: ${EMAIL_COLORS.white20};">|</span>
                    <a href="https://strivetech.ai/terms" style="color: ${EMAIL_COLORS.white60}; text-decoration: none; font-size: 11px; margin: 0 10px;">Terms of Service</a>
                    ${includeUnsubscribe ? `
                    <span style="color: ${EMAIL_COLORS.white20};">|</span>
                    <a href="{{unsubscribe_url}}" style="color: ${EMAIL_COLORS.white60}; text-decoration: none; font-size: 11px; margin: 0 10px;">Unsubscribe</a>
                    ` : ''}
                  </div>
                  <!-- Copyright -->
                  <p style="color: ${EMAIL_COLORS.white60}; font-size: 11px; margin: 5px 0; line-height: 16px;">
                    © ${new Date().getFullYear()} Strive Tech, LLC. All rights reserved.<br>
                    <span style="font-size: 10px; color: ${EMAIL_COLORS.white60};">Empowering businesses with cutting-edge AI solutions since 2024.</span>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

/**
 * Creates a hero section with title and subtitle
 */
export function createHeroSection(
  title: string,
  subtitle: string,
  icon: string = '🚀',
  backgroundColor: string = EMAIL_COLORS.white
): string {
  return `
  <tr>
    <td class="hero-section" style="background-color: ${backgroundColor}; padding: 40px 40px 30px; text-align: center;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td align="center">
            <div class="hero-icon" style="background-color: ${EMAIL_COLORS.primary}; color: ${EMAIL_COLORS.white}; width: 60px; height: 60px; border-radius: 30px; font-size: 24px; line-height: 60px; margin: 0 auto 20px; text-align: center;">
              ${icon}
            </div>
            <h1 class="heading-xl" style="color: ${EMAIL_COLORS.dark}; margin: 0 0 15px 0;">
              ${title}
            </h1>
            <p class="body-base" style="color: ${EMAIL_COLORS.darkGray}; margin: 0; max-width: 480px; margin-left: auto; margin-right: auto;">
              ${subtitle}
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

/**
 * Creates a content section with proper spacing
 */
export function createContentSection(content: string, backgroundColor: string = EMAIL_COLORS.white): string {
  return `
  <tr>
    <td style="background-color: ${backgroundColor}; padding: 0 40px 30px;">
      ${content}
    </td>
  </tr>`;
}

/**
 * Creates an email-safe button using table structure
 */
export function createButton(
  text: string,
  url: string,
  buttonColor: string = EMAIL_COLORS.primary,
  textColor: string = EMAIL_COLORS.white
): string {
  return `
  <!--[if mso]>
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${url}" style="height:44px;v-text-anchor:middle;width:200px;" arcsize="10%" stroke="f" fillcolor="${buttonColor}">
    <w:anchorlock/>
    <center style="color:${textColor};font-family:${EMAIL_FONTS.primary};font-size:16px;font-weight:bold;">${text}</center>
  </v:roundrect>
  <![endif]-->
  <!--[if !mso]><!-->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="email-button" style="margin: 20px auto;">
    <tr>
      <td class="button-cell" style="background-color: ${buttonColor}; border-radius: 6px; text-align: center;">
        <a href="${url}" class="button-link body-base" style="display: inline-block; color: ${textColor}; font-family: ${EMAIL_FONTS.primary}; font-weight: bold; text-decoration: none; padding: 12px 30px; border-radius: 6px;">
          ${text}
        </a>
      </td>
    </tr>
  </table>
  <!--<![endif]-->`;
}

/**
 * Creates an info card with border and padding
 */
export function createInfoCard(title: string, content: string, borderColor: string = EMAIL_COLORS.lightGray): string {
  return `
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="info-card" style="margin: 20px 0; border: 1px solid ${borderColor}; border-radius: 6px;">
    <tr>
      <td class="card-content" style="padding: 20px; background-color: ${EMAIL_COLORS.white}; border-radius: 6px;">
        <h3 class="heading-md" style="color: ${EMAIL_COLORS.dark}; margin: 0 0 10px 0;">
          ${title}
        </h3>
        <div class="body-sm" style="color: ${EMAIL_COLORS.darkGray};">
          ${content}
        </div>
      </td>
    </tr>
  </table>`;
}

/**
 * Creates a two-column layout using tables
 */
export function createTwoColumnLayout(leftContent: string, rightContent: string): string {
  return `
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    <tr>
      <td width="48%" style="vertical-align: top; padding-right: 2%;">
        ${leftContent}
      </td>
      <td width="48%" style="vertical-align: top; padding-left: 2%;">
        ${rightContent}
      </td>
    </tr>
  </table>`;
}

/**
 * Creates a reference ID badge
 */
export function createReferenceId(id: string): string {
  return `
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 20px auto;">
    <tr>
      <td style="background-color: rgba(255, 107, 53, 0.1); border: 1px solid rgba(255, 107, 53, 0.3); border-radius: 6px; padding: 12px 20px; text-align: center;">
        <div style="color: ${EMAIL_COLORS.primary}; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
          Reference ID
        </div>
        <div style="color: ${EMAIL_COLORS.primary}; font-size: 16px; font-weight: bold; letter-spacing: 1px;">
          ${id}
        </div>
      </td>
    </tr>
  </table>`;
}

/**
 * Creates a timeline step
 */
export function createTimelineStep(
  stepNumber: number, 
  title: string, 
  description: string, 
  status: 'completed' | 'current' | 'pending' = 'pending'
): string {
  const statusColor = status === 'completed' ? EMAIL_COLORS.success : 
                     status === 'current' ? EMAIL_COLORS.primary : EMAIL_COLORS.lightGray;
  const textColor = status === 'pending' ? EMAIL_COLORS.mediumGray : EMAIL_COLORS.dark;

  return `
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 15px 0;">
    <tr>
      <td width="40" style="vertical-align: top; padding-top: 2px;">
        <div style="background-color: ${statusColor}; color: ${EMAIL_COLORS.white}; width: 30px; height: 30px; border-radius: 15px; text-align: center; line-height: 30px; font-size: 14px; font-weight: bold;">
          ${stepNumber}
        </div>
      </td>
      <td style="vertical-align: top; padding-left: 15px;">
        <h4 style="color: ${textColor}; font-size: 14px; font-weight: bold; margin: 0 0 5px 0;">
          ${title}
        </h4>
        <p style="color: ${EMAIL_COLORS.darkGray}; font-size: 13px; line-height: 18px; margin: 0;">
          ${description}
        </p>
      </td>
    </tr>
  </table>`;
}

/**
 * Creates a team member card
 */
export function createTeamMemberCard(name: string, title: string, description: string): string {
  return `
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 15px 0; border: 1px solid ${EMAIL_COLORS.lightGray}; border-radius: 6px;">
    <tr>
      <td style="padding: 20px; text-align: center; background-color: ${EMAIL_COLORS.white}; border-radius: 6px;">
        <div style="background-color: ${EMAIL_COLORS.primary}; color: ${EMAIL_COLORS.white}; width: 50px; height: 50px; border-radius: 25px; margin: 0 auto 15px; text-align: center; line-height: 50px; font-size: 18px; font-weight: bold;">
          ${name.charAt(0)}
        </div>
        <h4 style="color: ${EMAIL_COLORS.dark}; font-size: 16px; font-weight: bold; margin: 0 0 5px 0;">
          ${name}
        </h4>
        <div style="color: ${EMAIL_COLORS.primary}; font-size: 12px; font-weight: bold; margin-bottom: 10px;">
          ${title}
        </div>
        <p style="color: ${EMAIL_COLORS.darkGray}; font-size: 13px; line-height: 18px; margin: 0;">
          ${description}
        </p>
      </td>
    </tr>
  </table>`;
}

/**
 * Creates a spacer for vertical spacing
 */
export function createSpacer(height: number = 20): string {
  return `
  <tr>
    <td style="height: ${height}px; line-height: ${height}px; font-size: 1px;">&nbsp;</td>
  </tr>`;
}