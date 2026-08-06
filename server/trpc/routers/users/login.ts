import { publicProcedure } from "~/server/trpc/trpc";
import { z } from "zod";
import { db } from "~/server/databse/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { jwtSign } from "~/lib/jwt";

const invalidEmailOrPassword = () => {
  throw new TRPCError({
    message: "Invalid email or password. Please try again",
    code: "FORBIDDEN",
  });
};

export const loginProcedure = publicProcedure
  .input(
    z
      .object({
        email: z.string(),
        password: z.string(),
      })
      .required(),
  )
  .mutation(async (req) => {
    const { email, password } = req.input;

    // Check the db, if the user exits in the db.
    // first get the email, then use bcrypt to compare the plaitext password with the hashed version
    const user = await db.user.findUnique({ where: { email } });
    if (!user) invalidEmailOrPassword();

    // after here, the eamil is found, now use bcrypt to compare the plaintext hash
    const isCorrectPassword = await bcrypt.compare(password, user!.password);
    if (!isCorrectPassword) invalidEmailOrPassword();

    // Now everything is working, the password is right, and the email too is right, now
    // let's generate a token and send it to the frontend as httpOnly cookie
    const token = jwtSign({
      name: user!.name,
      email: user!.email,
      id: user!.id,
    });

    // Set cookies for the client
    req.ctx.setCookies("cookies", "test-token");
    return { success: true, token, message: "User successfully logged in" };
  });
