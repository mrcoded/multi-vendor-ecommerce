import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newVendor = await db.vendorProfile.create({
      data: {
        code: data.code,
        contactPerson: data.contactPerson,
        contactPersonPhone: data.contactPersonPhone,
        email: data.email,
        name: data.name,
        notes: data.notes,
        phone: data.phone,
        physicalAddress: data.physicalAddress,
        terms: data.terms,
        isActive: data.isActive,
        profileImageUrl: data.profileImageUrl,
        products: data.products,
        userId: data.userId,
      },
    });

    return NextResponse.json(
      { data: newVendor, message: "Vendor created successfully!" },
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
    const vendorProfile = await db.vendorProfile.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(vendorProfile);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Vendor Profile",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
