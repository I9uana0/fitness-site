"use client";

import { Button } from "@heroui/react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const isPersonalDisabled = ["/login", "/register"].some((path) =>
    pathname.startsWith(path),
  );
  const isPersonalPage = pathname
    .split("/")
    .some((path) => path === "personal");

  async function logout() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed");
      setLoading(false);
    } finally {
      router.replace("/personal");
    }
  }

  return (
    <header className="bg-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <Link href={`/`}>
          <h1
            className="font-bold"
            aria-label="logo"
          >
            Технологический
          </h1>
        </Link>
        <div className="sm:flex gap-8 hidden">
          <Link href={`/`}>Главная</Link>
          <Link href={`/schedule`}>Расписание</Link>
        </div>
        {/* // todo добавить атрибуты для доступности */}
        {isPersonalPage ? (
          <div className="min-w-38 text-end">
            <Button
              onPress={logout}
              isDisabled={loading}
            >
              Выйти
            </Button>
          </div>
        ) : (
          <Link
            href={`/personal`}
            onClick={(e) => isPersonalDisabled && e.preventDefault()}
            className={`bg-[#FFD1DE] px-4 py-2 rounded-full ${!isPersonalDisabled ? "hover:bg-[#e3bac6] active:scale-[0.97]" : "cursor-default opacity-50"}`}
          >
            Личный кабинет
          </Link>
        )}
      </nav>
    </header>
  );
}
