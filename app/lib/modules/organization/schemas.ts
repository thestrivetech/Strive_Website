import { z } from 'zod';

export const createOrganizationSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().max(500).optional(),
  billingEmail: z.string().email().optional(),
});

export const updateOrganizationSchema = createOrganizationSchema.partial();

export const inviteTeamMemberSchema = z.object({
  email: z.string().email(),
  role: z.enum(['ADMIN', 'MODERATOR', 'EMPLOYEE', 'CLIENT']),
  organizationId: z.string().uuid(),
});

export const updateMemberRoleSchema = z.object({
  memberId: z.string().uuid(),
  role: z.enum(['ADMIN', 'MODERATOR', 'EMPLOYEE', 'CLIENT']),
});

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>;
export type InviteTeamMemberInput = z.infer<typeof inviteTeamMemberSchema>;
export type UpdateMemberRoleInput = z.infer<typeof updateMemberRoleSchema>;