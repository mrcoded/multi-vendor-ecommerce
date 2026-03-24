import { db } from "@/lib/db";

export async function createVendorProfile(data: any) {
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
        isActive: data.isActive,
        imageUrl: data.imageUrl,
        userId: data.userId,
      },
    });

    return updatedUser;
  });
}

export async function getAllVendors() {
  return await db.user.findMany({
    where: { role: "VENDOR" },
    include: { vendorProfile: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getVendorById(id?: string) {
  return await db.user.findUnique({
    where: { id },
    include: { vendorProfile: true },
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
