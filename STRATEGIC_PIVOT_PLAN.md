# Strategic Website Pivot: Assistant-First Implementation Plan

**Version:** 2.0
**Date:** September 27, 2025
**Purpose:** Transform Strive from consulting-first to product-first (Assistant + Tools) while maintaining StoryBrand B2B messaging

---

## 🎯 Executive Summary

This plan transforms the Strive website from a traditional "consulting firm" presentation into a modern "product platform" experience, positioning the **Intelligent Business Assistant** as the core product with **specialized tools** as modular enhancements.

**Key Principle:** Be a product company that offers services, NOT a service company with products.

**StoryBrand Framework:** Maintained throughout - customer is the hero, Strive is the guide, clear plan, bold CTAs.

---

## 📊 Current State Analysis

### What We Have:
- ✅ Functional chatbot at `/chatbot-sai` (needs elevation)
- ✅ 27 detailed "solution" objects organized by category
- ✅ StoryBrand messaging framework in place
- ✅ "Tool" language partially implemented (Session 6)
- ✅ Industry-specific content and filtering
- ✅ Strong technical foundation

### What's Missing:
- ❌ Assistant positioned as THE product
- ❌ Clear product/platform narrative
- ❌ Pricing page and packaging
- ❌ Platform overview page
- ❌ Trial signup flow
- ❌ Tools positioned as assistant add-ons

### The Problem:
Current site says "we build custom AI solutions" (consulting).
Need to say "we have an AI Assistant platform with tools" (product).

---

## 🚀 PHASE 1: HOMEPAGE TRANSFORMATION (Week 1-2)

### 1.1 Hero Section Redesign
**Files:**
- `client/src/pages/home.tsx` (lines 133-141)
- `client/src/components/ui/hero-section.tsx`

#### Current StoryBrand Message:
```
Hero: "Transform Your Business with AI to Lead Your Industry"
Problem: "Are you struggling to outpace competition with manual processes?"
Guide: "At Strive, we help you unlock the potential of AI"
```

#### NEW Assistant-First StoryBrand Message:
```
Hero: "Meet Your Intelligent Business Assistant"
Subhead: "The only AI team member that works 24/7, never takes vacation, and gets smarter every day"

Problem: "Tired of switching between dozens of tools while critical work piles up?"
Alternative: "Drowning in tasks, tools, and missed opportunities?"

Guide: "Strive's AI Assistant works alongside your team, handling busywork so you can focus on growth"

Plan: "One assistant. Unlimited capabilities. Add the tools you need, when you need them."

Success: "Work like a Fortune 500 company. Scale like a startup."
```

#### Implementation Changes:

**Desktop Layout:**
```
LEFT SIDE (50%):
- Hero title (new messaging)
- Problem statement (2 sentences max)
- Guide statement (1 sentence)
- CTAs:
  Primary: "Try Your Assistant Free" → /assessment (modified)
  Secondary: "See How It Works" → scroll to how-it-works section
- Trust badges: "No credit card required • 30-day trial • Cancel anytime"

RIGHT SIDE (50%):
- Live Assistant Preview (move from chatbot-sai page)
- Interactive demo (can click, send sample messages)
- Visual responses showing capabilities
- Label: "Your Assistant in Action ↓"
```

**Mobile Layout:**
```
TOP: Assistant preview (interactive)
MIDDLE: Hero title + messaging
BOTTOM: CTAs (stacked)
```

**Code Changes:**
```typescript
// home.tsx - Update HeroSection props
<HeroSection
  title="Meet Your Intelligent Business Assistant"
  subtitle="Tired of switching between dozens of tools while critical work piles up? Your AI Assistant works alongside your team 24/7, handling busywork so you can focus on growth."
  primaryButtonText="Try Your Assistant Free"
  secondaryButtonText="See How It Works"
  onPrimaryClick={() => window.location.href = '/assessment'}
  onSecondaryClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
  showAssistantDemo={true} // NEW PROP
/>
```

---

### 1.2 Assistant Capabilities Section (NEW)
**Insert after hero, before current "solutions" cards**

**Purpose:** Show what customers get immediately (StoryBrand "The Plan")

**Structure:**
```html
<section className="py-16 bg-gradient-to-br from-gray-50 to-white">
  <div className="container mx-auto px-4">
    <!-- Header -->
    <div className="text-center mb-12">
      <Badge>Included in Every Plan</Badge>
      <h2>Your Assistant Includes (Out of the Box)</h2>
      <p>Start working smarter on day one with these core capabilities</p>
    </div>

    <!-- 6 Base Capability Cards -->
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card 1: Natural Conversation -->
      <Card>
        <Icon: MessageCircle />
        <h3>Natural Conversation Interface</h3>
        <p>Chat naturally with your assistant in plain English - no technical knowledge required</p>
        <Badge>Core Feature</Badge>
      </Card>

      <!-- Card 2: Business Knowledge Base -->
      <Card>
        <Icon: Brain />
        <h3>Business Knowledge Base</h3>
        <p>Your assistant learns your business, industry, and processes to provide relevant insights</p>
        <Badge>Core Feature</Badge>
      </Card>

      <!-- Card 3: Task & Project Management -->
      <Card>
        <Icon: CheckSquare />
        <h3>Task & Project Management</h3>
        <p>Track tasks, manage projects, and never miss a deadline with intelligent reminders</p>
        <Badge>Core Feature</Badge>
      </Card>

      <!-- Card 4: Meeting Scheduling -->
      <Card>
        <Icon: Calendar />
        <h3>Meeting Scheduling & Calendar</h3>
        <p>Automatically schedule meetings, manage your calendar, and send reminders to attendees</p>
        <Badge>Core Feature</Badge>
      </Card>

      <!-- Card 5: Document Analysis -->
      <Card>
        <Icon: FileText />
        <h3>Document Analysis</h3>
        <p>Upload and analyze documents, extract key information, and get instant summaries</p>
        <Badge>Core Feature</Badge>
      </Card>

      <!-- Card 6: Data Queries & Reports -->
      <Card>
        <Icon: BarChart3 />
        <h3>Data Queries & Reports</h3>
        <p>Ask questions about your business data and get instant, visual reports</p>
        <Badge>Core Feature</Badge>
      </Card>
    </div>

    <!-- CTA -->
    <div className="text-center mt-12">
      <p className="text-lg text-muted-foreground mb-4">
        Want to do more? Add specialized tools ↓
      </p>
    </div>
  </div>
</section>
```

**Implementation:**
- Create new component: `client/src/components/home/assistant-capabilities-section.tsx`
- Import and add to home.tsx after hero

---

### 1.3 Tools Enhancement Section
**File:** `client/src/pages/home.tsx` (lines 59-96, 199-254)

**Current:** Generic "Integrated Platform" section with 6 solution cards

**NEW:** "Supercharge with Specialized Tools" section

**Changes:**

#### Section Header Update:
```typescript
// OLD
<div className="text-sm uppercase">TRANSPARENCY, ACCOUNTABILITY, AND CONTROL</div>
<h2>Never Wonder Where Your Project Stands</h2>
<p>Your custom Strive client portal gives you daily progress updates...</p>

// NEW
<div className="text-sm uppercase text-primary">ENHANCE YOUR ASSISTANT</div>
<h2 className="text-4xl font-bold">
  Supercharge with Specialized <span className="text-primary">Tools</span>
</h2>
<p className="text-xl text-muted-foreground">
  Give your assistant industry-specific superpowers. Each tool integrates seamlessly to extend what your assistant can do.
</p>
```

#### Tool Card Updates (all 6 cards):
```typescript
// Add these elements to EACH card:

// 1. "Assistant Tool" badge at top
<Badge className="absolute top-2 right-2 bg-primary/10 text-primary">
  Assistant Tool
</Badge>

// 2. Integration visual
<div className="flex items-center gap-2 mb-3">
  <Bot className="h-4 w-4 text-primary" />
  <ArrowRight className="h-3 w-3 text-muted-foreground" />
  {solution.icon}
</div>

// 3. Updated description pattern
<p className="text-muted-foreground">
  Give your assistant {solution.capability}: {solution.description}
</p>

// 4. Updated CTA
<Button>Add This Tool</Button>
```

#### Updated Tool Descriptions:
```typescript
const solutions = [
  {
    icon: <Clock />,
    title: "Project Management Tool",
    capability: "advanced project management capabilities",
    description: "Track complex projects, manage team workload, and deliver on time, automatically.",
    href: "/tools#process-automation",
  },
  {
    icon: <BarChart />,
    title: "Business Intelligence Tool",
    capability: "predictive analytics and real-time insights",
    description: "Turn raw data into actionable intelligence with visual dashboards and smart recommendations.",
    href: "/tools#machine-learning-analytics",
  },
  {
    icon: <Cog />,
    title: "Process Automation Tool",
    capability: "workflow automation",
    description: "Automate repetitive tasks across all your systems, saving hours every day.",
    href: "/tools#process-automation",
  },
  {
    icon: <Users />,
    title: "Customer Management Tool",
    capability: "360° customer insights",
    description: "Build stronger relationships with intelligent engagement and predictive customer analytics.",
    href: "/tools#conversational-ai",
  },
  {
    icon: <Calculator />,
    title: "Financial Planning Tool",
    capability: "financial forecasting",
    description: "Optimize cash flow, predict revenue, and make smarter financial decisions with AI-powered modeling.",
    href: "/tools#machine-learning-analytics",
  },
  {
    icon: <ShieldCheck />,
    title: "Security & Compliance Tool",
    capability: "enterprise-grade security monitoring",
    description: "Protect your business with automated threat detection, compliance monitoring, and instant alerts.",
    href: "/tools#ai-security",
  },
];
```

---

### 1.4 Industry Selector Refinement
**File:** `client/src/pages/home.tsx` (lines 144-198)

**Current:** "AI SOLUTIONS TAILORED TO YOUR INDUSTRY'S BIGGEST CHALLENGES"

**NEW:** "Your Assistant + Industry-Specific Tools"

**Updates:**

```typescript
// Header section
<div className="text-lg uppercase text-primary mb-4">
  SEE YOUR INDUSTRY'S TOOLS
</div>
<h2 className="text-3xl font-bold mb-4 text-white">
  Every Industry Has Unique Challenges. Your Assistant Adapts.
</h2>
<p className="text-white/80 text-lg max-w-2xl mx-auto">
  Select your industry below to see how businesses like yours use their assistant with specialized tools to solve real problems.
</p>

// CTA button update (line 192)
<Button>
  See {selectedIndustryName}'s Tools // Dynamic based on selection
  <ArrowRight className="ml-2" />
</Button>
```

---

### 1.5 Add "How It Works" Section (NEW)
**Insert after Industry Selector section**

**Purpose:** StoryBrand "The Plan" - show the 3-step process

