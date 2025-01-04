import { z } from 'zod';

export const BookTitleTranslationSchema = z.object({
  language_id: z.number().positive(),
  book_id: z.number().positive(),
});
