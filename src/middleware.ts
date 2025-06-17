import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isDashboard = pathname.startsWith("/dashboard");
  const isProfile = pathname.startsWith("/profile");
  const isChat = pathname.startsWith("/chat");
  const isInvestor = pathname.startsWith("/dashboard/investor");
  const isEntrepreneur = pathname.startsWith("/dashboard/entrepreneur");

  // Redirect to login if accessing protected routes without session
  if (!session && (isDashboard || isProfile || isChat)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if accessing auth pages with session
  if (session && isAuthPage) {
    const userRole = session.user.role || "entrepreneur";
    return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url));
  }

  if (isAuthPage || pathname === "/") {
    if (session) {
      const redirectUrl =
        session.user.role === "investor" ? "/dashboard/investor" : "/dashboard/entrepreneur";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  if (isInvestor && session!.user.role !== "investor") {
    return NextResponse.redirect(new URL("/dashboard/entrepreneur", request.url));
  }

  if (isEntrepreneur && session!.user.role !== "entrepreneur") {
    return NextResponse.redirect(new URL("/dashboard/investor", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/entrepreneur",
    "/dashboard/investor",
    "/dashboard/:path*",
    "/profile/entrepreneur",
    "/profile/investor",
    "/profile/:path*",
    "/chat/(.*)",
  ],
};

// This middleware checks the session and redirects users based on their role and the requested path.
