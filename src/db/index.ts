import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({
  url: "file:src/db/dev.db",
});

export const db = drizzle(client);
