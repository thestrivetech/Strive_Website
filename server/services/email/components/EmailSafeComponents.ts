/**
 * Email-Safe Component Library
 * 
 * Built specifically for maximum email client compatibility using:
 * - Table-based layouts only
 * - Inline styles exclusively
 * - Email-safe colors and fonts
 * - Outlook VML support where needed
 */

import fs from 'fs';
import path from 'path';

// Email-safe color palette - Updated Brand Colors
export const EMAIL_COLORS = {
  primary: '#ff7033',
  primaryDark: '#d6551e', 
  darkBlue: '#020a1c',
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
 */
export function createEmailWrapper(content: string, maxWidth: number = 600): string {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>Strive Tech</title>
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: ${EMAIL_COLORS.background}; font-family: ${EMAIL_FONTS.primary};">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${EMAIL_COLORS.background};">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="${maxWidth}" style="max-width: ${maxWidth}px; background-color: ${EMAIL_COLORS.white}; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          ${content}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Creates email header with custom STRIVE design
 */
export function createEmailHeader(): string {
  // Base64 encoded custom header image
  const headerBase64 = fs.readFileSync(path.join(process.cwd(), 'attached_assets/email-templates/Email Header&Footer/Email Header.png')).toString('base64');
  
  return `
  <tr>
    <td style="padding: 0; margin: 0; text-align: center;">
      <img src="data:image/png;base64,${headerBase64}" 
           alt="Strive Tech Header" 
           style="width: 100%; max-width: 600px; height: auto; display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" 
           border="0">
    </td>
  </tr>`;
}

/**
 * Creates email footer with custom STRIVE design
 */
export function createEmailFooter(): string {
  // Base64 encoded custom footer image
  const footerBase64 = fs.readFileSync(path.join(process.cwd(), 'attached_assets/email-templates/Email Header&Footer/Email-footer.png')).toString('base64');
  
  return `
  <tr>
    <td style="padding: 0; margin: 0; text-align: center;">
      <img src="data:image/png;base64,${footerBase64}" 
           alt="Strive Tech Footer" 
           style="width: 100%; max-width: 600px; height: auto; display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" 
           border="0">
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
    <td style="background-color: ${backgroundColor}; padding: 40px 40px 30px; text-align: center;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td align="center">
            <div style="background-color: ${EMAIL_COLORS.primary}; color: ${EMAIL_COLORS.white}; width: 60px; height: 60px; border-radius: 30px; font-size: 24px; line-height: 60px; margin: 0 auto 20px; text-align: center;">
              ${icon}
            </div>
            <h1 style="color: ${EMAIL_COLORS.dark}; font-size: 28px; font-weight: bold; margin: 0 0 15px 0; line-height: 34px;">
              ${title}
            </h1>
            <p style="color: ${EMAIL_COLORS.darkGray}; font-size: 16px; line-height: 24px; margin: 0; max-width: 480px; margin-left: auto; margin-right: auto;">
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
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 20px auto;">
    <tr>
      <td style="background-color: ${buttonColor}; border-radius: 6px; text-align: center;">
        <a href="${url}" style="display: inline-block; color: ${textColor}; font-family: ${EMAIL_FONTS.primary}; font-size: 16px; font-weight: bold; text-decoration: none; padding: 12px 30px; border-radius: 6px;">
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
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; border: 1px solid ${borderColor}; border-radius: 6px;">
    <tr>
      <td style="padding: 20px; background-color: ${EMAIL_COLORS.white}; border-radius: 6px;">
        <h3 style="color: ${EMAIL_COLORS.dark}; font-size: 16px; font-weight: bold; margin: 0 0 10px 0;">
          ${title}
        </h3>
        <div style="color: ${EMAIL_COLORS.darkGray}; font-size: 14px; line-height: 20px;">
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