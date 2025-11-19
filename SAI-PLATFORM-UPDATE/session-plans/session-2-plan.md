# SAI Platform Transformation - Session 2 Plan

**Target Session:** Session 2
**Focus:** Phase 2 - Create Homepage Components
**Estimated Time:** 4-6 hours
**Complexity:** Medium
**Dependencies:** Session 1 data files (✅ Complete)

---

## Session Objectives

Create all 12 homepage components that will consume the SAI data files created in Session 1. These components will be used to build the new SAI-focused homepage.

**Success Criteria:**
- ✅ All 12 homepage components created with full TypeScript
- ✅ Components properly import data from `@/data/sai`
- ✅ Responsive design (mobile-first)
- ✅ Accessibility compliance (WCAG 2.1 AA)
- ✅ No TypeScript errors (`npm run check` passes)
- ✅ Components follow project conventions (CLAUDE.md)

---

## Components to Create (12 Total)

### 1. HeroSection.tsx (150-200 lines) - CRITICAL
**Location:** `client/src/components/homepage/HeroSection.tsx`
**Priority:** HIGH (first component users see)

**Props:**
```typescript
interface HeroSectionProps {
  variant: 'A' | 'B' | 'C' | 'D' | 'E'; // A/B test variations
}
```

**Content:**
- 5 headline variations for A/B testing
- Subheadline emphasizing real estate focus
- Dual CTAs: "Start Free Trial" (primary) and "Book Demo" (secondary)
- Trust signals: "Join 5,000+ agents • No credit card required"
- Real platform screenshot (user confirmed available)

**Reference:** `HOMEPAGE-PART-1-HERO.md` for 5 A/B variations

**Implementation Notes:**
- Use shadcn/ui Button component
- Framer Motion for fade-in animation
- Responsive: Full-width on mobile, max-width container on desktop
- External links for CTAs (user confirmed)

---

### 2. TrustSignalsBar.tsx (40-60 lines) - SIMPLE
**Location:** `client/src/components/homepage/TrustSignalsBar.tsx`
**Priority:** MEDIUM

**Content:**
- Display 4 trust metrics:
  - "5,000+ agents using SAI"
  - "50,000+ deals closed"
  - "$100M+ in commissions tracked"
  - "99.9% uptime"

**Design:**
- Horizontal bar with icons (lucide-react: Users, CheckCircle, DollarSign, Shield)
- Light background (bg-gray-50)
- Simple grid layout (4 columns on desktop, 2 on mobile)

**Implementation Notes:**
- No external data import needed (static content)
- Simple presentational component
- Easy win to build momentum

---

### 3. ModuleCard.tsx (100-120 lines) - MEDIUM
**Location:** `client/src/components/homepage/ModuleCard.tsx`
**Priority:** HIGH (reusable)

**Props:**
```typescript
import type { SAIModule } from '@/data/sai';

interface ModuleCardProps {
  module: SAIModule;
}
```

**Content:**
- Module icon (from lucide-react)
- Module title
- Tagline (one-liner value prop)
- 3-5 key features (truncated list)
- CTA: "Learn More →" linking to module.ctaHref

**Design:**
- Card with hover effect (border highlight, slight scale)
- Icon in primary color circle
- Clean typography hierarchy
- Click entire card or button to navigate

**Implementation Notes:**
- Import SAIModule type from `@/data/sai`
- Use shadcn/ui Card component
- Framer Motion for hover animation
- Use Link from wouter for navigation

---

### 4. ModuleOverviewSection.tsx (40-60 lines) - SIMPLE
**Location:** `client/src/components/homepage/ModuleOverviewSection.tsx`
**Priority:** HIGH

**Content:**
- Section heading: "One Platform. Five Powerful Modules."
- Subheading: "Everything you need to run your real estate business"
- Grid of 5 ModuleCard components
- Import modules from `@/data/sai`

