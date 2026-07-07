"use server";

import { CACHE_TAGS, invalidateCacheTag } from "@/lib/api/cache";
import { revalidatePath } from "next/cache";
import { authenticatedAction, publicQueryAction } from "../auth-wrapper";
import {
  createStore,
  deleteStore,
  getAllStores,
  getStoreById,
  getStoreBySlug,
  updateStore,
} from "@/services/store-service";
import { StoreProps } from "@/types/store";

export async function getAllStoresAction() {
  return authenticatedAction("Fetch Stores", ["ADMIN", "VENDOR"], async () =>
    getAllStores(),
  );
}

export async function getStoreByIdAction(id: string) {
  return authenticatedAction("Fetch Store", ["ADMIN", "VENDOR"], async () =>
    getStoreById(id),
  );
}

export async function getStoreBySlugAction(slug: string) {
  return publicQueryAction(() => getStoreBySlug(slug));
}

export async function createStoreAction(formData: StoreProps) {
  return authenticatedAction(
    "Create Store",
    ["ADMIN", "VENDOR"],
    async (user) => {
      try {
        const storeData =
          user.role === "ADMIN"
            ? { ...formData, vendorId: formData.vendorId || user.id }
            : { ...formData, vendorId: user.id };
        const newStore = await createStore(storeData);

        invalidateCacheTag(CACHE_TAGS.storesList);
        invalidateCacheTag(CACHE_TAGS.store(newStore.slug));
        revalidatePath("/dashboard/stores");

        return {
          success: true,
          data: newStore,
          message: "Store created successfully",
        };
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to create store";
        console.error("[ACTION_ERROR] createStoreAction:", error);
        return { success: false, error: message };
      }
    },
  );
}

export async function updateStoreAction(id: string, formData: StoreProps) {
  return authenticatedAction(
    "Update Store",
    ["ADMIN", "VENDOR"],
    async (user) => {
      try {
        const existing = await getStoreById(id);
        if (!existing) throw new Error("Store not found");

        if (user.role !== "ADMIN" && existing.vendorId !== user.id) {
          throw new Error("Unauthorized: You do not own this store");
        }

        const updated = await updateStore(id, formData);

        invalidateCacheTag(CACHE_TAGS.storesList);
        invalidateCacheTag(CACHE_TAGS.storeById(id));
        invalidateCacheTag(CACHE_TAGS.store(existing.slug));
        invalidateCacheTag(CACHE_TAGS.store(updated.slug));
        revalidatePath(`/dashboard/stores/${id}`);
        revalidatePath("/dashboard/stores");
        revalidatePath(`/store/${updated.slug}`);

        return {
          success: true,
          data: updated,
          message: "Store updated successfully",
        };
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to update store";
        console.error("[ACTION_ERROR] updateStoreAction:", error);
        return { success: false, error: message };
      }
    },
  );
}

export async function deleteStoreAction(id: string) {
  return authenticatedAction(
    "Delete Store",
    ["ADMIN", "VENDOR"],
    async (user) => {
      try {
        const existing = await getStoreById(id);
        if (!existing) throw new Error("Store not found");

        if (user.role !== "ADMIN" && existing.vendorId !== user.id) {
          throw new Error("Unauthorized: You do not own this store");
        }

        await deleteStore(id);

        invalidateCacheTag(CACHE_TAGS.storesList);
        invalidateCacheTag(CACHE_TAGS.storeById(id));
        invalidateCacheTag(CACHE_TAGS.store(existing.slug));
        revalidatePath("/dashboard/stores");

        return {
          success: true,
          message: "Store deleted successfully",
        };
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to delete store";
        console.error("[ACTION_ERROR] deleteStoreAction:", error);
        return { success: false, error: message };
      }
    },
  );
}
