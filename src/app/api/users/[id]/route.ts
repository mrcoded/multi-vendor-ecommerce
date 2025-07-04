import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params: { id },
  }: {
    params: { id: string };
  }
) {
  try {
    const users = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profile: true,
        createdAt: true,
        verificationToken: true,
        emailVerified: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch User",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
