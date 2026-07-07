import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/api-auth";
import { getOrdersForUser } from "@/services/order-service.";

interface OrderItemProps {
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
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderNumber += characters.charAt(randomIndex);
  }

  return orderNumber;
}

export async function POST(request: Request) {
  try {
    const authResult = await requireAuth();
    if (!authResult.ok) return authResult.response;

    const { user } = authResult;
    const { checkoutFormData, orderItems } = await request.json();
    const {
      userId,
      firstName,
      lastName,
      emailAddress,
      phone,
      streetAddress,
      city,
      country,
      district,
      shippingCost,
      paymentMethod,
    } = checkoutFormData;

    if (userId !== user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const result = await db.$transaction(
      async (prisma) => {
        for (const item of orderItems) {
          const quantity = parseInt(item.qty);

          await prisma.product.update({
            where: { id: item.id, qty: { gte: quantity } },
            data: { qty: { decrement: quantity } },
          });
        }

        const newOrder = await prisma.order.create({
          data: {
            userId,
            firstName,
            lastName,
            emailAddress,
            phone,
            streetAddress,
            city,
            country,
            district,
            shippingCost: parseFloat(shippingCost),
            paymentMethod,
            orderNumber: generateOrderNumber(7),
          },
        });

        const newOrderItems = await prisma.orderItem.createMany({
          data: orderItems.map((item: OrderItemProps) => ({
            productId: item.id,
            vendorId: item.vendorId,
            storeId: item.storeId,
            quantity: parseInt(item.qty),
            price: parseFloat(item.salePrice),
            orderId: newOrder.id,
            imageUrl: item.imageUrl,
            title: item.title,
            totalPrice: parseFloat(item.salePrice) * parseInt(item.qty),
          })),
        });

        const salesData = orderItems.map((item: OrderItemProps) => ({
          orderId: newOrder.id,
          productId: item.id,
          vendorId: item.vendorId,
          productQty: parseInt(item.qty),
          productTitle: item.title,
          productImageUrl: item.imageUrl,
          productPrice: parseFloat(item.salePrice),
          total: parseFloat(item.salePrice) * parseInt(item.qty),
          storeId: item.storeId,
        }));

        const sales = await prisma.sale.createMany({
          data: salesData,
        });

        return { newOrder, newOrderItems, sales };
      },
      {
        maxWait: 10000,
        timeout: 30000,
      },
    );

    return NextResponse.json(result.newOrder);
  } catch {
    return NextResponse.json(
      { message: "Unable to create Order" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const authResult = await requireAuth();
    if (!authResult.ok) return authResult.response;

    const orders = await getOrdersForUser(authResult.user);

    return NextResponse.json(orders);
  } catch {
    return NextResponse.json(
      { message: "Unable to fetch Orders" },
      { status: 500 },
    );
  }
}
