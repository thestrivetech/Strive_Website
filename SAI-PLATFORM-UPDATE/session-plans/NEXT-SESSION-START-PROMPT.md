# 🚀 NEXT SESSION START PROMPT

Copy and paste this entire prompt to start the next session:

---

## SESSION CONTEXT

I need you to continue the SAI Platform website transformation. We're currently **85% complete** and made significant progress in the last session by consolidating the Platform page content into the Homepage.

**Last Session Summary:** Read the full context from:
`C:\Users\zochr\Desktop\GitHub\Strive_Website\SAI-PLATFORM-UPDATE\session-summaries\2025-01-22-homepage-consolidation-critical-fixes.md`

**Current State:**
- ✅ Homepage: 10 sections, production-ready with complete conversion funnel
- ✅ Platform page content: Consolidated into Homepage (routes redirect to /)
- ✅ Critical fixes: "Global SAI" terminology fixed, footer links updated
- ⚠️ Resources page: Still has 90% generic AI content (needs cleanup)
- ❌ Pricing page: Does not exist (CRITICAL GAP - our #1 priority)

---

## 🎯 PRIMARY GOAL: CREATE PRICING PAGE

**IMPORTANT:** The old Platform page (`/platform`) now redirects to the homepage. We need to **create a brand new Pricing page** to replace it as a critical conversion path.

### **Task 1: Create Comprehensive Pricing Page**
**Estimated Time:** 4-6 hours
**Priority:** 🔴 CRITICAL

**Requirements:**
1. Create new file: `client/src/pages/pricing.tsx`
2. Display 3 pricing tiers: **Free**, **Elite ($999/mo)**, and **Custom**
3. Include feature comparison matrix showing what's in each tier
4. Add pricing FAQs section (4-6 questions about pricing, billing, trials)
5. Prominent "Join Waitlist" CTA (we're in pre-launch MVP stage)
6. Mobile-responsive design (60%+ of traffic is mobile)

**Data Sources (ALREADY EXIST - use these):**
- Pricing tiers data: `client/src/data/sai/pricing-tiers.ts`
  - Contains: `pricingTiers` array (Free, Elite, Custom with CTAs)
  - Contains: `featureComparison` array (10 categories, 80+ features)
- Inspiration: `client/src/components/homepage/PriceSavingsComparison.tsx`

**Design Guidance:**
- Hero section: "Simple, Transparent Pricing Built for Real Estate"
- 3-column layout on desktop (Free | Elite | Custom), stacked on mobile
- Elite tier should be highlighted as "Most Popular"
- Feature comparison: Use accordion or tabs for categories
- Pricing FAQs: Accordion style (similar to Homepage FAQs)
- Colors: Orange (#ff7033) for primary, match existing brand
- Text contrast: Follow CLAUDE.md standards (text-gray-900 on light, text-white on dark)

**Route Setup:**
- Add route to `client/src/App.tsx`: `<Route path="/pricing" component={Pricing} />`
- Lazy load: `const Pricing = lazy(() => import("@/pages/pricing"));`

**SEO Requirements:**
- Title: "Pricing | SAI Platform - Simple Pricing for Real Estate Agents"
- Description: "Transparent pricing for the all-in-one real estate CRM. Free tier available, Elite at $999/mo with unlimited features. Join the waitlist for early access."
- Use MetaTags component: `<MetaTags seo={{...}} />`

---

## 📋 ADDITIONAL PRIORITIES (Complete After Pricing Page)

### **Task 2: Resources Page Cleanup**
**Estimated Time:** 2 hours
**Priority:** 🔴 HIGH

**Problem:** 90% of Resources page content is generic AI content (violates CLAUDE.md rule: "100% SAI Platform focused")

**Action Required:**
1. **Remove these folders/files:**
   - Delete 19 of 20 case studies (keep only `real-estate-ai-transformation.ts`)
   - Delete 7 of 9 blog posts (keep only `ai-trends-2025-analysis.ts` and maybe 1 other)
   - Delete ALL 6 whitepapers (100% generic AI content)
   - Delete Technology Cards section entirely (38 files - portfolio content, NOT marketing)
   - Delete Quizzes section entirely (11 files - NOT marketing content)

2. **Update Resources page:**
   - File: `client/src/pages/resources.tsx`
   - Update hero text to match actual content available
   - Remove filters/sections for deleted content types
   - Add professional "More resources coming soon" message
   - Keep newsletter signup section

3. **Files to keep:**
   - ✅ `client/src/data/resources/case-studies/real-estate-ai-transformation.ts`
   - ✅ `client/src/data/resources/blog/ai-trends-2025-analysis.ts`
   - Consider: `ai-implementation-strategies-small-business.ts` (adaptable to RE)

### **Task 3: Update Pricing CTAs**
**Estimated Time:** 30 minutes
**Priority:** 🟡 MEDIUM

**Action Required:**
1. Search codebase for any `/signup` references (page doesn't exist)
2. Replace all with `/waitlist` (we're in pre-launch stage)
3. Verify `client/src/data/sai/pricing-tiers.ts` CTAs are correct
4. Check if any components reference non-existent signup page

### **Task 4: Navigation Review & Update**
**Estimated Time:** 15 minutes
**Priority:** 🟡 MEDIUM

**Action Required:**
1. Check `client/src/components/layout/Navigation.tsx`
2. Platform link currently exists in nav - decide:
   - **Option A:** Remove Platform link entirely
   - **Option B:** Convert to anchor link to #modules on homepage
   - **Option C:** Replace with Pricing link
3. Update mobile navigation if needed
4. Test dropdown behavior

### **Task 5: About Page CTA Updates**
**Estimated Time:** 1-2 hours
**Priority:** 🟢 NICE-TO-HAVE (if time permits)

**Action Required:**
- File: `client/src/pages/company.tsx` (or `/about`)
- Replace generic CTAs: "Ready to See AI Work For You?" → "Ready to Transform Your Real Estate Business?"
- Update or remove "Join Our Team" CTA (not hiring yet)
- Ensure all content is SAI Platform focused (not generic AI consulting)

### **Task 6: Contact Page FAQ Updates**
**Estimated Time:** 1 hour
**Priority:** 🟢 NICE-TO-HAVE (if time permits)

**Action Required:**
- File: `client/src/pages/contact.tsx`
- Replace generic AI consulting FAQs with SAI Platform FAQs:
  - "When is the MVP launching?"
  - "What's included in the Free tier?"
  - "What integrations does SAI Platform support?"
  - "Can I import my existing CRM data?"
  - "Is there a mobile app?"

---

## 🎯 SESSION GOALS

**Minimum Success Criteria (Must Complete):**
- ✅ Pricing page created and functional
- ✅ Pricing page route added to App.tsx
- ✅ Pricing page displays all 3 tiers correctly
- ✅ Feature comparison matrix works
- ✅ Resources page cleaned (90% generic content removed)

**Ideal Success Criteria (Complete if time permits):**
- ✅ All minimum criteria above
- ✅ Pricing CTAs audited and updated
- ✅ Navigation updated (Platform → Pricing or removed)
- ✅ About page CTAs updated
- ✅ Contact page FAQs updated

**Stretch Goals:**
- Manual testing checklist completed (mobile + desktop)
- TypeScript check passes (`npm run check`)
- Session summary created for next iteration

---

## 📊 EXPECTED OUTCOME

**After This Session:**
- Transformation progress: 85% → 95% complete
- Pricing page: ✅ Exists and functional (CRITICAL GAP CLOSED)
- Resources page: ✅ 100% SAI Platform focused
- All CTAs: ✅ Point to /waitlist correctly
- Navigation: ✅ Clean and accurate

**Estimated Time to Launch After This Session:** 4-6 hours
- Final testing & QA: 2-3 hours
- Content polish: 1-2 hours
- Deploy & monitor: 1 hour

---

## 🔧 TECHNICAL NOTES

**Pricing Page Component Structure:**
```tsx
// Suggested structure
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, X } from "lucide-react";
import { pricingTiers, featureComparison } from "@/data/sai/pricing-tiers";

export default function Pricing() {
  return (
    <>
      <MetaTags seo={{...}} />

      {/* Hero Section */}
      <section>Simple, Transparent Pricing...</section>

      {/* 3 Pricing Tier Cards */}
      <section>Free | Elite ($999/mo) | Custom</section>

      {/* Feature Comparison Matrix */}
      <section>10 categories, 80+ features with checkmarks/X</section>

      {/* Pricing FAQs */}
      <section>Accordion with 6 questions</section>

      {/* Final CTA */}
      <section>Join Waitlist</section>
    </>
  );
}
```

**CRITICAL REMINDER:**
- Follow CLAUDE.md standards for text contrast (no `text-foreground` on fixed backgrounds)
- Use explicit colors: `text-gray-900` on light, `text-white` on dark
- Minimum touch targets: 44px height (`min-h-[44px]`)
- All CTAs must point to `/waitlist` (NOT `/signup`)

---

## 📂 KEY FILES TO REFERENCE

**Data Sources:**
- `client/src/data/sai/pricing-tiers.ts` - All pricing data
- `client/src/data/sai/faqs.ts` - FAQ examples for pricing FAQs
- `client/src/data/sai/modules.ts` - Module names for feature categories

**Component Inspiration:**
- `client/src/components/homepage/PriceSavingsComparison.tsx` - Pricing comparison layout
- `client/src/pages/home.tsx` - FAQ accordion implementation (lines 377-499)
- `client/src/components/ui/hero-section.tsx` - Hero pattern

**Pages to Update:**
- `client/src/pages/resources.tsx` - Remove generic content
- `client/src/components/layout/Navigation.tsx` - Update nav links
- `client/src/App.tsx` - Add pricing route

---

## 🚦 START HERE

**Step 1:** Read the last session summary for full context:
`SAI-PLATFORM-UPDATE/session-summaries/2025-01-22-homepage-consolidation-critical-fixes.md`

**Step 2:** Create the Pricing page (`client/src/pages/pricing.tsx`) using the data from `pricing-tiers.ts`

**Step 3:** Add the route to `App.tsx`

**Step 4:** Clean up Resources page (remove 90% of generic content)

**Step 5:** Update any remaining pricing CTAs and navigation

**Step 6:** Create session summary when done

**Remember:** We're in Plan Mode, so present your plan before executing!

---

**Ready to start? Let's build the Pricing page and finish the SAI Platform transformation!** 🚀
