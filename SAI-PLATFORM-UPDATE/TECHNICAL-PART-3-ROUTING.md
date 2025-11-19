# TECHNICAL-PART-3-ROUTING.md

Complete technical implementation guide for routing, URL structure, 301 redirects, sitemap, and SEO-critical infrastructure for the SAI Platform transformation.

**File Status:** ✅ SESSION 3 - READY FOR IMPLEMENTATION
**Priority:** HIGH (Phase 1-2 - Critical for SEO)
**Estimated Lines:** ~1,600
**Dependencies:** NAVIGATION-ROUTING-GUIDE.md, TECHNICAL-PART-1-FILES.md, SEO-PART-1-KEYWORDS.md

---

## Table of Contents

1. [Routing Strategy Overview](#1-routing-strategy-overview)
2. [Current Routes Inventory](#2-current-routes-inventory)
3. [New Routes Structure](#3-new-routes-structure)
4. [301 Redirects Implementation](#4-301-redirects-implementation)
5. [Route Configuration Code](#5-route-configuration-code)
6. [Dynamic Routes & Parameters](#6-dynamic-routes--parameters)
7. [Sitemap.xml Updates](#7-sitemapxml-updates)
8. [Robots.txt Configuration](#8-robotstxt-configuration)
9. [Canonical URLs Strategy](#9-canonical-urls-strategy)
10. [Meta Tags & Open Graph](#10-meta-tags--open-graph)
11. [Testing & Validation](#11-testing--validation)
12. [Definition of Done](#12-definition-of-done)

---

## 1. Routing Strategy Overview

### Objectives
1. **SEO Preservation:** 301 redirect all old URLs to new equivalents to preserve search rankings
2. **Clean URLs:** Use semantic, readable URLs that include target keywords
3. **Consistency:** Standardize URL structure across all pages
4. **Performance:** Implement efficient routing with lazy loading
5. **Future-Proof:** Allow for easy addition of new routes without breaking existing ones

### URL Structure Principles
- **Lowercase:** All URLs lowercase (e.g., `/platform`, not `/Platform`)
- **Hyphens:** Use hyphens for multi-word slugs (e.g., `/case-studies`, not `/case_studies`)
- **No Trailing Slashes:** `/platform` not `/platform/` (consistent)
- **Semantic:** URLs describe content (e.g., `/resources/blog/ai-real-estate-trends`)
- **Flat When Possible:** Minimize nesting depth (2-3 levels max)

### Current vs. New URL Philosophy

**Current (Strive Tech):**
```
/solutions/healthcare
/solutions/financial
/solutions/manufacturing
... (17 industry-specific solution pages)
```
Problem: Generic "solutions" doesn't communicate real estate focus

**New (SAI Platform):**
```
/platform (single page with module deep-dives)
/platform#module-crm (anchor links to sections)
```
Benefit: Focused, product-centric URL structure

---

## 2. Current Routes Inventory

### Existing Routes (38 Total)

**Main Pages (6):**
```
/ - Homepage
/solutions - Solutions landing page
/portfolio - Portfolio showcase
/resources - Resources hub
/about - About/Company page
/contact - Contact form
```

**Solution Pages (17 - TO BE REMOVED):**
```
/solutions/healthcare
/solutions/financial
/solutions/manufacturing
/solutions/retail
/solutions/technology
/solutions/education
/solutions/hospitality
/solutions/logistics
/solutions/energy
/solutions/legal
/solutions/government
/solutions/nonprofit
/solutions/telecommunications
/solutions/project-management
/solutions/business-intelligence
/solutions/process-automation
/solutions/customer-management
```

**Utility Pages (8):**
```
/login - User login
/dashboard - User dashboard (post-login)
/request - Demo request
/assessment - AI readiness assessment
/analytics-dashboard - Analytics viewer
/performance - Performance page
/chatbot-sai - Chatbot demo
/privacy - Privacy policy
```

**Legal Pages (3):**
```
/terms - Terms of service
/cookies - Cookie policy
```

**Error Pages (4):**
```
/404 - Not found
/500 - Server error
/maintenance - Maintenance mode
/unauthorized - Unauthorized access
```

**Total Current Routes:** 38 pages

---

## 3. New Routes Structure

### New Routes to Add (11 New Pages)

**Core Platform Pages (3 NEW):**
```
/platform - Platform overview with 5 module deep-dives
  Replaces: /solutions (redirect)
  Purpose: Primary product showcase
  SEO Target: "real estate CRM", "real estate software", "all-in-one real estate platform"

/pricing - Pricing page with 3 tiers
  NEW: Doesn't currently exist
  Purpose: Conversion-focused pricing information
  SEO Target: "real estate CRM pricing", "how much does SAI cost"

/roadmap - Product roadmap (coming soon features)
  NEW: Doesn't currently exist
  Purpose: Transparency, build excitement for upcoming features
  SEO Target: "SAI roadmap", "upcoming features"
```

**Resources Pages (5 NEW):**
```
/resources - Resources hub landing
  KEEP: Currently exists, but redesign

/resources/case-studies - Case studies listing page
  NEW: Replaces /portfolio
  Purpose: Social proof, real results

/resources/blog - Blog listing page
  NEW: Currently blog posts are at /resources/blog-posts/*
  Purpose: SEO content hub

/resources/whitepapers - Whitepapers listing page
  NEW: Currently at /resources/whitepapers/* (add index)

/resources/help - Help center / docs
  NEW: Self-service support content
```

**Success Stories (1 NEW):**
```
/success-stories - Success stories hub
  Replaces: /portfolio (redirect)
  Purpose: Detailed case studies with metrics
```

**Legal/Support (2 NEW):**
```
/security - Security & compliance information
  NEW: Trust signals for enterprise buyers

/support - Support hub
  NEW: Ticketing, contact support, FAQs
```

### Routes to Remove (17 Solution Pages)
All `/solutions/*` industry pages will be removed. Content may be repurposed into case studies or blog posts where relevant.

### Routes to Keep (21 Existing)
```
/ - Homepage (REDESIGN)
/about - About page (KEEP, minor updates)
/contact - Contact (KEEP, minor updates)
/login - Login (KEEP)
/dashboard - Dashboard (KEEP)
/request - Demo request (KEEP or consolidate into /contact)
/assessment - Assessment (KEEP or consider removal)
/analytics-dashboard - Analytics (KEEP)
/performance - Performance (KEEP)
/chatbot-sai - Chatbot (KEEP)
/privacy - Privacy (KEEP, ensure compliance)
/terms - Terms (KEEP, ensure compliance)
/cookies - Cookies (KEEP, ensure compliance)
/404 - 404 page (KEEP)
/500 - 500 page (KEEP)
/maintenance - Maintenance (KEEP)
/unauthorized - Unauthorized (KEEP)
```

### Total New Route Count: 32 Pages
- Removed: 17 solution pages
- Added: 11 new pages
- Net change: -6 pages (streamlined)

---

## 4. 301 Redirects Implementation

### Critical Redirects (Preserve SEO)

#### Solution Pages → Platform Page
```
/solutions → /platform
/solutions/healthcare → /platform
/solutions/financial → /platform
/solutions/manufacturing → /platform
/solutions/retail → /platform
/solutions/technology → /platform
/solutions/education → /platform
/solutions/hospitality → /platform
/solutions/logistics → /platform
/solutions/energy → /platform
/solutions/legal → /platform
/solutions/government → /platform
/solutions/nonprofit → /platform
/solutions/telecommunications → /platform
/solutions/project-management → /platform
/solutions/business-intelligence → /platform
/solutions/process-automation → /platform
/solutions/customer-management → /platform
```

**Rationale:** All industry-specific solution pages now redirect to the single Platform page, which is real estate-focused. This consolidation improves SEO by concentrating authority on one page rather than diluting across 17 pages.

#### Portfolio → Success Stories
```
/portfolio → /success-stories
/portfolio/* → /success-stories (catch-all for any portfolio sub-pages)
```

#### Blog Structure (if reorganizing)
```
/resources/blog-posts/* → /resources/blog/*
(Only if changing blog URL structure)
```

### Redirect Implementation Code

#### Server-Side (Express.js - `server/index.ts`)

```typescript
// 301 Redirects for SEO preservation
app.get('/solutions', (req, res) => {
  res.redirect(301, '/platform');
});

app.get('/solutions/:industry', (req, res) => {
  res.redirect(301, '/platform');
});

app.get('/portfolio', (req, res) => {
  res.redirect(301, '/success-stories');
});

app.get('/portfolio/:slug', (req, res) => {
  res.redirect(301, '/success-stories');
});

// Optional: Redirect old blog structure to new
app.get('/resources/blog-posts/:slug', (req, res) => {
  const { slug } = req.params;
  res.redirect(301, `/resources/blog/${slug}`);
});
```

#### Client-Side Fallback (React Router - `App.tsx`)

```typescript
import { Redirect, Route } from 'wouter';

// Fallback redirects (server should handle these, but belt-and-suspenders)
<Route path="/solutions" component={() => <Redirect to="/platform" />} />
<Route path="/solutions/:industry" component={() => <Redirect to="/platform" />} />
<Route path="/portfolio" component={() => <Redirect to="/success-stories" />} />
```

**Note:** Server-side redirects are preferred for SEO (Google sees 301 status code). Client-side redirects are fallback only.

---

## 5. Route Configuration Code

### Updated App.tsx with New Routes

```typescript
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'wouter';
import { usePageTracking } from '@/hooks/usePageTracking';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorBoundary } from '@/components/ui/error-boundary';

// Eager-loaded (homepage for SEO)
import HomePage from '@/pages/home';

// Lazy-loaded pages
const PlatformPage = lazy(() => import('@/pages/platform'));
const PricingPage = lazy(() => import('@/pages/pricing'));
const RoadmapPage = lazy(() => import('@/pages/roadmap'));
const ResourcesPage = lazy(() => import('@/pages/resources'));
const CaseStudiesPage = lazy(() => import('@/pages/resources/case-studies'));
const BlogPage = lazy(() => import('@/pages/resources/blog'));
const BlogPostPage = lazy(() => import('@/pages/resources/blog/[slug]'));
const WhitepapersPage = lazy(() => import('@/pages/resources/whitepapers'));
const HelpPage = lazy(() => import('@/pages/resources/help'));
const SuccessStoriesPage = lazy(() => import('@/pages/success-stories'));
const AboutPage = lazy(() => import('@/pages/about'));
const ContactPage = lazy(() => import('@/pages/contact'));
const SecurityPage = lazy(() => import('@/pages/security'));
const SupportPage = lazy(() => import('@/pages/support'));
const LoginPage = lazy(() => import('@/pages/login'));
const SignupPage = lazy(() => import('@/pages/signup'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const PrivacyPage = lazy(() => import('@/pages/privacy'));
const TermsPage = lazy(() => import('@/pages/terms'));
const CookiesPage = lazy(() => import('@/pages/cookies'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));

export function App() {
  usePageTracking();

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          {/* Homepage - Eager loaded */}
          <Route path="/" component={HomePage} />

          {/* Core Platform Pages */}
          <Route path="/platform" component={PlatformPage} />
          <Route path="/pricing" component={PricingPage} />
          <Route path="/roadmap" component={RoadmapPage} />

          {/* Resources */}
          <Route path="/resources" component={ResourcesPage} />
          <Route path="/resources/case-studies" component={CaseStudiesPage} />
          <Route path="/resources/blog" component={BlogPage} />
          <Route path="/resources/blog/:slug" component={BlogPostPage} />
          <Route path="/resources/whitepapers" component={WhitepapersPage} />
          <Route path="/resources/help" component={HelpPage} />

          {/* Success Stories */}
          <Route path="/success-stories" component={SuccessStoriesPage} />

          {/* Company */}
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/security" component={SecurityPage} />
          <Route path="/support" component={SupportPage} />

          {/* Auth */}
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/dashboard" component={DashboardPage} />

          {/* Legal */}
          <Route path="/privacy" component={PrivacyPage} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/cookies" component={CookiesPage} />

          {/* 404 */}
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

## 6. Dynamic Routes & Parameters

### Blog Post Route (Dynamic Slug)

**Route:** `/resources/blog/:slug`

**Example URLs:**
```
/resources/blog/ai-real-estate-trends-2025
/resources/blog/how-to-generate-mls-listings-with-ai
/resources/blog/real-estate-crm-comparison
```

**Implementation:**

```typescript
// pages/resources/blog/[slug].tsx
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { NotFoundPage } from '@/pages/not-found';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { MetaTags } from '@/components/seo/meta-tags';
import { blogPosts } from '@/data/resources/blog-posts';

export function BlogPostPage() {
  const [match, params] = useRoute('/resources/blog/:slug');
  const slug = params?.slug;

  // Find blog post by slug
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <>
      <MetaTags
        title={`${post.title} | SAI Platform Blog`}
        description={post.excerpt}
        canonical={`https://saplatform.com/resources/blog/${post.slug}`}
        ogImage={post.image}
        article={{
          publishedTime: post.publishedAt,
          modifiedTime: post.updatedAt,
          author: post.author.name,
          tags: post.tags,
        }}
      />

      {/* Blog post content */}
      <article>
        <h1>{post.title}</h1>
        {/* ... rest of post content */}
      </article>
    </>
  );
}
```

### Case Study Route (Dynamic Slug)

Similar pattern for `/resources/case-studies/:slug`

---

## 7. Sitemap.xml Updates

### Purpose
Inform search engines of all pages, their importance (priority), and update frequency.

### Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Homepage - Highest Priority -->
  <url>
    <loc>https://saplatform.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Core Pages - High Priority -->
  <url>
    <loc>https://saplatform.com/platform</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://saplatform.com/pricing</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://saplatform.com/roadmap</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Resources Pages - Medium Priority -->
  <url>
    <loc>https://saplatform.com/resources</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://saplatform.com/resources/case-studies</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://saplatform.com/resources/blog</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Individual Blog Posts - Generated Dynamically -->
  <!-- Example: -->
  <url>
    <loc>https://saplatform.com/resources/blog/ai-real-estate-trends-2025</loc>
    <lastmod>2025-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Success Stories -->
  <url>
    <loc>https://saplatform.com/success-stories</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Company Pages - Lower Priority -->
  <url>
    <loc>https://saplatform.com/about</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>https://saplatform.com/contact</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>https://saplatform.com/security</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>quarterly</changefreq>
    <priority>0.5</priority>
  </url>

  <!-- Legal Pages - Lowest Priority -->
  <url>
    <loc>https://saplatform.com/privacy</loc>
    <lastmod>2024-12-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <url>
    <loc>https://saplatform.com/terms</loc>
    <lastmod>2024-12-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- Do NOT include: /login, /signup, /dashboard (user-specific, no SEO value) -->
  <!-- Do NOT include: /404, /500 (error pages) -->

</urlset>
```

### Sitemap Generation Script

**Dynamic generation for blog posts, case studies, etc.**

```typescript
// scripts/generate-sitemap.ts
import fs from 'fs';
import path from 'path';
import { blogPosts } from '../client/src/data/resources/blog-posts';
import { caseStudies } from '../client/src/data/resources/case-studies';

const BASE_URL = 'https://saplatform.com';

const staticPages = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/platform', priority: 0.9, changefreq: 'weekly' },
  { path: '/pricing', priority: 0.9, changefreq: 'monthly' },
  { path: '/roadmap', priority: 0.7, changefreq: 'monthly' },
  { path: '/resources', priority: 0.8, changefreq: 'weekly' },
  { path: '/resources/case-studies', priority: 0.7, changefreq: 'weekly' },
  { path: '/resources/blog', priority: 0.8, changefreq: 'daily' },
  { path: '/resources/whitepapers', priority: 0.7, changefreq: 'monthly' },
  { path: '/success-stories', priority: 0.7, changefreq: 'monthly' },
  { path: '/about', priority: 0.5, changefreq: 'monthly' },
  { path: '/contact', priority: 0.5, changefreq: 'yearly' },
  { path: '/security', priority: 0.5, changefreq: 'quarterly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly' },
  { path: '/cookies', priority: 0.3, changefreq: 'yearly' },
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Add static pages
  staticPages.forEach((page) => {
    xml += `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  // Add blog posts
  blogPosts.forEach((post) => {
    xml += `  <url>
    <loc>${BASE_URL}/resources/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt || post.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  // Add case studies
  caseStudies.forEach((study) => {
    xml += `  <url>
    <loc>${BASE_URL}/resources/case-studies/${study.slug}</loc>
    <lastmod>${study.updatedAt || study.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  xml += `</urlset>`;

  // Write to public directory
  const filePath = path.join(__dirname, '../dist/public/sitemap.xml');
  fs.writeFileSync(filePath, xml);
  console.log('✅ Sitemap generated successfully at /sitemap.xml');
}

generateSitemap();
```

**Add to package.json scripts:**
```json
{
  "scripts": {
    "generate-sitemap": "tsx scripts/generate-sitemap.ts",
    "build": "npm run generate-sitemap && vite build && npm run build:server"
  }
}
```

---

## 8. Robots.txt Configuration

### Purpose
Instruct search engine crawlers which pages to index and where the sitemap is located.

### Updated robots.txt

```
# Allow all crawlers
User-agent: *
Allow: /

# Disallow private/user pages
Disallow: /dashboard
Disallow: /login
Disallow: /signup
Disallow: /api/
Disallow: /admin

# Disallow error pages
Disallow: /404
Disallow: /500
Disallow: /maintenance

# Sitemap location
Sitemap: https://saplatform.com/sitemap.xml

# Crawl-delay (optional, for aggressive bots)
Crawl-delay: 1
```

**Location:** `dist/public/robots.txt` (served at `https://saplatform.com/robots.txt`)

---

## 9. Canonical URLs Strategy

### Purpose
Prevent duplicate content penalties by specifying the preferred URL for each page.

### Implementation

Every page must include a canonical meta tag pointing to its preferred URL.

#### Component: `MetaTags.tsx` (Updated)

```typescript
interface MetaTagsProps {
  title: string;
  description: string;
  canonical: string; // Full canonical URL (required)
  ogImage?: string;
  // ... other props
}

export function MetaTags({ title, description, canonical, ogImage, ... }: MetaTagsProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage || `${canonical}/og-image.jpg`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || `${canonical}/og-image.jpg`} />
    </Helmet>
  );
}
```

#### Usage Examples

```typescript
// Platform page
<MetaTags
  title="Platform | SAI - All-in-One Real Estate Software"
  description="SAI Platform includes CRM, transaction management, content creation, market intelligence, and AI assistance—all in one platform for real estate agents."
  canonical="https://saplatform.com/platform"
  ogImage="https://saplatform.com/assets/og/platform.jpg"
/>

// Pricing page
<MetaTags
  title="Pricing | SAI Platform - Simple, Transparent Pricing"
  description="SAI pricing: Start free with 100 contacts, or Elite at $999/mo for unlimited. No contracts, no hidden fees."
  canonical="https://saplatform.com/pricing"
  ogImage="https://saplatform.com/assets/og/pricing.jpg"
/>

// Blog post
<MetaTags
  title={`${post.title} | SAI Platform Blog`}
  description={post.excerpt}
  canonical={`https://saplatform.com/resources/blog/${post.slug}`}
  ogImage={post.image}
/>
```

### Canonical URL Rules

1. **Always use full URLs** (not relative): `https://saplatform.com/platform`
2. **Include protocol** (https://)
3. **No trailing slashes**: `/platform` not `/platform/`
4. **Lowercase**: `/platform` not `/Platform`
5. **Match exactly** what you want indexed (including query params if needed)

---

## 10. Meta Tags & Open Graph

### Required Meta Tags for Every Page

```html
<!-- Basic Meta Tags -->
<title>Page Title | SAI Platform</title>
<meta name="description" content="Page description (150-160 chars)" />
<link rel="canonical" href="https://saplatform.com/page-url" />

<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Page description" />
<meta property="og:url" content="https://saplatform.com/page-url" />
<meta property="og:image" content="https://saplatform.com/assets/og/page-image.jpg" />
<meta property="og:site_name" content="SAI Platform" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@saiplatform" />
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Page description" />
<meta name="twitter:image" content="https://saplatform.com/assets/og/page-image.jpg" />

<!-- Additional (Optional) -->
<meta name="robots" content="index, follow" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### Page-Specific Meta Tags

#### Platform Page
```typescript
<MetaTags
  title="Platform | SAI - All-in-One Real Estate Software"
  description="SAI Platform includes CRM, transaction management, content creation, market intelligence, and AI assistance—all in one platform for real estate professionals."
  canonical="https://saplatform.com/platform"
  ogImage="https://saplatform.com/assets/og/platform-1200x630.jpg"
/>
```

#### Pricing Page
```typescript
<MetaTags
  title="Pricing | SAI Platform - Simple, Transparent Pricing for Real Estate"
  description="SAI pricing: Start free with 100 contacts, or choose Elite at $999/mo for unlimited everything. No contracts, no hidden fees. See how much you'll save."
  canonical="https://saplatform.com/pricing"
  ogImage="https://saplatform.com/assets/og/pricing-1200x630.jpg"
/>
```

#### Blog Posts (Dynamic)
```typescript
<MetaTags
  title={`${post.title} | SAI Platform Blog`}
  description={post.excerpt}
  canonical={`https://saplatform.com/resources/blog/${post.slug}`}
  ogImage={post.featuredImage}
  article={{
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    author: post.author.name,
    tags: post.tags,
  }}
/>
```

---

## 11. Testing & Validation

### Pre-Launch Checklist

**Route Testing:**
- [ ] All 32 routes load correctly
- [ ] 404 page displays for invalid routes
- [ ] Dynamic routes (blog/:slug, case-studies/:slug) work
- [ ] No console errors on any route
- [ ] All routes lazy-load properly (check Network tab)

**Redirect Testing:**
- [ ] `/solutions` → `/platform` (301 redirect)
- [ ] `/solutions/healthcare` → `/platform` (301 redirect)
- [ ] `/portfolio` → `/success-stories` (301 redirect)
- [ ] Test all 17 solution page redirects
- [ ] Redirects work on both server and client

**SEO Testing:**
- [ ] sitemap.xml accessible at `/sitemap.xml`
- [ ] sitemap.xml validates (https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- [ ] robots.txt accessible at `/robots.txt`
- [ ] Canonical tags present on all pages
- [ ] Canonical URLs are correct (full URLs, no trailing slashes)
- [ ] Meta descriptions 150-160 characters
- [ ] Open Graph images 1200x630px
- [ ] Twitter Card validates (https://cards-dev.twitter.com/validator)

**Performance Testing:**
- [ ] All routes load in <3 seconds
- [ ] Lazy loading reduces initial bundle size
- [ ] No render-blocking resources
- [ ] Images optimized (WebP with fallbacks)

**Cross-Browser Testing:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Validation Tools

**Sitemap Validator:**
- https://www.xml-sitemaps.com/validate-xml-sitemap.html
- Google Search Console → Sitemaps section

**robots.txt Tester:**
- Google Search Console → robots.txt Tester

**Meta Tags Validator:**
- https://metatags.io/ (comprehensive preview)
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator

**Redirect Checker:**
- https://httpstatus.io/ (check 301 status codes)
- Browser DevTools → Network tab (Status column)

**Google Rich Results Test:**
- https://search.google.com/test/rich-results
- Tests structured data (JSON-LD)

---

## 12. Definition of Done

✅ File created and saved to `/Users/grant/Desktop/Github/Strive_Website/TECHNICAL-PART-3-ROUTING.md`
✅ Complete route inventory (current vs. new)
✅ 11 new routes specified with purposes
✅ 17 solution page redirects mapped (301)
✅ Route configuration code (App.tsx) updated
✅ Dynamic route implementation (blog/:slug, case-studies/:slug)
✅ Sitemap.xml structure and generation script
✅ robots.txt configuration
✅ Canonical URL strategy documented
✅ Meta tags and Open Graph specifications
✅ Testing checklist with validation tools
✅ Under 1,600 lines
✅ Ready for Phase 1-2 implementation

---

**End of TECHNICAL-PART-3-ROUTING.md** - Ready for implementation in Phase 1-2 of the SAI Platform transformation.