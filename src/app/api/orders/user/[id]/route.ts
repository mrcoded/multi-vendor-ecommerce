import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/api-auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const authResult = await requireAuth();
    if (!authResult.ok) return authResult.response;

    const { user } = authResult;
    const { id: userId } = await params;

    if (user.role !== "ADMIN" && user.id !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const orders = await db.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { orderItems: true },
    });

    return NextResponse.json(orders);
  } catch {
    return NextResponse.json(
      { message: "Unable to fetch Order" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
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
