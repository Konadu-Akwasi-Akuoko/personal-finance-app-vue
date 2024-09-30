import { createNuxtApiHandler } from "trpc-nuxt";
import { appRouter } from "~/server/api/trpc/routers";

export default createNuxtApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
