import express from 'express';
// Note: For now, we'll create simplified sitemaps directly in the routes
// The full sitemap generator can be moved to a shared location if needed

const router = express.Router();

// Main sitemap endpoint
router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    // Simple sitemap generation inline
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${baseUrl}/solutions</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${baseUrl}/company</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/portfolio</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/contact</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${baseUrl}/resources</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>${baseUrl}/assessment</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/request</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${baseUrl}/solutions/ai-automation</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/computer-vision</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/data-analytics</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/healthcare</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/financial</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/retail</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/manufacturing</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/education</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
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
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${baseUrl}/api/sitemap.xml</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod></sitemap>
</sitemapindex>`;
    
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(sitemapIndex);
  } catch (error) {
    console.error('Error generating sitemap index:', error);
    res.status(500).send('Error generating sitemap index');
  }
});

// Solutions sitemap
router.get('/sitemap-solutions.xml', async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/solutions</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${baseUrl}/solutions/ai-automation</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/computer-vision</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/data-analytics</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/healthcare</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/financial</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/retail</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/manufacturing</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/solutions/education</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>`;
    
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating solutions sitemap:', error);
    res.status(500).send('Error generating solutions sitemap');
  }
});

// Pages sitemap  
router.get('/sitemap-pages.xml', async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${baseUrl}/company</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/portfolio</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/contact</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${baseUrl}/resources</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>${baseUrl}/assessment</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/request</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
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