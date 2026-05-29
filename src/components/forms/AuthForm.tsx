"use client";

import { builCallbackUrl } from "@/lib/urlUtils";
import { LoginData } from "@/model/types";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";

interface AuthFormProps {
  onSubmit: ({ email, password }: LoginData) => void;
  loading: boolean;
  callbackUrl: string;
}

export function AuthForm({ onSubmit, loading, callbackUrl }: AuthFormProps) {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    onSubmit({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex w-96 flex-col gap-4 bg-white p-8 rounded-3xl shadow-sm"
    >
      <div className="">
        <h1 className="text-center font-bold text-2xl">Авторизация</h1>
        <p className="text-sm text-center">Войдите в свой аккаунт</p>
      </div>
      <TextField
        isRequired
        type="email"
        name="email"
        validate={(value) => {
          const email = value.trim();
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            return "Введите корректный email, пожалуйста";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="email@example.com" />
        <FieldError>
          {(validation) => validation.validationErrors.join(", ")}
        </FieldError>
      </TextField>
      <TextField
        isRequired
        type="password"
        name="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Пароль должен содержать минимум 8 символов";
          }
          if (!/[A-Z]/.test(value)) {
            return "Пароль должен содержать минимум одну прописную букву";
          }
          if (!/[0-9]/.test(value)) {
            return "Пароль должен содержать минимум одну цифру";
          }
          return null;
        }}
      >
        <Label>Пароль</Label>
        <Input placeholder="Введите пароль" />
        <FieldError />
      </TextField>
      <div className="flex gap-2 w-full">
        <Button
          className="w-full text-base"
          type="reset"
          variant="tertiary"
          isDisabled={loading}
        >
          Сбросить
        </Button>
        <Button
          className="w-full text-base"
          type="submit"
          isDisabled={loading}
        >
          Войти
        </Button>
      </div>
      <p className="text-center">
        Нет аккаунта?{" "}
        <Link
          href={builCallbackUrl("/register", callbackUrl)}
          className="text-[#f689a9]"
        >
          Зарегистрироваться
        </Link>
      </p>
    </Form>
  );
}
