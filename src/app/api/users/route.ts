import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { name, password, email, role } = await request.json();

    //check if user already exists in the db
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "User Already exists",
        },
        { status: 409 }
      );
    }

    //Encrypt password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 16);

    const newUser = await db.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
        role,
      },
    });

    console.log(newUser);

    return NextResponse.json(
      { data: newUser, message: "User Created Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to create new User",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Users",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
