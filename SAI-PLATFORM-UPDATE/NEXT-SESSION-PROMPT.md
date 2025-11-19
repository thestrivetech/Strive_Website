# SESSION 2 START PROMPT - SAI Platform Transformation

**Use this prompt to start Session 2 of the SAI Platform transformation.**

---

## CONTEXT

We are transforming the Strive Tech website (AI consulting) into SAI Platform (real estate SaaS). Session 1 completed all SAI data files. Now we need to create the homepage components that will consume this data.

**What's Already Done (Session 1):**
- ✅ Full backup created at `/backups/pre-sai-transformation/`
- ✅ Git branch created: `feature/sai-platform-transformation`
- ✅ 17 solution pages deleted (non-real-estate industries)
- ✅ Portfolio page and data deleted
- ✅ SAI data folder structure created at `client/src/data/sai/`
- ✅ **8 SAI data files created and ready** (modules, pricing, roadmap, competitors, use-cases, faqs, success-stories, index)

**Current Git Branch:** `feature/sai-platform-transformation`

**Repository Location:** `/Users/grant/Desktop/Github/Strive_Website`

---

## 🚨 CRITICAL RULE: ALWAYS CHECK FOR EXISTING CODE FIRST

**BEFORE creating ANY new file or component, you MUST:**

1. ✅ **Search for existing files** using `Glob` pattern matching
2. ✅ **Search for existing code** using `Grep` to find similar functionality
3. ✅ **Read existing files** to understand current implementation
4. ✅ **EDIT/UPDATE existing code** instead of creating duplicates whenever possible
5. ❌ **NEVER blindly create new files** without checking first

**Example Process:**
```bash
# STEP 1: Check if component already exists
Glob pattern="**/HeroSection*"
Glob pattern="**/components/homepage/**"

# STEP 2: Search for similar code
Grep pattern="HeroSection" output_mode="files_with_matches"
Grep pattern="export.*Hero" output_mode="content"

# STEP 3: If found, read and update
Read client/src/components/homepage/HeroSection.tsx
Edit client/src/components/homepage/HeroSection.tsx  # Update existing

# STEP 4: Only if NOT found, create new
Write client/src/components/homepage/HeroSection.tsx  # Create new
```

**This rule is in CLAUDE.md and MUST be followed for every file creation.**

---

## YOUR TASK

Complete **Phase 2: Create Homepage Components** by creating 12 components that will be used on the new SAI-focused homepage.

**Session Plan:** Follow the detailed plan at `/Users/grant/Desktop/Github/Strive_Website/SAI-PLATFORM-UPDATE/session-plans/session-2-plan.md`

**CRITICAL RULES:**
1. ❌ **NEVER use `git commit`** - I will handle all commits
2. ✅ **ALWAYS check for existing code first** (Glob → Grep → Read → Edit/Write)
3. ✅ Use TodoWrite to track progress through all 12 components
4. ✅ Test TypeScript after creating each component (`npm run check`)
5. ✅ Follow project conventions in CLAUDE.md

---

## COMPONENTS TO CREATE (12 Total)

**Priority Order (from session-2-plan.md):**

### Phase A: Simple Base Components (Start Here)
1. ✅ **TrustSignalsBar.tsx** - Simple metrics bar (40-60 lines, no dependencies)
2. ✅ **ValuePropCard.tsx** - Reusable value prop card (80-100 lines, no dependencies)
3. ✅ **FinalCTASection.tsx** - Final CTA section (60-80 lines, no dependencies)

### Phase B: Data-Dependent Components
4. ✅ **ModuleCard.tsx** - Display single SAI module (100-120 lines, imports `SAIModule` type)
5. ✅ **ROICalculator.tsx** - Interactive savings calculator (200-250 lines, complex but standalone)

### Phase C: Section Wrappers
6. ✅ **ModuleOverviewSection.tsx** - Grid of 5 ModuleCard components (40-60 lines, uses ModuleCard)
7. ✅ **ROICalculatorSection.tsx** - Wrapper for ROICalculator (50-70 lines, uses ROICalculator)
8. ✅ **WhySAISection.tsx** - 4 ValuePropCard components in grid (80-100 lines, uses ValuePropCard)

### Phase D: Complex Components
9. ✅ **HeroSection.tsx** - SAI hero with A/B test variants (150-200 lines, CRITICAL)
10. ✅ **ResourcesPreviewSection.tsx** - Preview 3 resources (80-100 lines, OPTIONAL if time constrained)

**Components SKIPPED (per Session 1 decisions):**
- ❌ TestimonialCard.tsx - No testimonials yet (user request)
- ❌ SocialProofSection.tsx - Depends on testimonials

---

