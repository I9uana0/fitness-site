import { getCurrentUser } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const user = await getCurrentUser();

    if (!user?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data: any = {};

    if (body.name) data.name = body.name;
    if (body.surname) data.surname = body.surname;

    if (body.phone) {
      data.phone = body.phone.replace(/\D/g, "");
    }

    if (body.dateOfBirth) {
      data.dateOfBirth = new Date(body.dateOfBirth);
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.sub },
      data,
      select: {
        name: true,
        surname: true,
        phone: true,
        dateOfBirth: true,
      },
    });

    return NextResponse.json({ updatedUser });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
