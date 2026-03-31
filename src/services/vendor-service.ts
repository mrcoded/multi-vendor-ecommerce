import { db } from "@/lib/db";
import { VendorProps } from "@/types/vendors";
import { unstable_cache } from "next/cache";

export async function createVendorProfile(data: VendorProps["vendorProfile"]) {
  return await db.$transaction(async (tx) => {
    //Check if user exists
    const existingUser = await tx.user.findUnique({
      where: { id: data.userId },
    });

    if (!existingUser) throw new Error("No User Found");

    // Update User Verification
    const updatedUser = await tx.user.update({
      where: { id: data.userId },
      data: { emailVerified: true },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        emailVerified: true,
        imageUrl: true,
      },
    });

    //  Create Vendor Profile
    await tx.vendorProfile.create({
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
        imageUrl: data.imageUrl ?? "",
        userId: data.userId,
      },
    });

    return updatedUser;
  });
}

export async function getAllVendors() {
  // 🎯 THE SERVICE WRAPPER: Centralized Data + Cache logic
  const getCachedVendors = unstable_cache(
    async () => {
      return await db.user.findMany({
        where: { role: "VENDOR" },
        select: {
          vendorProfile: true,
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
          emailVerified: true,
          imageUrl: true,
        },
        orderBy: { createdAt: "desc" },
      });
    },
    ["vendors-list"],
    { tags: ["vendors-list"], revalidate: 3600 },
  );

  return await getCachedVendors();
}

export async function getVendorById(id?: string) {
  return await db.user.findUnique({
    where: { id, role: "VENDOR" },
    select: {
      vendorProfile: true,
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      emailVerified: true,
      imageUrl: true,
    },
  });
}

export async function updateVendorProfile(id: string, data: any) {
  return await db.$transaction(async (tx) => {
    // Update User Table
    await tx.user.update({
      where: { id },
      data: {
        emailVerified: true,
        status: data.isActive,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        emailVerified: true,
        imageUrl: true,
      },
    });

    // Update Vendor Profile Table
    return await tx.vendorProfile.update({
      where: { userId: id },
      data: {
        contactPerson: data.contactPerson,
        contactPersonPhone: data.contactPersonPhone,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        notes: data.notes,
        phone: data.phone,
        physicalAddress: data.physicalAddress,
        terms: data.terms,
        imageUrl: data.imageUrl,
      },
    });
  });
}

export async function deleteVendorUser(id: string) {
  return await db.user.delete({
    where: { id },
  });
}

export async function updateVendorStatusById(id: string, newStatus: boolean) {
  return await db.user.update({
    where: { id },
    data: {
      status: newStatus,
      // Pragmatic: If approving, we usually want to verify the email too
      emailVerified: true,
    },
  });
}
