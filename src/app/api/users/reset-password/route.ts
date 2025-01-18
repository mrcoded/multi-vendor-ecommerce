import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    //extract the data
    const { password, id } = await request.json();

    //check if user already exists in the db
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        {
          data: null,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }
    //Encrypt password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 16);

    //Update a user in the DB
    await db.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { data: null, message: "Password Reset Successful" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to Reset User Password",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
