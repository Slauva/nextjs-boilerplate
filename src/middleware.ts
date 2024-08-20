import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/shared/config/i18n";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    // "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    // `/(ru|en)/:path*`,

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    // "/((?!_next|_vercel|.*\\..*).*)",

    // Disable paths
    // "/((?!api|static|favicon.ico).*)",
    "/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images/books|icons|manifest).*)",
  ],
};

const intl = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: "never",
});

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }
  return intl(request);
}
