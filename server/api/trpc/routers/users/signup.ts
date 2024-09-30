import { publicProcedure } from "~/server/api/trpc/trpc";
import { z } from "zod";

export const signupProcedure = publicProcedure
  .input(
    z
      .object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(8),
      })
      .required(),
  )
  .mutation((req) => {
    return { name: req.input.name };
  });
