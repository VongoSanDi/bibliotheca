import { z } from 'zod';

const usernameValidation = z.string().min(1).max(12);

const passwordValidation = z
  .string()
  .min(1, 'password required')
  .max(10, 'The password must contain 10 characters minimum');

const numberIntValidation = z.number().gte(1).int();
const emailValidation = z.string().email().min(3).max(50);

export const userSchema = z.object({
  user_id: numberIntValidation,
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
  birth_date: z.string().date(),
  gender_id: numberIntValidation,
  country_id: numberIntValidation,
});

export const CreateUserSchema = z.object({
  username: usernameValidation,
  passport: passwordValidation,
  email: emailValidation,
  country_id: numberIntValidation,
  birth_date: z.string().date().optional(),
  gender_id: numberIntValidation.optional(),
});

export const RetrieveUserSchema = z.object({
  param: z.union([numberIntValidation, usernameValidation]),
  includePassword: z.boolean().optional(),
});
