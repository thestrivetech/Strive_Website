# Session 3 Tasks - Complete Phase 2 & Backend Integration

**Date:** TBD (Next Session)
**Goal:** Fix authentication issues, connect to real data, and complete Phase 2 team management features
**Starting Point:** Phase 1 complete, Phase 2 35% complete, mock data in all pages
**Phase Reference:** Phase 2 - Core Application Interface (Week 3-4)

---

## 📍 Current Status (From Session 2)

### ✅ Already Completed
- Authentication middleware and RBAC system created
- Dashboard layout with sidebar and topbar
- All major protected route pages (dashboard, CRM, projects, settings)
- Role-based navigation working
- Login page and API route
- App running at http://localhost:3001

### 🔧 Issues to Fix
- Middleware module resolution error with @supabase/ssr
- TypeScript errors in legacy components
- All pages using mock data instead of real database

---

## 🎯 Session 3 Primary Objectives

### Priority 1: Fix Authentication & Testing
**Make auth system fully functional**

#### 1. Fix Middleware Module Resolution
```typescript
// Investigate and fix @supabase/ssr import issue in middleware.ts
- Check Turbopack compatibility
- Consider alternative import methods
- Verify package installation
- Test middleware authentication flow
```

#### 2. Create Test Users in Supabase
- Log into Supabase dashboard
- Create test users with different roles (ADMIN, EMPLOYEE, CLIENT)
- Test login flow end-to-end
- Verify JWT token validation
- Test role-based route access

#### 3. Implement Sign Out
- Add sign out functionality to user menu
- Clear session cookies
- Redirect to login page
- Test complete auth cycle

---

### Priority 2: Connect to Real Database
**Replace all mock data with actual database queries**

#### 1. Dashboard Page (`dashboard/page.tsx`)
- Query real statistics from database
- Implement aggregation queries for:
  - Total revenue (from subscriptions/invoices)
  - Active projects count
  - Customer count
  - Recent activity from activity_logs table
- Add loading states
- Handle errors gracefully

#### 2. CRM Page (`crm/page.tsx`)
- Fetch actual customers from database
- Implement search and filtering
- Add pagination
- Create customer creation flow
- Implement customer detail modal

#### 3. Projects Page (`projects/page.tsx`)
- Query projects from database
- Calculate real progress from tasks
- Fetch team members for each project
- Implement project creation
- Add task management

#### 4. Settings Page (`settings/page.tsx`)
- Connect to actual user data
- Implement profile update functionality
- Save preferences to database
- Handle organization settings

---

### Priority 3: Organization & Team Management
**Complete Phase 2 team features**

#### 1. Organization Creation Flow
```
lib/modules/organization/
├── actions.ts         # createOrganization, updateOrganization
├── queries.ts         # getOrganization, getOrganizationMembers
├── schemas.ts         # Zod validation schemas
└── components/
    ├── create-org-dialog.tsx
    └── org-switcher.tsx
```

#### 2. Team Member Management
- Invitation system
  - Generate invitation tokens
  - Send invitation emails (or display invite link)
  - Accept invitation flow
- Member list with roles
- Role assignment UI
- Remove member functionality

#### 3. Organization Switcher
- Display user's organizations
- Switch between organizations
- Update context globally
- Persist selection

---

## 📋 Technical Tasks

### Database Queries to Implement
```typescript
// Dashboard statistics
- getUserStats(userId: string)
- getOrganizationStats(orgId: string)
- getRecentActivity(orgId: string, limit: number)

// CRM operations
- getCustomers(orgId: string, filters?: CustomerFilters)
- createCustomer(data: CustomerInput)
- updateCustomer(id: string, data: CustomerUpdate)

// Project management
- getProjects(orgId: string, userId?: string)
- createProject(data: ProjectInput)
- getProjectTasks(projectId: string)
- updateTaskProgress(taskId: string, progress: number)

// Organization management
- createOrganization(data: OrgInput)
- inviteTeamMember(orgId: string, email: string, role: UserRole)
- acceptInvitation(token: string)
- updateMemberRole(memberId: string, role: UserRole)
```

### Server Actions to Create
```typescript
// app/lib/modules/dashboard/actions.ts
export async function getDashboardData(orgId: string)

// app/lib/modules/crm/actions.ts
export async function createCustomer(data: CustomerInput)
export async function updateCustomer(id: string, data: CustomerUpdate)

// app/lib/modules/projects/actions.ts
export async function createProject(data: ProjectInput)
export async function updateTaskStatus(taskId: string, status: TaskStatus)

// app/lib/modules/organization/actions.ts
export async function createOrganization(data: OrgInput)
export async function inviteTeamMember(email: string, role: UserRole)
```

---

## 🧪 Testing Checklist

### Authentication Testing
- [ ] User can sign up (create in Supabase)
- [ ] User can log in
- [ ] User can sign out
- [ ] Protected routes redirect to login when unauthenticated
- [ ] Role-based routes work correctly
- [ ] Session persists across page refreshes

### Data Integration Testing
- [ ] Dashboard shows real statistics
- [ ] CRM displays actual customers
- [ ] Projects show real project data
- [ ] Settings load and save user preferences
- [ ] Activity feed updates in real-time

### Organization Management Testing
- [ ] User can create organization
- [ ] User can invite team members
- [ ] Invited users can accept invitations
- [ ] Organization switcher works
- [ ] Role permissions are enforced

---

## 🛠️ Commands & Tools

```bash
# Development
cd app
npm run dev           # Turbopack dev server

# Database
npx prisma studio     # Database GUI
npx prisma generate   # Update Prisma client

# Type checking
npx tsc --noEmit      # Check TypeScript errors

# Linting
npm run lint          # Run ESLint

# Testing (when implemented)
npm test              # Run tests
```

---

## ✅ Session 3 Success Criteria

### Must Complete
- [ ] Authentication fully working with real users
- [ ] Dashboard connected to real database
- [ ] At least one CRUD operation working (e.g., create customer)
- [ ] Organization creation flow implemented

### Stretch Goals
- [ ] All pages using real data
- [ ] Team invitation system working
- [ ] Real-time activity feed
- [ ] Basic error boundaries implemented

### Definition of Done
- Authentication flow works end-to-end
- No TypeScript errors in new code
- At least 3 database queries implemented
- User can perform meaningful actions (not just view)
- Code follows established patterns from CLAUDE.md

---

## 🚫 Important Reminders

### Security
- Never expose `SUPABASE_SERVICE_ROLE_KEY`
- Always validate inputs with Zod
- Use parameterized queries (Prisma)
- Check organization context for multi-tenancy
- Implement proper RLS policies before production

### Code Quality
- Server Components by default
- File size limits: <200 lines components, <300 lines services
- No cross-module imports
- Use existing UI components (58+ available)
- Follow patterns from CLAUDE.md

### Testing
- Test with different user roles
- Verify multi-tenancy isolation
- Check error states
- Test loading states
- Verify permission enforcement

---

## 📚 Reference Documents

- **Dev Rules:** `CLAUDE.md` (condensed version)
- **Build Plan:** `APP_BUILD_PLAN.md` (Phase 2 focus)
- **Schema:** `app/prisma/schema.prisma`
- **Session 2 Summary:** `chat-logs/Session2_Summary.md`

---

## 🔮 Session 4 Preview

After completing backend integration:
- Complete remaining Phase 2 features
- Start Phase 3: CRM System deep dive
- Implement AI integration (Sai Assistant)
- Add Tool Marketplace UI
- Begin real-time features

---

**Ready to fix auth and connect real data!** Let's make this app functional! 🚀