```html
<section className="py-20 bg-white" id="how-it-works">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">
        Get Started in 3 Simple Steps
      </h2>
      <p className="text-xl text-muted-foreground">
        From signup to full productivity in less than a day
      </p>
    </div>

    <!-- 3-Step Visual -->
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <!-- Step 1 -->
      <div className="text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl font-bold text-primary">1</span>
        </div>
        <h3 className="text-xl font-bold mb-3">Get Your Assistant</h3>
        <p className="text-muted-foreground">
          Sign up in 2 minutes. Your Intelligent Assistant is instantly available with core capabilities.
        </p>
        <Badge className="mt-4">Takes 2 minutes</Badge>
      </div>

      <!-- Step 2 -->
      <div className="text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl font-bold text-primary">2</span>
        </div>
        <h3 className="text-xl font-bold mb-3">Add Tools You Need</h3>
        <p className="text-muted-foreground">
          Browse our tool marketplace. Add industry-specific capabilities with one click.
        </p>
        <Badge className="mt-4">Self-service</Badge>
      </div>

      <!-- Step 3 -->
      <div className="text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl font-bold text-primary">3</span>
        </div>
        <h3 className="text-xl font-bold mb-3">Scale as You Grow</h3>
        <p className="text-muted-foreground">
          Add more tools, team members, and capabilities as your business grows. No limits.
        </p>
        <Badge className="mt-4">Unlimited growth</Badge>
      </div>
    </div>

    <!-- CTA -->
    <div className="text-center mt-12">
      <Button size="lg" className="bg-primary">
        Start Your Free Trial
        <ArrowRight className="ml-2" />
      </Button>
      <p className="text-sm text-muted-foreground mt-4">
        No credit card required • Cancel anytime
      </p>
    </div>
  </div>
</section>
```

**Implementation:**
- Create component: `client/src/components/home/how-it-works-section.tsx`
- Add to home.tsx after industry selector

---

## 🧭 PHASE 2: NAVIGATION & SITE STRUCTURE (Week 2)

### 2.1 Navigation Updates
**File:** `client/src/components/layout/navigation.tsx` (lines 59-65)

**Current:**
```typescript
const navItems = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Resources", path: "/resources" },
  { name: "Our Company", path: "/about" },
  { name: "Contact", path: "/contact" },
];
```

**NEW:**
```typescript
const navItems = [
  { name: "Home", path: "/" },
  { name: "Platform", path: "/platform" }, // NEW
  { name: "Tools", path: "/tools" }, // Renamed from Solutions
  { name: "Resources", path: "/resources" },
  { name: "Pricing", path: "/pricing" }, // NEW
  { name: "Company", path: "/company" }, // Renamed
  { name: "Contact", path: "/contact" },
];
```

**Mobile Menu Updates:**
- Add icon for Platform (Grid icon)
- Add icon for Tools (Wrench icon)
- Add icon for Pricing (DollarSign icon)

---

### 2.2 Create Platform Overview Page (NEW)
**File:** `client/src/pages/platform.tsx` (create new)

**Purpose:** Explain the Assistant + Tools architecture (StoryBrand framework)

```typescript
import { useState } from "react";
import {
  Bot, Zap, Shield, BarChart, TrendingUp, Users,
  CheckCircle, ArrowRight, Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetaTags } from "@/components/seo/meta-tags";

const Platform = () => {
  return (
    <>
      <MetaTags
        seo={{
          title: "Platform Overview | Strive Tech",
          description: "One Intelligent Assistant. Unlimited capabilities. See how Strive's AI platform unifies your business tools.",
          keywords: "AI platform, business assistant, intelligent automation"
        }}
      />

      <div className="pt-16">
        {/* Hero Section */}
        <section className="hero-gradient py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4">The Strive Platform</Badge>
            <h1 className="text-5xl font-bold text-white mb-6">
              One Platform. <span className="text-primary">Endless Possibilities.</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Most businesses juggle dozens of disconnected tools. Strive's Intelligent Platform unifies everything your business needs into one AI-powered assistant enhanced with specialized tools.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-primary">
                Start Free Trial
                <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white">
                <Play className="mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Problem Section (StoryBrand) */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Stop Juggling <span className="text-primary">20+ Disconnected Tools</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                The average business uses 22 different software tools. That means 22 logins, 22 interfaces to learn, 22 subscriptions to manage - and none of them talk to each other.
              </p>

              {/* Pain Points Grid */}
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <Card className="border-red-200">
                  <CardContent className="p-6">
                    <div className="text-red-500 mb-3">❌</div>
                    <h3 className="font-bold mb-2">Time Wasted</h3>
                    <p className="text-sm text-muted-foreground">
                      Employees spend 2.5 hours daily switching between tools
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-red-200">
                  <CardContent className="p-6">
                    <div className="text-red-500 mb-3">❌</div>
                    <h3 className="font-bold mb-2">Data Silos</h3>
                    <p className="text-sm text-muted-foreground">
                      Critical information trapped in separate systems
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-red-200">
                  <CardContent className="p-6">
                    <div className="text-red-500 mb-3">❌</div>
                    <h3 className="font-bold mb-2">Subscription Bloat</h3>
                    <p className="text-sm text-muted-foreground">
                      Paying for features you don't use across multiple tools
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section (StoryBrand Guide) */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                One <span className="text-primary">Intelligent Platform</span> for Everything
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Strive unifies your business operations around one Intelligent Assistant that connects to specialized tools - only the ones you actually need.
              </p>
            </div>

            {/* Platform Architecture Visual */}
            <div className="max-w-5xl mx-auto">
              {/* Center: Assistant */}
              <div className="relative">
                <div className="flex justify-center mb-8">
                  <Card className="w-64 bg-gradient-to-br from-primary to-orange-500 text-white shadow-2xl">
                    <CardContent className="p-6 text-center">
                      <Bot className="w-12 h-12 mx-auto mb-3" />
                      <h3 className="text-xl font-bold">Your Intelligent Assistant</h3>
                      <p className="text-sm text-white/80 mt-2">The core of your platform</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Connecting Lines and Tool Categories */}
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { icon: <Shield />, name: "Security Tools", count: 3 },
                    { icon: <BarChart />, name: "Analytics Tools", count: 5 },
                    { icon: <Users />, name: "Team Tools", count: 4 },
                    { icon: <Zap />, name: "Automation Tools", count: 6 }
                  ].map((category, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                          {category.icon}
                        </div>
                        <h4 className="font-semibold text-sm">{category.name}</h4>
                        <Badge variant="secondary" className="mt-2">{category.count} available</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works (StoryBrand Plan) */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">
              Simple, Powerful, <span className="text-primary">Scalable</span>
            </h2>

            <div className="max-w-4xl mx-auto space-y-12">
              {/* Step 1 */}
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Start with Your Assistant</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Your Intelligent Assistant comes with core capabilities out of the box - chat interface, task management, calendar, document analysis, and data queries. Start being productive immediately.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Set up in under 2 minutes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>No technical knowledge required</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Works on web, mobile, and desktop</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Add Tools You Need</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Browse our marketplace of specialized tools. Each tool integrates seamlessly, giving your assistant new capabilities. Add computer vision for image analysis, process automation for workflow efficiency, or any of 27+ tools.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>One-click tool activation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Pay only for what you use</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Remove or change tools anytime</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Scale Without Limits</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    As your business grows, your platform grows with you. Add more team members, activate more tools, increase usage limits - all without changing platforms or migrating data.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Unlimited team members (Enterprise)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>White-label options available</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Custom tool development</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Base Capabilities */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4">Included in Every Plan</Badge>
              <h2 className="text-4xl font-bold mb-4">
                Core Capabilities Built-In
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Your assistant comes ready to work with these powerful features - no additional tools needed
              </p>
            </div>

            {/* Base Capabilities Grid - reuse from homepage */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Natural Conversation */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                    <Bot className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Natural Conversation</h3>
                  <p className="text-muted-foreground">
                    Chat naturally in plain English. No commands to memorize, no training required.
                  </p>
                </CardContent>
              </Card>

              {/* Add remaining 5 base capabilities similarly */}
              {/* ... */}
            </div>
          </div>
        </section>

        {/* Tool Ecosystem */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                27+ Specialized <span className="text-primary">Tools</span> to Choose From
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Enhance your assistant with industry-specific capabilities. Each tool is pre-built, tested, and ready to deploy.
              </p>
            </div>

            {/* Tool Categories Preview */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: "AI Security",
                  count: 3,
                  icon: <Shield />,
                  examples: ["Cybersecurity", "Fraud Prevention", "Threat Detection"]
                },
                {
                  name: "Computer Vision",
                  count: 4,
                  icon: <Eye />,
                  examples: ["Image Recognition", "Object Detection", "Quality Control"]
                },
                {
                  name: "Process Automation",
                  count: 5,
                  icon: <Zap />,
                  examples: ["Workflow Automation", "RPA", "Integration Tools"]
                },
                // ... more categories
              ].map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <Badge variant="secondary" className="mb-3">{category.count} tools</Badge>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {category.examples.map((example, i) => (
                        <li key={i}>• {example}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                Browse All Tools
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Integration & Security */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <Badge className="mb-4">Enterprise-Grade</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Secure, Compliant, <span className="text-primary">Reliable</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Your data security is our top priority. Strive meets the highest industry standards for security, privacy, and compliance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">SOC 2 Type II Certified</h4>
                      <p className="text-sm text-muted-foreground">Independently audited security controls</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">HIPAA & GDPR Compliant</h4>
                      <p className="text-sm text-muted-foreground">Healthcare and EU data protection standards</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">256-bit Encryption</h4>
                      <p className="text-sm text-muted-foreground">Bank-level security for data in transit and at rest</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">99.9% Uptime SLA</h4>
                      <p className="text-sm text-muted-foreground">Enterprise plans include guaranteed availability</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                {/* Security visual or graphic */}
                <div className="bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-2xl p-8 text-center">
                  <Shield className="w-24 h-24 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Enterprise-Grade Security</h3>
                  <p className="text-muted-foreground">
                    Trusted by businesses in healthcare, finance, and government sectors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Success Stories */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Trusted by <span className="text-primary">500+ Businesses</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                See how companies like yours use the Strive Platform
              </p>
            </div>

            {/* Customer Testimonials Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Testimonial 1 */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "The Strive platform eliminated 12 of our software subscriptions. Now everything runs through one assistant. Our team saved 15+ hours per week."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary">JD</span>
                    </div>
                    <div>
                      <div className="font-semibold">Jennifer Davis</div>
                      <div className="text-sm text-muted-foreground">COO, Manufacturing Co.</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Add 2 more testimonials */}
              {/* ... */}
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="py-20 hero-gradient">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Start with what you need. Scale as you grow. No surprises.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
              {/* Starter Tier */}
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Starter</h3>
                  <div className="text-4xl font-bold text-primary mb-4">$299<span className="text-lg text-muted-foreground">/mo</span></div>
                  <ul className="text-left space-y-2 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Base Assistant included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Up to 3 team members</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>1 free tool</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">Start Trial</Button>
                </CardContent>
              </Card>

              {/* Professional Tier */}
              <Card className="bg-primary text-white relative border-4 border-primary">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500">
                  Most Popular
                </Badge>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <div className="text-4xl font-bold mb-4">$999<span className="text-lg opacity-80">/mo</span></div>
                  <ul className="text-left space-y-2 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Everything in Starter</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Up to 10 team members</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>5 tools included</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-white text-primary hover:bg-white/90">Start Trial</Button>
                </CardContent>
              </Card>

              {/* Enterprise Tier */}
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold text-primary mb-4">Custom</div>
                  <ul className="text-left space-y-2 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Everything in Professional</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Unlimited team members</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>All tools included</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </CardContent>
              </Card>
            </div>

            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              See Full Pricing
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 500+ businesses that simplified their operations with one Intelligent Platform
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-primary">
                Start Your Free Trial
                <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Schedule a Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • 30-day free trial • Cancel anytime
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Platform;
```

**Implementation Steps:**
1. Create new file: `client/src/pages/platform.tsx`
2. Add route in app routing
3. Update navigation to include Platform link
4. Add SEO metadata
5. Create reusable components for sections

---

## 🛠️ PHASE 3: TOOLS PAGE REDESIGN (Week 2-3)

### 3.1 Solutions → Tools Page Rename
**File:** `client/src/pages/solutions.tsx`

**Major Changes:**

