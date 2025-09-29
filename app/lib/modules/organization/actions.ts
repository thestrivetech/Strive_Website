'use server';

import { prisma } from '@/lib/prisma';
import { createServerSupabaseClientWithAuth } from '@/lib/supabase-server';
import {
  createOrganizationSchema,
  inviteTeamMemberSchema,
  updateMemberRoleSchema,
  type CreateOrganizationInput,
  type InviteTeamMemberInput,
  type UpdateMemberRoleInput
} from './schemas';
import { revalidatePath } from 'next/cache';
import { OrgRole } from '@prisma/client';

export async function createOrganization(input: CreateOrganizationInput) {
  const supabase = await createServerSupabaseClientWithAuth();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const validated = createOrganizationSchema.parse(input);

  // Check if slug is already taken
  const existingOrg = await prisma.organization.findUnique({
    where: { slug: validated.slug },
  });

  if (existingOrg) {
    throw new Error('Organization slug already taken');
  }

  // Create organization and add user as owner
  const org = await prisma.organization.create({
    data: {
      name: validated.name,
      slug: validated.slug,
      description: validated.description,
      billingEmail: validated.billingEmail,
      members: {
        create: {
          userId: user.id,
          role: OrgRole.OWNER,
        },
      },
    },
    include: {
      members: true,
    },
  });

  revalidatePath('/dashboard');
  revalidatePath('/settings');

  return org;
}

export async function inviteTeamMember(input: InviteTeamMemberInput) {
  const supabase = await createServerSupabaseClientWithAuth();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const validated = inviteTeamMemberSchema.parse(input);

  // Check if user has permission to invite (must be OWNER or ADMIN)
  const currentMember = await prisma.organizationMember.findFirst({
    where: {
      userId: user.id,
      organizationId: validated.organizationId,
    },
  });

  if (!currentMember || (currentMember.role !== OrgRole.OWNER && currentMember.role !== OrgRole.ADMIN)) {
    throw new Error('Insufficient permissions');
  }

  // Check if user already exists
  let invitedUser = await prisma.user.findUnique({
    where: { email: validated.email },
  });

  // If user doesn't exist, create a placeholder user
  if (!invitedUser) {
    invitedUser = await prisma.user.create({
      data: {
        email: validated.email,
        role: 'EMPLOYEE',
      },
    });
  }

  // Check if user is already a member
  const existingMember = await prisma.organizationMember.findFirst({
    where: {
      userId: invitedUser.id,
      organizationId: validated.organizationId,
    },
  });

  if (existingMember) {
    throw new Error('User is already a member of this organization');
  }

  // Add user to organization
  const member = await prisma.organizationMember.create({
    data: {
      userId: invitedUser.id,
      organizationId: validated.organizationId,
      role: validated.role as OrgRole,
    },
    include: {
      user: true,
    },
  });

  revalidatePath('/settings');

  return member;
}

export async function updateMemberRole(input: UpdateMemberRoleInput) {
  const supabase = await createServerSupabaseClientWithAuth();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const validated = updateMemberRoleSchema.parse(input);

  // Get the member to update
  const memberToUpdate = await prisma.organizationMember.findUnique({
    where: { id: validated.memberId },
  });

  if (!memberToUpdate) {
    throw new Error('Member not found');
  }

  // Check if current user has permission (must be OWNER or ADMIN)
  const currentMember = await prisma.organizationMember.findFirst({
    where: {
      userId: user.id,
      organizationId: memberToUpdate.organizationId,
    },
  });

  if (!currentMember || (currentMember.role !== OrgRole.OWNER && currentMember.role !== OrgRole.ADMIN)) {
    throw new Error('Insufficient permissions');
  }

  // Can't change owner's role
  if (memberToUpdate.role === OrgRole.OWNER) {
    throw new Error('Cannot change owner role');
  }

  // Update role
  const updatedMember = await prisma.organizationMember.update({
    where: { id: validated.memberId },
    data: { role: validated.role as OrgRole },
    include: { user: true },
  });

  revalidatePath('/settings');

  return updatedMember;
}

export async function removeMemberFromOrganization(memberId: string) {
  const supabase = await createServerSupabaseClientWithAuth();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // Get the member to remove
  const memberToRemove = await prisma.organizationMember.findUnique({
    where: { id: memberId },
  });

  if (!memberToRemove) {
    throw new Error('Member not found');
  }

  // Check if current user has permission (must be OWNER or ADMIN)
  const currentMember = await prisma.organizationMember.findFirst({
    where: {
      userId: user.id,
      organizationId: memberToRemove.organizationId,
    },
  });

  if (!currentMember || (currentMember.role !== OrgRole.OWNER && currentMember.role !== OrgRole.ADMIN)) {
    throw new Error('Insufficient permissions');
  }

  // Can't remove owner
  if (memberToRemove.role === OrgRole.OWNER) {
    throw new Error('Cannot remove owner from organization');
  }

  await prisma.organizationMember.delete({
    where: { id: memberId },
  });

  revalidatePath('/settings');

  return { success: true };
}