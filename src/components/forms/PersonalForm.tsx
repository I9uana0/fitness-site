"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button, FieldError, Input, Label, TextField } from "@heroui/react";

import { useUserState } from "@/model/useUserState";

type UserForm = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  dateOfBirth: string;
};

function getChangedFields<T extends Record<string, any>>(
  initial: T,
  current: T,
): Partial<T> {
  const diff: Partial<T> = {};

  for (const key in current) {
    if (current[key] !== initial[key]) {
      diff[key] = current[key];
    }
  }

  return diff;
}

export function PersonalForm() {
  const user = useUserState((s) => s.user);
  const setUser = useUserState((s) => s.setUser);

  const [isEditing, setIsEditing] = useState(false);

  // snapshot исходного состояния при входе в edit mode
  const [initial, setInitial] = useState<UserForm | null>(null);

  // локальный draft
  const [form, setForm] = useState<UserForm>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });

  // синхронизация zustand → form
  useEffect(() => {
    if (!user) return;

    const mapped: UserForm = {
      name: user.name ?? "",
      surname: user.surname ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      dateOfBirth: user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().slice(0, 10)
        : "",
    };

    setForm(mapped);
  }, [user]);

  // вход в режим редактирования → фиксируем snapshot
  const startEdit = () => {
    setInitial(form);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    if (initial) setForm(initial);
    setIsEditing(false);
  };

  const handleChange = (field: keyof UserForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!initial) return;

    const diff = getChangedFields(initial, form);

    if (Object.keys(diff).length === 0) {
      setIsEditing(false);
      return;
    }

    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diff),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      const data = await res.json();

      const updatedUser = data.updatedUser;

      // обновляем zustand
      if (!user) return;

      setUser({
        ...user,
        ...updatedUser,
      });

      // обновляем snapshot
      setInitial(form);

      setIsEditing(false);

      toast.success("Данные обновлены");
    } catch (error: any) {
      toast.error("Ошибка обновления данных");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-8 rounded-3xl shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Мои данные</h1>

        {!isEditing ? (
          <Button
            type="button"
            onPress={startEdit}
          >
            Редактировать
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              onPress={cancelEdit}
            >
              Отмена
            </Button>

            <Button
              type="submit"
              variant="primary"
            >
              Сохранить
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          isDisabled={!isEditing}
          name="name"
        >
          <Label>Имя</Label>
          <Input
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <FieldError />
        </TextField>

        <TextField
          isDisabled={!isEditing}
          name="surname"
        >
          <Label>Фамилия</Label>
          <Input
            value={form.surname}
            onChange={(e) => handleChange("surname", e.target.value)}
          />
          <FieldError />
        </TextField>

        <TextField
          isDisabled
          name="email"
          className="md:col-span-2"
        >
          <Label>Email</Label>
          <Input
            value={form.email}
            readOnly
          />
          <FieldError />
        </TextField>

        <TextField
          isDisabled={!isEditing}
          name="phone"
        >
          <Label>Телефон</Label>
          <Input
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <FieldError />
        </TextField>

        <TextField
          isDisabled={!isEditing}
          name="dateOfBirth"
        >
          <Label>Дата рождения</Label>
          <Input
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          />
          <FieldError />
        </TextField>
      </div>
    </form>
  );
}
