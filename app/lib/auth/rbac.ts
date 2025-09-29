import { UserRole, ROLE_PERMISSIONS } from './constants';
import { getCurrentUser } from './auth-helpers';

export type Permission = keyof typeof ROLE_PERMISSIONS.ADMIN;

export async function hasPermission(permission: Permission): Promise<boolean> {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  const rolePermissions = ROLE_PERMISSIONS[user.role as UserRole];

  if (!rolePermissions) {
    return false;
  }

  return rolePermissions[permission] || false;
}

export async function canAccessRoute(route: string): Promise<boolean> {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  const role = user.role as UserRole;

  // Admin can access everything
  if (role === 'ADMIN') {
    return true;
  }

  // Route-specific permissions
  const routePermissions: Record<string, UserRole[]> = {
    '/dashboard': ['ADMIN', 'MODERATOR', 'EMPLOYEE', 'CLIENT'],
    '/crm': ['ADMIN', 'MODERATOR', 'EMPLOYEE'],
    '/projects': ['ADMIN', 'MODERATOR', 'EMPLOYEE'],
    '/ai': ['ADMIN', 'MODERATOR', 'EMPLOYEE'],
    '/tools': ['ADMIN', 'MODERATOR', 'EMPLOYEE'],
    '/settings': ['ADMIN', 'MODERATOR'],
    '/admin': ['ADMIN'],
  };

  // Check if route has specific permissions
  for (const [routePath, allowedRoles] of Object.entries(routePermissions)) {
    if (route.startsWith(routePath)) {
      return allowedRoles.includes(role);
    }
  }

  // Default: allow access to undefined routes (let the page handle specific permissions)
  return true;
}

export function getNavigationItems(role: UserRole) {
  const allItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'LayoutDashboard',
      roles: ['ADMIN', 'MODERATOR', 'EMPLOYEE', 'CLIENT'] as UserRole[],
    },
    {
      title: 'CRM',
      href: '/crm',
      icon: 'Users',
      roles: ['ADMIN', 'MODERATOR', 'EMPLOYEE'] as UserRole[],
    },
    {
      title: 'Projects',
      href: '/projects',
      icon: 'FolderKanban',
      roles: ['ADMIN', 'MODERATOR', 'EMPLOYEE'] as UserRole[],
    },
    {
      title: 'AI Assistant',
      href: '/ai',
      icon: 'Bot',
      roles: ['ADMIN', 'MODERATOR', 'EMPLOYEE'] as UserRole[],
    },
    {
      title: 'Tools',
      href: '/tools',
      icon: 'Wrench',
      roles: ['ADMIN', 'MODERATOR', 'EMPLOYEE'] as UserRole[],
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: 'Settings',
      roles: ['ADMIN', 'MODERATOR'] as UserRole[],
    },
    {
      title: 'Admin',
      href: '/admin',
      icon: 'Shield',
      roles: ['ADMIN'] as UserRole[],
    },
  ];

  return allItems.filter(item => item.roles.includes(role));
}

export function canManageOrganization(role: UserRole): boolean {
  return role === 'ADMIN' || role === 'MODERATOR';
}

export function canInviteMembers(role: UserRole): boolean {
  return role === 'ADMIN' || role === 'MODERATOR';
}

export function canDeleteMembers(role: UserRole): boolean {
  return role === 'ADMIN';
}

export function canEditProject(role: UserRole): boolean {
  return role === 'ADMIN' || role === 'MODERATOR' || role === 'EMPLOYEE';
}

export function canViewProject(role: UserRole): boolean {
  return true; // All roles can view projects
}

export function canManageCustomer(role: UserRole): boolean {
  return role === 'ADMIN' || role === 'MODERATOR' || role === 'EMPLOYEE';
}

export function canViewCustomer(role: UserRole): boolean {
  return role !== 'CLIENT';
}

export function canUsePremiumTools(tier: string): boolean {
  return tier !== 'FREE';
}

export function getToolLimit(tier: string): number {
  const limits: Record<string, number> = {
    FREE: 0,
    TIER_1: 3,
    TIER_2: 10,
    TIER_3: Infinity,
  };

  return limits[tier] || 0;
}