"use server";

import { OrderStatus } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  createOrderService,
  deleteOrder,
  getAllOrders,
  getAllSales,
  getOrderById,
  getSalesByVendor,
  updateOrderStatus,
} from "@/services/order-service.";
import { authenticatedAction } from "../auth-wrapper";

import { CheckoutProps, OrderItemProps } from "@/types/order";

export async function createOrderAction(data: {
  checkoutFormData: CheckoutProps;
  orderItems: OrderItemProps[];
}) {
  return authenticatedAction("Create Order", null, async () => {
    try {
      const order = await createOrderService(
        data.checkoutFormData,
        data.orderItems,
      );

      // 💥 Bust all relevant caches
      revalidateTag("orders-list");
      revalidateTag("sales-list");
      revalidatePath("/dashboard/orders");
      revalidatePath("/user/orders");

      return {
        success: true,
        data: order,
        message: "Order placed successfully!",
      };
    } catch (error: any) {
      console.log(error);
      return { success: false, error: error.message };
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

      // 💥 Targeted Busting
      revalidateTag(`order-${id}`);
      revalidateTag("orders-list");
      revalidatePath("/dashboard/orders");
      revalidatePath(`/dashboard/orders/${id}`);

      return {
        success: true,
        data: updated,
        message: "Order Status updated!",
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });
}

export async function deleteOrderAction(id: string) {
  return authenticatedAction("Delete Order", ["ADMIN"], async () => {
    try {
      await deleteOrder(id);

      revalidateTag("orders-list");
      revalidatePath("/dashboard/orders");

      return { success: true, message: "Order deleted successfully" };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });
}

export async function fetchAllSalesAction() {
  return authenticatedAction(
    "Fetch All Sales",
    ["ADMIN", "VENDOR"],
    async () => {
      try {
        const data = await getAllSales();

        return {
          success: true,
          data,
          message: "Sales fetched successfully",
        };
      } catch (error: any) {
        console.error("[FETCH_SALES_ERROR]:", error);
        return {
          success: false,
          error: error.message || "Failed to fetch sales",
        };
      }
    },
  );
}

export async function fetchAllOrdersAction() {
  // Use the third argument of your wrapper to access the session/user
  return authenticatedAction("Fetch All Orders", null, async (user) => {
    try {
      // 🎯 Determine scope: Admins get all, others get their own
      const scopeId = user.role === "ADMIN" ? undefined : user.id;

      const data = await getAllOrders(scopeId);

      return {
        success: true,
        message: "Orders fetched successfully",
        data,
      };
    } catch (error: any) {
      console.error("[FETCH_ORDERS_ERROR]:", error);
      return {
        success: false,
        error: error.message || "Failed to fetch orders",
      };
    }
  });
}

export async function fetchOrderByIdAction(id: string) {
  try {
    if (!id) return { success: false, error: "Order ID is required" };

    // 🎯 Call the cached service
    const data = await getOrderById(id);

    if (!data) {
      return { success: false, error: "Order not found!" };
    }

    return {
      success: true,
      data,
      message: "Order details fetched",
    };
  } catch (error: any) {
    console.error(`[FETCH_ORDER_ERROR]: ${id}`, error);
    return {
      success: false,
      error: error.message || "Failed to fetch order details",
    };
  }
}

export async function fetchVendorSalesAction(vendorId?: string) {
  return authenticatedAction(
    "Fetch Vendor Sales",
    ["VENDOR", "ADMIN"],
    async (user) => {
      try {
        // 🛡️ SECURITY CHECK: Ensure a VENDOR can only see their own sales
        // Admins can see any vendor's sales passed via vendorId
        const targetId = user.role === "VENDOR" ? user.id : vendorId;

        if (!targetId) {
          return { success: false, error: "Vendor ID is required" };
        }

        const data = await getSalesByVendor(targetId);

        return {
          success: true,
          data,
          message: "Vendor sales fetched successfully",
        };
      } catch (error: any) {
        console.error(`[FETCH_VENDOR_SALES_ERROR]: ${vendorId}`, error);
        return {
          success: false,
          error: error.message || "Failed to fetch sales",
        };
      }
    },
  );
}
