"use client";
import { AuthForm } from "@/components/forms/AuthForm";
import { LoginData } from "@/model/types";

import { useUserState } from "@/model/useUserState";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/";
  async function handleLogin(data: LoginData) {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      console.log(await response.json());
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
      router.push(callbackUrl);
    }
  }
  return (
    <AuthForm
      onSubmit={handleLogin}
      loading={loading}
    />
  );
}
