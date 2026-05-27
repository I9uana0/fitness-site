import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = await cookies();

  const token = cookiesStore.get("token");

  if (!token) redirect("/login");

  return children;
}
