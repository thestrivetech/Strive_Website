// SAI Platform Modules - Core functionality breakdown
// 5 modules: CRM, The Office, Content Studio, REID, Global SAI

import { Users, Building2, Mail, TrendingUp, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SAIModule {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string; // One-liner value proposition
  description: string; // 2-3 sentences explaining the module
  features: string[]; // 5-10 key features
  benefits: string[]; // 3-5 key benefits
  useCases: string[]; // 3-5 use case examples
  ctaHref: string; // Link to more details
}

export const saiModules: SAIModule[] = [
  {
    id: 'crm',
    icon: Users,
    title: 'CRM & Lead Management',
    tagline: 'Manage unlimited contacts, score leads automatically, and never lose track of a buyer or seller.',
    description: 'SAI CRM gives you unlimited contacts (no per-contact fees), smart lead scoring (HOT/WARM/COLD based on engagement), and visual pipeline tracking (LEAD → QUALIFIED → NURTURE → CONVERTED). Automated follow-ups ensure no lead falls through the cracks.',
    features: [
      'Unlimited contacts (no per-contact fees)',
      'Smart lead scoring (HOT/WARM/COLD)',
      'Pipeline tracking (visual Kanban board)',
      'Automated follow-ups (email, SMS, tasks)',
      'Contact segmentation & tagging',
      'Deal source tracking',
      'Mobile app (iOS & Android)',
      'Team collaboration & assignment',
    ],
    benefits: [
      'Close 35% more deals with AI-powered lead scoring',
      'Never forget to follow up (automated nurture campaigns)',
      'See your entire pipeline at a glance',
      'Add unlimited users at no extra cost',
    ],
    useCases: [
      'Solo agent tracking 500+ contacts',
      'Team managing shared pipeline with lead assignment',
      'Brokerage with 50+ agents and territory management',
    ],
    ctaHref: '/platform#crm',
  },
  {
    id: 'office',
    icon: Building2,
    title: 'The Office',
    tagline: 'Handle 6 deal types with auto-generated workflows, document management, and deadline tracking.',
    description: 'The Office handles HOME_BUYING, HOME_SELLING, RENTAL_LANDLORD, RENTAL_TENANT, INVESTMENT_PROPERTY, and FSBO deals. Each deal type auto-generates 8-15 processes (tasks, deadlines, documents). Never miss a closing date again.',
    features: [
      '6 deal types (HOME_BUYING, HOME_SELLING, RENTAL_LANDLORD, RENTAL_TENANT, INVESTMENT_PROPERTY, FSBO)',
      'Auto-generated workflows (8-15 tasks per deal)',
      'Document management (upload contracts, disclosures)',
      'Deadline tracking (never miss a closing)',
      'Task assignment (to team members, TCs)',
      'Deal templates (customize workflows)',
      'Email/SMS notifications (automated reminders)',
      'Compliance checklists',
    ],
    benefits: [
      'Save 10 hours/week on deal management',
      'Never miss a deadline (automated reminders)',
      'Handle complex investment deals with ease',
      'Onboard new team members in 1 day (templates)',
    ],
    useCases: [
      'Solo agent tracking 10-20 active deals',
      'Team with shared deal visibility and TC assignment',
      'Investor agent managing 15 rental properties',
    ],
    ctaHref: '/platform#office',
  },
  {
    id: 'studio',
    icon: Mail,
    title: 'Content Studio',
    tagline: 'Send email campaigns, schedule social posts, and generate AI content—all in one place.',
    description: 'Content Studio combines email marketing (templates, automation, A/B testing), social scheduling (6 platforms: Facebook, Instagram, LinkedIn, Twitter, TikTok, YouTube), and AI content generation (listings, market updates, blog posts). All contacts auto-sync from CRM.',
    features: [
      'Email marketing (templates, automation, A/B testing)',
      'Social scheduling (6 platforms)',
      'AI content generation (listings, market updates, blogs)',
      'Auto-sync with CRM (no manual imports)',
      'Analytics (open rates, click rates, engagement)',
      'Drip campaigns (automated nurture sequences)',
      'Brand templates (consistent messaging)',
      'Calendar view (see all scheduled content)',
    ],
    benefits: [
      'Save 5 hours/week on content creation',
      'Never run out of social post ideas (AI generation)',
      'Nurture leads on autopilot (drip campaigns)',
      'All marketing in one place (no switching tools)',
    ],
    useCases: [
      'Solo agent sending monthly newsletter + weekly social posts',
      'Team with branded drip campaigns and templates',
      'Brokerage with company-wide campaigns and agent toolkits',
    ],
    ctaHref: '/platform#studio',
  },
  {
    id: 'reid',
    icon: TrendingUp,
    title: 'REID',
    tagline: 'Get institutional-grade market data, ROI calculators, and property comps—without a $300/month subscription.',
    description: 'REID (Real Estate Investment Data) provides market intelligence for 10+ markets: ROI calculator (cap rate, cash flow, appreciation), property search (investment-grade filters), and market reports (trends, forecasts). Included at no extra cost vs. $300+/month for CoStar.',
    features: [
      '10+ market coverage (growing monthly)',
      'ROI calculator (cap rate, cash flow, appreciation)',
      'Property search (investment-grade filters)',
      'Market reports (trends, forecasts, neighborhood insights)',
      'Comp analysis (sold, active, pending)',
      'Rental yield calculator',
      'School ratings & crime data',
      'Export to PDF (client reports)',
    ],
    benefits: [
      'Save $300/month (vs. CoStar subscription)',
      'Run ROI on 20 properties/week (for investors)',
      'Show clients data-driven insights',
      'Make informed investment decisions',
    ],
    useCases: [
      'Investor agent analyzing 10 properties/day',
      'Listing agent pulling comps for CMAs',
      "Buyer's agent showing clients market trends",
    ],
    ctaHref: '/platform#reid',
  },
  {
    id: 'sai',
    icon: Sparkles,
    title: 'Global SAI',
    tagline: 'Chat with your AI assistant to update deals, draft emails, and get answers—hands-free.',
    description: 'Global SAI is your AI assistant powered by 12+ models (Llama 3.3 70B, GPT-4o, Claude 3.5, Gemini 2.0). It can update deals ("Mark the Johnson deal as under contract"), draft emails, search listings, and answer questions—all conversationally. Real estate trained.',
    features: [
      '12+ AI models (Llama, GPT, Claude, Gemini)',
      'Tool calling (update CRM, schedule tasks, search listings)',
      'Conversational interface (voice or text)',
      'Real estate trained (knows MLS, contracts, commissions)',
      'Multi-turn conversations (context-aware)',
      'Code interpreter (run calculations)',
      'Web search (up-to-date info)',
      'Privacy-first (your data never trains models)',
    ],
    benefits: [
      'Update deals hands-free while driving',
      'Draft emails in seconds (AI-generated)',
      'Get answers without searching docs',
      '12 models vs. 1 (choose best for task)',
    ],
    useCases: [
      'Solo agent: "Update the Johnson deal to under contract"',
      'Team: "Which deals close this week?"',
      'Brokerage: "Draft a contract clause for seller financing"',
    ],
    ctaHref: '/platform#sai',
  },
];
