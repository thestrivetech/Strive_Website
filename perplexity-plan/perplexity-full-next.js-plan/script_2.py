# Create sample implementation code for key features of the Strive Tech platform

# Next.js configuration for the project
nextjs_config = """
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['prisma']
  },
  images: {
    domains: ['images.clerk.dev', 'supabase.co']
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig
"""

# Environment variables template
env_template = """
# Database
DATABASE_URL="postgresql://username:password@host:5432/database"
DIRECT_URL="postgresql://username:password@host:5432/database"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Services
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (optional)
RESEND_API_KEY=re_...
FROM_EMAIL=noreply@strivetech.ai

# Analytics & Monitoring
NEXT_PUBLIC_POSTHOG_KEY=...
SENTRY_DSN=...
"""

# Prisma schema example
prisma_schema = """
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id            String   @id @default(cuid())
  clerkUserId   String   @unique @map("clerk_user_id")
  email         String   @unique
  name          String?
  avatarUrl     String?  @map("avatar_url")
  role          UserRole @default(CLIENT)
  subscriptionTier SubscriptionTier @default(FREE) @map("subscription_tier")
  isActive      Boolean  @default(true) @map("is_active")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  // Relationships
  organizationMembers OrganizationMember[]
  assignedTasks      Task[]              @relation("TaskAssignee")
  createdTasks       Task[]              @relation("TaskCreator")
  managedProjects    Project[]           @relation("ProjectManager")
  assignedCustomers  Customer[]          @relation("CustomerAssignee")
  aiConversations    AiConversation[]
  usageTracking      UsageTracking[]
  createdAppointments Appointment[]      @relation("AppointmentCreator")
  assignedAppointments Appointment[]     @relation("AppointmentAssignee")
  authoredContent    Content[]           @relation("ContentAuthor")
  activityLogs       ActivityLog[]

  @@map("users")
}

model Organization {
  id                String             @id @default(cuid())
  name              String
  slug              String             @unique
  description       String?
  settings          Json?              // Organization-specific configurations
  subscriptionStatus SubscriptionStatus @default(TRIAL) @map("subscription_status")
  billingEmail      String?            @map("billing_email")
  createdAt         DateTime           @default(now()) @map("created_at")
  updatedAt         DateTime           @updatedAt @map("updated_at")

  // Relationships
  members           OrganizationMember[]
  customers         Customer[]
  projects          Project[]
  aiConversations   AiConversation[]
  subscriptions     Subscription[]
  usageTracking     UsageTracking[]
  appointments      Appointment[]
  content           Content[]
  activityLogs      ActivityLog[]

  @@map("organizations")
}

// Enums
enum UserRole {
  ADMIN
  MODERATOR
  EMPLOYEE
  CLIENT
}

enum SubscriptionTier {
  FREE
  BASIC
  PRO
  ENTERPRISE
}

enum SubscriptionStatus {
  ACTIVE
  INACTIVE
  TRIAL
}

enum ProjectStatus {
  PLANNING
  ACTIVE
  ON_HOLD
  COMPLETED
  CANCELLED
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  REVIEW
  DONE
  CANCELLED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}
"""

