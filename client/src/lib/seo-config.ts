import { SEOConfig, OrganizationSchema, ServiceSchema } from '@/types/seo';

// Base SEO configuration
export const baseSEO: SEOConfig = {
  title: 'Strive Tech - AI-Powered Business Solutions',
  description: 'Transform your business with cutting-edge AI solutions, automation, and data analytics. Expert AI consulting, machine learning, and digital transformation services.',
  keywords: [
    'AI solutions',
    'artificial intelligence',
    'machine learning',
    'business automation',
    'data analytics',
    'digital transformation',
    'AI consulting',
    'enterprise AI',
    'business intelligence',
    'computer vision',
    'natural language processing',
    'predictive analytics'
  ],
  ogImage: '/images/og-default.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  canonical: 'https://strivetech.ai',
};

// Page-specific SEO configurations
export const pageSEO: Record<string, SEOConfig> = {
  '/': {
    title: 'Strive Tech - AI Solutions & Digital Transformation',
    description: 'Leading AI consulting firm specializing in machine learning, automation, and data analytics. Transform your business with AI solutions.',
    keywords: ['AI consulting', 'machine learning', 'business automation', 'digital transformation', 'enterprise AI'],
    ogType: 'website',
    structuredData: 'organization'
  },
  
  '/solutions': {
    title: 'Strive Tech AI Solutions - ML, Automation & Analytics',
    description: 'Comprehensive AI solutions including machine learning, computer vision, NLP, and business automation. Explore our cutting-edge services.',
    keywords: ['AI solutions', 'machine learning services', 'computer vision', 'NLP', 'business automation'],
    ogType: 'website'
  },
  
  '/solutions/ai-automation': {
    title: 'Strive AI Automation - Streamline Business Processes',
    description: 'Automate repetitive tasks, optimize workflows, and boost productivity with our advanced AI automation solutions. Custom automation for every industry.',
    keywords: ['AI automation', 'process automation', 'workflow optimization', 'business efficiency', 'intelligent automation'],
    structuredData: 'service'
  },
  
  '/solutions/computer-vision': {
    title: 'Strive Computer Vision - AI-Powered Visual Intelligence',
    description: 'Advanced computer vision and image recognition solutions. Object detection, facial recognition, quality control, and visual analytics powered by AI.',
    keywords: ['computer vision', 'image recognition', 'object detection', 'visual AI', 'machine vision'],
    structuredData: 'service'
  },
  
  '/solutions/data-analytics': {
    title: 'Strive AI Data Analytics - Business Intelligence',
    description: 'Transform raw data into actionable insights with our AI-powered analytics platform. Predictive modeling, real-time dashboards, and business intelligence.',
    keywords: ['data analytics', 'business intelligence', 'predictive analytics', 'AI insights', 'data science'],
    structuredData: 'service'
  },
  
  '/solutions/healthcare': {
    title: 'Strive Healthcare AI - Medical Technology Solutions',
    description: 'Revolutionary AI solutions for healthcare: medical imaging, patient analytics, drug discovery, and clinical decision support systems.',
    keywords: ['healthcare AI', 'medical technology', 'clinical AI', 'health analytics', 'medical imaging'],
    structuredData: 'service'
  },
  
  '/solutions/financial': {
    title: 'Strive Financial AI - FinTech & Banking Technology',
    description: 'AI-powered financial services: fraud detection, risk assessment, algorithmic trading, and customer analytics for banks and fintech companies.',
    keywords: ['financial AI', 'fintech solutions', 'fraud detection', 'risk management', 'banking AI'],
    structuredData: 'service'
  },
  
  '/solutions/retail': {
    title: 'Strive Retail AI - E-commerce & Customer Intelligence',
    description: 'Transform retail with AI: personalization engines, inventory optimization, demand forecasting, and customer behavior analysis.',
    keywords: ['retail AI', 'e-commerce AI', 'personalization', 'inventory optimization', 'customer analytics'],
    structuredData: 'service'
  },
  
  '/solutions/manufacturing': {
    title: 'Strive Manufacturing AI - Smart Factory Solutions',
    description: 'Industry 4.0 solutions: predictive maintenance, quality control, supply chain optimization, and smart manufacturing with AI.',
    keywords: ['manufacturing AI', 'Industry 4.0', 'predictive maintenance', 'smart factory', 'industrial AI'],
    structuredData: 'service'
  },
  
  '/solutions/education': {
    title: 'Strive Education AI - EdTech & Learning Analytics',
    description: 'Revolutionary educational technology: personalized learning, student analytics, automated grading, and AI-powered tutoring systems.',
    keywords: ['education AI', 'EdTech solutions', 'personalized learning', 'learning analytics', 'AI tutoring'],
    structuredData: 'service'
  },
  
  '/company': {
    title: 'About Strive Tech - Leading AI Consulting Company',
    description: 'Meet our expert team of AI engineers, data scientists, and business consultants. Learn about our mission to transform businesses with artificial intelligence.',
    keywords: ['AI company', 'AI consulting team', 'machine learning experts', 'data scientists', 'AI engineers'],
    ogType: 'website'
  },
  
  '/portfolio': {
    title: 'Strive Tech Portfolio - AI Success Stories & Cases',
    description: 'Explore our successful AI implementations across industries. Real-world case studies showcasing the power of artificial intelligence in business.',
    keywords: ['AI portfolio', 'AI case studies', 'AI success stories', 'machine learning projects', 'AI implementations'],
    ogType: 'website'
  },
  
  '/contact': {
    title: 'Contact Strive Tech - Get Started with AI Solutions',
    description: 'Ready to transform your business with AI? Contact our expert team for a consultation. Get started with cutting-edge artificial intelligence solutions.',
    keywords: ['AI consultation', 'contact AI experts', 'AI services inquiry', 'machine learning consulting', 'AI transformation'],
    ogType: 'website'
  },
  
  '/resources': {
    title: 'Strive AI Resources - Guides, Insights & Knowledge',
    description: 'Comprehensive AI resources: implementation guides, industry insights, whitepapers, and expert knowledge about artificial intelligence and machine learning.',
    keywords: ['AI resources', 'AI guides', 'machine learning insights', 'AI whitepapers', 'AI knowledge'],
    ogType: 'website'
  },
  
  '/assessment': {
    title: 'Strive AI Assessment - Business AI Readiness Evaluation',
    description: 'Assess your business readiness for AI implementation. Free evaluation tool to identify opportunities and create your AI transformation roadmap.',
    keywords: ['AI assessment', 'AI readiness', 'AI evaluation', 'AI transformation', 'business AI audit'],
    ogType: 'website'
  },
  
  '/request': {
    title: 'Strive AI Consultation - Start Your Transformation',
    description: 'Request a personalized AI consultation. Our experts will analyze your needs and propose custom artificial intelligence solutions for your business.',
    keywords: ['AI consultation request', 'AI proposal', 'custom AI solutions', 'AI project inquiry', 'AI consulting services'],
    ogType: 'website'
  }
};

