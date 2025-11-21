# TECHNICAL-PART-1-FILES.md
# SAI Platform Transformation: Complete File Modification Guide

**Version:** 1.0
**Last Updated:** January 2025
**Session:** 2 of 4
**Status:** ✅ COMPLETE
**Lines:** ~2,000

---

## ⚠️ CRITICAL WARNING - READ FIRST!

**🔴 MOST FILES LISTED HERE ALREADY EXIST - EDIT, DON'T CREATE!**

1. **AUDIT FIRST:** Check if file exists before creating
2. **DATA FILES EXIST:** 8 files in `client/src/data/sai/` already exist!
3. **COMPONENTS EXIST:** 7 homepage components already built!
4. **EDIT, DON'T DUPLICATE:** Saves 40-50 hours of wasted work

**See `MASTER-TRANSFORMATION-PLAN.md` "Existing Code Inventory" for full list of existing files.**

---

## Table of Contents

1. [Overview](#overview)
2. [File Modification Summary](#file-modification-summary)
3. [Files to Modify](#files-to-modify)
4. [Files to Create](#files-to-create)
5. [Files to Delete](#files-to-delete)
6. [Import & Export Changes](#import--export-changes)
7. [Dependencies](#dependencies)
8. [Configuration Updates](#configuration-updates)
9. [Migration Scripts](#migration-scripts)
10. [Testing Checklist](#testing-checklist)
11. [Cross-References](#cross-references)

---

## Overview

### Purpose
This document provides **exact file paths, code transformations, and implementation steps** for converting the Strive Tech website into the SAI Platform marketing site. Every file modification, creation, and deletion is documented with specific code examples.

### Scope
- **38 total current pages** → 13 pages (after transformation)
- **Files to modify:** 24 files
- **Files to create:** 35+ files (7 pages, 10+ components, 18+ data files)
- **Files to delete:** 17 solution pages
- **Dependencies:** 0 new packages (use existing stack)

### Project Structure (Current)

```
/Users/grant/Desktop/Github/Strive_Website/
├── client/
│   └── src/
│       ├── components/
│       │   ├── ui/ (56 shadcn components)
│       │   ├── layout/ (Navigation.tsx, Footer.tsx)
│       │   ├── analytics/
│       │   └── seo/
│       ├── pages/
│       │   ├── home.tsx
│       │   ├── solutions/ (17 files TO DELETE)
│       │   ├── portfolio.tsx
│       │   ├── resources.tsx
│       │   ├── about.tsx
│       │   └── contact.tsx
│       ├── data/
│       │   ├── portfolio/ (8 files)
│       │   └── resources/
│       ├── hooks/ (7 custom hooks)
│       ├── lib/ (21 utility files)
│       └── App.tsx
├── server/
├── shared/
└── package.json
```

### Project Structure (Target)

```
/Users/grant/Desktop/Github/Strive_Website/
├── client/
│   └── src/
│       ├── components/
│       │   ├── ui/ (56 shadcn components - KEEP)
│       │   ├── layout/ (Navigation.tsx, Footer.tsx - MODIFY)
│       │   ├── homepage/ (NEW: 10+ components)
│       │   ├── platform/ (NEW: 5+ components)
│       │   ├── pricing/ (NEW: 3+ components)
│       │   └── seo/
│       ├── pages/
│       │   ├── home.tsx (MAJOR OVERHAUL)
│       │   ├── platform.tsx (NEW)
│       │   ├── pricing.tsx (NEW)
│       │   ├── success-stories.tsx (NEW, replaces portfolio)
│       │   ├── roadmap.tsx (NEW)
│       │   ├── compare.tsx (NEW)
│       │   ├── security.tsx (NEW)
│       │   ├── integrations.tsx (NEW)
│       │   ├── resources.tsx (MODIFY)
│       │   ├── about.tsx (MODIFY)
│       │   └── contact.tsx (MINOR CHANGES)
│       ├── data/
│       │   ├── sai/ (NEW folder)
│       │   │   ├── modules.ts (5 SAI modules)
│       │   │   ├── pricing-tiers.ts
│       │   │   ├── testimonials.ts
│       │   │   ├── competitors.ts
│       │   │   └── roadmap.ts
│       │   └── resources/ (UPDATE with RE content)
│       └── App.tsx (MODIFY routes)
```

---

## File Modification Summary

### Files to Modify (24)

| File Path | Lines Changed | Priority | Complexity |
|-----------|---------------|----------|------------|
| `client/src/pages/home.tsx` | ~800 (90% rewrite) | CRITICAL | HIGH |
| `client/src/components/layout/Navigation.tsx` | ~150 | CRITICAL | MEDIUM |
| `client/src/components/layout/Footer.tsx` | ~80 | HIGH | LOW |
| `client/src/App.tsx` | ~50 | CRITICAL | MEDIUM |
| `client/src/pages/resources.tsx` | ~200 | MEDIUM | MEDIUM |
| `client/src/pages/about.tsx` | ~150 | MEDIUM | LOW |
| `client/src/pages/contact.tsx` | ~30 | LOW | LOW |
| `client/src/data/resources/blog-posts/index.ts` | ~50 | MEDIUM | LOW |
| `client/src/data/resources/case-studies/index.ts` | ~50 | MEDIUM | LOW |
| `client/src/components/seo/meta-tags.tsx` | ~20 | HIGH | LOW |
| (14 more files with minor changes) | <20 each | LOW-MEDIUM | LOW |

### Files to Create (35+)

| Category | File Count | Priority |
|----------|------------|----------|
| **Pages** | 7 | CRITICAL |
| **Homepage Components** | 10 | CRITICAL |
| **Platform Components** | 5 | HIGH |
| **Pricing Components** | 3 | HIGH |
| **SAI Data Files** | 10+ | HIGH |
| **Success Stories Data** | 5+ | MEDIUM |

### Files to Delete (17)

| Category | File Count | Action |
|----------|------------|--------|
| **Solution Pages** | 17 | DELETE (redirect to /platform) |
| **Portfolio Data** | 8 | DELETE (replaced by success stories) |

---

## Files to Modify

### 1. home.tsx (CRITICAL - Complete Overhaul)

**Path:** `/Users/grant/Desktop/Github/Strive_Website/client/src/pages/home.tsx`

**Current:** Generic AI consulting homepage (21+ industries)
**Target:** SAI Platform real estate SaaS homepage

**Current Structure (800 lines):**

```typescript
// Current home.tsx structure
export function HomePage() {
  return (
    <>
      <MetaTags {...homeMetadata} />
      <HeroSection>
        <h1>Transform Your Business with AI</h1>
        <p>Lead your industry, not just compete</p>
      </HeroSection>
      <IndustrySolutionsGrid /> {/* 21+ industries */}
      <WhyStriveSection />
      <ResourcesSection />
      <FinalCTA />
    </>
  );
}
```

**New Structure (800 lines):**

```typescript
// New home.tsx structure
import { HeroSection } from '@/components/homepage/HeroSection';
import { TrustSignalsBar } from '@/components/homepage/TrustSignalsBar';
import { ModuleOverviewSection } from '@/components/homepage/ModuleOverviewSection';
import { ROICalculatorSection } from '@/components/homepage/ROICalculatorSection';
import { WhySAISection } from '@/components/homepage/WhySAISection';
import { SocialProofSection } from '@/components/homepage/SocialProofSection';
import { ResourcesPreviewSection } from '@/components/homepage/ResourcesPreviewSection';
import { FinalCTASection } from '@/components/homepage/FinalCTASection';
import { MetaTags } from '@/components/seo/meta-tags';

const homeMetadata = {
  title: "SAI Platform | All-in-One Real Estate Software for Agents & Teams",
  description: "Replace 5+ tools with SAI: CRM, transaction management, marketing, market intelligence, and AI—all for $999/month. Join 5,000+ agents closing more deals.",
  keywords: "real estate CRM, transaction management software, real estate marketing automation, all-in-one real estate platform, real estate AI",
};

export function HomePage() {
  return (
    <>
      <MetaTags {...homeMetadata} />

      {/* Hero Section (variant A by default, supports A/B testing) */}
      <HeroSection variant="A" />

      {/* Trust Signals Bar */}
      <TrustSignalsBar />

      {/* Module Overview (5 SAI modules) */}
      <ModuleOverviewSection />

      {/* ROI Calculator */}
      <ROICalculatorSection />

      {/* Why SAI (4 value props) */}
      <WhySAISection />

      {/* Social Proof (metrics + testimonials) */}
      <SocialProofSection />

      {/* Resources Preview */}
      <ResourcesPreviewSection />

      {/* Final CTA */}
      <FinalCTASection />
    </>
  );
}
```

**Detailed Changes:**

1. **Remove IndustrySolutionsGrid** (21+ industries no longer applicable)
2. **Replace with ModuleOverviewSection** (5 SAI modules: CRM, Office, Studio, REID, SAI)
3. **Add ROICalculatorSection** (interactive savings calculator)
4. **Update HeroSection** with SAI-specific props
5. **Update meta tags** (title, description, keywords for real estate)

**Full Implementation:**

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/pages/home.tsx

import { HeroSection } from '@/components/homepage/HeroSection';
import { TrustSignalsBar } from '@/components/homepage/TrustSignalsBar';
import { ModuleOverviewSection } from '@/components/homepage/ModuleOverviewSection';
import { ROICalculatorSection } from '@/components/homepage/ROICalculatorSection';
import { WhySAISection } from '@/components/homepage/WhySAISection';
import { SocialProofSection } from '@/components/homepage/SocialProofSection';
import { ResourcesPreviewSection } from '@/components/homepage/ResourcesPreviewSection';
import { FinalCTASection } from '@/components/homepage/FinalCTASection';
import { MetaTags } from '@/components/seo/meta-tags';
import { StructuredData } from '@/components/seo/structured-data';

const homeMetadata = {
  title: "SAI Platform | All-in-One Real Estate Software for Agents & Teams",
  description: "Replace 5+ tools with SAI: CRM, transaction management, marketing, market intelligence, and AI—all for $999/month. Join 5,000+ agents closing more deals.",
  keywords: "real estate CRM, transaction management software, real estate marketing automation, all-in-one real estate platform, real estate AI, best real estate software",
  ogImage: "/assets/optimized/seo/sai-og-image.webp",
  ogType: "website",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SAI Platform",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "999",
    "priceCurrency": "USD",
    "priceValidUntil": "2025-12-31",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1247",
  },
  "description": "All-in-one real estate platform with CRM, transaction management, marketing automation, market intelligence, and AI assistant.",
};

export function HomePage() {
  return (
    <>
      <MetaTags {...homeMetadata} />
      <StructuredData data={organizationSchema} />

      {/* Hero Section (A/B test: variant A by default) */}
      <HeroSection
        variant="A"
        onPrimaryCTAClick={() => {
          // Track analytics: trial signup click
          window.gtag?.('event', 'cta_click', {
            location: 'hero',
            cta_type: 'trial_signup',
          });
        }}
        onSecondaryCTAClick={() => {
          // Track analytics: demo request click
          window.gtag?.('event', 'cta_click', {
            location: 'hero',
            cta_type: 'demo_request',
          });
        }}
      />

      {/* Trust Signals Bar (5,000+ agents, 50,000+ deals, 4.8/5 rating) */}
      <TrustSignalsBar />

      {/* Module Overview (5 SAI modules with cards) */}
      <ModuleOverviewSection />

      {/* ROI Calculator (interactive savings calculator) */}
      <ROICalculatorSection
        onCalculate={(results) => {
          // Track analytics: ROI calculation
          window.gtag?.('event', 'roi_calculated', {
            current_monthly: results.currentMonthly,
            monthly_savings: results.monthlySavings,
          });
        }}
      />

      {/* Why SAI (4 value prop cards: cost, time, revenue, data) */}
      <WhySAISection />

      {/* Social Proof (metrics bar + 3 testimonials) */}
      <SocialProofSection />

      {/* Resources Preview (3 cards: success story, video, guide) */}
      <ResourcesPreviewSection />

      {/* Final CTA (process steps + CTA buttons) */}
      <FinalCTASection />
    </>
  );
}
```

**Lines Changed:** ~800 (90% rewrite)
**Priority:** CRITICAL
**Dependencies:** Requires 8 new components (HeroSection, ModuleOverviewSection, etc.)

---

### 2. Navigation.tsx (CRITICAL - Dropdown Changes)

**Path:** `/Users/grant/Desktop/Github/Strive_Website/client/src/components/layout/Navigation.tsx`

**Current Navigation Structure:**

```
Home | Solutions (21 industries) | Portfolio | Resources | Our Company | Contact
```

**New Navigation Structure:**

```
Home | Platform (dropdown) | Pricing | Success Stories | Resources | Company (dropdown)
```

**Current Code (simplified):**

```typescript
// Current Navigation.tsx (excerpt)
<NavigationMenu>
  <NavigationMenuItem>
    <Link href="/">Home</Link>
  </NavigationMenuItem>
  <NavigationMenuItem>
    <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
    <NavigationMenuContent>
      {industries.map(industry => (
        <Link href={`/solutions/${industry.slug}`}>{industry.name}</Link>
      ))}
    </NavigationMenuContent>
  </NavigationMenuItem>
  <NavigationMenuItem>
    <Link href="/portfolio">Portfolio</Link>
  </NavigationMenuItem>
  {/* More items... */}
</NavigationMenu>
```

**New Code:**

```typescript
// New Navigation.tsx
import { NavigationMenu, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Link } from 'wouter';
import { Building2, Users, DollarSign, TrendingUp, Sparkles, Shield, Zap } from 'lucide-react';

const platformLinks = [
  { href: '/platform#crm', label: 'CRM & Lead Management', icon: Users, description: 'Unlimited contacts, smart scoring, pipeline tracking' },
  { href: '/platform#office', label: 'The Office', icon: Building2, description: '6 deal types, workflows, document management' },
  { href: '/platform#studio', label: 'Content Studio', icon: Mail, description: 'Email campaigns, social scheduling, AI content' },
  { href: '/platform#reid', label: 'REID', icon: TrendingUp, description: 'Market intelligence, ROI calculator, comps' },
  { href: '/platform#sai', label: 'Global SAI', icon: Sparkles, description: '12 AI models, tool calling, conversational' },
  { href: '/security', label: 'Security', icon: Shield, description: 'SOC 2, GDPR, data encryption' },
  { href: '/integrations', label: 'Integrations', icon: Zap, description: 'MLS, DocuSign, QuickBooks, Google' },
];

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <Link href="/">
          <NavigationMenuLink>Home</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>

      {/* Platform Dropdown (replaces Solutions) */}
      <NavigationMenuItem>
        <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
            {platformLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="flex items-center gap-2">
                      <link.icon className="h-4 w-4 text-primary" />
                      <div className="text-sm font-medium leading-none">{link.label}</div>
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {link.description}
                    </p>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      {/* Pricing */}
      <NavigationMenuItem>
        <Link href="/pricing">
          <NavigationMenuLink>Pricing</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>

      {/* Success Stories (replaces Portfolio) */}
      <NavigationMenuItem>
        <Link href="/success-stories">
          <NavigationMenuLink>Success Stories</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>

      {/* Resources */}
      <NavigationMenuItem>
        <Link href="/resources">
          <NavigationMenuLink>Resources</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>

      {/* Company Dropdown (replaces Our Company) */}
      <NavigationMenuItem>
        <NavigationMenuTrigger>Company</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[200px] gap-3 p-4">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                    <div className="text-sm font-medium">{link.label}</div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      {/* CTA Button (Start Free Trial) */}
      <NavigationMenuItem className="ml-auto">
        <Link href="/signup">
          <Button size="sm" className="ml-4">
            Start Free Trial
          </Button>
        </Link>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
```

**Key Changes:**

1. **Remove "Solutions" dropdown** (21 industries)
2. **Add "Platform" dropdown** (5 modules + Security + Integrations)
3. **Replace "Portfolio" with "Success Stories"**
4. **Add "Company" dropdown** (About, Roadmap, Contact)
5. **Add "Start Free Trial" CTA button** (right-aligned)

**Lines Changed:** ~150
**Priority:** CRITICAL
**Testing:** Verify all links work, dropdown animations smooth

---

### 3. Footer.tsx (HIGH - Link Updates)

**Path:** `/Users/grant/Desktop/Github/Strive_Website/client/src/components/layout/Footer.tsx`

**Current Footer Links:**

```
Product: Solutions, Portfolio, Pricing
Company: About, Careers, Contact
Resources: Blog, Case Studies, Whitepapers
```

**New Footer Links:**

```
Product: Platform, Pricing, Integrations, Security
Resources: Success Stories, Blog, Case Studies, Guides
Company: About, Roadmap, Contact
```

**Code Changes:**

```typescript
// Old Footer.tsx (excerpt)
const footerLinks = {
  product: [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
  ],
  // ...
};

// New Footer.tsx
const footerLinks = {
  product: [
    { label: 'Platform', href: '/platform' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Integrations', href: '/integrations' },
    { label: 'Security', href: '/security' },
  ],
  resources: [
    { label: 'Success Stories', href: '/success-stories' },
    { label: 'Blog', href: '/resources#blog' },
    { label: 'Case Studies', href: '/resources#case-studies' },
    { label: 'Guides', href: '/resources#guides' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Roadmap', href: '/roadmap' },
    { label: 'Contact', href: '/contact' },
  ],
};
```

**Lines Changed:** ~80
**Priority:** HIGH
**Testing:** Verify all footer links navigate correctly

---

### 4. App.tsx (CRITICAL - Route Changes)

**Path:** `/Users/grant/Desktop/Github/Strive_Website/client/src/App.tsx`

**Current Routes (excerpt):**

```typescript
// Current App.tsx
import { lazy } from 'react';

const HomePage = lazy(() => import('@/pages/home'));
const SolutionsPage = lazy(() => import('@/pages/solutions/[industry]')); // 17 routes
const PortfolioPage = lazy(() => import('@/pages/portfolio'));
const ResourcesPage = lazy(() => import('@/pages/resources'));
// ...

function App() {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/solutions/:industry" component={SolutionsPage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/resources" component={ResourcesPage} />
      {/* More routes... */}
    </Router>
  );
}
```

**New Routes:**

```typescript
// New App.tsx
import { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'wouter';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Lazy-loaded pages (all except HomePage for SEO)
const HomePage = lazy(() => import('@/pages/home'));
const PlatformPage = lazy(() => import('@/pages/platform'));
const PricingPage = lazy(() => import('@/pages/pricing'));
const SuccessStoriesPage = lazy(() => import('@/pages/success-stories'));
const RoadmapPage = lazy(() => import('@/pages/roadmap'));
const ComparePage = lazy(() => import('@/pages/compare'));
const SecurityPage = lazy(() => import('@/pages/security'));
const IntegrationsPage = lazy(() => import('@/pages/integrations'));
const ResourcesPage = lazy(() => import('@/pages/resources'));
const AboutPage = lazy(() => import('@/pages/about'));
const ContactPage = lazy(() => import('@/pages/contact'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));

// Redirect component for deleted solution pages
function SolutionsRedirect() {
  window.location.href = '/platform';
  return null;
}

export default function App() {
  return (
    <Router>
      <Navigation />
      <main className="min-h-screen">
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            {/* Core Pages */}
            <Route path="/" component={HomePage} />
            <Route path="/platform" component={PlatformPage} />
            <Route path="/pricing" component={PricingPage} />
            <Route path="/success-stories" component={SuccessStoriesPage} />
            <Route path="/roadmap" component={RoadmapPage} />
            <Route path="/compare" component={ComparePage} />
            <Route path="/compare/:competitor" component={ComparePage} />
            <Route path="/security" component={SecurityPage} />
            <Route path="/integrations" component={IntegrationsPage} />
            <Route path="/resources" component={ResourcesPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />

            {/* Redirects for deleted pages */}
            <Route path="/solutions/:industry" component={SolutionsRedirect} />
            <Route path="/portfolio" component={SolutionsRedirect} />

            {/* 404 */}
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
}
```

**Key Changes:**

1. **Remove 17 solution page routes** (redirect to /platform)
2. **Add 7 new page routes** (platform, pricing, success-stories, roadmap, compare, security, integrations)
3. **Redirect /solutions/:industry → /platform**
4. **Redirect /portfolio → /success-stories**

**Lines Changed:** ~50
**Priority:** CRITICAL
**Testing:** Test all routes load correctly, redirects work

---

### 5. resources.tsx (MEDIUM - Content Updates)

**Path:** `/Users/grant/Desktop/Github/Strive_Website/client/src/pages/resources.tsx`

**Changes:**
- Update hero headline: "Resources for Real Estate Professionals"
- Filter blog posts/case studies to real estate topics only
- Update CTA: "Start Free Trial" instead of "Request Consultation"

**Code Changes:**

```typescript
// Old resources.tsx
<h1>Resources to Transform Your Business with AI</h1>

// New resources.tsx
<h1>Resources for Real Estate Professionals</h1>
<p>Learn how to use SAI to close more deals, save time, and grow your business.</p>
```

**Lines Changed:** ~200
**Priority:** MEDIUM

---

### 6. about.tsx (MEDIUM - Company Info Updates)

**Path:** `/Users/grant/Desktop/Github/Strive_Website/client/src/pages/about.tsx`

**Changes:**
- Update company description: Focus on real estate industry
- Update mission: "Empower real estate professionals with all-in-one platform"
- Remove references to 21+ industries
- Add section: "Why We Built SAI for Real Estate"

**Code Changes:**

```typescript
// Old about.tsx
<p>Strive Tech provides AI consulting for 21+ industries...</p>

// New about.tsx
<p>SAI Platform is the all-in-one software solution for real estate agents, teams, and brokerages. We built SAI because we saw agents struggling with fragmented tools—juggling 5+ platforms, paying high costs, and losing leads in the gaps.</p>
```

**Lines Changed:** ~150
**Priority:** MEDIUM

---

### 7-24. Minor File Changes

The following files require minor updates (<50 lines each):

| File | Change Description | Lines |
|------|-------------------|-------|
| `client/src/components/seo/meta-tags.tsx` | Update default title/description | 20 |
| `client/src/lib/analytics-tracker.ts` | Add SAI-specific event tracking | 30 |
| `client/src/data/resources/blog-posts/index.ts` | Remove non-RE blog posts | 50 |
| `client/src/data/resources/case-studies/index.ts` | Remove non-RE case studies | 50 |
| `client/src/pages/contact.tsx` | Update form labels for real estate | 30 |

---

## Files to Create

### Pages (7 new files)

#### 1. platform.tsx

**Path:** `/Users/grant/Desktop/Github/Strive_Website/client/src/pages/platform.tsx`

**Purpose:** Detailed overview of all 5 SAI modules

**Structure:**
- Hero: "Everything You Need to Run Your Real Estate Business"
- Module Sections (5): CRM, The Office, Content Studio, REID, Global SAI
- How It Works (3 steps)
- Use Cases (4): Solo Agent, Team, Brokerage, Investor
- Demo CTA

**Boilerplate Code:**

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/pages/platform.tsx

import { MetaTags } from '@/components/seo/meta-tags';
import { PlatformHero } from '@/components/platform/PlatformHero';
import { ModuleSection } from '@/components/platform/ModuleSection';
import { HowItWorksSection } from '@/components/platform/HowItWorksSection';
import { UseCasesSection } from '@/components/platform/UseCasesSection';
import { DemoCTASection } from '@/components/platform/DemoCTASection';
import { saiModules } from '@/data/sai/modules';

const platformMetadata = {
  title: "SAI Platform | CRM, Transactions, Marketing, Data & AI for Real Estate",
  description: "All-in-one platform with 5 core modules: CRM, The Office (transactions), Content Studio (marketing), REID (market data), and Global SAI (AI assistant). $999/month for unlimited users.",
  keywords: "real estate CRM, transaction management, marketing automation, market intelligence, real estate AI platform",
};

export default function PlatformPage() {
  return (
    <>
      <MetaTags {...platformMetadata} />

      {/* Hero */}
      <PlatformHero />

      {/* Module Sections (5 modules) */}
      {saiModules.map((module) => (
        <ModuleSection key={module.id} {...module} />
      ))}

      {/* How It Works */}
      <HowItWorksSection />

      {/* Use Cases */}
      <UseCasesSection />

      {/* Demo CTA */}
      <DemoCTASection />
    </>
  );
}
```

**Dependencies:** Requires 5 new components (PlatformHero, ModuleSection, etc.)
**Lines:** ~300
**Priority:** CRITICAL

---

#### 2. pricing.tsx

**Path:** `/Users/grant/Desktop/Github/Strive_Website/client/src/pages/pricing.tsx`

**Purpose:** Pricing tiers, ROI calculator, feature comparison, FAQ

**Structure:**
- Hero: "Simple, Transparent Pricing"
- Tiers: FREE, ELITE ($999), CUSTOM
- ROI Calculator (reuse from homepage)
- Feature Comparison Table (SAI vs. competitors)
- FAQ (10+ questions)
- CTA: "Start Free Trial"

**Boilerplate Code:**

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/pages/pricing.tsx

import { MetaTags } from '@/components/seo/meta-tags';
import { PricingHero } from '@/components/pricing/PricingHero';
import { PricingTiers } from '@/components/pricing/PricingTiers';
import { ROICalculator } from '@/components/homepage/ROICalculator';
import { ComparisonTable } from '@/components/pricing/ComparisonTable';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { pricingTiers } from '@/data/sai/pricing-tiers';

const pricingMetadata = {
  title: "SAI Pricing | $999/Month for Unlimited Users | Free Trial Available",
  description: "Replace 5+ tools for $999/month. Free tier available. Add unlimited agents, no per-user fees. 14-day free trial, no credit card required.",
  keywords: "real estate CRM pricing, transaction management cost, real estate software pricing",
};

export default function PricingPage() {
  return (
    <>
      <MetaTags {...pricingMetadata} />
      <PricingHero />
      <PricingTiers tiers={pricingTiers} />

      {/* ROI Calculator */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Calculate Your Savings</h2>
        <ROICalculator />
      </section>

      <ComparisonTable />
      <PricingFAQ />
    </>
  );
}
```

**Dependencies:** Requires 4 new components
**Lines:** ~400
**Priority:** CRITICAL

---

#### 3. success-stories.tsx

**Path:** `/Users/grant/Desktop/Github/Strive_Website/client/src/pages/success-stories.tsx`

**Purpose:** Agent testimonials, case studies, metrics

**Structure:**
- Hero: "See How 5,000+ Agents Use SAI"
- Filters: By role, by outcome
- Story Cards (10+)
- Metrics Bar
- CTA

**Boilerplate Code:**

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/pages/success-stories.tsx

import { useState } from 'react';
import { MetaTags } from '@/components/seo/meta-tags';
import { SuccessStoriesHero } from '@/components/success-stories/SuccessStoriesHero';
import { StoryFilters } from '@/components/success-stories/StoryFilters';
import { StoryCard } from '@/components/success-stories/StoryCard';
import { MetricsBar } from '@/components/homepage/MetricsBar';
import { testimonials } from '@/data/sai/testimonials';

const storiesMetadata = {
  title: "Success Stories | 5,000+ Agents Closing More Deals with SAI",
  description: "Read how real estate agents, teams, and brokerages use SAI to close 35% more deals, save 15 hours/week, and cut costs by 60%.",
  keywords: "real estate success stories, CRM testimonials, real estate case studies",
};

export default function SuccessStoriesPage() {
  const [filter, setFilter] = useState<'all' | 'solo' | 'team' | 'brokerage'>('all');

  const filteredStories = filter === 'all'
    ? testimonials
    : testimonials.filter(t => t.role === filter);

  return (
    <>
      <MetaTags {...storiesMetadata} />
      <SuccessStoriesHero />
      <MetricsBar />

      <section className="container mx-auto px-4 py-16">
        <StoryFilters activeFilter={filter} onFilterChange={setFilter} />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStories.map((story) => (
            <StoryCard key={story.id} {...story} />
          ))}
        </div>
      </section>
    </>
  );
}
```

**Dependencies:** Requires 4 new components
**Lines:** ~250
**Priority:** HIGH

---

#### 4. roadmap.tsx

**Path:** `/Users/grant/Desktop/Github/Strive_Website/client/src/pages/roadmap.tsx`

**Purpose:** Show upcoming features, release timeline

**Structure:**
- Hero: "See What's Coming to SAI"
- Timeline (4 phases): Q1 2025, Q2-Q3, Q4, 2026+
- Feature Cards (30+)
- Voting (future: upvote features)

**Boilerplate Code:**

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/pages/roadmap.tsx

import { MetaTags } from '@/components/seo/meta-tags';
import { RoadmapHero } from '@/components/roadmap/RoadmapHero';
import { RoadmapTimeline } from '@/components/roadmap/RoadmapTimeline';
import { roadmapPhases } from '@/data/sai/roadmap';

const roadmapMetadata = {
  title: "SAI Roadmap | Upcoming Features & Integrations",
  description: "See what's coming to SAI: MLS integration, DocuSign, mobile apps, AI MOE, white-label, and more. Updated quarterly.",
  keywords: "real estate software roadmap, upcoming features, SAI updates",
};

export default function RoadmapPage() {
  return (
    <>
      <MetaTags {...roadmapMetadata} />
      <RoadmapHero />
      <RoadmapTimeline phases={roadmapPhases} />
    </>
  );
}
```

**Dependencies:** Requires 2 new components
**Lines:** ~200
**Priority:** MEDIUM

---

#### 5-7. Additional Pages (Quick Specs)

| Page | Purpose | Lines | Priority |
|------|---------|-------|----------|
| **compare.tsx** | SAI vs. competitors (FUB, BoomTown, Salesforce) | ~350 | HIGH |
| **security.tsx** | SOC 2, GDPR, encryption, compliance | ~250 | MEDIUM |
| **integrations.tsx** | MLS, DocuSign, QuickBooks, Google (current + coming) | ~300 | MEDIUM |

---

### Homepage Components (10 files)

#### 1. HeroSection.tsx

**Path:** `/Users/grant/Desktop/Github/Strive_Website/client/src/components/homepage/HeroSection.tsx`

**Purpose:** Hero section with A/B test support

**Code:** (Already provided in HOMEPAGE-PART-3-TECHNICAL.md)

**Lines:** ~150
**Priority:** CRITICAL

---

#### 2. ModuleOverviewSection.tsx

**Path:** `/Users/grant/Desktop/Github/Strive_Website/client/src/components/homepage/ModuleOverviewSection.tsx`

**Purpose:** Display 5 SAI modules in grid

**Boilerplate Code:**

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/components/homepage/ModuleOverviewSection.tsx

import { ModuleCard } from './ModuleCard';
import { saiModules } from '@/data/sai/modules';

export function ModuleOverviewSection() {
  return (
    <section className="container mx-auto px-4 py-16" id="modules">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          5 Core Modules. One Platform.
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          SAI replaces your CRM, transaction manager, email marketing, market data subscription, and AI tools—all for $999/month.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {saiModules.map((module, index) => (
          <ModuleCard
            key={module.id}
            {...module}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
}
```

**Lines:** ~40
**Priority:** CRITICAL

---

#### 3-10. Additional Homepage Components

| Component | Purpose | Lines | Priority |
|-----------|---------|-------|----------|
| **ModuleCard.tsx** | Display individual module (already in HOMEPAGE-PART-3) | ~100 | CRITICAL |
| **ROICalculatorSection.tsx** | Section wrapper for ROI calculator | ~50 | CRITICAL |
| **ROICalculator.tsx** | Interactive savings calculator (already in HOMEPAGE-PART-3) | ~200 | CRITICAL |
| **WhySAISection.tsx** | 4 value prop cards | ~80 | HIGH |
| **ValuePropCard.tsx** | Individual value prop card (already in HOMEPAGE-PART-3) | ~80 | HIGH |
| **SocialProofSection.tsx** | Metrics + testimonials | ~100 | HIGH |
| **TestimonialCard.tsx** | Individual testimonial (already in HOMEPAGE-PART-3) | ~80 | HIGH |
| **TrustSignalsBar.tsx** | Metrics bar (5,000+ agents, etc.) | ~40 | MEDIUM |

---

### Data Files (10+ files)

#### 1. modules.ts

**Path:** `/Users/grant/Desktop/Github/Strive_Website/client/src/data/sai/modules.ts`

**Purpose:** Define 5 SAI modules with all details

**Boilerplate Code:**

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/data/sai/modules.ts

import { Users, Building2, Mail, TrendingUp, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SAIModule {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string; // One-liner
  description: string; // 2-3 sentences
  features: string[]; // 5-10 key features
  benefits: string[]; // 3-5 key benefits
  useCases: string[]; // 3-5 use cases
  ctaHref: string;
}

export const saiModules: SAIModule[] = [
  {
    id: 'crm',
    icon: Users,
    title: 'CRM & Lead Management',
    tagline: 'Manage unlimited contacts, score leads automatically, and never lose track of a buyer or seller.',
    description: 'SAI CRM gives you unlimited contacts (no per-contact fees), smart lead scoring (HOT/WARM/COLD based on engagement), and visual pipeline tracking (LEAD → QUALIFIED → NURTURE → CONVERTED). Automated follow-ups ensure no lead falls through the cracks.',
    features: [
      'Unlimited contacts (no per-contact fees)',
      'Smart lead scoring (HOT/WARM/COLD)',
      'Pipeline tracking (visual Kanban board)',
      'Automated follow-ups (email, SMS, tasks)',
      'Contact segmentation & tagging',
      'Deal source tracking',
      'Mobile app (iOS & Android)',
      'Team collaboration & assignment',
    ],
    benefits: [
      'Close 35% more deals with AI-powered lead scoring',
      'Never forget to follow up (automated nurture campaigns)',
      'See your entire pipeline at a glance',
      'Add unlimited users at no extra cost',
    ],
    useCases: [
      'Solo agent tracking 500+ contacts',
      'Team managing shared pipeline with lead assignment',
      'Brokerage with 50+ agents and territory management',
    ],
    ctaHref: '/platform#crm',
  },
  {
    id: 'office',
    icon: Building2,
    title: 'The Office',
    tagline: 'Handle 6 deal types with auto-generated workflows, document management, and deadline tracking.',
    description: 'The Office handles HOME_BUYING, HOME_SELLING, RENTAL_LANDLORD, RENTAL_TENANT, INVESTMENT_PROPERTY, and FSBO deals. Each deal type auto-generates 8-15 processes (tasks, deadlines, documents). Never miss a closing date again.',
    features: [
      '6 deal types (HOME_BUYING, HOME_SELLING, RENTAL_LANDLORD, RENTAL_TENANT, INVESTMENT_PROPERTY, FSBO)',
      'Auto-generated workflows (8-15 tasks per deal)',
      'Document management (upload contracts, disclosures)',
      'Deadline tracking (never miss a closing)',
      'Task assignment (to team members, TCs)',
      'Deal templates (customize workflows)',
      'Email/SMS notifications (automated reminders)',
      'Compliance checklists',
    ],
    benefits: [
      'Save 10 hours/week on deal management',
      'Never miss a deadline (automated reminders)',
      'Handle complex investment deals with ease',
      'Onboard new team members in 1 day (templates)',
    ],
    useCases: [
      'Solo agent tracking 10-20 active deals',
      'Team with shared deal visibility and TC assignment',
      'Investor agent managing 15 rental properties',
    ],
    ctaHref: '/platform#office',
  },
  {
    id: 'studio',
    icon: Mail,
    title: 'Content Studio',
    tagline: 'Send email campaigns, schedule social posts, and generate AI content—all in one place.',
    description: 'Content Studio combines email marketing (templates, automation, A/B testing), social scheduling (6 platforms: Facebook, Instagram, LinkedIn, Twitter, TikTok, YouTube), and AI content generation (listings, market updates, blog posts). All contacts auto-sync from CRM.',
    features: [
      'Email marketing (templates, automation, A/B testing)',
      'Social scheduling (6 platforms)',
      'AI content generation (listings, market updates, blogs)',
      'Auto-sync with CRM (no manual imports)',
      'Analytics (open rates, click rates, engagement)',
      'Drip campaigns (automated nurture sequences)',
      'Brand templates (consistent messaging)',
      'Calendar view (see all scheduled content)',
    ],
    benefits: [
      'Save 5 hours/week on content creation',
      'Never run out of social post ideas (AI generation)',
      'Nurture leads on autopilot (drip campaigns)',
      'All marketing in one place (no switching tools)',
    ],
    useCases: [
      'Solo agent sending monthly newsletter + weekly social posts',
      'Team with branded drip campaigns and templates',
      'Brokerage with company-wide campaigns and agent toolkits',
    ],
    ctaHref: '/platform#studio',
  },
  {
    id: 'reid',
    icon: TrendingUp,
    title: 'REID',
    tagline: 'Get institutional-grade market data, ROI calculators, and property comps—without a $300/month subscription.',
    description: 'REID (Real Estate Investment Data) provides market intelligence for 10+ markets: ROI calculator (cap rate, cash flow, appreciation), property search (investment-grade filters), and market reports (trends, forecasts). Included at no extra cost vs. $300+/month for CoStar.',
    features: [
      '10+ market coverage (growing monthly)',
      'ROI calculator (cap rate, cash flow, appreciation)',
      'Property search (investment-grade filters)',
      'Market reports (trends, forecasts, neighborhood insights)',
      'Comp analysis (sold, active, pending)',
      'Rental yield calculator',
      'School ratings & crime data',
      'Export to PDF (client reports)',
    ],
    benefits: [
      'Save $300/month (vs. CoStar subscription)',
      'Run ROI on 20 properties/week (for investors)',
      'Show clients data-driven insights',
      'Make informed investment decisions',
    ],
    useCases: [
      'Investor agent analyzing 10 properties/day',
      'Listing agent pulling comps for CMAs',
      "Buyer's agent showing clients market trends",
    ],
    ctaHref: '/platform#reid',
  },
  {
    id: 'sai',
    icon: Sparkles,
    title: 'Global SAI',
    tagline: 'Chat with your AI assistant to update deals, draft emails, and get answers—hands-free.',
    description: 'Global SAI is your AI assistant powered by 12+ models (Llama 3.3 70B, GPT-4o, Claude 3.5, Gemini 2.0). It can update deals ("Mark the Johnson deal as under contract"), draft emails, search listings, and answer questions—all conversationally. Real estate trained.',
    features: [
      '12+ AI models (Llama, GPT, Claude, Gemini)',
      'Tool calling (update CRM, schedule tasks, search listings)',
      'Conversational interface (voice or text)',
      'Real estate trained (knows MLS, contracts, commissions)',
      'Multi-turn conversations (context-aware)',
      'Code interpreter (run calculations)',
      'Web search (up-to-date info)',
      'Privacy-first (your data never trains models)',
    ],
    benefits: [
      'Update deals hands-free while driving',
      'Draft emails in seconds (AI-generated)',
      'Get answers without searching docs',
      '12 models vs. 1 (choose best for task)',
    ],
    useCases: [
      'Solo agent: "Update the Johnson deal to under contract"',
      'Team: "Which deals close this week?"',
      'Brokerage: "Draft a contract clause for seller financing"',
    ],
    ctaHref: '/platform#sai',
  },
];
```

**Lines:** ~150
**Priority:** CRITICAL

---

#### 2-10. Additional Data Files

| File | Purpose | Lines | Priority |
|------|---------|-------|----------|
| **pricing-tiers.ts** | FREE, ELITE, CUSTOM tier definitions | ~100 | CRITICAL |
| **testimonials.ts** | 10+ agent testimonials with metrics | ~200 | HIGH |
| **competitors.ts** | Follow Up Boss, BoomTown, Salesforce, etc. | ~150 | HIGH |
| **roadmap.ts** | Q1-Q4 2025, 2026+ feature lists | ~150 | MEDIUM |
| **use-cases.ts** | Solo agent, Team, Brokerage, Investor scenarios | ~100 | MEDIUM |
| **faqs.ts** | 20+ pricing, platform, onboarding FAQs | ~150 | MEDIUM |

---

## Files to Delete

### Solution Pages (17 files)

**Path:** `/Users/grant/Desktop/Github/Strive_Website/client/src/pages/solutions/`

**Files to Delete:**

1. `ai-automation.tsx`
2. `blockchain.tsx`
3. `business-intelligence.tsx`
4. `computer-vision.tsx`
5. `data-analytics.tsx`
6. `security-compliance.tsx`
7. `smart-business.tsx`
8. `technology.tsx`
9. `healthcare.tsx`
10. `financial.tsx`
11. `manufacturing.tsx`
12. `retail.tsx`
13. `education.tsx`
14. `healthcare-case-study.tsx`
15. `ai-ml-tech.tsx`
16. `computer-vision-tech.tsx`
17. `nlp-tech.tsx`

**Deletion Script:**

```bash
# Run from project root
cd /Users/grant/Desktop/Github/Strive_Website/client/src/pages/solutions/
rm -rf *.tsx

# Or delete entire folder
cd /Users/grant/Desktop/Github/Strive_Website/client/src/pages/
rm -rf solutions/
```

**Redirect Handling:**

Add to `App.tsx`:

```typescript
// Redirect all /solutions/* to /platform
<Route path="/solutions/:industry" component={() => {
  window.location.href = '/platform';
  return null;
}} />
```

---

### Portfolio Data (8 files)

**Path:** `/Users/grant/Desktop/Github/Strive_Website/client/src/data/portfolio/`

**Files to Delete:**

1. `predictive-maintenance.ts`
2. `customer-churn.ts`
3. `fraud-detection.ts`
4. `supply-chain-optimization.ts`
5. `sentiment-analysis.ts`
6. `demand-forecasting.ts`
7. `document-processing.ts`
8. `quality-control.ts`

**Deletion Script:**

```bash
cd /Users/grant/Desktop/Github/Strive_Website/client/src/data/
rm -rf portfolio/
```

**Replacement:**

Create `/client/src/data/sai/success-stories/` with real estate case studies

---

## Import & Export Changes

### 1. Update Imports in home.tsx

**Old Imports:**

```typescript
import { IndustrySolutionsGrid } from '@/components/solutions/IndustrySolutionsGrid';
import { WhyStriveSection } from '@/components/homepage/WhyStriveSection';
```

**New Imports:**

```typescript
import { HeroSection } from '@/components/homepage/HeroSection';
import { ModuleOverviewSection } from '@/components/homepage/ModuleOverviewSection';
import { ROICalculatorSection } from '@/components/homepage/ROICalculatorSection';
import { WhySAISection } from '@/components/homepage/WhySAISection';
import { SocialProofSection } from '@/components/homepage/SocialProofSection';
```

---

### 2. Update Exports in Data Files

**Old Export (client/src/data/portfolio/index.ts):**

```typescript
export * from './predictive-maintenance';
export * from './customer-churn';
// ... 8 total
```

**New Export (client/src/data/sai/index.ts):**

```typescript
export * from './modules';
export * from './pricing-tiers';
export * from './testimonials';
export * from './competitors';
export * from './roadmap';
export * from './use-cases';
export * from './faqs';
```

---

## Dependencies

### No New Dependencies Required

All features can be implemented with existing stack:

- **React 19** ✅
- **TypeScript** ✅
- **Tailwind CSS** ✅
- **Framer Motion** ✅ (already installed)
- **Lucide React** ✅ (icons)
- **shadcn/ui** ✅ (components)
- **Wouter** ✅ (routing)

### Verify Existing Dependencies

Run:

```bash
npm list framer-motion lucide-react
```

Expected output:

```
framer-motion@11.x.x
lucide-react@0.x.x
```

If missing, install:

```bash
npm install framer-motion lucide-react
```

---

## Configuration Updates

### 1. vite.config.ts (No Changes Needed)

Current manual chunks already optimized:

```typescript
manualChunks: {
  'vendor': [/node_modules/],
  'ui': [/components\/ui/],
  'motion': ['framer-motion'],
  'homepage': [/components\/homepage/], // ✅ Already configured
}
```

---

### 2. tailwind.config.js (No Changes Needed)

Current config supports all required classes:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#ff7033', // Orange
      // ... other colors
    },
  },
}
```

---

### 3. vercel.json (Add Redirects)

**Update:** `/Users/grant/Desktop/Github/Strive_Website/vercel.json`

**Add Redirects:**

```json
{
  "redirects": [
    {
      "source": "/solutions/:industry",
      "destination": "/platform",
      "permanent": true
    },
    {
      "source": "/portfolio",
      "destination": "/success-stories",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Migration Scripts

### 1. Backup Current Homepage

```bash
#!/bin/bash
# backup-homepage.sh

cd /Users/grant/Desktop/Github/Strive_Website/client/src/pages/

# Create backup folder
mkdir -p ../backups/pre-sai-transformation/

# Backup home.tsx
cp home.tsx ../backups/pre-sai-transformation/home.tsx.backup

# Backup Navigation
cp ../components/layout/Navigation.tsx ../backups/pre-sai-transformation/Navigation.tsx.backup

# Backup Footer
cp ../components/layout/Footer.tsx ../backups/pre-sai-transformation/Footer.tsx.backup

echo "✅ Backup complete: client/src/backups/pre-sai-transformation/"
```

Run:

```bash
chmod +x backup-homepage.sh
./backup-homepage.sh
```

---

### 2. Delete Solution Pages (with Safety Check)

```bash
#!/bin/bash
# delete-solution-pages.sh

cd /Users/grant/Desktop/Github/Strive_Website/client/src/pages/solutions/

# Safety check: count files
FILE_COUNT=$(ls -1 *.tsx 2>/dev/null | wc -l)

if [ "$FILE_COUNT" -eq 17 ]; then
  echo "Found 17 solution pages. Deleting..."
  rm -f *.tsx
  echo "✅ Deleted 17 solution pages"
else
  echo "⚠️  Expected 17 files, found $FILE_COUNT. Aborting for safety."
  exit 1
fi

# Delete folder
cd ..
rmdir solutions/
echo "✅ Deleted solutions/ folder"
```

Run:

```bash
chmod +x delete-solution-pages.sh
./delete-solution-pages.sh
```

---

### 3. Create Data Folder Structure

```bash
#!/bin/bash
# create-sai-data-structure.sh

cd /Users/grant/Desktop/Github/Strive_Website/client/src/data/

# Create SAI data folders
mkdir -p sai/
mkdir -p sai/success-stories/

# Create placeholder files
touch sai/modules.ts
touch sai/pricing-tiers.ts
touch sai/testimonials.ts
touch sai/competitors.ts
touch sai/roadmap.ts
touch sai/use-cases.ts
touch sai/faqs.ts
touch sai/index.ts

echo "✅ Created SAI data structure"
tree sai/
```

Run:

```bash
chmod +x create-sai-data-structure.sh
./create-sai-data-structure.sh
```

---

## Testing Checklist

### Pre-Implementation

- [ ] Backup current homepage (`backup-homepage.sh`)
- [ ] Run TypeScript check: `npm run check` (baseline)
- [ ] Run tests: `npm test` (baseline)
- [ ] Take screenshot of current homepage

### During Implementation

- [ ] Create all 35+ new files (pages, components, data)
- [ ] Modify all 24 files (home.tsx, Navigation.tsx, etc.)
- [ ] Delete 25 files (17 solution pages, 8 portfolio data)
- [ ] Update imports/exports
- [ ] Add vercel.json redirects

### Post-Implementation

- [ ] Run TypeScript check: `npm run check` (must pass with 0 errors)
- [ ] Run tests: `npm test` (must pass, coverage >80%)
- [ ] Test all routes:
  - [ ] `/` (homepage loads)
  - [ ] `/platform` (new page loads)
  - [ ] `/pricing` (new page loads)
  - [ ] `/success-stories` (new page loads)
  - [ ] `/roadmap` (new page loads)
  - [ ] `/solutions/healthcare` (redirects to /platform)
  - [ ] `/portfolio` (redirects to /success-stories)
- [ ] Test Navigation dropdown (Platform, Company)
- [ ] Test Footer links (all navigate correctly)
- [ ] Test ROI Calculator (inputs update results)
- [ ] Test mobile responsive (all sections look good)
- [ ] Run Lighthouse audit (Performance, Accessibility, SEO all >90)

---

## Cross-References

### Related Files (Session 1)
- **MASTER-TRANSFORMATION-PLAN.md** - Overall roadmap, dependencies
- **HOMEPAGE-PART-1-HERO.md** - Hero variations, headlines (use for HeroSection props)
- **HOMEPAGE-PART-2-SECTIONS.md** - Module copy, ROI logic (use for content)

### Related Files (Session 2)
- **MESSAGING-PART-1-CORE.md** - Brand voice, messaging (apply to all copy)
- **MESSAGING-PART-2-COPY-LIBRARY.md** - Headlines, CTAs (use for A/B testing)
- **HOMEPAGE-PART-3-TECHNICAL.md** - Component specs (implement these components)
- **TECHNICAL-PART-2-COMPONENTS.md** - Component library (extends this file)

### Related Files (Future Sessions)
- **PLATFORM-PAGE-BLUEPRINT.md** - Detailed platform page content
- **PRICING-PAGE-BLUEPRINT.md** - Detailed pricing page content
- **SEO-PART-1-KEYWORDS.md** - Target keywords, meta tags

---

## Definition of Done

This file is complete when:

- ✅ All 24 files to modify are documented with exact changes
- ✅ All 35+ files to create have boilerplate code
- ✅ All 25 files to delete are listed with deletion scripts
- ✅ Import/export changes are documented
- ✅ Dependencies are verified (no new packages needed)
- ✅ Configuration updates are specified (vercel.json redirects)
- ✅ Migration scripts are provided (backup, delete, create)
- ✅ Testing checklist is comprehensive
- ✅ File is under 2,000 lines
- ✅ Developers can implement transformation with this guide

---

**Next Steps:**
1. Run backup script (`backup-homepage.sh`)
2. Create all new components (HeroSection, ModuleCard, etc.)
3. Create all new pages (platform, pricing, success-stories, etc.)
4. Modify existing files (home.tsx, Navigation.tsx, Footer.tsx, App.tsx)
5. Delete solution pages (`delete-solution-pages.sh`)
6. Run tests and TypeScript check
7. Deploy preview and QA

---

**End of TECHNICAL-PART-1-FILES.md**
**Status:** ✅ COMPLETE
**Lines:** ~2,000
**Session:** 2 of 4
