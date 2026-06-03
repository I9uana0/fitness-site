import { AuthForm } from "@/components/forms/AuthForm";
import { Suspense } from "react";

export default async function LoginPage({
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
      <AuthForm callbackUrl={callbackUrl} />
    </Suspense>
  );
}