// Organization structured data
export const organizationSchema: OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Strive Tech',
  url: 'https://strivetech.ai',
  logo: 'https://strivetech.ai/logo.png',
  description: 'Leading AI consulting firm specializing in machine learning, automation, and data analytics solutions for businesses.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Innovation Drive',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94105',
    addressCountry: 'US'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-STRIVE-1',
    contactType: 'customer service',
    email: 'info@strive-tech.com'
  },
  sameAs: [
    'https://www.linkedin.com/company/strive-tech',
    'https://twitter.com/strivetechAI',
    'https://www.facebook.com/strivetechAI'
  ],
  foundingDate: '2020',
  numberOfEmployees: '50-100',
  industry: 'Artificial Intelligence Consulting',
  services: [
    'AI Consulting',
    'Machine Learning Solutions',
    'Data Analytics',
    'Business Automation',
    'Computer Vision',
    'Natural Language Processing'
  ]
};

// Service schemas for solution pages
export const serviceSchemas: Record<string, ServiceSchema> = {
  'ai-automation': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Automation Solutions',
    description: 'Automate business processes and workflows using advanced artificial intelligence and machine learning technologies.',
    provider: {
      '@type': 'Organization',
      name: 'Strive Tech'
    },
    areaServed: 'Worldwide',
    serviceType: 'AI Automation Consulting',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock'
    }
  },
  'computer-vision': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Computer Vision Solutions',
    description: 'Advanced computer vision and image recognition solutions for business applications.',
    provider: {
      '@type': 'Organization',
      name: 'Strive Tech'
    },
    areaServed: 'Worldwide',
    serviceType: 'Computer Vision Consulting',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock'
    }
  },
  'data-analytics': {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Data Analytics',
    description: 'Transform data into actionable insights with AI-powered analytics and business intelligence solutions.',
    provider: {
      '@type': 'Organization',
      name: 'Strive Tech'
    },
    areaServed: 'Worldwide',
    serviceType: 'Data Analytics Consulting',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock'
    }
  }
};

// Common FAQ schema
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What AI solutions does Strive Tech offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Strive Tech offers comprehensive AI solutions including machine learning, computer vision, natural language processing, data analytics, business automation, and custom AI development for various industries.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long does AI implementation typically take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI implementation timelines vary based on project complexity, ranging from 4-6 weeks for simple automation to 6-12 months for comprehensive enterprise AI solutions.'
      }
    },
    {
      '@type': 'Question',
      name: 'What industries do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We serve multiple industries including healthcare, finance, retail, manufacturing, education, and more, providing tailored AI solutions for each sector.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you provide ongoing support after AI implementation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we provide comprehensive ongoing support including maintenance, updates, monitoring, and optimization to ensure your AI solutions continue to deliver value.'
      }
    }
  ]
};

// Generate page-specific SEO with defaults
export function getPageSEO(pathname: string): SEOConfig {
  const pageConfig = pageSEO[pathname] || {};
  
  return {
    ...baseSEO,
    ...pageConfig,
    title: pageConfig.title || baseSEO.title,
    description: pageConfig.description || baseSEO.description,
    canonical: `https://strivetech.ai${pathname}`,
    keywords: [...(baseSEO.keywords || []), ...(pageConfig.keywords || [])]
  };
}