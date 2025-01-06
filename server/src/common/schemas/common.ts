import { z } from 'zod';

export const PageOptionsSchema = z.object({
  take: z.number().min(1).max(50),
  page: z.number().min(1),
  order: z.string(),
  orderBy: z.string(),
});
