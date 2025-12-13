// AI Insights Comparison Data
// Comparing agent workflows WITHOUT SAI AI vs WITH SAI AI
// Note: Time estimates are illustrative examples based on typical workflows

export interface WorkflowStep {
  step: string;
  timeMinutes: number;
}

export interface AIInsightScenario {
  id: string;
  scenarioName: string;
  description: string;

  // Without SAI AI
  withoutSAI: {
    title: string;
    steps: WorkflowStep[];
    totalTimeMinutes: number;
    totalTimeDisplay: string;
    painPoints: string[];
    outcome: string;
  };

  // With SAI AI
  withSAI: {
    title: string;
    steps: WorkflowStep[];
    totalTimeMinutes: number;
    totalTimeDisplay: string;
    benefits: string[];
    outcome: string;
    improvement: string; // e.g., "4x faster", "35% higher conversion"
  };

  // Key AI features powering this scenario
  aiFeatures: string[];
}

export const aiInsightScenarios: AIInsightScenario[] = [
  {
    id: 'lead-followup',
    scenarioName: 'Lead Follow-Up',
    description: 'How agents prioritize and follow up with leads daily',

    withoutSAI: {
      title: 'Without SAI AI Insights',
      steps: [
        { step: 'Review 50+ leads manually in CRM', timeMinutes: 45 },
        { step: 'Guess which leads are hot based on gut feel', timeMinutes: 15 },
        { step: 'Research each lead online for context', timeMinutes: 30 },
        { step: 'Write personalized follow-up messages', timeMinutes: 30 },
        { step: 'Schedule and send outreach', timeMinutes: 15 },
      ],
      totalTimeMinutes: 135,
      totalTimeDisplay: '2+ hours/day',
      painPoints: [
        'Significant time spent on leads that never convert (industry data shows low conversion rates)',
        'Miss hot leads buried in your database',
        'Generic follow-ups that get ignored',
        'No data to know optimal timing',
      ],
      outcome: 'Low conversion rates, missed opportunities',
    },

    withSAI: {
      title: 'With SAI AI Insights',
      steps: [
        { step: 'Review AI-scored leads (HOT/WARM/COLD)', timeMinutes: 10 },
        { step: 'AI shows optimal follow-up timing', timeMinutes: 5 },
        { step: 'AI drafts personalized messages', timeMinutes: 10 },
        { step: 'One-click send to prioritized leads', timeMinutes: 5 },
      ],
      totalTimeMinutes: 30,
      totalTimeDisplay: '30 min/day',
      benefits: [
        'AI scores all leads automatically',
        'Predictive timing tells you WHEN to reach out',
        'Personalized AI-drafted messages',
        'Focus only on leads ready to buy/sell',
      ],
      outcome: 'Focus on high-intent leads, close more deals',
      improvement: 'Higher conversion rates',
    },

    aiFeatures: ['AI Lead Scoring', 'SaiBot Assistant', 'Automated Follow-Ups'],
  },
  {
    id: 'property-valuation',
    scenarioName: 'Property Valuation (CMA)',
    description: 'Creating comparative market analysis for listings',

    withoutSAI: {
      title: 'Without SAI AI Insights',
      steps: [
        { step: 'Pull comps manually from MLS', timeMinutes: 30 },
        { step: 'Calculate adjustments in spreadsheet', timeMinutes: 45 },
        { step: 'Research neighborhood trends separately', timeMinutes: 30 },
        { step: 'Analyze days-on-market data', timeMinutes: 15 },
        { step: 'Format into client presentation', timeMinutes: 30 },
      ],
      totalTimeMinutes: 150,
      totalTimeDisplay: '2.5+ hours per CMA',
      painPoints: [
        'Pricing errors cost deals and credibility',
        'Clients question your analysis',
        'Missing key comp adjustments',
        'No prediction for days-on-market',
      ],
      outcome: 'Time-consuming, inconsistent valuations',
    },

    withSAI: {
      title: 'With SAI AI Insights',
      steps: [
        { step: 'Price Valuation Intelligence runs instantly', timeMinutes: 2 },
        { step: 'AI identifies optimal comps automatically', timeMinutes: 3 },
        { step: 'Market Velocity predicts days-on-market', timeMinutes: 2 },
        { step: 'Auto-generate client-ready report', timeMinutes: 8 },
      ],
      totalTimeMinutes: 15,
      totalTimeDisplay: '15 minutes per CMA',
      benefits: [
        'Institutional-grade property analysis',
        'AI selects best comparable sales',
        'Predict when property will sell',
        'Impress clients with data-driven insights',
      ],
      outcome: 'Accurate, fast, client-ready valuations',
      improvement: 'Data-driven accuracy',
    },

    aiFeatures: ['Price Valuation Intelligence', 'Market Velocity Intelligence', 'REID Analytics'],
  },
  {
    id: 'content-creation',
    scenarioName: 'Content Creation',
    description: 'Creating listings, social posts, and email campaigns',

    withoutSAI: {
      title: 'Without SAI AI Insights',
      steps: [
        { step: 'Write listing description from scratch', timeMinutes: 30 },
        { step: 'Create 5 social posts for the week', timeMinutes: 120 },
        { step: 'Draft email campaign to sphere', timeMinutes: 60 },
        { step: 'Edit and proofread everything', timeMinutes: 30 },
      ],
      totalTimeMinutes: 240,
      totalTimeDisplay: '4+ hours/week',
      painPoints: [
        "Writer's block delays listings",
        'Inconsistent brand voice',
        'Social posts feel generic',
        'Email campaigns underperform',
      ],
      outcome: 'Hours wasted, inconsistent quality',
    },

    withSAI: {
      title: 'With SAI AI Insights',
      steps: [
        { step: 'AI generates listing description', timeMinutes: 2 },
        { step: 'Content Studio creates week of posts', timeMinutes: 10 },
        { step: 'AI drafts personalized email campaign', timeMinutes: 5 },
        { step: 'Quick review and publish', timeMinutes: 13 },
      ],
      totalTimeMinutes: 30,
      totalTimeDisplay: '30 min/week',
      benefits: [
        'Listing descriptions in 30 seconds',
        'AI-optimized social content',
        'Personalized email campaigns',
        'Consistent, professional brand voice',
      ],
      outcome: 'High-quality content in minutes',
      improvement: 'Dramatically faster content creation',
    },

    aiFeatures: ['AI Content Engine', 'Content Studio', 'SaiBot Assistant'],
  },
];

// Summary stats for the comparison section
// Note: These are illustrative examples based on typical workflow improvements
export const comparisonStats = {
  avgTimeSaved: 'Significant time savings',
  conversionImprovement: 'Higher conversion focus',
  contentSpeedup: 'Faster content creation',
  valuationAccuracy: 'Data-driven accuracy',
};

// Helper function to calculate time savings
export const calculateTimeSavings = (scenario: AIInsightScenario): {
  minutesSaved: number;
  percentageSaved: number;
} => {
  const minutesSaved = scenario.withoutSAI.totalTimeMinutes - scenario.withSAI.totalTimeMinutes;
  const percentageSaved = Math.round((minutesSaved / scenario.withoutSAI.totalTimeMinutes) * 100);
  return { minutesSaved, percentageSaved };
};
