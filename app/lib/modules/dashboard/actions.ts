'use server';

import { createServerSupabaseClientWithAuth } from '@/lib/supabase-server';
import { getDashboardStats, getActivityFeed } from './queries';
import { getUserOrganizations } from '../organization/queries';

export async function fetchDashboardData() {
  const supabase = await createServerSupabaseClientWithAuth();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // Get user's organizations
  const organizations = await getUserOrganizations(user.id);

  if (organizations.length === 0) {
    // Return empty stats if user has no organization
    return {
      stats: {
        revenue: 0,
        customers: 0,
        projects: 0,
        activeProjects: 0,
        tasks: 0,
        completedTasks: 0,
        teamMembers: 0,
        taskCompletionRate: 0,
        recentActivity: [],
      },
      organization: null,
    };
  }

  // Get stats for the first organization (or the selected one from context)
  const primaryOrg = organizations[0].organization;
  const stats = await getDashboardStats(primaryOrg.id);

  return {
    stats,
    organization: primaryOrg,
  };
}

export async function fetchActivityFeed(limit: number = 20) {
  const supabase = await createServerSupabaseClientWithAuth();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const organizations = await getUserOrganizations(user.id);

  if (organizations.length === 0) {
    return [];
  }

  const primaryOrg = organizations[0].organization;
  return getActivityFeed(primaryOrg.id, limit);
}