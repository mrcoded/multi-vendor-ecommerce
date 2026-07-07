import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import base64url from "base64url";
import { v4 as uuidv4 } from "uuid";
import {
  apiError,
  publicUserSelect,
  requireAuth,
  sanitizeRegistrationRole,
} from "@/lib/api/api-auth";
import { sanitizeUserRegistrationInput } from "@/lib/sanitize-payloads";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, password, email, role, plan, status } =
      sanitizeUserRegistrationInput({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role ?? "USER",
        plan: body.plan ?? null,
        status: typeof body.status === "boolean" ? body.status : false,
      });

    if (!name || !password || !email) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 },
      );
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    const safeRole = sanitizeRegistrationRole(role);
    const hashedPassword = await bcrypt.hash(password, 12);
    const encodedToken = base64url.encode(uuidv4());

    await db.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
        role: safeRole,
        plan: plan ?? null,
        status: typeof status === "boolean" ? status : false,
        verificationToken: encodedToken,
      },
      select: publicUserSelect,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch {
    return apiError("Unable to create user");
  }
}

export async function GET() {
  const authResult = await requireAuth(["ADMIN"]);
  if (!authResult.ok) return authResult.response;

  try {
    const users = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      select: publicUserSelect,
    });

    return NextResponse.json(users);
  } catch {
    return apiError("Unable to fetch users");
  }
}
