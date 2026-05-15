import { Hono } from 'hono';
import userRoute from './routes/user';
import { bearerAuth } from 'hono/bearer-auth';
import { cors } from 'hono/cors';

const token = 'honoiscool';

const app = new Hono();
app.use('/api/*', bearerAuth({ token }));
app.use(
  '*',
  cors({
    origin: ['http://localhost:3000'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })
);

const api = new Hono().route('/user', userRoute);

const _routes = app.route('/api', api);

export default {
  fetch: app.fetch,
};
export type AppType = typeof _routes;
