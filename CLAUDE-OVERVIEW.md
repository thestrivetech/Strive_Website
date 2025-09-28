# CLAUDE.md

**Purpose:** Production-ready development guide for Strive Tech SaaS Platform

**Version:** 2.0.0
**Last Updated:** January 2025
**Status:** 🚀 Production Standards

---

## 🎯 Project Overview

**Strive Tech SaaS Platform** → `app.strivetech.ai`
- Enterprise B2B platform with AI-powered tools
- Multi-tenant architecture with 3-tier subscription model
- Built with Next.js 15.5.4 App Router

---

## 🛠 Tech Stack

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

---

## 📁 Project Structure

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
├── public/                       # Static assets
├── tests/
│   ├── unit/                     # Unit tests
│   ├── integration/              # Integration tests
│   └── e2e/                      # E2E tests
└── middleware.ts                 # Next.js middleware
```

---

## 🏗 Architecture Patterns

### 1. Data Fetching Hierarchy

```typescript
// 1. Server Components (default) - Direct DB access
async function DashboardPage() {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  return <Dashboard data={user} />;
}

// 2. Server Actions - Mutations with validation
'use server';
export async function updateProfile(data: FormData) {
  const validated = ProfileSchema.parse(data);
  await prisma.user.update({
    where: { id: userId },
    data: validated
  });
  revalidatePath('/profile');
}

// 3. Client Components - Interactive UI
'use client';
export function InteractiveChart() {
  const { data } = useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMetrics
  });
  return <Chart data={data} />;
}

// 4. API Routes - External integrations only
export async function POST(req: Request) {
  // Webhook handling
  const sig = req.headers.get('stripe-signature');
  // Process webhook...
}
```

### 2. Module Architecture

```typescript
// Each module is self-contained
// lib/modules/crm/index.ts

// Public API exports
export {
  // Actions
  createCustomer,
  updateCustomer,
  deleteCustomer,

  // Queries
  getCustomers,
  getCustomerById,

  // Schemas
  CustomerSchema,
  CustomerFilterSchema,

  // Types
  type Customer,
  type CustomerStatus
} from './internal';

// No cross-module imports
// ❌ import { something } from '@/lib/modules/projects'
// ✅ import { Customer } from '@prisma/client'
```

### 3. Error Handling Strategy

```typescript
// Global error boundary (app/error.tsx)
'use client';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <ErrorFallback
      error={error}
      resetErrorBoundary={reset}
    />
  );
}

// API error responses
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
  }
}

// Consistent error format
{
  error: {
    message: "User-friendly message",
    code: "ERROR_CODE",
    details: {} // Optional debug info
  }
}
```

### 4. Authentication Flow

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();

  if (!session && req.nextUrl.pathname.startsWith('/(platform)')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // RBAC check
  if (session) {
    const hasAccess = await checkRBAC(session.user, req.nextUrl.pathname);
    if (!hasAccess) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return res;
}
```

---

## 🔒 Security Requirements

### Core Security

```typescript
// 1. Input validation (ALWAYS)
const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(['ADMIN', 'MEMBER', 'VIEWER'])
});

// 2. SQL injection prevention (via Prisma)
// ✅ prisma.user.findMany({ where: { name: userInput }})
// ❌ prisma.$queryRaw(`SELECT * FROM users WHERE name = '${userInput}'`)

// 3. XSS prevention
// ✅ <div>{userContent}</div>  // React escapes by default
// ❌ <div dangerouslySetInnerHTML={{ __html: userContent }} />

// 4. CSRF protection
// Handled by Supabase Auth + SameSite cookies

// 5. Rate limiting
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  const identifier = req.ip ?? 'anonymous';
  const { success } = await rateLimit(identifier);

  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }
}
```

### Multi-tenancy Security

```sql
-- Row Level Security (RLS) policies
CREATE POLICY "Users can only see their org data"
ON projects
FOR SELECT
USING (organization_id = current_user_organization());

CREATE POLICY "Users can only modify their org data"
ON projects
FOR ALL
USING (organization_id = current_user_organization());
```

### Environment Security

```bash
# .env.local (development only)
DATABASE_URL="..."
SUPABASE_SERVICE_ROLE_KEY="..." # NEVER expose to client

# Production (use Vercel env vars)
# Rotate secrets quarterly
# Use different keys per environment
```

---

## 🚀 Performance Standards

### Core Web Vitals Targets

```yaml
LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay): < 100ms
CLS (Cumulative Layout Shift): < 0.1
TTFB (Time to First Byte): < 600ms
```

### Optimization Patterns

```typescript
// 1. Server Components (default)
// 80% of components should be Server Components

// 2. Image optimization
import Image from 'next/image';
<Image
  src="/hero.jpg"
  alt="..."
  width={1200}
  height={600}
  priority // For above-fold images
/>

// 3. Code splitting
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  {
    loading: () => <Skeleton />,
    ssr: false // Client-only component
  }
);

// 4. Data caching
export const revalidate = 3600; // ISR: 1 hour
// or
export const dynamic = 'force-static'; // Static generation

// 5. Streaming with Suspense
<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>
```

