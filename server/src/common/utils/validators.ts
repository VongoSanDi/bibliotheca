import { BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export const ValidateSchema = <T>(schema: ZodSchema, dto: any): T => {
  const result = schema.safeParse(dto);
  if (!result.success) {
    throw new BadRequestException(result.error.errors);
  }
  return result.data;
};
