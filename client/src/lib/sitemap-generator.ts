import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export interface SitemapPage {
  url: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  lastmod?: string;
}

// Define all pages with their SEO properties
export const sitemapPages: SitemapPage[] = [
  // Main pages
  {
    url: '/',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/pricing',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/resources',
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/chatbot-sai',
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/analytics-dashboard',
    changefreq: 'monthly',
    priority: 0.5,
    lastmod: new Date().toISOString().split('T')[0]
  },

  // Legal pages
  {
    url: '/privacy',
    changefreq: 'yearly',
    priority: 0.3,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/terms',
    changefreq: 'yearly',
    priority: 0.3,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/cookies',
    changefreq: 'yearly',
    priority: 0.3,
    lastmod: new Date().toISOString().split('T')[0]
  }
];

export async function generateSitemap(baseUrl: string = 'https://strivetech.ai'): Promise<string> {
  // Create a stream to write to
  const stream = new SitemapStream({ hostname: baseUrl });

  // Add pages to sitemap
  const links = sitemapPages.map(page => ({
    url: page.url,
    changefreq: page.changefreq,
    priority: page.priority,
    lastmod: page.lastmod
  }));

  // Return the sitemap as a string
  return streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString()
  );
}

// Generate sitemap index for multiple sitemaps (simplified - no separate solution sitemap needed)
export async function generateSitemapIndex(baseUrl: string = 'https://strivetech.ai'): Promise<string> {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;

  return sitemapIndex;
}