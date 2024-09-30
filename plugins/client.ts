import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "~/server/api/trpc/routers";
import { errorLink } from "~/utils/trpc-links/errorLink";

export default defineNuxtPlugin(() => {
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      errorLink,
      httpBatchLink({ url: "http://localhost:3000/api/trpc" }),
    ],
  });

  return { provide: { client } };
});
