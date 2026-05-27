"use client";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { RegisterData } from "@/model/types";

import { useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  function handleRegister(data: RegisterData) {
    setLoading(true);
    try {
      console.log(data);
    } catch (error) {
      setLoading(false);
    }
    setTimeout(() => setLoading(false), 3000);
  }
  return (
    <RegisterForm
      onSubmit={handleRegister}
      loading={loading}
    />
  );
}
