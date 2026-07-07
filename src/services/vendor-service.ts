import { db } from "@/lib/db";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/api/cache";
import { VendorProps } from "@/types/vendors";
import { sanitizeVendorProfileInput } from "@/lib/sanitize-payloads";
import { unstable_cache } from "next/cache";

export async function createVendorProfile(data: VendorProps["vendorProfile"]) {
  const safeData = sanitizeVendorProfileInput(data);
  return await db.$transaction(async (tx) => {
    const existingUser = await tx.user.findUnique({
      where: { id: safeData.userId },
    });

    if (!existingUser) throw new Error("No User Found");

    const updatedUser = await tx.user.update({
      where: { id: safeData.userId },
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

    await tx.vendorProfile.create({
      data: {
        code: safeData.code,
        contactPerson: safeData.contactPerson,
        contactPersonPhone: safeData.contactPersonPhone,
        email: safeData.email,
        firstName: safeData.firstName,
        lastName: safeData.lastName,
        notes: safeData.notes,
        phone: safeData.phone,
        physicalAddress: safeData.physicalAddress,
        terms: safeData.terms,
        imageUrl: safeData.imageUrl ?? "",
        userId: safeData.userId,
      },
    });

    return updatedUser;
  });
}

const getCachedAllVendors = unstable_cache(
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
  { tags: [CACHE_TAGS.vendorsList], revalidate: CACHE_TTL.catalog },
);

export async function getAllVendors() {
  return getCachedAllVendors();
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
  const safeData = sanitizeVendorProfileInput({
    ...data,
    userId: data.userId ?? id,
  });

  return await db.$transaction(async (tx) => {
    await tx.user.update({
      where: { id },
      data: {
        emailVerified: true,
        status: true,
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

    const existingProfile = await tx.vendorProfile.findUnique({
      where: { userId: id },
    });

    const profileData = {
      contactPerson: safeData.contactPerson,
      contactPersonPhone: safeData.contactPersonPhone,
      email: safeData.email,
      firstName: safeData.firstName,
      lastName: safeData.lastName,
      notes: safeData.notes,
      phone: safeData.phone,
      physicalAddress: safeData.physicalAddress,
      terms: safeData.terms,
      imageUrl: safeData.imageUrl,
    };

    if (existingProfile) {
      return await tx.vendorProfile.update({
        where: { userId: id },
        data: profileData,
      });
    }

    return await tx.vendorProfile.create({
      data: {
        ...profileData,
        code: safeData.code,
        userId: id,
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
      emailVerified: true,
    },
  });
}
