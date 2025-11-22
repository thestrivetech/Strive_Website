// SAI Platform Use Cases by Agent Type
// Real-world scenarios showing how different agent types use SAI

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
    title: 'Solo Agent Scaling from 500 to 1,200 Contacts',
    persona: {
      name: 'Sarah Thompson',
      role: 'Solo Residential Agent',
      location: 'San Diego, CA',
    },
    challenges: [
      'Managing 500+ contacts across spreadsheets and sticky notes',
      'Forgetting to follow up with leads—missing deals',
      'Spending 10 hours/week creating listing descriptions and social posts',
      'No system for tracking deals—using email and memory',
      'Paying $400/month for 4 separate tools (CRM, Canva, Mailchimp, CoStar)',
    ],
    saiSolution: [
      'Imported 500 contacts to SAI CRM with smart lead scoring (HOT/WARM/COLD)',
      'Set up automated follow-up sequences—no lead falls through cracks',
      'AI content generation creates listing descriptions in 30 seconds',
      'The Office module tracks all 15 active deals with automated checklists',
      'Consolidated 4 tools into SAI—saves $400/month',
    ],
    results: [
      { metric: 'Contacts Managed', value: '1,200 (from 500)' },
      { metric: 'Time Saved on Content', value: '8 hours/week' },
      { metric: 'Tool Cost Savings', value: '$400/month' },
      { metric: 'Deals Closed (Annual)', value: '+12 deals (35% increase)' },
    ],
    modules: ['CRM', 'The Office', 'Content Studio', 'REID'],
    workflow: '7am: Review SAI dashboard for hot leads → 9am: AI generates listing description → 11am: Update deals in The Office → 2pm: Schedule week of social posts → 4pm: Run REID comps for CMA',
  },
  {
    id: 'team-collaboration',
    agentType: 'team',
    title: 'Real Estate Team of 8 Agents with Shared Pipeline',
    persona: {
      name: 'Marcus Rodriguez',
      role: 'Team Lead',
      location: 'Los Angeles, CA',
      teamSize: '8 agents',
    },
    challenges: [
      'Team using 3 different CRMs—no visibility into team pipeline',
      'Lead assignment is manual and chaotic ("Who has this lead?")',
      'No standardized processes—every agent does deals differently',
      'Paying $69/user × 8 = $552/month just for CRM (Follow Up Boss)',
      'Transaction coordinator using separate system (Dotloop: $49/mo)',
    ],
    saiSolution: [
      'All 8 agents on SAI Platform at $999/month (vs. $552 + $49 + tools = $800+)',
      'Shared team pipeline—everyone sees all leads and deals',
      'Automated lead assignment rules (round-robin by territory)',
      'Standardized deal workflows—onboard new agents in 1 day',
      'TC has full access to all deals with document management',
    ],
    results: [
      { metric: 'Monthly Software Cost', value: '$999 (was $800+)' },
      { metric: 'Team Pipeline Visibility', value: '100% (was 0%)' },
      { metric: 'New Agent Onboarding', value: '1 day (was 2 weeks)' },
      { metric: 'Deals Closed (Team)', value: '+24 deals/year (30% increase)' },
    ],
    modules: ['CRM', 'The Office', 'Content Studio'],
    workflow: 'Team lead reviews SAI dashboard every morning → Assigns hot leads via automation → Agents update deals in real-time → TC manages all transactions in The Office → Weekly team performance review in SAI analytics',
  },
  {
    id: 'investor-agent-analysis',
    agentType: 'investor',
    title: 'Investor-Focused Agent Managing 15 Rental Properties',
    persona: {
      name: 'David Chen',
      role: 'Investment Property Specialist',
      location: 'San Francisco, CA',
    },
    challenges: [
      'Clients ask for ROI analysis—manually calculating cap rates in Excel',
      'Paying $300/month for CoStar (market data) + $150 for property comps',
      'No system for tracking rental properties vs. traditional deals',
      'Creating investment reports takes 3 hours per property',
      'Clients want data-driven recommendations—I only have gut feel',
    ],
    saiSolution: [
      'REID module provides institutional-grade market data (saves $300/mo CoStar)',
      'ROI calculator (cap rate, cash flow, appreciation) in 2 minutes',
      'Separate deal type for RENTAL_LANDLORD properties with custom workflows',
      'AI-generated investment reports with neighborhood insights',
      'Show clients data they can\'t get from other agents',
    ],
    results: [
      { metric: 'Market Data Cost Savings', value: '$300/month' },
      { metric: 'Time Per Investment Analysis', value: '15 min (was 3 hours)' },
      { metric: 'Investor Clients Gained', value: '+12 clients/year' },
      { metric: 'Average Commission', value: '$15,000 (vs. $8,000 residential)' },
    ],
    modules: ['REID', 'The Office', 'CRM'],
    workflow: 'Client sends property address → Run REID analysis (cap rate, cash flow, comps) → Generate investment report with AI → Present data-driven recommendation → Close deal',
  },
  {
    id: 'broker-enterprise',
    agentType: 'broker',
    title: 'Brokerage with 50 Agents Standardizing on SAI',
    persona: {
      name: 'Jennifer Martinez',
      role: 'Managing Broker',
      location: 'Orange County, CA',
      teamSize: '50 agents',
    },
    challenges: [
      'Agents using 10 different CRMs—no brokerage-wide visibility',
      'Compliance nightmare—can\'t verify required documents obtained',
      'New agents take 4-6 weeks to get up to speed',
      'Paying Follow Up Boss: $69 × 50 = $3,450/month just for CRM',
      'No way to track brokerage-wide performance or goals',
    ],
    saiSolution: [
      'All 50 agents on SAI Platform: $999/month (save $2,451/month = $29,412/year)',
      'Brokerage-wide dashboard—see every deal, every lead, every agent',
      'Compliance checklists in The Office—automated document tracking',
      'New agents onboarded in 1 day with standardized workflows',
      'Custom tier: White-label SAI with brokerage branding',
    ],
    results: [
      { metric: 'Annual Software Savings', value: '$29,412' },
      { metric: 'New Agent Onboarding', value: '1 day (was 4-6 weeks)' },
      { metric: 'Compliance Issues', value: '95% reduction' },
      { metric: 'Brokerage GCI', value: '+$500,000 (agent productivity gains)' },
    ],
    modules: ['CRM', 'The Office', 'Content Studio', 'REID', 'SAI Assistant'],
    workflow: 'Broker reviews brokerage dashboard daily → Identifies agents needing support → Compliance team monitors deal checklists → Marketing team creates branded content → Agents close more deals with better tools',
  },
  {
    id: 'solo-agent-investor',
    agentType: 'solo',
    title: 'Solo Agent Transitioning to Investment Properties',
    persona: {
      name: 'Amanda Liu',
      role: 'Residential → Investment Agent',
      location: 'Sacramento, CA',
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
      'AI assistant trained on investment analysis—learn as I go',
      'Generate professional investment reports that impress clients',
      'ROI calculator shows cap rate, cash flow, appreciation forecasts',
      'Separate deal workflows for rental properties',
    ],
    results: [
      { metric: 'Investor Clients', value: '15 (from 0)' },
      { metric: 'Average Commission', value: '$12,000 (vs. $7,000 residential)' },
      { metric: 'Positioning', value: 'Investment Property Specialist' },
      { metric: 'Annual GCI Increase', value: '+$90,000' },
    ],
    modules: ['REID', 'CRM', 'The Office', 'SAI Assistant'],
  },
  {
    id: 'team-marketing-automation',
    agentType: 'team',
    title: 'Team of 12 Agents with Automated Marketing',
    persona: {
      name: 'Robert Kim',
      role: 'Team Lead & Marketing Director',
      location: 'San Jose, CA',
      teamSize: '12 agents',
    },
    challenges: [
      'No consistent marketing—each agent does their own thing',
      'Spending $150/month on Canva + $99/month on Buffer for social',
      'No email marketing system—losing touch with sphere',
      'Creating content takes 15 hours/week for marketing coordinator',
      'Brand is inconsistent across 12 agents',
    ],
    saiSolution: [
      'Content Studio generates all marketing content with AI',
      'Branded templates ensure consistency across team',
      'Automated drip campaigns to entire sphere (5,000 contacts)',
      'Schedule month of social posts in 2 hours (AI-generated)',
      'Consolidated Canva + Buffer → save $249/month',
    ],
    results: [
      { metric: 'Content Creation Time', value: '2 hours/week (was 15)' },
      { metric: 'Marketing Tool Savings', value: '$249/month' },
      { metric: 'Sphere Engagement', value: '3x increase' },
      { metric: 'Referral Deals', value: '+18 deals/year from sphere' },
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
