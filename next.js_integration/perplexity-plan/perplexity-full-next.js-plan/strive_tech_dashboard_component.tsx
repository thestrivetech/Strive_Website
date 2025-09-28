
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
