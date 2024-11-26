import { z } from 'zod';

export const BookResponseSchema = z.object({
  isbn: z.string(),
});
