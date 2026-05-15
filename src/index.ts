import { Hono } from 'hono';
import userRoute from './routes/user';
import { bearerAuth } from 'hono/bearer-auth';

const token = 'honoiscool';

const app = new Hono();
app.use('/api/*', bearerAuth({ token }));

const api = new Hono().route('/user', userRoute);

const _routes = app.route('/api', api);

export default {
  fetch: app.fetch,
};
export type AppType = typeof _routes;
