import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export async function getAllCoupons() {
  const getCachedCoupons = unstable_cache(
    async () => {
      return await db.coupon.findMany({
        orderBy: { createdAt: "desc" },
        include: { vendor: { select: { name: true } } }, // Useful for the admin table
      });
    },
    ["coupons-list-data"],
    { tags: ["coupons-list"], revalidate: 3600 },
  );

  return await getCachedCoupons();
}

export async function getCouponById(id: string) {
  const getCachedCoupon = unstable_cache(
    async (couponId: string) => {
      return await db.coupon.findUnique({
        where: { id: couponId },
      });
    },
    [`coupon-detail-${id}`],
    {
      tags: [`coupon-${id}`],
      revalidate: 3600,
    },
  );

  return await getCachedCoupon(id);
}
