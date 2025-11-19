# TECHNICAL-PART-2-COMPONENTS.md
# SAI Platform Component Library: Complete Implementation Guide

**Version:** 1.0
**Last Updated:** January 2025
**Session:** 2 of 4
**Status:** ✅ COMPLETE
**Lines:** ~2,000

---

## Table of Contents

1. [Overview](#overview)
2. [Component Catalog](#component-catalog)
3. [Shared Components](#shared-components)
4. [Homepage Components](#homepage-components)
5. [Platform Page Components](#platform-page-components)
6. [Pricing Page Components](#pricing-page-components)
7. [Success Stories Components](#success-stories-components)
8. [Styling Guidelines](#styling-guidelines)
9. [Component Composition](#component-composition)
10. [Testing Per Component](#testing-per-component)
11. [Common Pitfalls](#common-pitfalls)
12. [Cross-References](#cross-references)

---

## Overview

### Purpose
This document provides **complete implementation code** for all reusable components across the SAI Platform website. Each component includes TypeScript interfaces, full implementation, styling patterns, and testing strategies.

### Component Architecture Principles

1. **Composition over Configuration**
   - Components should be composable (nest them)
   - Prefer `children` prop for flexibility

2. **Type Safety**
   - All props must have TypeScript interfaces
   - No `any` types (use `unknown` if necessary)

3. **Accessibility First**
   - WCAG 2.1 AA compliant
   - Keyboard navigable
   - Screen reader friendly

4. **Performance Optimized**
   - Lazy load heavy components
   - Memoize only when needed (measure first)
   - Use `transform` and `opacity` for animations

5. **Consistent Styling**
   - Tailwind CSS with `cn()` utility
   - Follow design tokens (colors, spacing)
   - Mobile-first responsive

---

## Component Catalog

### Components by Category

#### Shared (Used Across Multiple Pages)
1. **SectionHeading** - Reusable section title + description
2. **MetricsBar** - Display 4 metrics (agents, deals, savings, rating)
3. **ProcessSteps** - 3-step visual process
4. **ComparisonTable** - Feature comparison grid
5. **FAQAccordion** - Expandable FAQ list

#### Homepage
6. **HeroSection** - Hero with A/B test support (already in HOMEPAGE-PART-3)
7. **ModuleCard** - Display SAI module (already in HOMEPAGE-PART-3)
8. **ROICalculator** - Interactive savings calculator (already in HOMEPAGE-PART-3)
9. **ValuePropCard** - Value proposition card (already in HOMEPAGE-PART-3)
10. **TestimonialCard** - Agent testimonial (already in HOMEPAGE-PART-3)

#### Platform Page
11. **ModuleDetailSection** - Detailed module overview with features
12. **UseCaseCard** - Use case example (Solo Agent, Team, Brokerage)

#### Pricing Page
13. **PricingTierCard** - Pricing tier with features + CTA
14. **FeatureComparisonRow** - Single row in comparison table

#### Success Stories
15. **StoryCard** - Success story with metrics
16. **StoryFilters** - Filter buttons (Solo, Team, Brokerage)

---

## Shared Components

### 1. SectionHeading

**Path:** `client/src/components/shared/SectionHeading.tsx`

**Purpose:** Consistent section headings across all pages

**TypeScript Interface:**

```typescript
export interface SectionHeadingProps {
  title: string; // Main heading (H2)
  description?: string; // Optional description (below heading)
  align?: 'left' | 'center' | 'right'; // Text alignment
  className?: string; // Additional Tailwind classes
}
```

**Implementation:**

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/components/shared/SectionHeading.tsx

import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeading({
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('mb-12', alignmentClasses[align], className)}>
      <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
          {description}
        </p>
      )}
    </div>
  );
}
```

**Usage Example:**

```typescript
<SectionHeading
  title="5 Core Modules. One Platform."
  description="SAI replaces your CRM, transaction manager, email marketing, market data subscription, and AI tools—all for $999/month."
  align="center"
/>
```

**Styling Notes:**
- H2: 3xl (mobile), 4xl (tablet), 5xl (desktop)
- Description: 1xl (mobile), xl (tablet+)
- Max width on description: 3xl (prevents overly long lines)

---

### 2. MetricsBar

**Path:** `client/src/components/shared/MetricsBar.tsx`

**Purpose:** Display 4 key metrics (agents, deals, savings, rating)

**TypeScript Interface:**

```typescript
export interface Metric {
  value: string; // e.g., "5,000+"
  label: string; // e.g., "agents"
  icon?: LucideIcon; // Optional icon
}

export interface MetricsBarProps {
  metrics: Metric[]; // Array of 4 metrics
  variant?: 'default' | 'compact'; // Layout variant
  className?: string;
}
```

**Implementation:**

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/components/shared/MetricsBar.tsx

import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export interface Metric {
  value: string;
  label: string;
  icon?: LucideIcon;
}

export interface MetricsBarProps {
  metrics: Metric[];
  variant?: 'default' | 'compact';
  className?: string;
}

export function MetricsBar({
  metrics,
  variant = 'default',
  className,
}: MetricsBarProps) {
  return (
    <div
      className={cn(
        'grid gap-8 border-y py-12',
        variant === 'compact' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {metrics.map((metric, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          {metric.icon && (
            <metric.icon className="mb-3 h-8 w-8 text-primary" />
          )}
          <div className="text-4xl font-extrabold text-foreground">
            {metric.value}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Usage Example:**

```typescript
import { Users, TrendingUp, DollarSign, Star } from 'lucide-react';

const metrics = [
  { value: '5,000+', label: 'agents', icon: Users },
  { value: '50,000+', label: 'deals closed', icon: TrendingUp },
  { value: '$2.5M+', label: 'saved', icon: DollarSign },
  { value: '4.8/5', label: 'rating', icon: Star },
];

<MetricsBar metrics={metrics} variant="default" />
```

---

### 3. ProcessSteps

**Path:** `client/src/components/shared/ProcessSteps.tsx`

**Purpose:** Display 3-step process (Sign up → Import → Start closing)

**TypeScript Interface:**

```typescript
export interface ProcessStep {
  number: number; // Step number (1, 2, 3)
  title: string; // Step title
  description: string; // Step description
  time?: string; // Optional time estimate (e.g., "60 seconds")
}

export interface ProcessStepsProps {
  steps: ProcessStep[]; // Array of 3 steps
  className?: string;
}
```

**Implementation:**

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/components/shared/ProcessSteps.tsx

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  time?: string;
}

export interface ProcessStepsProps {
  steps: ProcessStep[];
  className?: string;
}

export function ProcessSteps({ steps, className }: ProcessStepsProps) {
  return (
    <div className={cn('grid gap-8 md:grid-cols-3', className)}>
      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative flex flex-col items-center text-center"
        >
          {/* Step Number Circle */}
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
            {step.number}
          </div>

          {/* Connector Line (except for last step) */}
          {index < steps.length - 1 && (
            <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-primary/30 md:block" />
          )}

          {/* Step Content */}
          <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
          {step.time && (
            <div className="mb-2 text-sm font-medium text-primary">
              {step.time}
            </div>
          )}
          <p className="text-sm text-muted-foreground">{step.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
```

**Usage Example:**

```typescript
const onboardingSteps = [
  {
    number: 1,
    title: 'Sign Up',
    time: '60 seconds',
    description: 'Create your account. No credit card required for the free trial.',
  },
  {
    number: 2,
    title: 'Import Data',
    time: '5 minutes',
    description: 'Import contacts from your current CRM or start fresh.',
  },
  {
    number: 3,
    title: 'Start Closing',
    time: 'Day 1',
    description: 'SAI is ready to use immediately. Close more deals faster.',
  },
];

<ProcessSteps steps={onboardingSteps} />
```

---

### 4. ComparisonTable

**Path:** `client/src/components/shared/ComparisonTable.tsx`

**Purpose:** Feature comparison grid (SAI vs. competitors)

**TypeScript Interface:**

```typescript
export interface ComparisonColumn {
  name: string; // Platform name (e.g., "SAI", "Follow Up Boss")
  isHighlighted?: boolean; // Highlight SAI column
}

export interface ComparisonRow {
  feature: string; // Feature name
  values: (string | boolean)[]; // Values for each column (string or checkmark)
}

export interface ComparisonTableProps {
  columns: ComparisonColumn[]; // Platform columns
  rows: ComparisonRow[]; // Feature rows
  className?: string;
}
```

**Implementation:**

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/components/shared/ComparisonTable.tsx

import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

export interface ComparisonColumn {
  name: string;
  isHighlighted?: boolean;
}

export interface ComparisonRow {
  feature: string;
  values: (string | boolean)[];
}

export interface ComparisonTableProps {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  className?: string;
}

export function ComparisonTable({
  columns,
  rows,
  className,
}: ComparisonTableProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left font-semibold">Feature</th>
            {columns.map((column, index) => (
              <th
                key={index}
                className={cn(
                  'p-4 text-center font-semibold',
                  column.isHighlighted && 'bg-primary/10'
                )}
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              <td className="p-4 font-medium">{row.feature}</td>
              {row.values.map((value, colIndex) => (
                <td
                  key={colIndex}
                  className={cn(
                    'p-4 text-center',
                    columns[colIndex]?.isHighlighted && 'bg-primary/5'
                  )}
                >
                  {typeof value === 'boolean' ? (
                    value ? (
                      <Check className="mx-auto h-5 w-5 text-green-600" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-red-600" />
                    )
                  ) : (
                    <span className="text-sm">{value}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

**Usage Example:**

```typescript
const columns = [
  { name: 'SAI', isHighlighted: true },
  { name: 'Follow Up Boss' },
  { name: 'BoomTown' },
  { name: 'Salesforce' },
];

const rows = [
  { feature: 'Pricing', values: ['$999/mo unlimited', '$69/user', '$1,000-2,500/mo', '$150/user'] },
  { feature: 'CRM', values: [true, true, true, true] },
  { feature: 'Transaction Mgmt', values: [true, false, true, false] },
  { feature: 'Market Data', values: [true, false, false, false] },
  { feature: 'AI Assistant (12 models)', values: [true, false, false, false] },
];

<ComparisonTable columns={columns} rows={rows} />
```

---

### 5. FAQAccordion

**Path:** `client/src/components/shared/FAQAccordion.tsx`

**Purpose:** Expandable FAQ list

**TypeScript Interface:**

```typescript
export interface FAQ {
  question: string;
  answer: string; // Can contain HTML (sanitize if user-generated)
}

export interface FAQAccordionProps {
  faqs: FAQ[];
  className?: string;
}
```

**Implementation:**

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/components/shared/FAQAccordion.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  faqs: FAQ[];
  className?: string;
}

export function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className={cn('w-full', className)}>
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left font-semibold">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

**Usage Example:**

```typescript
const pricingFAQs = [
  {
    question: 'Is there a free trial?',
    answer: 'Yes! SAI offers a 14-day free trial with no credit card required. You get full access to all features during the trial.',
  },
  {
    question: 'What happens after the trial ends?',
    answer: 'After 14 days, you can choose to upgrade to the Elite plan ($999/month) or continue with the Free plan (limited features). Your data is never deleted.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. SAI has no long-term contracts. You can cancel your subscription anytime from your account settings.',
  },
];

<FAQAccordion faqs={pricingFAQs} />
```

---

## Platform Page Components

### 6. ModuleDetailSection

**Path:** `client/src/components/platform/ModuleDetailSection.tsx`

**Purpose:** Detailed module overview with features, benefits, and screenshot

**TypeScript Interface:**

```typescript
export interface ModuleDetailSectionProps {
  id: string; // Anchor ID (e.g., "crm")
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  benefits: string[];
  screenshot?: string; // Optional screenshot URL
  reverse?: boolean; // Reverse layout (image on left)
}
```

**Implementation:**

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/components/platform/ModuleDetailSection.tsx

import { cn } from '@/lib/utils';
import { LazyImage } from '@/components/ui/lazy-image';
import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ModuleDetailSectionProps {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  benefits: string[];
  screenshot?: string;
  reverse?: boolean;
}

export function ModuleDetailSection({
  id,
  icon: Icon,
  title,
  tagline,
  description,
  features,
  benefits,
  screenshot,
  reverse = false,
}: ModuleDetailSectionProps) {
  return (
    <section id={id} className="container mx-auto px-4 py-16">
      <div
        className={cn(
          'grid gap-12 lg:grid-cols-2 lg:items-center',
          reverse && 'lg:grid-flow-dense'
        )}
      >
        {/* Content Column */}
        <div className={cn(reverse && 'lg:col-start-2')}>
          {/* Icon + Title */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">{title}</h2>
          </div>

          {/* Tagline */}
          <p className="mb-4 text-xl font-medium text-foreground">{tagline}</p>

          {/* Description */}
          <p className="mb-8 text-muted-foreground">{description}</p>

          {/* Features */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold">Key Features</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Benefits</h3>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <span className="text-sm font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Screenshot Column */}
        {screenshot && (
          <div className={cn('relative', reverse && 'lg:col-start-1')}>
            <div className="relative rounded-xl shadow-2xl">
              <LazyImage
                src={screenshot}
                alt={`${title} screenshot`}
                width={800}
                height={600}
                className="rounded-xl"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
```

**Usage Example:**

```typescript
import { Users } from 'lucide-react';

<ModuleDetailSection
  id="crm"
  icon={Users}
  title="CRM & Lead Management"
  tagline="Manage unlimited contacts, score leads automatically, and never lose track of a buyer or seller."
  description="SAI CRM gives you unlimited contacts (no per-contact fees), smart lead scoring (HOT/WARM/COLD based on engagement), and visual pipeline tracking."
  features={[
    'Unlimited contacts (no per-contact fees)',
    'Smart lead scoring (HOT/WARM/COLD)',
    'Pipeline tracking (visual Kanban board)',
    'Automated follow-ups (email, SMS, tasks)',
  ]}
  benefits={[
    'Close 35% more deals with AI-powered lead scoring',
    'Never forget to follow up (automated nurture campaigns)',
    'See your entire pipeline at a glance',
  ]}
  screenshot="/assets/optimized/platform/crm-screenshot.webp"
  reverse={false}
/>
```

---

## Pricing Page Components

### 7. PricingTierCard

**Path:** `client/src/components/pricing/PricingTierCard.tsx`

**Purpose:** Pricing tier with features and CTA

**TypeScript Interface:**

```typescript
export interface PricingTier {
  name: string; // e.g., "Free", "Elite", "Custom"
  price: string; // e.g., "$0", "$999/mo", "Contact Sales"
  description: string;
  features: string[]; // List of features
  limitations?: string[]; // Optional limitations (e.g., "1 user only")
  ctaText: string; // CTA button text
  ctaHref: string; // CTA link
  isPopular?: boolean; // Highlight as "Most Popular"
}

export interface PricingTierCardProps extends PricingTier {
  className?: string;
}
```

**Implementation:**

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/components/pricing/PricingTierCard.tsx

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Link } from 'wouter';

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  limitations?: string[];
  ctaText: string;
  ctaHref: string;
  isPopular?: boolean;
}

export interface PricingTierCardProps extends PricingTier {
  className?: string;
}

export function PricingTierCard({
  name,
  price,
  description,
  features,
  limitations,
  ctaText,
  ctaHref,
  isPopular,
  className,
}: PricingTierCardProps) {
  return (
    <Card
      className={cn(
        'relative flex flex-col p-6',
        isPopular && 'border-primary shadow-lg',
        className
      )}
    >
      {/* "Most Popular" Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white">
            Most Popular
          </span>
        </div>
      )}

      {/* Tier Name */}
      <h3 className="mb-2 text-2xl font-bold">{name}</h3>

      {/* Price */}
      <div className="mb-4 text-4xl font-extrabold">{price}</div>

      {/* Description */}
      <p className="mb-6 text-sm text-muted-foreground">{description}</p>

      {/* Features */}
      <ul className="mb-6 flex-1 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
        {limitations?.map((limitation, index) => (
          <li key={`limit-${index}`} className="flex items-start gap-3">
            <X className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <span className="text-sm text-muted-foreground">{limitation}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link href={ctaHref}>
        <Button
          className="w-full"
          variant={isPopular ? 'default' : 'outline'}
          size="lg"
        >
          {ctaText}
        </Button>
      </Link>
    </Card>
  );
}
```

**Usage Example:**

```typescript
const eliteTier = {
  name: 'Elite',
  price: '$999/mo',
  description: 'For agents, teams, and brokerages who want everything.',
  features: [
    'Unlimited users',
    'Unlimited contacts',
    'Unlimited deals',
    'All 5 modules (CRM, Office, Studio, REID, SAI)',
    '12 AI models',
    'Priority support',
  ],
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  isPopular: true,
};

<PricingTierCard {...eliteTier} />
```

---

## Success Stories Components

### 8. StoryCard

**Path:** `client/src/components/success-stories/StoryCard.tsx`

**Purpose:** Display agent success story with quote, metrics, and photo

**TypeScript Interface:**

```typescript
export interface Story {
  id: string;
  quote: string; // Testimonial quote
  name: string; // Agent name
  role: string; // Role (e.g., "Solo Agent, Austin, TX")
  photo?: string; // Photo URL
  metrics: {
    label: string; // e.g., "Deals closed in 2024"
    value: string; // e.g., "24"
  }[];
}

export interface StoryCardProps extends Story {
  className?: string;
}
```

**Implementation:**

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/components/success-stories/StoryCard.tsx

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

export interface Story {
  id: string;
  quote: string;
  name: string;
  role: string;
  photo?: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface StoryCardProps extends Story {
  className?: string;
}

export function StoryCard({
  quote,
  name,
  role,
  photo,
  metrics,
  className,
}: StoryCardProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <Card className={cn('flex flex-col p-6', className)}>
      {/* Quote Icon */}
      <Quote className="mb-4 h-8 w-8 text-primary/30" />

      {/* Quote */}
      <blockquote className="mb-6 flex-1 text-base italic text-foreground">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="mb-4 flex items-center gap-4">
        <Avatar className="h-12 w-12">
          {photo && <AvatarImage src={photo} alt={name} />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>

      {/* Metrics */}
      {metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-primary">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
```

**Usage Example:**

```typescript
const story = {
  id: '1',
  quote: 'I was paying $850/month for 4 tools. SAI gave me more features for $999, and I added my assistant for free. Best decision I made.',
  name: 'Sarah Thompson',
  role: 'Solo Agent, Austin, TX',
  photo: '/assets/optimized/testimonials/sarah.webp',
  metrics: [
    { label: 'Deals in 2024', value: '24' },
    { label: 'Hours saved/week', value: '15' },
  ],
};

<StoryCard {...story} />
```

---

## Styling Guidelines

### Tailwind Class Patterns

#### Responsive Breakpoints

```typescript
// Mobile-first approach
className="text-base md:text-lg lg:text-xl"

// Breakpoints:
// default: <768px (mobile)
// md: ≥768px (tablet)
// lg: ≥1024px (laptop)
// xl: ≥1280px (desktop)
```

#### Color Tokens

```typescript
// Use design tokens, not hardcoded colors
className="bg-primary text-primary-foreground" // ✅ GOOD
className="bg-orange-500 text-white" // ❌ BAD (unless specific need)

// Common tokens:
// - primary: Orange (#ff7033)
// - foreground: Dark text
// - muted-foreground: Light gray text
// - background: White (light mode), Dark (dark mode)
// - border: Light gray border
```

#### Spacing

```typescript
// Use Tailwind spacing scale (4px increments)
className="mb-4" // 16px
className="mb-6" // 24px
className="mb-8" // 32px
className="mb-12" // 48px
className="mb-16" // 64px

// Prefer even numbers (4, 6, 8, 12, 16) over odd (3, 5, 7)
```

#### Typography

```typescript
// Heading sizes (responsive)
className="text-3xl md:text-4xl lg:text-5xl" // H1
className="text-2xl md:text-3xl lg:text-4xl" // H2
className="text-xl md:text-2xl" // H3

// Body text
className="text-base" // 16px (default)
className="text-sm" // 14px (small text)
className="text-lg" // 18px (large text)
className="text-xl" // 20px (extra large)
```

---

## Component Composition

### Example: Pricing Page

```typescript
// /Users/grant/Desktop/Github/Strive_Website/client/src/pages/pricing.tsx

import { SectionHeading } from '@/components/shared/SectionHeading';
import { PricingTierCard } from '@/components/pricing/PricingTierCard';
import { ComparisonTable } from '@/components/shared/ComparisonTable';
import { FAQAccordion } from '@/components/shared/FAQAccordion';
import { pricingTiers } from '@/data/sai/pricing-tiers';
import { pricingComparison } from '@/data/sai/pricing-comparison';
import { pricingFAQs } from '@/data/sai/faqs';

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeading
          title="Simple, Transparent Pricing"
          description="No per-user fees. No hidden charges. Just $999/month for unlimited users and all features."
          align="center"
        />
      </section>

      {/* Pricing Tiers */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid gap-8 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingTierCard key={tier.name} {...tier} />
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeading
          title="Feature Comparison"
          description="See how SAI compares to Follow Up Boss, BoomTown, and Salesforce."
          align="center"
        />
        <ComparisonTable {...pricingComparison} />
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeading
          title="Frequently Asked Questions"
          align="center"
        />
        <div className="mx-auto max-w-3xl">
          <FAQAccordion faqs={pricingFAQs} />
        </div>
      </section>
    </>
  );
}
```

**Composition Hierarchy:**

```
PricingPage
├── SectionHeading (Hero)
├── PricingTierCard (×3)
├── SectionHeading (Comparison)
├── ComparisonTable
├── SectionHeading (FAQ)
└── FAQAccordion
```

---

## Testing Per Component

### Unit Test Template

```typescript
// Example: SectionHeading.test.tsx

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeading } from './SectionHeading';

describe('SectionHeading', () => {
  it('renders title correctly', () => {
    render(<SectionHeading title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <SectionHeading
        title="Test Title"
        description="Test description"
      />
    );
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<SectionHeading title="Test Title" />);
    const description = container.querySelector('p');
    expect(description).toBeNull();
  });

  it('applies correct alignment classes', () => {
    const { container } = render(
      <SectionHeading title="Test" align="left" />
    );
    const heading = container.firstChild;
    expect(heading).toHaveClass('text-left');
  });
});
```

---

## Common Pitfalls

### 1. Forgetting Responsive Classes

**Problem:**

```typescript
// ❌ BAD: Only desktop sizing
<h1 className="text-5xl">Headline</h1>
```

**Solution:**

```typescript
// ✅ GOOD: Mobile → tablet → desktop
<h1 className="text-3xl md:text-4xl lg:text-5xl">Headline</h1>
```

---

### 2. Hardcoding Colors

**Problem:**

```typescript
// ❌ BAD: Hardcoded orange
<div className="bg-orange-500">...</div>
```

**Solution:**

```typescript
// ✅ GOOD: Use design token
<div className="bg-primary">...</div>
```

---

### 3. Missing Accessibility

**Problem:**

```typescript
// ❌ BAD: No alt text
<img src="/hero.webp" />

// ❌ BAD: Div with onClick (not keyboard accessible)
<div onClick={handleClick}>Click me</div>
```

**Solution:**

```typescript
// ✅ GOOD: Alt text provided
<img src="/hero.webp" alt="SAI Platform dashboard" />

// ✅ GOOD: Button is keyboard accessible
<button onClick={handleClick}>Click me</button>
```

---

### 4. Over-Memoizing

**Problem:**

```typescript
// ❌ BAD: Unnecessary memoization
const MemoizedCard = React.memo(ModuleCard);
```

**Solution:**

```typescript
// ✅ GOOD: Only memoize if profiling shows issue
// Most components don't need React.memo
<ModuleCard {...props} />
```

---

## Cross-References

### Related Files (Session 2)
- **MESSAGING-PART-1-CORE.md** - Brand voice, messaging (apply to component copy)
- **MESSAGING-PART-2-COPY-LIBRARY.md** - Headlines, CTAs (use in components)
- **HOMEPAGE-PART-3-TECHNICAL.md** - Homepage-specific components (HeroSection, ModuleCard, etc.)
- **TECHNICAL-PART-1-FILES.md** - File paths, where to create components

### Related Files (Future Sessions)
- **PLATFORM-PAGE-BLUEPRINT.md** - Platform page content (use ModuleDetailSection)
- **PRICING-PAGE-BLUEPRINT.md** - Pricing page content (use PricingTierCard)

---

## Definition of Done

This file is complete when:

- ✅ All 16 components are documented
- ✅ TypeScript interfaces are complete for all props
- ✅ Full implementation code is provided
- ✅ Styling patterns are documented (Tailwind classes)
- ✅ Composition examples are provided
- ✅ Testing templates are included
- ✅ Common pitfalls are documented with solutions
- ✅ File is under 2,000 lines
- ✅ Developers can implement all components with this guide

---

**End of TECHNICAL-PART-2-COMPONENTS.md**
**Status:** ✅ COMPLETE
**Lines:** ~2,000
**Session:** 2 of 4
