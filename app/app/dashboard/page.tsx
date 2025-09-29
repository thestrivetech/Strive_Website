import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/auth/auth-helpers';
import { fetchDashboardData } from '@/lib/modules/dashboard/actions';
import {
  Users,
  FolderKanban,
  TrendingUp,
  Clock,
  DollarSign,
  Activity,
  CreditCard,
  Target,
  CheckCircle
} from 'lucide-react';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const { stats, organization } = await fetchDashboardData();

  const statsCards = [
    {
      title: 'Monthly Revenue',
      value: stats.revenue > 0 ? `$${stats.revenue.toLocaleString()}` : '$0',
      description: organization?.subscriptionStatus === 'ACTIVE' ? 'Active subscription' : 'No active subscription',
      icon: DollarSign,
      trend: 'up',
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects.toString(),
      description: `${stats.projects} total projects`,
      icon: FolderKanban,
      trend: 'up',
    },
    {
      title: 'Total Customers',
      value: stats.customers.toString(),
      description: `${stats.teamMembers} team members`,
      icon: Users,
      trend: 'up',
    },
    {
      title: 'Task Completion',
      value: `${stats.taskCompletionRate}%`,
      description: `${stats.completedTasks} of ${stats.tasks} completed`,
      icon: CheckCircle,
      trend: stats.taskCompletionRate > 50 ? 'up' : 'down',
    },
  ];

  // Format recent activity from database
  const recentActivity = stats.recentActivity.length > 0
    ? stats.recentActivity.map((activity) => ({
        id: activity.id,
        action: activity.action,
        description: activity.resourceType ? `${activity.resourceType} ${activity.resourceId || ''}` : '',
        time: formatTimeAgo(new Date(activity.createdAt)),
        user: activity.user,
        icon: getActivityIcon(activity.action),
      }))
    : [
        {
          id: '1',
          action: 'Welcome!',
          description: 'Start by creating your first project',
          time: 'just now',
          user: null,
          icon: Activity,
        },
      ];

  function formatTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }

  function getActivityIcon(action: string) {
    if (action.includes('customer')) return Users;
    if (action.includes('project')) return FolderKanban;
    if (action.includes('invoice') || action.includes('payment')) return CreditCard;
    if (action.includes('meeting')) return Clock;
    return Activity;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || 'User'}! Here&apos;s your business overview.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Your revenue performance over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Chart will be implemented here
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your workspace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="rounded-lg bg-secondary p-2">
                      <Icon className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>
              Projects currently in progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Website Redesign</p>
                  <p className="text-sm text-muted-foreground">Acme Corp</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">75%</p>
                  <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mobile App Development</p>
                  <p className="text-sm text-muted-foreground">TechStart</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">45%</p>
                  <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '45%' }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SEO Optimization</p>
                  <p className="text-sm text-muted-foreground">GlobalTech</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">90%</p>
                  <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '90%' }} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>
              Your highest value clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Acme Corp</p>
                  <p className="text-sm text-muted-foreground">12 projects</p>
                </div>
                <p className="font-medium">$24,500</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">TechStart</p>
                  <p className="text-sm text-muted-foreground">8 projects</p>
                </div>
                <p className="font-medium">$18,200</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">GlobalTech</p>
                  <p className="text-sm text-muted-foreground">6 projects</p>
                </div>
                <p className="font-medium">$15,800</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}