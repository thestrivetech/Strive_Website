import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOConfig } from '@/types/seo';

interface MetaTagsProps {
  seo: SEOConfig;
}

export const MetaTags: React.FC<MetaTagsProps> = ({ seo }) => {
  const {
    title,
    description,
    keywords = [],
    ogImage = '/images/og-default.jpg',
    ogType = 'website',
    twitterCard = 'summary_large_image',
    canonical,
    noindex = false,
    nofollow = false
  } = seo;

  // Ensure absolute URLs for social media
  const absoluteCanonical = canonical?.startsWith('http') 
    ? canonical 
    : `https://strive-tech-website.com${canonical || ''}`;
    
  const absoluteOgImage = ogImage.startsWith('http') 
    ? ogImage 
    : `https://strive-tech-website.com${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={absoluteCanonical} />}
      
      {/* Robots Meta Tags */}
      <meta 
        name="robots" 
        content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} 
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={absoluteCanonical} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Strive Tech" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@strivetechAI" />
      <meta name="twitter:creator" content="@strivetechAI" />
      
      {/* Additional Meta Tags for Better SEO */}
      <meta name="author" content="Strive Tech" />
      <meta name="publisher" content="Strive Tech" />
      <meta name="copyright" content="© 2024 Strive Tech. All rights reserved." />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Mobile and Responsive */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Theme and Branding */}
      <meta name="theme-color" content="#00C5A1" />
      <meta name="msapplication-TileColor" content="#00C5A1" />
      <meta name="msapplication-navbutton-color" content="#00C5A1" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#00C5A1" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Preconnect to External Domains for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Additional Link Tags */}
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

export default MetaTags;