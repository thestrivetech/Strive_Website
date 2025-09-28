# Strive Tech SaaS Platform

**Subdomain:** app.strivetech.ai
**Framework:** Next.js 15 + App Router
**Purpose:** Multi-tenant SaaS application with role-based dashboards

---

## What's in this directory?

This is the **entire SaaS application**, not just "a dashboard". It contains:

- **Admin Dashboard** - System management, user/org administration, analytics
- **Employee Workspace** - Projects, CRM, tasks, time tracking, tools
- **Client Portal** - Project visibility, invoices, support, communication
- **Shared Features** - Sai AI assistant, tool marketplace, profile, notifications

---

## Why "app/" not "dashboard/"?

1. **Semantic accuracy** - This is the application, containing multiple dashboards
2. **Matches subdomain** - `app.strivetech.ai` ✅
3. **Future-proof** - Room for growth without misleading names
4. **Industry standard** - Most SaaS use: `web/` (marketing) + `app/` (platform)

---

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript 5.6+
- **Database:** PostgreSQL via Supabase + Prisma ORM
- **Auth:** JWT validation from marketing site (shared cookies)
- **UI:** shadcn/ui + Radix UI + Tailwind CSS
- **State:** TanStack Query + Zustand
- **Payments:** Stripe (Phase 3+)
- **AI:**
  - **OpenRouter** - Multi-model gateway (200+ models: GPT-4, Claude, Gemini, Llama, Mixtral)
  - **Groq** - Ultra-fast open-source inference (Llama 3.3, Mixtral, Gemma)
  - Strategy: Balance cost (open-source) with capability (proprietary)

---

## Getting Started

### 1. Environment Setup
```bash
cp .env.local.example .env.local
# Fill in your Supabase credentials and secrets
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

### 4. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

---

## Database Models (13 total)

1. **User** - User accounts and profiles
2. **Organization** - Multi-tenant organizations
3. **OrganizationMember** - User-org relationships with roles
4. **Customer** - CRM customer records
5. **Project** - Project management
6. **Task** - Task tracking with Kanban support
7. **AIConversation** - Sai assistant chat history
8. **AITool** - Available AI tools catalog
9. **Subscription** - Stripe billing management
10. **UsageTracking** - Usage metrics for billing
11. **Appointment** - Calendar and scheduling
12. **Content** - CMS content management
13. **ActivityLog** - Audit trail

---

## Role-Based Access

### User Roles
- `ADMIN` - Full system access
- `MODERATOR` - Limited admin privileges
- `EMPLOYEE` - Internal team member
- `CLIENT` - External customer

### Organization Roles
- `OWNER` - Organization creator
- `ADMIN` - Org administrator
- `MEMBER` - Standard member
- `VIEWER` - Read-only access

---

## Project Status

### Phase 1 (Foundation) ✅
- [x] Next.js 15 initialized with App Router
- [x] TypeScript + Tailwind + ESLint configured
- [x] shadcn/ui setup with 56 components
- [x] Prisma schema with 13 models
- [x] Directory renamed: `dashboard/` → `app/`

### Phase 2 (Core) 🚧 NEXT
- [ ] Auth middleware implementation
- [ ] Role-based routing
- [ ] Dashboard layouts (admin/employee/client)
- [ ] Organization management

### Phase 3 (Features) 📋
- [ ] CRM system
- [ ] Project & task management
- [ ] Sai AI assistant
- [ ] Tool marketplace

### Phase 4 (Launch) 📋
- [ ] Marketing site integration
- [ ] Deploy to app.strivetech.ai
- [ ] Production testing

---

## Related Documentation

- [Full Build Plan](../DASHBOARD_BUILD_PLAN.md)
- [Prisma Schema](./prisma/schema.prisma)
- [Environment Variables](./.env.local.example)

---

**Built with ❤️ by Strive Tech**
