# SaaS Application Build Plan

**Project:** Strive Tech SaaS Platform (app.strivetech.ai)
**Framework:** Next.js 15 + App Router
**Status:** 🚧 In Progress

---

## Architecture Overview

### Deployment Structure
- **Marketing Site:** `strivetech.ai` (existing React site in `old/` - legacy, not actively developed)
- **SaaS Platform:** `app.strivetech.ai` (new Next.js 15 app in `app/`)
  - Contains: Admin dashboard, client portal, employee workspace, CRM, projects, AI tools

### Authentication
- Shared auth via cookies (domain: `.strivetech.ai`)
- Login/signup on marketing site → redirects to app
- App validates JWT from marketing site

### Databases
- **Existing DB:** Marketing site (contact forms, analytics) - UNCHANGED
- **New DB:** SaaS platform (organizations, projects, CRM, AI tools)
- User sync on signup between both databases

### Multiple Dashboard Types Within the APP
The `app/` directory contains multiple dashboard experiences within the application:
- **Admin Dashboard:** Full system access, user management, analytics
- **Employee Dashboard:** Project management, CRM, time tracking
- **Client Portal:** Project visibility, communication, invoices
- All share the same database and infrastructure but have role-based views

### Design System
- Reuse shadcn/ui components from `old/client/src/components/ui/`
- Maintain consistent UI/UX with marketing site
- Add new app-specific components as needed (dashboards, CRM, project views)

---

## Phase 1: Foundation (Week 1-2) - **35% Complete**

### ✅ Completed Tasks
- [x] Initialize Next.js 15 app with App Router
- [x] Setup TypeScript configuration
- [x] Create comprehensive Prisma schema (13 models)
- [x] Copy 56 UI components from old/client/src/components/ui
- [x] Setup basic project dependencies (Prisma, Supabase, shadcn utilities)
- [x] Create environment template (.env.local.example)

### 🚧 In Progress
- [ ] Setup Tailwind CSS configuration with brand colors
- [ ] Reorganize components into proper folder structure (ui/, features/, layouts/)
- [ ] Create new Supabase database for the app

### 📋 Pending Tasks
- [ ] Configure environment variables with new database credentials
- [ ] Setup Supabase client (app/lib/supabase.ts)
- [ ] Run Prisma migrations to create database tables
- [ ] Implement auth verification middleware
- [ ] Build base dashboard layout (sidebar, topbar, navigation)
- [ ] Create auth verification API route
- [ ] Design app routing structure for different roles
- [ ] Implement user profile page
- [ ] Create organization/workspace selector

---

## Phase 2: Core Application Interface (Week 3-4)

### 📋 Tasks
- [ ] Build main dashboard home page with widgets
- [ ] Implement user profile management UI
- [ ] Create organization management (create, invite, roles)
- [ ] Add team member management interface
- [ ] Build settings page (account, preferences, security)
- [ ] Implement notification system
- [ ] Create activity feed component

---

## Phase 3: SaaS Features (Week 5-8)

### 📋 CRM System
- [ ] Customer list view with filters/search
- [ ] Customer detail pages
- [ ] Lead tracking and pipeline visualization
- [ ] Contact history and notes
- [ ] Customer segmentation and tags
- [ ] Sales pipeline Kanban board

### 📋 Project & Task Management
- [ ] Project list and creation flow
- [ ] Kanban board for tasks
- [ ] Task detail modal with assignments
- [ ] Time tracking integration
- [ ] Project templates
- [ ] Progress tracking and reporting

### 📋 AI Integration (Sai Assistant)
- [ ] Chat interface in the app
- [ ] OpenRouter integration (multi-model support)
- [ ] Groq integration (fast open-source models)
- [ ] Model selection UI (tier-based)
- [ ] Context-aware AI assistance
- [ ] AI conversation history
- [ ] Tool activation from chat
- [ ] Usage tracking and limits (per tier)
- [ ] Transparency: Show which model is being used

### 📋 Tool Marketplace
- [ ] Tool browsing and discovery UI
- [ ] Tool detail pages with pricing
- [ ] Tool activation/installation flow
- [ ] Active tools management
- [ ] Tool settings and configuration

### 📋 Analytics & Reporting
- [ ] Dashboard analytics widgets
- [ ] Custom report builder
- [ ] Export functionality (PDF, CSV)
- [ ] Real-time data visualization
- [ ] Usage metrics and insights

---

## Phase 4: Integration & Launch (Week 9-10)