**Design:**
- Grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Responsive gap spacing
- Full-width section with container max-width

**Implementation:**
```typescript
import { saiModules } from '@/data/sai';
import { ModuleCard } from './ModuleCard';

export function ModuleOverviewSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <h2>One Platform. Five Powerful Modules.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saiModules.map(module => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 5. ROICalculator.tsx (200-250 lines) - COMPLEX
**Location:** `client/src/components/homepage/ROICalculator.tsx`
**Priority:** MEDIUM (interactive, high value)

**Props:** None (self-contained)

**Features:**
- **Input Section:**
  - Checkboxes for current tools used:
    - [ ] CRM ($69/mo avg)
    - [ ] Transaction Management ($49/mo)
    - [ ] Content Creation ($49/mo)
    - [ ] Email Marketing ($29/mo)
    - [ ] Social Scheduler ($29/mo)
    - [ ] Market Data ($150/mo)
  - Number input: "How many users/agents on your team?" (default: 1)

- **Output Section:**
  - Current monthly cost: $XXX
  - SAI Platform cost: $999/mo (or $0 if team size = 1 and using Free tier)
  - Monthly savings: $XXX (green if saving, red if more expensive)
  - Annual savings: $XXX
  - Break-even analysis

**Reference:** `HOMEPAGE-PART-2-SECTIONS.md` lines 404-811 for complete specs

**Implementation Notes:**
- Use React state for checkbox selections and team size
- Calculate in real-time as user interacts
- Use shadcn/ui Checkbox and Input components
- Display results with clear typography (large numbers, color-coded)
- Responsive: Stack on mobile, side-by-side on desktop

---

### 6. ROICalculatorSection.tsx (50-70 lines) - SIMPLE
**Location:** `client/src/components/homepage/ROICalculatorSection.tsx`
**Priority:** MEDIUM

**Content:**
- Section heading: "See How Much You'll Save"
- Subheading: "Most agents pay $500-800/month across 5+ tools. SAI replaces them all for $999/month."
- ROICalculator component
- Trust signal: "Join agents saving $6,000+/year"

**Design:**
- Light background (bg-gray-50)
- Centered content, max-width 1200px
- Calculator in white card with shadow

---

### 7. ValuePropCard.tsx (80-100 lines) - MEDIUM
**Location:** `client/src/components/homepage/ValuePropCard.tsx`
**Priority:** MEDIUM

**Props:**
```typescript
interface ValuePropCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  benefit: string;
}
```

**Content:**
- Icon in circle (primary color)
- Title (e.g., "All-in-One Platform")
- Description (2-3 sentences)
- Benefit statement (bold, highlighted)

**Design:**
- Clean card with subtle shadow
- Icon top-left or centered
- Hierarchy: Icon → Title → Description → Benefit

**Implementation Notes:**
- Reusable for different value props
- No external data (props passed in)

---

### 8. WhySAISection.tsx (80-100 lines) - MEDIUM
**Location:** `client/src/components/homepage/WhySAISection.tsx`
**Priority:** MEDIUM

**Content:**
- Section heading: "Why Real Estate Agents Choose SAI"
- 4 ValuePropCard components in 2x2 grid:
  1. **All-in-One:** "Replace 5+ tools with one platform"
  2. **Cost Savings:** "Save $6,000+/year vs. separate tools"
  3. **Time Savings:** "Automated workflows save 10+ hours/week"
  4. **Real Estate Specific:** "Built for agents, by real estate experts"

**Icons:**
- Package (All-in-One)
- DollarSign (Cost Savings)
- Clock (Time Savings)
- Home (Real Estate Specific)

**Design:**
- Grid: 2x2 on desktop, 1 column on mobile
- Responsive gap spacing

---

### 9. ResourcesPreviewSection.tsx (80-100 lines) - SIMPLE
**Location:** `client/src/components/homepage/ResourcesPreviewSection.tsx`
**Priority:** LOW (nice to have)

**Content:**
- Section heading: "Learn More About Real Estate Technology"
- Preview 3 resources:
  1. Blog post (latest from blog-posts data)
  2. Case study (featured case study)
  3. Guide/Whitepaper (featured whitepaper)
- CTA: "View All Resources →" linking to /resources

**Implementation:**
- Import from existing `client/src/data/resources/` files
- Display: Image, title, excerpt, "Read More" link
- Grid: 3 columns on desktop, 1 on mobile

**Note:** May skip if time constrained - not critical for MVP

---

### 10. FinalCTASection.tsx (60-80 lines) - SIMPLE
**Location:** `client/src/components/homepage/FinalCTASection.tsx`
**Priority:** HIGH

**Content:**
- Headline: "Ready to Transform Your Real Estate Business?"
- Subheadline: "Join 5,000+ agents using SAI to close more deals"
- Dual CTAs:
  - Primary: "Start Free Trial →"
  - Secondary: "Schedule Demo"
- 3-step visual: "1. Sign Up Free → 2. Import Contacts → 3. Close More Deals"

**Design:**
- Full-width section with primary color background
- White text on dark background
- Large, prominent CTAs
- 3-step process with icons (UserPlus, Upload, TrendingUp)

**Implementation Notes:**
- Simple presentational component
- External CTA links (user confirmed)

---

## Components NOT Created (Skipped per User Request)

### TestimonialCard.tsx - SKIPPED
- User requested to skip testimonials for now
- Success stories page will show "Coming soon"
- Data structure created but no content

### SocialProofSection.tsx - SKIPPED
- Depends on TestimonialCard
- Will be added in future session when real testimonials available

---

## Implementation Checklist

### Before Starting
- [ ] Verify Session 1 data files are committed (or at least available)
- [ ] Test import: `import { saiModules } from '@/data/sai'` works
- [ ] Check existing `client/src/components/homepage/` directory (may not exist - create it)
- [ ] Review shadcn/ui components available in `client/src/components/ui/`

### Component Creation Order (Dependency-Based)
1. ✅ Create base components first (no dependencies):
   - TrustSignalsBar.tsx
   - ValuePropCard.tsx
   - FinalCTASection.tsx

2. ✅ Create data-dependent components:
   - ModuleCard.tsx (imports SAIModule type)
   - ROICalculator.tsx (standalone)

3. ✅ Create section wrappers:
   - ModuleOverviewSection.tsx (uses ModuleCard)
   - ROICalculatorSection.tsx (uses ROICalculator)
   - WhySAISection.tsx (uses ValuePropCard)

4. ✅ Create hero and complex components:
   - HeroSection.tsx (most important, save for when confident)
   - ResourcesPreviewSection.tsx (optional)

### During Creation
- [ ] Use strict TypeScript (no `any` types)
- [ ] Follow mobile-first responsive design
- [ ] Use shadcn/ui components from `@/components/ui/`
- [ ] Use lucide-react icons
- [ ] Add proper accessibility (ARIA labels, semantic HTML)
- [ ] Use Framer Motion sparingly (only for subtle effects)
- [ ] Follow naming conventions (PascalCase components, camelCase props)

### After Creating Each Component
- [ ] Test import: `import { ComponentName } from '@/components/homepage/ComponentName'`
- [ ] Run TypeScript check: `npm run check`
- [ ] Fix any type errors immediately

### After All Components Created
- [ ] Run full TypeScript check: `npm run check` (must pass with 0 errors)
- [ ] Create barrel export (optional): `client/src/components/homepage/index.ts`
- [ ] Test all components compile without errors
- [ ] Prepare for Session 3 (update home.tsx to use new components)

---

## Technical Specifications

### Styling Approach
- **Tailwind CSS:** Use utility classes for all styling
- **shadcn/ui:** Use existing UI components (Button, Card, Input, Checkbox, etc.)
- **Responsive:** Mobile-first (default → md: → lg:)
- **Dark Mode:** Use theme-aware classes (bg-background, text-foreground, etc.)

### Accessibility Requirements
- All interactive elements keyboard accessible
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels for icon-only buttons
- Focus visible indicators
- Alt text for images
- Semantic HTML (button, nav, section, etc.)

### Performance Considerations
- Lazy load images with loading="lazy"
- Use React.memo only if needed (measure first)
- Keep bundle size small (no heavy dependencies)
- Code split if components >300 lines

### Animation Guidelines
- Use Framer Motion for:
  - Fade-in on scroll (optional)
  - Hover effects (scale, border highlight)
  - Page transitions (optional)
- Keep animations <300ms
- Respect prefers-reduced-motion

---

## File Structure After Session 2

```
client/src/components/homepage/
├── HeroSection.tsx
├── TrustSignalsBar.tsx
├── ModuleCard.tsx
├── ModuleOverviewSection.tsx
├── ROICalculator.tsx
├── ROICalculatorSection.tsx
├── ValuePropCard.tsx
├── WhySAISection.tsx
├── ResourcesPreviewSection.tsx (optional)
├── FinalCTASection.tsx
└── index.ts (optional barrel export)
```

**Total Components:** 10-11 files (12 planned - 2 skipped)
**Estimated Lines:** ~1,200-1,500 lines total

---

## Common Patterns to Follow

### Component Template
```typescript
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SomeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  // Props here
}

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content here */}
      </div>
    </section>
  );
}
```

### Importing SAI Data
```typescript
import { saiModules } from '@/data/sai';
import type { SAIModule } from '@/data/sai';

