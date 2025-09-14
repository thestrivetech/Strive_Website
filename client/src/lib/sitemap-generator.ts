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
    url: '/solutions',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/company',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/portfolio',
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
    url: '/resources',
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/assessment',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/request',
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: new Date().toISOString().split('T')[0]
  },

  // Solution pages - high priority
  {
    url: '/solutions/ai-automation',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/solutions/computer-vision',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/solutions/data-analytics',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/solutions/blockchain',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/solutions/business-intelligence',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/solutions/security-compliance',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/solutions/smart-business',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/solutions/technology',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },

  // Industry-specific solutions
  {
    url: '/solutions/healthcare',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/solutions/financial',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/solutions/retail',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/solutions/manufacturing',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/solutions/education',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString().split('T')[0]
  },

  // Technology pages
  {
    url: '/solutions/technologies/ai-ml',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/solutions/technologies/computer-vision',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/solutions/technologies/nlp',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString().split('T')[0]
  },

  // Case studies
  {
    url: '/solutions/case-studies/healthcare',
    changefreq: 'monthly',
    priority: 0.6,
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

export async function generateSitemap(baseUrl: string = 'https://strive-tech-website.com'): Promise<string> {
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

// Generate sitemap index for multiple sitemaps
export async function generateSitemapIndex(baseUrl: string = 'https://strive-tech-website.com'): Promise<string> {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-pages.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-solutions.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;
  
  return sitemapIndex;
}

// Generate solution-specific sitemap
export async function generateSolutionsSitemap(baseUrl: string = 'https://strive-tech-website.com'): Promise<string> {
  const solutionPages = sitemapPages.filter(page => page.url.startsWith('/solutions'));
  
  const stream = new SitemapStream({ hostname: baseUrl });
  const links = solutionPages.map(page => ({
    url: page.url,
    changefreq: page.changefreq,
    priority: page.priority,
    lastmod: page.lastmod
  }));

  return streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString()
  );
}

// Generate main pages sitemap
export async function generatePagesSitemap(baseUrl: string = 'https://strive-tech-website.com'): Promise<string> {
  const mainPages = sitemapPages.filter(page => !page.url.startsWith('/solutions') || page.url === '/solutions');
  
  const stream = new SitemapStream({ hostname: baseUrl });
  const links = mainPages.map(page => ({
    url: page.url,
    changefreq: page.changefreq,
    priority: page.priority,
    lastmod: page.lastmod
  }));

  return streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString()
  );
}