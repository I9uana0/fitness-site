"use client";
import { AuthForm } from "@/components/forms/AuthForm";
import { getMe, login } from "@/lib/auth/auth";
import { LoginData } from "@/model/types";

import { useUserState } from "@/model/useUserState";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    useUserState.getState().resetUser();
  }, []);

  const callbackUrl = searchParams.get("callbackUrl") || "/";
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
  return (
    <AuthForm
      callbackUrl={callbackUrl}
      onSubmit={handleLogin}
      loading={loading}
    />
  );
}
