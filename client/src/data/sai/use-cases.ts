// SAI Platform Use Cases by Agent Type
// Illustrative scenarios showing how different agent types can use SAI
// Note: Results are potential outcomes based on platform capabilities

export interface UseCase {
  id: string;
  agentType: 'solo' | 'team' | 'investor' | 'broker';
  title: string;
  persona: {
    name: string;
    role: string;
    location: string;
    teamSize?: string;
  };
  challenges: string[];
  saiSolution: string[];
  results: {
    metric: string;
    value: string;
  }[];
  modules: string[]; // Which SAI modules they use most
  workflow?: string; // Optional: typical daily workflow
}

export const useCases: UseCase[] = [
  {
    id: 'solo-agent-growth',
    agentType: 'solo',
    title: 'Solo Agent Scaling Contact Management',
    persona: {
      name: 'Agent A',
      role: 'Solo Residential Agent',
      location: '',
    },
    challenges: [
      'Managing 500+ contacts across spreadsheets and sticky notes',
      'Forgetting to follow up with leads, missing deals',
      'Spending 10+ hours/week creating listing descriptions and social posts',
      'No system for tracking deals, using email and memory',
      'Juggling multiple software subscriptions for CRM, design, email marketing, and market data',
    ],
    saiSolution: [
      'Imported all contacts to SAI CRM with smart lead scoring (HOT/WARM/COLD)',
      'Set up automated follow-up sequences so no lead falls through cracks',
      'AI content generation creates listing descriptions in 30 seconds',
      'The Office module tracks all active deals with automated checklists',
      'Consolidated multiple tools into one platform',
    ],
    results: [
      { metric: 'Contacts Managed', value: 'Significant growth' },
      { metric: 'Time Saved on Content', value: 'Hours saved weekly' },
      { metric: 'Software Consolidation', value: 'One platform' },
      { metric: 'Deals Closed', value: 'Potential increase' },
    ],
    modules: ['CRM', 'The Office', 'Content Studio', 'REID'],
    workflow: '7am: Review SAI dashboard for hot leads → 9am: AI generates listing description → 11am: Update deals in The Office → 2pm: Schedule week of social posts → 4pm: Run REID comps for CMA',
  },
  {
    id: 'team-collaboration',
    agentType: 'team',
    title: 'Real Estate Team with Shared Pipeline',
    persona: {
      name: 'Agent B',
      role: 'Team Lead',
      location: '',
      teamSize: '8 agents',
    },
    challenges: [
      'Team using multiple different CRMs with no visibility into team pipeline',
      'Lead assignment is manual and chaotic ("Who has this lead?")',
      'No standardized processes, every agent does deals differently',
      'Paying per-user fees across multiple platforms for CRM and transaction management',
      'Transaction coordinator using separate system from agents',
    ],
    saiSolution: [
      'All agents on one unified SAI Platform',
      'Shared team pipeline where everyone sees all leads and deals',
      'Automated lead assignment rules (round-robin by territory)',
      'Standardized deal workflows. Onboard new agents in 1 day',
      'TC has full access to all deals with document management',
    ],
    results: [
      { metric: 'Team Pipeline Visibility', value: 'Full visibility' },
      { metric: 'New Agent Onboarding', value: 'Faster with templates' },
      { metric: 'Software Consolidation', value: 'One platform' },
      { metric: 'Deals Closed', value: 'Potential increase' },
    ],
    modules: ['CRM', 'The Office', 'Content Studio'],
    workflow: 'Team lead reviews SAI dashboard every morning → Assigns hot leads via automation → Agents update deals in real-time → TC manages all transactions in The Office → Weekly team performance review in SAI analytics',
  },
  {
    id: 'investor-agent-analysis',
    agentType: 'investor',
    title: 'Investor-Focused Agent Managing Rental Properties',
    persona: {
      name: 'Agent C',
      role: 'Investment Property Specialist',
      location: '',
    },
    challenges: [
      'Clients ask for ROI analysis, manually calculating cap rates in Excel',
      'Paying for expensive premium market data subscriptions and separate property comp services',
      'No system for tracking rental properties vs. traditional deals',
      'Creating investment reports takes 3+ hours per property',
      'Clients want data-driven recommendations, relying on gut feel',
    ],
    saiSolution: [
      'REID module provides institutional-grade market data in one platform',
      'ROI calculator (cap rate, cash flow, appreciation) in 2 minutes',
      'Separate deal type for RENTAL_LANDLORD properties with custom workflows',
      'AI-generated investment reports with neighborhood insights',
      'Show clients data they can\'t get from other agents',
    ],
    results: [
      { metric: 'Market Data', value: 'All-in-one platform' },
      { metric: 'Investment Analysis', value: 'Faster with ROI calculator' },
      { metric: 'Investor Clients', value: 'Potential to grow' },
      { metric: 'Investment Focus', value: 'Higher-value deals' },
    ],
    modules: ['REID', 'The Office', 'CRM'],
    workflow: 'Client sends property address → Run REID analysis (cap rate, cash flow, comps) → Generate investment report with AI → Present data-driven recommendation → Close deal',
  },
  {
    id: 'broker-enterprise',
    agentType: 'broker',
    title: 'Brokerage with 50 Agents Standardizing on SAI',
    persona: {
      name: 'Agent D',
      role: 'Managing Broker',
      location: '',
      teamSize: '50 agents',
    },
    challenges: [
      'Agents using multiple different CRMs with no brokerage-wide visibility',
      'Compliance challenges - difficult to verify required documents obtained',
      'New agents take significant time to get up to speed',
      'Paying per-user fees across platforms adds up quickly',
      'No way to track brokerage-wide performance or goals',
    ],
    saiSolution: [
      'All agents on SAI Platform with unlimited users at flat rate',
      'Brokerage-wide dashboard to see every deal, every lead, every agent',
      'Compliance checklists in The Office with automated document tracking',
      'Faster agent onboarding with standardized workflows',
      'Custom tier: White-label SAI with brokerage branding',
    ],
    results: [
      { metric: 'Software Consolidation', value: 'Significant savings vs per-user pricing' },
      { metric: 'Agent Onboarding', value: 'Faster with templates' },
      { metric: 'Compliance Tracking', value: 'Improved visibility' },
      { metric: 'Productivity', value: 'Better tools for agents' },
    ],
    modules: ['CRM', 'The Office', 'Content Studio', 'REID', 'SAI Assistant'],
    workflow: 'Broker reviews brokerage dashboard daily → Identifies agents needing support → Compliance team monitors deal checklists → Marketing team creates branded content → Agents close more deals with better tools',
  },
  {
    id: 'solo-agent-investor',
    agentType: 'solo',
    title: 'Solo Agent Transitioning to Investment Properties',
    persona: {
      name: 'Agent E',
      role: 'Residential → Investment Agent',
      location: 'California',
    },
    challenges: [
      'Built residential business, but want to target investors',
      'Don\'t have market data or ROI tools investors expect',
      'Don\'t know how to analyze investment properties',
      'Losing investor clients to agents with better data',
      'Need to position myself as investment expert',
    ],
    saiSolution: [
      'REID module provides all market data and ROI calculators',
      'AI assistant trained on investment analysis. Learn as I go',
      'Generate professional investment reports that impress clients',
      'ROI calculator shows cap rate, cash flow, appreciation forecasts',
      'Separate deal workflows for rental properties',
    ],
    results: [
      { metric: 'Investor Clients', value: 'Growing client base' },
      { metric: 'Average Commission', value: 'Higher than residential' },
      { metric: 'Positioning', value: 'Investment Property Specialist' },
      { metric: 'Annual GCI', value: 'Significant increase' },
    ],
    modules: ['REID', 'CRM', 'The Office', 'SAI Assistant'],
  },
  {
    id: 'team-marketing-automation',
    agentType: 'team',
    title: 'Team of 12 Agents with Automated Marketing',
    persona: {
      name: 'Agent F',
      role: 'Team Lead & Marketing Director',
      location: 'California',
      teamSize: '12 agents',
    },
    challenges: [
      'No consistent marketing. Each agent does their own thing',
      'Spending $150/month on Canva + $99/month on Buffer for social',
      'No email marketing system, losing touch with sphere',
      'Creating content takes 10 hours/week for marketing coordinator',
      'Brand is inconsistent across 12 agents',
    ],
    saiSolution: [
      'Content Studio generates all marketing content with AI',
      'Branded templates ensure consistency across team',
      'Automated drip campaigns to entire sphere (5,000 contacts)',
      'Schedule month of social posts in 2 hours (AI-generated)',
      'Replace separate marketing tools with one platform',
    ],
    results: [
      { metric: 'Content Creation Time', value: 'Significantly reduced' },
      { metric: 'Marketing Tool Savings', value: 'Monthly savings' },
      { metric: 'Sphere Engagement', value: 'Higher engagement' },
      { metric: 'Referral Deals', value: 'More referral deals' },
    ],
    modules: ['Content Studio', 'CRM', 'SAI Assistant'],
  },
];

// Helper functions
export const getUseCasesByAgentType = (agentType: string): UseCase[] => {
  return useCases.filter(uc => uc.agentType === agentType);
};

export const getUseCaseById = (id: string): UseCase | undefined => {
  return useCases.find(uc => uc.id === id);
};

// Agent type descriptions for filtering
export const agentTypes = [
  {
    id: 'solo',
    name: 'Solo Agent',
    description: 'Individual agents managing their own book of business',
  },
  {
    id: 'team',
    name: 'Team',
    description: 'Small to mid-size real estate teams (2-20 agents)',
  },
  {
    id: 'investor',
    name: 'Investor Agent',
    description: 'Agents specializing in investment properties and investor clients',
  },
  {
    id: 'broker',
    name: 'Broker',
    description: 'Brokerages and large teams (20+ agents)',
  },
];
