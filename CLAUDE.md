# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 🚨 CRITICAL RULES

### 1. NEVER COMMIT

**NEVER use `git commit` or `git add && git commit` commands.**

The user will ALWAYS handle Git commits themselves. Claude should:
- ✅ Create, edit, delete files as needed
- ✅ Stage changes if explicitly requested
- ❌ NEVER commit changes (user handles this)

This rule supercedes all other Git-related instructions in this file.

### 2. ALWAYS CHECK FOR EXISTING CODE BEFORE CREATING NEW FILES

**BEFORE creating any new file, ALWAYS check if similar code already exists that should be edited instead.**

This is CRITICAL to prevent duplicate code and maintain consistency:
- ✅ Use `Glob` to search for existing files with similar names/patterns
- ✅ Use `Grep` to search for existing code/components/functions
- ✅ Read existing files to understand current implementation
- ✅ EDIT existing files instead of creating duplicates whenever possible
- ❌ NEVER blindly create new files without checking first
- ❌ NEVER duplicate functionality that already exists

**Process to Follow:**
1. **Before creating:** Search for existing similar files/code
2. **If exists:** Read the existing file and edit/update it
3. **If doesn't exist:** Create new file following project conventions
4. **Always prefer:** Editing existing code over creating new code

**Example:**
```bash
# WRONG: Blindly create new file
Write new-component.tsx

# RIGHT: Check first, then decide
Glob pattern="**/new-component*"  # Check if exists
Grep pattern="NewComponent"       # Search codebase
Read existing-file.tsx            # Read if found
Edit existing-file.tsx            # Update existing OR
Write new-component.tsx           # Create only if truly new
```

This prevents code duplication, maintains consistency, and respects existing architecture.

### 3. WEBSITE PURPOSE & CONTEXT

**This is a marketing website for SAI Platform - an all-in-one real estate CRM.**

Key Context:
- ✅ **100% SAI Platform focused** - No generic "Strive Tech" business solutions content
- ✅ **Marketing/Lead Capture Only** - Website visitors fill out forms to contact sales team
- ✅ **Waitlist/MVP Stage** - Do NOT show specific pricing (use "Join Waitlist" CTAs pointing to `/waitlist`)
- ✅ **Minimal TypeScript Typing** - Use TypeScript inference naturally, avoid heavy type annotations
- ❌ **NEVER use `any` type** - Let TypeScript infer or use inline annotations only when needed
- ✅ **Existing UI Components** - 40+ shadcn/ui components available in `client/src/components/ui/`
- ✅ **SAI Data Files** - Use existing data in `client/src/data/sai/` (modules, faqs, use-cases, roadmap, etc.)

---

## 🎨 UI QUALITY & TEXT CONTRAST STANDARDS (CRITICAL)

**HIGHEST PRIORITY: Visual quality and text readability are non-negotiable.**

### **Text Contrast - NEVER Blend Text with Background**

**CRITICAL RULE: ALWAYS use explicit text colors. NEVER use theme-dependent colors on fixed backgrounds.**

❌ **NEVER DO THIS:**
```tsx
// BAD: Theme colors blend with backgrounds
<div className="bg-gray-50">
  <p className="text-foreground">...</p>          // Blends!
  <p className="text-muted-foreground">...</p>    // Blends!
</div>

<div className="hero-gradient">
  <p className="text-muted-foreground">...</p>    // WCAG violation!
</div>
```

✅ **ALWAYS DO THIS:**
```tsx
// GOOD: Explicit colors for guaranteed contrast
<div className="bg-gray-50">
  <p className="text-gray-900">...</p>      // Dark on light
  <p className="text-gray-600">...</p>      // Muted on light
</div>

<div className="hero-gradient">
  <p className="text-white">...</p>         // White on dark
  <p className="text-white/95">...</p>      // Subtle white on dark
</div>
```

### **Text Color Standards by Background**

**On Dark Backgrounds** (`hero-gradient`, dark sections):
- Headings: `text-white`
- Body text: `text-white/95` or `text-white/90`
- Muted text: `text-white/80` minimum
- ❌ NEVER: `text-foreground`, `text-muted-foreground`, `text-gray-*`

