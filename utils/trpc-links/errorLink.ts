import type { TRPCLink } from "@trpc/client";
import type { AppRouter } from "~/server/api/trpc/routers";
import { observable } from "@trpc/server/observable";
import { toast } from "vue-sonner";

export const errorLink: TRPCLink<AppRouter> = () => {
  return ({ next, op }) => {
    return observable((observer) => {
      return next(op).subscribe({
        next(value) {
          observer.next(value);
        },
        error: (err) => {
          toast(err.message, {
            action: {
              label: "Ok",
            },
          });
          observer.error(err);
        },
        complete() {
          observer.complete();
        },
      });
    });
  };
};
