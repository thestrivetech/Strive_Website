# SaaS Dashboard Build Plan

**Project:** Strive Tech Dashboard (app.strivetech.ai)
**Framework:** Next.js 15 + App Router
**Status:** 🚧 In Progress

---

## Architecture Overview

### Deployment Structure
- **Marketing Site:** `strivetech.ai` (existing React/Vite in `old/`)
- **Dashboard:** `app.strivetech.ai` (new Next.js 15 app in `dashboard/`)

### Authentication
- Shared auth via cookies (domain: `.strivetech.ai`)
- Login/signup on marketing site → redirects to dashboard
- Dashboard validates JWT from marketing site

### Databases
- **Existing DB:** Marketing site (contact forms, analytics) - UNCHANGED
- **New DB:** SaaS platform (organizations, projects, CRM, AI tools)
- User sync on signup between both databases

### Design System
- Reuse shadcn/ui components from `old/client/src/components/ui/`
- Maintain consistent UI/UX with marketing site
- Add new dashboard-specific components as needed

---

## Phase 1: Foundation (Week 1-2)

### ✅ Completed Tasks
- [ ] None yet

### 🚧 In Progress
- [x] Initialize Next.js 15 app with App Router
- [ ] Setup TypeScript, Tailwind CSS, and shadcn/ui configuration
- [ ] Copy existing UI components from old/client/src/components/ui
- [ ] Create new Supabase database and configure Prisma schema
- [ ] Implement auth verification middleware
- [ ] Build base dashboard layout (sidebar, topbar, navigation)

### 📋 Pending Tasks
- [ ] Configure environment variables (.env.local)
- [ ] Setup Supabase client for dashboard
- [ ] Create auth verification API route
- [ ] Design dashboard routing structure
- [ ] Implement user profile page
- [ ] Create organization/workspace selector

---

## Phase 2: Core Dashboard (Week 3-4)

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
- [ ] Chat interface in dashboard
- [ ] Context-aware AI assistance
- [ ] AI conversation history
- [ ] Tool activation from chat
- [ ] Usage tracking and limits

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
- [ ] Configure Vercel deployment for dashboard
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
- **AI:** OpenRouter API (Sai assistant)
- **Monitoring:** Vercel Analytics + Sentry

---

## File Structure (Dashboard App)

```
dashboard/
├── app/
│   ├── (auth)/                  # Auth-related routes
│   │   ├── login/              # Fallback login page
│   │   └── verify/             # Auth verification
│   ├── (dashboard)/            # Main dashboard routes
│   │   ├── layout.tsx          # Dashboard shell
│   │   ├── page.tsx            # Dashboard home
│   │   ├── projects/           # Project management
│   │   ├── crm/                # CRM system
│   │   ├── tools/              # Tool marketplace
│   │   ├── ai/                 # Sai assistant
│   │   ├── analytics/          # Analytics & reports
│   │   └── settings/           # User/org settings
│   ├── api/                    # API routes
│   │   ├── auth/               # Auth verification
│   │   ├── users/              # User management
│   │   ├── organizations/      # Org management
│   │   └── webhooks/           # Stripe, etc.
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── ui/                     # Copied from old/client/src/components/ui
│   ├── dashboard/              # Dashboard-specific components
│   ├── forms/                  # Form components
│   └── layouts/                # Layout components
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
# Dashboard App (.env.local)
DATABASE_URL="postgresql://..."           # New Supabase DB
DIRECT_URL="postgresql://..."             # Direct connection

# Supabase (New Dashboard DB)
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Auth (Shared with marketing site)
JWT_SECRET="..."                          # Same as marketing site
NEXT_PUBLIC_MARKETING_URL="https://strivetech.ai"

# API Keys
OPENROUTER_API_KEY="..."                  # For AI features
STRIPE_SECRET_KEY="..."                   # For billing
STRIPE_WEBHOOK_SECRET="..."

# App Config
NEXT_PUBLIC_APP_URL="https://app.strivetech.ai"
NODE_ENV="development"
```

---

## Key Decisions & Notes

### Why Separate Next.js App?
- Zero risk to production marketing site
- Independent deployment and scaling
- Clear separation of concerns
- Easier to develop and test in isolation

### Why Keep Marketing Site in React/Vite?
- Already production-ready and stable
- Only needs minor tweaks (not a full rebuild)
- Can migrate to Next.js later if needed
- Focus effort on building new dashboard features

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
- [x] Next.js app runs locally
- [ ] UI components copied and working
- [ ] Database connected and schema deployed
- [ ] Auth middleware validates tokens
- [ ] Basic dashboard layout renders

### Phase 2 Complete When:
- [ ] Users can view their profile
- [ ] Organizations can be created/managed
- [ ] Team members can be invited
- [ ] Settings page is functional
- [ ] Navigation works correctly

### Phase 3 Complete When:
- [ ] CRM system allows customer management
- [ ] Projects and tasks can be created/tracked
- [ ] Sai assistant chat is functional
- [ ] Tools can be browsed and activated
- [ ] Analytics dashboard shows real data

### Phase 4 Complete When:
- [ ] Users can login on marketing site and access dashboard
- [ ] Authentication works seamlessly across domains
- [ ] Dashboard is live at app.strivetech.ai
- [ ] All core features are production-ready
- [ ] Performance and security are verified

---

## Next Immediate Steps

1. ✅ Initialize Next.js 15 app
2. 🚧 Configure TypeScript and Tailwind
3. 📋 Setup shadcn/ui and copy components
4. 📋 Create Supabase database and Prisma schema
5. 📋 Implement auth middleware
6. 📋 Build dashboard layout shell

**Current Focus:** Foundation setup (Phase 1)