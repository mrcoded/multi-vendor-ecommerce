import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { apiError } from "@/lib/api/api-auth";

export async function PATCH(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const {
      email,
      firstName,
      lastName,
      userName,
      phone,
      streetAddress,
      city,
      district,
      country,
      dateOfBirth,
      profileImage,
    } = await request.json();

    const updatedUser = await db.userProfile.update({
      where: { userId },
      data: {
        email,
        userName,
        firstName,
        lastName,
        phone,
        streetAddress,
        city,
        district,
        country,
        profileImage,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      },
    });

    return NextResponse.json(updatedUser);
  } catch {
    return apiError("Unable to update user profile");
  }
}
