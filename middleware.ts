import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get(
    process.env.NODE_ENV === "development"
      ? "next-auth.session-token"
      : "__Secure-next-auth.session-token",
  );

  const crfToken = req.cookies.get(
    process.env.NODE_ENV === "development"
      ? "next-auth.csrf-token"
      : "__Host-next-auth.csrf-token",
  );

  const isNotAuthorized =
    !token ||
    !crfToken ||
    token.value === "" ||
    crfToken.value === "" ||
    token.value.length !== 36;

  const callbackUrl = req.nextUrl.pathname.replace(/\//g, "%2F");

  if (isNotAuthorized) {
    return NextResponse.redirect(
      new URL(`/?auth=not_authorized&callbackUrl=${callbackUrl}`, req.url),
    );
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