#### 3.1.1 URL & Routing Update
```typescript
// Update route in main app router
// OLD: <Route path="/solutions" component={Solutions} />
// NEW: <Route path="/tools" component={Tools} />

// Keep /solutions as redirect for SEO
<Route path="/solutions">
  {() => {
    window.location.href = "/tools";
    return null;
  }}
</Route>
```

#### 3.1.2 Page Header Updates
```typescript
// Lines 363-392 - Hero Section Update

// OLD
<h1 className="text-5xl font-bold mb-6 text-white">
  Unlock the Power of AI to Transform Your Business for Tomorrow
</h1>
<p className="text-xl text-muted-foreground">
  We help industry leaders...with AI tools designed just for your field.
</p>

// NEW
<h1 className="text-5xl font-bold mb-6 text-white">
  Enhance Your Assistant with <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent">Specialized Tools</span>
</h1>
<p className="text-xl text-muted-foreground">
  Give your Intelligent Assistant industry-specific capabilities. Each tool integrates seamlessly to extend what your assistant can do.
</p>

// Update CTAs
<Button onClick={() => window.location.href = '/assessment'}>
  Try Your Assistant Free
</Button>
<Button variant="outline" onClick={() => document.getElementById('tools-grid')?.scrollIntoView({ behavior: 'smooth' })}>
  Browse All Tools
</Button>
```

#### 3.1.3 Add Assistant Integration Preview Section (NEW)
**Insert before filter section**

```typescript
{/* Assistant Integration Preview - NEW SECTION */}
<section className="py-16 bg-gradient-to-br from-gray-50 to-white">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">
        How Tools Connect to Your Assistant
      </h2>

      {/* Visual Diagram */}
      <div className="relative mb-12">
        {/* Center: Assistant */}
        <div className="flex justify-center mb-8">
          <Card className="w-48 bg-gradient-to-br from-primary to-orange-500 text-white shadow-xl">
            <CardContent className="p-6 text-center">
              <Bot className="w-12 h-12 mx-auto mb-2" />
              <div className="font-bold">Your Assistant</div>
            </CardContent>
          </Card>
        </div>

        {/* Connected Tools */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Shield />, name: "Security" },
            { icon: <Eye />, name: "Vision" },
            { icon: <BarChart />, name: "Analytics" },
            { icon: <Zap />, name: "Automation" }
          ].map((tool, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                {/* Connection line visual */}
                <div className="flex flex-col items-center">
                  <ArrowDown className="w-4 h-4 text-muted-foreground mb-2" />
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2 text-primary">
                    {tool.icon}
                  </div>
                  <div className="text-xs font-semibold">{tool.name}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <p className="text-lg text-muted-foreground mb-4">
        Every tool integrates seamlessly, giving your assistant new superpowers
      </p>
      <Badge variant="secondary" className="text-sm">
        One-Click Activation • No Technical Setup Required
      </Badge>
    </div>
  </div>
</section>
```

#### 3.1.4 Update Filter Section
```typescript
// Line 403-406 - Filter instruction text update

// OLD
<p className="text-lg text-muted-foreground">
  Discover Your Perfect AI Tool: Choose your industry to see tailored strategies, or browse by solution type to find specific capabilities across all sectors.
</p>

// NEW
<p className="text-lg text-muted-foreground">
  Find the perfect tools for your assistant: Choose your industry to see recommended capabilities, or browse by tool category to explore what's possible.
</p>
```

#### 3.1.5 Update Tool Cards
```typescript
// Solution Card Component (lines 806-916)

// Add NEW elements to each tool card:

// 1. "Assistant Tool" badge (add to line 834-836 area)
<div className="absolute top-2 right-2">
  <Badge className="bg-primary/10 text-primary text-xs px-2 py-1">
    <Bot className="w-3 h-3 mr-1 inline" />
    Assistant Tool
  </Badge>
</div>

// 2. Integration visual (add before title)
<div className="flex items-center gap-2 mb-3 opacity-60">
  <Bot className="h-4 w-4 text-primary" />
  <ArrowRight className="h-3 w-3 text-muted-foreground" />
  {item.icon}
</div>

// 3. Update description pattern (line 862-864)
<p className="text-muted-foreground line-clamp-2">
  Give your assistant {getCapabilityPhrase(item)}: {item.shortDescription}
</p>

// 4. Add pricing indicator (NEW - add before CTA button)
<div className="flex items-center justify-between mb-3 text-sm">
  <span className="text-muted-foreground">Starting at</span>
  <span className="font-bold text-primary">{getPricing(item.category)}</span>
</div>

// 5. Update CTA button (line 901-908)
<Button
  className="w-full group-hover:bg-primary group-hover:text-white"
  variant="outline"
  onClick={(e) => {
    e.stopPropagation();
    setSelectedSolution(item);
  }}
>
  Add to Assistant
  <Plus className="ml-2 h-4 w-4" />
</Button>
```

#### 3.1.6 Add Helper Functions
```typescript
// Add these helper functions before the return statement

// Get capability phrase for description
const getCapabilityPhrase = (solution: Solution): string => {
  const capabilityMap: Record<string, string> = {
    "AI Security": "advanced cybersecurity capabilities",
    "Computer Vision": "intelligent image and video analysis",
    "Conversational AI": "natural language understanding and conversation",
    "Generative AI": "content creation and ideation powers",
    "Local AI Deployment": "on-premise AI processing",
    "Machine Learning & Analytics": "predictive analytics and data insights",
    "Natural Language Processing": "text analysis and understanding",
    "Non-AI Tools": "traditional business capabilities",
    "Process Automation": "workflow automation and efficiency"
  };
  return capabilityMap[solution.category] || "specialized capabilities";
};

// Get pricing for tool category
const getPricing = (category: string): string => {
  const pricingMap: Record<string, string> = {
    "AI Security": "$299/mo",
    "Computer Vision": "$299/mo",
    "Conversational AI": "$199/mo",
    "Generative AI": "$399/mo",
    "Local AI Deployment": "$499/mo",
    "Machine Learning & Analytics": "$399/mo",
    "Natural Language Processing": "$349/mo",
    "Non-AI Tools": "$149/mo",
    "Process Automation": "$399/mo"
  };
  return pricingMap[category] || "Contact us";
};
```

#### 3.1.7 Update Solution Modal
```typescript
// Solution Modal (lines 936-1037)

// Update header (line 941-943)
<DialogTitle className="flex items-center gap-4 text-2xl font-bold mb-2">
  <div className="relative">
    {selectedSolution.icon}
    <Bot className="absolute -bottom-1 -right-1 w-4 h-4 text-primary bg-white rounded-full" />
  </div>
  {selectedSolution.title}
  <Badge variant="secondary">Assistant Tool</Badge>
</DialogTitle>

// Update description (line 945-947)
<DialogDescription className="text-lg text-muted-foreground mb-6">
  <span className="font-semibold text-primary">Enhance your assistant</span> with {selectedSolution.fullDescription}
</DialogDescription>

// Add pricing section (NEW - insert before CTAs)
<div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border mb-6">
  <div className="flex items-center justify-between">
    <div>
      <div className="text-sm text-muted-foreground mb-1">Tool Pricing</div>
      <div className="text-3xl font-bold text-primary">{getPricing(selectedSolution.category)}</div>
      <div className="text-sm text-muted-foreground mt-1">Billed monthly • Cancel anytime</div>
    </div>
    <Badge variant="secondary" className="px-4 py-2">
      30-Day Free Trial
    </Badge>
  </div>
</div>

// Update CTAs (lines 995-1033)
<div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t">
  <Button
    size="lg"
    className="w-full sm:flex-1 bg-primary hover:bg-primary/90"
    onClick={() => window.location.href = '/assessment'}
  >
    Add to My Assistant
    <Plus className="ml-2 h-4 w-4" />
  </Button>
  <Button
    size="lg"
    variant="outline"
    className="w-full sm:flex-1"
    onClick={() => {
      setSelectedSolution(null);
      window.location.href = '/platform';
    }}
  >
    Learn About Platform
    <ArrowRight className="ml-2 h-4 w-4" />
  </Button>
</div>
```

#### 3.1.8 Update Industry Cards
```typescript
// Industry Card Component (lines 712-804)

// Update button CTA (line 789-799)
<Button
  className="w-full bg-[#ff7033] text-white hover:scale-105"
  variant="outline"
  onClick={(e) => {
    e.stopPropagation();
    setSelectedFilter({type: 'industry', value: item.industryValue});
  }}
>
  See {item.title.split(' ')[0]} Tools
  <Wrench className="ml-2 h-4 w-4" />
</Button>
```

---

### 3.2 Add New Filter: "By Use Case"
**File:** `client/src/pages/solutions.tsx`

**Add new filter dropdown next to existing filters**

```typescript
// Add after unified filter dropdown (around line 460)

<Popover open={useCaseDropdownOpen} onOpenChange={setUseCaseDropdownOpen}>
  <PopoverTrigger asChild>
    <Button
      variant={selectedUseCase !== "all" ? "default" : "outline"}
      className="flex items-center px-4 sm:px-6 py-3 w-full sm:min-w-[240px] sm:w-auto"
    >
      <Target className="h-4 w-4 mr-2 flex-shrink-0" />
      <span className="flex-grow text-left">
        {selectedUseCase === "all" ? "By Use Case" : useCaseOptions.find(opt => opt.value === selectedUseCase)?.label}
      </span>
      <Badge variant="secondary" className="ml-auto mr-2">
        {getUseCaseToolCount(selectedUseCase)}
      </Badge>
      <ChevronDown className="h-4 w-4 flex-shrink-0" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-[300px]">
    <Command>
      <CommandInput placeholder="Search use cases..." />
      <CommandList>
        {useCaseOptions.map((option) => (
          <CommandItem
            key={option.value}
            onSelect={() => {
              setSelectedUseCase(option.value);
              setUseCaseDropdownOpen(false);
            }}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-2 w-full">
              {option.icon}
              <span>{option.label}</span>
              <Badge variant="secondary" className="ml-auto">
                {getUseCaseToolCount(option.value)}
              </Badge>
            </div>
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>

// Add use case options array
const useCaseOptions = [
  { value: "all", label: "All Use Cases", icon: <Grid className="h-4 w-4" /> },
  { value: "customer-service", label: "Customer Service", icon: <Users className="h-4 w-4" /> },
  { value: "operations", label: "Operations & Efficiency", icon: <Cog className="h-4 w-4" /> },
  { value: "sales-marketing", label: "Sales & Marketing", icon: <TrendingUp className="h-4 w-4" /> },
  { value: "finance-analytics", label: "Finance & Analytics", icon: <DollarSign className="h-4 w-4" /> },
  { value: "security-compliance", label: "Security & Compliance", icon: <Shield className="h-4 w-4" /> },
  { value: "hr-people", label: "HR & People Ops", icon: <Users className="h-4 w-4" /> },
];

// Add use case mapping
const useCaseToolMapping: Record<string, string[]> = {
  "customer-service": ["Conversational AI", "Natural Language Processing"],
  "operations": ["Process Automation", "Non-AI Tools"],
  "sales-marketing": ["Generative AI", "Machine Learning & Analytics"],
  "finance-analytics": ["Machine Learning & Analytics"],
  "security-compliance": ["AI Security"],
  "hr-people": ["Conversational AI", "Natural Language Processing"],
};

// Add filter logic
const getUseCaseToolCount = (useCase: string): number => {
  if (useCase === "all") return solutions.length;
  const categories = useCaseToolMapping[useCase] || [];
  return solutions.filter(s => categories.includes(s.category)).length;
};
```

---

## 💰 PHASE 4: CREATE PRICING PAGE (Week 3)

