import express from 'express';
import { generateSitemap, generateSitemapIndex, generateSolutionsSitemap, generatePagesSitemap } from '../client/src/lib/sitemap-generator';

const router = express.Router();

// Main sitemap endpoint
router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const sitemap = await generateSitemap(baseUrl);
    
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
    const sitemapIndex = await generateSitemapIndex(baseUrl);
    
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
    const sitemap = await generateSolutionsSitemap(baseUrl);
    
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
    const sitemap = await generatePagesSitemap(baseUrl);
    
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating pages sitemap:', error);
    res.status(500).send('Error generating pages sitemap');
  }
});

export { router as sitemapRouter };