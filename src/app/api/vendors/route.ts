import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    //check if vendor already exists in the db
    const existingUser = await db.user.findUnique({
      where: { id: data.userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: `No User Found`,
        },
        { status: 404 }
      );
    }

    //Update emailVerified
    const updatedUser = await db.user.update({
      where: { id: data.userId },

      data: {
        emailVerified: true,
      },
    });

    await db.vendorProfile.create({
      data: {
        code: data.code,
        contactPerson: data.contactPerson,
        contactPersonPhone: data.contactPersonPhone,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        notes: data.notes,
        phone: data.phone,
        physicalAddress: data.physicalAddress,
        terms: data.terms,
        isActive: data.isActive,
        imageUrl: data.imageUrl,
        products: data.products,
        userId: data.userId,
      },
    });

    return NextResponse.json(
      { data: updatedUser, message: "Vendor created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to create new Vendor",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const vendors = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        role: "VENDOR",
      },
      include: {
        vendorProfile: true,
      },
    });

    return NextResponse.json(vendors);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Vendors",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
