import { z } from 'zod';

export const SerieTitleTranslationSchema = z.object({
  language_id: z.number().positive(),
  serie_id: z.number().positive(),
});
