import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export type JwtPayload = {
  sub: string | number;
  email?: string;
};

export function createJWT(payload: JwtPayload) {
  if (!payload) throw new Error("JWT payload couldn't be null or undefined");
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "1h" });
}

export function verifyJWT(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET as string) as JwtPayload;
  } catch {
    return null;
  }
}
