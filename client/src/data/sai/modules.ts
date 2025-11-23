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
    tagline: 'Work Smarter, Not Harder—Your AI Assistant Handles Scheduling, Research, and Insights',
    description: 'SAI Assistant is your AI assistant powered by 12+ models (Llama 3.3 70B, GPT-4o, Claude 3.5, Gemini 2.0). It can update deals ("Mark the Johnson deal as under contract"), draft emails, search listings, and answer questions—all conversationally. Real estate trained.',
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
        name: 'Voice-Activated CRM Updates',
        icon: Zap,
        painPoint: 'Agents waste 13.1 hours per week manually updating CRM between appointments—"I forgot to update the CRM" is a common excuse',
        solution: 'Update deals hands-free while driving with voice commands: "Update the Johnson deal to under contract"—saves 13+ hours/week',
        sourceUrl: 'https://followupace.com/blog/ultimate-guide-to-voice-and-video-features-in-follow-up-boss'
      },
      {
        name: '12+ AI Models',
        icon: Target,
        painPoint: 'Single-model AI tools (ChatGPT, Claude) limit agents to one approach—different tasks need different AI strengths',
        solution: 'Access 12+ AI models (Llama 3.3 70B, GPT-4o, Claude 3.5, Gemini 2.0) and choose the best model for each task',
        sourceUrl: 'https://ascendix.com/blog/ai-real-estate-agents'
      },
      {
        name: 'Real Estate Trained',
        icon: FileText,
        painPoint: "Generic AI tools don't understand real estate terminology (MLS, contracts, commissions, escrow)—agents waste time explaining basics",
        solution: 'AI assistant trained on real estate workflows knows MLS, contracts, and commissions—no explaining required',
        sourceUrl: 'https://realoffice360.com/article/ai-impact-on-real-estate-crm'
      },
      {
        name: 'Tool Calling & Integration',
        icon: BarChart,
        painPoint: 'Agents constantly switch between apps to update deals, schedule tasks, and search listings—15+ hours/week lost to context switching',
        solution: 'AI directly updates CRM, schedules tasks, and searches listings via tool calling—eliminate app-switching entirely',
        sourceUrl: 'https://voagents.ai/real-estate'
      }
    ]
  },
  {
    id: 'crm',
    icon: Users,
    title: 'CRM & Lead Management',
    tagline: 'Close 30% More Deals—Never Miss a Follow-Up or Lose a Lead Again',
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
    ctaHref: '/platform',
    painPoints: [
      'Leads fall through the cracks with no centralized system',
      'Manually tracking follow-ups in spreadsheets wastes hours daily',
    ],
    outcomes: [
      'Auto-capture every lead from all sources instantly',
      'AI predicts which leads will close (35% higher conversion)',
    ],
    badge: 'Close 30% More Deals',
    accentColor: 'from-blue-500/20 to-blue-600/20',
    detailedFeatures: [
      {
        name: 'AI Lead Scoring',
        icon: Target,
        painPoint: 'Agents waste 60% of their time on leads that never convert, with average conversion rates of only 0.5-1.2%',
        solution: 'AI lead scoring achieves 85-92% accuracy in predicting sales outcomes, improving conversion rates by 25-30%',
        sourceUrl: 'https://resources.insiderealestate.com/trending-now/10-real-pain-points-agents-are-facing-today-and-how-to-push-through'
      },
      {
        name: 'Automated Follow-Ups',
        icon: Clock,
        painPoint: 'One-minute response times increase conversions by 391%, but agents struggle to respond quickly without automation',
        solution: 'Automated follow-up sequences ensure instant responses and nurture campaigns that produce 119% higher click-through rates',
        sourceUrl: 'https://theclose.com/real-estate-lead-generation-statistics/'
      },
      {
        name: 'Pipeline Management',
        icon: BarChart,
        painPoint: 'Teams using 3+ different CRMs have zero visibility into the shared pipeline, causing lost deals',
        solution: 'Visual Kanban pipeline tracking gives entire team real-time visibility, increasing deals closed by 30%',
        sourceUrl: 'https://www.salesmate.io/blog/problems-of-being-in-real-estate-industry/'
      },
      {
        name: 'Unlimited Contacts',
        icon: DollarSign,
        painPoint: 'Per-contact fees from competitors like Follow Up Boss cost $69/user/month, adding up quickly for growing databases',
        solution: 'Unlimited contacts at no extra cost—add 10,000 contacts without increasing your bill',
        sourceUrl: 'https://leadsync.me/blog/real-estate-crms/'
      }
    ]
  },
  {
    id: 'office',
    icon: Building2,
    title: 'The Office',
    tagline: 'Cut Transaction Time in Half—Manage Docs, Signatures, and Compliance in One Place',
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
    ctaHref: '/platform',
    painPoints: [
      'Juggling multiple tools for contracts, signatures, and checklists',
      'Missing closing deadlines costs deals and reputation',
    ],
    outcomes: [
      'All deal documents in one searchable location',
      'Automated workflows reduce deal admin time by 50%',
    ],
    badge: 'Save 10hrs/Week',
    accentColor: 'from-green-500/20 to-green-600/20',
    detailedFeatures: [
      {
        name: 'Auto-Generated Workflows',
        icon: Zap,
        painPoint: 'Agents spend 30 hours per transaction on administrative tasks, with 90% of closing tasks requiring manual effort',
        solution: 'Each deal type auto-generates 8-15 task workflows, reducing transaction admin time by 50% (save 10 hours/week)',
        sourceUrl: 'https://www.luxurypresence.com/blogs/real-estate-transaction-coordination/'
      },
      {
        name: 'Deadline Tracking',
        icon: Clock,
        painPoint: 'Missing closing deadlines costs deals and damages reputation—transaction delays are often caused by admin burden and human error',
        solution: 'Automated deadline tracking with email/SMS reminders ensures you never miss a critical date, achieving 95% reduction in compliance issues',
        sourceUrl: 'https://www.luxurypresence.com/blogs/real-estate-transaction-coordination/'
      },
      {
        name: 'Document Management',
        icon: FileText,
        painPoint: 'Real estate transactions involve substantial paperwork including contracts, disclosures, and inspection reports—disorganized systems lead to lost documents',
        solution: 'Centralized document storage with searchable contracts, disclosures, and compliance checklists in one location',
        sourceUrl: 'https://realestate.usnews.com/real-estate/articles/what-is-a-transaction-coordinator'
      },
      {
        name: '6 Deal Types Supported',
        icon: BarChart,
        painPoint: 'Investment deals, rentals, and FSBO transactions require different workflows—most CRMs only support basic buyer/seller deals',
        solution: 'Supports HOME_BUYING, HOME_SELLING, RENTAL_LANDLORD, RENTAL_TENANT, INVESTMENT_PROPERTY, and FSBO with customized workflows for each',
        sourceUrl: 'https://www.salesmate.io/blog/problems-of-being-in-real-estate-industry/'
      }
    ]
  },
  {
    id: 'studio',
    icon: Mail,
    title: 'Content Studio',
    tagline: 'Save 15 Hours/Week—AI Writes Your Listings, Social Posts, and Email Campaigns',
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
    ctaHref: '/platform',
    painPoints: [
      'Spending 10+ hours/week writing listings and social content',
      'Inconsistent marketing across email, social, and campaigns',
    ],
    outcomes: [
      'AI generates property listings, blog posts, and social content in seconds',
      'Automated drip campaigns nurture leads while you focus on closings',
    ],
    badge: '80% Faster Content',
    accentColor: 'from-purple-500/20 to-purple-600/20',
    detailedFeatures: [
      {
        name: 'AI Content Generation',
        icon: Zap,
        painPoint: 'Agents spend 15-20 hours per week creating listing descriptions, social posts, and email campaigns from scratch',
        solution: 'AI generates property listings, blog posts, and social content in seconds—reducing content creation time to 3-5 hours/week (80% faster)',
        sourceUrl: 'https://www.colibrirealestate.com/career-hub/blog/ai-prompts-for-real-estate-agents/'
      },
      {
        name: 'Email Marketing Automation',
        icon: Mail,
        painPoint: 'Drip campaigns manually managed produce poor results—agents struggle with segmentation and timing',
        solution: 'Automated drip campaigns produce 119% higher click-through rates than one-time emails, with segmented campaigns achieving 30% more opens',
        sourceUrl: 'https://www.followupboss.com/blog/real-estate-drip-email'
      },
      {
        name: 'Multi-Platform Social Scheduling',
        icon: BarChart,
        painPoint: '67% of real estate marketers plan to increase social media budgets, but agents spend hours per week thinking of engaging posts',
        solution: 'Schedule content across 6 platforms (Facebook, Instagram, LinkedIn, Twitter, TikTok, YouTube) from one calendar view',
        sourceUrl: 'https://resimpli.com/blog/real-estate-social-media-statistics/'
      },
      {
        name: 'Auto-Sync with CRM',
        icon: Target,
        painPoint: 'Manually importing contacts between CRM and email platforms wastes hours and creates data silos',
        solution: 'All contacts auto-sync from CRM to Content Studio—update once, market everywhere',
        sourceUrl: 'https://www.salesmate.io/blog/problems-of-being-in-real-estate-industry/'
      }
    ]
  },
  {
    id: 'reid',
    icon: TrendingUp,
    title: 'REID',
    tagline: 'Make Smarter Offers—AI Analyzes Market Data to Predict Property Value and ROI',
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
    ctaHref: '/platform',
    painPoints: [
      'Paying $300+/month for CoStar or similar market data tools',
      'Making offers blind without access to investment-grade comps',
    ],
    outcomes: [
      'Institutional-grade market data included at no extra cost',
      'AI-powered ROI calculator predicts cash flow and appreciation',
    ],
    badge: 'Save $300/Month',
    accentColor: 'from-teal-500/20 to-teal-600/20',
    detailedFeatures: [
      {
        name: 'ROI Calculator',
        icon: DollarSign,
        painPoint: 'Creating investment reports manually takes 3 hours per property—clients demand data-driven recommendations',
        solution: 'AI-powered ROI calculator generates cap rate, cash flow, and appreciation analysis in 15 minutes (vs. 3 hours)',
        sourceUrl: 'https://www.coraly.ai/en/blogs/how-to-qualify-real-estate-leads'
      },
      {
        name: 'Market Data Access',
        icon: BarChart,
        painPoint: 'Agents pay $300/month for CoStar subscription plus $150/month for property comps ($450/month total)',
        solution: 'Institutional-grade market data included at no extra cost—save $300/month vs. CoStar subscription',
        sourceUrl: 'https://www.vendr.com/buyer-guides/costar'
      },
      {
        name: 'Comp Analysis',
        icon: FileText,
        painPoint: 'Agents manually pull and harmonize data from multiple sources (MLS, public records, online platforms) for CMAs',
        solution: 'AI automatically identifies most relevant comparable sales based on location, property size, and condition—shaves hours off CMA process',
        sourceUrl: 'https://www.datagrid.com/blog/ai-agents-automate-cma-real-estate'
      },
      {
        name: 'Investment Property Search',
        icon: Target,
        painPoint: 'Investor agents lack tools to filter properties by investment-grade metrics (cap rate, cash flow, rental yield)',
        solution: 'Property search with investment-specific filters helps investor agents win 12+ additional clients/year at higher commissions ($15,000 vs. $8,000)',
        sourceUrl: 'https://www.coraly.ai/en/blogs/how-to-qualify-real-estate-leads'
      }
    ]
  },
  {
    id: 'taxes',
    icon: Calculator,
    title: 'Taxes & Expenses',
    tagline: 'QuickBooks Sync—Track Every Deduction and Eliminate Tax Season Stress',
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
      'Save $2,000+/year by maximizing deductions',
      'Reduce tax prep time by 80% (vs. shoebox method)',
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
      'Missing deductions costs agents $2,000-$5,000/year in overpaid taxes',
    ],
    outcomes: [
      'All expenses categorized and receipts stored in one place',
      'Automatic quarterly reports keep you tax-ready year-round',
    ],
    badge: 'QuickBooks Sync—1099-Ready',
    accentColor: 'from-emerald-500/20 to-emerald-600/20',
    detailedFeatures: [
      {
        name: 'IRS-Aligned Categories',
        icon: FileText,
        painPoint: 'Real estate agents miss 20-30% of eligible deductions due to poor expense categorization, overpaying taxes by $2,000-$5,000 annually',
        solution: '14 IRS-aligned categories (VEHICLE, MARKETING, OFFICE, etc.) ensure you capture every deductible expense correctly',
        sourceUrl: 'https://www.irs.gov/businesses/small-businesses-self-employed/real-estate-agents'
      },
      {
        name: 'Receipt Management',
        icon: Camera,
        painPoint: 'Agents waste 15-20 hours at tax time searching for lost receipts, and 1 in 3 lose critical documentation',
        solution: 'Photo upload stores all receipts in the cloud, searchable by category, date, or vendor—never lose a receipt again',
        sourceUrl: 'https://www.nar.realtor/taxes'
      },
      {
        name: 'Quarterly Tax Reports',
        icon: Calculator,
        painPoint: 'Unexpected quarterly tax bills cause cash flow crises—agents underestimate by 30-40% without tracking',
        solution: 'Automated quarterly summary reports with tax estimate calculations prevent surprises and improve cash flow planning',
        sourceUrl: 'https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes'
      },
      {
        name: 'QuickBooks Integration',
        icon: DollarSign,
        painPoint: 'CPAs charge $500-$1,500 extra to organize disorganized expense records—many agents pay premium fees and waste hours on double data entry',
        solution: 'QuickBooks Online sync (Q2 2025) eliminates double entry. One-click CSV export or Schedule C-ready tax package saves $500-$1,500 in CPA fees',
        sourceUrl: 'https://www.nar.realtor/taxes'
      }
    ]
  },
];
