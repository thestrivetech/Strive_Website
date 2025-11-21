# HOMEPAGE TRANSFORMATION - PART 1: HERO SECTION
## Complete Hero Section Overhaul for SAI Platform

**File:** `client/src/pages/home.tsx`
**Priority:** CRITICAL
**Estimated Time:** 4-6 hours
**Dependencies:** MESSAGING-PART-1-CORE.md

---

## ⚠️ CRITICAL WARNING - READ FIRST!

**🔴 HERO COMPONENT ALREADY EXISTS - EDIT, DON'T RECREATE!**

1. **CHECK FIRST:** `client/src/components/homepage/HeroSection.tsx` ALREADY EXISTS (140 lines)!
2. **EDIT CONTENT:** Update headline, subheadline, CTA text - don't rebuild component
3. **VERIFY STRUCTURE:** Read existing component to understand current implementation
4. **UPDATE home.tsx:** Verify it's using the HeroSection component correctly

**This document is for REFERENCE and MESSAGING GUIDANCE. Edit the existing HeroSection component!**

---

## TABLE OF CONTENTS

1. [Current State Analysis](#current-state-analysis)
2. [Target State Specification](#target-state-specification)
3. [Hero Variations for A/B Testing](#hero-variations-for-ab-testing)
4. [Copy Library](#copy-library)
5. [Visual Design Specifications](#visual-design-specifications)
6. [Technical Implementation](#technical-implementation)
7. [Testing Checklist](#testing-checklist)

---

## CURRENT STATE ANALYSIS

### Existing Hero Section

**Current Headline:**
```
"Transform Your Business with AI to Lead Your Industry, Not Just Compete"
```

**Current Subheadline:**
```
"Are you struggling to outpace your competition with manual processes and outdated tools?
At Strive, we help you unlock the potential of artificial intelligence to streamline operations,
boost efficiency, and achieve sustainable growth. Our tailored AI solutions are designed to
transform your business—whether you're in healthcare, finance, retail, or any other industry."
```

**Current CTAs:**
- Primary: "Get Started"
- Secondary: "Book Free Assessment"

**Problems:**
1. ❌ Generic "transform your business" messaging
2. ❌ No specific value proposition
3. ❌ Too wordy (unclear what product does)
4. ❌ "All industries" positioning dilutes message
5. ❌ No clear product name (SAI)
6. ❌ CTAs are vague ("Get Started" doesn't say what you're starting)
7. ❌ No social proof or trust signals
8. ❌ No clear differentiation

---

## TARGET STATE SPECIFICATION

### Hero Section Goals

1. **Clear Identity:** SAI is an all-in-one real estate platform
2. **Specific Value Prop:** Replace 5+ tools, save time, save money
3. **Target Audience:** Real estate agents (solo, teams, brokerages)
4. **Compelling CTA:** Start free trial (clear next step)
5. **Trust Signals:** No credit card, set up in 5 minutes, etc.
6. **Visual Proof:** Platform screenshot or demo embed

### Hero Formula

```
[CLEAR IDENTITY] + [SPECIFIC VALUE] + [PROOF] + [CTA] + [TRUST SIGNALS]
```

**Example Applied:**
- **Identity:** "SAI - The All-in-One Real Estate Platform"
- **Value:** "Replace 5+ tools. Save 15 hours/week. Close 35% more deals."
- **Proof:** Platform screenshot showing CRM + deals + analytics
- **CTA:** "Start Free Trial" (primary), "Watch 2-Min Demo" (secondary)
- **Trust:** "✓ No credit card required • ✓ Set up in 5 minutes • ✓ Import your data instantly"

---

## HERO VARIATIONS FOR A/B TESTING

### Variation A: "Replace Multiple Tools" (Recommended Default)

**Headline:**
```
Run Your Entire Real Estate Business from One Platform
```

**Subheadline:**
```
Stop juggling 5+ tools. SAI gives real estate agents a complete CRM, transaction
management, marketing automation, market intelligence, and AI assistant—all in
one place for $999/month.
```

**Value Props (3 bullet points):**
- ✓ Replace Follow Up Boss, Dotloop, Mailchimp, HouseCanary, Buffer—all in one
- ✓ Save 15+ hours every week with AI-powered automation
- ✓ Unlimited users, unlimited deals—one flat price

**CTAs:**
- Primary: "Start Free Trial" (blue button, prominent)
- Secondary: "Watch 2-Minute Demo" (outlined button)

**Trust Bar:**
```
✓ No credit card required  •  ✓ Set up in 5 minutes  •  ✓ Import your data instantly
```

**Why This Works:**
- Lead with pain point (juggling tools)
- Clear value prop (all-in-one)
- Specific price point ($999/mo establishes transparency)
- Concrete benefits (save time, replace specific tools)

---

### Variation B: "Time Savings Focus"

**Headline:**
```
Real Estate Agents: Get 15+ Hours Back Every Week
```

**Subheadline:**
```
SAI automates your CRM, transaction workflows, marketing, and market analysis—
so you can spend time with clients, not fighting with software. One platform
for your entire business.
```

**Value Props:**
- ✓ Automate repetitive tasks with AI assistance
- ✓ Never miss a deadline with smart transaction workflows
- ✓ Professional market intelligence to win investor clients

**CTAs:**
- Primary: "Try SAI Free for 30 Days"
- Secondary: "See How It Works"

**Trust Bar:**
```
Join 5,000+ real estate professionals  •  No long-term contracts  •  Cancel anytime
```

**Why This Works:**
- Lead with specific benefit (15 hours/week)
- Addresses pain (spending time on software vs. clients)
- Emphasizes automation
- Social proof (5,000+ agents)

---

### Variation C: "Cost Savings Focus"

**Headline:**
```
Cut Your Real Estate Software Costs by 60%—While Doing More
```

**Subheadline:**
```
Most agents pay $1,000+/month across 5-7 disconnected tools. SAI replaces them
all—CRM, transactions, marketing, market data, AI—for $999/month with unlimited users.
```

**Value Props:**
- ✓ $999/mo for unlimited agents (vs. $200-300/agent with other CRMs)
- ✓ REID market intelligence included (normally $300+/mo extra)
- ✓ All-in-one: No expensive add-ons or integrations needed

**CTAs:**
- Primary: "Calculate Your Savings"
- Secondary: "Start Free Trial"

**Trust Bar:**
```
✓ Transparent pricing  •  ✓ No hidden fees  •  ✓ No per-user charges
```

**Why This Works:**
- Lead with financial benefit (60% cost reduction)
- Specific price comparison
- Appeals to budget-conscious agents
- Emphasizes unlimited users (vs. per-seat pricing)

---

### Variation D: "Real Estate Specialized"

**Headline:**
```
The Only CRM Built Specifically for Real Estate Transactions
```

**Subheadline:**
```
Not a generic sales platform adapted for real estate. SAI is built from the ground
up for deals, closings, and commissions—with 6 specialized deal types and auto-
generated workflows from listing to closing.
```

**Value Props:**
- ✓ 6 deal types with 8-15 auto-generated processes each
- ✓ Manage inspections, appraisals, financing, title, closing—all in one place
- ✓ AI that understands real estate (not generic business)

**CTAs:**
- Primary: "See Platform Tour"
- Secondary: "Start Free Trial"

**Trust Bar:**
```
Built FOR real estate, BY real estate professionals  •  Used by 5,000+ agents
```

**Why This Works:**
- Differentiates from generic CRMs
- Appeals to agents frustrated with adapted solutions
- Specific to transaction management pain point
- Establishes expertise

---

### Variation E: "Close More Deals"

**Headline:**
```
Close 35% More Deals with AI-Powered Lead Scoring
```

**Subheadline:**
```
Stop wasting time on cold leads. SAI's AI scores every lead based on engagement
and likelihood to convert, so you focus on deals that close. Plus complete CRM,
transaction management, and marketing automation.
```

**Value Props:**
- ✓ Smart lead scoring: Know which leads are HOT, WARM, or COLD
- ✓ Automated follow-ups: Never lose a lead again
- ✓ Pipeline visibility: See exactly where every deal stands

**CTAs:**
- Primary: "Start Closing More Deals"
- Secondary: "Watch Demo"

**Trust Bar:**
```
Average SAI user closes 35% more deals  •  14-day free trial  •  No credit card
```

**Why This Works:**
- Lead with revenue benefit (close more deals)
- Specific percentage (35% increase)
- Focuses on core benefit (lead management)
- Appeals to growth-focused agents

---

## COPY LIBRARY

### Headlines (30 Variations)

**All-in-One Theme:**
1. Run Your Entire Real Estate Business from One Platform
2. One Platform for Your Entire Real Estate Business
3. Everything You Need to Run a Real Estate Business—In One Place
4. The All-in-One Real Estate Platform for Agents and Teams
5. One Login. One Platform. Your Entire Real Estate Business.

**Time Savings Theme:**
6. Real Estate Agents: Get 15+ Hours Back Every Week
7. Stop Spending 20 Hours on Software. Start Spending Time with Clients.
8. Save 15 Hours Every Week with AI-Powered Real Estate Software
9. Automate Your Real Estate Business. Reclaim Your Time.
10. Work Smarter, Not Harder: Automate Your Real Estate Business

**Cost Savings Theme:**
11. Cut Your Real Estate Software Costs by 60%—While Doing More
12. Replace 5+ Tools with One Platform for $999/Month
13. Stop Paying $1,000+/Month for Disconnected Tools
14. One Platform, One Price: $999/Month for Unlimited Users
15. Save $6,000+/Year on Real Estate Software

**Real Estate Specialized:**
16. The Only CRM Built Specifically for Real Estate Transactions
17. Real Estate Software Built BY Agents, FOR Agents
18. Transaction-Centric CRM for Real Estate Professionals
19. Built for Closings, Not Generic Sales Pipelines
20. Real Estate CRM That Understands Your Deals

**Performance/Results:**
21. Close 35% More Deals with AI-Powered Lead Scoring
22. Increase Your Conversion Rate by 35% with Smart Lead Management
23. More Closings. Less Admin. One Platform.
24. The Real Estate Platform That Helps You Close More Deals
25. Win More Deals with Institutional-Grade Market Intelligence

**Simple & Direct:**
26. The Real Estate Platform Agents Actually Want to Use
27. SAI: The Complete Real Estate Platform
28. All Your Real Estate Tools in One Place
29. Your Complete Real Estate Workspace
30. Real Estate Software That Just Works

---

### Subheadlines (20 Variations)

**Expanding on All-in-One:**
1. Stop juggling 5+ tools. SAI gives real estate agents a complete CRM, transaction management, marketing automation, market intelligence, and AI assistant—all in one place for $999/month.

2. Replace Follow Up Boss, Dotloop, Mailchimp, HouseCanary, and Buffer with one unified platform. All your data in one place, one login, unlimited users.

3. CRM, transaction management, marketing automation, market intelligence, and AI assistance—everything you need to run your real estate business, finally in one platform.

**Expanding on Time Savings:**
4. SAI automates your CRM, transaction workflows, marketing, and market analysis—so you can spend time with clients, not fighting with software. One platform for your entire business.

5. Automation handles the repetitive tasks. You focus on what matters: serving clients and closing deals. Save 15+ hours every week with SAI.

6. Stop doing manual data entry, creating checklists, scheduling posts, and tracking expenses across 7 different tools. SAI automates it all.

**Expanding on Cost Savings:**
7. Most agents pay $1,000+/month across 5-7 disconnected tools. SAI replaces them all—CRM, transactions, marketing, market data, AI—for $999/month with unlimited users.

8. $999/month flat. Unlimited users. No per-agent fees. Replace expensive subscriptions to Follow Up Boss ($200/agent), market data ($300/mo), email tools ($50/mo), and more.

9. Cut software costs by 60% while getting MORE features. One platform, one price, unlimited team members.

**Expanding on Real Estate Specialization:**
10. Not a generic sales platform adapted for real estate. SAI is built from the ground up for deals, closings, and commissions—with 6 specialized deal types and auto-generated workflows from listing to closing.

11. 6 deal types. 8-15 auto-generated processes per deal. Party management, document tracking, deadline monitoring—all built specifically for real estate transactions.

12. Generic CRMs don't understand inspections, appraisals, title work, or contingencies. SAI does—because it's built specifically for real estate.

**Expanding on Performance:**
13. Stop wasting time on cold leads. SAI's AI scores every lead based on engagement and likelihood to convert, so you focus on deals that close. Plus complete CRM, transaction management, and marketing automation.

14. AI lead scoring + automated follow-ups + transaction workflows = 35% higher conversion rate. That's what SAI delivers.

15. Smart lead scoring tells you which leads to prioritize. Auto-generated transaction workflows ensure you never miss a deadline. Market intelligence wins you investor clients.

**Simple & Benefit-Focused:**
16. Everything you need to manage leads, close deals, market your business, and analyze markets—finally in one unified platform built specifically for real estate.

17. From first contact to closing celebration, SAI handles it all. CRM, transactions, marketing, market analysis, and AI assistance.

18. One platform. Unified data. Single login. Everything you need to run a successful real estate business.

19. Built for real estate professionals who are tired of juggling multiple tools, paying per-agent fees, and missing leads between systems.

20. The modern real estate platform: Fast, powerful, AI-native, and designed for how you actually work.

---

### Value Prop Bullets (30 Variations)

**Tool Replacement:**
1. ✓ Replace Follow Up Boss, Dotloop, Mailchimp, HouseCanary, Buffer—all in one
2. ✓ CRM + transaction management + marketing + market data—unified
3. ✓ Stop paying for 5+ separate subscriptions
4. ✓ All your data in one place—no more duplicate entry
5. ✓ One login for your entire real estate business

**Time Savings:**
6. ✓ Save 15+ hours every week with AI-powered automation
7. ✓ Automated transaction workflows (8-15 processes per deal)
8. ✓ AI generates listing descriptions in 30 seconds
9. ✓ Schedule a month of social posts in 1 hour
10. ✓ Never create a transaction checklist again

**Cost Savings:**
11. ✓ $999/month for unlimited users (no per-agent fees)
12. ✓ Cut software costs by 60% vs. multiple tools
13. ✓ REID market intelligence included (normally $300+/mo extra)
14. ✓ Save $6,000+ annually vs. traditional CRM stack
15. ✓ No expensive add-ons or hidden fees

**Lead Management:**
16. ✓ AI lead scoring: Know which leads are HOT, WARM, or COLD
17. ✓ Automated follow-up sequences—never lose a lead
18. ✓ All leads in one CRM with source attribution
19. ✓ Pipeline visualization shows where every deal stands
20. ✓ 35% higher conversion rate with smart lead scoring

**Transaction Management:**
21. ✓ 6 specialized deal types (HOME_BUYING, HOME_SELLING, etc.)
22. ✓ Auto-generate 8-15 processes per deal
23. ✓ Track inspections, appraisals, financing, title, closing—automatically
24. ✓ Never miss a deadline with smart notifications
25. ✓ Complete audit trail for compliance

**Market Intelligence:**
26. ✓ Institutional-grade market data included (REID module)
27. ✓ ROI calculator to win investor clients
28. ✓ Real-time metrics for 10+ markets
29. ✓ Property appreciation/depreciation forecasting (coming 2025)
30. ✓ Professional market reports that set you apart

---

### CTA Variations (25 Options)

**Primary CTAs (For Main Button):**
1. Start Free Trial
2. Try SAI Free for 30 Days
3. Get Started Free
4. Start Your Free Trial
5. Sign Up Free—No Credit Card
6. Try SAI Free
7. Create Free Account
8. Get SAI Free
9. Start Free Today
10. Begin Your Free Trial

**Secondary CTAs (For Secondary Button):**
11. Watch 2-Minute Demo
12. See SAI in Action
13. Watch Platform Tour
14. See How It Works
15. View Demo Video
16. Take a Tour
17. Schedule Live Demo
18. Book a Demo
19. Get a Walkthrough
20. Explore Features

**Alternative CTAs (For Testing):**
21. Calculate Your Savings (leads to ROI calculator)
22. Start Closing More Deals
23. See Pricing & Features
24. Get a Personalized Demo
25. Talk to Sales

**CTA Button Design Notes:**
- Primary: Solid background, high contrast (blue or orange)
- Secondary: Outlined, less prominent
- Size: Large enough for mobile (min 44px height)
- Text: 14-16px, bold, all-caps or title case

---

### Trust Signals (15 Variations)

**Below CTAs:**
1. ✓ No credit card required  •  ✓ Set up in 5 minutes  •  ✓ Import your data instantly
2. ✓ Free forever tier available  •  ✓ No long-term contracts  •  ✓ Cancel anytime
3. ✓ Join 5,000+ real estate professionals  •  ✓ 14-day free trial  •  ✓ No credit card
4. ✓ No setup fees  •  ✓ No hidden costs  •  ✓ Cancel anytime, export your data
5. ✓ Try all features free  •  ✓ Upgrade to Elite when ready  •  ✓ $999/mo flat

**Social Proof:**
6. Trusted by 5,000+ real estate agents, teams, and brokerages
7. Join thousands of agents closing more deals with SAI
8. Used by solo agents, teams, and brokerages nationwide
9. 4.8/5 stars from 500+ real estate professionals
10. Featured in Real Estate Tech News, Agent Magazine, Inman

**Value-Based:**
11. Built FOR real estate, BY real estate professionals
12. No per-user fees • No transaction limits • No surprises
13. Transparent pricing • Unlimited users • All features included
14. Import your data in 60 seconds • Up and running in 5 minutes
15. Free tier forever • Upgrade to Elite anytime • No long-term contracts

---

## VISUAL DESIGN SPECIFICATIONS

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│              NAVIGATION BAR                       │
├─────────────────────────────────────────────────┤
│                                                   │
│  HEADLINE (H1, 48-64px)                           │
│                                                   │
│  Subheadline (20-24px, 2-3 lines)                │
│                                                   │
│  • Value Prop 1 (with checkmark)                 │
│  • Value Prop 2 (with checkmark)                 │
│  • Value Prop 3 (with checkmark)                 │
│                                                   │
│  [Primary CTA Button]  [Secondary CTA Button]    │
│                                                   │
│  Trust Signal Text (small, 14px)                 │
│                                                   │
│                    OR                             │
│                                                   │
│          [Platform Screenshot/Demo]              │
│                                                   │
└─────────────────────────────────────────────────┘
```

### Responsive Behavior

**Desktop (≥1024px):**
- Two-column layout: Copy on left (60%), visual on right (40%)
- Headline: 56-64px
- Max width: 1200px centered

**Tablet (768-1023px):**
- Two-column layout maintained, narrower margins
- Headline: 48-56px
- Buttons may stack on smaller tablets

**Mobile (<768px):**
- Single column, copy above visual
- Headline: 36-48px
- Full-width buttons, stacked
- Trust signals below buttons

### Typography

**Headline (H1):**
- Font: Inter, system-ui, or similar sans-serif
- Weight: 700 (bold) or 800 (extrabold)
- Size: 48-64px desktop, 36-48px mobile
- Line height: 1.1-1.2
- Color: Primary text (#1a1a1a or theme equivalent)
- Max width: 15 words for readability

**Subheadline:**
- Font: Same as headline
- Weight: 400 (regular) or 500 (medium)
- Size: 20-24px desktop, 18-20px mobile
- Line height: 1.4-1.5
- Color: Secondary text (#4a4a4a or theme equivalent)
- Max width: 600px for readability

**Value Props (bullets):**
- Font: Same as body
- Weight: 500 (medium)
- Size: 18-20px desktop, 16-18px mobile
- Line height: 1.5
- Checkmark icon: Green (#10b981) or brand color
- Spacing: 12-16px between items

**Trust Signals:**
- Font: Same as body
- Weight: 400 (regular)
- Size: 14-16px
- Color: Muted text (#6b7280)
- Checkmark icon: Same as value props

### Color Scheme

**Based on Current Strive Tech Branding:**
- Primary: Orange (#ff7033 or similar)
- Accent: Blue or teal for secondary CTAs
- Text: Dark gray (#1a1a1a)
- Secondary text: Medium gray (#4a4a4a)
- Muted text: Light gray (#6b7280)
- Background: White or very light gray (#f9fafb)

**CTA Buttons:**
- Primary: Solid primary color (orange) with white text
- Hover: Darker shade (10-15% darker)
- Secondary: Outlined with primary color text
- Hover: Light background fill

### Imagery

**Platform Screenshot/Demo:**
- Show: Dashboard with deals, contacts, and metrics
- Format: PNG or WebP, high quality
- Size: 1200x800px or similar (3:2 aspect ratio)
- Treatment: Light shadow, subtle border, or rounded corners
- Alt text: "SAI Platform dashboard showing CRM, deals, and analytics"

**Or Platform Demo Embed:**
- Interactive demo (e.g., Loom, Vidyard, or custom)
- Autoplay muted video showing platform navigation
- Play button overlay
- Mobile: Static screenshot with play button → modal video

**Background:**
- Option 1: Solid color (white or light gray)
- Option 2: Subtle gradient (light to lighter)
- Option 3: Abstract shapes/patterns (non-distracting)
- Avoid: Stock photos of random business people

---

## TECHNICAL IMPLEMENTATION

### Current Code Structure

**File:** `client/src/pages/home.tsx`

Approximately line 40-120 contains current hero section.

### Changes Required

**Step 1: Update Imports**

Add/update these imports at top of file:

```typescript
import { CheckCircle } from "lucide-react"; // For checkmark icons
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
```

**Step 2: Replace Hero Section JSX**

Find the current hero section (approximately lines 40-120) and replace with:

```typescript
{/* Hero Section */}
<section className="relative bg-gradient-to-br from-background via-background to-muted overflow-hidden">
  {/* Background decorative elements (optional) */}
  <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />

  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      {/* Left Column: Copy */}
      <div className="max-w-2xl">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
          Run Your Entire Real Estate Business from One Platform
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
          Stop juggling 5+ tools. SAI gives real estate agents a complete CRM,
          transaction management, marketing automation, market intelligence, and
          AI assistant—all in one place for $999/month.
        </p>

        {/* Value Props */}
        <ul className="space-y-4 mb-10">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-base sm:text-lg text-foreground">
              Replace Follow Up Boss, Dotloop, Mailchimp, HouseCanary, Buffer—all in one
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-base sm:text-lg text-foreground">
              Save 15+ hours every week with AI-powered automation
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-base sm:text-lg text-foreground">
              Unlimited users, unlimited deals—one flat price
            </span>
          </li>
        </ul>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            asChild
            size="lg"
            className="text-base px-8 py-6 bg-primary hover:bg-primary/90"
          >
            <Link href="/request">Start Free Trial</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-base px-8 py-6"
          >
            <a href="#demo-video">Watch 2-Minute Demo</a>
          </Button>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Set up in 5 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Import your data instantly</span>
          </div>
        </div>
      </div>

      {/* Right Column: Visual */}
      <div className="relative lg:order-last">
        {/* Platform Screenshot */}
        <div className="relative rounded-lg shadow-2xl overflow-hidden bg-white border">
          <img
            src="/assets/optimized/platform/sai-dashboard-screenshot.webp"
            alt="SAI Platform dashboard showing CRM, deals, and analytics"
            width={1200}
            height={800}
            loading="eager"
            className="w-full h-auto"
          />

          {/* Optional: Video play button overlay */}
          {/*
          <button
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
            onClick={() => openDemoModal()}
          >
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
          </button>
          */}
        </div>

        {/* Optional: Floating social proof badges */}
        {/*
        <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
          <div className="text-sm font-semibold">5,000+ Agents</div>
          <div className="text-xs text-muted-foreground">Trust SAI</div>
        </div>
        */}
      </div>

    </div>
  </div>
</section>
```

### A/B Testing Implementation

**Using Feature Flags or URL Parameters:**

```typescript
// At top of component
const [heroVariation, setHeroVariation] = useState<'A' | 'B' | 'C'>('A');

useEffect(() => {
  // Get variation from feature flag service, URL param, or random
  const urlParams = new URLSearchParams(window.location.search);
  const variation = urlParams.get('hero') as 'A' | 'B' | 'C' | null;

  if (variation && ['A', 'B', 'C'].includes(variation)) {
    setHeroVariation(variation);
  } else {
    // Random assignment for A/B test
    const variations: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
    const randomVariation = variations[Math.floor(Math.random() * variations.length)];
    setHeroVariation(randomVariation);
  }
}, []);

// Then in JSX, conditionally render based on variation
{heroVariation === 'A' && (
  // Variation A JSX
)}
{heroVariation === 'B' && (
  // Variation B JSX
)}
{heroVariation === 'C' && (
  // Variation C JSX
)}
```

**Track Variation Performance:**

```typescript
// In analytics tracker
useEffect(() => {
  trackEvent('hero_variation_viewed', {
    variation: heroVariation,
    timestamp: new Date().toISOString()
  });
}, [heroVariation]);
```

### Image Assets Needed

**Create/Update These Assets:**

1. **Dashboard Screenshot:** `/assets/optimized/platform/sai-dashboard-screenshot.webp`
   - Show: CRM interface with deals, contacts, metrics
   - Resolution: 1200x800px minimum
   - Format: WebP with PNG fallback
   - Optimize: <200KB file size

2. **Demo Video:** `/assets/optimized/platform/sai-demo-2min.mp4`
   - Length: 2 minutes max
   - Show: Key features walkthrough
   - Resolution: 1080p
   - Captions: Included

3. **Logo/Icon Assets:** (if updating)
   - SAI logo: High resolution PNG
   - Favicon: Multiple sizes

### Accessibility Considerations

**ARIA Labels:**
```typescript
<section aria-labelledby="hero-heading">
  <h1 id="hero-heading">...</h1>
</section>
```

**Alt Text:**
- Descriptive for screenshots
- Empty string (`alt=""`) for decorative images

**Focus Management:**
- Ensure buttons are keyboard accessible
- Visible focus indicators
- Logical tab order

**Color Contrast:**
- Test with WCAG AA standards (4.5:1 for body text, 3:1 for large text)
- Use browser DevTools to verify

---

## TESTING CHECKLIST

### Visual Testing

- [ ] Hero section renders correctly on desktop (1920px, 1440px, 1280px)
- [ ] Hero section renders correctly on tablet (768px, 1024px)
- [ ] Hero section renders correctly on mobile (375px, 414px, 390px)
- [ ] Headline is readable and not truncated
- [ ] Subheadline line height is comfortable
- [ ] Value props align correctly with checkmarks
- [ ] Buttons are properly sized and spaced
- [ ] Trust signals display below buttons
- [ ] Platform screenshot loads and displays correctly
- [ ] All text has sufficient contrast

### Functional Testing

- [ ] "Start Free Trial" button navigates to `/request`
- [ ] "Watch Demo" button triggers video or navigates correctly
- [ ] All links work (no 404s)
- [ ] Hover states work on buttons
- [ ] Focus states visible for keyboard navigation
- [ ] Tab order is logical (headline → subhead → bullets → buttons)

### Performance Testing

- [ ] Hero section loads in <1 second
- [ ] Images are lazy-loaded (or eager for above-fold)
- [ ] No layout shift (CLS score)
- [ ] First Contentful Paint <1.5s
- [ ] Largest Contentful Paint <2.5s

### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### A/B Testing Validation

- [ ] Variation assignment works correctly
- [ ] Analytics tracking fires for each variation
- [ ] URL parameter override works (`?hero=B`)
- [ ] Variation persists on page refresh (if using localStorage)

### Copy Review

- [ ] No typos or grammatical errors
- [ ] Value props are clear and compelling
- [ ] CTAs are action-oriented
- [ ] Trust signals are accurate
- [ ] Brand voice is consistent

### Accessibility Testing

- [ ] Screen reader announces content correctly
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast passes WCAG AA
- [ ] Alt text is descriptive
- [ ] ARIA labels are appropriate

---

## DEPLOYMENT CHECKLIST

### Pre-Deployment

- [ ] All tests passing
- [ ] Code reviewed by team
- [ ] Stakeholder approval on copy
- [ ] Design approval on visuals
- [ ] Images optimized and uploaded
- [ ] No console errors
- [ ] No TypeScript errors

### Deployment

- [ ] Deploy to staging environment
- [ ] Test on staging
- [ ] QA sign-off
- [ ] Deploy to production
- [ ] Smoke test on production
- [ ] Monitor analytics for first 24 hours

### Post-Deployment

- [ ] Verify hero section displays correctly
- [ ] Check conversion tracking works
- [ ] Monitor page load times
- [ ] Collect user feedback
- [ ] Begin A/B testing if applicable
- [ ] Iterate based on data

---

## NEXT STEPS

After completing the hero section, proceed to:

1. **HOMEPAGE-PART-2-SECTIONS.md** - Transform remaining homepage sections
2. **MESSAGING-PART-1-CORE.md** - Review full messaging strategy
3. **HOMEPAGE-PART-3-TECHNICAL.md** - Implement remaining technical components

---

**Questions or issues? Cross-reference:**
- MESSAGING-PART-1-CORE.md for brand voice
- TECHNICAL-PART-1-FILES.md for file structure
- MASTER-TRANSFORMATION-PLAN.md for overall context

**Ready to implement? Follow the technical implementation section step-by-step.** ✅