---

## 🧪 Testing Requirements

### Coverage Targets

```yaml
Unit Tests: 80% (statements, branches)
Integration: All Server Actions + API routes
E2E: Critical user flows
```

### Testing Patterns

```typescript
// Unit test (Jest)
describe('CustomerService', () => {
  it('should create customer with valid data', async () => {
    const customer = await createCustomer({
      name: 'Test Corp',
      email: 'test@example.com'
    });
    expect(customer).toHaveProperty('id');
  });
});

// Integration test
describe('POST /api/webhooks/stripe', () => {
  it('should process payment webhook', async () => {
    const response = await POST(mockStripeWebhook);
    expect(response.status).toBe(200);
  });
});

// E2E test (Playwright)
test('user can complete onboarding', async ({ page }) => {
  await page.goto('/signup');
  await page.fill('[name="email"]', 'test@example.com');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

---

## 🔄 Development Workflow

### Git Conventions

```bash
# Branch naming
feature/[JIRA-123]-add-customer-search
bugfix/[JIRA-456]-fix-auth-redirect
hotfix/[JIRA-789]-patch-security

# Commit format (Conventional Commits)
feat(crm): add customer search functionality
fix(auth): resolve redirect loop on login
docs(api): update webhook documentation
refactor(dashboard): optimize chart rendering
test(payments): add Stripe webhook tests
chore(deps): update dependencies

# PR checklist
- [ ] Tests pass (npm test)
- [ ] Types check (npx tsc --noEmit)
- [ ] Linting passes (npm run lint)
- [ ] No console.logs
- [ ] Migrations reviewed
- [ ] Security considered
```

### Development Commands

```bash
# Setup
npm install              # Install dependencies
npx prisma generate      # Generate Prisma client
npx prisma migrate dev   # Run migrations

# Development
npm run dev              # Start dev server
npx prisma studio        # Database GUI
npm run lint:fix         # Fix linting issues

# Testing
npm test                 # Run all tests
npm run test:unit        # Unit tests only
npm run test:e2e         # E2E tests
npm run test:coverage    # Coverage report

# Pre-commit
npm run typecheck        # TypeScript check
npm run lint             # ESLint
npm run test:unit        # Unit tests

# Production
npm run build            # Production build
npm start                # Start production server
```

---

## 📊 Monitoring & Observability

### Logging Standards

```typescript
// Structured logging
logger.info({
  event: 'customer.created',
  userId: session.user.id,
  customerId: customer.id,
  timestamp: new Date().toISOString()
});

// Error logging
logger.error({
  error: error.message,
  stack: error.stack,
  context: { userId, action }
});
```

### Metrics to Track

```yaml
Application:
  - Request latency (p50, p95, p99)
  - Error rate by endpoint
  - Active users (DAU/MAU)
  - API usage by tier

Business:
  - Conversion funnel
  - Feature adoption
  - Churn rate
  - Revenue per tier

Infrastructure:
  - Database query time
  - Cache hit rate
  - AI token usage
  - Storage usage
```

---

## 🚦 Pre-Production Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Error boundaries in place
- [ ] Monitoring configured (Sentry, Analytics)
- [ ] Database migrations tested
- [ ] Environment variables secured
- [ ] SSL certificates valid
- [ ] CORS properly configured
- [ ] Backup strategy defined
- [ ] Rollback plan documented
- [ ] Load testing completed
- [ ] Documentation updated
- [ ] Team notified

---

## 🔧 Troubleshooting Guide

### Common Issues

```typescript
// 1. Prisma client not found
Solution: npx prisma generate

// 2. Type errors after schema change
Solution: npx prisma generate && restart TS server

// 3. Hydration mismatch
Solution: Ensure consistent data between server/client

// 4. Auth redirect loop
Solution: Check middleware and cookie settings

// 5. Slow queries
Solution: Add indexes, use select/include properly
```

---

## 📝 Session Checklist

Before starting any task:

- [ ] Using Server Components by default?
- [ ] Server Actions for mutations?
- [ ] Zod validation on all inputs?
- [ ] Error boundaries in place?
- [ ] Following file size limits (200/300 lines)?
- [ ] No cross-module imports?
- [ ] Tests written for new code?
- [ ] Security considered (XSS, CSRF, SQL)?
- [ ] Performance impact assessed?
- [ ] Will run `npm run lint && npx tsc --noEmit`?

---

## 🎯 Core Principles

1. **Server-first architecture** - Minimize client-side JavaScript
2. **Type safety everywhere** - TypeScript + Zod validation
3. **Security by default** - Never trust user input
4. **Performance budgets** - Monitor and optimize
5. **Test-driven development** - Write tests first
6. **Clean architecture** - Separation of concerns
7. **Progressive enhancement** - Works without JavaScript
8. **Accessibility first** - WCAG 2.1 AA compliance
9. **Documentation as code** - Keep docs in sync
10. **Continuous improvement** - Measure and iterate

---

**Remember:** This is a production system. Every line of code should be secure, performant, and maintainable. When in doubt, choose the more robust solution.