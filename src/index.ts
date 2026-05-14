import { Hono } from 'hono';
import userRoute from './routes/user';

const app = new Hono();

const api = new Hono().route('/user', userRoute);

const _routes = app.route('/api', api);

export default {
  fetch: app.fetch,
};
export type AppType = typeof _routes;
