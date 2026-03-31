"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import {
  getVendorById as getVendorService,
  updateVendorProfile,
  deleteVendorUser,
  createVendorProfile,
  getAllVendors,
  updateVendorStatusById,
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

export async function updateVendorAction(
  id: string,
  formData: VendorProps["vendorProfile"],
) {
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

export async function updateVendorStatusAction(id: string, status: boolean) {
  return authenticatedAction("Update Vendor Status", ["ADMIN"], async () => {
    try {
      const updatedUser = await updateVendorStatusById(id, status);

      // 🎯 THE CACHE BUSTERS
      // This forces 'getAllVendors' to fetch fresh data on the next request
      revalidateTag("vendors-list");
      revalidateTag(`vendor-${id}`);

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

      revalidateTag("vendors-list");
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
  return authenticatedAction("Fetch Vendors", ["ADMIN", "VENDOR"], async () => {
    try {
      // 🎯 Call the cached service directly
      const data = await getAllVendors();
      return {
        success: true,
        data,
        message: "Vendors retrieved successfully",
      };
    } catch (error: any) {
      console.error("[FETCH_ALL_VENDORS_ERROR]:", error);
      return {
        success: false,
        error: error.message || "Unable to fetch vendors",
      };
    }
  });
}
