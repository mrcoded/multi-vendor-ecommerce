"use server";

import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import {
  getVendorById as getVendorService,
  updateVendorProfile,
  deleteVendorUser,
  createVendorProfile,
  getAllVendors,
} from "@/services/vendor-service";
import { authenticatedAction } from "../auth-wrapper";
import { VendorProps } from "@/types/vendors";

export async function fetchVendorByIdAction(id?: string) {
  return authenticatedAction("Fetch Vendor", ["ADMIN", "VENDOR"], async () => {
    try {
      const data = await getVendorService(id);
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });
}

export async function updateVendorAction(id: string, formData: VendorProps) {
  return authenticatedAction("Update Vendor", ["ADMIN", "VENDOR"], async () => {
    try {
      const updated = await updateVendorProfile(id, formData);

      revalidateTag("vendors-list");
      revalidateTag(`vendor-${id}`);
      revalidatePath(`/dashboard/vendors/${id}`);

      return {
        success: true,
        data: updated,
        message: "Vendor successfully updated!",
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });
}

export async function deleteVendorAction(id: string) {
  return authenticatedAction("Delete Vendor", ["ADMIN"], async () => {
    try {
      await deleteVendorUser(id);

      revalidateTag("vendors-list");
      revalidatePath("/dashboard/vendors");

      return { success: true, message: "Vendor deleted successfully" };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });
}

export async function createVendorAction(formData: VendorProps) {
  return authenticatedAction("Create Vendor", ["ADMIN", "VENDOR"], async () => {
    try {
      const vendor = await createVendorProfile(formData);

      revalidateTag("vendors-list");
      revalidatePath("/dashboard/vendors");

      return {
        success: true,
        data: vendor,
        message: "Vendor created successfully!",
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });
}

export async function fetchAllVendorsAction() {
  return authenticatedAction("Fetch Vendors", ["ADMIN"], async () => {
    try {
      const getCachedVendors = unstable_cache(
        async () => await getAllVendors(),
        ["vendors-list"],
        { tags: ["vendors-list"], revalidate: 3600 },
      );

      const data = await getCachedVendors();
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });
}
