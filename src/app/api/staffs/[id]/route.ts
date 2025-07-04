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
    const staff = await db.user.findUnique({
      where: {
        id,
        role: "MODERATOR",
      },
    });

    return NextResponse.json(staff);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Staff",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  {
    params: { id },
  }: {
    params: { id: string };
  }
) {
  try {
    const existingStaff = await db.user.findUnique({
      where: {
        id,
        role: "MODERATOR",
      },
    });

    if (!existingStaff) {
      return NextResponse.json(
        {
          data: null,
          message: "Staff Not Found",
        },
        {
          status: 404,
        }
      );
    }

    const deletedStaff = await db.user.delete({
      where: {
        id,
        role: "MODERATOR",
      },
    });

    return NextResponse.json(deletedStaff);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to Delete Staff",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
