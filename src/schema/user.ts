import { z } from 'zod';

export const getUserByIdParam = z.object({
  id: z.coerce.number().int().positive(),
});

export const createUserBody = z.object({
  name: z.string(),
  email: z.email(),
});
