import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "~/server/api/trpc/routers";

export default defineNuxtPlugin(() => {
  const client = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: "http://localhost:3000/api/trpc" })],
  });

  return { provide: { client } };
});
