import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const getUserParam = z.object({
  id: z.coerce.number().int().positive(),
});

const userRoute = new Hono().get(
  "/:id",
  zValidator("param", getUserParam),
  async (c) => {
    const { id } = c.req.valid("param");
    return c.text(`Hello ${id}!`);
  },
);

export default userRoute;
