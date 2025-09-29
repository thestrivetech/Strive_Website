import { redirect } from 'next/navigation';
import { requireAuth, getCurrentUser } from '@/lib/auth/auth-helpers';
import { getNavigationItems } from '@/lib/auth/rbac';
import { UserRole } from '@/lib/auth/constants';
import { DashboardShell } from '@/components/layouts/dashboard-shell';

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Require authentication
  const session = await requireAuth();

  // Get current user with organization data
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Get navigation items based on user role
  const navigationItems = getNavigationItems(user.role as UserRole);

  return (
    <DashboardShell
      user={{
        id: user.id,
        email: user.email,
        name: user.name || user.email,
        avatarUrl: user.avatarUrl,
        role: user.role as UserRole,
        subscriptionTier: user.subscriptionTier,
      }}
      navigationItems={navigationItems}
    >
      {children}
    </DashboardShell>
  );
}