import type { H3Event } from "h3";
import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export function createContext(
  event: H3Event,
  { resHeaders }: FetchCreateContextFnOptions,
) {
  const cookies = parseCookies(event);
  return {
    cookies,
    setCookies: (name: string, value: string) => {
      resHeaders.set(name, value);
    },
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
