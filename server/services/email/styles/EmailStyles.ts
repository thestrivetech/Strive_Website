/**
 * Email CSS Framework Module
 * Advanced email styling system with responsive design, dark mode support,
 * and cross-client compatibility for professional email templates
 */

import { EmailThemeOptions } from '../types/index.js';

/**
 * MSO conditional styles for Outlook compatibility
 */
export const MSO_STYLES = `
<!--[if mso]>
<xml>
  <o:OfficeDocumentSettings>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->`;

/**
 * Premium color system with gradients and semantic colors
 */
/**
 * Base CSS reset and normalization styles
 */
export const RESET_STYLES = `
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
}`;

/**
 * Professional typography system
 */
export const TYPOGRAPHY_STYLES = `
/* Professional Typography System */
.font-primary {
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
}

.heading-xl { font-size: 32px !important; line-height: 38px !important; font-weight: 700 !important; }
.heading-lg { font-size: 24px !important; line-height: 30px !important; font-weight: 600 !important; }
.heading-md { font-size: 20px !important; line-height: 26px !important; font-weight: 600 !important; }
.body-lg { font-size: 18px !important; line-height: 28px !important; font-weight: 400 !important; }
.body-base { font-size: 16px !important; line-height: 24px !important; font-weight: 400 !important; }
.body-sm { font-size: 14px !important; line-height: 20px !important; font-weight: 400 !important; }
.caption { font-size: 12px !important; line-height: 16px !important; font-weight: 400 !important; }`;

/**
 * Shadow and effects
 */
export const SHADOW_STYLES = `
/* Advanced Shadow System */
.shadow-soft { box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important; }
.shadow-medium { box-shadow: 0 8px 25px rgba(0,0,0,0.08) !important; }
.shadow-large { box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important; }`;

/**
 * Animation styles
 */
export const ANIMATION_STYLES = `
/* Email-Safe Animations */
.animate-fade-in { animation: fadeInUp 0.6s ease-out !important; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`;

/**
 * Dashboard styles
 */
export const DASHBOARD_STYLES = `
/* Dashboard Components */
.dashboard-card { background: white !important; border-radius: 16px !important; border: 1px solid #e2e8f0 !important; box-shadow: 0 8px 25px rgba(0,0,0,0.08) !important; overflow: hidden !important; }
.dashboard-header { padding: 20px !important; display: flex !important; align-items: center !important; }
.dashboard-content { padding: 25px !important; }
.metric-card { background: white !important; padding: 20px !important; border-radius: 12px !important; border: 1px solid #e2e8f0 !important; text-align: center !important; }`;

/**
 * Profile styles
 */
export const PROFILE_STYLES = `
/* Team Member Cards */
.team-card { background: white !important; border-radius: 12px !important; padding: 20px !important; text-align: center !important; border: 1px solid #e2e8f0 !important; }
.team-avatar { width: 60px !important; height: 60px !important; border-radius: 50% !important; margin: 0 auto 12px !important; overflow: hidden !important; }`;

export const COLOR_STYLES = `
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

.bg-gradient-blue {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
}

.bg-gradient-purple {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed) !important;
}

.bg-gradient-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
}

.bg-gradient-warning {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
}

.bg-gradient-error {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
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
`;

/**
 * Advanced button system with variants and states
 */
export const BUTTON_STYLES = `
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

.btn-warning {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.25) !important;
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.25) !important;
}`;

/**
 * Card and container system with elevation and variants
 */
export const CARD_STYLES = `
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

.card-error {
  background: linear-gradient(135deg, #fef2f2 0%, #fef2f2 100%) !important;
  border: 1px solid #fecaca !important;
}`;

/**
 * Spacing and layout utilities
 */
export const SPACING_STYLES = `
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
.mx-auto { margin-left: auto !important; margin-right: auto !important; }`;

/**
 * Interactive elements like progress bars, badges, and icons
 */
export const INTERACTIVE_STYLES = `
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

.badge-error {
  background: rgba(239, 68, 68, 0.1) !important;
  color: #dc2626 !important;
}`;

/**
 * Priority and status indicators
 */
export const PRIORITY_STYLES = `
/* Priority Styles */
.priority-urgent {
  border-left: 4px solid #ef4444 !important;
  background: linear-gradient(135deg, #fef2f2 0%, #fef2f2 100%) !important;
}

.priority-high {
  border-left: 4px solid #f59e0b !important;
  background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%) !important;
}

.priority-medium {
  border-left: 4px solid #3b82f6 !important;
  background: linear-gradient(135deg, #eff6ff 0%, #eff6ff 100%) !important;
}

.priority-low {
  border-left: 4px solid #10b981 !important;
  background: linear-gradient(135deg, #f0fdf4 0%, #f0fdf4 100%) !important;
}`;

/**
 * Team and avatar styles
 */
