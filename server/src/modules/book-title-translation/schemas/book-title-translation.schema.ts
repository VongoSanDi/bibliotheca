import { z } from 'zod';

export const BookTitleTranslationSchema = z.number().positive();