# Sample API route for CRM functionality
api_route_example = """
// app/api/customers/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createCustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  status: z.enum(['LEAD', 'PROSPECT', 'ACTIVE', 'CHURNED']).default('LEAD'),
  source: z.enum(['WEBSITE', 'REFERRAL', 'SOCIAL', 'EMAIL', 'OTHER']).default('WEBSITE'),
  tags: z.array(z.string()).optional(),
  customFields: z.record(z.any()).optional()
})

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's organization(s)
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        organizationMembers: {
          include: { organization: true }
        }
      }
    })

    if (!user || user.organizationMembers.length === 0) {
      return NextResponse.json({ error: 'No organization found' }, { status: 403 })
    }

    const orgIds = user.organizationMembers.map(member => member.organizationId)

    const customers = await prisma.customer.findMany({
      where: {
        organizationId: { in: orgIds }
      },
      include: {
        assignedTo: {
          select: { name: true, email: true }
        },
        projects: {
          select: { id: true, name: true, status: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(customers)
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createCustomerSchema.parse(body)

    // Get user's primary organization
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        organizationMembers: {
          include: { organization: true }
        }
      }
    })

    if (!user || user.organizationMembers.length === 0) {
      return NextResponse.json({ error: 'No organization found' }, { status: 403 })
    }

    const organizationId = user.organizationMembers[0].organizationId

    const customer = await prisma.customer.create({
      data: {
        ...validatedData,
        organizationId,
        assignedTo: { connect: { id: user.id } }
      },
      include: {
        assignedTo: {
          select: { name: true, email: true }
        }
      }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        organizationId,
        userId: user.id,
        action: 'customer_created',
        resourceType: 'customer',
        resourceId: customer.id,
        newData: customer,
        ipAddress: request.ip || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    })

    return NextResponse.json(customer, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
    }
    
    console.error('Error creating customer:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
"""

# Component example for dashboard
dashboard_component = """
// app/(dashboard)/dashboard/page.tsx
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { ProjectOverview } from '@/components/dashboard/project-overview'
import { TaskSummary } from '@/components/dashboard/task-summary'

export default async function DashboardPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      organizationMembers: {
        include: { organization: true }
      }
    }
  })

  if (!user || user.organizationMembers.length === 0) {
    redirect('/onboarding')
  }

  const organizationId = user.organizationMembers[0].organizationId

  // Fetch dashboard data in parallel
  const [stats, recentProjects, recentTasks, recentActivity] = await Promise.all([
    getDashboardStats(organizationId),
    getRecentProjects(organizationId),
    getRecentTasks(userId),
    getRecentActivity(organizationId)
  ])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <div className="space-y-4">
        <DashboardStats stats={stats} />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <ProjectOverview projects={recentProjects} />
          </div>
          <div className="col-span-3">
            <TaskSummary tasks={recentTasks} />
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <RecentActivity activities={recentActivity} />
          {/* Add more dashboard components here */}
        </div>
      </div>
    </div>
  )
}

async function getDashboardStats(organizationId: string) {
  const [totalCustomers, totalProjects, completedTasks, activeProjects] = await Promise.all([
    prisma.customer.count({ where: { organizationId } }),
    prisma.project.count({ where: { organizationId } }),
    prisma.task.count({ 
      where: { 
        project: { organizationId },
        status: 'DONE'
      }
    }),
    prisma.project.count({ 
      where: { 
        organizationId,
        status: 'ACTIVE'
      }
    })
  ])

  return {
    totalCustomers,
    totalProjects,
    completedTasks,
    activeProjects
  }
}

async function getRecentProjects(organizationId: string) {
  return prisma.project.findMany({
    where: { organizationId },
    include: {
      customer: {
        select: { name: true }
      },
      projectManager: {
        select: { name: true }
      },
      _count: {
        select: { tasks: true }
      }
    },
    orderBy: { updatedAt: 'desc' },
    take: 5
  })
}

async function getRecentTasks(userId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId }
  })

  if (!user) return []

  return prisma.task.findMany({
    where: { assignedToId: user.id },
    include: {
      project: {
        select: { name: true }
      }
    },
    orderBy: { updatedAt: 'desc' },
    take: 5
  })
}

async function getRecentActivity(organizationId: string) {
  return prisma.activityLog.findMany({
    where: { organizationId },
    include: {
      user: {
        select: { name: true, email: true }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 10
  })
}
"""

# Save all implementation files
files_content = {
    'next.config.js': nextjs_config,
    '.env.example': env_template,
    'prisma_schema.prisma': prisma_schema,
    'api_route_example.ts': api_route_example,
    'dashboard_component.tsx': dashboard_component
}

print("=== IMPLEMENTATION FILES FOR STRIVE TECH NEXT.JS PLATFORM ===\n")

