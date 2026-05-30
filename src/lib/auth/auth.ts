import { LoginData, RegisterData } from "@/model/types";

export async function register(data: RegisterData) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json().catch(console.error);

  if (!res.ok) {
    throw new Error(result?.error || result?.message || "Register failed");
  }

  return result;
}

export async function login(data: LoginData) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(result?.error || result?.message || "Login failed");
  }

  return result;
}

export async function getMe() {
  const res = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include",
  });

  const result = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(result?.error || "Failed to fetch user");
  }

  return {
    ...result,
    dateOfBirth: result.dateOfBirth
      ? new Date(result.dateOfBirth).toISOString().split("T")[0]
      : result.dateOfBirth,
  };
}
