import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators/auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { email, password, name, surname, phone, dateOfBirth } = parsed.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { error: "Пользователь уже создан" },
        { status: 400 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        surname,
        phone,
        dateOfBirth: new Date(dateOfBirth),
      },
    });

    return NextResponse.json(
      { user, message: "Пользователь успешно создан!" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Ошибка при создании пользователя:", error);
    return NextResponse.json(
      { message: "Что-то пошло не так.", error: error.message },
      { status: 500 },
    );
  }
}
