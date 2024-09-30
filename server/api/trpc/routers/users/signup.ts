import { publicProcedure } from "~/server/api/trpc/trpc";
import { z } from "zod";
import { db } from "~/server/databse/db";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";

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

  .mutation(async (req) => {
    const { name, email, password } = req.input;
    try {
      // Check if user exists in the db
      const existingUser = await db.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new TRPCError({
          message: "User already exits",
          code: "BAD_REQUEST",
          cause: "User already exists",
        });
      }

      // hash the password before storing
      const passwordHash = await bcrypt.hash(password, 10);

      // register user
      const newUser = await db.user.create({
        data: {
          email,
          name,
          password: passwordHash,
        },
      });

      if (newUser) {
        return {
          success: true,
          message: "User created successfully",
          user: {
            name: newUser.name,
            id: newUser.id,
            email: newUser.email,
          },
        };
      } else
        throw new TRPCError({
          message: "An unexpected error occurred",
          code: "INTERNAL_SERVER_ERROR",
        });
    } catch (e) {
      if (e instanceof TRPCError) {
        throw e;
      } else {
        throw new Error();
      }
    }
  });
