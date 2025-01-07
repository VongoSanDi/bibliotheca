import { z } from 'zod';

export const SerieTitleTranslationSchema = z.object({
  serie_id: z.number().positive().optional(),
  translated_title: z.string()
})
