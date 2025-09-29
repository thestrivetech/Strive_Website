import { prisma } from '@/lib/prisma';

export async function getDashboardStats(organizationId: string) {
  const [
    customerCount,
    projectCount,
    activeProjects,
    totalTasks,
    completedTasks,
    teamMemberCount,
    recentActivity
  ] = await Promise.all([
    // Total customers
    prisma.customer.count({
      where: { organizationId },
    }),

    // Total projects
    prisma.project.count({
      where: { organizationId },
    }),

    // Active projects
    prisma.project.count({
      where: {
        organizationId,
        status: 'ACTIVE',
      },
    }),

    // Total tasks
    prisma.task.count({
      where: {
        project: {
          organizationId,
        },
      },
    }),

    // Completed tasks
    prisma.task.count({
      where: {
        project: {
          organizationId,
        },
        status: 'DONE',
      },
    }),

    // Team members
    prisma.organizationMember.count({
      where: { organizationId },
    }),

    // Recent activity (last 10 items)
    prisma.activityLog.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    }),
  ]);

  // Calculate revenue (simplified - you'd want more complex logic in production)
  const organization = await prisma.organization.findUnique({
    where: { id: organizationId },
    include: {
      subscription: true,
    },
  });

  let monthlyRevenue = 0;
  if (organization?.subscription) {
    // This is simplified - in reality you'd calculate based on actual subscription data
    const tierPricing: Record<string, number> = {
      FREE: 0,
      BASIC: 299,
      PRO: 699,
      ENTERPRISE: 1499,
    };
    monthlyRevenue = tierPricing[organization.subscription.tier] || 0;
  }

  return {
    revenue: monthlyRevenue,
    customers: customerCount,
    projects: projectCount,
    activeProjects,
    tasks: totalTasks,
    completedTasks,
    teamMembers: teamMemberCount,
    taskCompletionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    recentActivity,
  };
}

export async function getActivityFeed(organizationId: string, limit: number = 20) {
  return prisma.activityLog.findMany({
    where: { organizationId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
      },
    },
  });
}