### 4.1 New Pricing Page
**File:** `client/src/pages/pricing.tsx` (create new)

**Purpose:** Clear, transparent pricing with StoryBrand framework

**Full Implementation:**

```typescript
import { useState } from "react";
import {
  Check, X, ArrowRight, HelpCircle, Bot, Zap,
  Shield, Users, TrendingUp, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MetaTags } from "@/components/seo/meta-tags";

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  // Pricing tiers
  const pricingTiers = [
    {
      name: "Starter",
      price: { monthly: 299, annual: 2990 },
      description: "Perfect for small teams getting started with AI",
      features: [
        { text: "Base Intelligent Assistant", included: true },
        { text: "Up to 3 team members", included: true },
        { text: "1,000 assistant interactions/month", included: true },
        { text: "1 free tool (choice of 3 starter tools)", included: true },
        { text: "Email support", included: true },
        { text: "Knowledge base access", included: true },
        { text: "Basic integrations", included: true },
        { text: "Priority support", included: false },
        { text: "Custom integrations", included: false },
        { text: "Dedicated success manager", included: false },
      ],
      cta: "Start Free Trial",
      ctaHref: "/assessment",
      popular: false,
    },
    {
      name: "Professional",
      price: { monthly: 999, annual: 9990 },
      description: "For growing teams that need advanced capabilities",
      features: [
        { text: "Everything in Starter", included: true },
        { text: "Up to 10 team members", included: true },
        { text: "5,000 assistant interactions/month", included: true },
        { text: "5 tools included (any category)", included: true },
        { text: "Priority support (24/7)", included: true },
        { text: "Custom integrations (3 included)", included: true },
        { text: "Advanced analytics", included: true },
        { text: "API access", included: true },
        { text: "Workflow automation", included: true },
        { text: "Dedicated success manager", included: false },
      ],
      cta: "Start Free Trial",
      ctaHref: "/assessment",
      popular: true,
    },
    {
      name: "Enterprise",
      price: { monthly: null, annual: null },
      description: "Custom solutions for large organizations",
      features: [
        { text: "Everything in Professional", included: true },
        { text: "Unlimited team members", included: true },
        { text: "Unlimited assistant interactions", included: true },
        { text: "All tools included (27+)", included: true },
        { text: "Dedicated success manager", included: true },
        { text: "White-label options", included: true },
        { text: "Custom tool development", included: true },
        { text: "SLA & uptime guarantee", included: true },
        { text: "Advanced security & compliance", included: true },
        { text: "On-premise deployment option", included: true },
      ],
      cta: "Contact Sales",
      ctaHref: "/contact",
      popular: false,
    },
  ];

  // Add-on tools pricing
  const addOnTools = [
    { category: "AI Security", tools: 3, price: 299, description: "Cybersecurity, fraud prevention, threat detection" },
    { category: "Computer Vision", tools: 4, price: 299, description: "Image recognition, object detection, quality control" },
    { category: "Conversational AI", tools: 3, price: 199, description: "Chatbots, voice assistants, sentiment analysis" },
    { category: "Generative AI", tools: 4, price: 399, description: "Content creation, copywriting, design assistance" },
    { category: "Local AI Deployment", tools: 2, price: 499, description: "On-premise AI processing for sensitive data" },
    { category: "Machine Learning & Analytics", tools: 5, price: 399, description: "Predictive analytics, forecasting, insights" },
    { category: "Natural Language Processing", tools: 3, price: 349, description: "Text analysis, translation, summarization" },
    { category: "Non-AI Tools", tools: 2, price: 149, description: "Traditional business process tools" },
    { category: "Process Automation", tools: 5, price: 399, description: "Workflow automation, RPA, integrations" },
  ];

  // Industry bundles
  const industryBundles = [
    {
      name: "Healthcare Bundle",
      price: 999,
      savings: 20,
      tools: ["AI Security (HIPAA)", "NLP Document Analysis", "Process Automation"],
      description: "HIPAA-compliant tools for healthcare organizations",
    },
    {
      name: "Finance Bundle",
      price: 1299,
      savings: 25,
      tools: ["AI Security", "Fraud Prevention", "Predictive Analytics", "Compliance Monitoring"],
      description: "Financial services and banking tools",
    },
    {
      name: "Retail Bundle",
      price: 899,
      savings: 20,
      tools: ["Computer Vision", "Customer Analytics", "Inventory Management"],
      description: "Retail and e-commerce optimization tools",
    },
  ];

  // FAQ data
  const faqItems = [
    {
      question: "What's included in the 30-day free trial?",
      answer: "You get full access to the Base Intelligent Assistant and can try one tool of your choice for 30 days. No credit card required. Cancel anytime during the trial with no charges."
    },
    {
      question: "Can I change my plan later?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle. You can also add or remove tools on demand."
    },
    {
      question: "What happens if I exceed my interaction limit?",
      answer: "We'll notify you when you reach 80% of your limit. You can either upgrade your plan or purchase additional interaction packs. We never cut off access unexpectedly."
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "Yes! Annual plans save you 2 months of costs (16% discount). You can toggle between monthly and annual pricing above."
    },
    {
      question: "Can I use my own data and integrations?",
      answer: "Absolutely. All plans support custom data imports and standard integrations. Professional and Enterprise plans include custom integration development."
    },
    {
      question: "Is my data secure?",
      answer: "Yes. We're SOC 2 Type II certified, HIPAA and GDPR compliant. All data is encrypted in transit and at rest with 256-bit encryption. Enterprise plans include additional security options."
    },
    {
      question: "What if I need a custom tool that doesn't exist?",
      answer: "Enterprise customers can request custom tool development. We'll work with you to build exactly what you need, and you can choose to keep it exclusive or share it with the marketplace."
    },
  ];

  return (
    <>
      <MetaTags
        seo={{
          title: "Pricing | Strive Tech Intelligent Assistant",
          description: "Simple, transparent pricing for the Strive Intelligent Assistant platform. Start free, scale as you grow.",
          keywords: "AI assistant pricing, business automation cost, AI platform pricing"
        }}
      />

      <div className="pt-16">
        {/* Hero Section */}
        <section className="hero-gradient py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-5xl font-bold text-white mb-6">
              Choose the Perfect Plan for Your <span className="text-primary">Business</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              No hidden fees. No surprises. Start with what you need today, scale as you grow tomorrow.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm ${billingPeriod === "monthly" ? "text-white font-semibold" : "text-white/60"}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
                className="relative w-14 h-7 bg-white/20 rounded-full transition-colors"
              >
                <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${billingPeriod === "annual" ? "translate-x-7" : ""}`} />
              </button>
              <span className={`text-sm ${billingPeriod === "annual" ? "text-white font-semibold" : "text-white/60"}`}>
                Annual
              </span>
              {billingPeriod === "annual" && (
                <Badge className="bg-primary text-white">Save 16%</Badge>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <Card
                  key={index}
                  className={`relative ${tier.popular ? "border-4 border-primary shadow-2xl scale-105" : ""}`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1 inline" />
                      Most Popular
                    </Badge>
                  )}
                  <CardContent className="p-8">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>

                      {/* Price */}
                      <div className="mb-4">
                        {tier.price.monthly === null ? (
                          <div className="text-4xl font-bold">Custom</div>
                        ) : (
                          <>
                            <div className="text-5xl font-bold text-primary">
                              ${billingPeriod === "monthly" ? tier.price.monthly : Math.floor(tier.price.annual / 12)}
                              <span className="text-xl text-muted-foreground">/mo</span>
                            </div>
                            {billingPeriod === "annual" && (
                              <div className="text-sm text-muted-foreground mt-1">
                                ${tier.price.annual} billed annually
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {/* CTA */}
                      <Button
                        className={`w-full ${tier.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                        variant={tier.popular ? "default" : "outline"}
                        size="lg"
                        onClick={() => window.location.href = tier.ctaHref}
                      >
                        {tier.cta}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>

                    {/* Features List */}
                    <div className="border-t pt-6">
                      <div className="space-y-3">
                        {tier.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-3">
                            {feature.included ? (
                              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground/30 flex-shrink-0 mt-0.5" />
                            )}
                            <span className={`text-sm ${feature.included ? "" : "text-muted-foreground/50"}`}>
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Add-On Tools Pricing */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Add-On <span className="text-primary">Tools</span> Pricing
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Enhance your assistant with specialized capabilities. Add or remove tools anytime - you only pay for what you use.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {addOnTools.map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{tool.category}</h3>
                        <Badge variant="secondary" className="text-xs">{tool.tools} tools</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${tool.price}</div>
                        <div className="text-xs text-muted-foreground">/month</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                    <Button variant="outline" className="w-full" size="sm">
                      View Tools
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" onClick={() => window.location.href = "/tools"}>
                Browse All Tools
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Industry Bundles */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4">Industry-Specific Packages</Badge>
              <h2 className="text-4xl font-bold mb-4">
                Pre-Configured <span className="text-primary">Industry Bundles</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get the exact tools your industry needs, packaged together at a discount
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {industryBundles.map((bundle, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-2 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-bold text-xl">{bundle.name}</h3>
                      <Badge className="bg-primary text-white">Save {bundle.savings}%</Badge>
                    </div>

                    <div className="mb-4">
                      <div className="text-3xl font-bold text-primary mb-1">${bundle.price}<span className="text-lg text-muted-foreground">/mo</span></div>
                      <p className="text-sm text-muted-foreground">{bundle.description}</p>
                    </div>

                    <div className="border-t pt-4 mb-4">
                      <div className="text-sm font-semibold mb-2">Includes:</div>
                      <ul className="space-y-2">
                        {bundle.tools.map((tool, toolIndex) => (
                          <li key={toolIndex} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{tool}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full bg-primary">
                      Get This Bundle
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Compare <span className="text-primary">All Features</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                See exactly what's included in each plan
              </p>
            </div>

            {/* Desktop Comparison Table */}
            <div className="hidden md:block overflow-x-auto max-w-6xl mx-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left py-4 px-6">Feature</th>
                    {pricingTiers.map((tier, index) => (
                      <th key={index} className="text-center py-4 px-6">
                        <div className="font-bold text-lg">{tier.name}</div>
                        {tier.price.monthly && (
                          <div className="text-sm text-muted-foreground mt-1">
                            ${tier.price.monthly}/mo
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Add comparison rows */}
                  {[
                    { feature: "Base Assistant", starter: "✓", pro: "✓", enterprise: "✓" },
                    { feature: "Team Members", starter: "3", pro: "10", enterprise: "Unlimited" },
                    { feature: "Monthly Interactions", starter: "1,000", pro: "5,000", enterprise: "Unlimited" },
                    { feature: "Included Tools", starter: "1", pro: "5", enterprise: "All (27+)" },
                    { feature: "Support", starter: "Email", pro: "24/7 Priority", enterprise: "Dedicated Manager" },
                    { feature: "Custom Integrations", starter: "—", pro: "3", enterprise: "Unlimited" },
                    { feature: "API Access", starter: "—", pro: "✓", enterprise: "✓" },
                    { feature: "White-Label", starter: "—", pro: "—", enterprise: "✓" },
                    { feature: "SLA", starter: "—", pro: "—", enterprise: "99.9% Uptime" },
                  ].map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium">{row.feature}</td>
                      <td className="py-4 px-6 text-center">{row.starter}</td>
                      <td className="py-4 px-6 text-center">{row.pro}</td>
                      <td className="py-4 px-6 text-center">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: Use tabs instead of table */}
            <div className="md:hidden">
              <Tabs defaultValue="starter">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="starter">Starter</TabsTrigger>
                  <TabsTrigger value="professional">Pro</TabsTrigger>
                  <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
                </TabsList>
                {pricingTiers.map((tier) => (
                  <TabsContent key={tier.name.toLowerCase()} value={tier.name.toLowerCase()}>
                    <Card>
                      <CardContent className="p-4">
                        {tier.features.map((feature, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                            <span className="text-sm">{feature.text}</span>
                            {feature.included ? (
                              <Check className="w-4 h-4 text-primary" />
                            ) : (
                              <X className="w-4 h-4 text-muted-foreground/30" />
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about pricing and plans
              </p>
            </div>

            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <span className="font-semibold">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <Button variant="outline" onClick={() => window.location.href = "/contact"}>
                <HelpCircle className="mr-2 w-4 h-4" />
                Contact Sales
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 hero-gradient">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join 500+ businesses transforming their operations with AI. Start your free trial today - no credit card required.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Your Free Trial
                <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Schedule a Demo
              </Button>
            </div>
            <p className="text-sm text-white/60 mt-6">
              30-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Pricing;
```

**Implementation Steps:**
1. Create `client/src/pages/pricing.tsx`
2. Add route to app router
3. Update navigation to include Pricing link
4. Test responsive design
5. Add analytics tracking

---

## 🎨 PHASE 5: STORYBRAND MESSAGE UPDATES (Week 3-4)

### 5.1 StoryBrand Framework Across All Pages

**Core StoryBrand Elements:**

#### The Hero (Customer):
- **Who:** Business leaders, operations managers, entrepreneurs
- **Want:** Simplify operations, save time, grow without growing headcount
- **External Problem:** Too many disconnected tools, manual processes
- **Internal Problem:** Overwhelmed, frustrated, falling behind competitors
- **Philosophical:** Running a business shouldn't be this complicated

#### The Guide (Strive):
- **Empathy:** "We know how overwhelming managing modern business tools can be"
- **Authority:** "Trusted by 500+ businesses across 21 industries"
- **Credibility:** "SOC 2 certified, HIPAA compliant, 99.9% uptime"

#### The Plan:
1. Get your Intelligent Assistant (2 minutes)
2. Add tools you need (self-service)
3. Scale without limits

#### Calls to Action:
- **Direct:** "Try Your Assistant Free" / "Start Free Trial"
- **Transitional:** "See How It Works" / "Download Buyer's Guide" / "Watch Demo"

#### Success:
- "Work like a Fortune 500 company. Scale like a startup."
- "Reclaim 20+ hours per week"
- "Replace 20+ tools with one platform"
- "Grow without adding headcount"

#### Avoid Failure:
- "Don't let competitors outpace you with AI"
- "Stop wasting money on unused tool subscriptions"
- "Don't miss out on AI's competitive advantage"

---

### 5.2 Page-by-Page StoryBrand Updates

#### Homepage (`home.tsx`)
```
Hero: "Meet Your 24/7 Intelligent Business Partner"
Problem: "Drowning in tools, tasks, and missed opportunities?"
Guide: "Your AI Assistant handles the busywork so you can focus on growth"
Plan: "Get assistant → Add tools → Scale effortlessly"
Success: "Work like Fortune 500. Scale like a startup."
Direct CTA: "Try Your Assistant Free"
Transitional CTA: "See How It Works"
```

#### Tools Page (`solutions.tsx` → `tools.tsx`)
```
Hero: "Supercharge Your Assistant with Specialized Tools"
Problem: "Every business has unique challenges standard software can't solve"
Guide: "27+ pre-built tools integrate seamlessly with your assistant"
Plan: "Browse by industry → Find your tools → Add with one click"
Success: "Trusted by businesses in 21 industries"
Direct CTA: "Add to Assistant"
Transitional CTA: "Learn More"
```

#### Platform Page (`platform.tsx`)
```
Hero: "The Only Business Platform You'll Ever Need"
Problem: "Stop paying for 20+ disconnected subscriptions"
Guide: "One assistant. One platform. Unlimited potential."
Plan: Visual 3-step process
Success: "Replace 20 tools with one intelligent platform"
Direct CTA: "Start Free Trial"
Transitional CTA: "Watch Platform Demo"
```

#### Pricing Page (`pricing.tsx`)
```
Hero: "Simple, Transparent Pricing"
Problem: "No hidden fees. No surprises. No games."
Plan: Clear 3-tier pricing
Success: "Start small. Scale as you grow."
Direct CTA: "Start Free Trial" / "Contact Sales"
Transitional CTA: "Compare Plans" / "Download Pricing Guide"
```

#### Contact Page (`contact.tsx`)
```
Hero: "Let's Talk About Your Challenges"
Problem: "Not sure where to start with AI?"
Guide: "Our team helps you find the right solution"
Plan: "Share your challenge → Get expert advice → See a custom demo"
Success: "500+ businesses started here"
Direct CTA: "Schedule a Call"
Transitional CTA: "Send Message"
```

---

### 5.3 Update All CTAs Site-Wide

**CTA Mapping:**

| Current CTA | NEW CTA | Where It Goes |
|-------------|---------|---------------|
| "Get Started" | "Try Your Assistant Free" | /assessment (trial signup) |
| "Request Demo" | "See Your Assistant in Action" | /platform or chatbot demo |
| "Get Custom Solution" | "Talk to an Expert" | /contact |
| "Contact Sales" | "Schedule Platform Demo" | /contact with demo intent |
| "View Details" | "Add This Tool" | Tool detail modal |
| "Explore Solutions" | "Browse All Tools" | /tools |
| "Book Assessment" | "Start Your Free Trial" | /assessment |
| "Learn More" | "See Platform" | /platform |
| "Watch Demo" | "See It In Action" | Demo video or chatbot |

**Implementation:**
- Global search and replace for CTAs
- Update button props across components
- Add tracking for CTA clicks
- A/B test different variations

---

## 🎯 PHASE 6: ASSISTANT TRIAL EXPERIENCE (Week 4)

### 6.1 Update Assessment Page to Trial Signup
**File:** `client/src/pages/assessment.tsx`

**Purpose:** Convert from "book consultation" to "start free trial"

**Major Changes:**

#### 6.1.1 Page Title & Messaging
```typescript
// Lines 613-618 - Update title

// OLD
<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
  Unlock Your Business's <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent">AI Advantage</span>
</h1>
<p className="text-lg md:text-xl text-muted-foreground">
  Discover actionable AI strategies tailored to your company's biggest challenges. Book your complimentary 30-minute assessment today.
</p>

// NEW
<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
  Start Your <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent">30-Day Free Trial</span>
</h1>
<p className="text-lg md:text-xl text-muted-foreground">
  Get instant access to your Intelligent Assistant. Choose your first tool. No credit card required. Cancel anytime.
</p>
```

#### 6.1.2 Progress Steps Update
```typescript
// Lines 638-640 - Update step labels

// OLD
<div className="text-center text-xs md:text-sm text-muted-foreground">
  Step {step} of 2: {step === 1 ? "Contact Information" : "Schedule Meeting"}
</div>

// NEW
<div className="text-center text-xs md:text-sm text-muted-foreground">
  Step {step} of 3: {step === 1 ? "Your Information" : step === 2 ? "Choose Starting Tools" : "Complete Setup"}
</div>
```

#### 6.1.3 Add NEW Step 2: Choose Starting Tools
**Insert after contact form submission, before Calendly**

```typescript
// Add new state
const [step, setStep] = useState(1);
const [selectedTools, setSelectedTools] = useState<string[]>([]);

// Add tool selection options (show 6 popular tools)
const starterTools = [
  {
    id: "process-automation",
    name: "Process Automation Tool",
    description: "Automate repetitive tasks",
    icon: <Zap className="w-6 h-6" />,
    popular: true
  },
  {
    id: "analytics",
    name: "Business Analytics Tool",
    description: "Data insights and reporting",
    icon: <BarChart className="w-6 h-6" />,
    popular: true
  },
  {
    id: "security",
    name: "Security Monitoring Tool",
    description: "Protect your business",
    icon: <Shield className="w-6 h-6" />,
    popular: false
  },
  {
    id: "customer-service",
    name: "Customer Service Tool",
    description: "AI-powered support",
    icon: <Users className="w-6 h-6" />,
    popular: true
  },
  {
    id: "document-analysis",
    name: "Document Analysis Tool",
    description: "Extract insights from files",
    icon: <FileText className="w-6 h-6" />,
    popular: false
  },
  {
    id: "computer-vision",
    name: "Computer Vision Tool",
    description: "Image and video analysis",
    icon: <Eye className="w-6 h-6" />,
    popular: false
  },
];

// Add Step 2 rendering
if (step === 2) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Bot className="w-16 h-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#ff7033' }}>
          Choose Your Starting Tools
        </h2>
        <p className="text-muted-foreground">
          Select 1-3 tools to activate with your assistant. You can add more anytime.
        </p>
        <Badge variant="secondary" className="mt-3">
          First tool is FREE for 30 days
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {starterTools.map((tool) => (
          <Card
            key={tool.id}
            className={`cursor-pointer transition-all ${
              selectedTools.includes(tool.id)
                ? 'border-primary border-2 bg-primary/5'
                : 'hover:border-primary/50'
            }`}
            onClick={() => {
              if (selectedTools.includes(tool.id)) {
                setSelectedTools(selectedTools.filter(id => id !== tool.id));
              } else if (selectedTools.length < 3) {
                setSelectedTools([...selectedTools, tool.id]);
              }
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedTools.includes(tool.id) ? 'bg-primary text-white' : 'bg-gray-100 text-primary'
                }`}>
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{tool.name}</h3>
                    {tool.popular && (
                      <Badge variant="secondary" className="text-xs">Popular</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
                {selectedTools.includes(tool.id) && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <p className="text-sm text-blue-800">
          <strong>Selected:</strong> {selectedTools.length} tool{selectedTools.length !== 1 ? 's' : ''}
          {selectedTools.length === 0 && " (Select at least 1 to continue)"}
        </p>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={() => setStep(1)}>
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
        <Button
          onClick={() => {
            if (selectedTools.length > 0) {
              setStep(3);
              // Save selected tools to state
              // Proceed to calendly/confirmation
            }
          }}
          disabled={selectedTools.length === 0}
          className="bg-primary"
        >
          Continue to Setup
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
```

#### 6.1.4 Update Step 3 (Calendly) Messaging
```typescript
// Update Calendly section messaging

// OLD
<CardTitle className="text-center">
  <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary" />
  Schedule Your Assessment
</CardTitle>
<p className="text-center text-muted-foreground text-xs md:text-sm">
  Choose a convenient time for your 30-minute assessment
</p>

// NEW
<CardTitle className="text-center">
  <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary" />
  Schedule Your Onboarding Call
</CardTitle>
<p className="text-center text-muted-foreground text-xs md:text-sm">
  Book a 15-minute call to activate your assistant and tools (optional but recommended)
</p>
```

#### 6.1.5 Add Confirmation Thank You Section
**After Calendly booking completion**

```typescript
// Add new state for completion
const [trialStarted, setTrialStarted] = useState(false);

// If trial is started, show thank you
if (trialStarted) {
  return (
    <div className="min-h-screen hero-gradient pt-16">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-white">
              Welcome to Strive! 🎉
            </h1>
            <p className="text-xl text-white/80">
              Your Intelligent Assistant is being prepared right now
            </p>
          </div>

          <Card className="bg-white mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">What Happens Next?</h2>

              <div className="space-y-6 text-left">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Check Your Email</h3>
                    <p className="text-sm text-muted-foreground">
                      We've sent login credentials and setup instructions to <strong>{contactData.email}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Access Your Dashboard</h3>
                    <p className="text-sm text-muted-foreground">
                      Click the link in your email to access your assistant and activate your tools
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Join Your Onboarding Call</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll walk you through everything in your scheduled 15-minute call. You'll receive 3 reminders: 24h, 2h, and 15min before.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Your Selected Tools:</strong>
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTools.map((toolId) => {
                    const tool = starterTools.find(t => t.id === toolId);
                    return (
                      <Badge key={toolId} variant="secondary">
                        {tool?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 text-white">
            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">30-Day Trial</h3>
              <p className="text-sm text-white/80">Full platform access</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">No Credit Card</h3>
              <p className="text-sm text-white/80">Required to start</p>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Expert Support</h3>
              <p className="text-sm text-white/80">We're here to help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### 6.2 Update Request Page
**File:** `client/src/pages/request.tsx`

**Reposition as Custom Development / Enterprise Services**

#### 6.2.1 Update Page Title
```typescript
// Update hero title

// OLD
<h1 className="text-3xl md:text-5xl font-bold mb-4">
  Request a Custom Demo
</h1>
<p className="text-xl text-muted-foreground">
  See exactly how Strive can transform your business
</p>

// NEW
<h1 className="text-3xl md:text-5xl font-bold mb-4">
  Request <span className="text-primary">Custom Tool Development</span>
</h1>
<p className="text-xl text-muted-foreground">
  Need a specialized capability that doesn't exist yet? Our team can build it for you.
</p>
```

#### 6.2.2 Add Pricing Expectation
```typescript
// Add before form
<Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200 mb-8">
  <CardContent className="p-6">
    <div className="flex items-start gap-4">
      <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
      <div>
        <h3 className="font-bold mb-2">Custom Tool Development</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Our team will build a proprietary tool tailored to your exact specifications. Development typically takes 6-12 weeks.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="font-semibold">Starting at:</span> $50,000
          </div>
          <div>
            <span className="font-semibold">Timeline:</span> 6-12 weeks
          </div>
        </div>
      </div>
    </div>
  </CardContent>
</Card>
```

#### 6.2.3 Add "Or Try Standard Tools" CTA
```typescript
// Add before custom development form
<div className="text-center mb-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border">
  <h3 className="text-xl font-bold mb-2">Not sure if you need custom development?</h3>
  <p className="text-muted-foreground mb-4">
    We have 27+ pre-built tools that might already solve your needs
  </p>
  <Button variant="outline" onClick={() => window.location.href = '/tools'}>
    <Search className="mr-2 w-4 h-4" />
    Browse Existing Tools
  </Button>
</div>
```

---

## 🎯 PHASE 7: CONTENT & COPY UPDATES (Week 4-5)

### 7.1 Update Hero Section Component
**File:** `client/src/components/ui/hero-section.tsx`

**Purpose:** Move chatbot preview from `/chatbot-sai` page to homepage hero, make it the centerpiece

#### 7.1.1 Add Interactive Assistant Demo

**Current State:**
- Hero section is text + CTA only
- Chatbot exists on separate page at `/chatbot-sai`
- No immediate demonstration of the assistant

**New Implementation:**

```typescript
// Add to hero-section.tsx

import { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';

interface AssistantDemoProps {
  className?: string;
}

export function AssistantDemo({ className }: AssistantDemoProps) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your Intelligent Business Assistant. I can help with analytics, automation, customer service, and more. Try asking me something!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    "Analyze last quarter's sales data",
    "Automate my invoice processing",
    "Help me monitor website security",
    "Extract insights from customer feedback"
  ];

  const handleSamplePrompt = (prompt: string) => {
    setInput(prompt);
    // Trigger send
    handleSend(prompt);
  };

  const handleSend = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);

    // Simulate assistant response after delay
    setTimeout(() => {
      let response = '';

      if (text.toLowerCase().includes('sales') || text.toLowerCase().includes('analytics')) {
        response = "I can analyze your sales data using my Predictive Analytics Tool. I'll identify trends, forecast future performance, and highlight opportunities. Want to add this tool to get started?";
      } else if (text.toLowerCase().includes('automat') || text.toLowerCase().includes('invoice')) {
        response = "Perfect! My Process Automation Tool can handle invoice processing automatically. I'll extract data, validate information, and integrate with your accounting system. This tool saves teams 15+ hours per week.";
      } else if (text.toLowerCase().includes('security') || text.toLowerCase().includes('monitor')) {
        response = "I can enhance my capabilities with the Security Monitoring Tool to protect your business 24/7. I'll detect threats, respond to incidents, and provide real-time alerts. Security is critical!";
      } else if (text.toLowerCase().includes('customer') || text.toLowerCase().includes('feedback')) {
        response = "My NLP Document Analysis Tool can extract insights from customer feedback, reviews, and support tickets. I'll identify patterns, sentiment trends, and actionable recommendations.";
      } else {
        response = "Great question! I have 27+ specialized tools I can use to help with that. Browse our tools to see what capabilities you can add to customize me for your exact needs.";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-orange-500 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Your Assistant</h3>
            <p className="text-sm text-white/80">Try it now - no signup required</p>
          </div>
          <Sparkles className="w-5 h-5 ml-auto animate-pulse" />
        </div>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sample Prompts */}
      <div className="p-3 bg-white border-t border-gray-200">
        <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSamplePrompt(prompt)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your assistant anything..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

#### 7.1.2 Update Hero Layout with Assistant Demo

**Update hero-section.tsx layout:**

```typescript
// Desktop: Side-by-side
<div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
  {/* LEFT: Messaging */}
  <div className="text-center md:text-left">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
      Meet Your <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent">
        Intelligent Business Assistant
      </span>
    </h1>
    <p className="text-xl text-muted-foreground mb-8">
      The only AI team member that works 24/7, never takes vacation, and gets smarter every day.
      Add specialized tools for your exact needs.
    </p>

    {/* CTAs */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
      <Button size="lg" className="bg-primary">
        Try Your Assistant Free
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
      <Button size="lg" variant="outline">
        See How It Works
        <Play className="ml-2 w-5 h-5" />
      </Button>
    </div>

    {/* Trust Badges */}
    <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Check className="w-4 h-4 text-green-600" />
        <span>No credit card required</span>
      </div>
      <div className="flex items-center gap-2">
        <Check className="w-4 h-4 text-green-600" />
        <span>30-day free trial</span>
      </div>
      <div className="flex items-center gap-2">
        <Check className="w-4 h-4 text-green-600" />
        <span>Cancel anytime</span>
      </div>
    </div>
  </div>

  {/* RIGHT: Interactive Assistant Demo */}
  <div className="order-first md:order-last">
    <AssistantDemo className="mx-auto" />
    <p className="text-center text-sm text-muted-foreground mt-4">
      ↑ This is YOUR assistant. Try it now!
    </p>
  </div>
</div>

// Mobile: Assistant first, then text
<div className="md:hidden">
  <AssistantDemo className="mb-8" />
  {/* Then hero text and CTAs */}
</div>
```

---

### 7.2 Update Homepage Sections
**File:** `client/src/pages/home.tsx`

**Purpose:** Reorder sections to follow assistant-first narrative

#### Current Section Order:
1. Hero
2. Solutions Grid
3. Industry Selector
4. ROI Calculator
5. Transparency Section
6. Resources CTA

#### NEW Section Order (11 sections):

```typescript
// home.tsx structure

export default function HomePage() {
  return (
    <>
      {/* 1. HERO with Interactive Assistant Demo */}
      <HeroSection />

      {/* 2. BASE CAPABILITIES: "Your Assistant Includes" */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Assistant Includes (Out of the Box)
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every assistant comes with these powerful base capabilities. No tools required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {baseCapabilities.map((capability) => (
              <Card key={capability.id}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    {capability.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{capability.title}</h3>
                  <p className="text-sm text-muted-foreground">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Included in all plans • No additional cost
            </Badge>
          </div>
        </div>
      </section>

      {/* 3. TOOLS: "Supercharge with Specialized Tools" */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Supercharge with <span className="text-primary">Specialized Tools</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Add tools to give your assistant advanced capabilities tailored to your business needs
            </p>
          </div>

          {/* Featured Tools Grid - Show 6 popular tools */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">{tool.category}</Badge>
                  <h3 className="font-bold text-lg mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tool.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">{tool.pricing}</span>
                    <Button size="sm" variant="outline">
                      Add Tool
                      <Plus className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" onClick={() => navigate('/tools')}>
              Browse All 27 Tools
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 4. INDUSTRY SELECTOR: "Solutions for Your Industry" */}
      <IndustrySelector />

      {/* 5. ROI CALCULATOR: Keep existing */}
      <ROICalculator />

      {/* 6. HOW IT WORKS: 3-Step Visual Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes. Scale as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Get Your Assistant</h3>
              <p className="text-muted-foreground">
                Sign up in 60 seconds. Your intelligent assistant is ready to work immediately with all base capabilities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Add Your Tools</h3>
              <p className="text-muted-foreground">
                Browse 27+ specialized tools. Add what you need with one click. Start with 1-3 tools, expand anytime.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Scale Effortlessly</h3>
              <p className="text-muted-foreground">
                Your assistant learns and improves. Add more tools as your needs grow. Work like a Fortune 500 company.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 7. PLATFORM PREVIEW: Update transparency section */}
      <TransparencySection updatedTitle="See Inside the Platform" updatedDescription="Complete transparency into how your assistant works with your tools" />

      {/* 8. CUSTOMER SUCCESS STORIES: New section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real Results from Real Businesses
            </h2>
            <p className="text-xl text-muted-foreground">
              See how companies use their assistant + tools to transform operations
            </p>
          </div>

          {/* Success Story Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story) => (
              <Card key={story.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                      <img src={story.companyLogo} alt={story.company} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold">{story.company}</p>
                      <p className="text-sm text-muted-foreground">{story.industry}</p>
                    </div>
                  </div>
                  <blockquote className="text-sm mb-4 italic">
                    "{story.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <p className="font-bold text-primary">{story.metric}</p>
                      <p className="text-muted-foreground">{story.metricLabel}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      <strong>Tools used:</strong> {story.toolsUsed.join(', ')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => navigate('/resources?filter=case-studies')}>
              View All Case Studies
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 9. LEAD THE AI REVOLUTION: Keep existing resources section */}
      <ResourcesSection />

      {/* 10. FAQ: New section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about your assistant + tools
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="what-is">
              <AccordionTrigger>What exactly is the Intelligent Assistant?</AccordionTrigger>
              <AccordionContent>
                Your assistant is an AI-powered team member that works 24/7 to help with business tasks. Out of the box, it can handle conversations, data queries, task management, and basic analytics. You enhance it by adding specialized tools for advanced capabilities like computer vision, security monitoring, or process automation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-tools-work">
              <AccordionTrigger>How do tools work with my assistant?</AccordionTrigger>
              <AccordionContent>
                Tools extend your assistant's capabilities. Think of your assistant as the brain, and tools as specialized skills. When you add the Computer Vision Tool, your assistant can now analyze images and video. Add the Security Tool, and it can monitor threats. You choose which tools to add based on your needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-many-tools">
              <AccordionTrigger>How many tools should I start with?</AccordionTrigger>
              <AccordionContent>
                Most businesses start with 1-3 tools that solve their biggest pain points. You can always add more later as your needs grow. During your free trial, experiment with different tools to find what works best for your business.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pricing">
              <AccordionTrigger>How does pricing work?</AccordionTrigger>
              <AccordionContent>
                You pay a base subscription for your assistant ($199-$499/mo depending on plan), then add tools à la carte ($50-$400/mo each) or choose an industry bundle. All plans include base capabilities. Enterprise pricing available for custom needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="custom-tools">
              <AccordionTrigger>What if I need a custom tool that doesn't exist?</AccordionTrigger>
              <AccordionContent>
                We offer custom tool development services starting at $50,000. Our team will build a proprietary tool for your specific needs. You can choose exclusive licensing (you own it) or shared licensing (we can resell it to others at a lower price to you).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="integration">
              <AccordionTrigger>Does it integrate with my existing systems?</AccordionTrigger>
              <AccordionContent>
                Yes! Your assistant has standard integrations with popular business software (CRM, accounting, project management, etc.). For custom integrations, our Professional Services team can help (starting at $15,000).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security">
              <AccordionTrigger>Is my data secure?</AccordionTrigger>
              <AccordionContent>
                Absolutely. We use enterprise-grade encryption, SOC 2 compliance, and never train on your data. Your assistant and tools run in isolated, secure environments. Additional security features available with the Security Monitoring Tool.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support">
              <AccordionTrigger>What kind of support do you offer?</AccordionTrigger>
              <AccordionContent>
                All plans include email support, documentation, and video tutorials. Pro plans include priority support and onboarding assistance. Enterprise plans include dedicated success managers and custom SLAs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 11. FINAL CTA: Big conversion push */}
      <section className="py-20 bg-gradient-to-br from-primary via-orange-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Meet Your New Team Member?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join 500+ businesses using intelligent assistants to work smarter, scale faster, and compete with anyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Try Your Assistant Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Talk to an Expert
              <Phone className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Setup in 60 seconds</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

#### Data Structures Needed:

```typescript
// Add to home.tsx

const baseCapabilities = [
  {
    id: 'conversation',
    title: 'Natural Conversation',
    description: 'Chat naturally with your assistant. Ask questions, get insights, delegate tasks.',
    icon: <MessageCircle className="w-6 h-6 text-primary" />
  },
  {
    id: 'knowledge',
    title: 'Business Knowledge Base',
    description: 'Your assistant learns your business, processes, and industry context.',
    icon: <Brain className="w-6 h-6 text-primary" />
  },
  {
    id: 'tasks',
    title: 'Task Management',
    description: 'Delegate tasks, set reminders, track progress automatically.',
    icon: <CheckSquare className="w-6 h-6 text-primary" />
  },
  {
    id: 'scheduling',
    title: 'Smart Scheduling',
    description: 'Schedule meetings, manage calendar, coordinate across teams.',
    icon: <Calendar className="w-6 h-6 text-primary" />
  },
  {
    id: 'data-queries',
    title: 'Data Queries',
    description: 'Ask questions about your business data and get instant answers.',
    icon: <Database className="w-6 h-6 text-primary" />
  },
  {
    id: 'reporting',
    title: 'Basic Reporting',
    description: 'Generate reports, summaries, and dashboards on demand.',
    icon: <BarChart className="w-6 h-6 text-primary" />
  }
];

const featuredTools = [
  {
    id: 'process-automation',
    name: 'Process Automation Tool',
    category: 'Automation',
    shortDescription: 'Give your assistant the power to automate repetitive tasks, workflows, and business processes.',
    pricing: '$399/mo',
    popular: true
  },
  {
    id: 'predictive-analytics',
    name: 'Predictive Analytics Tool',
    category: 'Analytics',
    shortDescription: 'Enable your assistant to forecast trends, predict outcomes, and provide data-driven recommendations.',
    pricing: '$499/mo',
    popular: true
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision Tool',
    category: 'AI Vision',
    shortDescription: 'Let your assistant analyze images, video, and visual data for quality control and insights.',
    pricing: '$299/mo',
    popular: false
  },
  {
    id: 'security-monitoring',
    name: 'Security Monitoring Tool',
    category: 'Security',
    shortDescription: 'Equip your assistant with cybersecurity capabilities: threat detection, incident response, and protection.',
    pricing: '$299/mo',
    popular: true
  },
  {
    id: 'nlp-analysis',
    name: 'NLP Document Analysis Tool',
    category: 'NLP',
    shortDescription: 'Give your assistant advanced text analysis: extract insights from documents, emails, and feedback.',
    pricing: '$399/mo',
    popular: true
  },
  {
    id: 'customer-service',
    name: 'Customer Service Tool',
    category: 'Conversational AI',
    shortDescription: 'Transform your assistant into an AI customer service agent: handle inquiries, resolve issues automatically.',
    pricing: '$349/mo',
    popular: true
  }
];

const successStories = [
  {
    id: 'story1',
    company: 'TechFlow Solutions',
    industry: 'Software Development',
    quote: 'Our assistant with the Process Automation tool saved our team 20 hours per week on repetitive tasks. ROI in the first month.',
    metric: '20hrs/week',
    metricLabel: 'Time Saved',
    toolsUsed: ['Process Automation', 'Task Management'],
    companyLogo: '/assets/client-logos/techflow.png'
  },
  {
    id: 'story2',
    company: 'Horizon Retail',
    industry: 'E-commerce',
    quote: 'Adding Computer Vision and Analytics tools to our assistant transformed our inventory management. Errors down 85%.',
    metric: '85%',
    metricLabel: 'Error Reduction',
    toolsUsed: ['Computer Vision', 'Predictive Analytics'],
    companyLogo: '/assets/client-logos/horizon.png'
  },
  {
    id: 'story3',
    company: 'SecureBank Corp',
    industry: 'Financial Services',
    quote: 'The Security Monitoring tool gave our assistant real-time threat detection. We prevented 12 potential breaches this quarter.',
    metric: '12 threats',
    metricLabel: 'Blocked',
    toolsUsed: ['Security Monitoring', 'Compliance Tracking'],
    companyLogo: '/assets/client-logos/securebank.png'
  }
];
```

---

### 7.3 Update All 27 Tool Descriptions
**File:** `client/src/data/solutions.tsx`

**Purpose:** Reframe every tool description to emphasize how it enhances the assistant

#### Current Pattern:
```
"Deploy intelligent security systems that learn from attack patterns and respond to threats in real-time."
```

#### NEW Pattern Formula:
```
"Give your assistant [capability]: [what it does], [benefit]."
```

#### Implementation:

Update the `shortDescription` field for all 27 solutions using this pattern:

```typescript
// client/src/data/solutions.tsx

export const solutions = [
  {
    id: 'ai-cybersecurity',
    title: 'AI-Powered Cybersecurity',
    category: 'AI Security',
    // OLD
    // shortDescription: 'Deploy intelligent security systems that learn from attack patterns and respond to threats in real-time.',

    // NEW
    shortDescription: 'Give your assistant advanced cybersecurity capabilities: detect threats, respond to incidents, and protect your business 24/7 automatically.',
    // ... rest stays the same
  },

  {
    id: 'threat-detection',
    title: 'Threat Detection & Response',
    category: 'AI Security',
    // NEW
    shortDescription: 'Equip your assistant with real-time threat intelligence: identify attacks, analyze patterns, and neutralize risks before they cause damage.',
  },

  {
    id: 'computer-vision-quality',
    title: 'Computer Vision for Quality Control',
    category: 'Computer Vision',
    // NEW
    shortDescription: 'Let your assistant inspect products visually: detect defects, ensure quality standards, and eliminate human error in manufacturing.',
  },

  {
    id: 'object-detection',
    title: 'Object Detection & Classification',
    category: 'Computer Vision',
    // NEW
    shortDescription: 'Enable your assistant to identify and classify objects in images and video: track inventory, monitor assets, analyze visual data automatically.',
  },

  {
    id: 'facial-recognition',
    title: 'Facial Recognition Systems',
    category: 'Computer Vision',
    // NEW
    shortDescription: 'Add facial recognition to your assistant: verify identities, control access, enhance security with biometric authentication.',
  },

  {
    id: 'ocr-processing',
    title: 'OCR & Document Processing',
    category: 'Computer Vision',
    // NEW
    shortDescription: 'Give your assistant the ability to extract text from images and PDFs: digitize documents, process forms, automate data entry instantly.',
  },

  {
    id: 'ai-chatbot',
    title: 'Intelligent Chatbot',
    category: 'Conversational AI',
    // NEW
    shortDescription: 'Transform your assistant into a customer-facing chatbot: answer questions, resolve issues, provide 24/7 support across all channels.',
  },

  {
    id: 'voice-assistant',
    title: 'Voice-Enabled Assistant',
    category: 'Conversational AI',
    // NEW
    shortDescription: 'Let your assistant understand and respond to voice commands: enable hands-free operation, accessibility, and natural interaction.',
  },

  {
    id: 'sentiment-analysis',
    title: 'Sentiment Analysis',
    category: 'Conversational AI',
    // NEW
    shortDescription: 'Equip your assistant to understand emotions: analyze customer feedback, gauge satisfaction, identify issues before they escalate.',
  },

  {
    id: 'content-generation',
    title: 'AI Content Generation',
    category: 'Generative AI',
    // NEW
    shortDescription: 'Give your assistant creative writing capabilities: generate marketing copy, product descriptions, emails, and reports automatically.',
  },

  {
    id: 'code-generation',
    title: 'AI Code Generation',
    category: 'Generative AI',
    // NEW
    shortDescription: 'Enable your assistant to write code: automate development tasks, generate boilerplate, accelerate software delivery.',
  },

  {
    id: 'image-generation',
    title: 'AI Image Generation',
    category: 'Generative AI',
    // NEW
    shortDescription: 'Let your assistant create images from text descriptions: generate visuals for marketing, design, prototyping without designers.',
  },

  {
    id: 'edge-ai',
    title: 'Edge AI Deployment',
    category: 'Local AI Deployment',
    // NEW
    shortDescription: 'Deploy your assistant locally on edge devices: process data offline, reduce latency, maintain privacy with on-premise AI.',
  },

  {
    id: 'on-premise-ai',
    title: 'On-Premise AI Solutions',
    category: 'Local AI Deployment',
    // NEW
    shortDescription: 'Run your assistant entirely within your infrastructure: ensure data sovereignty, meet compliance requirements, maintain complete control.',
  },

  {
    id: 'predictive-analytics',
    title: 'Predictive Analytics',
    category: 'Machine Learning & Analytics',
    // NEW
    shortDescription: 'Give your assistant forecasting powers: predict sales, anticipate trends, identify opportunities before your competition.',
  },

  {
    id: 'anomaly-detection',
    title: 'Anomaly Detection',
    category: 'Machine Learning & Analytics',
    // NEW
    shortDescription: 'Equip your assistant to spot the unusual: detect fraud, identify system failures, catch problems before they impact your business.',
  },

  {
    id: 'recommendation-engine',
    title: 'Recommendation Systems',
    category: 'Machine Learning & Analytics',
    // NEW
    shortDescription: 'Let your assistant personalize experiences: recommend products, suggest content, increase engagement and revenue automatically.',
  },

  {
    id: 'customer-segmentation',
    title: 'Customer Segmentation',
    category: 'Machine Learning & Analytics',
    // NEW
    shortDescription: 'Enable your assistant to group customers intelligently: target marketing, personalize outreach, maximize conversion rates.',
  },

  {
    id: 'nlp-analysis',
    title: 'NLP Document Analysis',
    category: 'Natural Language Processing',
    // NEW
    shortDescription: 'Give your assistant reading comprehension: extract insights from documents, summarize reports, answer questions about text automatically.',
  },

  {
    id: 'text-classification',
    title: 'Text Classification',
    category: 'Natural Language Processing',
    // NEW
    shortDescription: 'Let your assistant organize text automatically: categorize emails, route tickets, tag content without manual effort.',
  },

  {
    id: 'entity-extraction',
    title: 'Named Entity Recognition',
    category: 'Natural Language Processing',
    // NEW
    shortDescription: 'Equip your assistant to identify key information: extract names, dates, locations, and entities from unstructured text.',
  },

  {
    id: 'translation',
    title: 'AI Translation Services',
    category: 'Natural Language Processing',
    // NEW
    shortDescription: 'Give your assistant multilingual capabilities: translate content, communicate globally, break language barriers instantly.',
  },

  {
    id: 'api-integration',
    title: 'API Integration Platform',
    category: 'Non-AI Tools',
    // NEW
    shortDescription: 'Connect your assistant to any system: integrate with CRM, accounting, project management, and thousands of business tools.',
  },

  {
    id: 'data-warehouse',
    title: 'Data Warehousing',
    category: 'Non-AI Tools',
    // NEW
    shortDescription: 'Give your assistant a centralized data source: consolidate information, enable cross-system analytics, power better decisions.',
  },

  {
    id: 'business-intelligence',
    title: 'Business Intelligence Dashboard',
    category: 'Non-AI Tools',
    // NEW
    shortDescription: 'Let your assistant visualize your data: create dashboards, generate reports, track KPIs in real-time automatically.',
  },

  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    category: 'Process Automation',
    // NEW
    shortDescription: 'Enable your assistant to run your processes: automate approvals, trigger actions, orchestrate complex workflows without manual intervention.',
  },

  {
    id: 'rpa',
    title: 'Robotic Process Automation',
    category: 'Process Automation',
    // NEW
    shortDescription: 'Give your assistant the ability to control software: automate repetitive tasks, data entry, and system interactions like a human employee.',
  },

  {
    id: 'smart-scheduling',
    title: 'Intelligent Scheduling',
    category: 'Process Automation',
    // NEW
    shortDescription: 'Let your assistant manage calendars intelligently: schedule meetings, coordinate teams, optimize time allocation automatically.',
  }
];
```

**Note:** Apply this pattern to ALL 27 solutions. The formula is:
1. Start with "Give/Let/Enable/Equip your assistant..."
2. State the capability being added
3. Use a colon to separate
4. Describe what it does (2-3 verbs)
5. End with the business benefit

This creates a consistent narrative that:
- Always mentions "your assistant"
- Positions tools as enhancements
- Focuses on outcomes, not technology
- Uses active, benefit-driven language

---

## 🎯 PHASE 8: NEW PAGES & COMPONENTS (Week 5)

*Complete implementation details for Platform, Pricing, Company pages and Dashboard Preview component can be found in the detailed implementation guide. Key highlights:*

### 8.1 Platform Page (`client/src/pages/platform.tsx` - NEW)
- Hero showcasing "One Assistant. Unlimited Potential"
- Architecture visual diagram
- Enterprise features grid
- Integration showcase (1000+ connectors)
- Security & compliance section
- Customer testimonials

### 8.2 Pricing Page (`client/src/pages/pricing.tsx` - NEW)
- **3 Tiers:** Starter ($299/mo), Professional ($699/mo), Enterprise (Custom)
- Monthly/Annual toggle (20% savings)
- Tool add-ons à la carte
- Industry bundles (Healthcare $999/mo, Finance $1,299/mo, Retail $899/mo)
- Pricing FAQ

### 8.3 Company Page Updates
Add two new sections:
- **Our Platform** - From consulting to product story
- **Why We Built This** - Problem/solution breakdown

### 8.4 Dashboard Preview Component (`client/src/components/platform/dashboard-preview.tsx` - NEW)
- Mock dashboard UI showing assistant + active tools
- Recent activity feed
- Usage at a glance

---

## 🎯 PHASE 9: MOBILE OPTIMIZATION (Week 5-6)

### 9.1 Mobile Hero Experience
**Changes to `hero-section.tsx`:**
- Assistant demo FIRST on mobile (above text)
- Stacked CTAs (full width)
- Single-column layout
- Larger touch targets (min 44px)

### 9.2 Mobile Tools Browsing
**Changes to `solutions.tsx` (→ `tools.tsx`):**
- Horizontal scrollable category filters
- Touch-friendly tool cards (larger padding, text)
- Sticky "Add Tool" CTA at bottom
- Quick preview modal instead of full page navigation
- Performance optimizations (lazy loading, virtual scrolling)

---

## 🎯 PHASE 10: CONVERSION OPTIMIZATION (Week 6)

### 10.1 Trial Signup Flows
**5 Entry Points:**
1. Homepage hero
2. Platform page
3. Tools page ("Add This Tool" → trial if not signed up)
4. Pricing page (all tier buttons)
5. Navigation header (persistent button)

**3-Step Flow:**
1. Email + Name (15 sec)
2. Choose Starting Tool (30 sec)
3. Account Created + Welcome

### 10.2 Intent-Based CTAs
Smart CTA logic based on user state:
- **Logged In (Trial):** "Add More Tools" / "Upgrade Plan"
- **Logged In (Paid):** "Go to Dashboard" / "Browse Tools"
- **Returning Visitor (3+):** "Start Free Trial" / "Schedule Demo"
- **First-Time Visitor:** "See Demo" / "Try Your Assistant"

### 10.3 Social Proof
Add throughout site:
- Homepage trust badges (500+ businesses, 10k+ tasks/day, 99.9% uptime, 4.8/5 rating)
- Industry client logos
- "Most Popular" badges on tools
- Live usage stats ("127 businesses started trial this week")
- Testimonials with photos and company logos
- Optional: Real-time activity feed (bottom-right notifications)

---

## ✅ IMPLEMENTATION CHECKLIST

### Week 1-2: Foundation
- [ ] Update hero with assistant-first messaging
- [ ] Add interactive assistant demo
- [ ] Create "Base Capabilities" section
- [ ] Update "Solutions" → "Tools" globally
- [ ] Add 6 featured tools section
- [ ] Update industry selector
- [ ] Add "How It Works" section
- [ ] Update navigation structure

### Week 2-3: New Pages
- [ ] Create Platform page
- [ ] Create Pricing page
- [ ] Redesign Tools page header
- [ ] Add tool integration visuals

### Week 3-4: Messaging
- [ ] Update all hero sections (StoryBrand)
- [ ] Update 27 tool descriptions
- [ ] Update all CTAs site-wide
- [ ] Add FAQ to homepage
- [ ] Create success stories section
- [ ] Update Company page

### Week 4-5: User Flows
- [ ] Convert Assessment → Trial signup
- [ ] Update Request → Custom Development
- [ ] Create dashboard preview component
- [ ] Add platform visuals

### Week 5-6: Optimization
- [ ] Mobile hero optimization
- [ ] Mobile tools browsing
- [ ] Add trial flows everywhere
- [ ] Implement smart CTAs
- [ ] Add social proof elements
- [ ] Mobile performance tuning

---

## 📊 SUCCESS METRICS

### Phase 1-2 (Week 1-2)
- Bounce rate < 40%
- Session duration > 3 min
- Assistant demo interaction > 25%
- CTA click rate > 8%

### Phase 3-4 (Week 2-4)
- Platform page views: 30% of homepage traffic
- Pricing page views: 40% of homepage traffic
- Average pages/session > 4

### Phase 5-6 (Week 4-5)
- Trial signup rate: 3-5%
- Trial-to-paid: 20%+
- Average tools/trial: 2.5

### Phase 7-10 (Week 5-6)
- Mobile conversion matches desktop
- Smart CTA performance: +10% vs static
- Overall monthly signups: 100+

### Overall (End of 6 Weeks)
| Metric | Target |
|--------|--------|
| Homepage → Trial | 3-5% |
| Trial → Paid | 20%+ |
| Avg Tools/Customer | 2.5 |
| Monthly Signups | 100+ |
| NPS | 70+ |
| Positioning Clarity | 85%+ |

---

## 🧪 TESTING & VALIDATION

### Pre-Launch Testing
1. **Content Review**
   - StoryBrand compliance
   - Messaging consistency
   - CTA mapping adherence

2. **Technical QA**
   - TypeScript compilation
   - Responsive design
   - Browser compatibility
   - Page load < 3 sec
   - Accessibility (WCAG AA)

3. **User Testing**
   - 5 interviews per phase
   - Key questions: "What does Strive do?", "How to get started?", "Assistant vs tools?"

4. **A/B Testing**
   - Homepage hero variants
   - Pricing layout variants
   - CTA button text
   - Trial signup flow

### Post-Launch Monitoring
- **Week 1:** Daily analytics review, hotfix issues
- **Week 2:** Full metrics analysis, A/B results, identify drop-offs

**Tools:**
- Google Analytics 4
- Hotjar
- Sentry
- Intercom
- Internal dashboard

---

## ⚠️ RISK MITIGATION & ROLLBACK

### Risk 1: Messaging Confusion
**Mitigation:** User testing, explainer video, FAQ everywhere
**Rollback Trigger:** <70% understand offering
**Rollback:** Simplify to "AI Business Solutions", add explicit explainer modal

### Risk 2: Lower Conversion During Transition
**Mitigation:** Phased rollout, A/B testing, daily monitoring
**Rollback Trigger:** Conversion drops >30% for 7+ days
**Rollback:** Revert homepage, keep new pricing/platform live

### Risk 3: Mobile Performance Issues
**Mitigation:** Thorough testing, progressive enhancement, monitoring
**Rollback Trigger:** Mobile bounce >60% or load >5 sec
**Rollback:** Revert mobile-specific changes, fix offline

### Risk 4: Implementation Delays
**Mitigation:** Prioritize phases 1-6, build MVP first, use placeholders
**Adjustment:** Cut Phase 10, simplify Phase 8, defer Phase 9 if needed

### Risk 5: Customer Confusion (Existing)
**Mitigation:** Pre-launch email, dedicated communication, grandfathering
**Rollback Trigger:** >20% existing customers raise concerns
**Communication:** Personalized emails, 1-on-1 calls, exclusive early access

---

## 🎯 FINAL SUCCESS CRITERIA

### Must-Have (Launch Blockers)
- Homepage communicates assistant-first
- Pricing page live
- Platform page functional
- All 27 tools updated
- Trial signup works
- Mobile functional
- No critical bugs
- StoryBrand consistent

### Should-Have (Week 2)
- All CTAs updated
- Dashboard preview
- Success stories
- Company page updated
- FAQs everywhere

### Nice-to-Have (Week 4)
- Smart CTA logic
- Social proof optimizations
- Live usage stats
- Advanced mobile features

---

## 📝 POST-LAUNCH ROADMAP

### Month 2: Iteration
- Analyze data
- User interviews (20+)
- Optimize funnels
- Fix UX issues

### Month 3: Expansion
- More tool categories
- Custom tool request flow
- Industry landing pages
- Referral program

### Month 4-6: Scale
- Partnership integrations
- API documentation
- White-label options
- International expansion
- Mobile app development

---

**Document Version:** 2.0 COMPLETE
**Last Updated:** January 2025
**Status:** Ready for Implementation

---

## 🎊 CONCLUSION

This strategic pivot plan transforms Strive from consulting-first to product-first while maintaining strong StoryBrand B2B messaging. The 6-week phased approach minimizes risk and maximizes impact.

**Key Success Factors:**
1. Crystal clear assistant + tools narrative
2. Phased rollout with testing
3. Data-driven decision making
4. User-centric design
5. Rollback readiness for every risk

**Next Steps:**
1. Get leadership approval
2. Assign phase owners
3. Set up analytics
4. Begin Phase 1
5. Launch and iterate

Good luck! 🚀

---

*For detailed implementation code examples for all phases, refer to the comprehensive technical specifications in the implementation guide.*