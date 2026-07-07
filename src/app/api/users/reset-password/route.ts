import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { apiError } from "@/lib/api/api-auth";

export async function PUT(request: Request) {
  try {
    const { password, id, token } = await request.json();

    if (!password || !id || !token) {
      return NextResponse.json(
        { message: "Password, user id, and reset token are required" },
        { status: 400 },
      );
    }

    const user = await db.user.findUnique({ where: { id } });

    if (!user || !user.verificationToken || user.verificationToken !== token) {
      return NextResponse.json(
        { message: "Invalid or expired reset link" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        verificationToken: null,
      },
    });

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 },
    );
  } catch {
    return apiError("Unable to reset password");
  }
}
