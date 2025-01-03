import { userIdValidation } from 'src/common/schemas/user';
import { z } from 'zod';

export const RetrieveUserCollectionSchema = z.object({
  user_id: userIdValidation,
});
