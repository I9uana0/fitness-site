import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { userId } from "@/model/types";

export async function getCurrentUser() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
    sub: userId;
    email: string;
  };

  return payload;
}
