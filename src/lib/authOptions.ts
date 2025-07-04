import { db } from "./db";
import { compare } from "bcrypt";

import { JWT } from "next-auth/jwt";
import { User, Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@email.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please provide both email and password.");
          }

          // Find user in the database
          const existingUser = await db.user.findUnique({
            where: { email: credentials.email },
          });

          if (!existingUser) {
            throw new Error("No user found with the provided email.");
          }

          // Check if password matches
          const isPasswordValid = await compare(
            credentials.password,
            existingUser.password
          );

          if (!isPasswordValid) {
            throw new Error("Incorrect password.");
          }

          // Return user data to be included in the JWT
          const user = {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
            status: existingUser.status,
            imageUrl: existingUser.imageUrl ?? undefined,
            emailVerified: existingUser.emailVerified,
          };
          return user as User;
        } catch (error) {
          console.log(error);
          throw { error: "Something went wrong", status: 401 };
        }
      },
    }),
  ],
  callbacks: {
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          role: token.role as string,
          status: token.status as boolean,
          imageUrl: token.picture as string,
          emailVerified: token.emailVerified as boolean,
        };
      }
      console.log("Session: ", session);
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: User }): Promise<JWT> {
      if (user) {
        const updatedUser = await db.user.findUnique({
          where: { id: user.id },
          include: {
            vendorProfile: true,
          },
        });
        // console.log("upd", updatedUser);

        token.imageUrl = updatedUser?.imageUrl ?? token.imageUrl;

        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.status = user.status;
        token.emailVerified = user.emailVerified;
      }
      // console.log("Token: ", token);
      return token;
    },
  },
};
