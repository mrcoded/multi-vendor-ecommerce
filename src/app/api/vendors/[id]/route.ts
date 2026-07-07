import { db } from "@/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { apiError, publicUserSelect, requireAuth } from "@/lib/api/api-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const vendor = await db.user.findUnique({
      where: { id },
      select: {
        ...publicUserSelect,
        vendorProfile: true,
      },
    });

    if (!vendor) {
      return NextResponse.json(
        { message: "Vendor not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(vendor);
  } catch {
    return apiError("Unable to fetch vendor");
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authResult = await requireAuth(["ADMIN"]);
  if (!authResult.ok) return authResult.response;

  try {
    const { id } = await params;

    const existingUser = await db.user.findUnique({ where: { id } });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const deletedUser = await db.user.delete({ where: { id } });
    return NextResponse.json(deletedUser);
  } catch {
    return apiError("Unable to delete user");
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const authResult = await requireAuth(["ADMIN", "VENDOR"]);
  if (!authResult.ok) return authResult.response;

  if (authResult.user.role === "VENDOR" && authResult.user.id !== id) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const {
      contactPerson,
      contactPersonPhone,
      email,
      firstName,
      lastName,
      notes,
      phone,
      physicalAddress,
      terms,
      isActive,
      imageUrl,
      products,
    } = await request.json();

    const existingUser = await db.user.findUnique({ where: { id } });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await db.user.update({
      where: { id },
      data: {
        status: typeof isActive === "boolean" ? isActive : existingUser.status,
      },
    });

    const existingVendor = await db.vendorProfile.findUnique({
      where: { userId: id },
    });

    if (!existingVendor) {
      return NextResponse.json(
        { message: "Vendor profile not found" },
        { status: 404 },
      );
    }

    const updatedVendor = await db.vendorProfile.update({
      where: { userId: id },
      data: {
        contactPerson,
        contactPersonPhone,
        email: email || existingUser.email,
        firstName,
        lastName,
        notes,
        phone,
        physicalAddress,
        terms,
        imageUrl,
        products,
      },
    });

    return NextResponse.json(updatedVendor);
  } catch {
    return apiError("Unable to update vendor");
  }
}
