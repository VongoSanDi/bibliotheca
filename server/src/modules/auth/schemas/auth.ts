import {
  passwordValidation,
  usernameValidation,
} from 'src/common/schemas/user';
import { z } from 'zod';

export const signInSchema = z.object({
  username: usernameValidation,
  password: passwordValidation,
});
