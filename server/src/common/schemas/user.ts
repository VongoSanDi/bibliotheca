import { z } from 'zod';

export const usernameValidation = z.string().min(1).max(12);

export const passwordValidation = z
  .string()
  .min(1, 'password required')
  .max(10, 'The password must contain 10 characters minimum');
