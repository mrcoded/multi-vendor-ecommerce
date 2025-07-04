import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      imageUrl?: string;
      status: boolean;
      emailVerified?: boolean;
    };
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
    imageUrl?: string;
    status: boolean;
    emailVerified?: boolean;
  }
}
