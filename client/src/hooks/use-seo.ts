import { useMemo } from 'react';
import { useLocation } from 'wouter';
import { getPageSEO } from '@/lib/seo-config';
import { SEOConfig } from '@/types/seo';

interface UseSEOOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product' | 'business.business';
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: 'organization' | 'service' | 'faq';
  serviceType?: string;
}

export const useSEO = (options: UseSEOOptions = {}) => {
  const [location] = useLocation();
  
  const seoConfig = useMemo(() => {
    const baseSEO = getPageSEO(location);
    
    // Override with custom options
    const customSEO: SEOConfig = {
      ...baseSEO,
      ...(options.title && { title: options.title }),
      ...(options.description && { description: options.description }),
      ...(options.keywords && { keywords: [...(baseSEO.keywords || []), ...options.keywords] }),
      ...(options.ogImage && { ogImage: options.ogImage }),
      ...(options.ogType && { ogType: options.ogType }),
      ...(options.noindex !== undefined && { noindex: options.noindex }),
      ...(options.nofollow !== undefined && { nofollow: options.nofollow }),
      ...(options.structuredData && { structuredData: options.structuredData }),
      canonical: `https://strive-tech-website.com${location}`
    };
    
    return customSEO;
  }, [location, options]);

  return {
    seoConfig,
    location,
    structuredDataType: options.structuredData,
    serviceType: options.serviceType
  };
};

// Hook for breadcrumbs generation
export const useBreadcrumbs = () => {
  const [location] = useLocation();
  
  const breadcrumbs = useMemo(() => {
    const paths = location.split('/').filter(Boolean);
    const crumbs = [{ name: 'Home', url: '/' }];
    
    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      
      // Convert path to readable name
      const name = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      crumbs.push({
        name,
        url: currentPath
      });
    });
    
    return crumbs;
  }, [location]);
  
  return breadcrumbs;
};

// Hook for dynamic page titles
export const usePageTitle = (title?: string, suffix: string = 'Strive Tech') => {
  const [location] = useLocation();
  const { seoConfig } = useSEO();
  
  const pageTitle = useMemo(() => {
    if (title) {
      return `${title} | ${suffix}`;
    }
    
    return seoConfig.title;
  }, [title, suffix, seoConfig.title]);
  
  return pageTitle;
};

export default useSEO;