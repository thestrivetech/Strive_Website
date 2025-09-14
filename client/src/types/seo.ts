export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'business.business';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: any;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    '@type': string;
    telephone: string;
    contactType: string;
    email: string;
  };
  sameAs: string[];
  foundingDate: string;
  numberOfEmployees: string;
  industry: string;
  services: string[];
}

export interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
  };
  areaServed: string;
  serviceType: string;
  offers: {
    '@type': string;
    availability: string;
  };
}

export interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

export interface BreadcrumbListSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}