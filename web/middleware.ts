import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = cookies().get("session")?.value;

  if (!sessionCookie && request.nextUrl.pathname === "/home") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const restrictedPaths = ["/login", "/signup", "/"];
  if (sessionCookie && restrictedPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/login", "/signup", "/"],
};
