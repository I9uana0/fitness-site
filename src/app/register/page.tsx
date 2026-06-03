import { RegisterForm } from "@/components/forms/RegisterForm";

import { Suspense } from "react";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  const { callbackUrl = "/" } = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          Загрузка...
        </div>
      }
    >
      <RegisterForm callbackUrl={callbackUrl} />
    </Suspense>
  );
}
