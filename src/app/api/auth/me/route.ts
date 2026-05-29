import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth/authUtils";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const cookiesStore = await cookies();

    const token = cookiesStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyJWT(token);

    const user = await prisma.user.findUnique({
      where: { id: payload?.sub as string },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        phone: true,
        dateOfBirth: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
