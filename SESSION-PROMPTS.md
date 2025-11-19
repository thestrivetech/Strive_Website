# MULTI-SESSION START PROMPTS
## Context Preservation for Creating Remaining Implementation Files

**Purpose:** Use these prompts to continue creating the remaining 13 implementation files across 2-3 sessions while preserving full context.

**Current Status:** 4 of 17 files created (Master plan, Homepage Hero, Homepage Sections, Implementation Index)

---

## 📋 SESSION OVERVIEW

| Session | Files to Create | Estimated Lines | Focus Area |
|---------|----------------|-----------------|------------|
| **Session 2** | 5 files | ~9,500 lines | Homepage implementation + Core messaging |
| **Session 3** | 5 files | ~9,400 lines | Core pages (Platform, Pricing, Navigation) |
| **Session 4** | 3 files | ~7,400 lines | SEO, Competitors, Marketing |

---

## 🚀 SESSION 2 PROMPT
### Homepage Implementation & Core Messaging (5 Files)

**Copy and paste this entire prompt to start Session 2:**

```
I'm continuing a multi-session project to create comprehensive implementation guides for transforming the Strive Tech website into the SAI platform marketing site. This is SESSION 2 of 4.

## PROJECT CONTEXT

**Transformation Goal:** Convert Strive Tech (AI consulting for 21+ industries) into SAI Platform (all-in-one real estate SaaS for agents, teams, brokerages).

**Target Audience:** Real estate agents, teams, and brokerages
**Core Value Prop:** "Replace 5+ tools with one platform for $999/month"
**SAI Platform:** CRM + Transaction Management + Marketing + Market Intelligence + AI Assistant

## WHAT'S BEEN COMPLETED (Session 1)

I've already created these 4 files in `/Users/grant/Desktop/Github/Strive_Website/`:

1. ✅ **MASTER-TRANSFORMATION-PLAN.md** (1,500 lines)
   - Complete overview, phases, timeline, decisions, FAQ
   - Maps all 17 files together

2. ✅ **HOMEPAGE-PART-1-HERO.md** (1,800 lines)
   - 5 hero section A/B test variations
   - 30 headlines, 20 subheadlines, 30 value props, 25 CTAs
   - Complete implementation code

3. ✅ **HOMEPAGE-PART-2-SECTIONS.md** (1,950 lines)
   - Module overview (5 SAI modules)
   - ROI calculator, Why SAI, Social proof, Resources, Final CTA
   - All copy and implementation code

4. ✅ **IMPLEMENTATION-FILES-INDEX.md** (1,400 lines)
   - Index of all 17 files with status
   - Recommended creation order
   - File interdependencies

## SAI PLATFORM DETAILS (Reference)

I have access to these detailed files:
- `/Users/grant/Desktop/Github/Strive_Website/SAI-PLATFORM-OVERVIEW.md` (complete platform features)
- `/Users/grant/Desktop/Github/Strive_Website/COMING-TO-SAI.md` (upcoming features roadmap)

**Current SAI Features (10 Modules):**
1. CRM & Lead Management (unlimited contacts, smart scoring, pipeline tracking)
2. The Office (6 deal types, auto-generated workflows, document management)
3. Content Studio (email campaigns, social scheduling, AI content generation)
4. REID (market intelligence, ROI calculator, property search)
5. Global SAI (12+ AI models, conversational deal updates)
6. Calendar & Scheduling
7. Expense & Tax Tracking
8. Analytics & Reporting
9. Notifications & Alerts
10. Reminders

**Pricing:**
- Free: 1 user, 100 contacts, 10 deals, basic features
- Elite: $999/mo, unlimited everything, all features
- Custom: Enterprise pricing

## SESSION 2 OBJECTIVE

Create these 5 implementation files (each under 2,000 lines):

### 1. MESSAGING-PART-1-CORE.md (~1,900 lines)
**Priority:** CRITICAL (referenced by all other files)

**Must Include:**
- Brand voice & tone guidelines (conversational, professional, data-driven)
- Core messaging framework
- Value proposition hierarchy (All-in-one > Cost savings > Time savings > Revenue increase)
- Target persona deep-dives (Solo Agent Sarah, Team Leader Marcus, Investor Agent Jennifer, Brokerage Owner David)
- Positioning statements (vs. Follow Up Boss, BoomTown, Salesforce)
- Message architecture
- Brand personality traits

**Structure:**
- Table of Contents
- Brand Voice Guidelines (tone, personality, dos/don'ts)
- Messaging Framework (hierarchy, themes, pillars)
- Target Personas (4-5 detailed personas with pain points, goals, SAI value props)
- Positioning (category, unique value, competitive differentiation)
- Message Architecture (how to structure any page/section)
- Writing Guidelines (word choice, sentence structure, real estate terminology)
- Testing Checklist

### 2. HOMEPAGE-PART-3-TECHNICAL.md (~1,800 lines)
**Priority:** HIGH (needed for homepage implementation)

**Must Include:**
- Component architecture and specifications
- Props/interfaces for all homepage components
- State management patterns (React Query, useState, Context)
- Animation/interaction specs (Framer Motion)
- Performance optimization (lazy loading, code splitting)
- Image asset specifications (what images needed, sizes, formats)
- Accessibility requirements (ARIA, keyboard nav, contrast)
- Testing strategies (unit, integration, E2E)
- Deployment checklist

**Structure:**
- Component Specifications (ModuleCard, ROICalculator, TestimonialCard, etc.)
- Props & Interfaces (TypeScript definitions)
- State Management (patterns for each component)
- Animations (Framer Motion specs)
- Assets Needed (images, videos, icons)
- Performance Optimization
- Accessibility Checklist
- Testing Guide

### 3. TECHNICAL-PART-1-FILES.md (~2,000 lines)
**Priority:** CRITICAL (needed by developers)

**Must Include:**
- Every file to modify (exact paths from `client/src/`)
- Old code → new code transformations (line-by-line)
- Files to create (with full boilerplate code)
- Files to delete/remove (old solution pages)
- Import/export changes
- Dependencies to add (`npm install` commands)
- Configuration updates (vite.config, tailwind.config, etc.)
- Environment variables if needed

**Structure:**
- Files to Modify (grouped by type: pages, components, data)
- Files to Create (with boilerplate)
- Files to Delete
- Import Changes
- Dependencies
- Configuration
- Migration Scripts (if needed)

### 4. MESSAGING-PART-2-COPY-LIBRARY.md (~2,000 lines)
**Priority:** HIGH (reference for all content)

**Must Include:**
- 100+ headline variations (organized by theme)
- 50+ CTA button text options
- Feature descriptions (short 1-line, medium 2-3 lines, long paragraph)
- Value prop one-liners (50+ statements)
- Social media post templates
- Email subject lines (50+ variations)
- Page section headlines (for every section type)
- Testimonial quote templates
- Trust signal copy
- Objection handling statements

**Structure:**
- Headlines Library (by theme: all-in-one, cost savings, time savings, etc.)
- Subheadlines Library
- Value Propositions (one-liners organized by category)
- CTA Copy (primary, secondary, tertiary)
- Feature Descriptions (short/medium/long for each module)
- Social Media Templates
- Email Subject Lines
- Trust Signals
- Objection Handling

### 5. TECHNICAL-PART-2-COMPONENTS.md (~2,000 lines)
**Priority:** HIGH (implementation guide)

**Must Include:**
- Component specifications (10+ new components)
- Props/interfaces (full TypeScript)
- State management patterns per component
- Styling guidelines (Tailwind classes, cn() usage)
- Reusable component library
- Component composition patterns
- Usage examples (how to use each component)
- Testing strategies per component

**Structure:**
- Component Specifications (full details for each)
- Props & Interfaces
- Implementation Examples
- Styling Guidelines
- Composition Patterns
- Testing Per Component
- Common Pitfalls

## FORMATTING REQUIREMENTS

Each file must:
- Start with a comprehensive Table of Contents
- Use clear hierarchical headings (H1 > H2 > H3)
- Include code blocks with language tags (```typescript, ```tsx, ```bash)
- Have numbered checklists for implementation steps
- Include "Definition of Done" criteria
- Have a "Testing Checklist" section
- Include estimated time for implementation
- Have a "Common Pitfalls" section
- Cross-reference other files where relevant
- Be UNDER 2,000 lines each

