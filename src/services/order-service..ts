import { db } from "@/lib/db";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/api/cache";
import { OrderStatus } from "@prisma/client";
import { unstable_cache } from "next/cache";

import { CheckoutProps, OrderItemProps } from "@/types/order";
import { sanitizeCheckoutInput } from "@/lib/sanitize-payloads";

function generateOrderNumber(length: number) {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let orderNumber = "";
  for (let i = 0; i < length; i++) {
    orderNumber += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return orderNumber;
}

export async function createOrderService(
  checkoutData: CheckoutProps,
  orderItems: OrderItemProps[],
) {
  const safeCheckout = sanitizeCheckoutInput(checkoutData);
  const {
    userId,
    emailAddress,
    shippingCost,
    paymentMethod,
    paymentToken,
    ...orderData
  } = safeCheckout;

  await db.userProfile.upsert({
    where: { userId },
    update: orderData,
    create: {
      ...orderData,
      email: emailAddress,
      user: { connect: { id: userId } },
    },
  });

  return await db.$transaction(
    async (tx) => {
      const productItems = [];

      for (const item of orderItems) {
        const quantity = parseInt(item.qty);

        const product = await tx.product.update({
          where: { id: item.id, qty: { gte: quantity } },
          data: { qty: { decrement: quantity } },
          select: {
            id: true,
            storeId: true,
            userId: true,
            title: true,
            imageUrl: true,
            salePrice: true,
            slug: true,
          },
        });

        if (!product) throw new Error(`Insufficient stock for ${item.title}`);

        productItems.push({
          ...product,
          requestedQty: quantity,
        });
      }

      const newOrder = await tx.order.create({
        data: {
          ...orderData,
          paymentMethod: paymentMethod,
          emailAddress: emailAddress,
          shippingCost: parseFloat(shippingCost),
          orderNumber: generateOrderNumber(7),
          user: { connect: { id: userId } },
        },
      });

      await tx.orderItem.createMany({
        data: productItems.map((item) => ({
          productId: item.id,
          vendorId: item.userId,
          storeId: item.storeId,
          quantity: item.requestedQty,
          price: item.salePrice,
          orderId: newOrder.id,
          imageUrl: item.imageUrl,
          title: item.title,
          totalPrice:
            item.salePrice * item.requestedQty + parseFloat(shippingCost),
        })),
      });

      await tx.sale.createMany({
        data: productItems.map((item) => ({
          orderId: newOrder.id,
          productId: item.id,
          vendorId: item.userId,
          storeId: item.storeId,
          productQty: item.requestedQty,
          productTitle: item.title,
          productImageUrl: item.imageUrl,
          productPrice: item.salePrice,
          total: item.salePrice * item.requestedQty + parseFloat(shippingCost),
        })),
      });

      return { order: newOrder, productItems };
    },
    { timeout: 30000 },
  );
}

/** Orders are user-scoped and mutate often — no Data Cache. */
export async function getAllOrders(userId?: string) {
  return await db.order.findMany({
    where: userId ? { userId } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      orderItems: true,
    },
  });
}

export async function getOrderById(id: string) {
  return await db.order.findUnique({
    where: { id },
    include: {
      orderItems: true,
    },
  });
}

export async function deleteOrder(id: string) {
  return await db.order.delete({
    where: { id },
  });
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  return await db.order.update({
    where: { id },
    data: { orderStatus: status },
  });
}

const getCachedAllSales = unstable_cache(
  async () => {
    return await db.sale.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        product: {
          select: {
            title: true,
            category: { select: { title: true } },
          },
        },
      },
    });
  },
  ["sales-list"],
  {
    tags: [CACHE_TAGS.salesList],
    revalidate: CACHE_TTL.dashboard,
  },
);

export async function getAllSales() {
  return getCachedAllSales();
}

export async function getSalesByVendor(vendorId?: string) {
  if (!vendorId) return [];

  return unstable_cache(
    async () => {
      return await db.sale.findMany({
        where: { vendorId },
        orderBy: { createdAt: "desc" },
      });
    },
    [`sales-vendor-${vendorId}`],
    {
      tags: [CACHE_TAGS.salesList, CACHE_TAGS.salesVendor(vendorId)],
      revalidate: CACHE_TTL.dashboard,
    },
  )();
}

type AuthUser = { id: string; role: string };

export async function getOrdersForUser(user: AuthUser) {
  const scopeId = user.role === "ADMIN" ? undefined : user.id;
  return getAllOrders(scopeId);
}

export async function getOrderForUser(id: string, user: AuthUser) {
  const data = await getOrderById(id);
  if (!data) return null;

  const isOwner = data.userId === user.id;
  const isVendorOnOrder = data.orderItems.some(
    (item) => item.vendorId === user.id,
  );
  const isAdmin = user.role === "ADMIN";

  if (!isOwner && !isVendorOnOrder && !isAdmin) return null;

  return data;
}

export async function getSalesForUser(user: AuthUser, vendorId?: string) {
  if (user.role === "VENDOR") {
    return getSalesByVendor(user.id);
  }

  if (user.role === "ADMIN") {
    if (vendorId) return getSalesByVendor(vendorId);
    return getAllSales();
  }

  return [];
}
