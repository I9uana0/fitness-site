"use client";

import { RegisterData } from "@/model/types";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import IMask from "imask";
import { builCallbackUrl } from "@/lib/urlUtils";

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => void;
  loading: boolean;
  callbackUrl: string;
}

export function RegisterForm({
  onSubmit,
  loading,
  callbackUrl,
}: RegisterFormProps) {
  const phoneRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!phoneRef.current) return;

    const mask = IMask(phoneRef.current, {
      mask: "+{7} (000) 000-00-00",
    });

    return () => mask.destroy();
  }, []);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    onSubmit({
      name: String(formData.get("name")).trim(),
      surname: String(formData.get("surname")).trim(),
      phone: String(formData.get("phone") || "").replace(/\D/g, ""),
      dateOfBirth: String(formData.get("dateOfBirth")),
      email: String(formData.get("email")).trim().toLowerCase(),
      password: String(formData.get("password")),
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex w-96 flex-col gap-4 bg-white p-8 rounded-3xl shadow-sm"
    >
      <div className="">
        <h1 className="text-center font-bold text-2xl">Регистрация</h1>
        <p className="text-sm text-center">Создайте свой аккаунт</p>
      </div>
      <TextField
        isRequired
        type="text"
        name="name"
        validate={(value) => {
          const trimmed = value.trim();
          if (!trimmed) {
            return "Введите имя";
          }
          if (trimmed.length < 2) {
            return "Имя должно содержать минимум 2 символа";
          }
          if (trimmed.length > 50) {
            return "Имя слишком длинное. Максимум 50 символов";
          }
          if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(trimmed)) {
            return "Имя может содержать только буквы";
          }
          return null;
        }}
      >
        <Label>Имя</Label>
        <Input placeholder="Введите имя" />
        <FieldError>
          {(validation) => validation.validationErrors.join(", ")}
        </FieldError>
      </TextField>
      <TextField
        isRequired
        type="text"
        name="surname"
        validate={(value) => {
          const trimmed = value.trim();
          if (!trimmed) {
            return "Введите фамилию";
          }
          if (trimmed.length < 2) {
            return "Фамилия должно содержать минимум 2 символа";
          }
          if (trimmed.length > 50) {
            return "Фамилия слишком длинное. Максимум 50 символов";
          }
          if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(trimmed)) {
            return "Фамилия может содержать только буквы";
          }
          return null;
        }}
      >
        <Label>Фамилия</Label>
        <Input placeholder="Введите Фамилию" />
        <FieldError>
          {(validation) => validation.validationErrors.join(", ")}
        </FieldError>
      </TextField>
      <TextField
        type="tel"
        name="phone"
        isRequired
        validate={(value) => {
          const digits = value.replace(/\D/g, "");
          if (digits.length !== 11) {
            return "Введите номер полностью";
          }
          return null;
        }}
      >
        <Label>Телефон</Label>
        <Input
          ref={(el) => {
            if (!el) return;
            phoneRef.current = el;
          }}
          placeholder="+7 (000) 000-00-00"
        />
        {/*  todo Добавить подсказку про то, что не надо писать +7 */}
        <FieldError>
          {(validation) => validation.validationErrors.join(", ")}
        </FieldError>
      </TextField>
      <TextField
        name="dateOfBirth"
        isRequired
        validate={(value) => {
          if (!value) {
            return "Введите дату рождения";
          }
          const birth = new Date(value);
          if (Number.isNaN(birth.getTime())) {
            return "Некорректная дата";
          }
          const now = new Date();
          let age = now.getFullYear() - birth.getFullYear();
          const monthDiff = now.getMonth() - birth.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && now.getDate() < birth.getDate())
          ) {
            age--;
          }
          if (age < 18) {
            return "Минимальный возраст — 18 лет";
          }
          if (age > 100) {
            return "Максимальный возраст — 100 лет";
          }
          return null;
        }}
      >
        <Label>Дата рождения</Label>
        <Input type="date" />
        <FieldError>
          {(validation) => validation.validationErrors.join(", ")}
        </FieldError>
      </TextField>
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
          Регистрация
        </Button>
      </div>
      <p className="text-center">
        Есть аккаунт?{" "}
        <Link
          href={builCallbackUrl("/login", callbackUrl)}
          className="text-[#f689a9]"
        >
          Войти
        </Link>
      </p>
    </Form>
  );
}
