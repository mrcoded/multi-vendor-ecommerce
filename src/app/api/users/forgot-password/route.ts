import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import base64url from "base64url";
import { v4 as uuidv4 } from "uuid";
import { apiError } from "@/lib/api/api-auth";

export async function PUT(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    const existingUser = await db.user.findUnique({ where: { email } });

    if (!existingUser) {
      // Generic response to avoid email enumeration
      return NextResponse.json(
        { message: "If an account exists, a reset link has been sent." },
        { status: 200 },
      );
    }

    const encodedToken = base64url.encode(uuidv4());

    await db.user.update({
      where: { email },
      data: { verificationToken: encodedToken },
    });

    // Email delivery is not configured in this environment yet.
    return NextResponse.json(
      { message: "If an account exists, a reset link has been sent." },
      { status: 200 },
    );
  } catch {
    return apiError("Unable to process password reset request");
  }
}
