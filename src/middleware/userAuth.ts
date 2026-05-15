import type { MiddlewareHandler } from 'hono';
import { auth } from '../lib/auth';

export const userAuth: MiddlewareHandler = async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.header()
  })

  if (!session) {
    return c.json({ success: false, message: 'Unauthorized' }, 401);
  }

  return await next();
}