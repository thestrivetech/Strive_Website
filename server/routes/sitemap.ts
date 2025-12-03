import express from 'express';
// SAI Platform by Strive Tech - Dynamic Sitemap Routes
// All-in-One AI Operating System for Real Estate

const router = express.Router();

// Main sitemap endpoint - Current active routes only
router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const lastmod = new Date().toISOString().split('T')[0];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- SAI Platform by Strive Tech - All-in-One AI Operating System for Real Estate -->
  <!-- Main Pages -->
  <url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority><lastmod>${lastmod}</lastmod></url>
  <url><loc>${baseUrl}/about</loc><changefreq>monthly</changefreq><priority>0.9</priority><lastmod>${lastmod}</lastmod></url>
  <url><loc>${baseUrl}/contact</loc><changefreq>monthly</changefreq><priority>0.9</priority><lastmod>${lastmod}</lastmod></url>
  <url><loc>${baseUrl}/pricing</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${lastmod}</lastmod></url>
  <url><loc>${baseUrl}/resources</loc><changefreq>weekly</changefreq><priority>0.8</priority><lastmod>${lastmod}</lastmod></url>
  <!-- Legal Pages -->
  <url><loc>${baseUrl}/privacy</loc><changefreq>yearly</changefreq><priority>0.3</priority><lastmod>${lastmod}</lastmod></url>
  <url><loc>${baseUrl}/terms</loc><changefreq>yearly</changefreq><priority>0.3</priority><lastmod>${lastmod}</lastmod></url>
  <url><loc>${baseUrl}/cookies</loc><changefreq>yearly</changefreq><priority>0.3</priority><lastmod>${lastmod}</lastmod></url>
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

// Sitemap index
router.get('/sitemap', async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const lastmod = new Date().toISOString().split('T')[0];

    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${baseUrl}/api/sitemap.xml</loc><lastmod>${lastmod}</lastmod></sitemap>
</sitemapindex>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(sitemapIndex);
  } catch (error) {
    console.error('Error generating sitemap index:', error);
    res.status(500).send('Error generating sitemap index');
  }
});

// Pages sitemap (alias for main sitemap)
router.get('/sitemap-pages.xml', async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const lastmod = new Date().toISOString().split('T')[0];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- SAI Platform by Strive Tech - Pages Sitemap -->
  <url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority><lastmod>${lastmod}</lastmod></url>
  <url><loc>${baseUrl}/about</loc><changefreq>monthly</changefreq><priority>0.9</priority><lastmod>${lastmod}</lastmod></url>
  <url><loc>${baseUrl}/contact</loc><changefreq>monthly</changefreq><priority>0.9</priority><lastmod>${lastmod}</lastmod></url>
  <url><loc>${baseUrl}/pricing</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${lastmod}</lastmod></url>
  <url><loc>${baseUrl}/resources</loc><changefreq>weekly</changefreq><priority>0.8</priority><lastmod>${lastmod}</lastmod></url>
  <url><loc>${baseUrl}/privacy</loc><changefreq>yearly</changefreq><priority>0.3</priority><lastmod>${lastmod}</lastmod></url>
  <url><loc>${baseUrl}/terms</loc><changefreq>yearly</changefreq><priority>0.3</priority><lastmod>${lastmod}</lastmod></url>
  <url><loc>${baseUrl}/cookies</loc><changefreq>yearly</changefreq><priority>0.3</priority><lastmod>${lastmod}</lastmod></url>
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating pages sitemap:', error);
    res.status(500).send('Error generating pages sitemap');
  }
});

export { router as sitemapRouter };
