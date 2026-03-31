import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { BannerFormProps } from "@/types/banner";

export async function getAllBanners() {
  const getCachedBanners = unstable_cache(
    async () => {
      return await db.banner.findMany({
        orderBy: { createdAt: "desc" },
      });
    },
    ["banners-list-data"],
    {
      tags: ["banners-list"],
      revalidate: 3600,
    },
  );

  return await getCachedBanners();
}

export async function getBannerById(bannerId: string) {
  const getCachedBanner = unstable_cache(
    async (bannerId: string) => {
      return await db.banner.findUnique({
        where: { id: bannerId },
      });
    },
    [`banner-detail-${bannerId}`],
    { tags: [`banner-${bannerId}`], revalidate: 3600 },
  );

  return await getCachedBanner(bannerId);
}

export async function createBanner(data: BannerFormProps) {
  try {
    const newBanner = await db.banner.create({
      data: {
        title: data.title,
        link: data.link,
        imageUrl: data.imageUrl,
        isActive: data.isActive,
      },
    });

    return newBanner;
  } catch (error: any) {
    console.error("[SERVICE_CREATE_BANNER_ERROR]:", error);
    throw new Error(error.message || "Failed to create banner");
  }
}

export async function updateBanner(bannerId: string, data: BannerFormProps) {
  try {
    const newBanner = await db.banner.update({
      where: { id: bannerId },
      data: {
        title: data.title,
        link: data.link,
        imageUrl: data.imageUrl,
        isActive: data.isActive,
      },
    });

    return newBanner;
  } catch (error: any) {
    console.error("[SERVICE_CREATE_BANNER_ERROR]:", error);
    throw new Error(error.message || "Failed to create banner");
  }
}
