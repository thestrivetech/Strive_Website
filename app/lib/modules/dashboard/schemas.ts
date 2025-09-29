import { z } from 'zod';

export const dashboardFiltersSchema = z.object({
  organizationId: z.string().uuid(),
  dateRange: z.enum(['7days', '30days', '90days', 'all']).default('30days'),
});

export type DashboardFilters = z.infer<typeof dashboardFiltersSchema>;