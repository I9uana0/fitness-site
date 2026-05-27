import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_ROUTES } from "./auth/protectedRoutes";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (!token && isProtected) {
    const url = new URL("/login", req.url);

    url.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
