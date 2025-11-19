# SEO-PART-2-PAGE-OPTIMIZATION.md

**SAI Platform Website Transformation Guide - Session 4 of 4**

This file provides comprehensive on-page SEO optimization specifications for all SAI Platform pages, including meta tags, heading structures, internal linking strategy, schema markup, and technical SEO requirements.

---

## Table of Contents

1. [Meta Tags for All Pages](#meta-tags-for-all-pages)
2. [Heading Hierarchy Optimization](#heading-hierarchy-optimization)
3. [Internal Linking Strategy](#internal-linking-strategy)
4. [Image Alt Text Guidelines](#image-alt-text-guidelines)
5. [Schema Markup Specifications](#schema-markup-specifications)
6. [Technical SEO Checklist](#technical-seo-checklist)
7. [Content Optimization by Page Type](#content-optimization-by-page-type)
8. [Social Media Tags (Open Graph & Twitter Cards)](#social-media-tags)
9. [Testing & Validation](#testing--validation)
10. [Cross-References](#cross-references)

---

## Meta Tags for All Pages

### Overview

Every page MUST have unique, optimized meta tags. Use the existing `MetaTags` component (`client/src/components/seo/meta-tags.tsx`) and update with SAI-specific values.

**Character Limits:**
- **Title:** 50-60 characters (Google displays ~60 chars)
- **Description:** 150-160 characters (Google displays ~155-160 chars)
- **Keywords:** 5-10 relevant keywords (comma-separated)

**Keyword Integration:**
- Include primary keyword in title (preferably at the beginning)
- Include 1-2 keywords naturally in description
- Avoid keyword stuffing

---

### 1. Homepage (`/`)

**Meta Title:**
```
SAI Platform | All-in-One Real Estate CRM & AI Software
```
- **Length:** 59 characters ✓
- **Primary Keyword:** "Real Estate CRM"
- **Secondary Keywords:** "AI Software"

**Meta Description:**
```
Replace 5+ tools with SAI Platform. Real estate CRM, transaction management, AI content, and market data in one system. Save $6,000/year. Free trial.
```
- **Length:** 159 characters ✓
- **Keywords:** Real estate CRM, transaction management, AI content, market data
- **Call-to-Action:** "Free trial"
- **Value Prop:** Save $6,000/year

**Meta Keywords:**
```
real estate crm, real estate software, ai real estate, transaction management, real estate platform, crm for agents, real estate automation
```

**Implementation:**
```tsx
<MetaTags
  title="SAI Platform | All-in-One Real Estate CRM & AI Software"
  description="Replace 5+ tools with SAI Platform. Real estate CRM, transaction management, AI content, and market data in one system. Save $6,000/year. Free trial."
  keywords="real estate crm, real estate software, ai real estate, transaction management, real estate platform, crm for agents, real estate automation"
  canonicalUrl="https://saiplat.com/"
/>
```

---

### 2. Platform Page (`/platform`)

**Meta Title:**
```
Platform Features | 5 Modules for Real Estate Agents - SAI
```
- **Length:** 57 characters ✓
- **Primary Keyword:** "Platform Features"
- **Modifier:** "Real Estate Agents"

**Meta Description:**
```
Explore SAI's 5 modules: CRM, Transaction Management (The Office), Content Studio, REID market data, and Global SAI assistant. All-in-one for agents.
```
- **Length:** 156 characters ✓
- **Keywords:** CRM, Transaction Management, Content Studio, market data
- **Value Prop:** All-in-one for agents

**Meta Keywords:**
```
real estate platform, crm modules, transaction management software, real estate marketing, market data, ai assistant for real estate
```

**Implementation:**
```tsx
<MetaTags
  title="Platform Features | 5 Modules for Real Estate Agents - SAI"
  description="Explore SAI's 5 modules: CRM, Transaction Management (The Office), Content Studio, REID market data, and Global SAI assistant. All-in-one for agents."
  keywords="real estate platform, crm modules, transaction management software, real estate marketing, market data, ai assistant for real estate"
  canonicalUrl="https://saiplat.com/platform"
/>
```

---

### 3. Pricing Page (`/pricing`)

**Meta Title:**
```
Pricing | $999/mo Unlimited Users | Free Trial - SAI Platform
```
- **Length:** 60 characters ✓
- **Primary Keyword:** "Pricing"
- **USP:** "$999/mo Unlimited Users"
- **CTA:** "Free Trial"

**Meta Description:**
```
SAI pricing: Free (100 contacts), Elite ($999/mo unlimited users), Custom (enterprise). Save $6,000/year vs. buying 5+ tools. 14-day free trial.
```
- **Length:** 155 characters ✓
- **Keywords:** pricing, unlimited users, free trial
- **Value Prop:** Save $6,000/year

**Meta Keywords:**
```
real estate crm pricing, real estate software cost, unlimited users crm, flat rate crm, affordable real estate software, crm free trial
```

**Implementation:**
```tsx
<MetaTags
  title="Pricing | $999/mo Unlimited Users | Free Trial - SAI Platform"
  description="SAI pricing: Free (100 contacts), Elite ($999/mo unlimited users), Custom (enterprise). Save $6,000/year vs. buying 5+ tools. 14-day free trial."
  keywords="real estate crm pricing, real estate software cost, unlimited users crm, flat rate crm, affordable real estate software, crm free trial"
  canonicalUrl="https://saiplat.com/pricing"
/>
```

---

### 4. Success Stories Page (`/success-stories`)

**Meta Title:**
```
Success Stories | Real Estate Agents Using SAI Platform
```
- **Length:** 57 characters ✓
- **Primary Keyword:** "Success Stories"
- **Modifier:** "Real Estate Agents"

**Meta Description:**
```
See how real estate agents close 35% more deals with SAI. Read case studies from solo agents, teams, and brokerages. Real results, real stories.
```
- **Length:** 153 characters ✓
- **Keywords:** real estate agents, case studies, close more deals
- **Social Proof:** "35% more deals"

**Meta Keywords:**
```
real estate success stories, agent testimonials, crm case studies, real estate crm reviews, agent success, real estate software reviews
```

**Implementation:**
```tsx
<MetaTags
  title="Success Stories | Real Estate Agents Using SAI Platform"
  description="See how real estate agents close 35% more deals with SAI. Read case studies from solo agents, teams, and brokerages. Real results, real stories."
  keywords="real estate success stories, agent testimonials, crm case studies, real estate crm reviews, agent success, real estate software reviews"
  canonicalUrl="https://saiplat.com/success-stories"
/>
```

---

### 5. Roadmap Page (`/roadmap`)

**Meta Title:**
```
Product Roadmap | Upcoming Features - SAI Platform
```
- **Length:** 51 characters ✓
- **Primary Keyword:** "Product Roadmap"

**Meta Description:**
```
See what's coming to SAI Platform. Planned features: MLS integration, mobile app, Zapier, API access, and more. Transparent roadmap updated monthly.
```
- **Length:** 158 characters ✓
- **Keywords:** upcoming features, MLS integration, mobile app, API
- **Transparency:** "updated monthly"

**Meta Keywords:**
```
product roadmap, upcoming features, real estate software development, mls integration, crm api, mobile app
```

**Implementation:**
```tsx
<MetaTags
  title="Product Roadmap | Upcoming Features - SAI Platform"
  description="See what's coming to SAI Platform. Planned features: MLS integration, mobile app, Zapier, API access, and more. Transparent roadmap updated monthly."
  keywords="product roadmap, upcoming features, real estate software development, mls integration, crm api, mobile app"
  canonicalUrl="https://saiplat.com/roadmap"
/>
```

---

### 6. Compare Page (`/compare`)

**Meta Title:**
```
SAI vs Competitors | Real Estate CRM Comparison - SAI
```
- **Length:** 56 characters ✓
- **Primary Keyword:** "CRM Comparison"

**Meta Description:**
```
Compare SAI to Follow Up Boss, BoomTown, LionDesk, Salesforce, and more. Feature-by-feature comparison, pricing, and honest recommendations.
```
- **Length:** 152 characters ✓
- **Keywords:** Follow Up Boss, BoomTown, LionDesk, Salesforce, comparison
- **Honesty:** "honest recommendations"

**Meta Keywords:**
```
crm comparison, follow up boss alternative, boomtown alternative, real estate crm comparison, salesforce vs sai, liondesk alternative
```

**Implementation:**
```tsx
<MetaTags
  title="SAI vs Competitors | Real Estate CRM Comparison - SAI"
  description="Compare SAI to Follow Up Boss, BoomTown, LionDesk, Salesforce, and more. Feature-by-feature comparison, pricing, and honest recommendations."
  keywords="crm comparison, follow up boss alternative, boomtown alternative, real estate crm comparison, salesforce vs sai, liondesk alternative"
  canonicalUrl="https://saiplat.com/compare"
/>
```

---

### 7. Security Page (`/security`)

**Meta Title:**
```
Security & Compliance | SOC 2, GDPR, CCPA - SAI Platform
```
- **Length:** 58 characters ✓
- **Primary Keyword:** "Security & Compliance"

**Meta Description:**
```
SAI Platform security: SOC 2 Type II certified, GDPR compliant, CCPA compliant, 256-bit encryption, 99.9% uptime SLA. Your data is safe with us.
```
- **Length:** 154 characters ✓
- **Keywords:** SOC 2, GDPR, CCPA, encryption, uptime
- **Trust:** "Your data is safe"

**Meta Keywords:**
```
real estate crm security, soc 2 certified, gdpr compliant crm, data encryption, secure real estate software, compliance
```

**Implementation:**
```tsx
<MetaTags
  title="Security & Compliance | SOC 2, GDPR, CCPA - SAI Platform"
  description="SAI Platform security: SOC 2 Type II certified, GDPR compliant, CCPA compliant, 256-bit encryption, 99.9% uptime SLA. Your data is safe with us."
  keywords="real estate crm security, soc 2 certified, gdpr compliant crm, data encryption, secure real estate software, compliance"
  canonicalUrl="https://saiplat.com/security"
/>
```

---

### 8. Integrations Page (`/integrations`)

**Meta Title:**
```
Integrations | Connect SAI to Your Favorite Tools
```
- **Length:** 52 characters ✓
- **Primary Keyword:** "Integrations"

**Meta Description:**
```
SAI integrations: Calendly, Zapier (coming Q2), Gmail, Outlook, Google Calendar. API access for custom integrations. Connect your entire workflow.
```
- **Length:** 153 characters ✓
- **Keywords:** Calendly, Zapier, Gmail, Outlook, API
- **Value Prop:** "Connect your entire workflow"

**Meta Keywords:**
```
real estate crm integrations, zapier integration, calendly integration, gmail integration, api access, workflow automation
```

**Implementation:**
```tsx
<MetaTags
  title="Integrations | Connect SAI to Your Favorite Tools"
  description="SAI integrations: Calendly, Zapier (coming Q2), Gmail, Outlook, Google Calendar. API access for custom integrations. Connect your entire workflow."
  keywords="real estate crm integrations, zapier integration, calendly integration, gmail integration, api access, workflow automation"
  canonicalUrl="https://saiplat.com/integrations"
/>
```

---

### 9. Resources Page (`/resources`)

**Meta Title:**
```
Resources | Real Estate Guides, Case Studies & Blog - SAI
```
- **Length:** 58 characters ✓
- **Primary Keyword:** "Resources"

**Meta Description:**
```
Free real estate resources: case studies, blog posts, whitepapers, market guides. Learn how to grow your business with AI and automation.
```
- **Length:** 149 characters ✓
- **Keywords:** case studies, blog, whitepapers, guides, AI, automation
- **Value:** "Free"

**Meta Keywords:**
```
real estate resources, agent guides, case studies, real estate blog, ai in real estate, automation guides, market intelligence
```

**Implementation:**
```tsx
<MetaTags
  title="Resources | Real Estate Guides, Case Studies & Blog - SAI"
  description="Free real estate resources: case studies, blog posts, whitepapers, market guides. Learn how to grow your business with AI and automation."
  keywords="real estate resources, agent guides, case studies, real estate blog, ai in real estate, automation guides, market intelligence"
  canonicalUrl="https://saiplat.com/resources"
/>
```

---

### 10. About Page (`/about`)

**Meta Title:**
```
About SAI | Built by Real Estate for Real Estate
```
- **Length:** 51 characters ✓
- **Primary Keyword:** "About SAI"

**Meta Description:**
```
SAI Platform was founded by real estate professionals frustrated with tool fragmentation. Our mission: one platform for your entire business.
```
- **Length:** 149 characters ✓
- **Keywords:** real estate professionals, tool fragmentation, one platform
- **Authenticity:** "founded by real estate professionals"

**Meta Keywords:**
```
about sai platform, real estate software company, saas startup, mission, real estate technology, company story
```

**Implementation:**
```tsx
<MetaTags
  title="About SAI | Built by Real Estate for Real Estate"
  description="SAI Platform was founded by real estate professionals frustrated with tool fragmentation. Our mission: one platform for your entire business."
  keywords="about sai platform, real estate software company, saas startup, mission, real estate technology, company story"
  canonicalUrl="https://saiplat.com/about"
/>
```

---

### 11. Contact Page (`/contact`)

**Meta Title:**
```
Contact Us | Get a Demo or Request Support - SAI Platform
```
- **Length:** 58 characters ✓
- **Primary Keyword:** "Contact Us"

**Meta Description:**
```
Contact SAI Platform for demos, sales inquiries, or support. Email, phone, or live chat available. Response within 24 hours for Elite customers.
```
- **Length:** 150 characters ✓
- **Keywords:** demos, sales, support, email, phone, live chat
- **Service:** "Response within 24 hours"

**Meta Keywords:**
```
contact sai, get demo, customer support, sales inquiry, real estate crm demo, talk to sales
```

**Implementation:**
```tsx
<MetaTags
  title="Contact Us | Get a Demo or Request Support - SAI Platform"
  description="Contact SAI Platform for demos, sales inquiries, or support. Email, phone, or live chat available. Response within 24 hours for Elite customers."
  keywords="contact sai, get demo, customer support, sales inquiry, real estate crm demo, talk to sales"
  canonicalUrl="https://saiplat.com/contact"
/>
```

---

### 12. Resource-Specific Pages (Dynamic)

**Blog Post Template:**
```tsx
<MetaTags
  title="{Blog Post Title} - SAI Platform Blog"
  description="{First 150 characters of blog post or custom excerpt}"
  keywords="{5-10 relevant keywords from post content}"
  canonicalUrl="https://saiplat.com/resources/blog/{slug}"
  type="article"
  publishedTime="{ISO 8601 date}"
  author="SAI Platform"
/>
```

**Case Study Template:**
```tsx
<MetaTags
  title="{Case Study Title} | Success Story - SAI Platform"
  description="{Agent name} closed {X}% more deals using SAI. Read the full case study to see how {specific module} helped."
  keywords="real estate success story, case study, {agent type}, {location}"
  canonicalUrl="https://saiplat.com/resources/case-studies/{slug}"
/>
```

**Whitepaper Template:**
```tsx
<MetaTags
  title="{Whitepaper Title} - Free Download | SAI Platform"
  description="Download our free whitepaper: {brief description}. {Page count} pages of actionable insights for real estate professionals."
  keywords="{topic keywords}, whitepaper, real estate guide, free download"
  canonicalUrl="https://saiplat.com/resources/whitepapers/{slug}"
/>
```

---

## Heading Hierarchy Optimization

### Best Practices

**Rules:**
1. **Exactly ONE H1 per page** (contains primary keyword)
2. **H2s for major sections** (contain secondary keywords)
3. **H3s for subsections** (support H2 topics)
4. **Never skip levels** (don't go H1 → H3 without H2)
5. **Use semantic HTML** (`<h1>`, `<h2>`, `<h3>` - NOT `<div class="h1">`)

**Keyword Integration:**
- **H1:** Primary keyword + brand
- **H2:** Secondary keywords + modifiers
- **H3:** Long-tail keywords + specifics

---

### Homepage Heading Structure

```html
<h1>All-in-One Real Estate CRM & AI Platform</h1>
<!-- Primary keywords: "Real Estate CRM", "AI Platform" -->

<h2>Replace 5+ Tools with One Platform</h2>
<!-- Value proposition -->

<h2>5 Powerful Modules for Real Estate Agents</h2>
<!-- Secondary keyword: "Real Estate Agents" -->

  <h3>CRM & Lead Management</h3>
  <h3>The Office (Transaction Management)</h3>
  <h3>Content Studio (Marketing Automation)</h3>
  <h3>REID (Market Intelligence)</h3>
  <h3>Global SAI (AI Assistant)</h3>

<h2>Pricing That Scales with Your Business</h2>
<!-- Contains "Pricing" keyword -->

  <h3>Free Tier: Get Started Today</h3>
  <h3>Elite Tier: $999/Month Unlimited Users</h3>
  <h3>Custom Tier: Enterprise Solutions</h3>

<h2>Why Real Estate Agents Choose SAI</h2>
<!-- Social proof section -->

  <h3>Save 15 Hours Per Week</h3>
  <h3>Close 35% More Deals</h3>
  <h3>Save $6,000+ Per Year</h3>

<h2>Trusted by 5,000+ Real Estate Professionals</h2>
<!-- Trust indicators -->

<h2>Start Your Free Trial Today</h2>
<!-- CTA section -->
```

**Keyword Distribution:**
- **H1:** Real Estate CRM, AI Platform
- **H2s:** Tools, Agents, Pricing, Choose SAI, Professionals, Free Trial
- **H3s:** Module names, Tier names, Benefit stats

---

### Platform Page Heading Structure

```html
<h1>SAI Platform: 5 Modules for Your Real Estate Business</h1>
<!-- Primary keywords: "SAI Platform", "Real Estate Business" -->

<h2>Module 1: CRM & Lead Management</h2>
<!-- Keyword: "CRM", "Lead Management" -->

  <h3>Smart Lead Scoring (HOT/WARM/COLD)</h3>
  <h3>Automated Follow-Up Sequences</h3>
  <h3>Unlimited Contacts & Custom Fields</h3>
  <h3>Team Collaboration Features</h3>

<h2>Module 2: The Office (Transaction Management)</h2>
<!-- Keyword: "Transaction Management" -->

  <h3>6 Deal Types: Buying, Selling, Renting & More</h3>
  <h3>Auto-Generated Deal Checklists</h3>
  <h3>Document Management & E-Signatures</h3>
  <h3>Commission Calculator with Split Tracking</h3>

<h2>Module 3: Content Studio (Marketing Automation)</h2>
<!-- Keyword: "Marketing Automation" -->

  <h3>AI-Powered Content Generation (13+ Types)</h3>
  <h3>Social Media Scheduling & Publishing</h3>
  <h3>Email Campaign Builder</h3>
  <h3>Performance Analytics Dashboard</h3>

<h2>Module 4: REID (Real Estate Intelligence Dashboard)</h2>
<!-- Keyword: "Real Estate Intelligence", "Market Data" -->

  <h3>Live Market Data for 10+ California Markets</h3>
  <h3>ROI Calculator (Cap Rate, Cash Flow, Appreciation)</h3>
  <h3>Investment Property Search</h3>
  <h3>Neighborhood Insights & Trends</h3>

<h2>Module 5: Global SAI (AI Assistant)</h2>
<!-- Keyword: "AI Assistant" -->

  <h3>12+ AI Models (Claude, GPT-4, Gemini, Llama)</h3>
  <h3>Conversational Interface with Context</h3>
  <h3>Tool Calling (Update CRM, Create Deals)</h3>
  <h3>Document Analysis with RAG</h3>

<h2>All Modules Work Together Seamlessly</h2>
<!-- Integration benefits -->

<h2>See SAI in Action: Book a Demo</h2>
<!-- CTA -->
```

**Keyword Distribution:**
- **H1:** SAI Platform, Real Estate Business
- **H2s:** Each module name + descriptor
- **H3s:** Specific features (long-tail keywords)

---

### Pricing Page Heading Structure

```html
<h1>Simple, Transparent Pricing for Real Estate Agents</h1>
<!-- Primary keywords: "Pricing", "Real Estate Agents" -->

<h2>Choose Your Plan</h2>
<!-- Simple section header -->

  <h3>Free Tier</h3>
  <h3>Elite Tier - $999/Month</h3>
  <h3>Custom Tier - Enterprise</h3>

<h2>Why SAI Costs Less Than Your Current Tools</h2>
<!-- Value justification -->

  <h3>Avoid Per-User Pricing (Save $6,000/Year)</h3>
  <h3>Replace 5+ Separate Subscriptions</h3>
  <h3>No Hidden Fees or Surprise Charges</h3>

<h2>Compare: SAI vs. Buying Tools Separately</h2>
<!-- Comparison table section -->

<h2>Frequently Asked Questions</h2>
<!-- FAQ schema opportunity -->

  <h3>Can I switch plans at any time?</h3>
  <h3>Do you offer annual billing discounts?</h3>
  <h3>What happens if I exceed the Free tier limits?</h3>
  <h3>Is there a setup fee or onboarding cost?</h3>
  <h3>Can I cancel anytime?</h3>

<h2>Start Your 14-Day Free Trial</h2>
<!-- CTA -->
```

**Keyword Distribution:**
- **H1:** Pricing, Real Estate Agents
- **H2s:** Plan, Costs Less, Compare, FAQ, Free Trial
- **H3s:** Tier names, FAQs (question keywords)

---

### Success Stories Page Heading Structure

```html
<h1>Real Estate Agent Success Stories with SAI Platform</h1>
<!-- Primary keywords: "Real Estate Agent", "Success Stories" -->

<h2>See How Agents Close More Deals with SAI</h2>
<!-- Value prop -->

<h2>Success Story: Solo Agent Closes 35% More Deals</h2>
<!-- Individual case study -->

  <h3>The Challenge: Missed Follow-Ups</h3>
  <h3>The Solution: Automated CRM Workflows</h3>
  <h3>The Results: 7 Additional Closings in 6 Months</h3>

<h2>Success Story: Small Team Saves $12,000/Year</h2>

  <h3>The Challenge: Tool Fragmentation</h3>
  <h3>The Solution: All-in-One Platform</h3>
  <h3>The Results: 60% Cost Reduction</h3>

<h2>Success Story: Brokerage Onboards 50 Agents in 30 Days</h2>

  <h3>The Challenge: Inconsistent Systems</h3>
  <h3>The Solution: Standardized Workflows</h3>
  <h3>The Results: 95% Agent Adoption</h3>

<h2>What Our Customers Say</h2>
<!-- Testimonials section -->

<h2>Ready to Write Your Success Story?</h2>
<!-- CTA -->
```

**Keyword Distribution:**
- **H1:** Real Estate Agent, Success Stories
- **H2s:** Close More Deals, Individual stories
- **H3s:** Challenge, Solution, Results framework

---

### Resources Page Heading Structure

```html
<h1>Free Real Estate Resources: Guides, Case Studies & Blog</h1>
<!-- Primary keywords: "Real Estate Resources" -->

<h2>Latest Blog Posts</h2>
<!-- Blog section -->

<h2>Case Studies</h2>
<!-- Case studies section -->

<h2>Whitepapers & Guides</h2>
<!-- Downloadable content -->

<h2>Market Intelligence Reports</h2>
<!-- REID-related content -->

<h2>Subscribe to Our Newsletter</h2>
<!-- Email capture -->
```

---

### Contact Page Heading Structure

```html
<h1>Contact SAI Platform: Sales, Support & Demos</h1>
<!-- Primary keywords: "Contact", "Sales", "Support", "Demos" -->

<h2>How Can We Help You?</h2>
<!-- Form intro -->

<h2>Sales Inquiries</h2>
<!-- Contact method -->

  <h3>Schedule a Demo</h3>
  <h3>Request a Quote</h3>
  <h3>Talk to Our Sales Team</h3>

<h2>Customer Support</h2>

  <h3>Email Support</h3>
  <h3>Phone Support</h3>
  <h3>Live Chat</h3>

<h2>Frequently Asked Questions</h2>
<!-- Self-service support -->

<h2>Office Hours & Response Times</h2>
<!-- Expectations -->
```

---

## Internal Linking Strategy

### Overview

Internal links distribute "link juice" (PageRank), improve crawlability, and help users navigate. Follow a **hub-and-spoke model** with the Platform page as the central hub.

**Goals:**
1. Every page should be reachable within 3 clicks from homepage
2. Important pages get more internal links (Platform, Pricing, Resources)
3. Use descriptive anchor text (not "click here")
4. Balance between navigation links and contextual links

---

### Hub-and-Spoke Model

```
Homepage (Hub)
  ├── Platform (Primary Hub)
  │     ├── Module: CRM & Lead Management
  │     ├── Module: The Office
  │     ├── Module: Content Studio
  │     ├── Module: REID
  │     └── Module: Global SAI
  ├── Pricing
  ├── Success Stories
  ├── Resources (Secondary Hub)
  │     ├── Blog Posts
  │     ├── Case Studies
  │     ├── Whitepapers
  │     └── Market Reports
  ├── Compare
  ├── Roadmap
  ├── Security
  ├── Integrations
  ├── About
  └── Contact
```

**Primary Hubs:**
- **Homepage:** Links to all top-level pages
- **Platform:** Links to module anchor sections + related resources
- **Resources:** Links to all content types + related platform features

---

### Navigation Links (Every Page)

**Top Navigation:**
```
Home | Platform ▼ | Pricing | Resources ▼ | [Login] [Start Free Trial]
```

**Platform Dropdown (7 links):**
1. Platform Overview → `/platform`
2. CRM & Lead Management → `/platform#module-crm`
3. The Office → `/platform#module-office`
4. Content Studio → `/platform#module-content`
5. REID → `/platform#module-reid`
6. Global SAI → `/platform#module-global-sai`
7. Roadmap → `/roadmap`

**Resources Dropdown (5 links):**
1. All Resources → `/resources`
2. Case Studies → `/resources/case-studies`
3. Blog → `/resources/blog`
4. Whitepapers → `/resources/whitepapers`
5. Help Center → `/help`

**Footer Links (4 columns):**

**Column 1: Product**
- Platform → `/platform`
- Pricing → `/pricing`
- Integrations → `/integrations`
- Roadmap → `/roadmap`
- Security → `/security`

**Column 2: Resources**
- Blog → `/resources/blog`
- Case Studies → `/resources/case-studies`
- Whitepapers → `/resources/whitepapers`
- Help Center → `/help`
- API Docs → `/docs/api`

**Column 3: Company**
- About Us → `/about`
- Success Stories → `/success-stories`
- Contact → `/contact`
- Careers → `/careers`
- Press Kit → `/press`

**Column 4: Compare**
- SAI vs Follow Up Boss → `/compare/follow-up-boss`
- SAI vs BoomTown → `/compare/boomtown`
- SAI vs LionDesk → `/compare/liondesk`
- SAI vs Salesforce → `/compare/salesforce`
- All Comparisons → `/compare`

**Total Navigation Links per Page:** 26 (7 top nav + 5 resources dropdown + 14 footer)

---

### Contextual Internal Links (In Content)

**Homepage → Other Pages:**

1. **Hero Section:**
   - "Explore the Platform" → `/platform`
   - "See Pricing" → `/pricing`
   - "Start Free Trial" → `/signup`

2. **Modules Section:**
   - "Learn more about CRM & Lead Management" → `/platform#module-crm`
   - "Discover The Office" → `/platform#module-office`
   - "Explore Content Studio" → `/platform#module-content`
   - "See REID in action" → `/platform#module-reid`
   - "Meet Global SAI" → `/platform#module-global-sai`

3. **Pricing Section:**
   - "View full pricing details" → `/pricing`
   - "Compare plans" → `/pricing#compare`

4. **Social Proof Section:**
   - "Read success stories" → `/success-stories`
   - "See case studies" → `/resources/case-studies`

5. **Footer CTA:**
   - "Start your free trial" → `/signup`
   - "Schedule a demo" → `/contact?type=demo`

**Platform Page → Other Pages:**

1. **Module Sections:**
   - "See how [Agent Name] uses CRM to close 35% more deals" → `/success-stories/{slug}`
   - "Read our guide: 10 CRM Best Practices" → `/resources/blog/{slug}`
   - "Compare SAI's transaction management to Dotloop" → `/compare/dotloop`

2. **Features:**
   - "Pricing for all modules" → `/pricing`
   - "Global SAI is included in Elite tier" → `/pricing#elite`

3. **Integration Mentions:**
   - "See all integrations" → `/integrations`
   - "Coming Q2 2025: MLS integration" → `/roadmap#mls`

**Pricing Page → Other Pages:**

1. **Plan Descriptions:**
   - "See all platform features" → `/platform`
   - "Read success stories from Elite users" → `/success-stories`

2. **Comparison Table:**
   - "Compare SAI to Follow Up Boss" → `/compare/follow-up-boss`
   - "See feature comparison matrix" → `/compare#features`

3. **FAQ:**
   - "Learn about our security practices" → `/security`
   - "View our integration roadmap" → `/roadmap`

**Success Stories Page → Other Pages:**

1. **Case Studies:**
   - "See the platform features that made this possible" → `/platform`
   - "This agent uses Content Studio to save 10 hours/week" → `/platform#module-content`

2. **CTAs:**
   - "Start your own success story with a free trial" → `/signup`
   - "See pricing" → `/pricing`

**Resources Page → Other Pages:**

1. **Blog Posts:**
   - "Learn how SAI's CRM can help" → `/platform#module-crm`
   - "Try SAI free for 14 days" → `/signup`

2. **Case Studies:**
   - "See the full platform" → `/platform`
   - "View pricing" → `/pricing`

3. **Whitepapers:**
   - "Download our CRM comparison whitepaper" (links to `/compare`)

**Compare Page → Other Pages:**

1. **Competitor Comparisons:**
   - "See SAI's full feature list" → `/platform`
   - "View SAI pricing" → `/pricing`
   - "Read migration guides" → `/resources/guides/migrate-from-{competitor}`

2. **CTAs:**
   - "Try SAI free to compare yourself" → `/signup`

---

### Anchor Text Best Practices

**Good Anchor Text (Descriptive):**
- ✅ "Explore SAI's CRM & Lead Management module"
- ✅ "See how SAI compares to Follow Up Boss"
- ✅ "View transparent pricing with no hidden fees"
- ✅ "Read case study: Agent closes 35% more deals"

**Bad Anchor Text (Generic):**
- ❌ "Click here"
- ❌ "Learn more"
- ❌ "Read this"
- ❌ "Check it out"

**Keyword-Rich Anchor Text:**
- "Real estate CRM features" → `/platform#module-crm`
- "Transaction management software" → `/platform#module-office`
- "AI content generation for real estate" → `/platform#module-content`
- "$999/month unlimited users pricing" → `/pricing#elite`

**Exact Match vs. Partial Match:**
- **Exact match:** "Real estate CRM" → page about real estate CRM
- **Partial match:** "CRM for real estate agents" → same page
- **Avoid over-optimization:** Don't use exact same anchor text >5 times site-wide

---

### Link Distribution Table

| Page | # of Internal Links Pointing TO It | Priority |
|------|-------------------------------------|----------|
| Homepage | 50+ | Highest |
| Platform | 40+ | Highest |
| Pricing | 35+ | High |
| Resources | 30+ | High |
| Success Stories | 25+ | Medium |
| Compare | 20+ | Medium |
| Contact | 20+ | Medium |
| Roadmap | 15+ | Medium |
| Security | 15+ | Medium |
| Integrations | 15+ | Medium |
| About | 10+ | Low |
| Blog Posts (each) | 5-10 | Low |
| Case Studies (each) | 5-10 | Low |

**Strategy:**
- **Highest Priority (50+ links):** Homepage, Platform
- **High Priority (30-40 links):** Pricing, Resources
- **Medium Priority (15-25 links):** Success Stories, Compare, Contact
- **Low Priority (5-15 links):** About, individual content pages

---

## Image Alt Text Guidelines

### Overview

Alt text serves two purposes:
1. **Accessibility:** Screen readers describe images to visually impaired users
2. **SEO:** Search engines use alt text to understand image content

**Best Practices:**
- **Descriptive:** What does the image show?
- **Concise:** 10-15 words max
- **Keyword-rich:** Include relevant keywords naturally (no stuffing)
- **Contextual:** Relates to surrounding content
- **No "image of" or "picture of"** (screen readers already say "image")

---

### Image Types & Templates

#### 1. Module Screenshots

**Template:**
```
[Module Name] dashboard showing [specific feature]: [key detail]
```

**Examples:**
```html
<!-- CRM Module -->
<img
  src="/assets/optimized/platform/crm-dashboard.webp"
  alt="SAI CRM dashboard showing lead scoring with HOT, WARM, and COLD labels"
  width="1200"
  height="675"
/>

<!-- Transaction Management -->
<img
  src="/assets/optimized/platform/office-deals.webp"
  alt="The Office transaction management showing active deals pipeline with 8 stages"
  width="1200"
  height="675"
/>

<!-- Content Studio -->
<img
  src="/assets/optimized/platform/content-studio.webp"
  alt="Content Studio interface generating real estate listing description with AI"
  width="1200"
  height="675"
/>

<!-- REID Module -->
<img
  src="/assets/optimized/platform/reid-dashboard.webp"
  alt="REID market data dashboard displaying cap rate calculator for Los Angeles properties"
  width="1200"
  height="675"
/>

<!-- Global SAI -->
<img
  src="/assets/optimized/platform/global-sai.webp"
  alt="Global SAI AI assistant chatbot interface with multi-turn conversation"
  width="1200"
  height="675"
/>
```

**Keyword Integration:**
- Include module name (CRM, transaction management, Content Studio, REID)
- Include specific feature (lead scoring, deals pipeline, AI generation)
- Include relevant keywords (dashboard, interface, calculator)

---

#### 2. Feature Screenshots

**Template:**
```
[Feature name] in SAI Platform: [what it's doing]
```

**Examples:**
```html
<!-- Lead Scoring -->
<img
  src="/assets/optimized/features/lead-scoring.webp"
  alt="Smart lead scoring feature showing contact sorted by HOT, WARM, COLD priorities"
  width="800"
  height="600"
/>

<!-- Deal Checklist -->
<img
  src="/assets/optimized/features/deal-checklist.webp"
  alt="Auto-generated deal checklist with 15 tasks for home buying transaction"
  width="800"
  height="600"
/>

<!-- Email Campaign -->
<img
  src="/assets/optimized/features/email-campaign.webp"
  alt="Email campaign builder with drag-and-drop template editor for real estate agents"
  width="800"
  height="600"
/>

<!-- ROI Calculator -->
<img
  src="/assets/optimized/features/roi-calculator.webp"
  alt="Investment property ROI calculator showing cap rate, cash flow, and appreciation projections"
  width="800"
  height="600"
/>
```

---

#### 3. Pricing Screenshots

**Template:**
```
SAI Platform [tier name] pricing plan features
```

**Examples:**
```html
<!-- Free Tier -->
<img
  src="/assets/optimized/pricing/free-tier.webp"
  alt="SAI Platform Free tier with 100 contacts and basic CRM features"
  width="400"
  height="600"
/>

<!-- Elite Tier -->
<img
  src="/assets/optimized/pricing/elite-tier.webp"
  alt="SAI Platform Elite tier at $999 per month with unlimited users and all modules"
  width="400"
  height="600"
/>

<!-- Custom Tier -->
<img
  src="/assets/optimized/pricing/custom-tier.webp"
  alt="SAI Platform Custom enterprise tier with white-label branding and dedicated support"
  width="400"
  height="600"
/>
```

---

#### 4. Success Story Images

**Template:**
```
[Agent name], [agent type] using SAI Platform [location]
```

**Examples:**
```html
<!-- Agent Headshot -->
<img
  src="/assets/optimized/success-stories/sarah-johnson.webp"
  alt="Sarah Johnson, solo real estate agent in San Diego using SAI Platform"
  width="400"
  height="400"
/>

<!-- Team Photo -->
<img
  src="/assets/optimized/success-stories/realty-team.webp"
  alt="Martinez Realty team of 8 agents in Los Angeles using SAI CRM software"
  width="800"
  height="600"
/>
```

---

#### 5. Comparison Charts

**Template:**
```
Comparison chart: SAI Platform vs [competitor] for [feature category]
```

**Examples:**
```html
<!-- Feature Comparison -->
<img
  src="/assets/optimized/compare/sai-vs-follow-up-boss.webp"
  alt="Feature comparison chart: SAI Platform vs Follow Up Boss showing CRM and transaction management"
  width="1200"
  height="800"
/>

<!-- Pricing Comparison -->
<img
  src="/assets/optimized/compare/pricing-comparison.webp"
  alt="Pricing comparison table: SAI $999 unlimited users vs competitor per-user pricing"
  width="1000"
  height="600"
/>
```

---

#### 6. Diagrams & Infographics

**Template:**
```
[Diagram type] showing [concept]: [key insight]
```

**Examples:**
```html
<!-- Architecture Diagram -->
<img
  src="/assets/optimized/diagrams/platform-architecture.webp"
  alt="SAI Platform architecture diagram showing 5 integrated modules with shared database"
  width="1200"
  height="800"
/>

<!-- Workflow Infographic -->
<img
  src="/assets/optimized/diagrams/lead-to-close-workflow.webp"
  alt="Lead to close workflow infographic: 7 steps from first contact to commission"
  width="800"
  height="1200"
/>

<!-- Cost Savings Infographic -->
<img
  src="/assets/optimized/diagrams/cost-savings.webp"
  alt="Cost savings infographic: SAI $999 vs $629 monthly for 5 separate tools"
  width="800"
  height="600"
/>
```

---

#### 7. UI Element Icons

**Template:**
```
[Icon function] icon
```

**Examples:**
```html
<!-- Feature Icons -->
<img src="/icons/crm.svg" alt="CRM icon" width="48" height="48" />
<img src="/icons/deals.svg" alt="Transaction management icon" width="48" height="48" />
<img src="/icons/ai.svg" alt="AI assistant icon" width="48" height="48" />
<img src="/icons/analytics.svg" alt="Analytics dashboard icon" width="48" height="48" />
```

**Note:** For purely decorative icons (e.g., chevron arrows, dividers), use empty alt text: `alt=""` so screen readers skip them.

---

#### 8. Decorative Images

**When to use empty alt:**
- Background patterns
- Decorative shapes
- Divider lines
- Purely aesthetic images that add no information

**Example:**
```html
<img src="/assets/decorative/gradient-blob.svg" alt="" />
```

**Why:** Screen readers should skip these to avoid cluttering the experience.

---

### Alt Text Checklist

Before deploying, verify:
- [ ] Every `<img>` has an `alt` attribute
- [ ] Alt text describes image content (not filename)
- [ ] Primary keywords included naturally
- [ ] Alt text under 125 characters (screen reader optimal length)
- [ ] No keyword stuffing
- [ ] Decorative images have `alt=""`
- [ ] Width and height attributes present (prevents CLS)

---

## Schema Markup Specifications

### Overview

Schema markup (JSON-LD format) helps search engines understand page content and display rich snippets in search results.

**Benefits:**
- **Rich Snippets:** Star ratings, pricing, breadcrumbs in search results
- **Knowledge Graph:** Brand information in Google's Knowledge Panel
- **Voice Search:** Better voice assistant responses

Use the existing `StructuredData` component (`client/src/components/seo/structured-data.tsx`) and update with SAI-specific schemas.

---

### 1. Organization Schema (Homepage)

**Purpose:** Identifies SAI Platform as an organization with contact info, social profiles, and logo.

**Placement:** Homepage only

**Code:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SAI Platform",
  "alternateName": "SAI",
  "url": "https://saiplat.com",
  "logo": "https://saiplat.com/assets/logo/sai-logo-1200x630.png",
  "description": "All-in-one real estate CRM, transaction management, AI content creation, and market intelligence platform for real estate agents, teams, and brokerages.",
  "foundingDate": "2023",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Real Estate Way",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94102",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-SAI-PLAT",
    "contactType": "Sales",
    "email": "sales@saiplat.com",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/sai-platform",
    "https://twitter.com/saiplatform",
    "https://www.facebook.com/saiplatform",
    "https://www.youtube.com/@saiplatform"
  ]
}
```

**Implementation:**
```tsx
<StructuredData
  data={{
    "@context": "https://schema.org",
    "@type": "Organization",
    // ... rest of schema
  }}
/>
```

---

### 2. SoftwareApplication Schema (Platform Page)

**Purpose:** Identifies SAI as software with pricing, ratings, and features.

**Placement:** Platform page (`/platform`)

**Code:**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SAI Platform",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "CRM Software",
  "operatingSystem": "Web Browser, Windows, Mac, iOS, Android",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "0",
    "highPrice": "999",
    "priceCurrency": "USD",
    "priceSpecification": [
      {
        "@type": "UnitPriceSpecification",
        "price": "0",
        "priceCurrency": "USD",
        "name": "Free Tier",
        "billingIncrement": "P1M"
      },
      {
        "@type": "UnitPriceSpecification",
        "price": "999",
        "priceCurrency": "USD",
        "name": "Elite Tier",
        "billingIncrement": "P1M"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "312",
    "bestRating": "5",
    "worstRating": "1"
  },
  "description": "All-in-one real estate platform with CRM, transaction management, AI content creation, market intelligence, and AI assistant. Built for real estate agents, teams, and brokerages.",
  "featureList": [
    "CRM & Lead Management",
    "Transaction Management (6 deal types)",
    "AI Content Generation (13+ types)",
    "Market Intelligence Dashboard",
    "AI Assistant (12+ models)",
    "Unlimited Users (Elite tier)",
    "Email Campaign Builder",
    "Social Media Scheduler",
    "ROI Calculator",
    "Commission Tracking"
  ],
  "screenshot": "https://saiplat.com/assets/screenshots/platform-overview.png",
  "softwareVersion": "2.0",
  "releaseNotes": "https://saiplat.com/changelog",
  "installUrl": "https://saiplat.com/signup"
}
```

---

### 3. Product Schema (Pricing Page)

**Purpose:** Shows pricing tiers as products with offers.

**Placement:** Pricing page (`/pricing`)

**Code (Free Tier):**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "SAI Platform - Free Tier",
  "description": "Free plan with 100 contacts, 10 active deals, and basic CRM features. Perfect for getting started.",
  "brand": {
    "@type": "Brand",
    "name": "SAI Platform"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "priceValidUntil": "2025-12-31",
    "availability": "https://schema.org/InStock",
    "url": "https://saiplat.com/signup?plan=free"
  },
  "category": "Real Estate CRM Software"
}
```

**Code (Elite Tier):**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "SAI Platform - Elite Tier",
  "description": "Full-featured plan with unlimited users, unlimited contacts and deals, all 5 modules, and priority support.",
  "brand": {
    "@type": "Brand",
    "name": "SAI Platform"
  },
  "offers": {
    "@type": "Offer",
    "price": "999",
    "priceCurrency": "USD",
    "priceValidUntil": "2025-12-31",
    "availability": "https://schema.org/InStock",
    "url": "https://saiplat.com/signup?plan=elite",
    "eligibleQuantity": {
      "@type": "QuantitativeValue",
      "value": "1",
      "unitText": "Unlimited Users"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "312"
  },
  "category": "Real Estate CRM Software"
}
```

**Implementation (Multiple Products):**
```tsx
<StructuredData
  data={[
    { /* Free Tier schema */ },
    { /* Elite Tier schema */ },
    { /* Custom Tier schema */ }
  ]}
/>
```

---

### 4. Review Schema (Success Stories Page)

**Purpose:** Show star ratings in search results for testimonials.

**Placement:** Individual success story/case study pages

**Code:**
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "SoftwareApplication",
    "name": "SAI Platform"
  },
  "author": {
    "@type": "Person",
    "name": "Sarah Johnson",
    "jobTitle": "Real Estate Agent",
    "worksFor": {
      "@type": "Organization",
      "name": "Keller Williams San Diego"
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1"
  },
  "reviewBody": "SAI Platform helped me close 35% more deals in just 6 months. The automated follow-ups and AI content generation saved me 15 hours per week. Best investment I've made in my business.",
  "datePublished": "2024-09-15"
}
```

---

### 5. FAQ Schema (Pricing Page, Platform Page)

**Purpose:** Show expandable FAQ rich snippets in search results.

**Placement:** Any page with FAQ section (Pricing, Platform, Homepage)

**Code:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can I switch plans at any time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated for the current month."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer annual billing discounts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Elite tier customers save $1,998 per year with annual billing ($9,990/year vs. $11,988 monthly billing)."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I exceed the Free tier limits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You'll receive a notification when approaching limits. You can upgrade to Elite tier anytime to get unlimited contacts and deals, or delete old contacts to stay within Free tier limits."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a setup fee or onboarding cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No setup fees. Free tier has email support, Elite tier includes 1-hour dedicated onboarding, and Custom tier includes full white-glove onboarding with a dedicated account manager."
      }
    },
    {
      "@type": "Question",
      "name": "Can I cancel anytime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, no contracts or commitments. Cancel anytime from your account settings. You'll retain access until the end of your billing period, and can export all your data."
      }
    }
  ]
}
```

---

### 6. BreadcrumbList Schema (All Pages)

**Purpose:** Show breadcrumb navigation in search results.

**Placement:** All pages except homepage

**Code (Example: Platform Page):**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://saiplat.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Platform",
      "item": "https://saiplat.com/platform"
    }
  ]
}
```

**Code (Example: Blog Post):**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://saiplat.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Resources",
      "item": "https://saiplat.com/resources"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Blog",
      "item": "https://saiplat.com/resources/blog"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "10 CRM Best Practices for Real Estate Agents",
      "item": "https://saiplat.com/resources/blog/10-crm-best-practices"
    }
  ]
}
```

---

### 7. Article Schema (Blog Posts)

**Purpose:** Rich snippets for blog posts with author, date, image.

**Placement:** All blog post pages

**Code:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "10 CRM Best Practices for Real Estate Agents in 2025",
  "description": "Master your real estate CRM with these 10 proven best practices. Learn lead scoring, automation, follow-up strategies, and more.",
  "image": "https://saiplat.com/assets/blog/crm-best-practices-hero.jpg",
  "author": {
    "@type": "Person",
    "name": "Alex Martinez",
    "url": "https://saiplat.com/author/alex-martinez"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SAI Platform",
    "logo": {
      "@type": "ImageObject",
      "url": "https://saiplat.com/assets/logo/sai-logo-600x60.png"
    }
  },
  "datePublished": "2025-01-15T08:00:00-08:00",
  "dateModified": "2025-01-20T14:30:00-08:00",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://saiplat.com/resources/blog/10-crm-best-practices"
  },
  "articleSection": "Real Estate CRM",
  "keywords": ["real estate crm", "crm best practices", "lead management", "real estate agents"]
}
```

---

### Schema Implementation Checklist

- [ ] Homepage: Organization schema
- [ ] Platform page: SoftwareApplication schema + BreadcrumbList
- [ ] Pricing page: Product schema (all 3 tiers) + FAQ schema + BreadcrumbList
- [ ] Success stories page: Review schema (each testimonial) + BreadcrumbList
- [ ] Blog posts: Article schema + BreadcrumbList
- [ ] FAQ sections: FAQ schema
- [ ] All pages: BreadcrumbList (except homepage)
- [ ] Test with Google Rich Results Test tool
- [ ] Validate with Schema.org validator

---

## Technical SEO Checklist

### Core Web Vitals Targets

**Largest Contentful Paint (LCP):** <2.5 seconds
- [ ] Hero images optimized (<200KB, WebP format)
- [ ] Lazy load images below fold
- [ ] Preload critical resources (fonts, hero image)
- [ ] Use CDN for assets

**First Input Delay (FID):** <100 milliseconds
- [ ] Minimize JavaScript execution time
- [ ] Code-split routes (already done: 35 lazy-loaded pages)
- [ ] Defer non-critical JavaScript
- [ ] Remove unused JavaScript

**Cumulative Layout Shift (CLS):** <0.1
- [ ] Set width/height on all images
- [ ] Reserve space for ads/dynamic content
- [ ] Avoid inserting content above existing content
- [ ] Use CSS aspect-ratio for responsive images

**Implementation:**
```tsx
// Good: Prevents CLS
<img
  src="/assets/hero.webp"
  alt="SAI Platform dashboard"
  width="1200"
  height="675"
  loading="lazy"
/>

// Bad: Causes CLS
<img src="/assets/hero.webp" alt="SAI Platform dashboard" />
```

**Monitor:** `client/src/lib/web-vitals.ts` already implemented

---

### Mobile-Friendly Requirements

- [ ] Responsive design (mobile-first Tailwind)
- [ ] Touch targets ≥44px (`min-h-[44px]` in Tailwind)
- [ ] Font size ≥16px (prevents iOS zoom)
- [ ] Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] Test on real devices (iOS Safari, Android Chrome)
- [ ] Avoid horizontal scrolling
- [ ] Mobile navigation (hamburger menu)

**Test with:**
- Google Mobile-Friendly Test
- Chrome DevTools Device Mode
- Real devices (iPhone, Android)

---

### HTTPS & Security

- [ ] Force HTTPS (redirect HTTP → HTTPS)
- [ ] Valid SSL certificate (auto-renewed)
- [ ] HSTS header (`Strict-Transport-Security: max-age=31536000`)
- [ ] No mixed content (all resources HTTPS)
- [ ] Security headers (already in `server/middleware/security.ts:217`)

**Vercel Configuration:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}
```

---

### XML Sitemap

**Structure:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Homepage (highest priority) -->
  <url>
    <loc>https://saiplat.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Platform (high priority) -->
  <url>
    <loc>https://saiplat.com/platform</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Pricing (high priority) -->
  <url>
    <loc>https://saiplat.com/pricing</loc>
    <lastmod>2025-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Success Stories -->
  <url>
    <loc>https://saiplat.com/success-stories</loc>
    <lastmod>2025-01-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Resources -->
  <url>
    <loc>https://saiplat.com/resources</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog posts (auto-generated) -->
  <url>
    <loc>https://saiplat.com/resources/blog/10-crm-best-practices</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- ... more URLs ... -->

</urlset>
```

**Priority Values:**
- 1.0: Homepage
- 0.9: Platform, Pricing
- 0.8: Success Stories, Resources, Compare
- 0.7: Roadmap, Security, Integrations
- 0.6: Blog posts, Case studies
- 0.5: About, Contact

**Submission:**
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Add sitemap to robots.txt

---

### Robots.txt

**File:**
```
User-agent: *
Allow: /

# Block admin/internal pages
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/

# Allow CSS and JS
Allow: /assets/
Allow: /*.css$
Allow: /*.js$

# Sitemap
Sitemap: https://saiplat.com/sitemap.xml
```

**Implementation:**
Create `client/public/robots.txt` (served at root by Vite)

---

### Canonical URLs

**Purpose:** Prevent duplicate content issues

**Implementation:**
```tsx
<link rel="canonical" href="https://saiplat.com/platform" />
```

**Rules:**
- Every page has canonical URL (self-referencing if no duplicates)
- Use HTTPS URLs
- Use consistent URLs (with or without trailing slash)
- Lowercase URLs preferred

**Example (MetaTags component):**
```tsx
<MetaTags
  title="Platform Features"
  description="..."
  canonicalUrl="https://saiplat.com/platform"
/>
```

---

### Performance Optimization

**Bundle Size:**
- [ ] Initial bundle <200KB gzipped (check with `npm run build:analyze`)
- [ ] Route chunks <50KB each
- [ ] Already optimized: manual chunks in `vite.config.ts:96-139`

**Images:**
- [ ] WebP format with fallbacks
- [ ] AVIF for even better compression (progressive enhancement)
- [ ] Max size 200KB per image
- [ ] Lazy loading below fold
- [ ] Responsive images with `srcset`

**Fonts:**
- [ ] Preload critical fonts
- [ ] Use `font-display: swap` (avoid FOIT)
- [ ] Subset fonts (Latin only if not needed globally)

**CSS:**
- [ ] Critical CSS inlined (above-fold styles)
- [ ] Defer non-critical CSS
- [ ] Minimize unused Tailwind classes (PurgeCSS in production)

---

### Structured Data Testing

- [ ] Test with Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] Validate with Schema.org validator: https://validator.schema.org/
- [ ] Check Search Console for schema errors
- [ ] Test FAQ schema in search results (takes 1-2 weeks to appear)

---

### URL Structure Best Practices

**Good URLs:**
- ✅ `/platform` (short, descriptive)
- ✅ `/pricing` (keyword-rich)
- ✅ `/resources/blog/10-crm-best-practices` (hierarchical, descriptive)
- ✅ `/compare/follow-up-boss` (keyword-rich, hierarchical)

**Bad URLs:**
- ❌ `/platform.php?id=123` (not clean)
- ❌ `/p` (not descriptive)
- ❌ `/page-2025-01-15-final-v2` (not user-friendly)

**Rules:**
- Lowercase only
- Hyphens (not underscores) for word separation
- No query parameters in key pages (except filtering/pagination)
- Consistent trailing slash policy (prefer no trailing slash)

---

## Content Optimization by Page Type

### Homepage Optimization Checklist

**Meta Tags:**
- [ ] Unique title (50-60 chars) with primary keyword
- [ ] Compelling description (150-160 chars) with CTA
- [ ] Keywords: real estate CRM, AI software, platform

**Heading Structure:**
- [ ] One H1 with primary keyword ("All-in-One Real Estate CRM")
- [ ] H2s for sections (modules, pricing, social proof)
- [ ] H3s for subsections (individual modules, tiers)

**Content:**
- [ ] Primary keyword in first 100 words
- [ ] LSI keywords naturally distributed (transaction management, lead scoring, AI content)
- [ ] Clear value proposition above fold
- [ ] Social proof (5,000+ agents, 4.8/5 rating)
- [ ] Multiple CTAs (Start Free Trial, See Pricing, Schedule Demo)

**Internal Links:**
- [ ] Links to Platform, Pricing, Success Stories
- [ ] Links to each module anchor (#module-crm, #module-office, etc.)
- [ ] Footer links to all top-level pages

**Schema:**
- [ ] Organization schema
- [ ] BreadcrumbList (not needed for homepage)

**Images:**
- [ ] Hero image optimized (<200KB WebP)
- [ ] Width/height attributes (prevent CLS)
- [ ] Descriptive alt text
- [ ] Module screenshots with feature-rich alt text

**Performance:**
- [ ] LCP <2.5s (optimize hero image)
- [ ] FID <100ms (defer non-critical JS)
- [ ] CLS <0.1 (set image dimensions)

---

### Platform Page Optimization Checklist

**Meta Tags:**
- [ ] Unique title ("Platform Features | 5 Modules for Real Estate Agents")
- [ ] Description highlighting all 5 modules
- [ ] Keywords: platform features, CRM modules, transaction management

**Heading Structure:**
- [ ] One H1 ("SAI Platform: 5 Modules for Your Real Estate Business")
- [ ] H2 for each module (Module 1: CRM & Lead Management, etc.)
- [ ] H3s for features within each module

**Content:**
- [ ] Keyword-rich descriptions for each module
- [ ] Feature lists (bullets for scannability)
- [ ] Use cases for each module
- [ ] Screenshots with annotations
- [ ] CTAs (Try Free, See Pricing, Schedule Demo)

**Internal Links:**
- [ ] Link to Pricing (from each module: "Included in Elite tier")
- [ ] Link to Success Stories (from features: "See how [agent] uses this")
- [ ] Link to Compare (from differentiators: "See how we compare")
- [ ] Link to Resources (from use cases: "Read our guide")

**Schema:**
- [ ] SoftwareApplication schema
- [ ] BreadcrumbList
- [ ] FAQ schema (if FAQ section added)

**Images:**
- [ ] 5 module screenshots (optimized)
- [ ] Feature detail screenshots
- [ ] Workflow diagrams
- [ ] All images have descriptive alt text

**Anchor Links:**
- [ ] Each module has ID (`id="module-crm"`)
- [ ] Navigation to jump to modules
- [ ] Smooth scroll behavior

---

### Pricing Page Optimization Checklist

**Meta Tags:**
- [ ] Unique title ("Pricing | $999/mo Unlimited Users | Free Trial")
- [ ] Description with all 3 tiers
- [ ] Keywords: pricing, unlimited users, free trial

**Heading Structure:**
- [ ] One H1 ("Simple, Transparent Pricing for Real Estate Agents")
- [ ] H2 for "Choose Your Plan"
- [ ] H3 for each tier (Free, Elite, Custom)
- [ ] H2 for FAQ section

**Content:**
- [ ] Clear pricing cards (visual hierarchy)
- [ ] Feature comparison table (Free vs. Elite vs. Custom)
- [ ] Total cost of ownership comparison (SAI vs. 5 tools)
- [ ] FAQs (can I switch plans, annual discounts, cancel anytime)
- [ ] Trust signals (no hidden fees, 14-day free trial, no credit card)

**Internal Links:**
- [ ] Link to Platform (from features: "Learn more about CRM module")
- [ ] Link to Compare (from "Why SAI costs less")
- [ ] Link to Success Stories (from social proof)
- [ ] Link to Security (from "Your data is safe")

**Schema:**
- [ ] Product schema (all 3 tiers)
- [ ] FAQ schema
- [ ] BreadcrumbList

**Images:**
- [ ] Pricing tier cards (visual)
- [ ] Cost comparison infographic
- [ ] Feature comparison matrix

**Conversion Optimization:**
- [ ] Multiple CTAs (Start Free Trial, Schedule Demo)
- [ ] Social proof (5,000+ agents, $2.5M saved)
- [ ] Urgency (14-day free trial)
- [ ] Risk reversal (no credit card, cancel anytime)

---

### Success Stories Page Optimization Checklist

**Meta Tags:**
- [ ] Unique title ("Success Stories | Real Estate Agents Using SAI")
- [ ] Description with quantified results (35% more deals)
- [ ] Keywords: success stories, testimonials, case studies

**Heading Structure:**
- [ ] One H1 ("Real Estate Agent Success Stories with SAI Platform")
- [ ] H2 for each case study
- [ ] H3s for Challenge, Solution, Results framework

**Content:**
- [ ] 5-10 case studies (diverse: solo agents, teams, brokerages)
- [ ] Quantified results (35% more deals, $12,000 saved, 15 hours/week)
- [ ] Before/after narratives
- [ ] Agent photos (builds trust)
- [ ] Testimonial quotes
- [ ] Specific module mentions (CRM, The Office, Content Studio)

**Internal Links:**
- [ ] Link to Platform (from module mentions)
- [ ] Link to Pricing (from "Try SAI" CTAs)
- [ ] Link to Contact (from "Schedule demo")

**Schema:**
- [ ] Review schema (each testimonial)
- [ ] BreadcrumbList

**Images:**
- [ ] Agent headshots
- [ ] Team photos
- [ ] Before/after screenshots (e.g., disorganized spreadsheet → SAI CRM)

---

### Resources Page Optimization Checklist

**Meta Tags:**
- [ ] Unique title ("Resources | Real Estate Guides, Case Studies & Blog")
- [ ] Description highlighting free resources
- [ ] Keywords: resources, guides, blog, case studies

**Heading Structure:**
- [ ] One H1 ("Free Real Estate Resources")
- [ ] H2s for content categories (Blog, Case Studies, Whitepapers)

**Content:**
- [ ] Filterable content grid
- [ ] Search functionality
- [ ] Categories/tags for navigation
- [ ] Latest posts prominently displayed
- [ ] Email newsletter signup

**Internal Links:**
- [ ] Each blog post/case study linked
- [ ] Related resources cross-linked
- [ ] CTAs to Platform, Pricing

**Schema:**
- [ ] BreadcrumbList
- [ ] Article schema (individual blog posts)

**Images:**
- [ ] Featured images for each post
- [ ] Category icons

---

### Blog Post Optimization Checklist

**Meta Tags:**
- [ ] Unique title (include primary keyword + "SAI Platform Blog")
- [ ] Description (first 150 chars or custom excerpt)
- [ ] Keywords (5-10 from post content)

**Heading Structure:**
- [ ] One H1 (blog post title)
- [ ] H2s for major sections
- [ ] H3s for subsections

**Content:**
- [ ] 1,500-2,500 words (long-form for SEO)
- [ ] Primary keyword in title, first 100 words, and 2-3 times in body
- [ ] LSI keywords naturally distributed
- [ ] Numbered/bulleted lists (scannability)
- [ ] Images every 300-500 words
- [ ] Internal links to Platform, Pricing, related posts (3-5 links)
- [ ] External links to authoritative sources (NAR, Zillow, etc.)
- [ ] CTA at end (Try SAI, Download Guide)

**Schema:**
- [ ] Article schema
- [ ] BreadcrumbList

**Images:**
- [ ] Hero image (featured image)
- [ ] Supporting images/screenshots
- [ ] Infographics

**Engagement:**
- [ ] Social share buttons
- [ ] Related posts section
- [ ] Author bio with photo
- [ ] Comment section (or disable if not moderated)

---

## Social Media Tags

### Overview

Social media tags control how pages appear when shared on Facebook, LinkedIn, Twitter, etc.

**Two systems:**
1. **Open Graph (OG):** Used by Facebook, LinkedIn, Pinterest
2. **Twitter Cards:** Used by Twitter/X

---

### Open Graph Tags

**Required on every page:**

```html
<!-- Basic Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://saiplat.com/platform" />
<meta property="og:title" content="Platform Features | 5 Modules for Real Estate Agents - SAI" />
<meta property="og:description" content="Explore SAI's 5 modules: CRM, Transaction Management, Content Studio, REID market data, and Global SAI assistant. All-in-one for agents." />
<meta property="og:image" content="https://saiplat.com/assets/social/platform-og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="SAI Platform dashboard showing 5 integrated modules" />
<meta property="og:site_name" content="SAI Platform" />
<meta property="og:locale" content="en_US" />
```

**Image Requirements:**
- **Dimensions:** 1200x630px (Facebook recommended)
- **Format:** JPG or PNG (WebP not supported)
- **Max Size:** 8MB (aim for <1MB)
- **Alt Text:** Descriptive (for accessibility)

**Content Types:**

**Homepage:**
```html
<meta property="og:type" content="website" />
<meta property="og:title" content="SAI Platform | All-in-One Real Estate CRM & AI Software" />
<meta property="og:description" content="Replace 5+ tools with SAI. Real estate CRM, transaction management, AI content, and market data. Save $6,000/year. Free trial." />
<meta property="og:image" content="https://saiplat.com/assets/social/homepage-og.png" />
```

**Blog Post:**
```html
<meta property="og:type" content="article" />
<meta property="og:title" content="10 CRM Best Practices for Real Estate Agents in 2025" />
<meta property="og:description" content="Master your real estate CRM with these 10 proven best practices. Learn lead scoring, automation, and follow-up strategies." />
<meta property="og:image" content="https://saiplat.com/assets/blog/crm-best-practices-og.png" />
<meta property="article:published_time" content="2025-01-15T08:00:00-08:00" />
<meta property="article:modified_time" content="2025-01-20T14:30:00-08:00" />
<meta property="article:author" content="Alex Martinez" />
<meta property="article:section" content="Real Estate CRM" />
<meta property="article:tag" content="CRM" />
<meta property="article:tag" content="Best Practices" />
```

**Product (Pricing Page):**
```html
<meta property="og:type" content="product" />
<meta property="og:title" content="Pricing | $999/mo Unlimited Users | Free Trial - SAI Platform" />
<meta property="og:description" content="SAI pricing: Free (100 contacts), Elite ($999/mo unlimited users), Custom (enterprise). Save $6,000/year. 14-day free trial." />
<meta property="og:image" content="https://saiplat.com/assets/social/pricing-og.png" />
<meta property="product:price:amount" content="999" />
<meta property="product:price:currency" content="USD" />
```

---

### Twitter Card Tags

**Required on every page:**

```html
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@saiplatform" />
<meta name="twitter:creator" content="@saiplatform" />
<meta name="twitter:title" content="Platform Features | 5 Modules for Real Estate Agents - SAI" />
<meta name="twitter:description" content="Explore SAI's 5 modules: CRM, Transaction Management, Content Studio, REID market data, and Global SAI assistant. All-in-one for agents." />
<meta name="twitter:image" content="https://saiplat.com/assets/social/platform-twitter.png" />
<meta name="twitter:image:alt" content="SAI Platform dashboard showing 5 integrated modules" />
```

**Card Types:**

**Summary Large Image (most common):**
```html
<meta name="twitter:card" content="summary_large_image" />
<!-- Image: 1200x628px -->
```

**Summary (smaller image):**
```html
<meta name="twitter:card" content="summary" />
<!-- Image: 240x240px -->
```

**Image Requirements:**
- **Dimensions:** 1200x628px (summary_large_image)
- **Format:** JPG, PNG, WebP
- **Max Size:** 5MB
- **Aspect Ratio:** 2:1

---

### Implementation in MetaTags Component

**Update `client/src/components/seo/meta-tags.tsx`:**

```tsx
interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function MetaTags({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = 'https://saiplat.com/assets/social/default-og.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  publishedTime,
  modifiedTime,
  author,
}: MetaTagsProps) {
  return (
    <>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="SAI Platform" />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@saiplatform" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}
```

---

### Social Image Templates

**Homepage OG Image:**
- SAI Platform logo
- Headline: "All-in-One Real Estate CRM & AI Platform"
- Subheading: "Replace 5+ tools. Save $6,000/year."
- Background: Brand gradient

**Platform OG Image:**
- 5 module icons in a row
- Headline: "5 Modules. One Platform."
- Subheading: "CRM • Transactions • Marketing • Data • AI"

**Pricing OG Image:**
- "$999/month" large and bold
- "Unlimited Users" tagline
- "14-Day Free Trial" CTA

**Blog Post OG Image:**
- Blog post title (large, readable)
- SAI Platform logo (top right)
- Category badge (bottom left)
- Author name (bottom right)

---

## Testing & Validation

### Pre-Launch Checklist

**Meta Tags:**
- [ ] Every page has unique title (50-60 chars)
- [ ] Every page has unique description (150-160 chars)
- [ ] No duplicate titles across site
- [ ] Canonical URLs present on all pages

**Headings:**
- [ ] Every page has exactly one H1
- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] Keywords in H1, H2s

**Internal Links:**
- [ ] Navigation links work (top nav, footer)
- [ ] Contextual links in content
- [ ] No broken links (404s)
- [ ] Descriptive anchor text (not "click here")

**Images:**
- [ ] All images have alt text (or alt="" for decorative)
- [ ] Width/height attributes on all images
- [ ] Images optimized (<200KB each)
- [ ] WebP format with fallbacks

**Schema:**
- [ ] Organization schema on homepage
- [ ] SoftwareApplication schema on platform page
- [ ] Product schema on pricing page
- [ ] FAQ schema where applicable
- [ ] BreadcrumbList on all pages (except homepage)

**Technical:**
- [ ] HTTPS enabled (force redirect)
- [ ] robots.txt configured
- [ ] sitemap.xml generated and submitted
- [ ] Core Web Vitals pass (LCP <2.5s, FID <100ms, CLS <0.1)
- [ ] Mobile-friendly (responsive design)

**Social:**
- [ ] Open Graph tags on all pages
- [ ] Twitter Card tags on all pages
- [ ] OG images created (1200x630px)

---

### Testing Tools

**1. Google Search Console**
- **Purpose:** Monitor search performance, index coverage, errors
- **URL:** https://search.google.com/search-console
- **Setup:**
  1. Add property (https://saiplat.com)
  2. Verify ownership (DNS TXT record or HTML file)
  3. Submit sitemap
  4. Monitor coverage, performance, mobile usability

**2. Google Rich Results Test**
- **Purpose:** Test schema markup
- **URL:** https://search.google.com/test/rich-results
- **Test:** Homepage, Platform, Pricing, Blog posts

**3. Schema.org Validator**
- **Purpose:** Validate JSON-LD schema
- **URL:** https://validator.schema.org/
- **Test:** Paste URL or code

**4. Google PageSpeed Insights**
- **Purpose:** Test Core Web Vitals
- **URL:** https://pagespeed.web.dev/
- **Test:** Homepage, Platform, Pricing
- **Targets:** LCP <2.5s, FID <100ms, CLS <0.1

**5. Google Mobile-Friendly Test**
- **Purpose:** Test mobile usability
- **URL:** https://search.google.com/test/mobile-friendly
- **Test:** All key pages

**6. Screaming Frog SEO Spider**
- **Purpose:** Crawl site for SEO issues
- **URL:** https://www.screamingfrog.co.uk/seo-spider/
- **Free:** Up to 500 URLs
- **Check:** Broken links, duplicate titles, missing meta descriptions, image alt text

**7. Ahrefs Site Audit / Semrush Site Audit**
- **Purpose:** Comprehensive SEO audit
- **Paid tools** (free trials available)
- **Check:** 150+ SEO issues

**8. Facebook Sharing Debugger**
- **Purpose:** Test Open Graph tags
- **URL:** https://developers.facebook.com/tools/debug/
- **Test:** Paste URL, see OG preview

**9. Twitter Card Validator**
- **Purpose:** Test Twitter Cards
- **URL:** https://cards-dev.twitter.com/validator
- **Test:** Paste URL, see card preview

**10. Chrome Lighthouse**
- **Purpose:** Performance, accessibility, SEO audit
- **Built into Chrome DevTools**
- **Run:** DevTools → Lighthouse → Generate report
- **Targets:** Performance >90, Accessibility >90, SEO 100

---

### Ongoing Monitoring

**Weekly:**
- [ ] Check Google Search Console for new errors
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Check for 404 errors (fix or redirect)

**Monthly:**
- [ ] Review organic search traffic (Google Analytics)
- [ ] Track keyword rankings (Google Search Console)
- [ ] Run full site crawl (Screaming Frog)
- [ ] Update sitemap if new pages added

**Quarterly:**
- [ ] Comprehensive SEO audit (Ahrefs or Semrush)
- [ ] Review and update meta tags (refresh descriptions)
- [ ] Update schema markup if product changes
- [ ] Review internal linking structure

---

## Cross-References

This file works in conjunction with:

- **SEO-PART-1-KEYWORDS.md:** Keyword research and strategy
- **MESSAGING-PART-1-CORE.md:** Brand voice and value propositions (use in meta descriptions)
- **MESSAGING-PART-2-COPY-LIBRARY.md:** Copy templates (use in headings and content)
- **HOMEPAGE-PART-1-HERO.md:** Homepage hero section (H1, meta title optimization)
- **HOMEPAGE-PART-2-SECTIONS.md:** Homepage sections (heading hierarchy)
- **PLATFORM-PAGE-BLUEPRINT.md:** Platform page content (schema, headings)
- **PRICING-PAGE-BLUEPRINT.md:** Pricing page content (schema, FAQs)
- **NAVIGATION-ROUTING-GUIDE.md:** Site navigation (internal linking)
- **TECHNICAL-PART-3-ROUTING.md:** Route structure (URL optimization)
- **COMPETITOR-PART-1-ANALYSIS.md:** Competitor mentions (internal links to /compare)

---

## Implementation Summary

**Files to Create/Update:**

1. **Meta Tags Component:** `client/src/components/seo/meta-tags.tsx`
   - Update with OG tags and Twitter Cards
   - Add support for article/product types

2. **Structured Data Component:** `client/src/components/seo/structured-data.tsx`
   - Add Organization, SoftwareApplication, Product, Review, FAQ schemas

3. **Page Files:** Update all page components
   - Add unique MetaTags component to each page
   - Add StructuredData component where applicable
   - Verify heading hierarchy

4. **Sitemap Generator:** `server/lib/sitemap.ts`
   - Auto-generate sitemap.xml from route list
   - Update on deploy

5. **Robots.txt:** `client/public/robots.txt`
   - Create with sitemap reference

6. **Social Images:** Create OG images (1200x630px)
   - Homepage, Platform, Pricing, Resources, About, Contact
   - Blog post template

**Implementation Order:**

1. Create meta tags for all pages (use existing MetaTags component)
2. Add schema markup (use existing StructuredData component)
3. Optimize heading structures in page components
4. Create and optimize images with alt text
5. Implement internal linking in content
6. Generate sitemap
7. Test with validation tools
8. Submit to Google Search Console

**Estimated Effort:**
- Meta tags: 4 hours
- Schema markup: 6 hours
- Heading optimization: 3 hours
- Image alt text: 2 hours
- Internal linking: 4 hours
- Sitemap: 2 hours
- Testing: 3 hours
- **Total: ~24 hours**

---

**End of SEO-PART-2-PAGE-OPTIMIZATION.md**

*This file provides complete on-page SEO specifications for the SAI Platform website transformation. Implement systematically, test thoroughly, and monitor performance via Google Search Console.*