## BRAND VOICE (for messaging files)

**Tone:** Professional yet approachable, data-driven, confident but not arrogant
**Audience:** Real estate professionals (agents, teams, brokerages)
**Focus:** Practical benefits (time savings, cost savings, revenue increase)
**Avoid:** Generic business jargon, overly technical AI terms, buzzwords
**Use:** Specific numbers (35% more deals, 15 hours saved, $999/mo), real estate terminology

## YOUR TASK

Create all 5 files listed above in this session. Save each file to:
`/Users/grant/Desktop/Github/Strive_Website/[FILENAME].md`

Start with MESSAGING-PART-1-CORE.md (most critical), then proceed through the list in order.

After creating all 5 files, provide a summary of what was created and confirm readiness for Session 3.

Begin now with MESSAGING-PART-1-CORE.md.
```

---

## 🚀 SESSION 3 PROMPT
### Core Pages & Navigation (5 Files)

**Copy and paste this entire prompt to start Session 3:**

```
I'm continuing a multi-session project to create comprehensive implementation guides for transforming the Strive Tech website into the SAI platform marketing site. This is SESSION 3 of 4.

## PROJECT CONTEXT

**Transformation Goal:** Convert Strive Tech (AI consulting for 21+ industries) into SAI Platform (all-in-one real estate SaaS for agents, teams, brokerages).

