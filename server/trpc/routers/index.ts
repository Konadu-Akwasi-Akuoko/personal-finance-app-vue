import { router } from "~/server/trpc/trpc";
import { loginProcedure } from "~/server/trpc/routers/users/login";
import { signupProcedure } from "~/server/trpc/routers/users/signup";

export const appRouter = router({
  login: loginProcedure,
  signup: signupProcedure,
});

export type AppRouter = typeof appRouter;
