import { db } from "@/lib/db";
import { CheckoutProps } from "@/types/order";
import { OrderStatus } from "@prisma/client";

export interface OrderItemProps {
  id: string;
  imageUrl: string;
  qty: string;
  salePrice: string;
  storeId: string;
  title: string;
  vendorId: string;
}

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
  // Profile Upsert
  const {
    userId,
    emailAddress,
    shippingCost,
    paymentMethod,
    paymentToken,
    ...orderData
  } = checkoutData;
  console.log(checkoutData);

  await db.userProfile.upsert({
    where: { userId },
    update: orderData, // Scalars like firstName, phone, etc.
    create: {
      ...orderData,
      email: emailAddress,

      user: { connect: { id: userId } },
    },
  });

  // Atomic Transaction for Order + Inventory
  return await db.$transaction(
    async (tx) => {
      // Create a container to store the "Real" data from the DB
      const productItems = [];

      for (const item of orderItems) {
        const quantity = parseInt(item.qty);

        // Inventory Check & Update
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
          },
        });

        if (!product) throw new Error(`Insufficient stock for ${item.title}`);

        //Store this product info in our array to use later
        productItems.push({
          ...product,
          requestedQty: quantity,
        });
      }

      // Create Order (Using your cleaned orderData)
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

      // Create Order Items using 'productItems'
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
          totalPrice: item.salePrice * item.requestedQty,
        })),
      });

      // Create Sales records using 'productItems'
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
          total: item.salePrice * item.requestedQty,
        })),
      });

      return newOrder;
    },
    { timeout: 30000 },
  );
}

export async function getAllOrders() {
  return await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { orderItems: true },
  });
}

export async function getOrderById(id: string) {
  return await db.order.findUnique({
    where: { id },
    include: { orderItems: true },
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

export async function getAllSales() {
  return await db.sale.findMany({
    orderBy: {
      createdAt: "desc",
    },
    // You can include relations here if you need store names or product details later
    include: {
      product: {
        select: {
          title: true,
          category: { select: { title: true } },
        },
      },
    },
  });
}

export async function getSalesByVendor(vendorId?: string) {
  return await db.sale.findMany({
    where: { vendorId },
    orderBy: { createdAt: "desc" },
  });
}
