import { SEOConfig, OrganizationSchema } from '@/types/seo';

// Base SEO configuration - SAI Platform: All-in-One AI Operating System for Real Estate
export const baseSEO: SEOConfig = {
  title: 'SAI Platform - The All-in-One AI Operating System for Real Estate',
  description: 'Replace 8+ tools with one platform. SAI combines AI assistant, CRM, transaction management, marketing automation, market data, and tax tracking—built for modern real estate professionals.',
  keywords: [
    'real estate software',
    'AI real estate',
    'real estate operating system',
    'real estate automation',
    'real estate AI assistant',
    'transaction management',
    'real estate marketing',
    'real estate CRM',
    'REID',
    'real estate investment data',
    'real estate tax tracking',
    'real estate agent tools',
    'brokerage software',
    'real estate technology'
  ],
  ogImage: '/images/og-default.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  canonical: 'https://strivetech.ai',
};

// Page-specific SEO configurations
export const pageSEO: Record<string, SEOConfig> = {
  '/': {
    title: 'SAI Platform - The All-in-One AI Operating System for Real Estate',
    description: 'Replace 8+ tools with one platform. AI assistant, CRM, transaction management, marketing, market data & tax tracking—$499/month unlimited. Free tier available.',
    keywords: ['real estate operating system', 'AI real estate platform', 'all-in-one real estate software', 'SAI Platform'],
    ogType: 'website',
    structuredData: 'organization'
  },

  '/about': {
    title: 'About SAI Platform - Built for Modern Real Estate Professionals',
    description: 'Learn how SAI Platform combines 6 powerful modules into one AI-native operating system designed specifically for real estate workflows. Replace 8+ separate tools.',
    keywords: ['about SAI Platform', 'real estate technology company', 'AI real estate platform', 'Strive Tech'],
    ogType: 'website',
    structuredData: 'organization'
  },

  '/contact': {
    title: 'Contact | SAI Platform - Start Your Free Trial',
    description: 'Ready to consolidate your real estate tech stack? Contact us for a demo or start your free trial. Experience all 6 modules of SAI Platform today.',
    keywords: ['contact SAI Platform', 'SAI Platform demo', 'real estate software demo', 'free trial'],
    ogType: 'website'
  },

  '/resources': {
    title: 'Resources | SAI Platform - Real Estate AI Insights & Guides',
    description: 'Expert insights, case studies, and guides for real estate professionals embracing AI-powered workflows. Learn to maximize your productivity with SAI Platform.',
    keywords: ['real estate AI resources', 'real estate guides', 'real estate case studies', 'AI insights', 'agent resources'],
    ogType: 'website'
  },

  '/pricing': {
    title: 'Pricing | SAI Platform - Free Forever or $499/month Unlimited',
    description: 'Free tier with all 6 modules or Elite at $499/month with unlimited everything. Replace $600-1,000+/month in separate tools with one platform.',
    keywords: ['SAI Platform pricing', 'real estate software pricing', 'all-in-one pricing', 'free real estate CRM'],
    ogType: 'website'
  },

  '/onboarding': {
    title: 'Get Started | SAI Platform',
    description: 'Complete your SAI Platform setup and start using all 6 modules to transform your real estate business.',
    keywords: ['SAI Platform setup', 'onboarding', 'get started'],
    ogType: 'website',
    noindex: true
  },

  '/login': {
    title: 'Login | SAI Platform',
    description: 'Sign in to your SAI Platform account to access all 6 modules.',
    keywords: ['SAI Platform login', 'sign in'],
    ogType: 'website',
    noindex: true
  },

  '/privacy': {
    title: 'Privacy Policy | SAI Platform',
    description: 'SAI Platform privacy policy. Learn how we protect your data and respect your privacy.',
    keywords: ['privacy policy', 'data protection', 'SAI Platform privacy'],
    ogType: 'website'
  },

  '/terms': {
    title: 'Terms of Service | SAI Platform',
    description: 'SAI Platform terms of service. Read our terms and conditions for using the platform.',
    keywords: ['terms of service', 'terms and conditions', 'SAI Platform terms'],
    ogType: 'website'
  },

  '/cookies': {
    title: 'Cookie Policy | SAI Platform',
    description: 'SAI Platform cookie policy. Learn about how we use cookies to improve your experience.',
    keywords: ['cookie policy', 'cookies', 'SAI Platform cookies'],
    ogType: 'website'
  }
};