### 📋 Marketing Site Integration
- [ ] Update marketing site login to set shared cookie
- [ ] Update signup flow to create records in both DBs
- [ ] Add "Dashboard" link in user dropdown → app.strivetech.ai
- [ ] Test authentication flow end-to-end
- [ ] Verify cookie sharing across subdomains

### 📋 Deployment & Infrastructure
- [ ] Configure Vercel deployment for the app
- [ ] Setup app.strivetech.ai subdomain DNS
- [ ] Configure environment variables in production
- [ ] Setup error tracking (Sentry)
- [ ] Configure analytics and monitoring
- [ ] Load testing and performance optimization

### 📋 Testing & QA
- [ ] End-to-end authentication testing
- [ ] Cross-browser compatibility testing
- [ ] Mobile responsiveness verification
- [ ] Security audit (XSS, CSRF, auth)
- [ ] Performance testing (Core Web Vitals)
- [ ] User acceptance testing

---

## Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.6+
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **State Management:** TanStack Query + Zustand (if needed)
- **Forms:** React Hook Form + Zod

### Backend
- **API:** Next.js API Routes + Server Actions
- **Database:** PostgreSQL via Supabase
- **ORM:** Prisma
- **Auth:** JWT validation from marketing site
- **File Storage:** Supabase Storage

### Third-Party Services
- **Auth Provider:** Shared from marketing site (consider Clerk migration later)
- **Payments:** Stripe (Phase 3+)
- **Email:** SMTP (shared service)
- **AI Providers:**
  - **OpenRouter** - Primary gateway for 200+ models (proprietary & open-source)
  - **Groq** - High-speed inference for open-source models (Llama, Mixtral, Gemma)
  - Strategy: Mix of open-source (cost-effective) and proprietary (advanced) models
- **Monitoring:** Vercel Analytics + Sentry

---

## File Structure (SaaS Platform - app/)

```
app/                             # SaaS Platform root directory
├── app/                         # Next.js App Router
│   ├── (auth)/                  # Auth-related routes
│   │   ├── login/              # Fallback login page
│   │   └── verify/             # Auth verification
│   ├── (admin)/                # Admin dashboard routes
│   │   ├── dashboard/          # Admin overview
│   │   ├── users/              # User management
│   │   ├── organizations/      # Org management
│   │   └── settings/           # System settings
│   ├── (employee)/             # Employee dashboard routes
│   │   ├── dashboard/          # Employee home
│   │   ├── projects/           # Project management
│   │   ├── crm/                # CRM system
│   │   ├── tasks/              # Task management
│   │   └── time-tracking/      # Time tracking
│   ├── (client)/               # Client portal routes
│   │   ├── dashboard/          # Client overview
│   │   ├── projects/           # View assigned projects
│   │   ├── invoices/           # Billing & invoices
│   │   └── support/            # Support tickets
│   ├── (shared)/               # Shared across all roles
│   │   ├── tools/              # Tool marketplace
│   │   ├── ai/                 # Sai assistant
│   │   ├── profile/            # User profile
│   │   └── notifications/      # Notifications
│   ├── api/                    # API routes
│   │   ├── auth/               # Auth verification
│   │   ├── users/              # User management
│   │   ├── organizations/      # Org management
│   │   ├── projects/           # Project CRUD
│   │   ├── crm/                # CRM operations
│   │   └── webhooks/           # Stripe, etc.
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── ui/                     # Copied from old/client/src/components/ui (56 components)
│   ├── admin/                  # Admin dashboard components
│   ├── employee/               # Employee dashboard components
│   ├── client/                 # Client portal components
│   ├── crm/                    # CRM-specific components
│   ├── projects/               # Project management components
│   ├── forms/                  # Form components
│   └── layouts/                # Layout components (shell, sidebar, nav)
├── lib/
│   ├── supabase.ts            # Supabase client
│   ├── prisma.ts              # Prisma client
│   ├── auth.ts                # Auth utilities
│   └── utils.ts               # General utilities
├── prisma/
│   └── schema.prisma          # Database schema
├── middleware.ts              # Auth middleware
├── next.config.js             # Next.js config
├── tailwind.config.ts         # Tailwind config
└── package.json               # Dependencies
```

---

## Database Schema (New Supabase DB)

### Core Tables
- `users` - Extended user profiles
- `organizations` - Multi-tenant workspaces
- `organization_members` - User-org relationships with roles
- `subscriptions` - Stripe subscription management
- `usage_tracking` - Usage metrics for billing