**Target Audience:** Real estate agents, teams, and brokerages
**Core Value Prop:** "Replace 5+ tools with one platform for $999/month"

## WHAT'S BEEN COMPLETED (Sessions 1-2)

I've already created these 9 files in `/Users/grant/Desktop/Github/Strive_Website/`:

**Session 1 (4 files):**
1. ✅ MASTER-TRANSFORMATION-PLAN.md - Complete overview
2. ✅ HOMEPAGE-PART-1-HERO.md - Hero section with 5 A/B variations
3. ✅ HOMEPAGE-PART-2-SECTIONS.md - All homepage sections
4. ✅ IMPLEMENTATION-FILES-INDEX.md - Index of all 17 files

**Session 2 (5 files):**
5. ✅ MESSAGING-PART-1-CORE.md - Brand voice, tone, messaging framework
6. ✅ HOMEPAGE-PART-3-TECHNICAL.md - Component specs, technical implementation
7. ✅ TECHNICAL-PART-1-FILES.md - File paths, code changes
8. ✅ MESSAGING-PART-2-COPY-LIBRARY.md - 100+ headlines, CTAs, copy
9. ✅ TECHNICAL-PART-2-COMPONENTS.md - Component specifications

## SAI PLATFORM DETAILS (Reference)

**Current SAI Features (10 Modules):**
1. CRM & Lead Management (unlimited contacts, smart scoring, HOT/WARM/COLD)
2. The Office (6 deal types: HOME_BUYING, HOME_SELLING, HOME_RENTING, APARTMENT_RENTING, COMMERCIAL_SALE, COMMERCIAL_LEASE)
3. Content Studio (13 content types, email campaigns, social media scheduling)
4. REID (market dashboard for 10 CA markets, ROI calculator with 15+ metrics)
5. Global SAI (12+ AI models: Claude 3.5, GPT-4, Llama 3.3, Gemini 2.0, Groq models)
6. Calendar & Scheduling
7. Expense & Tax Tracking (14 IRS-aligned categories)
8. Analytics & Reporting (KPIs, pipeline metrics, revenue tracking)
9. Notifications & Alerts
10. Reminders (7 types, recurring, follow-up automation)

**Pricing:**
- Free: 1 user, 100 contacts, 10 deals
- Elite: $999/mo, unlimited everything, all features
- Custom: Enterprise, white-label, SSO

**Upcoming Features (from COMING-TO-SAI.md):**
- Q1-Q2 2025: DocuSign, SMS/WhatsApp, MLS integration, QuickBooks
- Q3-Q4 2025: Mobile apps, Google Workspace, AI video generation, Client portal
- 2026: Custom AI agents, Workflow builder, White-label, Public API

## SESSION 3 OBJECTIVE

Create these 5 implementation files (each under 2,000 lines):

