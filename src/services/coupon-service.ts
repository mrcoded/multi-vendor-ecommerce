import { db } from "@/lib/db";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/api/cache";
import { unstable_cache } from "next/cache";

const getCachedAllCoupons = unstable_cache(
  async () => {
    return await db.coupon.findMany({
      orderBy: { createdAt: "desc" },
      include: { vendor: { select: { name: true } } },
    });
  },
  ["coupons-list-data"],
  {
    tags: [CACHE_TAGS.couponsList],
    revalidate: CACHE_TTL.catalog,
  },
);

export async function getAllCoupons() {
  return getCachedAllCoupons();
}

export async function getCouponById(id: string) {
  return unstable_cache(
    async () => {
      return await db.coupon.findUnique({
        where: { id },
      });
    },
    [`coupon-detail-${id}`],
    {
      tags: [CACHE_TAGS.couponsList, CACHE_TAGS.coupon(id)],
      revalidate: CACHE_TTL.catalog,
    },
  )();
}
