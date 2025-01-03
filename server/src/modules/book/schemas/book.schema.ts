import { z } from 'zod';

export const BookByIsbnResponseSchema = z.string();

export const RetrieveBookByFiltersSchema = z.object({
  title: z.string().optional(),
  author_id: z.number().positive().optional(),
});
