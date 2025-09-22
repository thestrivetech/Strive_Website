/**
 * Shared template helper functions for email templates
 * Extracts common functionality to reduce code duplication
 */

import type { ServiceRequestData, MeetingRequestData } from '../types/index.js';

/**
 * Priority levels with consistent thresholds across templates
 */
export type PriorityLevel = 'urgent' | 'high' | 'medium' | 'low';

/**
 * Service complexity analysis result
 */
export interface ServiceComplexity {
  level: 'basic' | 'intermediate' | 'advanced' | 'enterprise';
  score: number;
  factors: string[];
  estimatedHours: string;
}

/**
 * Team assignment recommendation
 */
export interface TeamAssignment {
  primaryTeam: string;
  specialists: string[];
  reason: string;
  availability: 'immediate' | 'within-24h' | 'within-week';
}

/**
 * Calculate priority score for service requests using original algorithm
 * CRITICAL: Must match original email.ts.old scoring exactly
 */
export function calculateServiceRequestPriority(data: ServiceRequestData): {
  score: number;
  level: PriorityLevel;
  factors: string[];
  urgencyIndicators: string[];
} {
  let score = 0;
  const factors: string[] = [];
  const urgencyIndicators: string[] = [];

  // Company size scoring (ORIGINAL ALGORITHM - MUST MATCH)
  if (data.companySize) {
    if (data.companySize.includes('1000+') || data.companySize.includes('Enterprise')) {
      score += 30; // FIXED: Original was 30, not 25
      factors.push('Enterprise scale (1000+ employees)');
      urgencyIndicators.push('🏢 Major enterprise client');
    } else if (data.companySize.includes('500-999') || data.companySize.includes('Large')) {
      score += 20;
      factors.push('Large company (500-999 employees)');
    } else if (data.companySize.includes('100-499') || data.companySize.includes('Medium')) {
      score += 15;
      factors.push('Medium business (100-499 employees)');
    } else {
      score += 5;
      factors.push('Small business opportunity');
    }
  }

  // Timeline urgency scoring
  if (data.projectTimeline === 'ASAP') {
    score += 25;
    factors.push('Immediate timeline requirement');
    urgencyIndicators.push('⏰ ASAP timeline requested');
  } else if (data.projectTimeline === '1-3 months') {
    score += 15;
    factors.push('Near-term project (1-3 months)');
  } else if (data.projectTimeline === '3-6 months') {
    score += 10;
    factors.push('Mid-term project (3-6 months)');
  }

  // Service complexity scoring
  const requestTypes = data.requestTypes ? data.requestTypes.split(',') : [];
  if (requestTypes.length > 1) {
    score += 10;
    factors.push(`Multi-service request (${requestTypes.length} services)`);
  }

  // Budget range impact
  if (data.budgetRange) {
    if (data.budgetRange.includes('250k') || data.budgetRange.includes('500k')) {
      score += 25;
      factors.push('High-value budget range (250k+)');
      urgencyIndicators.push('💰 Premium budget tier');
    } else if (data.budgetRange.includes('100k')) {
      score += 20;
      factors.push('Substantial budget (100k+)');
    } else if (data.budgetRange.includes('50k')) {
      score += 10;
      factors.push('Standard budget range');
    }
  }

  // Industry-specific scoring
  if (data.industry) {
    const highValueIndustries = ['Healthcare', 'Finance', 'Technology', 'Manufacturing'];
    if (highValueIndustries.some(industry => data.industry?.includes(industry))) {
      score += 5;
      factors.push('High-value industry vertical');
    }
  }

  // Determine priority level (ORIGINAL THRESHOLDS)
  let level: PriorityLevel;
  if (score >= 80) {
    level = 'urgent';
    urgencyIndicators.push('🚨 Urgent priority level');
  } else if (score >= 60) { // FIXED: Original was 60, not 80
    level = 'high';
  } else if (score >= 40) {
    level = 'medium';
  } else {
    level = 'low';
  }

  return { score, level, factors, urgencyIndicators };
}

/**
 * Calculate meeting request priority based on urgency and context
 */
