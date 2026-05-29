"use client";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { getMe, login, register } from "@/lib/auth/auth";
import { RegisterData } from "@/model/types";
import { useUserState } from "@/model/useUserState";
import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function handleRegister(data: RegisterData) {
    setLoading(true);
    try {
      await register(data);
      await login(data);
      await getMe()
        .then(useUserState.getState().setUser)
        .catch(useUserState.getState().resetUser);
      router.push(callbackUrl);
    } catch (error: any) {
      toast.error("Ошибка регистрации: " + error.message);
      setLoading(false);
    }
  }
  return (
    <RegisterForm
      callbackUrl={callbackUrl}
      onSubmit={handleRegister}
      loading={loading}
    />
  );
}