### CRM Tables
- `customers` - CRM customer records
- `leads` - Sales pipeline leads
- `contacts` - Contact information
- `notes` - Customer interaction notes

### Project Management Tables
- `projects` - Project records
- `tasks` - Task management
- `time_entries` - Time tracking
- `milestones` - Project milestones

### AI & Tools Tables
- `ai_conversations` - Chat history with Sai
- `ai_tools` - Available tools catalog
- `active_tools` - User-activated tools
- `tool_usage` - Tool usage tracking

### System Tables
- `activity_logs` - Audit trail
- `notifications` - User notifications
- `invitations` - Org invitations

---

## Environment Variables Needed

```env
# SaaS App (.env.local)
DATABASE_URL="postgresql://..."           # New Supabase DB
DIRECT_URL="postgresql://..."             # Direct connection

# Supabase (New App DB)
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Auth (Shared with marketing site)
JWT_SECRET="..."                          # Same as marketing site
NEXT_PUBLIC_MARKETING_URL="https://strivetech.ai"

# API Keys
OPENROUTER_API_KEY="..."                  # Multi-model gateway (200+ models)
GROQ_API_KEY="..."                        # Fast open-source inference
STRIPE_SECRET_KEY="..."                   # For billing
STRIPE_WEBHOOK_SECRET="..."

# App Config
NEXT_PUBLIC_APP_URL="https://app.strivetech.ai"
NODE_ENV="development"
```

---

## Key Decisions & Notes

### Why Separate Next.js App in `app/` directory?
- Zero risk to production marketing site
- Independent deployment and scaling
- Clear separation of concerns (marketing vs. application)
- Easier to develop and test in isolation
- Semantic naming: `app/` = SaaS application, not just "a dashboard"
- Contains multiple dashboard types (admin, employee, client)
- Future-proof for monorepo structure (web/ and app/)

### Why Keep Marketing Site Separate?
- Already production-ready and stable
- Legacy React app (not actively developed)
- Focus on building new Next.js app features
- Clean separation between marketing and SaaS platform

### Why Dual Databases?
- Marketing DB has existing data (forms, analytics)
- SaaS DB needs complex schema (multi-tenant, CRM, etc.)
- Clean separation of concerns
- User records synced on authentication

### Why Subdomain Strategy?
- Clean URL structure (`app.` prefix = dashboard)
- Cookie sharing for seamless auth (`.strivetech.ai` domain)
- Independent DNS and deployment config
- Professional appearance for SaaS product

---

## Success Criteria

### Phase 1 Complete When:
- [x] Next.js app runs locally ✅
- [x] UI components copied and working ✅ (needs organization)
- [ ] Database connected and schema deployed (⏳ awaiting new Supabase)
- [ ] Auth middleware validates tokens
- [ ] Basic dashboard layout renders

### Phase 2 Complete When:
- [ ] Users can view their profile
- [ ] Organizations can be created/managed
- [ ] Team members can be invited with role assignment
- [ ] Settings page is functional
- [ ] Role-based navigation works (admin/employee/client see different menus)
- [ ] Basic admin, employee, and client dashboard layouts exist

### Phase 3 Complete When:
- [ ] CRM system allows customer management
- [ ] Projects and tasks can be created/tracked
- [ ] Sai assistant chat is functional
- [ ] Tools can be browsed and activated
- [ ] Analytics dashboard shows real data

### Phase 4 Complete When:
- [ ] Users can login on marketing site and access app
- [ ] Authentication works seamlessly across domains
- [ ] App is live at app.strivetech.ai
- [ ] Role-based dashboards route correctly (admin → /admin/dashboard, etc.)
- [ ] All core features are production-ready
- [ ] Performance and security are verified

---

## Next Immediate Steps

1. ✅ Initialize Next.js 15 app - **COMPLETE**
2. ✅ Configure TypeScript - **COMPLETE**
3. 🚧 Setup Tailwind CSS with brand colors
4. 🚧 Reorganize components into ui/ folder structure
5. ⏳ **USER ACTION NEEDED:** Create new Supabase database project
6. 📋 Configure .env.local with new database credentials
7. 📋 Run Prisma migrations to create tables
8. 📋 Implement auth middleware
9. 📋 Build dashboard layout shell

**Current Focus:** Waiting for new Supabase database creation, meanwhile organizing code structure

**Action Required from User:**
1. Go to [supabase.com](https://supabase.com) and create new project
2. Name it "strive-tech-app" or similar
3. Share the connection details to proceed with setup