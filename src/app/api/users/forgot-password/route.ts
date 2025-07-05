import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import base64url from "base64url";
import { v4 as uuidv4 } from "uuid";

export async function PUT(request: Request) {
  try {
    //extract the data
    const { email } = await request.json();

    //check if user already exists in the db
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }
    //Generate a token
    //Generate a random UUID
    const rawToken = uuidv4();

    //Encode the token using Base64 URL
    const encodedToken = base64url.encode(rawToken);
    console.log("Forgot Password Token: ", encodedToken);
    console.log("exisiting userid: ", existingUser.id);

    //Update a user in the DB
    // const updateUser = await db.user.update({
    //   where: {
    //     email,
    //   },
    //   data: {
    //     passwordResetToken: encodedToken,
    //   },
    // });
    // console.log(updateUser);
    //SEND THE EMAIL IF TOKEN ON THE LINK IS A SEARCHPARAM
    // if (role === "VENDOR") {
    //Send an Email with the token in the link as a search params
    //   const userId = existingUser.id;
    //   const name = existingUser.name;
    //   const linkText = "Reset Password";
    //   const redirectUrl = `reset-password?token=${encodedToken}&id=${userId}`;

    //   const sendMail = await resend.emails.send({
    //     from: "Vendors Hub <6TlRj@example.com>",
    //     to: email,
    //     subject: "Account Verification - Multi Vendors Ecommerce",
    //     react: EmailTemplate({ name, redirectUrl, linkText }),
    //   });
    //   console.log(sendMail);
    // }

    return NextResponse.json(
      { error: null, message: "Password Reset Link Sent" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to Send Forgot Password Link",
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
