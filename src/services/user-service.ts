import { db } from "@/lib/db";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/api/cache";
import { CreateUserProps, UserProps } from "@/types/user";
import { sanitizeRegistrationRole } from "@/lib/api/api-auth";
import { sanitizeUserRegistrationInput } from "@/lib/sanitize-payloads";
import { unstable_cache } from "next/cache";
import bcrypt from "bcryptjs";
import base64url from "base64url";
import { v4 as uuidv4 } from "uuid";

const getCachedAllUsers = unstable_cache(
  async () => {
    return await db.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        plan: true,
        createdAt: true,
      },
    });
  },
  ["all-users-list"],
  { tags: [CACHE_TAGS.usersList], revalidate: CACHE_TTL.dashboard },
);

export async function getAllUsers() {
  return getCachedAllUsers();
}

export async function getUserByEmail(email: string) {
  if (!email) return null;
  return await db.user.findUnique({ where: { email } });
}

export async function createNewUser(userData: CreateUserProps) {
  const { name, password, email, role, plan, status } =
    sanitizeUserRegistrationInput(userData);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const safeRole = sanitizeRegistrationRole(
    role,
    role === "VENDOR" ? "VENDOR" : "USER",
  );

  const hashedPassword = await bcrypt.hash(password, 12);
  const rawToken = uuidv4();
  const encodedToken = base64url.encode(rawToken);

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: safeRole,
      plan,
      status,
      verificationToken: encodedToken,
    },
  });

  return newUser;
}

export async function getUserById(id?: string) {
  if (!id) return null;

  try {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profile: true,
        createdAt: true,
        emailVerified: true,
      },
    });

    return user;
  } catch (error) {
    console.error(`[SERVICE_ERROR] getUserById:`, error);
    return null;
  }
}

export async function getUserForRequester(
  id: string,
  requester: { id: string; role: string },
) {
  if (requester.role !== "ADMIN" && requester.id !== id) {
    return null;
  }
  return getUserById(id);
}
