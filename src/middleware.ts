import { NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

const protectedPaths = ["/checkout", "/dashboard", "/onboarding", "/profile"];

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const { pathname, search } = req.nextUrl;
    const { headers } = req;

    const isServerAction = headers.has("next-action");
    const isLoginPage = pathname.startsWith("/login");
    const isProtectedPage = protectedPaths.some((path) =>
      pathname.startsWith(path),
    );

    // 1. UNAUTHENTICATED GUARD
    if (!token && isProtectedPage) {
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
    if (token) {
      if (isLoginPage)
        return NextResponse.redirect(new URL("/dashboard", req.url));

      const userRole = token.role as string;
      const isVendor = userRole === "VENDOR";
      const isAdmin = userRole === "ADMIN";
      const isUser = userRole === "USER";

      const adminOnlyRoutes = [
        "/dashboard/customers",
        "/dashboard/vendors",
        "/dashboard/categories",
      ];

      // --- THE ADMIN ONLY ROUTE ---
      if (
        (adminOnlyRoutes.some((route) => pathname.includes(route)) && isUser) ||
        isVendor
      ) {
        return NextResponse.redirect(new URL("/", req.url)); // Send to home, not 403
      }

      // --- VENDOR ONBOARDING ---
      const isVerified = token.emailVerified === true;
      const isOnboardingPage = pathname.startsWith("/onboarding");

      if (isVendor && !isVerified && !isOnboardingPage) {
        if (isServerAction) {
          return new NextResponse(
            JSON.stringify({ message: "Onboarding Required" }),
            { status: 403 },
          );
        }
        return NextResponse.redirect(
          new URL(`/onboarding/${token.sub || token.id}`, req.url),
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: { authorized: () => true },
    secret: process.env.NEXTAUTH_SECRET,
  },
);

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
