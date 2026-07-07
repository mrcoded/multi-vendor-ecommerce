import { db } from "@/lib/db";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/api/cache";
import { unstable_cache } from "next/cache";
import { BannerFormProps } from "@/types/banner";
import { sanitizeBannerInput } from "@/lib/sanitize-payloads";

const getCachedAllBanners = unstable_cache(
  async () => {
    return await db.banner.findMany({
      orderBy: { createdAt: "desc" },
    });
  },
  ["banners-list-data"],
  {
    tags: [CACHE_TAGS.bannersList],
    revalidate: CACHE_TTL.catalog,
  },
);

export async function getAllBanners() {
  return getCachedAllBanners();
}

const getCachedBannerById = unstable_cache(
  async (bannerId: string) => {
    return await db.banner.findUnique({
      where: { id: bannerId },
    });
  },
  ["banner-by-id"],
  { tags: [CACHE_TAGS.bannersList], revalidate: CACHE_TTL.catalog },
);

export async function getBannerById(bannerId: string) {
  return getCachedBannerById(bannerId);
}

export async function createBanner(data: BannerFormProps) {
  try {
    const safeData = sanitizeBannerInput(data);
    const newBanner = await db.banner.create({
      data: {
        title: safeData.title,
        link: safeData.link,
        imageUrl: safeData.imageUrl,
        isActive: safeData.isActive,
      },
    });

    return newBanner;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create banner";
    console.error("[SERVICE_CREATE_BANNER_ERROR]:", error);
    throw new Error(message);
  }
}

export async function updateBanner(bannerId: string, data: BannerFormProps) {
  try {
    const safeData = sanitizeBannerInput(data);
    const newBanner = await db.banner.update({
      where: { id: bannerId },
      data: {
        title: safeData.title,
        link: safeData.link,
        imageUrl: safeData.imageUrl,
        isActive: safeData.isActive,
      },
    });

    return newBanner;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update banner";
    console.error("[SERVICE_UPDATE_BANNER_ERROR]:", error);
    throw new Error(message);
  }
}
