import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "@/lib/db";

const USER_DB_REFRESH_MS = 5 * 60 * 1000;

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@email.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password.");
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!existingUser) {
          throw new Error("No user found with the provided email.");
        }

        // if (!existingUser.status) {
        //   throw new Error("Your account is currently inactive.");
        // }

        // Vendors are allowed to sign in before verification for onboarding flow.
        if (existingUser.role === "VENDOR" && !existingUser.emailVerified) {
          throw new Error("Please verify your email before signing in.");
        }

        const isPasswordValid = await compare(
          credentials.password as string,
          existingUser.password,
        );

        if (!isPasswordValid) {
          throw new Error("Incorrect password.");
        }

        return {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role,
          status: existingUser.status,
          imageUrl: existingUser.imageUrl ?? undefined,
          emailVerified: existingUser.emailVerified,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.status = user.status;
        token.imageUrl = user.imageUrl;
        token.emailVerified = !!user.emailVerified;
        token.userRefreshedAt = Date.now();
        return token;
      }

      const lastRefresh = (token.userRefreshedAt as number | undefined) ?? 0;
      const shouldRefreshDb =
        trigger === "update" || Date.now() - lastRefresh > USER_DB_REFRESH_MS;

      if (token.id && shouldRefreshDb) {
        const dbStart = Date.now();
        const dbUser = await db.user.findUnique({
          where: { id: token.id as string },
          select: {
            status: true,
            role: true,
            name: true,
            email: true,
            imageUrl: true,
            emailVerified: true,
          },
        });

        if (dbUser) {
          token.status = dbUser.status;
          token.role = dbUser.role;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.imageUrl = dbUser.imageUrl ?? undefined;
          token.emailVerified = dbUser.emailVerified;
        }

        token.userRefreshedAt = Date.now();

        // #region agent log
        fetch(
          "http://127.0.0.1:7704/ingest/beb5adb7-ea2f-4f2d-9f5d-fd3483b578e0",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Debug-Session-Id": "219b6c",
            },
            body: JSON.stringify({
              sessionId: "219b6c",
              runId: "post-fix",
              hypothesisId: "B",
              location: "auth.ts:jwt-db-refresh",
              message: "jwt refreshed user from database",
              data: {
                durationMs: Date.now() - dbStart,
                trigger: trigger ?? null,
              },
              timestamp: Date.now(),
            }),
          },
        ).catch(() => {});
        // #endregion
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.status = token.status as boolean;
        session.user.imageUrl = token.imageUrl as string | undefined;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
