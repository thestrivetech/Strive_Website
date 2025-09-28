# CLAUDE-CONCISE.md

**Claude's Session Memory | v2.0 | Production Standards**

---

## 🎯 PROJECT: Strive Tech SaaS Platform

**Location:** `app/` → app.strivetech.ai
**Stack:** Next.js 15.5.4 + React 19.1.0 + TypeScript + Prisma + Supabase
**Focus:** Enterprise B2B, Multi-tenant, 3-tier subscriptions, and used internally by Strive Tech daily (employees & admins)

> **NOTE:** `old/` = legacy marketing site (DO NOT MODIFY unless asked)

---

## ⚡ TECH STACK

```yaml
Core: Next.js 15.5.4, React 19.1.0, TypeScript 5.6+
Database: PostgreSQL (Supabase) + Prisma 6.16.2
Auth: Supabase Auth (JWT in httpOnly cookies)
State: TanStack Query (server) + Zustand (client, if needed)
Forms: React Hook Form + Zod
AI: OpenRouter + Groq
Payments: Stripe
Testing: Jest + React Testing Library (80% min) + Playwright
```
## 🎨 DESIGN SYSTEM (Must Match Old Site)

**CRITICAL: Use exact colors from `old/client/src/index.css`**

```css
/* Core Brand Colors */
--primary: hsl(18, 100%, 60%);        /* #FF7033 - Strive Orange */
--background: hsl(222, 84%, 4.9%);    /* #020A1C - Deep Navy */
--foreground: hsl(210, 40%, 98%);     /* Light text */
--card: hsl(222, 84%, 5.9%);
--accent: hsl(217, 32%, 17%);
--border: hsl(217, 32%, 17%);
--ring: hsl(18, 100%, 60%);           /* Orange focus */

/* Gradient for CTAs */
bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600
```