**On Light Backgrounds** (`bg-white`, `bg-gray-50`, `bg-[#ffffffeb]`):
- Headings: `text-gray-900`
- Body text: `text-gray-700`
- Muted text: `text-gray-600`
- ❌ NEVER: `text-foreground`, `text-muted-foreground` (unless background is guaranteed light)

**On Badges/Buttons:**
- Always specify explicit text color
- Test against background color
- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text (WCAG AA)

### **Before Implementing ANY UI Component:**

**1. Check Text Contrast:**
- Is the text color explicitly set?
- Does it have 4.5:1 contrast ratio against background?
- Does it work in both light and dark sections?

**2. Test Visual Hierarchy:**
- Can users scan the content in 3 seconds?
- Is the most important content visually prominent?
- Are badges/labels sized appropriately (not overwhelming)?

**3. Verify Layout Quality:**
- Is content centered or left-aligned consistently?
- Is spacing uniform (no random gaps)?
- Do cards have clear visual boundaries?
- Is text never awkwardly positioned or cut off?

**4. Check for Overlapping Elements:**
- Do hover states cover existing content?
- Are absolutely positioned elements responsive?
- Do badges overlap with text?

### **Professional UI Standards**

**Layout Philosophy:**
- **Vertical stacking** > horizontal cramming (easier to scan)
- **Center-aligned** for simple cards (icon + title + text)
- **Left-aligned** for text-heavy content (easier to read)
- **Consistent spacing** - use multiples of 4px (mb-4, mb-6, mb-8)

**Card Design:**
- Clear visual hierarchy: Icon → Title → Metadata → Description → Action
- Badges at top or bottom, never overlapping main content
- Borders/shadows for depth, not both (avoid over-styling)
- Hover states: subtle shadow/border changes only (NO scale transforms)

**Badge/Label Design:**
- Sized proportionally (text-xs for small badges, not text-lg)
- Explicit colors: `text-gray-700`, `text-orange-600`, NOT `text-foreground`
- Grouped logically (all badges together, not scattered)
- Never cover important content

**Animation Standards:**
- Transitions: 200ms for UI feedback, 300ms max
- ❌ NEVER `hover:scale-*` on cards (causes layout shift)
- ✅ OK: `hover:shadow-lg`, `hover:border-color`, `hover:bg-color`
- Icons can scale: `hover:scale-110` on small icons only

### **Quality Checklist - Run Before Every Component**

```bash
□ Text has explicit color (no text-foreground on fixed backgrounds)
□ Contrast ratio ≥ 4.5:1 verified (use browser DevTools)
□ Layout is clean (center or left-aligned, not mixed randomly)
□ No overlapping elements (hover states, badges, absolute positioning)
□ Badges/labels are appropriately sized (not dominating the card)
□ Spacing is consistent (use mb-4, mb-6, mb-8 - not random values)
□ Visual hierarchy is clear (title > body > metadata)
□ Animations are subtle (shadow/color only, no scale on large elements)
□ Responsive design works (test mobile, tablet, desktop)
□ Tested with real content (not just placeholder text)
```

### **Common Text Contrast Mistakes to Avoid**

❌ `text-muted-foreground` on `hero-gradient` → Use `text-white/80`
❌ `text-foreground` on `bg-gray-50` → Use `text-gray-900`
❌ White badges on light backgrounds → Use `text-gray-700 border-gray-300`
❌ Light gray text on white → Use minimum `text-gray-600`
❌ Transparent overlays covering text → Remove overlay or move text

**Remember: If you can't read it easily, users can't either.**

---

## 🎯 PRODUCTION MINDSET

This is a **production marketing website** serving real users. Every decision should prioritize:

1. **Security First** - Never trust user input, always validate
2. **Performance Matters** - Users expect <3s load times
3. **Accessibility Required** - WCAG 2.1 AA is non-negotiable
4. **SEO Critical** - Every page needs proper meta tags
5. **Type Safety** - TypeScript strict mode catches bugs early
6. **Test Coverage** - 80% minimum prevents regressions
7. **Mobile First** - 60%+ traffic is mobile
8. **Code Quality** - Clean code is maintainable code

