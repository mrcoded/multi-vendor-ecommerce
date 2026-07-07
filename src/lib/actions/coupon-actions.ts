"use server";

import { db } from "@/lib/db";
import { CACHE_TAGS, invalidateCacheTag } from "@/lib/api/cache";
import { authenticatedAction } from "../auth-wrapper";
import { getAllCoupons, getCouponById } from "@/services/coupon-service";
import { CouponFormProps } from "@/components/forms/CouponForm";
import { sanitizeCouponInput } from "@/lib/sanitize-payloads";

export async function getAllCouponsAction() {
  return authenticatedAction("Fetch Coupons", ["ADMIN", "VENDOR"], async () =>
    getAllCoupons(),
  );
}

export async function getCouponByIdAction(id: string) {
  return authenticatedAction("Fetch Coupon", ["ADMIN", "VENDOR"], async () =>
    getCouponById(id),
  );
}

export async function createCouponAction(data: CouponFormProps) {
  return authenticatedAction("Create Coupon", ["ADMIN", "VENDOR"], async () => {
    try {
      const safeData = sanitizeCouponInput(data);

      if (!safeData.vendorId) {
        return { success: false, error: "Vendor ID is required" };
      }

      const newCoupon = await db.coupon.create({
        data: {
          title: safeData.title,
          couponCode: safeData.couponCode,
          expiryDate: new Date(safeData.expiryDate),
          isActive: safeData.isActive,
          vendorId: safeData.vendorId,
        },
      });

      invalidateCacheTag(CACHE_TAGS.couponsList);

      return { success: true, data: newCoupon };
    } catch (error) {
      console.error("[CREATE_COUPON_ERROR]:", error);
      return { success: false, error: "Failed to create coupon" };
    }
  });
}

export async function updateCouponAction(id: string, data: CouponFormProps) {
  return authenticatedAction("Update Coupon", ["ADMIN", "VENDOR"], async () => {
    try {
      const safeData = sanitizeCouponInput(data);
      const updated = await db.coupon.update({
        where: { id },
        data: {
          ...safeData,
          expiryDate: safeData.expiryDate
            ? new Date(safeData.expiryDate)
            : undefined,
        },
      });

      invalidateCacheTag(CACHE_TAGS.couponsList);
      invalidateCacheTag(CACHE_TAGS.coupon(id));

      return { success: true, data: updated };
    } catch (error) {
      console.error("UPDATE_COUPON_ERROR", error);
      return { success: false, error: "Failed to update coupon" };
    }
  });
}

export async function deleteCouponAction(id: string) {
  return authenticatedAction("Delete Coupon", ["ADMIN", "VENDOR"], async () => {
    try {
      await db.coupon.delete({ where: { id } });

      invalidateCacheTag(CACHE_TAGS.couponsList);
      invalidateCacheTag(CACHE_TAGS.coupon(id));

      return { success: true, message: "Coupon deleted" };
    } catch (error) {
      console.error("DELETE_COUPON_ERROR", error);
      return { success: false, error: "Failed to delete coupon" };
    }
  });
}
