import jwt from "jsonwebtoken";

type userType = { email: string; name: string; id: string };

export function jwtSign(user: userType) {
  return jwt.sign(
    {
      name: user.name,
      email: user.email,
      id: user.id,
    },
    process.env.JWT_TOKEN_SECRET as string,
    { expiresIn: "1d" },
  );
}
