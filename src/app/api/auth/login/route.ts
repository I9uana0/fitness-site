import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function createJWT(user: { id: string | number }) {
  return `fake-jwt-${user.id}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const token = createJWT({ id: 1 });

    const cookiesStore = await cookies();

    cookiesStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
