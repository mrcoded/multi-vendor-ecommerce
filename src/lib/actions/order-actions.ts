"use server";

import { OrderStatus } from "@prisma/client";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import {
  createOrderService,
  deleteOrder,
  getAllOrders,
  getAllSales,
  getOrderById,
  getSalesByVendor,
  OrderItemProps,
  updateOrderStatus,
} from "@/services/order-service.";
import { authenticatedAction } from "../auth-wrapper";

import { CheckoutProps } from "@/types/order";

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
  return authenticatedAction(
    "Update Order Status",
    ["ADMIN", "VENDOR"],
    async () => {
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
    },
  );
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
        const getCachedSales = unstable_cache(
          async () => await getAllSales(),
          ["sales-list"],
          { tags: ["sales-list"], revalidate: 3600 },
        );

        const data = await getCachedSales();
        return { success: true, data };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  );
}

export async function fetchAllOrdersAction() {
  return authenticatedAction("Fetch All Orders", null, async () => {
    try {
      const getCachedOrders = unstable_cache(
        async () => await getAllOrders(),
        ["orders-list"],
        { tags: ["orders-list"], revalidate: 3600 },
      );

      const data = await getCachedOrders();
      return { success: true, message: "Orders fetched", data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });
}

export async function fetchOrderByIdAction(id: string) {
  try {
    const getCachedOrder = unstable_cache(
      async (orderId: string) => await getOrderById(orderId),
      [`order-${id}`],
      { tags: [`order-${id}`], revalidate: 3600 },
    );

    const data = await getCachedOrder(id);

    if (!data) throw new Error("Order not found!");

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function fetchVendorSalesAction(vendorId?: string) {
  return authenticatedAction(
    "Fetch Vendor Sales",
    ["VENDOR", "ADMIN"],
    async () => {
      try {
        const getCachedVendorSales = unstable_cache(
          async () => await getSalesByVendor(vendorId),
          [`sales-vendor-${vendorId}`],
          {
            tags: [`sales-vendor-${vendorId}`, "sales-list"],
            revalidate: 3600,
          },
        );

        const data = await getCachedVendorSales();
        return { success: true, data };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
  );
}
