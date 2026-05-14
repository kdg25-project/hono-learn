import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { db } from '../../db';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';

const getUserByIdParam = z.object({
  id: z.coerce.number().int().positive(),
});

const createUserBody = z.object({
  name: z.string(),
  email: z.email(),
});

const userRoute = new Hono()
  .get('/', async (c) => {
    const result = await db.select().from(users);
    return c.json(result);
  })
  .post('/', zValidator('json', createUserBody), async (c) => {
    const { name, email } = c.req.valid('json');
    await db.insert(users).values({
      name,
      email,
    });
    return c.text('User created successfully');
  })
  .get('/:id', zValidator('param', getUserByIdParam), async (c) => {
    const { id } = c.req.valid('param');
    const result = await db.select().from(users).where(eq(users.id, id));
    return c.json(result);
  })
  .put(
    '/:id',
    zValidator('param', getUserByIdParam),
    zValidator('json', createUserBody),
    async (c) => {
      const { id } = c.req.valid('param');
      const { name, email } = c.req.valid('json');
      const result = await db
        .update(users)
        .set({
          name,
          email,
        })
        .where(eq(users.id, id));
      return c.json(result);
    }
  )
  .delete('/:id', zValidator('param', getUserByIdParam), async (c) => {
    const { id } = c.req.valid('param');
    const result = await db.delete(users).where(eq(users.id, id));
    return c.json(result);
  });

export default userRoute;
