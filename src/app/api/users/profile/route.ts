import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(request: Request) {
  try {
    // Check if the user is authenticated
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

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
      where: { userId: userId },
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
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to update User profile",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
