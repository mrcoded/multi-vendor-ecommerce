"use server";

import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";
import { authenticatedAction } from "../auth-wrapper";
import { getAllCoupons, getCouponById } from "@/services/coupon-service";
import { CouponFormProps } from "@/components/forms/CouponForm";

export async function createCouponAction(data: any) {
  return authenticatedAction("Create Coupon", ["ADMIN", "VENDOR"], async () => {
    try {
      const newCoupon = await db.coupon.create({
        data: {
          title: data.title,
          couponCode: data.couponCode,
          expiryDate: new Date(data.expiryDate), // Ensure proper Date object
          isActive: data.isActive,
          vendorId: data.vendorId,
        },
      });

      // 🚀 CACHE INVALIDATION
      revalidateTag("coupons-list");

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
      const updated = await db.coupon.update({
        where: { id },
        data: {
          ...data,
          expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
        },
      });

      // 🚀 CACHE INVALIDATION
      revalidateTag("coupons-list");
      revalidateTag(`coupon-${id}`);

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

      revalidateTag("coupons-list");
      revalidateTag(`coupon-${id}`);

      return { success: true, message: "Coupon deleted" };
    } catch (error) {
      console.error("DELETE_COUPON_ERROR", error);
      return { success: false, error: "Failed to delete coupon" };
    }
  });
}

export async function getAllCouponsAction() {
  try {
    const data = await getAllCoupons();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to fetch coupons" };
  }
}

export async function getCouponByIdAction(id: string) {
  try {
    const data = await getCouponById(id);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Coupon not found" };
  }
}