**Before writing any code, ask:**
- Is this secure? (XSS, CSRF, SQL injection)
- Is this accessible? (keyboard nav, screen readers)
- Is this performant? (bundle size, render time)
- Is this tested? (unit tests, E2E tests)
- Is this maintainable? (clear names, proper types)

**Remember:** Shortcuts today = technical debt tomorrow.

---

## 📢 B2B MARKETING & BRAND STORY GUIDELINES

**This website targets B2B decision-makers (real estate teams, investors). Every page must grab attention and build trust.**

### **Core Brand Positioning - SAI Platform**

**What SAI Platform Is:**
- All-in-one real estate CRM for modern teams
- AI-powered automation that saves 15+ hours/week
- Built for agents, teams, and brokerages

**What SAI Platform Is NOT:**
- Generic business solutions platform
- Consumer product (this is B2B SaaS)
- Another basic CRM (emphasize AI-powered differentiation)

### **Content Strategy for B2B SaaS**

**Hero Sections (First 3 seconds):**
- Lead with **outcome, not features**: "Close 30% More Deals" > "CRM with AI"
- **Quantify results**: "Save 15 hours/week" > "Automate your workflow"
- **Social proof immediately**: "Trusted by 500+ real estate teams"
- **Clear CTA**: "Join Waitlist" (not "Learn More" - we're pre-launch)

**Problem-Solution Framework:**
```
1. Agitate pain point: "Drowning in spreadsheets and missed follow-ups?"
2. Show consequence: "Losing deals to faster competitors"
3. Introduce solution: "SAI Platform automates lead nurturing, follow-ups, and pipeline management"
4. Prove it works: Case study, metric, testimonial
5. Remove friction: "Join Waitlist - No Credit Card Required"
```

**Tone & Voice:**
- **Professional but conversational**: B2B doesn't mean boring
- **Confidence without arrogance**: "The AI-powered CRM for real estate" (not "might be useful")
- **Jargon-free**: Avoid "synergy," "leverage," "ecosystem" - use plain language
- **Action-oriented**: Use verbs: "Close more deals," "Automate follow-ups," "Scale your team"

### **Investor-Focused Messaging**

**When content targets investors (About, Platform pages):**
- **Market size**: "Real estate CRM market: $10B+ and growing"
- **Traction**: "500+ teams on waitlist," "15,000 hours saved in beta"
- **Differentiation**: "First AI-native CRM purpose-built for real estate"
- **Team credibility**: Highlight expertise in AI, real estate, SaaS
- **Vision**: "Building the operating system for modern real estate teams"

### **Conversion Optimization**

**Every page must have:**
- **One primary CTA** per section (not 3 competing CTAs)
- **Waitlist forms** as primary conversion (not "Contact Us")
- **Trust signals**: Logos, testimonials, metrics, awards
- **Risk reversal**: "No credit card," "Cancel anytime," "14-day trial"

**A/B Testing Priorities:**
1. Hero headline (outcome vs feature)
2. CTA copy ("Join Waitlist" vs "Get Early Access" vs "Start Free Trial")
3. Social proof placement (above fold vs below fold)
4. Form length (email only vs email + company)

### **SEO for B2B SaaS**

**Keyword Strategy:**
- **Primary**: "real estate CRM," "AI CRM for real estate," "real estate automation"
- **Long-tail**: "best CRM for real estate agents," "real estate lead management software"
- **Intent-based**: "how to automate real estate follow-ups," "real estate CRM comparison"

**Content Pillars:**
1. **Product pages**: Feature-driven ("AI Lead Scoring," "Automated Follow-ups")
2. **Use cases**: Role-driven ("CRM for Real Estate Teams," "CRM for Brokerages")
3. **Comparisons**: "SAI vs [Competitor]" (capture high-intent searches)
4. **Educational**: "Ultimate Guide to Real Estate CRM" (build authority)

**Meta Description Formula:**
```
[Primary Keyword] - [Key Benefit] | [Social Proof] | [CTA]
Example: "Real estate CRM with AI automation - Save 15+ hours/week | Trusted by 500+ teams | Join waitlist"
```

### **Messaging Anti-Patterns (NEVER DO THIS)**

❌ **Vague value props**: "Transform your business" → ✅ "Close 30% more deals with AI automation"
❌ **Feature dumps**: "We have 47 features" → ✅ "Automate follow-ups, score leads, track pipeline"
❌ **Generic CTAs**: "Learn More" → ✅ "Join 500+ Teams on Waitlist"
❌ **Boring headlines**: "Welcome to SAI Platform" → ✅ "The AI-Powered CRM for Modern Real Estate Teams"
❌ **No social proof**: Empty testimonial sections → ✅ "15,000 hours saved by beta users"
❌ **Passive voice**: "Can be used for..." → ✅ "Close more deals, automate busywork, scale faster"

### **Content Quality Standards**

**Headlines:**
- Max 10 words (mobile-friendly)
- Lead with benefit or outcome
- Use numbers when possible ("Save 15 hours" not "Save time")

**Body Copy:**
- Max 3 sentences per paragraph (scannability)
- **Bolded keywords** for skimmers
- Bullet points > paragraphs for features/benefits

**CTAs:**
- Action verbs: "Join," "Start," "Get," "See"
- Urgency: "Join 500+ teams," "Limited beta spots"
- Specificity: "Join Waitlist" > "Sign Up"

---

## ⚡ ESSENTIAL BEST PRACTICES

### **React Patterns**

**Performance Optimization:**
- React.memo: Use ONLY for expensive renders with stable props (measure first!)
- useMemo: ONLY for expensive computations taking >5ms
- useCallback: ONLY when passing callbacks to memoized children
- AVOID premature optimization - let React optimize naturally
- Lazy load ALL routes except home (35 pages currently lazy-loaded)

**useEffect Rules (STRICT):**
- MUST include ALL dependencies in array (ESLint will catch)
- ALWAYS return cleanup for subscriptions, timers, event listeners
- NEVER use async function directly in useEffect:
```typescript
// ✅ CORRECT
useEffect(() => {
  const fetchData = async () => {
    const data = await api.getData();
    setData(data);
  };
  fetchData();
}, []);

// ❌ WRONG
useEffect(async () => { ... }, []);
```
- Side effects ONLY - NEVER derive state (use useMemo instead)
- Empty deps `[]`: runs once on mount
- ALWAYS cleanup to prevent memory leaks

**State Management:**
- Local state: `useState` for component-specific state
- Server state: ALWAYS use React Query (`client/src/lib/queryClient.ts`)
- Global state: Context ONLY for auth, theme (NEVER for frequent updates)
- Query keys format: `['entity', id, filters]`
- NEVER store server data in useState - use React Query

**Component Composition:**
- NEVER pass props through >2 levels (use composition or Context)
- Use `children` prop for flexibility
- Extract to custom hook when logic used in 2+ components
- Prefer composition over complex prop drilling

**List Rendering:**
- MUST use stable keys (database id preferred)
- NEVER use array index for dynamic lists (causes bugs)
- Index acceptable ONLY for static lists that never reorder

### **CSS & Styling Standards**

**Tailwind Utility Organization:**
- Order: layout → spacing → typography → colors → effects
- Example: `flex items-center gap-4 px-6 py-3 text-lg font-semibold bg-primary hover:bg-primary/90`
- ALWAYS use `cn()` for conditional classes
- Max 8-10 utilities per element (extract component if more)

**Responsive Design (Mobile-First):**
- Default styles: mobile (≥320px)
- Breakpoints: `md:` (≥768px), `lg:` (≥1024px), `xl:` (≥1280px)
- Test mobile first, enhance for desktop
- Touch targets: min 44px (`min-h-[44px] min-w-[44px]`)

**Dark Mode:**
- Uses class-based strategy (`darkMode: ["class"]` in tailwind.config)
- NEVER hardcode colors - use design tokens
- Colors: `bg-background`, `text-foreground`, `border`, etc.
- Test both light and dark modes

**Layout Patterns:**
- Flexbox: 1D layouts (nav, button groups, inline elements)
- Grid: 2D layouts (card grids, dashboards, galleries)
- Prefer Flexbox for simpler layouts (better browser support)

**NEVER:**
- ❌ Use inline styles (except dynamic values like transforms)
- ❌ Hardcode arbitrary colors (`bg-[#ffffff]` - use `bg-white` or `bg-background`)
- ❌ Arbitrary z-index >100
- ❌ Animate layout properties (width/height) - use transforms instead

### **Accessibility (WCAG 2.1 AA)**

**Keyboard Navigation:**
- ALL interactive elements MUST be keyboard accessible
- Visible focus indicators REQUIRED (never `outline: none` without replacement)
- Tab order MUST be logical
- Touch targets: ≥44px minimum
- Skip links for main content REQUIRED

**ARIA & Semantics:**
- Use semantic HTML FIRST (button, nav, main, article, section)
- ARIA labels: REQUIRED for icon-only buttons
- Form inputs: MUST have associated labels
- Dynamic content: Use aria-live regions
- Landmark roles: Use semantic HTML instead of ARIA when possible

**Visual:**
- Color contrast: 4.5:1 minimum (normal text), 3:1 (large text)
- Text resizable to 200% without breakage
- NEVER rely on color alone for information
- Responsive breakpoints: mobile → md → lg → xl

**Never:**
- ❌ Remove focus outlines without replacement
- ❌ Use `<div onClick>` for buttons (use `<button>`)
- ❌ Omit alt text on images (empty string if decorative)
- ❌ Disable zoom (viewport meta tag)

### **Performance Budgets**

**Bundle Size (STRICT):**
- Initial bundle: <200KB gzipped
- Route chunks: <50KB each
- Run `npm run build:analyze` before major releases
- Manual chunks: vendor, ui, router, utils, motion, charts, icons, forms, query, pwa

**Web Vitals Targets:**
- First Contentful Paint (FCP): <1.5s
- Largest Contentful Paint (LCP): <2.5s
- Time to Interactive (TTI): <3.5s
- Cumulative Layout Shift (CLS): <0.1
- First Input Delay (FID): <100ms
- Monitor via `client/src/lib/web-vitals.ts`

**Images:**
- MUST be optimized (WebP + AVIF in `assets/optimized/`)
- MUST include width and height attributes (prevents CLS)
- MUST lazy load images below fold
- Max size: 200KB per image (compress if larger)

### **Security Standards (NON-NEGOTIABLE)**

**Input Validation:**
- ALWAYS validate server-side with Zod schemas (`shared/schema.ts`)
- NEVER trust client-side validation alone
- Sanitize ALL user input before database operations
- Rate limiting: 500 req/15min production

**Authentication:**
- JWT tokens: httpOnly cookies ONLY (NEVER localStorage)
- Passport.js + local strategy (`server/auth.ts`)
- Protected routes: Use `authenticateToken` middleware

**API Security:**
- Helmet middleware: REQUIRED for all routes
- SQL injection: ONLY use Drizzle ORM parameterized queries (NEVER string concat)
- CORS: Configured in security middleware
- NEVER expose internal errors to clients (generic messages only)

**Never:**
- ❌ Use `dangerouslySetInnerHTML` without DOMPurify sanitization
- ❌ Expose secrets in client code (check build output!)
- ❌ Use `eval()` or `new Function()`
- ❌ Log passwords, tokens, API keys, or PII
- ❌ Store JWT in localStorage (use httpOnly cookies)

### **Testing Requirements**

**Coverage Standards:**
- Unit test coverage: 80% minimum REQUIRED
- Critical paths: 100% coverage MANDATORY
- Run `npm test` before commits
- Run `npm run test:coverage` to check

**Testing Tools:**
- React: @testing-library/react (NEVER Enzyme)
- Query priority: getByRole > getByLabelText > getByText > getByTestId
- E2E: Playwright for critical user flows
- Mocking: MSW for API mocks

**What to Test:**
- ALL exported functions MUST have tests
- React components: user interactions, loading states, error states
- API endpoints: success cases + error cases
- Authentication flows, form submissions, error boundaries
- Critical user paths (E2E)

### **SEO Requirements**

**Meta Tags (REQUIRED on every page):**
- Use `client/src/components/seo/meta-tags.tsx` component
- MUST set unique title per page (format: "Page Title | Strive Tech")
- MUST set unique description (150-160 chars)
- MUST include Open Graph tags (title, description, image, url)
- MUST include Twitter Card tags

**Structured Data:**
- Use `client/src/components/seo/structured-data.tsx`
- JSON-LD format for rich snippets
- Organization schema on homepage
- Article schema for blog posts
- BreadcrumbList for navigation

**Semantic HTML:**
- MUST have exactly one h1 per page
- Heading hierarchy: h1 → h2 → h3 (no skipping)
- Use nav for navigation, main for content, article for posts
- Use section for thematic grouping

**Performance (SEO Factor):**
- Core Web Vitals affect rankings
- Lazy load images below fold
- Minimize bundle size for fast load

---

## 🔧 TECH STACK PATTERNS

**React Query:**
```typescript
// Fetch
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetchUser(userId)
});

// Mutate
const mutation = useMutation({
  mutationFn: updateUser,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
});
```

**Wouter:**
```typescript
// Route params
const [, params] = useRoute("/blog/:slug");
// Navigate
const [, setLocation] = useLocation();
setLocation('/dashboard');
```

---

## 🎯 DECISION TREE - Quick Reference

**Need to fetch data from server?**
→ Use React Query (`useQuery`) for GET requests

**Need to mutate/update data?**
→ Use React Query mutation (`useMutation`)

**Need component state (form inputs, toggles)?**
→ Use `useState` for local state
→ Use React Hook Form for complex forms

**Need global state (auth, theme)?**
→ Use React Context (but NEVER for frequently changing data)

**Need to add a new page?**
→ Create in `client/src/pages/`
→ Add lazy import in `App.tsx`
→ Add route with `<Route path="/path" component={Page} />`

**Need to add UI component?**
→ Check if shadcn/ui has it: `npx shadcn-ui@latest add [component]`
→ If custom: Create in `client/src/components/` (named export)

**Need to style something?**
→ Use Tailwind classes (mobile-first: `class="p-4 md:p-8 lg:p-12"`)
→ Use `cn()` utility for conditional classes
→ NEVER inline styles (except dynamic transforms)

**Need to optimize images?**
→ Use WebP format in `assets/optimized/`
→ MUST include width/height attributes
→ Lazy load below fold

**Need to handle errors?**
→ Use Error Boundary for component errors
→ Use try/catch in async functions
→ Show user-friendly messages (toast notifications)

**File getting too large?**
→ Components: Split at 300 lines
→ Extract hooks for reusable logic
→ Extract utilities to `lib/`

---

## ❌ COMMON ANTI-PATTERNS - Avoid These Mistakes

```typescript
// ❌ WRONG: Creating objects/arrays in render
<Component config={{ timeout: 1000 }} />  // Creates new object every render!

// ✅ RIGHT: Define outside or use useMemo
const config = useMemo(() => ({ timeout: 1000 }), []);
<Component config={config} />
```

```typescript
// ❌ WRONG: Mixing server state with local state
const [users, setUsers] = useState([]);
useEffect(() => {
  fetch('/api/users').then(r => r.json()).then(setUsers);
}, []);

// ✅ RIGHT: Use React Query for server state
const { data: users } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
});
```

```typescript
// ❌ WRONG: Using any type
function process(data: any) { ... }

// ✅ RIGHT: Use proper types or unknown
function process(data: unknown) {
  if (isValidData(data)) { ... }
}
```

```typescript
// ❌ WRONG: Default export
export default function MyComponent() { ... }

// ✅ RIGHT: Named export
export function MyComponent() { ... }
```

```typescript
// ❌ WRONG: Inline styles for static values
<div style={{ padding: '20px', backgroundColor: '#fff' }}>

// ✅ RIGHT: Use Tailwind classes
<div className="p-5 bg-white">
```

```typescript
// ❌ WRONG: Missing accessibility
<div onClick={handleClick}>Click me</div>

// ✅ RIGHT: Use semantic HTML
<button onClick={handleClick}>Click me</button>
```

```typescript
// ❌ WRONG: Forgetting cleanup
useEffect(() => {
  const timer = setInterval(() => { ... }, 1000);
}, []); // Memory leak!

// ✅ RIGHT: Always cleanup
useEffect(() => {
  const timer = setInterval(() => { ... }, 1000);
  return () => clearInterval(timer);
}, []);
```

```typescript
// ❌ WRONG: Not lazy loading routes
import HomePage from '@/pages/home';
import AboutPage from '@/pages/about';  // Loads everything upfront

// ✅ RIGHT: Lazy load all routes (except home)
const HomePage = lazy(() => import('@/pages/home'));
const AboutPage = lazy(() => import('@/pages/about'));
```

**Security Violations:**
- NEVER define components inside components
- NEVER use index as key for dynamic lists
- NEVER do expensive work in render without useMemo
- NEVER trust user input (validate with Zod on server)
- NEVER skip semantic HTML (use h1, nav, main, article)
- NEVER have multiple h1 tags on one page
- NEVER forget useEffect cleanup (event listeners, timers, subscriptions)
- NEVER derive state that can be computed
- NEVER store server state in useState (use React Query)
- NEVER mutate state directly (always create new objects/arrays)

---

## 📋 QUICK REFERENCE CARD

**Tech Stack:**
- React 19 + TypeScript + Vite + Tailwind CSS
- Express.js + Node.js 22 + PostgreSQL (Supabase)
- Drizzle ORM + React Query + Wouter router

**File Limits:**
- Components: 300 lines max
- Utilities: 200 lines max
- Pages: 400 lines max

**Path Aliases:**
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

**Key Directories:**
- `client/src/components/ui/` → shadcn/ui components (56)
- `client/src/pages/` → Route components (35 pages)
- `client/src/data/` → Static content (104 files)
- `client/src/lib/` → Utilities (21 files)
- `server/` → Express backend (26 files)

**Performance Budgets:**
- Initial bundle: <200KB gzipped
- Route chunks: <50KB each
- Images: <200KB per image
- LCP: <2.5s, FID: <100ms, CLS: <0.1

**Coverage Requirements:**
- Unit tests: 80% minimum
- Critical paths: 100% coverage

**Security Checklist:**
- ✅ Validate all input with Zod
- ✅ Sanitize user content (DOMPurify)
- ✅ Use parameterized queries (Drizzle)
- ✅ Never expose secrets in client
- ✅ httpOnly cookies for JWT

**Accessibility Requirements:**
- ✅ Semantic HTML (button, nav, main)
- ✅ ARIA labels for icon buttons
- ✅ Color contrast: 4.5:1 minimum
- ✅ Touch targets: 44px minimum
- ✅ Keyboard navigation support

---

## 🛠️ DEVELOPMENT GUIDE

### **Code Conventions**

**TypeScript Rules:**
- ALWAYS use strict mode with full type coverage
- NEVER use `any` - use `unknown` if type truly unknown
- MUST include explicit return types for exported functions
- Run `npm run check` before EVERY commit
- Path aliases: `@/` → client/src/, `@shared/` → shared/, `@assets/` → attached_assets/

**React Component Standards:**
- ALWAYS use functional components (NEVER class components)
- Components MUST be named exports (avoid default exports)
- Props: Define interfaces with `ComponentNameProps` pattern
- One component per file (except tiny related utilities)
- Lazy loading: REQUIRED for all routes except home

**UI Components:**
- shadcn/ui components: MUST be used for all UI in `components/ui/`
- Styling: Tailwind CSS with `cn()` utility from `client/src/lib/utils.ts`
- Class merging: Use `clsx` + `tailwind-merge` via `cn()` function
- NEVER use inline styles (except dynamic values like transforms)

**Imports & Exports:**
- Named exports PREFERRED over default exports
- Import order: external → internal → types → styles
- Type-only imports: Use `import type` for types

**File Naming:**
- Components: PascalCase (Button.tsx, ErrorBoundary.tsx)
- Pages: kebab-case (analytics-dashboard.tsx, not-found.tsx)
- Utilities: camelCase (utils.ts, queryClient.ts)
- Data files: kebab-case (ai-trends-2025-analysis.ts)
- Tests: *.test.ts or *.spec.ts (colocate with source)

### **Essential Commands**

```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build production (client + server)
npm run check            # TypeScript check (REQUIRED before commits)
npm start                # Start production server
npm run test             # Vitest watch mode
npm run test:coverage    # Coverage report (80% minimum)
npm run test:e2e         # Playwright E2E tests
```

### **Claude Code Tool Usage Patterns**

**File Operations:**
- Use `Read` when you know exact file path
- Use `Glob` for pattern-based discovery (`**/*.tsx`, `**/components/**`)
- Use `Grep` for content search (supports regex, case-insensitive with `-i`)
- NEVER use `cat`, `find`, or `grep` via Bash - use dedicated tools

**Search Strategies:**
- Start broad: `Glob` for file discovery by pattern
- Narrow down: `Grep` for specific code patterns
- Deep dive: `Read` specific files found
- Progressive refinement: Use results to guide next search

### **Error Handling**

**React Components:**
- Error boundaries: REQUIRED for route-level components (`client/src/components/ui/error-boundary.tsx`)
- Fallback UI: REQUIRED for all error states
- NEVER expose stack traces to users

**API Calls:**
- Handle both network errors AND server errors
- Retry logic: transient failures only (network issues)
- Loading states: REQUIRED for all async operations
- Error messages: User-friendly (no technical jargon)
- Display errors: Use toast notifications

**Express Backend:**
- Centralized error middleware (`server/index.ts:65-71`)
- Consistent error format: `{ message: string }`
- HTTP status codes: Use correctly (400, 401, 403, 404, 500)
- NEVER expose internal errors (log internally, generic message to client)

### **Pre-Commit Checklist (MANDATORY)**

1. Run `npm run check` (TypeScript) - MUST pass
2. Run `npm test` (unit tests) - MUST pass
3. Manual testing of changes
4. Code formatted (Prettier via editor)
5. NEVER commit with TypeScript errors
6. NEVER commit without tests for new features

### **Git Commit Messages**

Format: `<type>(<scope>): <message>`

Types: feat, fix, docs, style, refactor, test, chore

Examples:
- `feat(auth): add JWT token refresh`
- `fix(contact): resolve form validation error`
- `docs(readme): update deployment instructions`

Subject: 50 chars max, imperative mood

---

## 📚 APPENDIX

### **Project Structure**

```
client/src/
├── components/ui/       # shadcn/ui (56 components)
├── pages/               # 35 routes (lazy-loaded)
├── hooks/               # 7 custom hooks
├── lib/                 # 21 utilities
├── data/                # 104 static TypeScript files
└── assets/optimized/    # WebP + AVIF images

server/
├── routes/              # API handlers
├── middleware/          # security.ts
├── auth.ts              # Passport.js + JWT
└── routes.ts            # Main route registration
```

### **Tech Stack Overview**

**Frontend:** React 19 + TypeScript + Vite + Tailwind CSS + Wouter router
**Backend:** Express.js + Node.js 22 + PostgreSQL (Supabase) + Drizzle ORM
**UI:** Radix UI + shadcn/ui + Framer Motion
**State:** React Query for server state, Context for auth/theme
**Testing:** Vitest + Playwright + @testing-library/react
**Deployment:** Vercel

### **Adding Content Workflows**

**Adding a Page:**
1. Create: `client/src/pages/your-route.tsx`
2. Lazy load in `App.tsx`: `const YourRoute = lazy(() => import("@/pages/your-route"))`
3. Add route: `<Route path="/your-route" component={YourRoute} />`

**Adding a Component:**
1. Check if shadcn/ui has it: `npx shadcn-ui@latest add [component]`
2. If custom: Create in `client/src/components/` (named export)

**Adding an Image:**
1. Optimize to WebP + AVIF formats
2. Save to: `assets/optimized/`
3. Use with width/height attributes
4. Lazy load below fold
