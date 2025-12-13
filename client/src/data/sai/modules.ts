// SAI Platform Modules - Core functionality breakdown
// 6 modules: SAI Assistant, CRM, The Office, Content Studio, REID, Taxes & Expenses

import { Users, Building2, Mail, TrendingUp, Sparkles, Target, Clock, DollarSign, Zap, BarChart, FileText, Calculator, Camera, Receipt } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ModuleFeature {
  name: string;
  icon: LucideIcon;
  painPoint: string; // Quantified pain point with statistics
  solution: string; // How SAI Platform solves it
  sourceUrl: string; // Citation source URL
}

export interface SAIModule {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string; // Outcome-focused value proposition
  description: string; // 2-3 sentences explaining the module
  features: string[]; // 5-10 key features
  benefits: string[]; // 3-5 key benefits
  useCases: string[]; // 3-5 use case examples
  ctaHref: string; // Link to more details
  painPoints: string[]; // 2-3 pain points this module solves
  outcomes: string[]; // 2-3 quantified outcomes
  badge: string; // Outcome-focused badge text
  accentColor: string; // Secondary color for visual variety (Tailwind class)
  detailedFeatures: ModuleFeature[]; // Pain points with sources for pain points section
}

export const saiModules: SAIModule[] = [
  {
    id: 'sai',
    icon: Sparkles,
    title: 'SAI Assistant',
    tagline: 'Work Smarter, Not Harder: Your AI Assistant Handles Scheduling, Research, and Insights',
    description: 'SAI Assistant is your AI-powered assistant that handles it all. It can update deals ("Mark the Johnson deal as under contract"), draft emails, search listings, and answer questions, all conversationally. Real estate trained.',
    features: [
      'Multiple advanced AI models for every task',
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
      'Best AI model selected for each task',
    ],
    useCases: [
      'Solo agent: "Update the Johnson deal to under contract"',
      'Team: "Which deals close this week?"',
      'Brokerage: "Draft a contract clause for seller financing"',
    ],
    ctaHref: '/platform',
    painPoints: [
      'Constantly switching between apps to update deals and check data',
      'Spending hours researching contract clauses and market questions',
    ],
    outcomes: [
      'Update CRM, schedule tasks, and search listings hands-free via voice',
      'AI drafts emails, answers questions, and runs calculations instantly',
    ],
    badge: 'Your 24/7 Assistant',
    accentColor: 'from-amber-500/20 to-amber-600/20',
    detailedFeatures: [
      {
        name: 'Hands-Free CRM Updates',
        icon: Zap,
        painPoint: 'Agents spend significant time manually updating CRM between appointments. "I forgot to update the CRM" is a common excuse',
        solution: 'Update deals hands-free with simple text commands: "Update the Johnson deal to under contract", saving valuable time',
        sourceUrl: 'https://www.nar.realtor/research-and-statistics/research-reports/realtor-technology-survey'
      },
      {
        name: 'Advanced AI Technology',
        icon: Target,
        painPoint: 'Single-model AI tools limit agents to one approach. Different tasks need different AI strengths',
        solution: 'Access advanced AI technology that automatically selects the optimal model for each task',
        sourceUrl: 'https://ascendix.com/blog/ai-real-estate-agents'
      },
      {
        name: 'Real Estate Trained',
        icon: FileText,
        painPoint: "Generic AI tools don't understand real estate terminology (MLS, contracts, commissions, escrow). Agents waste time explaining basics",
        solution: 'AI assistant trained on real estate workflows knows MLS, contracts, and commissions, so no explaining is required',
        sourceUrl: 'https://realoffice360.com/article/ai-impact-on-real-estate-crm'
      },
      {
        name: 'Tool Calling & Integration',
        icon: BarChart,
        painPoint: 'Agents constantly switch between apps to update deals, schedule tasks, and search listings, losing valuable time to context switching (average brokerage uses 23 tools)',
        solution: 'AI directly updates CRM, schedules tasks, and searches listings via tool calling, eliminating app-switching entirely',
        sourceUrl: 'https://agently.substack.com/p/23-tools-per-agent-or-why-is-real'
      }
    ]
  },
  {
    id: 'crm',
    icon: Users,
    title: 'CRM & Lead Management',
    tagline: 'Close More Deals: Never Miss a Follow-Up or Lose a Lead Again',
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
      'Close more deals with AI-powered lead scoring',
      'Never forget to follow up (automated nurture campaigns)',
      'See your entire pipeline at a glance',
      'Add unlimited users at no extra cost',
    ],
    useCases: [
      'Solo agent tracking 500+ contacts',
      'Team managing shared pipeline with lead assignment',
      'Brokerage with 50+ agents and territory management',
    ],
    ctaHref: '/platform',
    painPoints: [
      'Leads fall through the cracks with no centralized system',
      'Manually tracking follow-ups in spreadsheets wastes hours daily',
    ],
    outcomes: [
      'Auto-capture every lead from all sources instantly',
      'AI predicts which leads will close (higher conversion)',
    ],
    badge: 'Close More Deals',
    accentColor: 'from-blue-500/20 to-blue-600/20',
    detailedFeatures: [
      {
        name: 'AI Lead Scoring',
        icon: Target,
        painPoint: 'Agents spend significant time on leads that never convert, with industry data showing low average conversion rates',
        solution: 'AI lead scoring helps prioritize high-potential leads, improving conversion efficiency by focusing on engaged prospects',
        sourceUrl: 'https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/unlocking-profitable-b2b-growth-through-gen-ai'
      },
      {
        name: 'Automated Follow-Ups',
        icon: Clock,
        painPoint: 'Only 27% of leads get contacted at all, with average response time of 47 hours (industry research). Most sales require multiple follow-up touches',
        solution: 'Automated follow-up sequences ensure instant responses and consistent nurturing, with segmented campaigns achieving higher engagement',
        sourceUrl: 'https://theclose.com/real-estate-lead-generation-statistics/'
      },
      {
        name: 'Pipeline Management',
        icon: BarChart,
        painPoint: 'Teams using multiple CRMs have limited visibility into the shared pipeline, causing lost opportunities',
        solution: 'Visual Kanban pipeline tracking gives entire team real-time visibility, helping close more deals',
        sourceUrl: 'https://www.salesforce.com/resources/research-reports/state-of-sales/'
      },
      {
        name: 'Unlimited Contacts',
        icon: DollarSign,
        painPoint: 'Per-contact and per-user fees from many CRMs add up quickly for growing databases and teams',
        solution: 'Unlimited contacts at no extra cost. Add 10,000 contacts without increasing your bill',
        sourceUrl: 'https://leadsync.me/blog/real-estate-crms/'
      }
    ]
  },
  {
    id: 'office',
    icon: Building2,
    title: 'The Office',
    tagline: 'Cut Transaction Time in Half: Manage Docs, Signatures, and Compliance in One Place',
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
      'Save significant time on deal management',
      'Never miss a deadline (automated reminders)',
      'Handle complex investment deals with ease',
      'Faster team member onboarding with templates',
    ],
    useCases: [
      'Solo agent tracking 10-20 active deals',
      'Team with shared deal visibility and TC assignment',
      'Investor agent managing 15 rental properties',
    ],
    ctaHref: '/platform',
    painPoints: [
      'Juggling multiple tools for contracts, signatures, and checklists',
      'Missing closing deadlines costs deals and reputation',
    ],
    outcomes: [
      'All deal documents in one searchable location',
      'Automated workflows significantly reduce deal admin time',
    ],
    badge: 'Streamline Transactions',
    accentColor: 'from-green-500/20 to-green-600/20',
    detailedFeatures: [
      {
        name: 'Auto-Generated Workflows',
        icon: Zap,
        painPoint: 'Agents spend significant time per transaction on administrative tasks, with most closing tasks requiring manual effort',
        solution: 'Each deal type auto-generates 8-15 task workflows, significantly reducing transaction admin time',
        sourceUrl: 'https://www.luxurypresence.com/blogs/real-estate-transaction-coordination/'
      },
      {
        name: 'Deadline Tracking',
        icon: Clock,
        painPoint: 'Missing closing deadlines costs deals and damages reputation. Transaction delays are often caused by admin burden and human error',
        solution: 'Automated deadline tracking with email/SMS reminders ensures you never miss a critical date, significantly reducing compliance risks',
        sourceUrl: 'https://www.luxurypresence.com/blogs/real-estate-transaction-coordination/'
      },
      {
        name: 'Document Management',
        icon: FileText,
        painPoint: 'Real estate transactions involve substantial paperwork including contracts, disclosures, and inspection reports. Disorganized systems lead to lost documents',
        solution: 'Centralized document storage with searchable contracts, disclosures, and compliance checklists in one location',
        sourceUrl: 'https://realestate.usnews.com/real-estate/articles/what-is-a-transaction-coordinator'
      },
      {
        name: '6 Deal Types Supported',
        icon: BarChart,
        painPoint: 'Investment deals, rentals, and FSBO transactions require different workflows. Most CRMs only support basic buyer/seller deals',
        solution: 'Supports HOME_BUYING, HOME_SELLING, RENTAL_LANDLORD, RENTAL_TENANT, INVESTMENT_PROPERTY, and FSBO with customized workflows for each',
        sourceUrl: 'https://www.salesmate.io/blog/problems-of-being-in-real-estate-industry/'
      }
    ]
  },
  {
    id: 'studio',
    icon: Mail,
    title: 'Content Studio',
    tagline: 'Save 10 Hours/Week: AI Writes Your Listings, Social Posts, and Email Campaigns',
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
      'Save significant time on content creation',
      'Never run out of social post ideas (AI generation)',
      'Nurture leads on autopilot (drip campaigns)',
      'All marketing in one place (no switching tools)',
    ],
    useCases: [
      'Solo agent sending monthly newsletter + weekly social posts',
      'Team with branded drip campaigns and templates',
      'Brokerage with company-wide campaigns and agent toolkits',
    ],
    ctaHref: '/platform',
    painPoints: [
      'Spending 10+ hours/week writing listings and social content',
      'Inconsistent marketing across email, social, and campaigns',
    ],
    outcomes: [
      'AI generates property listings, blog posts, and social content in seconds',
      'Automated drip campaigns nurture leads while you focus on closings',
    ],
    badge: 'AI-Powered Content',
    accentColor: 'from-purple-500/20 to-purple-600/20',
    detailedFeatures: [
      {
        name: 'AI Content Generation',
        icon: Zap,
        painPoint: 'Agents spend significant time creating listing descriptions, social posts, and email campaigns from scratch (46% now use AI-generated content per NAR)',
        solution: 'AI generates property listings, blog posts, and social content in seconds, dramatically reducing content creation time',
        sourceUrl: 'https://www.nar.realtor/research-and-statistics/research-reports/realtor-technology-survey'
      },
      {
        name: 'Email Marketing Automation',
        icon: Mail,
        painPoint: 'Drip campaigns manually managed produce poor results. Agents struggle with segmentation and timing',
        solution: 'Automated drip campaigns with segmentation achieve higher engagement ($36 ROI per $1 spent on email marketing per HubSpot)',
        sourceUrl: 'https://www.hubspot.com/marketing-statistics'
      },
      {
        name: 'Multi-Platform Social Scheduling',
        icon: BarChart,
        painPoint: 'Real estate marketers are increasing social media investments, but agents spend hours per week creating engaging posts',
        solution: 'Schedule content across 6 platforms (Facebook, Instagram, LinkedIn, Twitter, TikTok, YouTube) from one calendar view',
        sourceUrl: 'https://www.nar.realtor/research-and-statistics/research-reports/realtor-technology-survey'
      },
      {
        name: 'Auto-Sync with CRM',
        icon: Target,
        painPoint: 'Manually importing contacts between CRM and email platforms wastes hours and creates data silos',
        solution: 'All contacts auto-sync from CRM to Content Studio. Update once, market everywhere',
        sourceUrl: 'https://www.salesmate.io/blog/problems-of-being-in-real-estate-industry/'
      }
    ]
  },
  {
    id: 'reid',
    icon: TrendingUp,
    title: 'REID',
    tagline: 'Find Winning Deals Faster: AI Surfaces High-Priority Listings and Hidden Opportunities',
    description: 'REID (Real Estate Investment Data) does the hunting for you. AI-powered Deal Finder surfaces properties matching your criteria before they hit mainstream platforms. High-Priority Listings flags opportunities with strong ROI potential. Plus: institutional-grade market data, ROI calculators, and comp analysis - all included at no extra cost.',
    features: [
      'Deal Finder: AI matches properties to your investment criteria',
      'High-Priority Listings: Instant alerts for high-ROI opportunities',
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
      'Market data included at no extra cost',
      'Run ROI on multiple properties quickly',
      'Show clients data-driven insights',
      'Make informed investment decisions',
    ],
    useCases: [
      'Investor agent analyzing 10 properties/day',
      'Listing agent pulling comps for CMAs',
      "Buyer's agent showing clients market trends",
    ],
    ctaHref: '/platform',
    painPoints: [
      'Missing high-ROI deals because you cannot monitor every listing',
      'Paying expensive monthly fees for market data subscriptions',
      'Making offers blind without access to investment-grade comps',
    ],
    outcomes: [
      'Deal Finder surfaces high-priority properties matching your criteria automatically',
      'High-Priority Listings flag strong investments before other agents see them',
      'Institutional-grade market data included at no extra cost',
    ],
    badge: 'Investment Data Included',
    accentColor: 'from-teal-500/20 to-teal-600/20',
    detailedFeatures: [
      {
        name: 'Deal Finder & High-Priority Listings',
        icon: Target,
        painPoint: 'Agents manually search MLS daily, missing time-sensitive investment opportunities. High-ROI properties often sell quickly',
        solution: 'AI-powered Deal Finder monitors your criteria 24/7 and flags High-Priority Listings based on ROI potential, market velocity, and your investment parameters',
        sourceUrl: 'https://www.nar.realtor/research-and-statistics/research-reports/realtor-technology-survey'
      },
      {
        name: 'ROI Calculator',
        icon: DollarSign,
        painPoint: 'Creating investment reports manually is time-consuming. Clients demand data-driven recommendations',
        solution: 'AI-powered ROI calculator generates cap rate, cash flow, and appreciation analysis in minutes instead of hours',
        sourceUrl: 'https://www.nar.realtor/research-and-statistics/research-reports/realtor-technology-survey'
      },
      {
        name: 'Market Data Access',
        icon: BarChart,
        painPoint: 'Professional market data subscriptions can cost hundreds per month, adding significant overhead for agents',
        solution: 'Institutional-grade market data included at no extra cost, eliminating the need for expensive separate subscriptions',
        sourceUrl: 'https://www.nar.realtor/research-and-statistics/research-reports/realtor-technology-survey'
      },
      {
        name: 'Comp Analysis',
        icon: FileText,
        painPoint: 'Agents manually pull and harmonize data from multiple sources (MLS, public records, online platforms) for CMAs',
        solution: 'AI automatically identifies most relevant comparable sales based on location, property size, and condition, shaving hours off the CMA process',
        sourceUrl: 'https://www.datagrid.com/blog/ai-agents-automate-cma-real-estate'
      },
      {
        name: 'Investment Property Search',
        icon: Target,
        painPoint: 'Investor agents lack tools to filter properties by investment-grade metrics (cap rate, cash flow, rental yield)',
        solution: 'Property search with investment-specific filters helps investor agents find and close investment deals more efficiently',
        sourceUrl: 'https://www.nar.realtor/research-and-statistics'
      }
    ]
  },
  {
    id: 'taxes',
    icon: Calculator,
    title: 'Taxes & Expenses',
    tagline: 'QuickBooks Sync: Track Every Deduction and Eliminate Tax Season Stress',
    description: 'Never miss a tax deduction again. SAI Taxes & Expenses includes 14 IRS-aligned expense categories, automatic receipt management, quarterly reports, and one-click export to QuickBooks or your CPA. Track mileage, categorize expenses, and generate year-end tax packages in minutes. Built for 1099 contractors and self-employed real estate professionals.',
    features: [
      '14 IRS-aligned expense categories (VEHICLE, MARKETING, OFFICE, MEALS, TRAVEL, etc.)',
      'Receipt photo upload and cloud storage',
      'QuickBooks Online sync (coming Q2 2025)',
      'Automatic category totals and monthly analysis',
      'Quarterly summary reports and tax estimates',
      'Year-end tax package (Schedule C ready)',
      'Mileage logging and tracking',
      'Bulk operations (batch uploads, categorization)',
      'CSV export for accountants',
    ],
    benefits: [
      'Maximize deductions by tracking all expenses',
      'Significantly reduce tax prep time (vs. shoebox method)',
      'Eliminate manual receipt organization',
      'QuickBooks sync eliminates double data entry (Q2 2025)',
    ],
    useCases: [
      'Solo agent tracking $30K+ in annual expenses',
      'Team managing shared business expenses',
      'Broker preparing year-end 1099s for agents',
    ],
    ctaHref: '/platform',
    painPoints: [
      'Scrambling to find receipts at tax time costs hours and money',
      'Missing deductions means potentially overpaying on taxes',
    ],
    outcomes: [
      'All expenses categorized and receipts stored in one place',
      'Automatic quarterly reports keep you tax-ready year-round',
    ],
    badge: 'QuickBooks Sync: 1099-Ready',
    accentColor: 'from-emerald-500/20 to-emerald-600/20',
    detailedFeatures: [
      {
        name: 'IRS-Aligned Categories',
        icon: FileText,
        painPoint: 'Real estate agents often miss eligible deductions due to poor expense categorization, potentially overpaying taxes',
        solution: '14 IRS-aligned categories (VEHICLE, MARKETING, OFFICE, etc.) ensure you capture every deductible expense correctly',
        sourceUrl: 'https://www.irs.gov/businesses/small-businesses-self-employed/real-estate-agents'
      },
      {
        name: 'Receipt Management',
        icon: Camera,
        painPoint: 'Agents waste significant time at tax time searching for lost receipts and organizing documentation',
        solution: 'Photo upload stores all receipts in the cloud, searchable by category, date, or vendor. Never lose a receipt again',
        sourceUrl: 'https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping'
      },
      {
        name: 'Quarterly Tax Reports',
        icon: Calculator,
        painPoint: 'Unexpected quarterly tax bills cause cash flow crises. Self-employed agents often underestimate without proper tracking',
        solution: 'Automated quarterly summary reports with tax estimate calculations prevent surprises and improve cash flow planning',
        sourceUrl: 'https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes'
      },
      {
        name: 'QuickBooks Integration',
        icon: DollarSign,
        painPoint: 'CPAs may charge extra to organize disorganized expense records. Many agents waste hours on double data entry',
        solution: 'QuickBooks Online sync (Q2 2025) eliminates double entry. One-click CSV export or Schedule C-ready tax package simplifies tax preparation',
        sourceUrl: 'https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping'
      }
    ]
  },
];
