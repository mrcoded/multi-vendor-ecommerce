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
    const vendor = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        vendorProfile: true,
      },
    });

    return NextResponse.json(vendor);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Vendor",
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
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "User Not Found",
        },
        {
          status: 404,
        }
      );
    }

    const deletedUser = await db.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to Delete User",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

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
      // contactPerson,
      // contactPersonPhone,
      // email,
      // firstName,
      // lastName,
      status,
      emailVerified,
      // notes,
      // phone,
      // physicalAddress,
      // terms,
      // isActive,
      // imageUrl,
      // products,
      // userId,
    } = await request.json();

    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const updatedVendor = await db.user.update({
      where: {
        id,
      },
      // include: {
      //   vendorProfile: true,
      // },
      data: {
        status,
        emailVerified,
        // code: existingVendor.code,
        // contactPerson,
        // contactPersonPhone,
        // email,
        // firstName,
        // lastName,
        // notes,
        // phone,
        // physicalAddress,
        // terms,
        // isActive,
        // imageUrl,
        // products,
        // userId,
      },
    });

    return NextResponse.json(updatedVendor);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to update Vendor",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