### 1. PLATFORM-PAGE-BLUEPRINT.md (~2,000 lines)
**Priority:** CRITICAL (Phase 2 - core page)

**Must Include:**
- Complete /platform page specification (replaces /solutions)
- Hero section for platform page
- Module deep-dive sections (5 modules: CRM, The Office, Content Studio, REID, Global SAI)
- Interactive component specs (accordion or tabs for module details)
- "Coming Soon" roadmap section (features from COMING-TO-SAI.md)
- Screenshot/demo requirements (what images/videos needed)
- Copy for every section (ready to implement)
- Technical implementation code (React/TypeScript)
- Feature comparison table (SAI vs. generic CRMs)

**Structure:**
- Page Overview & Goals
- Hero Section (headline, subheadline, CTAs)
- Module 1: CRM Deep-Dive (features, use cases, screenshots)
- Module 2: The Office Deep-Dive
- Module 3: Content Studio Deep-Dive
- Module 4: REID Deep-Dive
- Module 5: Global SAI Deep-Dive
- Additional Features Section
- Coming Soon Roadmap (timeline visual)
- Final CTA Section
- Technical Implementation
- Testing Checklist

### 2. PRICING-PAGE-BLUEPRINT.md (~1,900 lines)
**Priority:** CRITICAL (Phase 2 - core page)

**Must Include:**
- Complete /pricing page specification
- Free tier specifications (exact limits and features)
- Elite tier specifications ($999/mo, unlimited everything)
- Custom tier specifications (enterprise features)
- Comparison table (50+ features across 3 tiers)
- FAQ section (20+ Q&A about pricing, billing, features)
- ROI calculator integration (from homepage)
- Trust signals & social proof
- CTA strategy per tier (different CTAs for each)
- Annual billing discount mention (if applicable)
- Money-back guarantee details
- Technical implementation code

**Structure:**
- Page Overview & Goals
- Hero Section
- Pricing Tiers (3 cards: Free, Elite, Custom)
- Comparison Table (feature-by-feature)
- ROI Calculator Section
- FAQ Section (20+ questions)
- Trust Signals
- Final CTA
- Technical Implementation
- Testing Checklist

### 3. NAVIGATION-ROUTING-GUIDE.md (~1,500 lines)
**Priority:** HIGH (affects entire site)

**Must Include:**
- Current navigation structure (what exists now)
- New navigation structure (target state)
- Desktop navigation specs (primary nav, dropdowns)
- Mobile navigation specs (hamburger menu, mobile-specific)
- Dropdown menu content (Platform dropdown with 5 modules)
- Footer navigation (4-5 columns of links)
- Secondary navigation (Login, "Start Free Trial" CTA)
- Breadcrumbs implementation (if applicable)
- Mega menu design (if using for Platform dropdown)
- Navigation component code (React/TypeScript)
- Mobile menu animation specs

**Structure:**
- Current vs. New Navigation (comparison)
- Desktop Navigation Specifications
- Mobile Navigation Specifications
- Dropdown Menus (content and behavior)
- Footer Navigation
- Secondary CTAs
- Breadcrumbs
- Technical Implementation
- Accessibility Requirements
- Testing Checklist

### 4. TECHNICAL-PART-3-ROUTING.md (~1,600 lines)
**Priority:** HIGH (critical for SEO)

