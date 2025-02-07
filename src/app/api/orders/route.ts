import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

interface OrderItemProps {
  id: string;
  imageUrl: string;
  qty: string;
  salePrice: string;
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

    //create customer profile
    await db.userProfile.create({
      data: {
        firstName,
        lastName,
        phone,
        streetAddress,
        city,
        country,
        district,
        userId,
      },
    });

    //Use the prisma transaction API
    const result = await db.$transaction(async (prisma) => {
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
          quantity: parseInt(item.qty),
          price: parseFloat(item.salePrice),
          orderId: newOrder.id, //associate the order with the item
          imageUrl: item.imageUrl,
          title: item.title,
        })),
      });

      //Calculate total amount for each product and create a sale for each
      const sales = await Promise.all(
        orderItems.map(async (item: OrderItemProps) => {
          const totalAmount = parseFloat(item.salePrice) * parseInt(item.qty);

          const newSale = await prisma.sale.create({
            data: {
              orderId: newOrder.id, //associate the order with the item
              productId: item.id,
              vendorId: item.vendorId,
              productQty: parseInt(item.qty),
              productTitle: item.title,
              productImageUrl: item.imageUrl,
              productPrice: parseFloat(item.salePrice),
              total: totalAmount,
            },
          });

          return newSale;
        })
      );

      return { newOrder, newOrderItems, sales };
    });

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
