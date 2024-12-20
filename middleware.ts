import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_CONFIG } from "@/lib/config/constants";

// Add paths that require authentication
const protectedPaths = ["/account", "/dashboard", "/checkout"];

// Add paths that should redirect if already authenticated
const authPaths = ["/auth/login", "/auth/register"];

export function middleware(request: NextRequest) {
  // Get token from cookie
  const token = request.cookies.get(AUTH_CONFIG.TOKEN_KEY)?.value;

  const { pathname, search } = request.nextUrl;

  // Check if path requires authentication
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      // Create login URL with redirect
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname + search);

      return NextResponse.redirect(loginUrl);
    }
  }

  // Prevent authenticated users from accessing auth pages
  if (authPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static assets and API routes
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