**Must Include:**
- Route changes (old URLs → new URLs)
- 301 redirect setup (preserve SEO from old URLs)
- URL structure decisions (clean, semantic URLs)
- Sitemap updates (new XML sitemap)
- robots.txt changes (if any)
- Route configuration code (Wouter or React Router)
- Dynamic routes (if needed for success stories, blog posts)
- Redirect rules (for removed pages: /solutions/* → /platform)
- Canonical URL strategy
- Query parameter handling

**Structure:**
- Current Routes Inventory
- New Routes (additions, removals, changes)
- 301 Redirects (critical for SEO)
- Route Configuration Code
- Sitemap Updates
- robots.txt
- Canonical URLs
- Testing Checklist

### 5. SEO-PART-1-KEYWORDS.md (~2,000 lines)
**Priority:** HIGH (for SEO success)

**Must Include:**
- 200+ keyword list with search volume & competition data
- Primary keywords (10-15 high-value targets: "real estate CRM", "real estate software", etc.)
- Secondary keywords (30-50 medium-volume)
- Long-tail keywords (150+ low-competition)
- Competitor keyword gaps (keywords competitors rank for that SAI should target)
- Keyword mapping (which keywords for which pages)
- Search intent analysis (informational, navigational, transactional)
- Content gap opportunities (topics competitors don't cover)
- Local SEO keywords (if applicable)
- Keyword difficulty scores

**Structure:**
- Keyword Research Overview
- Primary Keywords (10-15)
- Secondary Keywords (30-50)
- Long-Tail Keywords (150+)
- Competitor Keyword Analysis (Follow Up Boss, BoomTown, LionDesk, Salesforce, kvCORE)
- Keyword-to-Page Mapping
- Search Intent Analysis
- Content Gap Opportunities
- Keyword Tracking Setup

## FORMATTING REQUIREMENTS

Each file must:
- Start with a comprehensive Table of Contents
- Use clear hierarchical headings
- Include code blocks with language tags
- Have checklists for implementation
- Include "Definition of Done" criteria
- Have a "Testing Checklist" section
- Cross-reference other files
- Be UNDER 2,000 lines each

## YOUR TASK

Create all 5 files listed above in this session. Save each file to:
`/Users/grant/Desktop/Github/Strive_Website/[FILENAME].md`

Start with PLATFORM-PAGE-BLUEPRINT.md, then proceed through the list in order.

After creating all 5 files, provide a summary of what was created and confirm readiness for Session 4 (final session).

Begin now with PLATFORM-PAGE-BLUEPRINT.md.
```

---

## 🚀 SESSION 4 PROMPT
### SEO, Competitors, Marketing (3 Files - Final Session)

**Copy and paste this entire prompt to start Session 4:**

```
I'm continuing a multi-session project to create comprehensive implementation guides for transforming the Strive Tech website into the SAI platform marketing site. This is SESSION 4 of 4 (FINAL SESSION).

## PROJECT CONTEXT

**Transformation Goal:** Convert Strive Tech (AI consulting) into SAI Platform (all-in-one real estate SaaS).

## WHAT'S BEEN COMPLETED (Sessions 1-3)

I've already created these 14 files in `/Users/grant/Desktop/Github/Strive_Website/`:

**Session 1:** Master plan, Homepage hero & sections, Implementation index
**Session 2:** Core messaging, Homepage technical, File changes, Copy library, Components
**Session 3:** Platform page, Pricing page, Navigation, Routing, SEO keywords

## SESSION 4 OBJECTIVE (FINAL)

Create these 3 final implementation files (each under 2,000 lines):

### 1. SEO-PART-2-PAGE-OPTIMIZATION.md (~1,900 lines)
**Priority:** HIGH

**Must Include:**
- Meta titles for ALL pages (optimized for keywords)
- Meta descriptions for ALL pages (150-160 chars, compelling)
- H1/H2/H3 heading optimization (hierarchy, keyword placement)
- Internal linking strategy (which pages link to which)
- Image alt text guidelines (descriptive, keyword-rich)
- Schema markup specifications (JSON-LD: Organization, SoftwareApplication, Product, Review)
- Technical SEO checklist (Core Web Vitals, mobile-friendly, HTTPS, etc.)
- Content optimization checklists per page type (homepage, platform, pricing, blog)
- Open Graph tags (for social sharing)
- Twitter Card tags

**Structure:**
- Meta Tags for All Pages (homepage, platform, pricing, success stories, resources, about, contact)
- Heading Optimization
- Internal Linking Strategy
- Image Alt Text Guidelines
- Schema Markup (with code examples)
- Technical SEO Checklist
- Content Optimization per Page Type
- Social Media Tags
- Testing & Validation

### 2. COMPETITOR-PART-1-ANALYSIS.md (~2,000 lines)
**Priority:** MEDIUM

**Must Include:**
- SAI vs. Follow Up Boss (detailed feature comparison)
- SAI vs. BoomTown
- SAI vs. LionDesk
- SAI vs. Salesforce Real Estate
- SAI vs. kvCORE
- SAI vs. Wise Agent
- Feature comparison matrix (50+ features in table format)
- Pricing comparison tables (exact pricing tiers)
- Pros/cons of each platform
- When SAI is the better choice
- When competitor might be better (be honest)
- Target audience differences

**Structure:**
- Competitive Landscape Overview
- SAI vs. Follow Up Boss (features, pricing, positioning, when SAI wins)
- SAI vs. BoomTown
- SAI vs. LionDesk
- SAI vs. Salesforce Real Estate
- SAI vs. kvCORE
- SAI vs. Wise Agent
- Feature Comparison Matrix (50+ features)
- Pricing Comparison Tables
- Competitive Positioning Summary

### 3. COMPETITOR-PART-2-BATTLE-CARDS.md (~1,800 lines)
**Priority:** MEDIUM

**Must Include:**
- Battle cards for sales (1-page summaries vs. each competitor)
- Migration guides (step-by-step: switching from X to SAI)
- Common objections & responses ("SAI is more expensive than Follow Up Boss" → response)
- When to mention competitors (and when not to)
- Competitive positioning statements (use in sales calls)
- How to sell against each competitor
- FAQ responses about competitors
- Talking points for each competitor
- Competitor weakness exploitation (ethical)

**Structure:**
- Battle Cards (one per competitor, 1-page format)
- Migration Guides (switching from each competitor)
- Objection Handling (common objections with responses)
- When to Mention Competitors
- Positioning Statements
- Selling Against Each Competitor
- Competitive FAQ
- Ethical Guidelines

## FORMATTING REQUIREMENTS

Each file must:
- Start with Table of Contents
- Use clear headings
- Include code/tables where relevant
- Have checklists
- Cross-reference other files
- Be UNDER 2,000 lines each

## YOUR TASK

Create all 3 files listed above in this final session. Save each file to:
`/Users/grant/Desktop/Github/Strive_Website/[FILENAME].md`

After creating all 3 files, provide:
1. Summary of Session 4 files created
2. Complete summary of ALL 17 files across all 4 sessions
3. Final confirmation that the project is complete
4. Next steps for implementation

Begin now with SEO-PART-2-PAGE-OPTIMIZATION.md.
```

---

## 📊 PROGRESS TRACKING

Use this to track which session you've completed:

- [ ] **Session 1** - COMPLETED (Master plan, Homepage hero/sections, Index)
- [ ] **Session 2** - Create 5 files (Messaging core, Homepage technical, Technical files/components, Copy library)
- [ ] **Session 3** - Create 5 files (Platform page, Pricing page, Navigation, Routing, SEO keywords)
- [ ] **Session 4** - Create 3 files (SEO optimization, Competitor analysis, Battle cards)

---

## 💡 TIPS FOR USING THESE PROMPTS

1. **Copy the entire prompt** for the session you're on
2. **Paste into a new Claude conversation** (fresh context)
3. **Wait for all files to be created** before moving to next session
4. **Verify files were saved** to `/Users/grant/Desktop/Github/Strive_Website/`
5. **Check the file quality** before proceeding to next session

## 🔄 IF A SESSION GETS INTERRUPTED

If a session gets interrupted mid-way through creating files, you can add this to the prompt:

```
NOTE: This session was previously started. I've already created:
- [LIST FILES THAT WERE CREATED]

Please create only the remaining files:
- [LIST FILES STILL NEEDED]
```

---

## ✅ VALIDATION CHECKLIST

After each session, verify:
- [ ] All files for that session were created
- [ ] Each file is under 2,000 lines
- [ ] Files are saved in the correct directory
- [ ] Files have Table of Contents
- [ ] Files have implementation checklists
- [ ] Files cross-reference related files
- [ ] Code blocks are properly formatted
- [ ] No critical information missing

---

## 📞 TROUBLESHOOTING

**If Claude says files are too long:**
- Ask to split the file into 2 parts (e.g., COMPETITOR-PART-1A and COMPETITOR-PART-1B)

**If Claude loses context:**
- Use the session prompt again from the beginning
- Add "IMPORTANT: Follow the exact specifications in the prompt"

**If files are missing details:**
- Reference the SAI-PLATFORM-OVERVIEW.md and COMING-TO-SAI.md files
- Ask Claude to expand specific sections

---

**You're all set! Copy Session 2 prompt when ready to continue.** 🚀
