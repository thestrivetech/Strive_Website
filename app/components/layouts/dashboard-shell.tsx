'use client';

import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MainSidebar } from './sidebar/main-sidebar';
import { Topbar } from './topbar/topbar';
import { UserRole } from '@/lib/auth/constants';

interface DashboardShellProps {
  children: React.ReactNode;
  user: {
    id: string;
    email: string;
    name: string;
    avatarUrl: string | null;
    role: UserRole;
    subscriptionTier: string;
  };
  navigationItems: Array<{
    title: string;
    href: string;
    icon: string;
    roles: UserRole[];
  }>;
}

export function DashboardShell({
  children,
  user,
  navigationItems,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <MainSidebar
          user={user}
          navigationItems={navigationItems}
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar
            user={user}
            sidebarOpen={sidebarOpen}
            onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          />
          <main className="flex-1 overflow-y-auto bg-secondary/10">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}