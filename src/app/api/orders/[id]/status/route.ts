import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { db } from "@/lib/db";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    const { id: orderId } = await params;

    const body = await req.json();
    const { orderStatus } = body;

    // Basic Validation
    if (!user || user?.role === "USER") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!orderStatus) {
      return new NextResponse("Invalid Status", { status: 400 });
    }

    //check existing order
    const existingOrder = await db.order.findUnique({ where: { id: orderId } });

    if (!existingOrder) {
      return new NextResponse("Order Not Found", { status: 404 });
    }

    // Check if order is already delivered
    if (existingOrder?.orderStatus === "DELIVERED") {
      return new NextResponse("Cannot change status of a delivered order", {
        status: 400,
      });
    }

    // Update Order in Database
    const updatedOrder = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        orderStatus: orderStatus,
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("[ORDER_STATUS_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
