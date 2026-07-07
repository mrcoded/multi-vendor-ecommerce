import { NextResponse } from "next/server";
import type { Session } from "next-auth";
import { auth } from "@/auth";

const protectedPaths = ["/checkout", "/dashboard", "/onboarding", "/profile"];

export default auth((req) => {
  const proxyStart = Date.now();
  const { pathname, search } = req.nextUrl;
  const { headers } = req;

  // Auth API routes must always pass through — signIn/signOut/session need JSON, not redirects
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const user = req.auth?.user as Session["user"] | undefined;
  const isServerAction = headers.has("next-action");
  const isLoginPage = pathname.startsWith("/login");
  const isProtectedPage = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  // 1. UNAUTHENTICATED GUARD
  if (!user && isProtectedPage) {
    if (isServerAction) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized: Please log in" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    const callbackUrl = encodeURIComponent(`${pathname}${search}`);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, req.url),
    );
  }

  // 2. AUTHENTICATED LOGIC
  if (user) {
    if (isLoginPage)
      return NextResponse.redirect(new URL("/dashboard", req.url));

    const userRole = user.role;
    const isVendor = userRole === "VENDOR";
    const isUser = userRole === "USER";

    const adminOnlyRoutes = [
      "/dashboard/customers",
      "/dashboard/vendors",
      "/dashboard/categories",
    ];

    const isAdminRoute = adminOnlyRoutes.some((route) =>
      pathname.startsWith(route),
    );
    // --- THE ADMIN ONLY ROUTE ---
    if (isAdminRoute && (isUser || isVendor)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // --- VENDOR ONBOARDING ---
    const isOnboardingPage = pathname.startsWith("/onboarding");
    const isVerified = user.status === true;

    if (isVendor && isOnboardingPage && isVerified) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (isVendor && !isVerified && !isOnboardingPage) {
      if (isServerAction) {
        return new NextResponse(
          JSON.stringify({ message: "Onboarding Required" }),
          { status: 403 },
        );
      }
      return NextResponse.redirect(new URL(`/onboarding/${user.id}`, req.url));
    }
  }

  // #region agent log
  if (pathname.startsWith("/dashboard")) {
    fetch("http://127.0.0.1:7704/ingest/beb5adb7-ea2f-4f2d-9f5d-fd3483b578e0", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "219b6c",
      },
      body: JSON.stringify({
        sessionId: "219b6c",
        runId: "pre-fix",
        hypothesisId: "D",
        location: "proxy.ts:exit",
        message: "proxy completed for dashboard",
        data: {
          pathname,
          durationMs: Date.now() - proxyStart,
          hasUser: !!user,
          redirected: false,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
  }
  // #endregion

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/checkout/:path*",
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/profile/:path*",
    "/login",
    "/api/:path*",
  ],
};
