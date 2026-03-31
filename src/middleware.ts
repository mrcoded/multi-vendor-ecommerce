import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const protectedPaths = ["/checkout", "/dashboard", "/onboarding", "/profile"];

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const { pathname, search } = req.nextUrl;
    const { method, headers } = req;

    // 🎯 Detect Server Actions
    const isServerAction = headers.has("next-action");
    const isLoginPage = pathname.startsWith("/login");
    const isProtectedPage = protectedPaths.some((path) =>
      pathname.startsWith(path),
    );

    // UNAUTHENTICATED REDIRECTS
    if (!token && isProtectedPage) {
      // If it's a Server Action attempt without a token, block it with 401
      if (isServerAction) {
        return new NextResponse(
          JSON.stringify({ message: "Unauthorized Action" }),
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

    // LOGGED-IN LOGIC
    if (token) {
      if (isLoginPage)
        return NextResponse.redirect(new URL("/dashboard", req.url));

      const userRole = token.role as string;
      if (userRole === "ADMIN") return NextResponse.next();

      // VENDOR LOGIC (Email Verification check)
      const isVendor = userRole === "VENDOR";
      const isVerified = token.emailVerified === true; // Note: simplified logic
      const isOnboardingPage = pathname.startsWith("/onboarding");

      if (isVendor && !isVerified && !isOnboardingPage) {
        // Redirect page requests; block Server Actions
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

      // SERVER ACTION RBAC
      // If a non-admin/non-vendor tries to hit a protected server action
      // (This replaces your old isApiRoute logic)
      if (isServerAction && !["ADMIN", "VENDOR"].includes(userRole)) {
        return new NextResponse(JSON.stringify({ message: "Forbidden" }), {
          status: 403,
        });
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
