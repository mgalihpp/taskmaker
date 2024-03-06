import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.has("next-auth.session-token");

  if (!token) {
    return NextResponse.redirect(new URL("/?callback=not_authorized", req.url));
  }

  if (req.nextUrl.pathname === "/organization") {
    return NextResponse.redirect(new URL("/select-organization", req.url));
  }

  return NextResponse.next();
}

// Configuration for the middleware
export const config = {
  matcher: [
    // Exclude specific paths, allowing all others
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|logo.svg|public/).+)",
  ],
};