**Requirements:**
- Dark navy background (#020A1C) by default
- Orange (#FF7033) for all CTAs and primary actions
- Copy ALL variables from old/client/src/index.css
- Look at old sites hero section for gradient design if you can't match it with the above brand colors
- Maintain brand consistency across both sites
---

## 📁 STRUCTURE

```
app/
├── app/(auth)/          # Login routes
├── app/(platform)/      # Protected: dashboard, crm, projects, ai, tools
├── app/api/             # Webhooks ONLY
├── components/
│   ├── ui/              # shadcn
│   ├── features/        # Feature-specific
│   └── shared/          # Layouts, nav
├── lib/modules/[feat]/  # Self-contained modules
│   ├── actions/         # Server Actions
│   ├── queries/         # Data fetching
│   ├── schemas/         # Zod
│   └── index.ts         # Public API
└── middleware.ts        # Auth + RBAC
```

---

## 🔴 CRITICAL RULES

### DEFAULT: Server Components ALWAYS
```typescript
// DEFAULT - no directive needed
async function Page() {
  const data = await prisma.user.findMany(); // ✅ Direct DB
  return <div>{data}</div>;
}

// ONLY add "use client" for:
// - useState, useEffect, or any hooks
// - onClick, onChange, or any event handlers
// - Browser APIs (window, document)
// - Third-party client libraries
```

### Data Fetching Hierarchy
1. **Server Components** (default) → Direct DB access
2. **Server Actions** → Mutations with validation
3. **Client Components** → Interactive UI only
4. **API Routes** → Webhooks ONLY

### Architecture Laws
- **NO cross-module imports** (`crm/` ❌→ `projects/`)
- **File limits:** Components 200 lines, Services 300 lines
- **Edit existing files** - don't create new ones unless necessary

### Single Source of Truth
- **Database:** Prisma ONLY (no Drizzle, no raw SQL)
- **Auth:** Supabase Auth ONLY
- **Types:** `@prisma/client` ONLY
- **Validation:** Zod ALWAYS

---

## 🔒 SECURITY MANDATES

```typescript
// 1. ALWAYS validate input
const schema = z.object({ email: z.string().email() });

// 2. SQL injection prevention
✅ prisma.user.findMany({ where: { name }})
❌ prisma.$queryRaw(`SELECT * WHERE name='${name}'`)

// 3. XSS prevention
✅ <div>{userContent}</div>
❌ dangerouslySetInnerHTML={{ __html: userContent }}

// 4. Rate limiting
if (!await rateLimit(id)) return new Response('429', { status: 429 });

// 5. Multi-tenancy (RLS)
CREATE POLICY "tenant_isolation" ON tables USING (org_id = current_org());
```

**NEVER expose:** `SUPABASE_SERVICE_ROLE_KEY`

---

## 🚀 PERFORMANCE TARGETS

```yaml
LCP: < 2.5s
FID: < 100ms
CLS: < 0.1
Bundle: < 500kb
Server Components: 80%+
```

```typescript
// Always optimize
import Image from 'next/image'; // ✅
<img src="..." /> // ❌

import { debounce } from 'lodash-es'; // ✅
import _ from 'lodash'; // ❌

const Heavy = dynamic(() => import('./Heavy'), { ssr: false }); // ✅
```

---

## ✅ PRE-COMMIT CHECKLIST

**MANDATORY before ANY commit:**
```bash
npm run lint        # Zero warnings
npx tsc --noEmit    # Zero errors
npm test            # 80% coverage
```

**Ask yourself:**
- [ ] Server Component or needs "use client"?
- [ ] Input validated with Zod?
- [ ] No cross-module imports?
- [ ] Files under 200/300 lines?
- [ ] Security considered (XSS, CSRF, SQL)?
- [ ] Performance impact assessed?

---

## 🛠 COMMANDS

```bash
# Setup
npx prisma generate && npx prisma migrate dev

# Development
npm run dev          # Turbopack dev server
npx prisma studio    # Database GUI

# Pre-commit (ALWAYS)
npm run lint && npx tsc --noEmit && npm test
```

---

## 🎯 CORE PRINCIPLES

1. **Server-first** - Minimize client JS
2. **Type safety** - TypeScript + Zod everywhere
3. **Security by default** - Never trust input
4. **Test-driven** - Write tests first
5. **Clean architecture** - Separation of concerns
6. **One solution per problem** - No duplicates
7. **Production mindset** - Every line matters

---

## 📋 MODULE PATTERN

```typescript
// lib/modules/crm/index.ts (Public API)
export { createCustomer, getCustomers } from './actions';
export { CustomerSchema } from './schemas';
export type { Customer } from '@prisma/client';

// NO cross-imports between modules!
```

---

## ❌ NEVER DO THIS

```typescript
// Anti-patterns to AVOID
❌ Creating files in root directory (no logs, .md files, images)
❌ import from '../modules/other-module' (cross-module)
❌ prisma.$queryRaw with string interpolation
❌ "use client" without a valid reason
❌ <img> instead of Next.js Image
❌ API routes for internal data fetching
❌ Multiple auth systems or database clients
❌ Files over 200/300 lines
❌ Skipping Zod validation
❌ Committing without lint + typecheck
```

---

## 🔗 QUICK REFS

- **Tiers:** T1 ($299) 3 tools | T2 ($699) 10 tools | T3 (Custom) unlimited
- **Models:** User, Organization, Customer, Project, Task, AIConversation (13 total)
- **Docs:** `CLAUDE.md` (full), `DASHBOARD_BUILD_PLAN.md`, `feature-&-tool-marketplace.md`

---

## 🎯 DECISION TREE

**Need to fetch data?** → Server Component (default)
**Need to mutate data?** → Server Action
**Need interactivity?** → "use client" Component
**External webhook?** → API Route
**File too big?** → Split it
**Cross-module data?** → Use @prisma/client types

---

**Remember:** This is PRODUCTION. Secure > Fast > Pretty. No shortcuts.