## IMPLEMENTATION GUIDE

### Step 1: Verify Session 1 Data Files (FIRST!)

**Before creating any components, verify the data files exist:**

```bash
# Check SAI data files exist
ls client/src/data/sai/

# Expected output:
# modules.ts
# pricing-tiers.ts
# roadmap.ts
# competitors.ts
# use-cases.ts
# faqs.ts
# success-stories/
# index.ts

# Test importing data
Read client/src/data/sai/index.ts
```

**If files don't exist:** Something went wrong in Session 1. Stop and notify user.

---

### Step 2: Check for Existing Homepage Components Directory

```bash
# Check if homepage components directory exists
Glob pattern="**/components/homepage/**"

# If exists: Read existing files to understand structure
# If doesn't exist: You'll need to create the directory
```

---

### Step 3: Create Components in Dependency Order

**For EACH component:**

1. **Check if already exists:**
   ```bash
   Glob pattern="**/ComponentName*"
   Grep pattern="ComponentName" path="client/src/components"
   ```

2. **If exists:** Read and update it
   ```bash
   Read client/src/components/homepage/ComponentName.tsx
   Edit client/src/components/homepage/ComponentName.tsx
   ```

3. **If doesn't exist:** Create new file
   ```bash
   Write client/src/components/homepage/ComponentName.tsx
   ```

4. **After creating:** Test TypeScript
   ```bash
   npm run check
   ```

5. **Update todo list:**
   ```typescript
   TodoWrite([...]) // Mark component as completed
   ```

---

### Step 4: Follow Component Specifications

**Every component MUST:**
- ✅ Use TypeScript with strict types (NO `any`)
- ✅ Import from `@/data/sai` when needed
- ✅ Use shadcn/ui components from `@/components/ui/`
- ✅ Use Tailwind CSS for styling (mobile-first)
- ✅ Include proper accessibility (ARIA labels, semantic HTML)
- ✅ Be a **named export** (not default export)
- ✅ Have props interface named `ComponentNameProps`

**Component Template:**
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

**Importing SAI Data:**
```typescript
import { saiModules } from '@/data/sai';
import type { SAIModule } from '@/data/sai';

// In component
{saiModules.map(module => (
  <ModuleCard key={module.id} module={module} />
))}
```

---

## COMPONENT SPECIFICATIONS SUMMARY

### 1. TrustSignalsBar.tsx (START HERE - EASIEST)
- **Lines:** 40-60
- **Complexity:** LOW
- **Dependencies:** None (static content)
- **Content:** Display 4 metrics (5,000+ agents, 50,000+ deals, $100M+ commissions, 99.9% uptime)
- **Icons:** Users, CheckCircle, DollarSign, Shield (lucide-react)

### 2. ValuePropCard.tsx
- **Lines:** 80-100
- **Complexity:** LOW
- **Dependencies:** None (props-based)
- **Props:** `{ icon, title, description, benefit }`
- **Design:** Card with icon, title, description, benefit statement

### 3. FinalCTASection.tsx
- **Lines:** 60-80
- **Complexity:** LOW
- **Dependencies:** None (static content)
- **Content:** Final CTA with dual buttons and 3-step process visual
- **CTAs:** "Start Free Trial" (primary), "Schedule Demo" (secondary)

### 4. ModuleCard.tsx
- **Lines:** 100-120
- **Complexity:** MEDIUM
- **Dependencies:** `import type { SAIModule } from '@/data/sai'`
- **Props:** `{ module: SAIModule }`
- **Features:** Hover effect, click to navigate, icon + title + tagline + features

### 5. ROICalculator.tsx (MOST COMPLEX)
- **Lines:** 200-250
- **Complexity:** HIGH
- **Dependencies:** React state, shadcn/ui Checkbox and Input
- **Features:** Interactive checkboxes for tools, team size input, real-time calculations
- **Reference:** `SAI-PLATFORM-UPDATE/HOMEPAGE-PART-2-SECTIONS.md` lines 404-811

### 6. ModuleOverviewSection.tsx
- **Lines:** 40-60
- **Complexity:** LOW
- **Dependencies:** ModuleCard component, `saiModules` from `@/data/sai`
- **Layout:** Grid of 5 ModuleCard components (3 cols desktop, 2 tablet, 1 mobile)

### 7. ROICalculatorSection.tsx
- **Lines:** 50-70
- **Complexity:** LOW
- **Dependencies:** ROICalculator component
- **Content:** Wrapper with heading + calculator

### 8. WhySAISection.tsx
- **Lines:** 80-100
- **Complexity:** MEDIUM
- **Dependencies:** ValuePropCard component
- **Content:** 4 ValuePropCard components in 2x2 grid