export const AVATAR_STYLES = `
/* Team Member Cards */
.team-avatar {
  width: 48px !important;
  height: 48px !important;
  border-radius: 50% !important;
  border: 3px solid #ffffff !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

.avatar-sm {
  width: 32px !important;
  height: 32px !important;
  border-radius: 50% !important;
  border: 2px solid #ffffff !important;
}

.avatar-lg {
  width: 64px !important;
  height: 64px !important;
  border-radius: 50% !important;
  border: 4px solid #ffffff !important;
}`;

/**
 * Dark mode support
 */
export const DARK_MODE_STYLES = `
/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .dark-bg { background-color: #1f2937 !important; }
  .dark-text { color: #f9fafb !important; }
  .dark-text-muted { color: #d1d5db !important; }
  .dark-border { border-color: #374151 !important; }
  .dark-card { background-color: #374151 !important; }
  
  .dark-btn-primary {
    background: linear-gradient(135deg, #ff8c5a 0%, #ff7033 100%) !important;
    color: #ffffff !important;
  }
  
  .dark-text-primary { color: #ff8c5a !important; }
}`;

/**
 * Mobile responsive styles
 */
export const MOBILE_STYLES = `
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
  
  .mobile-stack {
    display: block !important;
    width: 100% !important;
  }
  
  .mobile-stack td {
    display: block !important;
    width: 100% !important;
    padding: 8px 0 !important;
  }
}`;


/**
 * Outlook-specific styles for compatibility
 */
export const OUTLOOK_STYLES = `
/* Outlook Support */
<!--[if mso]>
.btn {
  border: none !important;
  font-family: Arial, sans-serif !important;
}

.card {
  border: 1px solid #e5e7eb !important;
}

.outlook-only {
  display: block !important;
}

.outlook-hide {
  display: none !important;
}
<![endif]-->

<!--[if !mso]><!-->
.outlook-only {
  display: none !important;
}
<!--<![endif]-->`;

/**
 * Social media and icon styles
 */
export const ICON_STYLES = `
/* Social Icons */
.social-icon {
  width: 24px !important;
  height: 24px !important;
  border-radius: 4px !important;
  margin: 0 4px !important;
}

.icon-sm {
  width: 16px !important;
  height: 16px !important;
}

.icon-lg {
  width: 32px !important;
  height: 32px !important;
}

.icon-xl {
  width: 48px !important;
  height: 48px !important;
}`;

/**
 * EmailStyles class for managing and generating email CSS
 */
export class EmailStyles {
  private theme: EmailThemeOptions;
  private customStyles: string;

  constructor(theme: EmailThemeOptions = {}, customStyles: string = '') {
    this.theme = {
      primaryColor: '#ff7033',
      secondaryColor: '#f97316',
      backgroundColor: '#f3f4f6',
      textColor: '#111827',
      accentColor: '#10b981',
      borderRadius: '8px',
      fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      ...theme,
    };
    this.customStyles = customStyles;
  }

  /**
   * Generate complete CSS framework with all styles
   */
  public generateCompleteCSS(): string {
    return `
    <style type="text/css">
      /* ========================================
         ADVANCED EMAIL CSS FRAMEWORK
         ======================================== */

      ${RESET_STYLES}
      ${TYPOGRAPHY_STYLES}
      ${SHADOW_STYLES}
      ${ANIMATION_STYLES}
      ${DASHBOARD_STYLES}
      ${PROFILE_STYLES}
      ${this.generateThemeStyles()}
      ${COLOR_STYLES}
      ${BUTTON_STYLES}
      ${CARD_STYLES}
      ${SPACING_STYLES}
      ${INTERACTIVE_STYLES}
      ${PRIORITY_STYLES}
      ${AVATAR_STYLES}
      ${ICON_STYLES}
      ${DARK_MODE_STYLES}
      ${MOBILE_STYLES}
      ${this.customStyles}
      ${OUTLOOK_STYLES}
    </style>`;
  }

  /**
   * Generate theme-specific CSS variables and overrides
   */
  private generateThemeStyles(): string {
    return `
    /* Theme-specific styles */
    :root {
      --primary-color: ${this.theme.primaryColor};
      --secondary-color: ${this.theme.secondaryColor};
      --background-color: ${this.theme.backgroundColor};
      --text-color: ${this.theme.textColor};
      --accent-color: ${this.theme.accentColor};
      --border-radius: ${this.theme.borderRadius};
      --font-family: ${this.theme.fontFamily};
    }
    
    .theme-primary { color: ${this.theme.primaryColor} !important; }
    .theme-secondary { color: ${this.theme.secondaryColor} !important; }
    .theme-accent { color: ${this.theme.accentColor} !important; }
    .theme-bg-primary { background-color: ${this.theme.primaryColor} !important; }
    .theme-bg-secondary { background-color: ${this.theme.secondaryColor} !important; }
    .theme-border-radius { border-radius: ${this.theme.borderRadius} !important; }
    `;
  }

