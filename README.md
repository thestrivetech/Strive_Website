# Strive Tech Platform

**Enterprise B2B SaaS Platform with AI-Powered Tools**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16.2-green)](https://www.prisma.io/)

---

## Project Overview

**Strive Tech SaaS Platform** (`app/`) → `app.strivetech.ai`
- Enterprise B2B platform with AI-powered tools
- Multi-tenant architecture with 3-tier subscription model
- Built with Next.js 15.5.4 App Router
- Production-ready with comprehensive security and performance standards

**Legacy Marketing Website** (`old/`) → `strivetech.ai`
- To be migrated/integrated with SaaS platform in future
- Legacy React app (not actively developed)
- **DO NOT MODIFY** unless explicitly requested

---

## Tech Stack

### SaaS Platform (app/) - PRIMARY FOCUS

```yaml
# Core
Framework: Next.js 15.5.4 (App Router)
Runtime: React 19.1.0
Language: TypeScript 5.6+
Styling: Tailwind CSS 4.0 + shadcn/ui

# Data Layer
Database: PostgreSQL (via Supabase)
ORM: Prisma 6.16.2
Caching: Next.js Cache + React Query

# Authentication & Security
Auth: Supabase Auth (built-in JWT)
Sessions: httpOnly cookies
Security: Helmet.js + CORS + CSRF

# State Management
Server State: TanStack Query
Client State: Zustand (when needed)
Forms: React Hook Form + Zod

# AI Integration
Providers: OpenRouter + Groq
Models: GPT-4, Claude 3.5, Llama 3.3

# Payments
Provider: Stripe
Webhooks: Stripe CLI (dev) / Webhook endpoints (prod)

# Testing
Unit/Integration: Jest + React Testing Library
E2E: Playwright
Coverage: 80% minimum

# Monitoring
Analytics: Vercel Analytics
Errors: Sentry
Logs: Structured JSON
```

### Legacy Marketing Website (old/) - MAINTENANCE ONLY
- Legacy React + Express.js
- PostgreSQL via Supabase (separate DB)
- Drizzle ORM + Passport.js auth
- To be migrated to match SaaS architecture

---

## Project Structure

### Root Directory
```
/
├── old/                 # Legacy marketing website (React)
├── app/                 # SaaS platform (Next.js 15)
├── docs/                # Documentation (future)
├── .env                 # Environment variables (gitignored)
├── .gitignore
└── [essential configs only]
```

### Marketing Website (old/)
```
old/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components (shadcn/ui)
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities
│   │   ├── App.tsx      # Root component with routing
│   │   └── sw.ts        # Service worker (PWA)
├── server/              # Express backend
│   ├── routes/          # API route handlers
│   ├── services/        # Business logic services
│   ├── middleware/      # Express middleware
│   ├── lib/             # Server utilities
│   ├── index.ts         # Server entry point
│   ├── auth.ts          # Passport authentication
│   └── routes.ts        # Route definitions
├── shared/              # Shared code
│   └── schema.ts        # Drizzle database schema
└── scripts/             # Utility scripts
```

### SaaS Platform (app/) - Production Architecture

```
app/
├── app/                           # Next.js App Router
│   ├── (auth)/                   # Auth routes (login, signup, reset)
│   │   └── layout.tsx            # Minimal auth layout
│   ├── (platform)/               # Protected platform routes
│   │   ├── dashboard/            # Role-based dashboards
│   │   ├── crm/                  # CRM system
│   │   ├── projects/             # Project management
│   │   ├── ai/                   # AI assistant (Sai)
│   │   ├── tools/                # Tool marketplace
│   │   ├── settings/             # User/org settings
│   │   └── layout.tsx            # Platform layout with sidebar
│   ├── api/                      # API routes (webhooks only)
│   │   ├── webhooks/
│   │   │   ├── stripe/           # Payment webhooks
│   │   │   └── supabase/         # Auth webhooks
│   │   └── health/               # Health check endpoint
│   ├── layout.tsx                # Root layout
│   ├── error.tsx                 # Global error boundary
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── features/                 # Feature-specific components
│   │   ├── crm/
│   │   ├── projects/
│   │   └── ai/
│   └── shared/                   # Shared components
│       ├── layouts/
│       ├── navigation/
│       └── errors/
├── lib/
│   ├── modules/                  # Feature modules
│   │   └── [feature]/
│   │       ├── actions/          # Server Actions
│   │       ├── queries/          # Data queries
│   │       ├── schemas/          # Zod schemas
│   │       ├── hooks/            # Custom hooks
│   │       ├── types/            # TypeScript types
│   │       └── index.ts          # Public API
│   ├── auth/                     # Auth utilities
│   │   ├── client.ts             # Supabase client
│   │   ├── middleware.ts         # Auth middleware
│   │   └── rbac.ts               # Role-based access
│   ├── database/
│   │   ├── prisma.ts             # Prisma client
│   │   └── queries.ts            # Common queries
│   └── utils/                    # Shared utilities
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Migration files
│   └── seed.ts                   # Seed data
├── tests/
│   ├── unit/                     # Unit tests
│   ├── integration/              # Integration tests
│   └── e2e/                      # E2E tests
└── middleware.ts                 # Next.js middleware
```

**Architecture Notes:**
- **Feature-first organization**: Each business feature is a self-contained module
- **Role-Based Access Control (RBAC)**: Controls which modules users can access based on role and subscription tier
- **Configurable dashboard**: Main dashboard at `/dashboard` shows widgets from enabled modules based on user's industry and subscription tier
- **Modular components**: Each feature module has its own component directory
- **Centralized business logic**: All data access and business logic in `lib/modules/`

---

## Common Development Commands

### Marketing Website (old/)

```bash
# Development
npm run dev              # Start dev server (tsx server/index.ts)

# Building
npm run build            # Build React app + Express server
npm run build:analyze    # Build with bundle analysis

# Type Checking
npm run check            # TypeScript type checking

# Database
npm run db:push          # Push Drizzle schema changes
npm run db:migrate       # Run Supabase migrations
npm run supabase:start   # Start local Supabase

# Testing
npm run test             # Run tests
npm run test:e2e         # Run Playwright e2e tests
npm run test:coverage    # Generate coverage report

# Production
npm start                # Start production server
```

### SaaS Platform (app/)

```bash
# Setup
npm install              # Install dependencies
npx prisma generate      # Generate Prisma client
npx prisma migrate dev   # Run migrations

# Development
npm run dev              # Start dev server (Turbopack)
npx prisma studio        # Database GUI
npm run lint:fix         # Fix linting issues

# Testing
npm test                 # Run all tests
npm run test:unit        # Unit tests only
npm run test:e2e         # E2E tests
npm run test:coverage    # Coverage report

# Pre-commit (ALWAYS RUN)
npm run lint             # ESLint
npx tsc --noEmit         # TypeScript check
npm run test:unit        # Unit tests

# Production
npm run build            # Production build
npm start                # Start production server
```

---

## Critical Development Rules

### 🚫 Project Organization (NEVER DO THIS)

- ❌ **NEVER** create random files in root directory
  - No session logs, chat_logs, random .md files
  - No image.png, test-results.json, etc.
- ❌ **NEVER** commit AI tool configs to source control
  - .claude/, .serena/ must be in .gitignore
- ❌ **NEVER** create monolithic "god files" over 300 lines
- ❌ **NEVER** mix business logic with UI components
- ❌ **NEVER** create duplicate solutions (multiple DB clients, auth systems)

### ✅ Project Organization (DO THIS)

- ✅ All documentation goes in `docs/` directory
- ✅ Keep root directory clean (only essential config files)
- ✅ One file, one responsibility (Single Responsibility Principle)
- ✅ Files under 300 lines - split into smaller modules if exceeding
- ✅ Separate concerns: UI in `components/`, logic in `lib/`, types in `types/`

---

## Architecture Best Practices

### Modular Design (CRITICAL)

**The old codebase failed due to monolithic files. Follow these rules strictly:**

1. **Feature Module Pattern** (for `app/`)
   ```
   lib/modules/crm/
   ├── services/        # Business logic
   ├── queries/         # Database queries
   ├── mutations/       # Database mutations
   ├── types.ts         # Module-specific types
   └── index.ts         # Public API
   ```

2. **Component Organization**
   - Keep components under 200 lines
   - Break into smaller, composable pieces
   - Separate presentational from container components
   - Co-locate related components in feature directories

3. **Business Logic Separation**
   - All data access in `lib/modules/[feature]/`
   - Never inline database queries in components
   - Use repository pattern for data access
   - Keep services pure and testable

4. **File Size Limits**
   - Components: 200 lines max
   - Services: 300 lines max
   - If exceeding, split into multiple files

### Dependency Management

**Production mindset - every dependency is a liability:**

- ✅ **Check existing dependencies first** before adding new ones
- ✅ **Justify each new package** - document why it's needed
- ✅ **Audit bundle impact** - check size before committing
- ✅ **Security audit** - check for known vulnerabilities
- ❌ **NEVER install multiple solutions for the same problem**

**Dependency Checklist:**
```yaml
Before adding:
  - Can existing deps solve this?
  - Can we build it in <100 lines?
  - Is it actively maintained?
  - Weekly downloads > 100k?
  - Last publish < 6 months?
  - Bundle size < 50kb?
  - Tree-shakeable?
  - TypeScript support?
```

### Single Source of Truth

**The old codebase mixed multiple solutions. Follow these strictly:**

#### For SaaS Platform (app/):
- ✅ **Database:** Prisma 6.16.2 + Supabase PostgreSQL
  - Single source of truth: `app/prisma/schema.prisma`
  - Row Level Security (RLS) for multi-tenancy
- ✅ **Authentication:** Supabase Auth (built-in JWT)
  - httpOnly cookies for sessions
  - Auth middleware in `middleware.ts`
  - RBAC enforcement in all routes
- ✅ **State Management:**
  - Server state: TanStack Query
  - Client state: Zustand (only when needed)
  - Forms: React Hook Form + Zod
- ✅ **Data Fetching Hierarchy:**
  1. Server Components (default) - Direct DB
  2. Server Actions - Mutations
  3. Client Components - Interactive UI
  4. API Routes - Webhooks only

#### For Marketing Website (old/):
- Keep existing stack (Drizzle + Passport) - DO NOT CHANGE
- Only make changes when explicitly requested

### Code Quality Gates

**Pre-commit Checklist (MANDATORY):**

```bash
# Run ALL before pushing
npm run lint             # Must pass - no warnings
npx tsc --noEmit         # Must pass - zero errors
npm run test:unit        # Must pass - 80% coverage
```

**Testing Requirements:**
```yaml
Coverage Targets:
  Unit: 80% (statements, branches)
  Integration: All Server Actions + API routes
  E2E: Critical user flows (auth, payment, core features)

Test Organization:
  - tests/unit/          # Unit tests
  - tests/integration/   # Integration tests
  - tests/e2e/           # Playwright E2E
  - *.test.ts            # Co-located tests
```

### Performance Standards

**Core Web Vitals (MANDATORY):**
```yaml
Targets:
  LCP: < 2.5s        # Largest Contentful Paint
  FID: < 100ms       # First Input Delay
  CLS: < 0.1         # Cumulative Layout Shift
  TTFB: < 600ms      # Time to First Byte
  Bundle: < 500kb    # Initial JS load
```

**Optimization Patterns:**
```typescript
// 1. Server Components by default (80% of components)
// 2. Dynamic imports for heavy features
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { loading: () => <Skeleton />, ssr: false }
);

// 3. Image optimization ALWAYS
import Image from 'next/image';
<Image src="..." alt="..." width={...} height={...} priority />

// 4. Tree-shaking imports
import { debounce } from 'lodash-es';  // ✅
import _ from 'lodash';                 // ❌

// 5. Streaming with Suspense
<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>
```

---

## Environment Variables

### Marketing Website (old/.env)
```bash
PORT=3000
SITE_URL=http://localhost:3000
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SMTP_HOST=smtp.gmail.com
SMTP_USER=...
SMTP_PASS=...
SESSION_SECRET=...
JWT_SECRET=...
NODE_ENV=development
```

### SaaS Platform (app/.env.local)
```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Supabase (SaaS DB)
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..." # NEVER expose to client

# AI Providers
OPENROUTER_API_KEY="..."          # Multi-model gateway
GROQ_API_KEY="..."                # Fast open-source models

# Stripe
STRIPE_SECRET_KEY="..."
STRIPE_WEBHOOK_SECRET="..."

# App
NEXT_PUBLIC_APP_URL="https://app.strivetech.ai"
NODE_ENV="development"

# Security Note: Rotate all secrets quarterly
# Use different keys per environment (dev/staging/prod)
```

---

## Path Aliases

### Marketing Website (old/)
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

### SaaS Platform (app/)
- `@/*` → `app/*` (app root)

---

## Database Architecture

### Marketing Website
- **Database:** Existing Supabase DB
- **ORM:** Drizzle (`shared/schema.ts`)
- **Tables:** users, contact_submissions, newsletter_subscriptions, requests, page_views, user_sessions

### SaaS Platform (NEW Database)
- **Database:** Separate Supabase DB
- **ORM:** Prisma (`app/prisma/schema.prisma`)
- **Tables:**
  - Core: users, organizations, organization_members, subscriptions, usage_tracking
  - CRM: customers, leads, contacts, notes
  - Projects: projects, tasks, time_entries, milestones
  - AI: ai_conversations, ai_tools, active_tools, tool_usage
  - System: activity_logs, notifications, invitations

**IMPORTANT:** Two separate databases. User data synced on signup.

---

## Subscription Tiers & Access Control

The SaaS platform has **3 subscription tiers** with different module access:

- **Tier 1 ($299-$499):** Basic dashboard, limited modules, best for solopreneurs & startups
- **Tier 2 ($699-$1,000):** Industry-specific dashboard, more modules, best for SMEs & growth
- **Tier 3 (Enterprise):** Fully customized dashboard, all modules, custom workflows

**RBAC Implementation:**
- Middleware checks user role and subscription tier
- Each route protected by role/tier requirements
- Dashboard shows only modules user has access to
- Module access controlled via `lib/rbac.ts`

---

## Testing Strategy

### Unit Tests
- Test business logic in `lib/modules/`
- Test utilities and helpers
- Mock external dependencies (DB, APIs)

### Integration Tests
- Test API routes with real database (test DB)
- Test authentication flows
- Test RBAC enforcement

### E2E Tests (Playwright)
- Test critical user flows
- Test across subscription tiers
- Test role-based access

**Coverage Goals:**
- Minimum 80% for new code
- 100% for critical paths (auth, billing, RBAC)

---

## Security Requirements

### Core Security Checklist
```typescript
// 1. Input validation (ALWAYS)
const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100)
});

// 2. SQL injection prevention
✅ prisma.user.findMany({ where: { name: input }})
❌ prisma.$queryRaw(`SELECT * WHERE name = '${input}'`)

// 3. XSS prevention
✅ <div>{userContent}</div>  // React escapes
❌ dangerouslySetInnerHTML={{ __html: userContent }}

// 4. Rate limiting
const { success } = await rateLimit(identifier);
if (!success) return new Response('Too Many Requests', { status: 429 });
```

### Multi-tenancy Security (RLS)
```sql
CREATE POLICY "Tenant isolation"
ON all_tables
USING (org_id = current_user_org());
```

### Environment Security
- Rotate secrets quarterly
- Use different keys per environment
- Never expose SERVICE_ROLE_KEY to client
- Enable audit logging for all data access

---

## Deployment

### Marketing Website
- **Platform:** Vercel
- **Environment:** Production config in `.env.production`
- **Domain:** `strivetech.ai`

### SaaS Platform
- **Platform:** Vercel
- **Environment:** Set in Vercel dashboard
- **Domain:** `app.strivetech.ai`
- **Cookie sharing:** Domain set to `.strivetech.ai` for auth

---

## Core Development Principles

### 🎯 Production Mindset
1. **Server-first architecture** - Minimize client-side JavaScript
2. **Type safety everywhere** - TypeScript + Zod validation
3. **Security by default** - Never trust user input
4. **Performance budgets** - Monitor Core Web Vitals
5. **Test-driven development** - Write tests first
6. **Clean architecture** - Separation of concerns
7. **Progressive enhancement** - Works without JavaScript
8. **Accessibility first** - WCAG 2.1 AA compliance
9. **Documentation as code** - Keep docs in sync
10. **Continuous improvement** - Measure and iterate

### ⚠️ Critical Rules
- **File size limits:** Components 200 lines, Services 300 lines
- **No cross-module imports** - Modules are self-contained
- **One solution per problem** - No duplicate dependencies
- **Always run pre-commit checks** - lint, typecheck, test
- **Server Components by default** - "use client" only when needed
- **API routes for webhooks only** - Use Server Actions for mutations

### 📋 Session Checklist
Before completing any task:
- [ ] Lint passes with no warnings
- [ ] TypeScript has zero errors
- [ ] Tests pass with 80% coverage
- [ ] Security considered (XSS, CSRF, SQL)
- [ ] Performance impact assessed
- [ ] No cross-module imports
- [ ] Files under size limits

**Remember:** This is a production system. Every line of code should be secure, performant, and maintainable.