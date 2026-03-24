import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import base64url from "base64url";
import { v4 as uuidv4 } from "uuid";
import { CreateUserProps, UserProps } from "@/types/user";
import { unstable_cache } from "next/cache";

/**
 * Get all users - Cached for performance on the Admin Dashboard
 */
export async function getAllUsers() {
  return unstable_cache(
    async () => {
      return await db.user.findMany({
        orderBy: { createdAt: "desc" },
        // Add a select here so you don't accidentally send passwords to the table
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
    { tags: ["users-list"] },
  )();
}

/**
 * Get user by email - Used mostly for Auth/Login
 */
export async function getUserByEmail(email: string) {
  if (!email) return null;
  return await db.user.findUnique({ where: { email } });
}

/**
 * Create new user
 */
export async function createNewUser(userData: CreateUserProps) {
  const { name, password, email, role, plan, status } = userData;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const rawToken = uuidv4();
  const encodedToken = base64url.encode(rawToken);

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      plan,
      status,
      verificationToken: encodedToken,
    },
  });

  return newUser;
}

/**
 * Get user by ID - Safe version for profile/UI display
 */
export async function getUserById(id?: string) {
  if (!id) return null; // Prevent Prisma from running with undefined

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

    return user; // findUnique returns null if not found, no need for extra check
  } catch (error) {
    console.error(`[SERVICE_ERROR] getUserById:`, error);
    // Don't throw a generic error here, return null so the UI can handle "Not Found"
    return null;
  }
}