  /**
   * Generate only essential CSS for minimal emails
   */
  public generateMinimalCSS(): string {
    return `
    <style type="text/css">
      ${RESET_STYLES}
      ${TYPOGRAPHY_STYLES}
      ${COLOR_STYLES}
      ${BUTTON_STYLES}
      ${MOBILE_STYLES}
    </style>`;
  }

  /**
   * Get inline styles for specific elements
   */
  public getInlineButtonStyle(variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary'): string {
    const baseStyle = 'display: inline-block; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; line-height: 20px; cursor: pointer; border: none;';
    
    const variants = {
      primary: 'background: linear-gradient(135deg, #ff7033 0%, #f97316 100%); color: #ffffff; box-shadow: 0 4px 6px -1px rgba(255, 112, 51, 0.25);',
      secondary: 'background: #ffffff; color: #ff7033; border: 2px solid #ff7033; padding: 12px 26px;',
      success: 'background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.25);',
      warning: 'background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #ffffff; box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.25);',
      danger: 'background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: #ffffff; box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.25);',
    };

    return `${baseStyle} ${variants[variant]}`;
  }

  /**
   * Get inline styles for cards
   */
  public getInlineCardStyle(variant: 'default' | 'premium' | 'success' | 'warning' | 'error' = 'default'): string {
    const baseStyle = 'border-radius: 12px; padding: 24px;';
    
    const variants = {
      default: 'background: #ffffff; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);',
      premium: 'background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #d1d5db; border-left: 4px solid #ff7033;',
      success: 'background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border: 1px solid #bbf7d0;',
      warning: 'background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%); border: 1px solid #fed7aa;',
      error: 'background: linear-gradient(135deg, #fef2f2 0%, #fef2f2 100%); border: 1px solid #fecaca;',
    };

    return `${baseStyle} ${variants[variant]}`;
  }

  /**
   * Update theme configuration
   */
  public updateTheme(newTheme: Partial<EmailThemeOptions>): void {
    this.theme = { ...this.theme, ...newTheme };
  }

  /**
   * Add custom CSS
   */
  public addCustomStyles(styles: string): void {
    this.customStyles += `\n${styles}`;
  }

  /**
   * Get current theme configuration
   */
  public getTheme(): EmailThemeOptions {
    return { ...this.theme };
  }

  /**
   * Get complete email wrapper start with MSO conditionals
   */
  public getEmailWrapperStart(): string {
    return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Strive Tech - AI Solutions That Transform Business</title>

  ${MSO_STYLES}

  ${this.generateCompleteCSS()}
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: ${this.theme.fontFamily};">
  <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all;">
    Professional AI solutions for modern businesses - Discover how Strive Tech can transform your operations
  </div>

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0; padding: 0; background-color: #f3f4f6;">
    <tr>
      <td style="padding: 20px 0; text-align: center;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 680px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); overflow: hidden;">`;
  }

  /**
   * Get complete email wrapper end
   */
  public getEmailWrapperEnd(): string {
    return `
        </table>
      </td>
    </tr>
  </table>

  <!-- Tracking Pixel -->
  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
       width="1" height="1" style="display: none !important;">
</body>
</html>`;
  }

  /**
   * Get branded header HTML
   */
  public getHeaderHTML(): string {
    return `
    <tr>
      <td class="bg-gradient-dark" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 30px; text-align: center; position: relative;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.05\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>') repeat; opacity: 0.3;"></div>
        <div style="position: relative; z-index: 2;">
          <img src="https://strivetech.ai/assets/STRIVE_Orange_Text_Transparent_1483x320px.webp"
               alt="Strive Tech"
               class="header-logo animate-fade-in"
               style="height: 60px; max-width: 240px; display: block; margin: 0 auto; filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));">
          <div style="height: 3px; background: linear-gradient(90deg, transparent, #ff7033, #f97316, transparent); margin: 30px auto 20px; max-width: 320px; border-radius: 2px; box-shadow: 0 2px 4px rgba(255, 112, 51, 0.3);"></div>
          <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0; font-weight: 500; letter-spacing: 0.5px;">
            AI Solutions That Transform Business
          </p>
        </div>
      </td>
    </tr>`;
  }
}

/**
 * Default email styles instance
 */
export const defaultEmailStyles = new EmailStyles();

/**
 * Utility functions for generating specific style combinations
 */
export const EmailStyleUtils = {
  /**
   * Generate responsive email wrapper
   */
  getEmailWrapperStart: (): string => {
    return defaultEmailStyles.getEmailWrapperStart();
  },

  /**
   * Generate email wrapper end
   */
  getEmailWrapperEnd: (): string => {
    return defaultEmailStyles.getEmailWrapperEnd();
  },

  /**
   * Generate header with logo and gradient background
   */
  getHeaderHTML: (): string => {
    return defaultEmailStyles.getHeaderHTML();
  },
};