for filename, content in files_content.items():
    print(f"File: {filename}")
    print("=" * 50)
    print(content[:500] + "..." if len(content) > 500 else content)
    print("\n" + "-" * 60 + "\n")
    
    # Save each file
    with open(f'strive_tech_{filename}', 'w') as f:
        f.write(content)

print("All implementation files saved with 'strive_tech_' prefix")

# Create a summary of what needs to be migrated
migration_checklist = """
=== NEXT.JS MIGRATION CHECKLIST ===

PHASE 1: FOUNDATION SETUP
□ Initialize Next.js 14+ project with App Router
□ Setup TypeScript configuration
□ Configure Tailwind CSS and shadcn/ui
□ Setup Clerk authentication
□ Configure Supabase database connection
□ Setup Prisma ORM with schema
□ Create basic routing structure
□ Migrate existing React components

PHASE 2: AUTHENTICATION & USER MANAGEMENT
□ Implement Clerk middleware for route protection
□ Setup user roles and permissions (RBAC)
□ Create organization management system
□ Implement user onboarding flow
□ Setup session management
□ Create admin user management interface

PHASE 3: DATABASE & API LAYER
□ Design and implement database schema
□ Setup Prisma migrations
□ Create API routes for all entities
□ Implement row-level security policies
□ Setup database indexing strategy
□ Create API documentation

PHASE 4: CRM SYSTEM
□ Customer management interface
□ Lead tracking and conversion
□ Contact history and notes
□ Customer segmentation
□ Sales pipeline management
□ Reporting and analytics

PHASE 5: PROJECT & TASK MANAGEMENT
□ Project creation and management
□ Kanban board for tasks
□ Time tracking and reporting
□ Project templates and workflows
□ Team collaboration features
□ Progress tracking and notifications

PHASE 6: AI INTEGRATION
□ Multi-AI chatbot system (OpenAI, Claude)
□ Context-aware assistance
□ AI tool marketplace
□ Usage tracking and billing
□ Custom AI workflows
□ Integration with CRM data

PHASE 7: CONTENT MANAGEMENT
□ Setup headless CMS (Strapi recommended)
□ Content creation and editing interface
□ SEO optimization features
□ Multi-language support
□ Content versioning
□ Media management

PHASE 8: SCHEDULING & CALENDAR
□ Appointment booking system
□ Calendar integration
□ Automated reminders
□ Meeting room management
□ Time zone handling
□ Recurring events

PHASE 9: BILLING & SUBSCRIPTIONS
□ Stripe integration setup
□ Subscription plans configuration
□ Payment processing workflows
□ Usage-based billing
□ Customer billing portal
□ Revenue analytics

PHASE 10: ADMIN DASHBOARD
□ Comprehensive admin interface
□ Real-time analytics
□ User management tools
□ System configuration
□ Audit logs and monitoring
□ Performance metrics

PHASE 11: CLIENT PORTAL
□ Client-specific dashboards
□ Project progress visibility
□ Communication tools
□ Document sharing
□ Invoice and payment history
□ Support ticket system

PHASE 12: PERFORMANCE & SECURITY
□ SEO optimization
□ Performance monitoring setup
□ Security audit and hardening
□ Load testing
□ Error tracking and logging
□ Backup and disaster recovery

PHASE 13: TESTING & QA
□ Unit testing setup
□ Integration testing
□ End-to-end testing
□ Performance testing
□ Security testing
□ User acceptance testing

PHASE 14: DEPLOYMENT & MONITORING
□ Vercel deployment configuration
□ CI/CD pipeline setup
□ Environment configuration
□ Monitoring and alerting
□ Analytics integration
□ Documentation finalization
"""

with open('strive_tech_migration_checklist.txt', 'w') as f:
    f.write(migration_checklist)

print("Migration checklist saved to 'strive_tech_migration_checklist.txt'")
print(f"\nTotal files created: {len(files_content) + 3}")  # +3 for plan, schema, and checklist