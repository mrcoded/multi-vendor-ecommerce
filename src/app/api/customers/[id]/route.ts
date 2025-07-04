import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  request: Request,
  {
    params: { id },
  }: {
    params: { id: string };
  }
) {
  try {
    const {
      name,
      phone,
      email,
      profileImage,
      streetAddress,
      city,
      district,
      firstName,
      lastName,
      userName,
      dateOfBirth,
      country,
      userId,
    } = await request.json();

    const existingUser = await db.userProfile.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "User Profile not found",
        },
        { status: 404 }
      );
    }

    //Update User Data
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        imageUrl: profileImage,
      },
    });

    //Update Customer Profile
    const updatedUser = await db.userProfile.update({
      where: {
        id,
      },
      data: {
        name,
        phone,
        email,
        profileImage,
        streetAddress,
        city,
        district,
        firstName,
        lastName,
        userName,
        dateOfBirth,
        country,
        userId,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to update User",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
