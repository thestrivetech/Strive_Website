# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 📑 TABLE OF CONTENTS

**Essential Reading (Start Here):**
- [🚨 Critical Rules](#-critical-rules) - Never commit, always check existing code
- [🎯 Decision Tree](#-decision-tree---quick-reference) - Quick answers to common questions
- [❌ Common Anti-Patterns](#-common-anti-patterns---avoid-these-mistakes) - Mistakes to avoid
- [📋 Quick Reference Card](#-quick-reference-card) - Essential info at a glance
- [🎯 Production Mindset](#-production-mindset) - Quality standards

**Deep Dive Sections:**
- [Project Overview](#project-overview) - Tech stack & structure
- [Essential Commands](#essential-commands) - npm scripts
- [Claude Code Tool Usage](#claude-code-tool-usage-patterns) - How to use tools effectively
- [Code Conventions](#code-conventions) - TypeScript, React, styling rules
- [React Best Practices](#react-best-practices) - Performance, hooks, composition
- [Security Standards](#security-standards-non-negotiable) - XSS, CSRF, validation
- [Testing Requirements](#testing-requirements) - Coverage, patterns, tools
- [Performance Budgets](#performance-budgets) - Bundle size, Web Vitals
- [Accessibility](#accessibility-wcag-21-aa) - WCAG compliance
- [SEO Requirements](#seo-requirements) - Meta tags, structured data
- [Error Handling](#error-handling) - Boundaries, API errors
- [Content Creation Workflows](#content-creation-workflows) - Adding pages, blog posts
- [Deployment](#deployment-vercel) - Vercel configuration

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

Navigation Structure:
- Home → 100% SAI Platform content
- Platform → `/platform` (detailed product showcase)
- Portfolio, Resources, About, Contact (supporting pages)
- Waitlist → `/waitlist` (form for early access requests)

---

## 🎯 DECISION TREE - Quick Reference

**Need to fetch data from server?**
→ Use React Query (`useQuery`) for GET requests
→ Server state managed automatically (caching, refetching, etc.)

**Need to mutate/update data?**
→ Use React Query mutation (`useMutation`)
→ Invalidate queries after success to refresh UI

**Need component state (form inputs, toggles)?**
→ Use `useState` for local component state
→ Use React Hook Form for complex forms

**Need global state (auth, theme)?**
→ Use React Context (but NEVER for frequently changing data)
→ Auth example: `client/src/lib/auth-context.tsx`

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

**Quick reference of the most common mistakes. For comprehensive list, see [Critical Anti-Patterns](#critical-anti-patterns-never-do-these) section below.**

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
// ❌ WRONG: Hardcoded colors
<div className="bg-[#ffffff]">

// ✅ RIGHT: Use theme tokens
<div className="bg-background">
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
// ❌ WRONG: Prop drilling through multiple levels
<A data={data}>
  <B data={data}>
    <C data={data}>  // 3 levels deep!

// ✅ RIGHT: Use composition or context
<DataContext.Provider value={data}>
  <A><B><C /></B></A>
```

```typescript
// ❌ WRONG: Not lazy loading routes
import HomePage from '@/pages/home';
import AboutPage from '@/pages/about';  // Loads everything upfront

// ✅ RIGHT: Lazy load all routes (except home)
const HomePage = lazy(() => import('@/pages/home'));
const AboutPage = lazy(() => import('@/pages/about'));
```

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

## Project Overview

Strive Tech website - full-stack TypeScript application for AI-powered business solutions company.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS + Wouter • Express.js + Node.js 22 + PostgreSQL (Supabase) + Drizzle ORM • Radix UI + shadcn/ui • Framer Motion • React Query • Vitest + Playwright • Vercel

## Essential Commands

```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build production (client + server)
npm run build:analyze    # Build with bundle analyzer
npm start                # Start production server
npm run check            # TypeScript check (REQUIRED before commits)
npm run db:push          # Push schema to database
npm run supabase:start   # Start local Supabase
npm run test             # Vitest watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Coverage report (80% minimum)
npm run test:e2e         # Playwright E2E tests
```

## Claude Code Tool Usage Patterns

**File Operations:**
- Use `Read` when you know exact file path
- Use `Glob` for pattern-based discovery (`**/*.tsx`, `**/components/**`)
- Use `Grep` for content search (supports regex, case-insensitive with `-i`)
- NEVER use `cat`, `find`, or `grep` via Bash - use dedicated tools

**Parallel Operations:**
- Call multiple `Read` simultaneously for related files
- Run `Glob` + `Grep` searches in parallel when investigating multiple patterns
- Example: Read component + test + types in single message with 3 Read calls

**Search Strategies (244 client files):**
- Start broad: `Glob` for file discovery by pattern
- Narrow down: `Grep` for specific code patterns
- Deep dive: `Read` specific files found
- Progressive refinement: Use results to guide next search

**Error Recovery:**
- If tool fails, try alternative approach (Glob → Grep → Read)
- For large codebases: Limit scope with path parameter
- Context management: Prioritize reading only essential files

## Code Conventions

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
- Lazy loading: REQUIRED for all routes except home (`client/src/App.tsx:22-55`)

**State Management:**
- Local state: `useState` for component-specific state
- Server state: ALWAYS use React Query (`client/src/lib/queryClient.ts`)
- Global state: Context ONLY for auth, theme (NEVER for frequent updates)
- Query keys format: `['entity', id, filters]`
- NEVER store server data in useState - use React Query

**UI Components:**
- shadcn/ui components: MUST be used for all UI in `components/ui/`
- Styling: Tailwind CSS with `cn()` utility from `client/src/lib/utils.ts`
- Class merging: Use `clsx` + `tailwind-merge` via `cn()` function
- NEVER use inline styles (except dynamic values like transforms)

**Imports & Exports:**
- Named exports PREFERRED over default exports
- Import order: external → internal → types → styles
- Type-only imports: Use `import type` for types
- Example:
```typescript
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { User } from '@shared/types';
```

**File Naming:**
- Components: PascalCase (Button.tsx, ErrorBoundary.tsx)
- Pages: kebab-case (analytics-dashboard.tsx, not-found.tsx)
- Utilities: camelCase (utils.ts, queryClient.ts)
- Data files: kebab-case (ai-trends-2025-analysis.ts)
- Tests: *.test.ts or *.spec.ts (colocate with source)

## React Best Practices

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

**Component Composition:**
- NEVER pass props through >2 levels (use composition or Context)
- Use `children` prop for flexibility
- Extract to custom hook when logic used in 2+ components
- Prefer composition over complex prop drilling

**Event Handlers:**
- Extract handlers for logic >3 lines
- Use inline arrow functions ONLY for simple cases
- NEVER bind in render (use arrow functions or useCallback)
```typescript
// ✅ GOOD
<Button onClick={() => handleClick(id)} />
const handleSubmit = useCallback(() => { ... }, [deps]);

// ❌ BAD
<Button onClick={handleClick.bind(this, id)} />
```

**List Rendering:**
- MUST use stable keys (database id preferred)
- NEVER use array index for dynamic lists (causes bugs)
- Index acceptable ONLY for static lists that never reorder
- Keys must be unique among siblings only

**Controlled Components:**
- Forms: ALWAYS use controlled components
- Use React Hook Form for complex forms (validation, errors)
- Uncontrolled: ONLY for file inputs or extreme performance needs

**Custom Hooks:**
- MUST start with "use" prefix
- Extract when logic reused in 2+ components
- Current hooks: usePageTracking, usePrefetch, useMobile, useSEO, useToast, useCalendlyIntegration, useDebounce
- Return object or array (not mixed)

**Context Best Practices:**
- NEVER put frequently changing values in Context (causes re-renders)
- Split contexts by update frequency
- Use React Query for server state (NOT Context)
- Memoize context value to prevent unnecessary renders:
```typescript
const value = useMemo(() => ({ user, login, logout }), [user]);
```

**Fragments:**
- Use `<>` shorthand when no key needed
- Use `<Fragment key={}>` for lists
- Avoid wrapping in unnecessary divs

## Critical Anti-Patterns (NEVER DO THESE)

**React Performance Killers:**
- NEVER create objects/arrays/functions inline in JSX (causes re-renders)
```typescript
// ❌ BAD - creates new object every render
<Component user={{ id: 1, name: 'test' }} />

// ✅ GOOD - stable reference
const user = useMemo(() => ({ id: 1, name: 'test' }), []);
<Component user={user} />
```
- NEVER define components inside components
- NEVER use index as key for dynamic lists
- NEVER do expensive work in render without useMemo

**Security Violations:**
- NEVER use `dangerouslySetInnerHTML` without DOMPurify sanitization
- NEVER expose secrets in client code (check build output!)
- NEVER trust user input (validate with Zod on server)
- NEVER use `eval()` or `new Function()`
- NEVER log passwords, tokens, API keys, or PII
- NEVER store JWT in localStorage (use httpOnly cookies)

**Accessibility Violations:**
- NEVER remove focus outlines without replacement
- NEVER use `<div onClick>` for buttons (use `<button>`)
- NEVER omit alt text on images (empty string if decorative)
- NEVER disable zoom (viewport meta tag)
- NEVER use color alone to convey information

**SEO Violations:**
- NEVER have pages without unique title and description
- NEVER skip semantic HTML (use h1, nav, main, article)
- NEVER have multiple h1 tags on one page
- NEVER forget Open Graph tags for social sharing

**Memory Leaks:**
- NEVER forget useEffect cleanup (event listeners, timers, subscriptions)
- NEVER leave intervals/timeouts running after unmount
- NEVER forget to cancel async operations on unmount
- ALWAYS abort fetch requests when component unmounts

**State Management:**
- NEVER derive state that can be computed
- NEVER store server state in useState (use React Query)
- NEVER duplicate data between state and props
- NEVER mutate state directly (always create new objects/arrays)

## CSS & Styling Best Practices

**Tailwind Utility Organization:**
- Order: layout → spacing → typography → colors → effects
- Example: `flex items-center gap-4 px-6 py-3 text-lg font-semibold bg-primary hover:bg-primary/90`
- ALWAYS use `cn()` for conditional classes
- Max 8-10 utilities per element (extract component if more)

**Custom CSS vs Tailwind:**
- Use Tailwind FIRST - custom CSS only when:
  - Complex animations (prefer Framer Motion)
  - Browser-specific hacks
  - Third-party component overrides
- NEVER use inline styles (except dynamic values)

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

**Z-Index Management:**
- Modals/Dialogs: z-50
- Dropdowns/Popovers: z-40
- Fixed Headers/Footers: z-30
- Overlays: z-20
- NEVER use arbitrary z-index >100

**Animations (Framer Motion):**
- Use for complex UI animations
- Keep animations <300ms for UI feedback
- Use `prefers-reduced-motion` media query
- NEVER animate layout properties (width/height) - use transforms
```typescript
// ✅ GOOD - animates transform
<motion.div animate={{ opacity: 1, y: 0 }} />

// ❌ BAD - animates layout
<motion.div animate={{ height: 'auto' }} />
```

## Security Standards (NON-NEGOTIABLE)

**Input Validation:**
- ALWAYS validate server-side with Zod schemas (`shared/schema.ts`)
- NEVER trust client-side validation alone
- Sanitize ALL user input before database operations
- Rate limiting: 500 req/15min production (`server/middleware/security.ts:217`)

**Authentication:**
- JWT tokens: httpOnly cookies ONLY (NEVER localStorage)
- Passport.js + local strategy (`server/auth.ts`)
- Protected routes: Use `authenticateToken` middleware
- Session management: Dual auth (Supabase + JWT)

**API Security:**
- Helmet middleware: REQUIRED for all routes (`server/middleware/security.ts`)
- SQL injection: ONLY use Drizzle ORM parameterized queries (NEVER string concat)
- CORS: Configured in security middleware
- NEVER expose internal errors to clients (generic messages only)

**Secrets Management:**
- NEVER commit secrets to git (.env in .gitignore)
- Use environment variables for all secrets
- Prefix client vars with VITE_ (auto-exposed to client)
- Verify no secrets in build output before deploy

## Testing Requirements

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
- Authentication flows: login, logout, protected routes
- Form submissions and validation
- Error boundaries
- Critical user paths (E2E)

**Testing Patterns:**
- Colocate tests: Component.test.tsx next to Component.tsx
- Test behavior, not implementation
- ALWAYS test accessibility (getByRole)
- Mock external dependencies
- Use fixtures for complex test data

## Performance Budgets

**Bundle Size (STRICT):**
- Initial bundle: <200KB gzipped
- Route chunks: <50KB each
- Run `npm run build:analyze` before major releases
- Manual chunks: vendor, ui, router, utils, motion, charts, icons, forms, query, pwa (`vite.config.ts:96-139`)

**React Performance:**
- Lazy load ALL route components except home (35 pages lazy-loaded)
- Images: WebP with fallbacks, lazy loading, width/height REQUIRED
- Code split heavy libraries (recharts, framer-motion already split)
- Virtual scrolling for lists >100 items

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

## Accessibility (WCAG 2.1 AA)

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

**Testing:**
- Run manual keyboard testing for all interactive features
- Use browser DevTools Lighthouse for accessibility audit
- Test with screen reader for complex interactions

## SEO Requirements

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

## Error Handling

**React Components:**
- Error boundaries: REQUIRED for route-level components (`client/src/components/ui/error-boundary.tsx`)
- Analytics errors: Use `AnalyticsErrorBoundary` (fails silently) (`client/src/components/ui/analytics-error-boundary.tsx`)
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

**Error Logging:**
- Client errors: Log to console in dev, consider error service in prod
- Server errors: Winston logger (`server/lib/logger.ts`)
- NEVER log sensitive data in errors

## Code Quality Standards

**Git Commit Messages:**
- Format: `<type>(<scope>): <message>`
- Types: feat, fix, docs, style, refactor, test, chore
- Examples:
  - `feat(auth): add JWT token refresh`
  - `fix(contact): resolve form validation error`
  - `docs(readme): update deployment instructions`
- Subject: 50 chars max, imperative mood
- Body: 72 chars per line, explain WHY not WHAT

**Pre-Commit Checklist (MANDATORY):**
1. Run `npm run check` (TypeScript) - MUST pass
2. Run `npm test` (unit tests) - MUST pass
3. Manual testing of changes
4. Code formatted (Prettier via editor)
5. NEVER commit with TypeScript errors
6. NEVER commit without tests for new features

**Pull Request Requirements:**
- [ ] All tests passing (`npm test`)
- [ ] TypeScript errors resolved (`npm run check`)
- [ ] Coverage ≥80% for new code
- [ ] Manual testing completed
- [ ] Screenshots for UI changes
- [ ] Breaking changes documented
- [ ] Reviewer assigned

**Code Comments:**
- Use JSDoc for exported functions and complex logic
- Explain WHY, not WHAT
- NEVER comment obvious code
- Update comments when code changes
- TODO format: `// TODO(TICKET-123): description`

**Function Guidelines:**
- Max 40 lines per function (extract if longer)
- Max 4 parameters (use options object for more)
- Single responsibility principle
- Pure functions preferred
- MUST have JSDoc for exported functions

**File Size Limits:**
- Components: 300 lines max
- Utilities: 200 lines max
- Pages: 400 lines max
- If exceeded: split into logical modules
- Current largest: `server/routes.ts` (835 lines - legacy, refactor later)

**Magic Numbers:**
- NEVER use unexplained numbers in code
- Define constants: `const MAX_RETRIES = 3`
- Use enums for related constants

**Logging Standards:**
- Development: console.log acceptable
- Production: ONLY Winston logger (`server/lib/logger.ts`)
- NEVER log: passwords, tokens, PII, API keys
- Log levels:
  - error: user-facing errors
  - warn: degraded functionality
  - info: key events (login, purchase)
  - debug: verbose details

## Project Structure

```
client/src/ (244 files)
├── components/
│   ├── ui/              # shadcn/ui (56 components)
│   ├── layout/          # Navigation, Footer
│   ├── analytics/       # ConsentBanner, Heatmap
│   ├── seo/             # MetaTags, StructuredData
│   └── resources/       # WhitepaperViewer
├── pages/               # 35 routes (lazy-loaded)
│   └── solutions/       # 17 industry/service pages
├── hooks/               # 7 custom hooks
├── lib/                 # 21 utilities (analytics, auth, validation, etc.)
├── data/                # 104 static TypeScript files
│   ├── portfolio/       # 8 project showcases
│   └── resources/
│       ├── blog-posts/      # 10 articles
│       ├── case-studies/    # 22 case studies
│       ├── quizzes/         # 12 interactive quizzes
│       ├── technology/      # 35 tech resources
│       └── whitepapers/     # 6 whitepapers
└── assets/optimized/    # WebP + AVIF images

server/ (26 files)
├── routes/              # API handlers
├── middleware/          # security.ts (Helmet, rate limiting, validation)
├── services/email/      # Modular email system (20+ files)
├── lib/                 # logger.ts (Winston)
├── auth.ts              # Passport.js + JWT
└── routes.ts            # Main route registration
```

## Tech Stack Deep Dive

**React Query Patterns:**
```typescript
// Query
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetchUser(userId),
});

// Mutation with optimistic update
const mutation = useMutation({
  mutationFn: updateUser,
  onMutate: async (newUser) => {
    await queryClient.cancelQueries({ queryKey: ['users'] });
    const previous = queryClient.getQueryData(['users']);
    queryClient.setQueryData(['users'], newUser);
    return { previous };
  },
  onError: (err, newUser, context) => {
    queryClient.setQueryData(['users'], context.previous);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
```

**Wouter Routing:**
```typescript
// Route params
<Route path="/blog/:slug" component={BlogPost} />
// Access in component
const [, params] = useRoute("/blog/:slug");
const slug = params.slug;

// Programmatic navigation
const [, setLocation] = useLocation();
setLocation('/dashboard');

// Query strings
const [location] = useLocation();
const params = new URLSearchParams(location.split('?')[1]);
```

**Zod Validation:**
```typescript
// Schema composition
const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

// Custom error messages
const schema = z.string().min(5, { message: "Must be 5+ chars" });

// Transform
const schema = z.string().transform(val => val.toLowerCase());
```

**Drizzle ORM Patterns:**
```typescript
// Query
const users = await db.select().from(usersTable).where(eq(usersTable.id, userId));

// Insert
await db.insert(usersTable).values({ name, email });

// Transaction
await db.transaction(async (tx) => {
  await tx.insert(users).values({ ... });
  await tx.insert(posts).values({ ... });
});
```

**Framer Motion Animations:**
```typescript
// Simple fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
/>

// Stagger children
<motion.ul variants={containerVariants}>
  {items.map(item => (
    <motion.li key={item.id} variants={itemVariants} />
  ))}
</motion.ul>

// Accessible animations (respect prefers-reduced-motion)
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

## Analytics System

**Core Implementation (`client/src/lib/analytics-tracker.ts:423 lines`):**
- Session management: unique IDs, duration, bounce rate
- Auto-tracks: page views, clicks, form submits, scroll depth (25/50/75/90/100%), visibility changes
- Data: device type, browser, OS, UTM params, referrer, geographic
- Privacy-first: Consent via ConsentBanner (`client/src/components/analytics/consent-banner.tsx`)
- Web Vitals: LCP, FID, CLS, FCP, TTFB (`client/src/lib/web-vitals.ts`)

**Usage:**
- `usePageTracking` hook: Auto-track page views
- Error isolation: `AnalyticsErrorBoundary` (never breaks UX)
- Consent: localStorage + IndexedDB

**API Endpoints:**
- POST /api/analytics/session
- POST /api/analytics/pageview
- POST /api/analytics/event
- POST /api/analytics/web-vitals

**Database:** pageViews, userSessions, analyticsEvents, webVitalsMetrics, analyticsGoals, goalConversions

## Development Workflows

**First-Time Setup:**
1. Verify Node.js 22.x: `node --version`
2. Install: `npm install`
3. Copy env: `cp .env.example .env`
4. Configure .env with credentials
5. Start Supabase: `npm run supabase:start`
6. Push schema: `npm run db:push`
7. Start dev: `npm run dev`
8. Open http://localhost:3000

**Common Issues:**

Port 3000 in use:
```bash
lsof -ti:3000 | xargs kill
# OR
cross-env PORT=3001 npm run dev
```

Hot reload not working:
```bash
# Stop server, clear cache, restart
rm -rf node_modules/.vite
npm run dev
```

TypeScript errors:
```bash
npm run check  # View all
# Fix issues
npm run check  # Verify
```

Service Worker issues:
```
DevTools → Application → Service Workers → Unregister → Hard refresh
```

**Debugging:**
- React DevTools: Component tree, props, state
- Browser DevTools: Network, Console, Sources
- Source maps: Enabled in dev mode
- Vite HMR: Check console for HMR errors

## Content Creation Workflows

**Adding Blog Post:**
1. Create: `client/src/data/resources/blog-posts/your-slug.ts`
2. Follow pattern in existing posts (export default BlogPost object)
3. Add to `blog-posts/index.ts` exports
4. Images: `assets/optimized/blog/` (WebP + fallback)

**Adding Case Study:**
1. Create: `client/src/data/resources/case-studies/industry-company.ts`
2. Match CaseStudy type interface
3. Add to `case-studies/index.ts`

**Adding Route/Page:**
1. Create: `client/src/pages/your-route.tsx`
2. Lazy load in `App.tsx`: `const YourRoute = lazy(() => import("@/pages/your-route"))`
3. Add route: `<Route path="/your-route" component={YourRoute} />`
4. Add navigation link in `Navigation.tsx` if needed

**Adding API Endpoint:**
1. Create handler: `server/routes/your-feature.ts`
2. Define Zod schema: `shared/schema.ts`
3. Register in `server/routes.ts`
4. Add validation middleware
5. Test with curl

**Adding Images:**
1. Original: `client/src/assets/images/`
2. Optimize: WebP + AVIF formats
3. Save to: `assets/optimized/`
4. Use with width/height attributes
5. Lazy load below fold

**Adding shadcn/ui Component:**
```bash
npx shadcn-ui@latest add component-name
# Adds to client/src/components/ui/
```

## Deployment (Vercel)

**Environment Variables REQUIRED:**
```bash
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password
SMTP_FROM=noreply@strivetech.ai
NODE_ENV=production
```

**Build Process:**
- Client: Vite → `dist/public/`
- Server: esbuild → `dist/index.js`
- PWA: Service worker → `dist/public/sw.js`
- Assets: Hashed filenames for cache busting

**Caching (`vercel.json`):**
- HTML/API: no-cache
- JS/CSS: 1 year immutable
- Images: 90 days
- Service Worker: no-cache + `Service-Worker-Allowed: /`

**Security Headers:**
- Helmet CSP (iframe support for Calendly, chatbot)
- HSTS: 1 year max-age
- X-Content-Type-Options: nosniff

**Preview Deployments:**
- Auto-deploy on PR creation
- URL: project-git-branch-user.vercel.app
- Test before merging

**Troubleshooting:**
- Build failures: Check Vercel dashboard logs
- 404 errors: Verify vercel.json rewrites
- Slow builds: Run `npm run build:analyze`
