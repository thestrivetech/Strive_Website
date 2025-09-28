# Session 2 Tasks - SaaS Platform Development

**Date:** January 2025
**Goal:** Complete Phase 1 Foundation and begin Phase 2 Core Application Interface
**Priority:** Setup database, authentication, and base dashboard shell

---

## 🎯 Session 2 Objectives

### Primary Goals
1. Setup Supabase database and connect to Prisma
2. Configure environment variables
3. Implement authentication middleware
4. Build base dashboard layout
5. Create routing structure for role-based dashboards

---

## 📋 Phase 1: Foundation Tasks (Priority 1)

### Database Setup
- [ ] Create new Supabase project for SaaS platform
- [ ] Configure `.env.local` with Supabase credentials
- [ ] Run `npx prisma migrate dev` to create database schema
- [ ] Verify all 13 models created successfully
- [ ] Setup Row Level Security (RLS) policies for multi-tenancy
- [ ] Test database connection with `npx prisma studio`

### Authentication Implementation
- [ ] Create Supabase auth client (`lib/auth/client.ts`)
- [ ] Implement auth middleware (`middleware.ts`)
  - Validate sessions
  - Check JWT tokens
  - Handle redirects for unauthenticated users
- [ ] Create auth utilities (`lib/auth/utils.ts`)
  - `getSession()`
  - `getUser()`
  - `requireAuth()`
- [ ] Setup RBAC foundation (`lib/auth/rbac.ts`)
  - Define roles: ADMIN, EMPLOYEE, CLIENT, VIEWER
  - Define tier access: FREE, BASIC, PRO, ENTERPRISE
  - Create permission checking functions

### Base Dashboard Layout
- [ ] Create root layout with providers (`app/layout.tsx`)
  - Supabase Provider
  - Theme Provider
  - Query Client Provider
- [ ] Build platform layout (`app/(platform)/layout.tsx`)
  - Sidebar navigation component
  - Top navigation bar
  - User menu dropdown
  - Organization switcher
- [ ] Create dashboard shell components:
  - `components/shared/layouts/dashboard-shell.tsx`
  - `components/shared/navigation/sidebar.tsx`
  - `components/shared/navigation/topbar.tsx`
  - `components/shared/navigation/user-menu.tsx`

### Routing Structure
- [ ] Setup route groups:
  - `(auth)` - Login, signup, password reset
  - `(platform)` - Protected dashboard routes
  - `api` - Webhook endpoints only
- [ ] Create placeholder pages:
  - `/dashboard/page.tsx` - Main dashboard
  - `/projects/page.tsx` - Projects list
  - `/crm/page.tsx` - CRM dashboard
  - `/settings/page.tsx` - User settings
- [ ] Implement route protection in middleware
- [ ] Add loading and error boundaries

---

## 📋 Phase 2: Core Application Interface Tasks (Priority 2)

### User Profile Management
- [ ] Create profile page (`app/(platform)/profile/page.tsx`)
- [ ] Build profile form with React Hook Form + Zod
- [ ] Implement Server Action for profile updates
- [ ] Add avatar upload with Supabase Storage
- [ ] Create profile completion indicator

### Organization Management
- [ ] Create organization context/provider
- [ ] Build organization creation flow
- [ ] Implement organization switcher component
- [ ] Add member invitation system
- [ ] Setup role assignment UI

### Dashboard Widgets
- [ ] Create widget grid system
- [ ] Build placeholder widgets:
  - Quick stats card
  - Recent activity feed
  - Task summary
  - Project overview
- [ ] Implement widget visibility based on role/tier

---

## 🛠️ Technical Tasks

### Component Migration
- [ ] Verify all 56 UI components work with Next.js 15
- [ ] Update any incompatible imports
- [ ] Fix hydration issues if present
- [ ] Ensure Server Component compatibility

### Performance Optimization
- [ ] Setup static/dynamic rendering strategies
- [ ] Implement Suspense boundaries
- [ ] Configure ISR where appropriate
- [ ] Add loading skeletons

### Testing Setup
- [ ] Configure Vitest for unit tests
- [ ] Setup Testing Library
- [ ] Write tests for auth utilities
- [ ] Test RBAC functions
- [ ] Create test database

---

## 📁 Files to Create/Modify

### New Files Needed
```
app/
├── middleware.ts
├── (auth)/
│   ├── login/page.tsx
│   └── layout.tsx
├── (platform)/
│   ├── layout.tsx
│   ├── dashboard/page.tsx
│   ├── projects/page.tsx
│   ├── crm/page.tsx
│   └── settings/page.tsx
lib/
├── auth/
│   ├── client.ts
│   ├── middleware.ts
│   ├── rbac.ts
│   └── utils.ts
├── database/
│   ├── prisma.ts
│   └── queries.ts
components/
├── shared/
│   ├── layouts/
│   │   └── dashboard-shell.tsx
│   └── navigation/
│       ├── sidebar.tsx
│       ├── topbar.tsx
│       └── user-menu.tsx
```

### Configuration Files
- [ ] Update `next.config.js` for Supabase integration
- [ ] Configure `middleware.ts` matcher patterns
- [ ] Setup `.env.local` with all required variables

---

## 🔄 Development Workflow

### Order of Implementation
1. **Database first** - Can't do anything without data layer
2. **Auth second** - Need to protect routes immediately
3. **Layout third** - Visual structure for all features
4. **Features last** - Build on solid foundation

### Testing Each Step
```bash
# After database setup
npx prisma studio  # Verify schema

# After auth setup
npm run dev
# Try accessing /dashboard (should redirect to login)

# After layout setup
# Should see sidebar, topbar, and content area

# After each feature
npm run lint && npx tsc --noEmit && npm test
```

---

## ⚠️ Critical Considerations

### Security
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client
- Implement RLS policies before going live
- Validate all inputs with Zod schemas
- Use Server Actions for mutations

### Performance
- Keep initial bundle under 500KB
- Use Server Components by default
- Implement proper caching strategies
- Monitor Core Web Vitals

### Multi-tenancy
- Every query must filter by `organization_id`
- RLS policies enforce data isolation
- Test with multiple organizations
- Verify no data leakage

---

## ✅ Session 2 Success Criteria

### Must Complete
- [ ] Database connected and migrations run
- [ ] Auth middleware protecting routes
- [ ] Basic dashboard layout rendering
- [ ] Role-based routing working

### Nice to Have
- [ ] Profile page functional
- [ ] Organization switcher working
- [ ] Some dashboard widgets showing data
- [ ] Tests passing

### Definition of Done
- All TypeScript errors resolved
- ESLint passing with no warnings
- Basic auth flow works end-to-end
- Dashboard accessible at `/dashboard`
- Can navigate between protected routes

---

## 📚 References

- [Prisma Schema](../app/prisma/schema.prisma)
- [Auth Requirements](../CLAUDE.md#authentication-flow)
- [RBAC Design](../feature-&-tool-marketplace.md)
- [Performance Standards](../README.md#performance-standards)

---

## 🚀 Next Session Preview (Session 3)

- Complete Phase 2 Core Application Interface
- Implement CRM system basics
- Add project management foundation
- Setup AI chat interface
- Begin tool marketplace UI

---

**Remember:** Focus on getting the foundation right. A solid base makes everything else easier.