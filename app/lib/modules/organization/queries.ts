import { prisma } from '@/lib/prisma';
import type { Organization, OrganizationMember, User } from '@prisma/client';

export async function getOrganization(orgId: string): Promise<Organization | null> {
  return prisma.organization.findUnique({
    where: { id: orgId },
  });
}

export async function getOrganizationBySlug(slug: string): Promise<Organization | null> {
  return prisma.organization.findUnique({
    where: { slug },
  });
}

export async function getUserOrganizations(userId: string): Promise<(OrganizationMember & { organization: Organization })[]> {
  return prisma.organizationMember.findMany({
    where: { userId },
    include: { organization: true },
    orderBy: { joinedAt: 'desc' },
  });
}

export async function getOrganizationMembers(orgId: string): Promise<(OrganizationMember & { user: User })[]> {
  return prisma.organizationMember.findMany({
    where: { organizationId: orgId },
    include: { user: true },
    orderBy: { joinedAt: 'asc' },
  });
}

export async function checkSlugAvailability(slug: string): Promise<boolean> {
  const existing = await prisma.organization.findUnique({
    where: { slug },
    select: { id: true },
  });
  return !existing;
}

export async function getUserRoleInOrganization(userId: string, orgId: string) {
  const member = await prisma.organizationMember.findFirst({
    where: {
      userId,
      organizationId: orgId,
    },
    select: {
      role: true,
    },
  });
  return member?.role;
}