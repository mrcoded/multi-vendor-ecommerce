import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/api-auth";
import { getOrderForUser } from "@/services/order-service.";
import { db } from "@/lib/db";
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const authResult = await requireAuth();
    if (!authResult.ok) return authResult.response;

    const { user } = authResult;
    const { id } = await params;

    const order = await getOrderForUser(id, user);

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch {
    return NextResponse.json(
      { message: "Unable to fetch Order" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const authResult = await requireAuth(["ADMIN"]);
    if (!authResult.ok) return authResult.response;

    const { id } = await params;

    const existingOrder = await db.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { data: null, message: "Order Not Found" },
        { status: 404 },
      );
    }

    const deletedOrder = await db.order.delete({
      where: { id },
    });

    return NextResponse.json(deletedOrder);
  } catch {
    return NextResponse.json(
      { message: "Unable to Delete Order" },
      { status: 500 },
    );
  }
}