### 9. HeroSection.tsx (SAVE FOR LAST)
- **Lines:** 150-200
- **Complexity:** HIGH
- **Dependencies:** shadcn/ui Button, real platform screenshot
- **Props:** `{ variant: 'A' | 'B' | 'C' | 'D' | 'E' }` for A/B testing
- **Reference:** `SAI-PLATFORM-UPDATE/HOMEPAGE-PART-1-HERO.md` for 5 variations

### 10. ResourcesPreviewSection.tsx (OPTIONAL)
- **Lines:** 80-100
- **Complexity:** MEDIUM
- **Dependencies:** Existing resources data from `client/src/data/resources/`
- **Content:** Preview 3 resources (blog, case study, guide)
- **Note:** Can skip if time constrained

---

## SUCCESS CRITERIA

**Session 2 is complete when:**

- ✅ All 10-12 homepage components created
- ✅ TypeScript check passes: `npm run check` → 0 errors
- ✅ All components properly import SAI data where needed
- ✅ Responsive design works (mobile, tablet, desktop)
- ✅ Accessibility: semantic HTML, keyboard navigation, ARIA labels
- ✅ Todo list shows all components completed
- ✅ Components ready to be integrated into home.tsx (Session 3)

---

## CHECKLIST

**Before Starting:**
- [ ] Read session-2-plan.md for full details
- [ ] Verify Session 1 data files exist at `client/src/data/sai/`
- [ ] Check CLAUDE.md for project conventions
- [ ] Create todo list with TodoWrite

**For Each Component:**
- [ ] **CHECK FIRST:** Glob + Grep to find existing code
- [ ] **READ if exists:** Understand current implementation
- [ ] **EDIT or WRITE:** Update existing OR create new
- [ ] **TEST:** Run `npm run check` after creating
- [ ] **UPDATE TODO:** Mark component as completed

**After All Components:**
- [ ] Run `npm run check` → 0 errors
- [ ] Review all components for consistency
- [ ] Prepare for Session 3 (home.tsx update)

---

## ESTIMATED TIME

- **Phase A (Simple components):** 1-1.5 hours
- **Phase B (Data-dependent):** 1.5-2 hours
- **Phase C (Section wrappers):** 1-1.5 hours
- **Phase D (Complex components):** 1.5-2 hours

**Total:** 4-6 hours for all 10-12 components

---

## IMPORTANT NOTES

1. **No Git Commits:** I will handle all commits. You create/edit files only.

2. **Check Existing Code First:** ALWAYS Glob → Grep → Read before creating new files.

3. **Use Session Plan:** The detailed session-2-plan.md has full specs for each component.

4. **Test Frequently:** Run `npm run check` after creating each component to catch errors early.

5. **Ask Questions:** If specifications are unclear, ask before guessing.

6. **TodoWrite:** Use the todo list to track progress through all components.

7. **External Links:** "Start Free Trial" and "Login" link to external platform (confirmed in Session 1).

8. **No Testimonials:** Skip TestimonialCard and SocialProofSection (per Session 1 decision).

9. **Real Screenshots:** User has actual platform screenshots available (use real images, not placeholders).

10. **Current Branding:** Keep Strive orange color (#ff7033) - no new SAI colors needed.

---

## GETTING STARTED

**Copy/paste this to start Session 2:**

```
I'm ready to start Session 2 of the SAI Platform transformation.

Session 1 completed all 8 SAI data files. Now I need to create 12 homepage components following the session-2-plan.md specifications.

CRITICAL: I will ALWAYS check for existing code using Glob/Grep/Read BEFORE creating any new files, and edit existing code instead of creating duplicates whenever possible (per CLAUDE.md rule).

Let me start by:
1. Verifying Session 1 data files exist
2. Checking for existing homepage components
3. Creating a comprehensive todo list
4. Starting with the simplest components first (TrustSignalsBar, ValuePropCard, FinalCTASection)

Ready to begin Phase 2!
```

---

## FILES REFERENCE

**Session Plan:** `/Users/grant/Desktop/Github/Strive_Website/SAI-PLATFORM-UPDATE/session-plans/session-2-plan.md`

**Session 1 Summary:** `/Users/grant/Desktop/Github/Strive_Website/SAI-PLATFORM-UPDATE/session-summaries/session-1-summary.md`

**Project Conventions:** `/Users/grant/Desktop/Github/Strive_Website/CLAUDE.md`

**SAI Data Files:** `/Users/grant/Desktop/Github/Strive_Website/client/src/data/sai/`

---

## SESSION 2 START PROMPT READY ✅

Copy the "GETTING STARTED" section above to begin, or reference this entire file for comprehensive guidance.

**End of Session 2 Start Prompt**
