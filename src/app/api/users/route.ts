import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import base64url from "base64url";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    // const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, password, email, role, plan, status } = await request.json();

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

    //Generate a random UUID
    const rawToken = uuidv4();

    //Encode the token using Base64 URL
    const encodedToken = base64url.encode(rawToken);
    console.log("encoded", encodedToken);

    //Create new user
    const newUser = await db.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
        role,
        plan,
        status,
        verificationToken: encodedToken,
      },
    });

    console.log(newUser);
    //SEND THE EMAIL IF USER ROLE === FARMER
    // if (role === "VENDOR") {
    //Send an Email with the token in the link as a search params
    //   const userId = newUser.id;
    //   const linkText = "Verify Email";
    //   const redirectUrl = `onboarding/${userId}?token=${encodedToken}`;

    //   const sendMail = await resend.emails.send({
    //     from: "Vendors Hub <6TlRj@example.com>",
    //     to: email,
    //     subject: "Account Verification - Multi Vendors Ecommerce",
    //     react: EmailTemplate({ name, redirectUrl, linkText }),
    //   });
    //   console.log(sendMail);
    // }

    return NextResponse.json(
      { data: null, message: "User Created Successfully" },
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
