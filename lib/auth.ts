import bcrypt from "bcrypt";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { IUser } from "./api";
import { db } from "./db";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (
  plainTextPassword: string,
  hashedPassword: string
) => bcrypt.compare(plainTextPassword, hashedPassword);

export const createJWT = (user: IUser) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", type: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));
};

export const validateJWT = async (jwt: string): Promise<JWTPayload> => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET!)
  );
  return payload.payload as JWTPayload;
};

export const getUserFromCookie = async (cookies: any) => {
  console.log(cookies);
  const jwt = cookies.get(process.env.COOKIE_NAME!);

  const { id } = await validateJWT(jwt.value);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });
  return user;
};
