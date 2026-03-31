"use server";

import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";
import { authenticatedAction } from "../auth-wrapper";
import {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
} from "@/services/banner-service";
import { BannerFormProps } from "@/types/banner";

export async function createBannerAction(data: BannerFormProps) {
  return authenticatedAction("Create Banner", ["ADMIN"], async () => {
    try {
      const result = await createBanner(data);

      revalidateTag("banners-list");

      return {
        success: true,
        data: result,
        message: "Banner created successfully!",
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Something went wrong",
      };
    }
  });
}

export async function fetchAllBannersAction() {
  try {
    // 🎯 Call the cached service directly
    const data = await getAllBanners();

    return {
      success: true,
      data,
      message: "Banners fetched successfully",
    };
  } catch (error: any) {
    console.error("[FETCH_ALL_BANNERS_ERROR]:", error);
    return {
      success: false,
      error: "Unable to fetch Banners",
    };
  }
}

export async function fetchBannerByIdAction(bannerId: string) {
  try {
    // 🎯 Call the cached service directly
    const data = await getBannerById(bannerId);

    return {
      success: true,
      data,
      message: "Banner fetched successfully",
    };
  } catch (error: any) {
    console.error("[FETCH_BANNERS_BY_ID_ERROR]:", error);
    return {
      success: false,
      error: "Unable to fetch Banner",
    };
  }
}

export async function updateBannerAction(id: string, data: BannerFormProps) {
  return authenticatedAction("Update Banner", ["ADMIN"], async () => {
    try {
      const updated = await updateBanner(id, data);

      revalidateTag("banners-list");
      revalidateTag(`banner-${id}`);

      return { success: true, data: updated };
    } catch (error) {
      return { success: false, error: "Update failed" };
    }
  });
}

export async function deleteBannerAction(id: string) {
  return authenticatedAction("Update Banner", ["ADMIN"], async () => {
    try {
      await db.banner.delete({ where: { id } });

      revalidateTag("banners-list");
      revalidateTag(`banner-${id}`);

      return { success: true, message: "Banner deleted" };
    } catch (error) {
      return { success: false, error: "Deletion failed" };
    }
  });
}
