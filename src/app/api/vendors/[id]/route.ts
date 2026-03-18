import { db } from "@/lib/db";
import { authOptions } from "@/lib/authOptions";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await params;

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
      },
    );
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || user.role === "USER") {
    return NextResponse.json(
      {
        data: null,
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;

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
        },
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
      },
    );
  }
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || user.role === "USER") {
    return NextResponse.json(
      {
        data: null,
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

  try {
    const {
      contactPerson,
      contactPersonPhone,
      email,
      firstName,
      lastName,
      status,
      emailVerified,
      notes,
      phone,
      physicalAddress,
      terms,
      // isActive,
      imageUrl,
      products,
      userId,
    } = await request.json();

    const existingUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    const existingVendor = await db.vendorProfile.findUnique({
      where: { userId: existingUser.id },
    });

    if (!existingVendor) {
      return NextResponse.json(
        {
          data: null,
          message: "Vendor User not found",
        },
        { status: 404 },
      );
    }

    const updatedVendor = await db.vendorProfile.update({
      where: {
        userId: id,
      },
      // include: {
      //   vendorProfile: true,
      // },
      data: {
        // code: session?.user?.name,
        contactPerson,
        contactPersonPhone,
        email: email || existingUser.email,
        firstName,
        lastName,
        notes,
        phone,
        physicalAddress,
        terms,
        // isActive,
        imageUrl,
        products,
        // userId: existingUser.id,
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
      },
    );
  }
}