// Organization structured data - SAI Platform: All-in-One AI Operating System
export const organizationSchema: OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SAI Platform by Strive Tech',
  url: 'https://strivetech.ai',
  logo: 'https://strivetech.ai/logo.png',
  description: 'All-in-one AI operating system for real estate professionals. SAI Platform combines 6 powerful modules—AI Assistant, CRM, Transaction Management, Marketing Automation, Market Intelligence, and Tax Tracking—into one unified platform.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '',
    addressLocality: 'Nashville',
    addressRegion: 'TN',
    postalCode: '',
    addressCountry: 'US'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-731-431-2320',
    contactType: 'customer service',
    email: 'contact@strivetech.ai'
  },
  sameAs: [
    'https://www.linkedin.com/company/strive-tech-ai',
    'https://twitter.com/strivetech_ai'
  ],
  foundingDate: '2025',
  numberOfEmployees: '1-10',
  industry: 'Real Estate Technology',
  services: [
    'SAI Assistant - AI Personal Assistant',
    'CRM & Lead Management',
    'The Office - Transaction Management',
    'Content Studio - Marketing Automation',
    'REID - Real Estate Investment Data',
    'Taxes & Expenses - 1099 Tax Preparation'
  ]
};

// FAQ schema - All-in-One Platform focused
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is SAI Platform?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SAI Platform is an all-in-one AI operating system built specifically for real estate professionals. It combines 6 powerful modules—SAI Assistant, CRM & Lead Management, The Office (transaction management), Content Studio (marketing), REID (market data), and Taxes & Expenses—into one unified platform that replaces 8+ separate tools.'
      }
    },
    {
      '@type': 'Question',
      name: 'What modules does SAI include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SAI Platform includes 6 core modules: (1) SAI Assistant - AI-powered personal assistant with voice/text, (2) CRM & Lead Management - unlimited contacts with AI scoring, (3) The Office - transaction management for 6+ deal types, (4) Content Studio - marketing automation with AI content generation, (5) REID - real estate investment data and market intelligence, (6) Taxes & Expenses - 1099 tax preparation and expense tracking.'
      }
    },
    {
      '@type': 'Question',
      name: 'How much does SAI cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SAI Platform offers a Free tier with all 6 modules (limited usage) forever, and an Elite tier at $499/month with unlimited everything—unlimited users, contacts, deals, content, and AI queries. The Elite tier replaces $600-1,000+ per month in separate tools.'
      }
    },
    {
      '@type': 'Question',
      name: 'What tools does SAI replace?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SAI Platform replaces 8+ separate tools: CRM systems like Follow Up Boss ($828-3,450/year), transaction management like Dotloop ($360-708/year), email marketing like Mailchimp ($240-600/year), social scheduling like Buffer ($180-600/year), content creation tools ($396/year), market data like CoStar ($3,600+/year), expense tracking like QuickBooks ($360/year), and AI assistants like ChatGPT Plus ($240/year).'
      }
    }
  ]
};

// Service schemas for individual module pages
export const serviceSchemas: Record<string, object> = {
  'sai-assistant': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'SAI Assistant - AI Personal Assistant',
    description: 'AI-powered personal assistant with voice and text interaction, task automation, and multi-model AI support for real estate professionals.',
    provider: {
      '@type': 'Organization',
      name: 'SAI Platform by Strive Tech'
    },
    serviceType: 'AI Assistant'
  },
  'crm': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'CRM & Lead Management',
    description: 'Unlimited contacts with AI lead scoring, pipeline tracking, and automated follow-ups designed specifically for real estate workflows.',
    provider: {
      '@type': 'Organization',
      name: 'SAI Platform by Strive Tech'
    },
    serviceType: 'CRM Software'
  },
  'the-office': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'The Office - Transaction Management',
    description: 'Complete transaction management for 6+ deal types including buyer, seller, and investor transactions with document management and workflow automation.',
    provider: {
      '@type': 'Organization',
      name: 'SAI Platform by Strive Tech'
    },
    serviceType: 'Transaction Management'
  },
  'content-studio': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Content Studio - Marketing Automation',
    description: 'AI-powered content generation, email marketing, and social media scheduling built for real estate marketing needs.',
    provider: {
      '@type': 'Organization',
      name: 'SAI Platform by Strive Tech'
    },
    serviceType: 'Marketing Automation'
  },
  'reid': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'REID - Real Estate Investment Data',
    description: 'Comprehensive market intelligence, ROI calculator, and investment analytics for real estate professionals and investors.',
    provider: {
      '@type': 'Organization',
      name: 'SAI Platform by Strive Tech'
    },
    serviceType: 'Market Intelligence'
  },
  'taxes': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Taxes & Expenses - 1099 Tax Preparation',
    description: '1099 tax preparation, expense tracking, and receipt management designed for real estate agent tax needs.',
    provider: {
      '@type': 'Organization',
      name: 'SAI Platform by Strive Tech'
    },
    serviceType: 'Tax Preparation'
  }
};

// Generate page-specific SEO with defaults
export function getPageSEO(pathname: string): SEOConfig {
  const pageConfig = pageSEO[pathname] || {};

  return {
    ...baseSEO,
    ...pageConfig,
    title: pageConfig.title || baseSEO.title,
    description: pageConfig.description || baseSEO.description,
    canonical: `https://strivetech.ai${pathname === '/' ? '' : pathname}`,
    keywords: [...(baseSEO.keywords || []), ...(pageConfig.keywords || [])]
  };
}
