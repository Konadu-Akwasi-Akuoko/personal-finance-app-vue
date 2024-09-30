import { publicProcedure } from "~/server/api/trpc/trpc";
import { z } from "zod";

export const loginProcedure = publicProcedure
  .input(
    z
      .object({
        email: z.string(),
        password: z.string(),
      })
      .required(),
  )
  .mutation((req) => {
    return { success: true, req };
  });
