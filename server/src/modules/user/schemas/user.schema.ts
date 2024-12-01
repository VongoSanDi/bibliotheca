import {
  passwordValidation,
  usernameValidation,
} from 'src/common/schemas/user';
import { z } from 'zod';

const numberIntValidation = z.number().positive();
const emailValidation = z.string().email().min(3).max(50);

export const userSchema = z.object({
  id: numberIntValidation,
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
  birth_date: z.string().date(),
  gender_id: numberIntValidation,
  country_id: numberIntValidation,
});

export const CreateUserSchema = z.object({
  username: usernameValidation,
  password: passwordValidation,
  email: emailValidation,
  country_id: numberIntValidation,
  birth_date: z.string().date().optional(),
  gender_id: numberIntValidation.optional(),
});

export const RetrieveUserSchema = z.object({
  param: z.union([numberIntValidation, usernameValidation]),
  includePassword: z.boolean().optional(),
});
