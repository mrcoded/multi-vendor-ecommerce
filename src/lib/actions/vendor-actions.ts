"use server";

import { CACHE_TAGS, invalidateCacheTag } from "@/lib/api/cache";
import { revalidatePath } from "next/cache";
import {
  createVendorProfile,
  deleteVendorUser,
  getAllVendors,
  getVendorById,
  updateVendorProfile,
  updateVendorStatusById,
} from "@/services/vendor-service";
import { authenticatedAction } from "../auth-wrapper";
import { VendorProps } from "@/types/vendors";

export async function getAllVendorsAction() {
  return authenticatedAction("Fetch Vendors", ["ADMIN"], async () =>
    getAllVendors(),
  );
}

export async function getVendorByIdAction(id: string) {
  return authenticatedAction("Fetch Vendor", ["ADMIN", "VENDOR"], async () =>
    getVendorById(id),
  );
}

export async function updateVendorAction(
  id: string,
  formData: VendorProps["vendorProfile"],
) {
  return authenticatedAction("Update Vendor", ["ADMIN", "VENDOR"], async () => {
    try {
      const updated = await updateVendorProfile(id, formData);

      invalidateCacheTag(CACHE_TAGS.vendorsList);
      invalidateCacheTag(CACHE_TAGS.vendor(id));
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

export async function updateVendorStatusAction(id: string, status: boolean) {
  return authenticatedAction("Update Vendor Status", ["ADMIN"], async () => {
    try {
      const updatedUser = await updateVendorStatusById(id, status);

      invalidateCacheTag(CACHE_TAGS.vendorsList);
      invalidateCacheTag(CACHE_TAGS.vendor(id));

      return {
        success: true,
        data: updatedUser,
        message: `Vendor status set to ${status ? "Approved" : "Pending"}`,
      };
    } catch (error: any) {
      console.error("[UPDATE_VENDOR_ERROR]:", error);
      return {
        success: false,
        error: error.message || "Update  Vendor status failed",
      };
    }
  });
}

export async function deleteVendorAction(id: string) {
  return authenticatedAction("Delete Vendor", ["ADMIN"], async () => {
    try {
      await deleteVendorUser(id);

      invalidateCacheTag(CACHE_TAGS.vendorsList);
      revalidatePath("/dashboard/vendors");

      return { success: true, message: "Vendor deleted successfully" };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });
}

export async function createVendorAction(
  formData: VendorProps["vendorProfile"],
) {
  return authenticatedAction("Create Vendor", ["ADMIN", "VENDOR"], async () => {
    try {
      const vendor = await createVendorProfile(formData);

      invalidateCacheTag(CACHE_TAGS.vendorsList);
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