export function calculateMeetingRequestPriority(data: MeetingRequestData): {
  score: number;
  level: PriorityLevel;
  factors: string[];
  urgencyIndicators: string[];
} {
  let score = 0;
  const factors: string[] = [];
  const urgencyIndicators: string[] = [];

  // Meeting type importance
  if (data.meetingType) {
    if (data.meetingType.includes('Enterprise') || data.meetingType.includes('Strategic')) {
      score += 25;
      factors.push('Strategic/Enterprise meeting');
      urgencyIndicators.push('🎯 Strategic importance');
    } else if (data.meetingType.includes('Technical') || data.meetingType.includes('Demo')) {
      score += 15;
      factors.push('Technical demonstration');
    } else if (data.meetingType.includes('Consultation')) {
      score += 10;
      factors.push('Consultation meeting');
    }
  }

  // Timeline urgency
  if (data.preferredDate) {
    const preferredDate = new Date(data.preferredDate);
    const daysFromNow = Math.ceil((preferredDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    
    if (daysFromNow <= 1) {
      score += 30;
      factors.push('Same-day meeting request');
      urgencyIndicators.push('⚡ Same-day request');
    } else if (daysFromNow <= 3) {
      score += 20;
      factors.push('Within 3 days');
      urgencyIndicators.push('🕐 Short notice (3 days)');
    } else if (daysFromNow <= 7) {
      score += 10;
      factors.push('Within one week');
    }
  }

  // Message urgency indicators
  if (data.message) {
    const urgentKeywords = ['urgent', 'asap', 'immediate', 'critical', 'emergency'];
    const hasUrgentKeywords = urgentKeywords.some(keyword => 
      data.message!.toLowerCase().includes(keyword)
    );
    
    if (hasUrgentKeywords) {
      score += 15;
      factors.push('Urgent language in message');
      urgencyIndicators.push('📢 Urgent keywords detected');
    }
  }

  // Company context (if available)
  if (data.company) {
    // Boost for known high-value clients or enterprises
    const enterpriseIndicators = ['Corp', 'Corporation', 'Inc', 'LLC', 'Ltd', 'Group'];
    if (enterpriseIndicators.some(indicator => data.company!.includes(indicator))) {
      score += 5;
      factors.push('Corporate entity');
    }
  }

  // Determine priority level
  const level: PriorityLevel = score >= 50 ? 'high' : score >= 30 ? 'medium' : 'low';

  return { score, level, factors, urgencyIndicators };
}

/**
 * Calculate service complexity and effort estimation
 */
export function calculateServiceComplexity(requestTypes: string[]): ServiceComplexity {
  const complexityScores: { [key: string]: number } = {
    'demo': 1,
    'showcase': 2,
    'consultation': 2,
    'assessment': 3,
    'implementation': 5,
    'training': 3,
    'ai-automation': 4,
    'data-analytics': 4,
    'custom-development': 5,
    'integration': 4,
    'optimization': 3,
    'support': 2,
  };

  const totalScore = requestTypes.reduce((sum, type) => 
    sum + (complexityScores[type.toLowerCase()] || 2), 0
  );

  const factors: string[] = [];
  
  if (requestTypes.length > 3) {
    factors.push('Multi-service integration required');
  }

  if (requestTypes.some(type => ['implementation', 'custom-development'].includes(type.toLowerCase()))) {
    factors.push('Custom development components');
  }

  if (requestTypes.some(type => ['ai-automation', 'data-analytics'].includes(type.toLowerCase()))) {
    factors.push('Advanced AI/ML capabilities');
  }

  let level: ServiceComplexity['level'];
  let estimatedHours: string;

  if (totalScore >= 15) {
    level = 'enterprise';
    estimatedHours = '200-500 hours';
    factors.push('Enterprise-scale implementation');
  } else if (totalScore >= 10) {
    level = 'advanced';
    estimatedHours = '80-200 hours';
    factors.push('Advanced technical requirements');
  } else if (totalScore >= 6) {
    level = 'intermediate';
    estimatedHours = '40-80 hours';
    factors.push('Moderate complexity solution');
  } else {
    level = 'basic';
    estimatedHours = '20-40 hours';
    factors.push('Straightforward implementation');
  }

  return { level, score: totalScore, factors, estimatedHours };
}

/**
 * Determine optimal team assignment based on service requirements
 */
export function determineServiceTeam(requestTypes: string[], complexity: ServiceComplexity): TeamAssignment {
  const teamMapping: { [key: string]: string } = {
    'demo': 'Solutions Architecture',
    'showcase': 'Solutions Architecture',
    'consultation': 'Strategy Team',
    'assessment': 'Technical Assessment',
    'implementation': 'Development Team',
    'training': 'Customer Success',
    'ai-automation': 'AI/ML Specialists',
    'data-analytics': 'Data Science Team',
    'custom-development': 'Engineering Team',
    'integration': 'Platform Integration',
    'optimization': 'Performance Team',
    'support': 'Technical Support',
  };

  // Determine primary team based on most complex service
  const primaryService = requestTypes.find(type => 
    ['implementation', 'custom-development', 'ai-automation'].includes(type.toLowerCase())
  ) || requestTypes[0];

  const primaryTeam = teamMapping[primaryService.toLowerCase()] || 'Solutions Team';

  // Determine specialists needed
  const specialists: string[] = [];
  
  if (requestTypes.some(type => ['ai-automation', 'data-analytics'].includes(type.toLowerCase()))) {
    specialists.push('AI/ML Engineer');
  }
  
  if (requestTypes.some(type => ['custom-development', 'integration'].includes(type.toLowerCase()))) {
    specialists.push('Senior Developer');
  }
  
  if (complexity.level === 'enterprise') {
    specialists.push('Solutions Architect', 'Project Manager');
  }

  // Determine availability
  let availability: TeamAssignment['availability'];
  if (complexity.level === 'enterprise' || requestTypes.length > 3) {
    availability = 'within-week';
  } else if (complexity.level === 'advanced') {
    availability = 'within-24h';
  } else {
    availability = 'immediate';
  }

  const reason = `Primary team assigned based on ${primaryService} requirements. ${
    specialists.length > 0 ? `Specialist support: ${specialists.join(', ')}.` : ''
  } Complexity level: ${complexity.level}.`;

  return { primaryTeam, specialists, reason, availability };
}

/**
 * Calculate revenue potential based on company size and service complexity
 */
export function calculateRevenuePotential(data: ServiceRequestData): {
  range: string;
  confidence: 'high' | 'medium' | 'low';
  factors: string[];
} {
  let minRevenue = 10000;
  let maxRevenue = 40000;
  const factors: string[] = [];

  // Company size multiplier
  if (data.companySize) {
    if (data.companySize.includes('1000+')) {
      minRevenue = 75000;
      maxRevenue = 200000;
      factors.push('Enterprise scale premium');
    } else if (data.companySize.includes('500-999')) {
      minRevenue = 50000;
      maxRevenue = 125000;
      factors.push('Large company potential');
    } else if (data.companySize.includes('100-499')) {
      minRevenue = 25000;
      maxRevenue = 75000;
      factors.push('Medium business scope');
    }
  }

  // Service complexity multiplier
  const requestTypes = data.requestTypes ? data.requestTypes.split(',') : [];
  if (requestTypes.some(type => ['implementation', 'custom-development'].includes(type.toLowerCase()))) {
    minRevenue *= 1.5;
    maxRevenue *= 1.8;
    factors.push('Custom development premium');
  }

  if (requestTypes.length > 2) {
    minRevenue *= 1.2;
    maxRevenue *= 1.3;
    factors.push('Multi-service package');
  }

  // Budget range validation
  if (data.budgetRange) {
    if (data.budgetRange.includes('250k')) {
      factors.push('Budget range validates high estimate');
    } else if (data.budgetRange.includes('100k')) {
      factors.push('Budget range supports estimate');
    }
  }

  const confidence: 'high' | 'medium' | 'low' = 
    data.companySize && data.budgetRange ? 'high' :
    data.companySize || data.budgetRange ? 'medium' : 'low';

  const range = `$${(minRevenue / 1000).toFixed(0)}K - $${(maxRevenue / 1000).toFixed(0)}K`;

  return { range, confidence, factors };
}

/**
 * Parse and enhance request types with full service names
 */
export function parseRequestTypes(requestTypes: string): Array<{ 
  key: string; 
  name: string; 
  category: string;
  icon: string;
}> {
  const serviceMapping: { [key: string]: { name: string; category: string; icon: string } } = {
    'demo': { name: 'Solution Showcase', category: 'Pre-Sales', icon: '🏆' },
    'showcase': { name: 'Solution Showcase', category: 'Pre-Sales', icon: '🏆' },
    'assessment': { name: 'AI Assessment Meeting', category: 'Consulting', icon: '🔍' },
    'consultation': { name: 'Strategic Consultation', category: 'Consulting', icon: '💡' },
    'implementation': { name: 'Solution Implementation', category: 'Development', icon: '⚙️' },
    'training': { name: 'Team Training Program', category: 'Education', icon: '📚' },
    'ai-automation': { name: 'AI Automation Suite', category: 'AI/ML', icon: '🤖' },
    'data-analytics': { name: 'Data Analytics Platform', category: 'Analytics', icon: '📊' },
    'custom-development': { name: 'Custom Development', category: 'Development', icon: '💻' },
    'integration': { name: 'System Integration', category: 'Technical', icon: '🔗' },
    'optimization': { name: 'Performance Optimization', category: 'Technical', icon: '⚡' },
    'support': { name: 'Technical Support', category: 'Support', icon: '🛠️' },
  };

  return requestTypes.split(',').map(type => {
    const key = type.trim().toLowerCase();
    const service = serviceMapping[key] || { 
      name: type.trim(), 
      category: 'General', 
      icon: '🎯' 
    };
    
    return { key, ...service };
  });
}

/**
 * Generate response deadline based on priority level
 */
export function getResponseDeadline(priorityLevel: PriorityLevel): {
  deadline: Date;
  timeframe: string;
  urgency: string;
} {
  const now = new Date();
  let hours: number;
  let timeframe: string;
  let urgency: string;

  switch (priorityLevel) {
    case 'urgent':
      hours = 2;
      timeframe = '2 hours';
      urgency = 'IMMEDIATE RESPONSE REQUIRED';
      break;
    case 'high':
      hours = 4;
      timeframe = '4 hours';
      urgency = 'Same-day response required';
      break;
    case 'medium':
      hours = 24;
      timeframe = '24 hours';
      urgency = 'Next business day response';
      break;
    case 'low':
      hours = 48;
      timeframe = '48 hours';
      urgency = 'Standard response timeframe';
      break;
  }

  const deadline = new Date(now.getTime() + hours * 60 * 60 * 1000);
  
  return { deadline, timeframe, urgency };
}

/**
 * Shared template helper utilities
 */
export const TemplateHelpers = {
  calculateServiceRequestPriority,
  calculateMeetingRequestPriority,
  calculateServiceComplexity,
  determineServiceTeam,
  calculateRevenuePotential,
  parseRequestTypes,
  getResponseDeadline,
};

export default TemplateHelpers;