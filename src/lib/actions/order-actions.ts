"use server";

import { OrderStatus } from "@prisma/client";
import { CACHE_TAGS, invalidateCacheTag } from "@/lib/api/cache";
import { revalidatePath } from "next/cache";
import {
  createOrderService,
  deleteOrder,
  getOrderById,
  getOrderForUser,
  getOrdersForUser,
  getSalesForUser,
  updateOrderStatus,
} from "@/services/order-service.";
import { authenticatedAction } from "../auth-wrapper";

import { CheckoutProps, OrderItemProps } from "@/types/order";

export async function getAllOrdersAction() {
  return authenticatedAction("Fetch Orders", null, async (user) =>
    getOrdersForUser(user),
  );
}

export async function getOrderByIdAction(id: string) {
  return authenticatedAction("Fetch Order", null, async (user) =>
    getOrderForUser(id, user),
  );
}

export async function getSalesAction(vendorId?: string) {
  return authenticatedAction("Fetch Sales", ["ADMIN", "VENDOR"], async (user) =>
    getSalesForUser(user, vendorId),
  );
}

export async function createOrderAction(data: {
  checkoutFormData: CheckoutProps;
  orderItems: OrderItemProps[];
}) {
  return authenticatedAction("Create Order", null, async (user) => {
    try {
      if (data.checkoutFormData.userId !== user.id) {
        return { success: false, error: "Forbidden: invalid order user" };
      }

      const { order, productItems } = await createOrderService(
        data.checkoutFormData,
        data.orderItems,
      );

      invalidateCacheTag(CACHE_TAGS.ordersList);
      invalidateCacheTag(CACHE_TAGS.salesList);
      invalidateCacheTag(CACHE_TAGS.productsList);

      for (const item of productItems) {
        invalidateCacheTag(CACHE_TAGS.product(item.slug));
      }

      revalidatePath("/dashboard/orders");
      revalidatePath("/user/orders");

      return {
        success: true,
        data: order,
        message: "Order placed successfully!",
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to place order";
      return { success: false, error: message };
    }
  });
}

export async function updateOrderStatusAction(id: string, status: OrderStatus) {
  return authenticatedAction("Order Status", ["ADMIN", "VENDOR"], async () => {
    try {
      const existing = await getOrderById(id);
      if (!existing) throw new Error("Order not found");

      if (existing.orderStatus === "DELIVERED") {
        throw new Error("Cannot change status of a delivered order");
      }

      const updated = await updateOrderStatus(id, status);

      invalidateCacheTag(CACHE_TAGS.order(id));
      invalidateCacheTag(CACHE_TAGS.ordersList);
      invalidateCacheTag(CACHE_TAGS.salesList);
      revalidatePath("/dashboard/orders");
      revalidatePath(`/dashboard/orders/${id}`);

      return {
        success: true,
        data: updated,
        message: "Order Status updated!",
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update order";
      return { success: false, error: message };
    }
  });
}

export async function deleteOrderAction(id: string) {
  return authenticatedAction("Delete Order", ["ADMIN"], async () => {
    try {
      await deleteOrder(id);

      invalidateCacheTag(CACHE_TAGS.order(id));
      invalidateCacheTag(CACHE_TAGS.ordersList);
      invalidateCacheTag(CACHE_TAGS.salesList);
      revalidatePath("/dashboard/orders");

      return { success: true, message: "Order deleted successfully" };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete order";
      return { success: false, error: message };
    }
  });
}
