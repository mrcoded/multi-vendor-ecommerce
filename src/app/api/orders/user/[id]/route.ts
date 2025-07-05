import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const order = await db.order.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: true,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Order",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const existingOrder = await db.order.findUnique({
      where: {
        id,
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        {
          data: null,
          message: "Order Not Found",
        },
        {
          status: 404,
        }
      );
    }

    const deletedOrder = await db.order.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedOrder);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to Delete Order",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
