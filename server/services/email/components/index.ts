/**
 * Email Component Library
 * Reusable UI components for email templates with consistent styling
 * and cross-client compatibility
 */

import type {
  ProgressBarOptions,
  DataCardOptions,
  MetricCardOptions,
  QuickActionButtonOptions,
  PriorityBadgeOptions,
  TeamMemberCardOptions,
TimelineStepOptions,
  FeatureHighlightOptions,
} from '../types/index.js';

/**
 * Create a progress bar component with customizable styling
 * @param options - Progress bar configuration options
 * @returns HTML string for the progress bar component
 */
export function createProgressBar(options: ProgressBarOptions): string {
  const { percentage, label, color = '#ff7033', showPercentage = true } = options;
  
  return `
    <div style="margin: 20px 0;">
      ${label ? `<p class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">${label}</p>` : ''}
      <div class="progress-bar" style="background: #e5e7eb; border-radius: 9999px; height: 8px; overflow: hidden;">
        <div class="progress-fill" style="background: linear-gradient(90deg, ${color} 0%, ${color}dd 100%); height: 100%; border-radius: 9999px; width: ${percentage}%;"></div>
      </div>
      ${showPercentage ? `<p class="caption text-gray-500" style="color: #6b7280; font-size: 12px; margin: 4px 0 0 0; text-align: right;">${percentage}% Complete</p>` : ''}
    </div>
  `;
}

/**
 * Create a data card component for displaying key-value pairs
 * @param options - Data card configuration options
 * @returns HTML string for the data card component
 */
export function createDataCard(options: DataCardOptions): string {
  const { title, data, priority, icon, description } = options;
  
  const priorityStyles = {
    urgent: 'border-left: 4px solid #ef4444; background: linear-gradient(135deg, #fef2f2 0%, #fef2f2 100%);',
    high: 'border-left: 4px solid #f59e0b; background: linear-gradient(135deg, #fef3e2 0%, #fef3e2 100%);',
    medium: 'border-left: 4px solid #3b82f6; background: linear-gradient(135deg, #eff6ff 0%, #eff6ff 100%);',
    low: 'border-left: 4px solid #10b981; background: linear-gradient(135deg, #f0fdf4 0%, #f0fdf4 100%);',
  };
  
  const priorityClass = priority ? `priority-${priority}` : '';
  const borderStyle = priority ? priorityStyles[priority] : 'border-left: 4px solid #ff7033;';
  
  // Handle different data formats
  const dataEntries = typeof data === 'object' && data !== null
    ? Object.entries(data)
    : typeof data === 'string'
    ? [['Value', data]]
    : [];
  
  return `
    <div class="card ${priorityClass}" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; border: 1px solid #d1d5db; ${borderStyle} padding: 24px; margin: 20px 0;">
      <div style="display: flex; align-items: center; margin-bottom: ${description ? '12px' : '20px'};">
        ${icon ? `<span style="margin-right: 12px; font-size: 20px;">${icon}</span>` : ''}
        <h3 class="heading-md text-gray-900" style="color: #111827; font-size: 18px; line-height: 24px; font-weight: 600; margin: 0;">
          ${title}
        </h3>
      </div>
      
      ${description ? `<p class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; margin: 0 0 20px 0; line-height: 1.5;">${description}</p>` : ''}
      
      <div style="space-y: 12px;">
        ${dataEntries.map(([key, value]) => `
          <div style="margin-bottom: 12px;">
            <span class="body-sm text-gray-600" style="color: #4b5563; font-weight: 600; display: inline-block; width: 140px; font-size: 14px;">${key}:</span>
            <span class="body-sm text-gray-900" style="color: #111827; font-weight: 500; font-size: 14px;">${value}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Create a metric card component for displaying statistics
 * @param options - Metric card configuration options
 * @returns HTML string for the metric card component
 */
export function createMetricCard(options: MetricCardOptions): string {
  const { label, value, change, icon, color = '#ff7033' } = options;
  
  const trendConfigs = {
    increase: { color: '#10b981', icon: '📈', prefix: '+' },
    decrease: { color: '#ef4444', icon: '📉', prefix: '-' },
  };
  
  const trendConfig = change ? trendConfigs[change.type] : null;
  
  return `
    <div class="card" style="background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; padding: 20px; text-align: center; margin: 12px; min-width: 120px;">
      ${icon ? `<div style="font-size: 24px; margin-bottom: 8px;">${icon}</div>` : ''}
      <h3 class="heading-lg text-primary" style="color: ${color}; font-size: 24px; line-height: 30px; font-weight: 600; margin: 0 0 8px 0;">
        ${value}
      </h3>
      <p class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">
        ${label}
      </p>
      ${trendConfig && change ? `
        <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
          <span style="color: ${trendConfig.color}; font-size: 12px;">${trendConfig.icon}</span>
          <span style="color: ${trendConfig.color}; font-size: 12px; font-weight: 600;">
            ${trendConfig.prefix}${change.value}${change.period ? ` ${change.period}` : ''}
          </span>
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * Create a quick action button component
 * @param options - Quick action button configuration options
 * @returns HTML string for the quick action button component
 */
export function createQuickActionButton(options: QuickActionButtonOptions): string {
  const { text, url, variant = 'primary', icon } = options;
  
  const buttonClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    warning: 'btn-warning',
    danger: 'btn-danger',
  };
  
  const buttonStyles = {
    primary: 'background: linear-gradient(135deg, #ff7033 0%, #f97316 100%); color: #ffffff; box-shadow: 0 4px 6px -1px rgba(255, 112, 51, 0.25);',
    secondary: 'background: #ffffff; color: #ff7033; border: 2px solid #ff7033;',
    success: 'background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.25);',
    warning: 'background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #ffffff; box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.25);',
    danger: 'background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: #ffffff; box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.25);',
  };
  
  return `
    <a href="${url}" class="btn ${buttonClasses[variant]}" style="display: inline-block; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; line-height: 20px; ${buttonStyles[variant]} margin: 8px;">
      ${icon ? `<span style="margin-right: 8px;">${icon}</span>` : ''}${text}
    </a>
  `;
}

/**
 * Create a priority badge component
 * @param options - Priority badge configuration options
 * @returns HTML string for the priority badge component
 */
export function createPriorityBadge(options: PriorityBadgeOptions): string {
  const { priority, customText } = options;
  
  const configs = {
    urgent: { bg: '#fef2f2', color: '#dc2626', icon: '🚨', text: 'Urgent' },
    high: { bg: '#fef2f2', color: '#dc2626', icon: '🔥', text: 'High Priority' },
    medium: { bg: '#fef3e2', color: '#d97706', icon: '⚡', text: 'Medium Priority' },
    low: { bg: '#f0fdf4', color: '#059669', icon: '📋', text: 'Low Priority' },
  };
  
  const config = configs[priority];
  const displayText = customText || config.text;
  
  return `
    <span class="badge" style="background: ${config.bg}; color: ${config.color}; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 4px;">
      <span>${config.icon}</span>
      ${displayText}
    </span>
  `;
}

/**
 * Create a team member card component
 * @param options - Team member card configuration options
 * @returns HTML string for the team member card component
 */
export function createTeamMemberCard(options: TeamMemberCardOptions): string {
  const { name, role, email, phone, avatar, department } = options;
  
  const avatarUrl = avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ff7033&color=ffffff&size=48`;
  
  return `
    <div style="display: flex; align-items: center; padding: 16px; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; margin: 12px 0;">
      <div style="margin-right: 16px;">
        <img src="${avatarUrl}" 
             alt="${name}" 
             class="team-avatar" 
             style="width: 48px; height: 48px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      </div>
      <div style="flex: 1;">
        <h4 class="heading-md text-gray-900" style="color: #111827; font-size: 16px; line-height: 20px; font-weight: 600; margin: 0 0 4px 0;">${name}</h4>
        <p class="body-sm text-gray-600" style="color: #4b5563; font-size: 14px; margin: 0 0 6px 0;">
          ${role}${department ? ` • ${department}` : ''}
        </p>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          ${email ? `
            <a href="mailto:${email}" style="color: #ff7033; text-decoration: none; font-size: 13px; font-weight: 500;">
              📧 ${email}
            </a>
          ` : ''}
          ${phone ? `
            <a href="tel:${phone}" style="color: #ff7033; text-decoration: none; font-size: 13px; font-weight: 500;">
              📞 ${phone}
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

/**
 * Create a service type indicator component
 * @param options - Service type indicator configuration options
 * @returns HTML string for the service type indicator component
 */
/**
 * Create journey timeline component/**
 * Create journey timeline component for multi-step processes
 */
/**
 * Create intelligence dashboard component for advanced analytics
 */
export function createIntelligenceDashboard(options: {
  title: string;
  icon: string;
  metrics: Array<{ label: string; value: string; trend?: 'up' | 'down' | 'stable' }>;
  insights: string[];
  iconColor?: string;
}): string {
  const { title, icon, metrics, insights, iconColor = '#8b5cf6' } = options;

  const metricsHTML = metrics.map(metric => `
    <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center; min-width: 120px;">
      <div style="font-size: 24px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0;">${metric.value}</div>
      <div style="font-size: 12px; color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">${metric.label}</div>
      ${metric.trend ? `<div style="font-size: 10px; color: ${metric.trend === 'up' ? '#10b981' : metric.trend === 'down' ? '#ef4444' : '#64748b'}; margin-top: 4px;">${metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}</div>` : ''}
    </div>
  `).join('');

  const insightsHTML = insights.map(insight => `
    <li style="color: #64748b; font-size: 14px; line-height: 1.5; margin-bottom: 8px;">${insight}</li>
  `).join('');

  return `
    <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 8px 25px rgba(0,0,0,0.08); overflow: hidden; margin: 20px 0;">
      <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 20px; display: flex; align-items: center;">
        <div style="background: ${iconColor}; color: white; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px; box-shadow: 0 10px 30px ${iconColor}30;">
          <span style="font-size: 20px;">${icon}</span>
        </div>
        <div>
          <h3 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700; color: #0f172a;">${title}</h3>
          <p style="margin: 0; color: #64748b; font-size: 14px;">Smart insights and analytics</p>
        </div>
      </div>
      <div style="padding: 25px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; margin-bottom: 20px;">
          ${metricsHTML}
        </div>
        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 8px; padding: 16px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">Key Insights</h4>
          <ul style="margin: 0; padding: 0; list-style: none;">
            ${insightsHTML}
          </ul>
        </div>
      </div>
    </div>
  `;
}

/**
 * Create command center component for quick actions
 */
export function createCommandCenter(options: {
  title: string;
  subtitle?: string;
  actions: Array<{ label: string; url: string; icon: string; variant?: 'primary' | 'secondary' | 'success' | 'warning' }>;
}): string {
  const { title, subtitle, actions } = options;

  const actionsHTML = actions.map(action => {
    const variant = action.variant || 'primary';
    const variantStyles = {
      primary: 'background: linear-gradient(135deg, #ff7033 0%, #f97316 100%); color: #ffffff;',
      secondary: 'background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); color: #ffffff;',
      success: 'background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff;',
      warning: 'background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #ffffff;',
    };

    return `
      <a href="${action.url}" style="display: block; text-decoration: none; ${variantStyles[variant]} padding: 16px 20px; border-radius: 12px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-height: 60px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
        <div style="font-size: 20px; margin-bottom: 4px;">${action.icon}</div>
        <div style="font-size: 13px; font-weight: 600; line-height: 1.2;">${action.label}</div>
      </a>
    `;
  }).join('');

  return `
    <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 30px 40px; border-radius: 16px; margin: 20px 0;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h3 style="color: white; font-size: 18px; font-weight: 600; margin: 0 0 4px 0;">⚡ ${title}</h3>
        ${subtitle ? `<p style="color: rgba(255, 255, 255, 0.8); font-size: 14px; margin: 0;">${subtitle}</p>` : ''}
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px;">
        ${actionsHTML}
      </div>
    </div>
  `;
}

export function createJourneyTimeline(options: {
  title: string;
  steps: Array<{
    icon: string;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'upcoming';
    duration?: string;
  }>;
}): string {
  const { title, steps } = options;

  const stepsHTML = steps.map((step, index) => {
    const statusStyles = {
      completed: 'background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white;',
      current: 'background: linear-gradient(135deg, #ff7033 0%, #f97316 100%); color: white; box-shadow: 0 0 20px rgba(255, 112, 51, 0.4);',
      upcoming: 'background: #e2e8f0; color: #64748b;',
    };

    const isLast = index === steps.length - 1;

    return `
      <div class="timeline-step" style="display: flex; align-items: flex-start; margin-bottom: ${isLast ? '0' : '24px'}; position: relative;">
        ${!isLast ? '<div style="position: absolute; left: 19px; top: 40px; width: 2px; height: 24px; background: linear-gradient(to bottom, #e2e8f0, #f1f5f9);"></div>' : ''}
        <div class="timeline-icon" style="${statusStyles[step.status]} width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0; font-size: 16px; z-index: 2; position: relative;">
          ${step.icon}
        </div>
        <div class="timeline-content" style="flex: 1; padding-top: 4px;">
          <h4 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600; color: #0f172a;">${step.title}</h4>
          <p style="margin: 0 0 4px 0; color: #64748b; font-size: 14px; line-height: 1.5;">${step.description}</p>
          ${step.duration ? `<span style="color: #0284c7; font-size: 12px; font-weight: 500;">${step.duration}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 24px; margin: 20px 0;">
      <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 700; color: #0f172a; text-align: center;">${title}</h3>
      <div>
        ${stepsHTML}
      </div>
    </div>
  `;
}

/**
 * Create metrics dashboard component
 */
export function createMetricsDashboard(options: {
  title: string;
  metrics: Array<{
    label: string;
    value: string;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    icon: string;
  }>;
}): string {
  const { title, metrics } = options;

  const metricsHTML = metrics.map(metric => {
    const changeColor = {
      positive: '#10b981',
      negative: '#ef4444',
      neutral: '#64748b',
    };

    const changeIcon = {
      positive: '↗',
      negative: '↘',
      neutral: '→',
    };

    return `
      <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 20px;">
          ${metric.icon}
        </div>
        <div style="font-size: 28px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0;">${metric.value}</div>
        <div style="font-size: 14px; color: #64748b; font-weight: 500; margin: 0 0 8px 0;">${metric.label}</div>
        ${metric.change && metric.changeType ? `
          <div style="font-size: 12px; color: ${changeColor[metric.changeType]}; font-weight: 600;">
            ${changeIcon[metric.changeType]} ${metric.change}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  return `
    <div style="margin: 20px 0;">
      <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #0f172a; text-align: center;">${title}</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px;">
        ${metricsHTML}
      </div>
    </div>
  `;
}

/**
 * Create priority score card component
 */
export function createPriorityScoreCard(options: {
  score: number;
  maxScore: number;
  label: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  factors: string[];
}): string {
  const { score, maxScore, label, priority, factors } = options;

  const priorityStyles = {
    urgent: { bg: '#fef2f2', border: '#fca5a5', text: '#dc2626', badge: '#dc2626' },
    high: { bg: '#fef3e2', border: '#fed7aa', text: '#ea580c', badge: '#ea580c' },
    medium: { bg: '#eff6ff', border: '#bfdbfe', text: '#2563eb', badge: '#2563eb' },
    low: { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a', badge: '#16a34a' },
  };

  const styles = priorityStyles[priority];
  const percentage = Math.round((score / maxScore) * 100);

  const factorsHTML = factors.map(factor => `
    <li style="color: #64748b; font-size: 12px; margin-bottom: 4px;">${factor}</li>
  `).join('');

  return `
    <div style="background: ${styles.bg}; border: 2px solid ${styles.border}; border-radius: 16px; padding: 20px; margin: 20px 0;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <div>
          <h4 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 700; color: ${styles.text};">${label}</h4>
          <span style="background: ${styles.badge}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${priority} Priority</span>
        </div>
        <div style="text-align: right;">
          <div style="background: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <span style="color: #0f172a; font-size: 24px; font-weight: 800;">${score}</span>
            <span style="color: #64748b; font-size: 12px; font-weight: 600; display: block;">/${maxScore} POINTS</span>
          </div>
        </div>
      </div>
      <div style="background: white; border-radius: 8px; padding: 12px;">
        <div style="font-size: 12px; font-weight: 600; color: #64748b; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Scoring Factors</div>
        <ul style="margin: 0; padding: 0; list-style: none;">
          ${factorsHTML}
        </ul>
      </div>
      <div style="margin-top: 12px;">
        <div style="background: #e2e8f0; border-radius: 10px; overflow: hidden; height: 8px;">
          <div style="background: ${styles.badge}; height: 100%; border-radius: 10px; width: ${percentage}%; transition: width 0.3s ease;"></div>
        </div>
        <div style="text-align: right; margin-top: 4px;">
          <span style="color: ${styles.text}; font-size: 12px; font-weight: 600;">${percentage}% Priority Score</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * All available email components
 */
/**
 * Create a timeline step component
 */
export function createTimelineStep(options: TimelineStepOptions): string {
  const { step, title, description, isCompleted = false, estimatedTime, date } = options;
  
  const status = isCompleted ? 'completed' : 'pending';
  const statusConfigs = {
    completed: { bg: '#10b981', icon: '✅', color: '#ffffff' },
    active: { bg: '#ff7033', icon: '⏳', color: '#ffffff' },
    pending: { bg: '#e5e7eb', icon: '⏸️', color: '#6b7280' },
  };
  
  const config = statusConfigs[status];
  
  return `
    <div style="display: flex; align-items: flex-start; margin: 20px 0; position: relative;">
      <div style="background: ${config.bg}; color: ${config.color}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; margin-right: 16px; flex-shrink: 0;">
        ${status === 'completed' ? config.icon : step}
      </div>
      <div style="flex: 1; padding-top: 2px;">
        <h4 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 6px 0;">${title}</h4>
        <p style="color: #4b5563; font-size: 14px; margin: 0; line-height: 1.5;">${description}</p>
        ${estimatedTime ? `<span style="color: #6b7280; font-size: 12px;">(${estimatedTime})</span>` : ''}
      </div>
    </div>
  `;
}

/**
 * Create a feature highlight component
 */
export function createFeatureHighlight(options: FeatureHighlightOptions): string {
  const { title, description, icon, benefits, link } = options;
  
  return `
    <div style="display: flex; align-items: flex-start; margin: 20px 0;">
      <div style="background: #ff7033; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; margin-right: 16px;">
        ${icon || '✨'}
      </div>
      <div style="flex: 1;">
        <h4 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">${title}</h4>
        <p style="color: #4b5563; font-size: 14px; margin: 0 0 12px 0;">${description}</p>
        ${benefits && benefits.length > 0 ? `
          <ul style="margin: 12px 0; padding-left: 16px; color: #4b5563; font-size: 14px;">
            ${benefits.map(benefit => `<li style="margin-bottom: 4px;">${benefit}</li>`).join('')}
          </ul>
        ` : ''}
        ${link ? `<a href="${link.url}" style="color: #ff7033; text-decoration: none; font-weight: 600;">${link.text} →</a>` : ''}
      </div>
    </div>
  `;
}

/**
 * Create a content wrapper for email layout
 */
export function wrapEmailContent(content: string, headerContent?: string, footerContent?: string): string {
  return `
    ${headerContent || ''}
    <tr><td style="padding: 40px 30px;">${content}</td></tr>
    ${footerContent || ''}
  `;
}

/**
 * Create a divider component
 */
export function createDivider(style: 'solid' | 'dashed' | 'gradient' = 'solid', margin: string = '20px 0'): string {
  const styles = {
    solid: 'border-top: 1px solid #e5e7eb;',
    dashed: 'border-top: 1px dashed #d1d5db;',
    gradient: 'height: 2px; background: linear-gradient(90deg, transparent, #ff7033, #f97316, transparent); border: none;',
  };
  
  return `<div style="margin: ${margin}; ${styles[style]}"></div>`;
}

/**
 * Create a spacer component
 */
export function createSpacer(height: number = 20): string {
  return `<div style="height: ${height}px; line-height: ${height}px; font-size: 0;">&nbsp;</div>`;
}

/**
 * Create a two-column layout
 */
export function createTwoColumnLayout(leftContent: string, rightContent: string, leftWidth: number = 50): string {
  const rightWidth = 100 - leftWidth;
  
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
      <tr>
        <td style="width: ${leftWidth}%; vertical-align: top; padding-right: 10px;">${leftContent}</td>
        <td style="width: ${rightWidth}%; vertical-align: top; padding-left: 10px;">${rightContent}</td>
      </tr>
    </table>
  `;
}

/**
 * All available email components
 */
export const EmailComponents = {
  createProgressBar,
  createDataCard,
  createMetricCard,
  createQuickActionButton,
  createPriorityBadge,
  createTeamMemberCard,
createTimelineStep,
  createFeatureHighlight,
  wrapEmailContent,
  createDivider,
  createSpacer,
  createTwoColumnLayout,
  // New sophisticated components
  createIntelligenceDashboard,
  createCommandCenter,
  createJourneyTimeline,
  createMetricsDashboard,
  createPriorityScoreCard,
};

// Re-export for convenience
export default EmailComponents;