import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

interface OrderItemProps {
  id: string;
  imageUrl: string;
  qty: string;
  salePrice: string;
  title: string;
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
  const prisma = new PrismaClient();

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

    const newOrder = await db.order.create({
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
    await prisma.orderItem.createMany({
      data: orderItems.map((item: OrderItemProps) => ({
        productId: item.id,
        quantity: parseInt(item.qty),
        price: parseFloat(item.salePrice),
        orderId: newOrder.id,
        imageUrl: item.imageUrl,
        title: item.title,
      })),
    });

    return NextResponse.json(newOrder);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to create Order",
        error,
      },
      {
        status: 500,
      }
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
      }
    );
  }
}
