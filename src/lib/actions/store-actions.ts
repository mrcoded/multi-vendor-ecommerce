"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { authenticatedAction } from "../auth-wrapper";
import {
  createStore,
  deleteStore,
  getAllStores,
  getStoreById,
  getStoreBySlug,
  updateStore,
} from "@/services/store-service";
import { StoreProps } from "@/types/store";

/**
 * CREATE STORE
 */
export async function createStoreAction(formData: StoreProps) {
  return authenticatedAction(
    "Create Store",
    ["ADMIN", "VENDOR"],
    async (user) => {
      try {
        // Force vendorId to the logged-in user for security
        const storeData = { ...formData, vendorId: user.id };
        const newStore = await createStore(storeData);

        revalidateTag("stores-list");
        revalidatePath("/dashboard/stores");

        return {
          success: true,
          data: newStore,
          message: "Store created successfully",
        };
      } catch (error: any) {
        console.error("[ACTION_ERROR] createStoreAction:", error);
        return {
          success: false,
          error: error.message || "Failed to create store",
        };
      }
    },
  );
}

/**
 * UPDATE STORE
 */
export async function updateStoreAction(id: string, formData: StoreProps) {
  return authenticatedAction(
    "Update Store",
    ["ADMIN", "VENDOR"],
    async (user) => {
      try {
        const existing = await getStoreById(id);
        if (!existing) throw new Error("Store not found");

        // Authorization check
        if (user.role !== "ADMIN" && existing.vendorId !== user.id) {
          throw new Error("Unauthorized: You do not own this store");
        }

        const updated = await updateStore(id, formData);

        revalidateTag("stores-list");
        revalidatePath(`/dashboard/stores/${id}`);
        revalidatePath("/dashboard/stores");

        return {
          success: true,
          data: updated,
          message: "Store updated successfully",
        };
      } catch (error: any) {
        console.error("[ACTION_ERROR] updateStoreAction:", error);
        return {
          success: false,
          error: error.message || "Failed to update store",
        };
      }
    },
  );
}

/**
 * DELETE STORE
 */
export async function deleteStoreAction(id: string) {
  return authenticatedAction(
    "Delete Store",
    ["ADMIN", "VENDOR"],
    async (user) => {
      try {
        const existing = await getStoreById(id);
        if (!existing) throw new Error("Store not found");

        // Authorization check
        if (user.role !== "ADMIN" && existing.vendorId !== user.id) {
          throw new Error("Unauthorized: You do not own this store");
        }

        await deleteStore(id);

        revalidateTag("stores-list");
        revalidatePath("/dashboard/stores");

        return {
          success: true,
          message: "Store deleted successfully",
        };
      } catch (error: any) {
        console.error("[ACTION_ERROR] deleteStoreAction:", error);
        // This will catch the P2014 relationship errors we discussed earlier!
        return {
          success: false,
          error: error.message || "Failed to delete store",
        };
      }
    },
  );
}

export async function fetchAllStoresAction() {
  try {
    const data = await getAllStores();
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: "Failed to fetch stores list" };
  }
}

export async function fetchStoreBySlugAction(slug: string) {
  try {
    const data = await getStoreBySlug(slug);
    if (!data) return { success: false, error: "Store not found" };
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: "Failed to fetch store details" };
  }
}

export async function fetchStoreByIdAction(id: string) {
  try {
    const data = await getStoreById(id);
    if (!data) return { success: false, error: "Store not found" };
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: "Failed to fetch store by ID" };
  }
}
