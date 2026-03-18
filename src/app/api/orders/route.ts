import { db } from "@/lib/db";
import { NextResponse } from "next/server";

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

    // Upsert the customer profile
    await db.userProfile.upsert({
      where: {
        userId: userId,
      },
      update: {
        // What to change if they already have a profile
        firstName,
        lastName,
        phone,
        streetAddress,
        city,
        country,
        district,
      },
      create: {
        // What to set if this is their first time
        userId,
        firstName,
        lastName,
        phone,
        streetAddress,
        city,
        country,
        district,
      },
    });

    //Use the prisma transaction API
    const result = await db.$transaction(
      async (prisma) => {
        // ATOMIC INVENTORY UPDATE if stock is low.
        // Process inventory one by one - often more stable for transactions
        for (const item of orderItems) {
          const quantity = parseInt(item.qty);

          await prisma.product.update({
            where: { id: item.id, qty: { gte: quantity } },
            data: { qty: { decrement: quantity } },
          });
        }

        //create order and orderitems within the transaction
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
            orderNumber: generateOrderNumber(8),
          },
        });

        //Create Order Item
        const newOrderItems = await prisma.orderItem.createMany({
          data: orderItems.map((item: OrderItemProps) => ({
            productId: item.id,
            vendorId: item.vendorId,
            storeId: item.storeId,
            quantity: parseInt(item.qty),
            price: parseFloat(item.salePrice),
            orderId: newOrder.id, //associate the order with the item
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
        maxWait: 10000, // 10 seconds to wait for a connection
        timeout: 30000, // 30 seconds to complete all operations
      },
    );

    return NextResponse.json(result.newOrder);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to create Order",
        error,
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(request: Request) {
  try {
    const orders = await db.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Orders",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
