import { router } from "~/server/api/trpc/trpc";
import { loginProcedure } from "~/server/api/trpc/routers/users/login";
import { signupProcedure } from "~/server/api/trpc/routers/users/signup";

export const appRouter = router({
  login: loginProcedure,
  signup: signupProcedure,
});

export type AppRouter = typeof appRouter;
