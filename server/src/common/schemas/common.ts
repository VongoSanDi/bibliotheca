import { z } from 'zod';

export const PageOptionsSchema = z.object({
  take: z.number().min(1).max(100).default(10),
  skip: z.number().min(0).default(0),
  order: z.string().default('ASC'),
  orderBy: z.string().default('id'),
  page: z.number().optional(),
});
