"use client";

import { getMe, login } from "@/lib/auth/auth";
import { builCallbackUrl } from "@/lib/urlUtils";
import { LoginData } from "@/model/types";
import { useUserState } from "@/model/useUserState";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AuthFormProps {
  callbackUrl: string;
}

export function AuthForm({ callbackUrl }: AuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    useUserState.getState().resetUser();
  }, []);

  async function handleLogin(data: LoginData) {
    setLoading(true);
    try {
      await login(data);
      await getMe()
        .then(useUserState.getState().setUser)
        .catch(useUserState.getState().resetUser);
      router.push(callbackUrl);
    } catch (error: any) {
      toast.error("Ошибка авторизации: " + error.message);
      setLoading(false);
    }
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    handleLogin({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="mx-auto flex sm:w-96 flex-col gap-4 bg-white p-8 rounded-3xl shadow-sm"
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
