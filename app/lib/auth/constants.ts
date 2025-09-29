export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR',
  EMPLOYEE: 'EMPLOYEE',
  CLIENT: 'CLIENT',
} as const;

export type UserRole = keyof typeof USER_ROLES;

export const SUBSCRIPTION_TIERS = {
  FREE: 'FREE',
  TIER_1: 'TIER_1',
  TIER_2: 'TIER_2',
  TIER_3: 'TIER_3',
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;

export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
} as const;

export const PROTECTED_ROUTES = [
  '/dashboard',
  '/crm',
  '/projects',
  '/ai',
  '/tools',
  '/settings',
] as const;

export const PUBLIC_ROUTES = [
  '/',
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
] as const;

export const ROLE_PERMISSIONS = {
  ADMIN: {
    canViewAllOrganizations: true,
    canManageUsers: true,
    canManageOrganizations: true,
    canManageProjects: true,
    canManageCustomers: true,
    canManageAI: true,
    canManageBilling: true,
    canViewAnalytics: true,
    canManageSettings: true,
  },
  MODERATOR: {
    canViewAllOrganizations: false,
    canManageUsers: true,
    canManageOrganizations: false,
    canManageProjects: true,
    canManageCustomers: true,
    canManageAI: true,
    canManageBilling: false,
    canViewAnalytics: true,
    canManageSettings: true,
  },
  EMPLOYEE: {
    canViewAllOrganizations: false,
    canManageUsers: false,
    canManageOrganizations: false,
    canManageProjects: true,
    canManageCustomers: true,
    canManageAI: true,
    canManageBilling: false,
    canViewAnalytics: true,
    canManageSettings: false,
  },
  CLIENT: {
    canViewAllOrganizations: false,
    canManageUsers: false,
    canManageOrganizations: false,
    canManageProjects: false,
    canManageCustomers: false,
    canManageAI: false,
    canManageBilling: false,
    canViewAnalytics: false,
    canManageSettings: false,
  },
} as const;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  SESSION_EXPIRED: 'Session expired. Please login again',
  UNAUTHORIZED: 'You do not have permission to access this resource',
  FORBIDDEN: 'Access forbidden',
} as const;