import { hc } from "hono/client";
import type { AppType } from ".";

const client = hc<AppType>("http://localhost:3000");

const res = await client.api.user[":id"].$get({ param: { id: "1" } });

if (res.ok) {
  const data = await res.text();
  console.log(data);
}
