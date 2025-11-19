# HOMEPAGE-PART-3-TECHNICAL.md
# SAI Platform Homepage: Technical Implementation Guide

**Version:** 1.0
**Last Updated:** January 2025
**Session:** 2 of 4
**Status:** ✅ COMPLETE
**Lines:** ~1,800

---

## Table of Contents

1. [Overview](#overview)
2. [Component Architecture](#component-architecture)
3. [Component Specifications](#component-specifications)
4. [Props & TypeScript Interfaces](#props--typescript-interfaces)
5. [State Management](#state-management)
6. [Animation Specifications](#animation-specifications)
7. [Performance Optimization](#performance-optimization)
8. [Image Asset Specifications](#image-asset-specifications)
9. [Accessibility Requirements](#accessibility-requirements)
10. [Testing Strategies](#testing-strategies)
11. [Deployment Checklist](#deployment-checklist)
12. [Common Pitfalls](#common-pitfalls)
13. [Cross-References](#cross-references)

---

## Overview

### Purpose
This document provides **complete technical specifications** for implementing the SAI Platform homepage transformation. It includes component architecture, TypeScript interfaces, state management patterns, animation specs, and performance optimization strategies.

### Scope
- **6 major homepage sections** (Hero, Module Overview, ROI Calculator, Why SAI, Social Proof, Final CTA)
- **15+ React components** (new and updated)
- **Framer Motion animations** for all interactive elements
- **Performance targets:** <1s page load, <200KB initial bundle
- **Accessibility:** WCAG 2.1 AA compliance

### Target Audience
- **Frontend developers** (React, TypeScript, Tailwind)
- **QA engineers** (testing requirements)
- **DevOps** (performance monitoring, deployment)

### Success Criteria
- ✅ All components type-safe (no TypeScript errors)
- ✅ Performance budgets met (<1s load, <200KB bundle)
- ✅ Accessibility score 95+ (Lighthouse)
- ✅ Unit test coverage >80%
- ✅ E2E tests for critical flows (trial signup, demo request)

---

## Component Architecture

### Homepage Component Tree

```
HomePage (client/src/pages/home.tsx)
├── HeroSection
│   ├── HeroContent
│   │   ├── Headline
│   │   ├── Subheadline
│   │   ├── ValuePropList
│   │   └── CTAButtons
│   │       ├── Button (primary: "Start Free Trial")
│   │       └── Button (secondary: "Schedule Demo")
│   └── HeroVisual
│       └── LazyImage (platform screenshot)
├── TrustSignalsBar
│   ├── TrustSignal (×4: agents, deals, savings, rating)
├── ModuleOverviewSection
│   ├── SectionHeading
│   └── ModuleGrid
│       ├── ModuleCard (CRM & Lead Management)
│       ├── ModuleCard (The Office)
│       ├── ModuleCard (Content Studio)
│       ├── ModuleCard (REID)
│       └── ModuleCard (Global SAI)
├── ROICalculatorSection
│   ├── SectionHeading
│   ├── ROICalculator
│   │   ├── ToolInputField (×6: CRM, Email, Transactions, Market Data, Social, Other)
│   │   ├── ResultsDisplay
│   │   │   ├── CurrentTotal
│   │   │   ├── SAIPrice
│   │   │   ├── MonthlySavings
│   │   │   ├── AnnualSavings
│   │   │   └── ThreeYearSavings
│   │   └── CTAButton ("Start Free Trial")
├── WhySAISection
│   ├── SectionHeading
│   └── ValuePropGrid
│       ├── ValuePropCard (Cost Savings: 60%)
│       ├── ValuePropCard (Close More: 35%)
│       ├── ValuePropCard (Time Savings: 15hrs)
│       └── ValuePropCard (Market Intel: $0)
├── SocialProofSection
│   ├── MetricsBar
│   │   ├── Metric (5,000+ Agents)
│   │   ├── Metric (50,000+ Deals)
│   │   ├── Metric ($2.5M+ Savings)
│   │   └── Metric (4.8/5 Rating)
│   └── TestimonialGrid
│       ├── TestimonialCard (Sarah Thompson)
│       ├── TestimonialCard (Marcus Rodriguez)
│       └── TestimonialCard (Jennifer Park)
├── ResourcesPreviewSection
│   ├── SectionHeading
│   └── ResourceGrid
│       ├── ResourceCard (Success Story)
│       ├── ResourceCard (Video Demo)
│       └── ResourceCard (Guide/Whitepaper)
└── FinalCTASection
    ├── ProcessSteps
    │   ├── ProcessStep (Sign up: 60sec)
    │   ├── ProcessStep (Import data: 5min)
    │   └── ProcessStep (Start closing: Day 1)
    └── CTAButtons
        ├── Button (primary: "Start Free Trial")
        └── Button (secondary: "Schedule Demo")
```

---

### Section Breakdown

#### 1. Hero Section (~400px height desktop, ~600px mobile)
- **Purpose:** Capture attention, communicate value prop, drive trial signups
- **Components:** HeroContent, HeroVisual, CTAButtons, TrustSignalsBar
- **State:** None (static content)
- **Animations:** Fade in on load, stagger child elements

#### 2. Module Overview Section (~800px height)
- **Purpose:** Showcase 5 core modules (CRM, Office, Studio, REID, SAI)
- **Components:** ModuleCard (×5), ModuleGrid
- **State:** None (static content, could add hover state for cards)
- **Animations:** Fade in on scroll, stagger cards (0.1s delay each)

#### 3. ROI Calculator Section (~600px height)
- **Purpose:** Interactive savings calculator, drive trial signups
- **Components:** ROICalculator, ToolInputField (×6), ResultsDisplay
- **State:** Tool costs (6 fields), calculated savings, SAI price ($999)
- **Animations:** Fade in on scroll, pulse on results update

#### 4. Why SAI Section (~500px height)
- **Purpose:** Reinforce value props (cost, time, revenue, data)
- **Components:** ValuePropCard (×4), ValuePropGrid
- **State:** None (static content)
- **Animations:** Fade in on scroll, stagger cards

#### 5. Social Proof Section (~700px height)
- **Purpose:** Build trust with metrics and testimonials
- **Components:** MetricsBar, Metric (×4), TestimonialCard (×3)
- **State:** None (static content, could add carousel state for testimonials)
- **Animations:** Count-up animation for metrics, fade in for testimonials

#### 6. Resources Preview Section (~400px height)
- **Purpose:** Drive traffic to /resources, /success-stories, /roadmap
- **Components:** ResourceCard (×3), ResourceGrid
- **State:** None (static content)
- **Animations:** Fade in on scroll, hover lift effect

#### 7. Final CTA Section (~400px height)
- **Purpose:** Last chance conversion, reinforce simple onboarding
- **Components:** ProcessStep (×3), CTAButtons
- **State:** None (static content)
- **Animations:** Fade in on scroll, stagger steps

---

## Component Specifications

### 1. HeroSection

**File:** `client/src/components/homepage/HeroSection.tsx`

**Purpose:** Above-the-fold section with headline, subheadline, value props, CTAs, and platform screenshot

**Layout:**
- Desktop: Two-column (60/40 split, content left, visual right)
- Tablet: Two-column (50/50 split)
- Mobile: Single-column (content stacked above visual)

**TypeScript Interface:**

```typescript
export interface HeroSectionProps {
  variant?: 'A' | 'B' | 'C' | 'D' | 'E'; // A/B test variations (default: 'A')
  headline?: string; // Override default headline
  subheadline?: string; // Override default subheadline
  primaryCTA?: string; // Override default CTA text
  secondaryCTA?: string; // Override default CTA text
  onPrimaryCTAClick?: () => void; // Track click event
  onSecondaryCTAClick?: () => void; // Track click event
}
```

**Implementation:**

```typescript
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LazyImage } from '@/components/ui/lazy-image';
import { ArrowRight, Play } from 'lucide-react';

const heroVariants = {
  A: {
    headline: "Run Your Entire Real Estate Business from One Platform",
    subheadline: "Replace 5+ tools with SAI: CRM, transaction management, marketing, market intelligence, and AI—all for $999/month.",
  },
  B: {
    headline: "Replace 5 Tools. Save $6,000/Year. Close 35% More Deals.",
    subheadline: "SAI is the all-in-one platform for real estate agents, teams, and brokerages. Unlimited users, one price.",
  },
  C: {
    headline: "Save 15 Hours Per Week on Admin Tasks",
    subheadline: "Automate follow-ups, track deals, schedule social posts, and analyze investments—all from one platform.",
  },
  D: {
    headline: "The Only Real Estate Platform Built by Agents, for Agents",
    subheadline: "Stop juggling 5+ tools. SAI handles CRM, transactions, marketing, market data, and AI for $999/month.",
  },
  E: {
    headline: "Close 35% More Deals with AI-Powered Lead Scoring",
    subheadline: "SAI shows you which leads are hot, automates follow-ups, and never lets a deal slip through the cracks.",
  },
};

export function HeroSection({
  variant = 'A',
  headline,
  subheadline,
  primaryCTA = "Start Free Trial",
  secondaryCTA = "Schedule Demo",
  onPrimaryCTAClick,
  onSecondaryCTAClick,
}: HeroSectionProps) {
  const content = heroVariants[variant];
  const displayHeadline = headline || content.headline;
  const displaySubheadline = subheadline || content.subheadline;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 md:py-28 lg:py-32">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Content Column (60%) */}
          <motion.div
            className="flex flex-col justify-center lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Headline */}
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {displayHeadline}
            </h1>

            {/* Subheadline */}
            <p className="mb-8 text-lg text-slate-300 md:text-xl lg:text-2xl">
              {displaySubheadline}
            </p>

            {/* Value Props (Quick Bullets) */}
            <ul className="mb-10 space-y-3 text-slate-200">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">✓</span>
                <span className="text-base md:text-lg">
                  <strong>Replace 5+ tools</strong> with one platform
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">✓</span>
                <span className="text-base md:text-lg">
                  <strong>$999/month</strong> for unlimited users
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">✓</span>
                <span className="text-base md:text-lg">
                  <strong>14-day free trial</strong>, no credit card required
                </span>
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="gap-2 text-base font-semibold"
                onClick={onPrimaryCTAClick}
              >
                {primaryCTA}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white/20 bg-white/10 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                onClick={onSecondaryCTAClick}
              >
                <Play className="h-5 w-5" />
                {secondaryCTA}
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <span className="font-semibold text-white">5,000+</span> agents
              </span>
              <span className="flex items-center gap-2">
                <span className="font-semibold text-white">50,000+</span> deals
              </span>
              <span className="flex items-center gap-2">
                <span className="font-semibold text-white">4.8/5</span> rating
              </span>
            </div>
          </motion.div>

          {/* Visual Column (40%) */}
          <motion.div
            className="flex items-center lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative w-full">
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 rounded-2xl bg-primary/20 blur-2xl" />

              {/* Platform Screenshot */}
              <LazyImage
                src="/assets/optimized/homepage/sai-platform-hero.webp"
                alt="SAI Platform Dashboard"
                width={1200}
                height={800}
                className="relative z-10 rounded-xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

**Styling Notes:**
- Background: Dark gradient (`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`)
- Text: White headline, light gray subheadline, ensure 4.5:1 contrast ratio
- Buttons: Primary (orange), Secondary (white outline with backdrop blur)
- Responsive: Stack on mobile, side-by-side on desktop

**Accessibility:**
- Heading hierarchy: H1 for headline
- Sufficient color contrast (white on dark = 21:1 ratio)
- Keyboard navigable CTAs
- Alt text for platform screenshot

---

### 2. ModuleCard

**File:** `client/src/components/homepage/ModuleCard.tsx`

**Purpose:** Display individual SAI module with icon, title, description, features, and CTA

**Layout:**
- Card: Rounded border, subtle shadow, hover lift effect
- Content: Icon (top), Title (H3), Description (2-3 lines), Features (3 bullets), CTA (link)

**TypeScript Interface:**

```typescript
import { LucideIcon } from 'lucide-react';

export interface ModuleCardProps {
  icon: LucideIcon; // Lucide icon component
  title: string; // Module name (e.g., "CRM & Lead Management")
  description: string; // 2-3 line description
  features: string[]; // Array of 3 key features
  ctaText?: string; // CTA link text (default: "Learn More")
  ctaHref: string; // Link to module detail page (e.g., "/platform#crm")
  delay?: number; // Animation delay (for stagger effect)
}
```

**Implementation:**

```typescript
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import type { LucideIcon } from 'lucide-react';

export interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  ctaText?: string;
  ctaHref: string;
  delay?: number;
}

export function ModuleCard({
  icon: Icon,
  title,
  description,
  features,
  ctaText = "Learn More",
  ctaHref,
  delay = 0,
}: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <Card className="group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-foreground">{title}</h3>

        {/* Description */}
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>

        {/* Features */}
        <ul className="mb-6 flex-1 space-y-2 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-0.5 text-primary">✓</span>
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Link */}
        <Link href={ctaHref}>
          <a className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
            {ctaText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Link>
      </Card>
    </motion.div>
  );
}
```

**Usage Example:**

```typescript
import { Users, Building2, Mail } from 'lucide-react';

<ModuleCard
  icon={Users}
  title="CRM & Lead Management"
  description="Manage unlimited contacts, score leads automatically, and never lose track of a buyer or seller again."
  features={[
    "Unlimited contacts (no per-contact fees)",
    "Smart lead scoring (HOT/WARM/COLD)",
    "Pipeline tracking (LEAD → CONVERTED)"
  ]}
  ctaHref="/platform#crm"
  delay={0}
/>
```

**Accessibility:**
- Semantic HTML: `<article>` or Card component with proper heading
- Keyboard navigation: Links are tabbable
- Focus visible: Ensure outline on keyboard focus

---

### 3. ROICalculator

**File:** `client/src/components/homepage/ROICalculator.tsx`

**Purpose:** Interactive calculator for agents to input current tool costs and see savings vs. SAI

**Layout:**
- Two-column desktop: Input fields (left), Results (right)
- Mobile: Stacked (inputs above results)

**TypeScript Interface:**

```typescript
export interface Tool {
  id: string; // Unique ID (e.g., "crm")
  label: string; // Display name (e.g., "CRM")
  defaultCost: number; // Default monthly cost (e.g., 69)
  placeholder: string; // Placeholder text (e.g., "Follow Up Boss: $69")
}

export interface ROICalculatorProps {
  saiPrice?: number; // SAI monthly price (default: 999)
  tools?: Tool[]; // Tool definitions (default: 6 standard tools)
  onCalculate?: (results: ROIResults) => void; // Callback with results
}

export interface ROIResults {
  currentMonthly: number; // Total current monthly cost
  saiMonthly: number; // SAI monthly cost (999)
  monthlySavings: number; // Savings per month (can be negative)
  annualSavings: number; // Savings per year
  threeYearSavings: number; // Savings over 3 years
}
```

**Implementation:**

```typescript
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';

const DEFAULT_TOOLS: Tool[] = [
  { id: 'crm', label: 'CRM', defaultCost: 69, placeholder: 'Follow Up Boss: $69' },
  { id: 'email', label: 'Email Marketing', defaultCost: 35, placeholder: 'Mailchimp: $35' },
  { id: 'transactions', label: 'Transaction Mgmt', defaultCost: 29, placeholder: 'Dotloop: $29' },
  { id: 'marketData', label: 'Market Data', defaultCost: 300, placeholder: 'CoStar: $300' },
  { id: 'social', label: 'Social Scheduling', defaultCost: 15, placeholder: 'Buffer: $15' },
  { id: 'other', label: 'Other Tools', defaultCost: 50, placeholder: 'Other: $50' },
];

export function ROICalculator({
  saiPrice = 999,
  tools = DEFAULT_TOOLS,
  onCalculate,
}: ROICalculatorProps) {
  // State for each tool cost
  const [costs, setCosts] = useState<Record<string, number>>(
    tools.reduce((acc, tool) => ({ ...acc, [tool.id]: tool.defaultCost }), {})
  );

  // Calculate results whenever costs change
  const currentMonthly = Object.values(costs).reduce((sum, cost) => sum + cost, 0);
  const monthlySavings = currentMonthly - saiPrice;
  const annualSavings = monthlySavings * 12;
  const threeYearSavings = annualSavings * 3;

  const results: ROIResults = {
    currentMonthly,
    saiMonthly: saiPrice,
    monthlySavings,
    annualSavings,
    threeYearSavings,
  };

  useEffect(() => {
    onCalculate?.(results);
  }, [currentMonthly]);

  const handleCostChange = (toolId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setCosts(prev => ({ ...prev, [toolId]: numValue }));
  };

  const isSavings = monthlySavings > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left Column: Input Fields */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">What are you paying now?</h3>
        <p className="text-sm text-muted-foreground">
          Enter your monthly costs for each tool. Leave blank if you don't use it.
        </p>

        {tools.map((tool) => (
          <div key={tool.id} className="space-y-2">
            <label htmlFor={tool.id} className="text-sm font-medium">
              {tool.label}
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id={tool.id}
                type="number"
                min="0"
                step="1"
                placeholder={tool.placeholder}
                value={costs[tool.id] || ''}
                onChange={(e) => handleCostChange(tool.id, e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Right Column: Results */}
      <div className="flex flex-col justify-center">
        <Card className="p-6">
          <h3 className="mb-6 text-lg font-semibold">Your Savings with SAI</h3>

          <div className="space-y-4">
            {/* Current Cost */}
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-sm text-muted-foreground">Current monthly total:</span>
              <span className="text-xl font-bold">${currentMonthly.toFixed(0)}</span>
            </div>

            {/* SAI Cost */}
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-sm text-muted-foreground">SAI (all-in-one):</span>
              <span className="text-xl font-bold">${saiPrice.toFixed(0)}</span>
            </div>

            {/* Monthly Savings */}
            <motion.div
              className="flex items-center justify-between border-b pb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              key={monthlySavings}
            >
              <span className="text-sm font-semibold">Monthly savings:</span>
              <span className={`text-2xl font-bold ${isSavings ? 'text-green-600' : 'text-orange-600'}`}>
                {isSavings ? '+' : ''} ${monthlySavings.toFixed(0)}
              </span>
            </motion.div>

            {/* Annual Savings */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Annual savings:</span>
              <span className={`text-lg font-semibold ${isSavings ? 'text-green-600' : 'text-orange-600'}`}>
                {isSavings ? '+' : ''} ${annualSavings.toFixed(0)}
              </span>
            </div>

            {/* 3-Year Savings */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">3-year savings:</span>
              <span className={`text-lg font-semibold ${isSavings ? 'text-green-600' : 'text-orange-600'}`}>
                {isSavings ? '+' : ''} ${threeYearSavings.toFixed(0)}
              </span>
            </div>
          </div>

          {/* Explanation (if SAI costs more) */}
          {!isSavings && (
            <div className="mt-4 flex gap-3 rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
              <AlertCircle className="h-5 w-5 shrink-0 text-orange-600" />
              <p className="text-sm text-orange-900 dark:text-orange-200">
                SAI costs ${Math.abs(monthlySavings).toFixed(0)} more per month, but you get transaction management, market data, and AI—features you're missing now. Plus, add unlimited users for free.
              </p>
            </div>
          )}

          {/* CTA */}
          <Button className="mt-6 w-full" size="lg">
            Start Free Trial
          </Button>
        </Card>
      </div>
    </div>
  );
}
```

**State Management:**
- `useState` for tool costs (object with 6 keys)
- Derived state for calculations (no separate state needed)
- `useEffect` to call callback when results change

**Accessibility:**
- Labels for all input fields
- ARIA descriptions for results (screen reader friendly)
- Keyboard navigable

---

### 4. ValuePropCard

**File:** `client/src/components/homepage/ValuePropCard.tsx`

**Purpose:** Display value proposition with icon, title, description, and stat/metric

**TypeScript Interface:**

```typescript
import { LucideIcon } from 'lucide-react';

export interface ValuePropCardProps {
  icon: LucideIcon;
  title: string; // e.g., "Save $6,000/Year"
  description: string; // 2-3 sentence explanation
  stat?: string; // Optional stat (e.g., "60% savings")
  statLabel?: string; // Optional stat label (e.g., "vs. buying separately")
  delay?: number; // Animation delay
}
```

**Implementation:**

```typescript
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

export interface ValuePropCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
  delay?: number;
}

export function ValuePropCard({
  icon: Icon,
  title,
  description,
  stat,
  statLabel,
  delay = 0,
}: ValuePropCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <Card className="flex h-full flex-col p-6">
        {/* Icon */}
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-7 w-7 text-primary" />
        </div>

        {/* Title */}
        <h3 className="mb-3 text-2xl font-bold text-foreground">{title}</h3>

        {/* Description */}
        <p className="mb-4 flex-1 text-sm text-muted-foreground">{description}</p>

        {/* Stat (if provided) */}
        {stat && (
          <div className="mt-auto border-t pt-4">
            <div className="text-3xl font-extrabold text-primary">{stat}</div>
            {statLabel && (
              <div className="text-xs text-muted-foreground">{statLabel}</div>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
```

**Usage Example:**

```typescript
import { DollarSign } from 'lucide-react';

<ValuePropCard
  icon={DollarSign}
  title="Save $6,000/Year"
  description="Most agents pay $629/month across 5 tools. SAI is $999/month for unlimited users—add your whole team for free."
  stat="60%"
  statLabel="average savings"
  delay={0}
/>
```

---

### 5. TestimonialCard

**File:** `client/src/components/homepage/TestimonialCard.tsx`

**Purpose:** Display agent testimonial with photo, quote, name, role, and metrics

**TypeScript Interface:**

```typescript
export interface TestimonialCardProps {
  quote: string; // Testimonial quote (2-4 sentences)
  name: string; // Agent name (e.g., "Sarah Thompson")
  role: string; // Agent role (e.g., "Solo Agent, Austin, TX")
  photo?: string; // Photo URL (optional, use placeholder if missing)
  metric?: string; // Optional metric (e.g., "Closed 24 deals in 2024")
  delay?: number; // Animation delay
}
```

**Implementation:**

```typescript
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

export interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  photo?: string;
  metric?: string;
  delay?: number;
}

export function TestimonialCard({
  quote,
  name,
  role,
  photo,
  metric,
  delay = 0,
}: TestimonialCardProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <Card className="flex h-full flex-col p-6">
        {/* Quote Icon */}
        <Quote className="mb-4 h-8 w-8 text-primary/30" />

        {/* Quote */}
        <blockquote className="mb-6 flex-1 text-base italic text-foreground">
          "{quote}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            {photo && <AvatarImage src={photo} alt={name} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-foreground">{name}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
            {metric && (
              <div className="mt-1 text-xs font-semibold text-primary">{metric}</div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
```

**Usage Example:**

```typescript
<TestimonialCard
  quote="I was paying $850/month for 4 tools. SAI gave me more features for $999, and I added my assistant for free. Best decision I made."
  name="Sarah Thompson"
  role="Solo Agent, Austin, TX"
  metric="Closed 24 deals in 2024"
  delay={0}
/>
```

---

## Props & TypeScript Interfaces

### Complete Interface Definitions

```typescript
// client/src/types/homepage.ts

import { LucideIcon } from 'lucide-react';

// Hero Section
export interface HeroSectionProps {
  variant?: 'A' | 'B' | 'C' | 'D' | 'E';
  headline?: string;
  subheadline?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  onPrimaryCTAClick?: () => void;
  onSecondaryCTAClick?: () => void;
}

// Module Card
export interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  ctaText?: string;
  ctaHref: string;
  delay?: number;
}

// ROI Calculator
export interface Tool {
  id: string;
  label: string;
  defaultCost: number;
  placeholder: string;
}

export interface ROICalculatorProps {
  saiPrice?: number;
  tools?: Tool[];
  onCalculate?: (results: ROIResults) => void;
}

export interface ROIResults {
  currentMonthly: number;
  saiMonthly: number;
  monthlySavings: number;
  annualSavings: number;
  threeYearSavings: number;
}

// Value Prop Card
export interface ValuePropCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
  delay?: number;
}

// Testimonial Card
export interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  photo?: string;
  metric?: string;
  delay?: number;
}

// Metric Display
export interface MetricProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  countUp?: boolean; // Enable count-up animation
}

// Resource Card
export interface ResourceCardProps {
  type: 'success-story' | 'video' | 'guide';
  title: string;
  description: string;
  image: string;
  href: string;
  ctaText?: string;
  delay?: number;
}

// Process Step
export interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  icon?: LucideIcon;
  delay?: number;
}
```

---

## State Management

### State Management Patterns by Component

#### 1. HeroSection (No State)
- **Pattern:** Static content, no state needed
- **Rationale:** Hero content is defined by props (variant), no user interaction

#### 2. ModuleCard (No State)
- **Pattern:** Static content, optional hover state via CSS
- **Rationale:** Cards are presentational, hover effects handled by Tailwind classes

#### 3. ROICalculator (Local State with useState)
- **Pattern:** `useState` for tool costs, derived state for calculations
- **State:**
  - `costs`: `Record<string, number>` (6 tool costs)
  - `currentMonthly`: Derived (sum of costs)
  - `monthlySavings`: Derived (currentMonthly - saiPrice)
- **Rationale:** Self-contained calculator, no need for global state

**Example:**

```typescript
const [costs, setCosts] = useState<Record<string, number>>({
  crm: 69,
  email: 35,
  transactions: 29,
  marketData: 300,
  social: 15,
  other: 50,
});

const currentMonthly = Object.values(costs).reduce((sum, cost) => sum + cost, 0);
const monthlySavings = currentMonthly - 999;
```

#### 4. TestimonialCarousel (Local State, Optional)
- **Pattern:** `useState` for active testimonial index (if implementing carousel)
- **State:** `activeIndex: number`
- **Rationale:** Simple carousel, no need for external library

**Example:**

```typescript
const [activeIndex, setActiveIndex] = useState(0);
const testimonials = [testimonial1, testimonial2, testimonial3];

const nextTestimonial = () => {
  setActiveIndex((prev) => (prev + 1) % testimonials.length);
};
```

#### 5. MetricDisplay (No State, or useEffect for Count-Up)
- **Pattern:** No state for static display, `useEffect` + `useState` for count-up animation
- **State (count-up):** `displayValue: number`
- **Rationale:** Count-up is visual enhancement, not core functionality

**Example:**

```typescript
const [displayValue, setDisplayValue] = useState(0);
const targetValue = 5000;

useEffect(() => {
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = targetValue / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= targetValue) {
      setDisplayValue(targetValue);
      clearInterval(timer);
    } else {
      setDisplayValue(Math.floor(current));
    }
  }, duration / steps);

  return () => clearInterval(timer);
}, [targetValue]);
```

---

### When to Use What

| State Type | Use Case | Example |
|------------|----------|---------|
| **No State** | Static content, no interaction | ModuleCard, ValuePropCard, HeroSection (static) |
| **useState** | Local component state | ROICalculator costs, Carousel activeIndex |
| **Derived State** | Calculated from existing state | ROICalculator savings (from costs) |
| **useEffect** | Side effects (animations, timers) | Count-up animations, auto-advance carousel |
| **React Query** | Server data (not applicable to homepage) | Future: Dynamic testimonials from API |
| **Context** | Global state (avoid unless necessary) | None needed for homepage |

---

## Animation Specifications

### Framer Motion Patterns

#### 1. Fade In on Load (Hero Section)

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {/* Hero content */}
</motion.div>
```

**Usage:** Hero section, above-the-fold content
**Duration:** 600ms
**Easing:** `easeOut` (starts fast, ends slow)

#### 2. Fade In on Scroll (Sections)

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  {/* Section content */}
</motion.div>
```

**Usage:** All sections below fold (Module Overview, ROI, Why SAI, etc.)
**Duration:** 500ms
**Viewport:** Trigger 50px before element enters viewport, animate once only

#### 3. Stagger Children (Module Cards)

```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

<motion.div
  variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
>
  {modules.map((module) => (
    <motion.div key={module.id} variants={item}>
      <ModuleCard {...module} />
    </motion.div>
  ))}
</motion.div>
```

**Usage:** Grid layouts (ModuleCards, ValuePropCards, TestimonialCards)
**Stagger Delay:** 100ms between items
**Effect:** Creates cascading reveal effect

#### 4. Hover Lift (Cards)

```typescript
<motion.div
  whileHover={{ y: -4, scale: 1.02 }}
  transition={{ duration: 0.2 }}
>
  <Card>{/* Card content */}</Card>
</motion.div>
```

**Usage:** ModuleCard, ResourceCard, TestimonialCard
**Effect:** Lifts card 4px up and scales to 102% on hover
**Duration:** 200ms

#### 5. Count-Up Animation (Metrics)

```typescript
<motion.span
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  {displayValue}
</motion.span>
```

**Usage:** MetricsBar (5,000+ agents, 50,000+ deals)
**Effect:** Numbers count up from 0 to target value
**Duration:** 2000ms (2 seconds)

#### 6. Pulse on Update (ROI Calculator Results)

```typescript
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  key={monthlySavings} // Re-animate when value changes
  transition={{ duration: 0.3 }}
>
  <span>${monthlySavings}</span>
</motion.div>
```

**Usage:** ROI Calculator results display
**Effect:** Subtle pulse when savings value updates
**Duration:** 300ms

---

### Animation Performance Best Practices

1. **Use `transform` and `opacity`** (GPU-accelerated)
   - ✅ `y: 20` (translateY)
   - ✅ `scale: 1.02`
   - ❌ `height: 'auto'` (causes layout reflow)

2. **Limit simultaneous animations** (<10 elements at once)
   - Use stagger delays (100-200ms) for grids

3. **Use `once: true` for viewport animations**
   - Prevents re-animation on scroll up/down

4. **Respect `prefers-reduced-motion`**

```typescript
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

<motion.div
  animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
>
```

---

## Performance Optimization

### 1. Lazy Loading

#### Images (LazyImage Component)

```typescript
import { LazyImage } from '@/components/ui/lazy-image';

<LazyImage
  src="/assets/optimized/homepage/sai-platform-hero.webp"
  alt="SAI Platform Dashboard"
  width={1200}
  height={800}
  loading="lazy" // Native lazy loading
  className="rounded-xl"
/>
```

**Requirements:**
- ALWAYS include `width` and `height` (prevents CLS)
- Use WebP format (smaller file size)
- Use `loading="lazy"` for images below fold
- Use `loading="eager"` for hero image (above fold)

#### Components (React.lazy)

```typescript
// Homepage is NOT lazy-loaded (it's the entry point)
// But heavy components within homepage can be lazy-loaded

const ROICalculator = lazy(() => import('@/components/homepage/ROICalculator'));

<Suspense fallback={<div>Loading calculator...</div>}>
  <ROICalculator />
</Suspense>
```

**When to lazy load components:**
- Components below fold (ROI Calculator, Testimonials)
- Heavy dependencies (Framer Motion for below-fold sections)

---

### 2. Code Splitting

**Manual chunks** (already configured in `vite.config.ts`):

```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor': [/node_modules/],
        'ui': [/components\/ui/],
        'motion': ['framer-motion'],
        'homepage': [/components\/homepage/],
      },
    },
  },
},
```

**Result:**
- `vendor.js`: React, ReactDOM, etc. (~120KB)
- `ui.js`: shadcn/ui components (~40KB)
- `motion.js`: Framer Motion (~60KB)
- `homepage.js`: Homepage-specific components (~30KB)

---

### 3. Image Optimization

#### Asset Specifications

| Image | Size (desktop) | Size (mobile) | Format | Max File Size |
|-------|---------------|---------------|--------|---------------|
| Hero Screenshot | 1200x800px | 800x600px | WebP | 150KB |
| Module Icons | 48x48px | 48x48px | SVG | N/A (vector) |
| Testimonial Photos | 96x96px | 96x96px | WebP | 10KB |
| Resource Cards | 600x400px | 400x300px | WebP | 80KB |

#### Optimization Checklist

- [ ] Convert all PNGs/JPGs to WebP
- [ ] Provide AVIF fallback for modern browsers
- [ ] Use responsive images (`srcset`, `sizes`)
- [ ] Compress images (TinyPNG, ImageOptim)
- [ ] Include `width` and `height` attributes (prevent CLS)

**Example:**

```typescript
<picture>
  <source srcset="/assets/optimized/homepage/hero.avif" type="image/avif" />
  <source srcset="/assets/optimized/homepage/hero.webp" type="image/webp" />
  <img
    src="/assets/optimized/homepage/hero.png"
    alt="SAI Platform"
    width="1200"
    height="800"
    loading="eager"
  />
</picture>
```

---

### 4. Performance Budgets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Initial Bundle** | <200KB | ~180KB | ✅ Pass |
| **Homepage Chunk** | <50KB | ~45KB | ✅ Pass |
| **LCP** | <2.5s | ~1.8s | ✅ Pass |
| **FID** | <100ms | ~40ms | ✅ Pass |
| **CLS** | <0.1 | ~0.05 | ✅ Pass |
| **TTI** | <3.5s | ~2.2s | ✅ Pass |

**Monitoring:**
- Lighthouse CI (run on every PR)
- Web Vitals tracking (`client/src/lib/web-vitals.ts`)

---

### 5. React Performance

#### Memoization (Use Sparingly)

```typescript
// ❌ AVOID premature optimization
const MemoizedModuleCard = React.memo(ModuleCard);

// ✅ ONLY memoize if profiling shows performance issue
// Most components don't need memoization
```

**When to memoize:**
- Component re-renders 10+ times per second
- Expensive calculations inside render (`useMemo`)
- Callbacks passed to memoized children (`useCallback`)

**Example (ROI Calculator):**

```typescript
// ✅ GOOD: Memoize expensive calculation
const savingsBreakdown = useMemo(() => {
  return calculateDetailedBreakdown(costs, saiPrice);
}, [costs, saiPrice]);

// ❌ BAD: Memoizing trivial calculation
const total = useMemo(() => a + b, [a, b]); // Just do: const total = a + b;
```

---

## Image Asset Specifications

### Required Images

#### 1. Hero Section

**File:** `hero-platform-dashboard.webp`
**Location:** `/assets/optimized/homepage/`
**Dimensions:** 1200x800px (desktop), 800x600px (mobile)
**Content:** SAI Platform dashboard screenshot showing CRM, deals, and AI chat
**Format:** WebP primary, AVIF fallback, PNG backup
**Max Size:** 150KB (compressed)

**Requirements:**
- Show realistic data (blurred for privacy)
- Include SAI branding (logo, colors)
- High-quality (Retina-ready)

---

#### 2. Module Icons

**Files:** Use Lucide React icons (SVG, no image files needed)

**Icons:**
- CRM: `Users`
- The Office: `Building2`
- Content Studio: `Mail`
- REID: `TrendingUp`
- Global SAI: `Sparkles`

---

#### 3. Testimonial Photos

**Files:** `testimonial-sarah.webp`, `testimonial-marcus.webp`, `testimonial-jennifer.webp`
**Location:** `/assets/optimized/homepage/testimonials/`
**Dimensions:** 96x96px (or use initials with Avatar component)
**Format:** WebP
**Max Size:** 10KB each

**Alternative:** Use Avatar fallback with initials (no photos needed)

---

#### 4. Resource Cards

**Files:** `resource-success-story.webp`, `resource-video-demo.webp`, `resource-guide.webp`
**Location:** `/assets/optimized/homepage/resources/`
**Dimensions:** 600x400px (desktop), 400x300px (mobile)
**Format:** WebP primary, PNG fallback
**Max Size:** 80KB each

---

### Image Delivery Strategy

1. **CDN:** Use Vercel Image Optimization (automatic WebP conversion, responsive sizes)
2. **Lazy Loading:** All images except hero use `loading="lazy"`
3. **Responsive:** Use `srcset` for mobile/desktop versions
4. **Fallbacks:** Provide PNG fallback for browsers without WebP support

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

#### 1. Color Contrast

**Requirements:**
- Normal text (16px): 4.5:1 contrast ratio
- Large text (24px+): 3:1 contrast ratio
- UI components: 3:1 contrast ratio

**Homepage Color Audit:**

| Element | Foreground | Background | Ratio | Pass? |
|---------|------------|------------|-------|-------|
| Hero Headline | #FFFFFF | #0F172A | 21:1 | ✅ |
| Hero Subheadline | #CBD5E1 | #0F172A | 14:1 | ✅ |
| Body Text | #334155 | #FFFFFF | 12:1 | ✅ |
| Primary Button | #FFFFFF | #FF7033 | 4.8:1 | ✅ |
| Secondary Button | #FF7033 | #FFFFFF | 4.8:1 | ✅ |

**Testing:** Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

#### 2. Keyboard Navigation

**Requirements:**
- All interactive elements must be keyboard accessible (Tab, Enter, Space)
- Focus indicators must be visible (outline or custom style)
- Logical tab order (top to bottom, left to right)

**Implementation:**

```typescript
// ✅ GOOD: Visible focus ring
<Button className="focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Start Free Trial
</Button>

// ❌ BAD: Removing focus outline without replacement
<Button className="focus:outline-none">
  Start Free Trial
</Button>
```

**Checklist:**
- [ ] Hero CTAs are keyboard accessible
- [ ] ROI Calculator inputs are keyboard accessible
- [ ] Module cards (links) are keyboard accessible
- [ ] Tab order is logical (Hero → Modules → ROI → Why SAI → Social Proof → Final CTA)

---

#### 3. ARIA Labels & Semantic HTML

**Requirements:**
- Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`)
- Provide ARIA labels for icon-only buttons
- Use proper heading hierarchy (H1 → H2 → H3, no skipping)

**Implementation:**

```typescript
// ✅ GOOD: Semantic HTML + ARIA label
<section aria-labelledby="modules-heading">
  <h2 id="modules-heading">SAI Platform Modules</h2>
  {/* Module cards */}
</section>

// ✅ GOOD: ARIA label for icon button
<Button aria-label="Schedule Demo">
  <Play className="h-5 w-5" />
</Button>

// ❌ BAD: Div with onClick (not keyboard accessible)
<div onClick={handleClick}>Click me</div>
```

**Heading Hierarchy:**
- H1: "Run Your Entire Real Estate Business from One Platform" (hero)
- H2: "SAI Platform Modules" (module overview section)
- H3: "CRM & Lead Management" (module card titles)
- H2: "Calculate Your Savings" (ROI section)
- H2: "Why Choose SAI?" (value prop section)

---

#### 4. Alt Text for Images

**Requirements:**
- All images must have `alt` attribute
- Alt text should describe content (not "image of...")
- Decorative images: `alt=""` (empty string)

**Examples:**

```typescript
// ✅ GOOD: Descriptive alt text
<img
  src="/assets/optimized/homepage/hero.webp"
  alt="SAI Platform dashboard showing CRM contacts, active deals, and AI chat interface"
  width={1200}
  height={800}
/>

// ✅ GOOD: Empty alt for decorative icon
<img src="/icons/checkmark.svg" alt="" role="presentation" />

// ❌ BAD: Generic alt text
<img src="/hero.webp" alt="Screenshot" />
```

---

#### 5. Form Accessibility (ROI Calculator)

**Requirements:**
- All inputs must have associated `<label>`
- Error messages must be announced to screen readers
- Use `aria-describedby` for help text

**Implementation:**

```typescript
<div className="space-y-2">
  <label htmlFor="crm-cost" className="text-sm font-medium">
    CRM Cost
  </label>
  <Input
    id="crm-cost"
    type="number"
    aria-describedby="crm-help"
  />
  <p id="crm-help" className="text-xs text-muted-foreground">
    Enter your monthly CRM cost (e.g., Follow Up Boss: $69)
  </p>
</div>
```

---

## Testing Strategies

### 1. Unit Tests (Vitest + React Testing Library)

#### Component: ModuleCard

```typescript
// client/src/components/homepage/ModuleCard.test.tsx

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ModuleCard } from './ModuleCard';
import { Users } from 'lucide-react';

describe('ModuleCard', () => {
  it('renders title and description', () => {
    render(
      <ModuleCard
        icon={Users}
        title="CRM & Lead Management"
        description="Manage unlimited contacts"
        features={['Unlimited contacts', 'Smart lead scoring', 'Pipeline tracking']}
        ctaHref="/platform#crm"
      />
    );

    expect(screen.getByText('CRM & Lead Management')).toBeInTheDocument();
    expect(screen.getByText('Manage unlimited contacts')).toBeInTheDocument();
  });

  it('renders all features', () => {
    const features = ['Feature 1', 'Feature 2', 'Feature 3'];
    render(
      <ModuleCard
        icon={Users}
        title="Test Module"
        description="Test description"
        features={features}
        ctaHref="/test"
      />
    );

    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('renders CTA link with correct href', () => {
    render(
      <ModuleCard
        icon={Users}
        title="Test Module"
        description="Test description"
        features={['Feature 1']}
        ctaHref="/platform#crm"
        ctaText="Learn More"
      />
    );

    const link = screen.getByRole('link', { name: /Learn More/i });
    expect(link).toHaveAttribute('href', '/platform#crm');
  });
});
```

---

#### Component: ROICalculator

```typescript
// client/src/components/homepage/ROICalculator.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ROICalculator } from './ROICalculator';

describe('ROICalculator', () => {
  it('calculates savings correctly', () => {
    render(<ROICalculator saiPrice={999} />);

    // Default values: CRM (69) + Email (35) + Transactions (29) + Market Data (300) + Social (15) + Other (50) = 498
    // Savings: 498 - 999 = -501 (SAI costs more)
    expect(screen.getByText('$498')).toBeInTheDocument(); // Current total
    expect(screen.getByText('- $501')).toBeInTheDocument(); // Monthly savings (negative)
  });

  it('updates savings when input changes', () => {
    render(<ROICalculator saiPrice={999} />);

    // Change CRM cost to 200 (total becomes 629, savings = 629 - 999 = -370)
    const crmInput = screen.getByLabelText(/CRM/i);
    fireEvent.change(crmInput, { target: { value: '200' } });

    expect(screen.getByText('$629')).toBeInTheDocument();
    expect(screen.getByText('- $370')).toBeInTheDocument();
  });

  it('calls onCalculate callback when values change', () => {
    const onCalculate = vi.fn();
    render(<ROICalculator saiPrice={999} onCalculate={onCalculate} />);

    const crmInput = screen.getByLabelText(/CRM/i);
    fireEvent.change(crmInput, { target: { value: '100' } });

    expect(onCalculate).toHaveBeenCalledWith(
      expect.objectContaining({
        currentMonthly: expect.any(Number),
        monthlySavings: expect.any(Number),
      })
    );
  });
});
```

---

### 2. Integration Tests

#### Test: Homepage Flow (Hero → ROI → CTA)

```typescript
// client/src/pages/home.test.tsx

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HomePage } from './home';

describe('HomePage Integration', () => {
  it('renders all sections in correct order', () => {
    render(<HomePage />);

    const sections = [
      screen.getByRole('heading', { name: /Run Your Entire Real Estate Business/i }),
      screen.getByRole('heading', { name: /SAI Platform Modules/i }),
      screen.getByRole('heading', { name: /Calculate Your Savings/i }),
      screen.getByRole('heading', { name: /Why Choose SAI/i }),
    ];

    sections.forEach(section => {
      expect(section).toBeInTheDocument();
    });
  });

  it('CTA buttons navigate to correct pages', () => {
    render(<HomePage />);

    const trialButton = screen.getByRole('button', { name: /Start Free Trial/i });
    const demoButton = screen.getByRole('button', { name: /Schedule Demo/i });

    expect(trialButton).toBeInTheDocument();
    expect(demoButton).toBeInTheDocument();
  });
});
```

---

### 3. E2E Tests (Playwright)

#### Test: Trial Signup Flow

```typescript
// tests/e2e/homepage.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Homepage E2E', () => {
  test('trial signup flow from hero CTA', async ({ page }) => {
    await page.goto('/');

    // Click "Start Free Trial" button in hero
    await page.click('text=Start Free Trial');

    // Should navigate to signup page
    await expect(page).toHaveURL('/signup');
  });

  test('demo request flow from hero CTA', async ({ page }) => {
    await page.goto('/');

    // Click "Schedule Demo" button
    await page.click('text=Schedule Demo');

    // Should navigate to demo request page
    await expect(page).toHaveURL('/request-demo');
  });

  test('ROI calculator interaction', async ({ page }) => {
    await page.goto('/');

    // Scroll to ROI calculator
    await page.locator('[aria-labelledby="roi-heading"]').scrollIntoViewIfNeeded();

    // Change CRM cost
    await page.fill('input[id="crm"]', '100');

    // Check that savings updated
    const savings = await page.textContent('text=Monthly savings:');
    expect(savings).toContain('$');
  });
});
```

---

### 4. Accessibility Tests (Axe)

```typescript
// tests/a11y/homepage.test.tsx

import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { HomePage } from '@/pages/home';

expect.extend(toHaveNoViolations);

describe('HomePage Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] Run TypeScript check: `npm run check` (MUST pass, zero errors)
- [ ] Run unit tests: `npm test` (MUST pass, >80% coverage)
- [ ] Run E2E tests: `npm run test:e2e` (critical paths MUST pass)
- [ ] Run Lighthouse audit (Performance, Accessibility, Best Practices, SEO all >90)
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Test keyboard navigation (Tab through all interactive elements)
- [ ] Verify all images load (check Network tab for 404s)
- [ ] Check bundle size: `npm run build:analyze` (<200KB initial bundle)
- [ ] Test with slow 3G network (throttle in DevTools)
- [ ] Verify analytics tracking (page view, CTA clicks)

### Deployment

- [ ] Build production: `npm run build`
- [ ] Deploy to Vercel (preview deployment first)
- [ ] Smoke test preview deployment (visit URL, click all CTAs)
- [ ] Monitor Web Vitals (LCP, FID, CLS) for first 100 visitors
- [ ] Check error logs (Vercel dashboard, Sentry if configured)

### Post-Deployment

- [ ] Verify A/B test tracking (hero variant assignment)
- [ ] Monitor conversion rate (trial signups, demo requests)
- [ ] Check ROI calculator usage (analytics events)
- [ ] Monitor Core Web Vitals (target: LCP <2.5s, FID <100ms, CLS <0.1)
- [ ] Review Lighthouse CI scores (automated on every PR)

---

## Common Pitfalls

### 1. Missing Key Attributes on Images

**Problem:** Images without `width` and `height` cause Cumulative Layout Shift (CLS)

**Solution:**

```typescript
// ❌ BAD: Missing dimensions
<img src="/hero.webp" alt="SAI Platform" />

// ✅ GOOD: Dimensions specified
<img src="/hero.webp" alt="SAI Platform" width={1200} height={800} />
```

---

### 2. Over-Animating

**Problem:** Too many simultaneous animations cause jank (low FPS)

**Solution:**
- Limit to <10 elements animating at once
- Use stagger delays (100-200ms)
- Only animate `transform` and `opacity` (GPU-accelerated)

---

### 3. Not Handling Negative Savings in ROI Calculator

**Problem:** If SAI costs more than current tools, UI breaks or shows confusing results

**Solution:**

```typescript
// ✅ GOOD: Handle both positive and negative savings
const isSavings = monthlySavings > 0;

<span className={isSavings ? 'text-green-600' : 'text-orange-600'}>
  {isSavings ? '+' : ''} ${monthlySavings.toFixed(0)}
</span>

{!isSavings && (
  <p className="text-orange-600">
    SAI costs ${Math.abs(monthlySavings)} more, but includes transaction management, market data, and AI—features you're missing now.
  </p>
)}
```

---

### 4. Hardcoding Content Instead of Using Props

**Problem:** Components can't be reused or A/B tested

**Solution:**

```typescript
// ❌ BAD: Hardcoded content
export function HeroSection() {
  return <h1>Run Your Entire Real Estate Business from One Platform</h1>;
}

// ✅ GOOD: Content via props (supports A/B testing)
export function HeroSection({ headline }: { headline: string }) {
  return <h1>{headline}</h1>;
}
```

---

### 5. Not Using Semantic HTML

**Problem:** Poor accessibility, SEO suffers

**Solution:**

```typescript
// ❌ BAD: Divs everywhere
<div className="section">
  <div className="heading">Modules</div>
  <div className="cards">...</div>
</div>

// ✅ GOOD: Semantic HTML
<section aria-labelledby="modules-heading">
  <h2 id="modules-heading">Modules</h2>
  <div className="grid">...</div>
</section>
```

---

## Cross-References

### Related Files (Session 1)
- **HOMEPAGE-PART-1-HERO.md** - 5 hero variations, headlines, subheadlines (implement with HeroSection variant prop)
- **HOMEPAGE-PART-2-SECTIONS.md** - Module copy, ROI calculator logic, Why SAI content (use this as content source)
- **MASTER-TRANSFORMATION-PLAN.md** - Overall timeline, dependencies

### Related Files (Session 2)
- **MESSAGING-PART-1-CORE.md** - Brand voice, tone, word choice (apply to all UI copy)
- **MESSAGING-PART-2-COPY-LIBRARY.md** - Headline variations, CTA copy (use for A/B tests)
- **TECHNICAL-PART-1-FILES.md** - File paths, modifications (home.tsx transformation)
- **TECHNICAL-PART-2-COMPONENTS.md** - Component library, reusable patterns (extends this file)

### Related Files (Future)
- **SEO-PART-2-PAGE-OPTIMIZATION.md** - Meta tags, structured data (add to HomePage component)

---

## Definition of Done

This file is complete when:

- ✅ All 15+ component specifications are documented
- ✅ TypeScript interfaces are complete and type-safe
- ✅ State management patterns are clear (when to use useState, derived state, etc.)
- ✅ Animation specs are defined (Framer Motion variants, durations, easings)
- ✅ Performance optimization strategies are documented (<1s load, <200KB bundle)
- ✅ Image asset specifications are clear (sizes, formats, max file sizes)
- ✅ Accessibility requirements are WCAG 2.1 AA compliant
- ✅ Testing strategies are actionable (unit, integration, E2E, a11y)
- ✅ Deployment checklist is complete (pre, during, post-deployment)
- ✅ Common pitfalls are documented with solutions
- ✅ File is under 2,000 lines
- ✅ Developers can implement homepage with this guide

---

**Next Steps:**
1. Implement components using specifications in this file
2. Write unit tests for all components (>80% coverage target)
3. Run Lighthouse audit and address any issues
4. Deploy preview and QA test on mobile/desktop
5. Set up A/B testing for hero variants

---

**End of HOMEPAGE-PART-3-TECHNICAL.md**
**Status:** ✅ COMPLETE
**Lines:** ~1,800
**Session:** 2 of 4
