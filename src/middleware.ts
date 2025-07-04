import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";

const secret = process.env.NEXTAUTH_SECRET;

const protectedPaths = ["/checkout", "/dashboard"];

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret });

    const pathname = req.nextUrl.pathname;

    // Redirect to login if trying to access protected routes without auth
    const isProtected = protectedPaths.some((path) =>
      pathname.startsWith(path)
    );

    if (!token && isProtected) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If user is vendor and email not verified, redirect
    if (token) {
      const isVendor = token.role === "VENDOR";
      const isVerified = token.emailVerified === true;
      // const isVerified = token.emailVerified === true;
      const isOnboardingPage = pathname.startsWith("/onboarding");

      if (isVendor && !isVerified && !isOnboardingPage) {
        const userId = token.sub || token.id;

        const onboardingUrl = new URL(`/onboarding/${userId}`, req.url);
        return NextResponse.redirect(onboardingUrl);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: async ({ token }) => {
        // Allow access to middleware, defer auth check to logic above
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // applies to all pages except static/api
};
