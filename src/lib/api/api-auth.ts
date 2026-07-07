import { NextResponse } from "next/server";
import { auth } from "@/auth";

type UserRole = "ADMIN" | "VENDOR" | "USER" | "MODERATOR";

export async function getSessionUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireAuth(allowedRoles?: UserRole[]) {
  const user = await getSessionUser();

  if (!user?.id) {
    return {
      ok: false as const,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  if (allowedRoles && !allowedRoles.includes(user.role as UserRole)) {
    return {
      ok: false as const,
      response: NextResponse.json({ message: "Forbidden" }, { status: 403 }),
    };
  }

  return { ok: true as const, user };
}

export function apiError(message: string, status = 500) {
  return NextResponse.json({ message }, { status });
}

export const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  status: true,
  plan: true,
  imageUrl: true,
  emailVerified: true,
  createdAt: true,
  updatedAt: true,
} as const;

export function sanitizeRegistrationRole(
  role: string | undefined,
  requested: "USER" | "VENDOR" = "USER",
): "USER" | "VENDOR" {
  if (role === "VENDOR" || requested === "VENDOR") return "VENDOR";
  return "USER";
}
