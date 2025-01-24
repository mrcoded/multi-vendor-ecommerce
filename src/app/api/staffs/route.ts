import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      name,
      password,
      email,
      phone,
      physicalAddress,
      nin,
      dob,
      notes,
      code,
      isActive,
    } = await request.json();
    const newStaff = {
      name,
      password,
      email,
      phone,
      physicalAddress,
      nin,
      dob,
      notes,
      code,
      isActive,
    };

    return NextResponse.json(newStaff);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to create new Staff",
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
    const staffs = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        role: "MODERATOR",
      },
    });

    return NextResponse.json(staffs);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Staffs",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
