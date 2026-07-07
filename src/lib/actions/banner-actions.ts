"use server";

import { db } from "@/lib/db";
import { CACHE_TAGS, invalidateCacheTag } from "@/lib/api/cache";
import { authenticatedAction, publicQueryAction } from "../auth-wrapper";
import {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
} from "@/services/banner-service";
import { BannerFormProps } from "@/types/banner";

export async function getAllBannersAction() {
  return publicQueryAction(() => getAllBanners());
}

export async function getBannerByIdAction(id: string) {
  return authenticatedAction("Fetch Banner", ["ADMIN"], async () =>
    getBannerById(id),
  );
}

export async function createBannerAction(data: BannerFormProps) {
  return authenticatedAction("Create Banner", ["ADMIN"], async () => {
    try {
      const result = await createBanner(data);

      invalidateCacheTag(CACHE_TAGS.bannersList);

      return {
        success: true,
        data: result,
        message: "Banner created successfully!",
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      return { success: false, error: message };
    }
  });
}

export async function updateBannerAction(id: string, data: BannerFormProps) {
  return authenticatedAction("Update Banner", ["ADMIN"], async () => {
    try {
      const updated = await updateBanner(id, data);

      invalidateCacheTag(CACHE_TAGS.bannersList);
      invalidateCacheTag(CACHE_TAGS.banner(id));

      return { success: true, data: updated };
    } catch {
      return { success: false, error: "Update failed" };
    }
  });
}

export async function deleteBannerAction(id: string) {
  return authenticatedAction("Delete Banner", ["ADMIN"], async () => {
    try {
      await db.banner.delete({ where: { id } });

      invalidateCacheTag(CACHE_TAGS.bannersList);
      invalidateCacheTag(CACHE_TAGS.banner(id));

      return { success: true, message: "Banner deleted" };
    } catch {
      return { success: false, error: "Deletion failed" };
    }
  });
}
