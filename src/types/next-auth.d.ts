import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      status: boolean;
      imageUrl?: string;
      emailVerified?: boolean;
    };
  }

  interface User extends DefaultUser {
    role: string;
    status: boolean;
    imageUrl?: string;
    emailVerified?: boolean;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    role: string;
    status: boolean;
    imageUrl?: string;
    emailVerified?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string | null | undefined;
    email: string | null | undefined;
    role: string;
    status: boolean;
    imageUrl?: string;
    emailVerified?: boolean;
  }
}