// In component
{saiModules.map(module => (
  <ModuleCard key={module.id} module={module} />
))}
```

### Responsive Grid
```typescript
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {/* Items */}
</div>
```

### CTA Buttons
```typescript
<Button asChild variant="default" size="lg">
  <a href="https://app.saiplatform.com/signup">Start Free Trial →</a>
</Button>
```

---

## Potential Issues & Solutions

### Issue: Import path not resolving
**Solution:** Verify `tsconfig.json` has `@/` path alias configured

### Issue: shadcn/ui component not found
**Solution:** Install missing component: `npx shadcn-ui@latest add [component-name]`

### Issue: TypeScript errors on SAIModule type
**Solution:** Ensure Session 1 files are saved and TypeScript server restarted

### Issue: Icons not rendering
**Solution:** Verify lucide-react is installed: `npm install lucide-react`

### Issue: Responsive layout breaking
**Solution:** Use container classes and test at all breakpoints (320px, 768px, 1024px, 1280px)

---

## Session 2 Success Criteria

**Definition of Done:**
- ✅ All 10-11 homepage components created
- ✅ TypeScript check passes: `npm run check` → 0 errors
- ✅ All components properly import SAI data
- ✅ Responsive design works on mobile/tablet/desktop
- ✅ Accessibility: semantic HTML, keyboard navigation, ARIA labels
- ✅ Components ready to be integrated into home.tsx (Session 3)

**Deliverables:**
- 10-11 `.tsx` files in `client/src/components/homepage/`
- Optional: `index.ts` barrel export
- Documentation: Component props documented with JSDoc comments

**Ready for Session 3:** Update home.tsx to use new components (Phase 4)

---

## Session 2 Plan Complete

**Next Steps:**
1. Start with simple components (TrustSignalsBar, ValuePropCard, FinalCTASection)
2. Build up to complex components (ModuleCard, ROICalculator)
3. Create section wrappers
4. Finish with HeroSection (most critical)
5. Run final TypeScript check
6. Prepare for Session 3 (home.tsx update)

**Estimated Duration:** 4-6 hours
**Complexity:** Medium (UI components with some interactivity)
**Blockers:** None (all dependencies from Session 1 complete)

Good luck! 🚀
