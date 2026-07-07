import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/api-auth";
import { getAllSales, getSalesByVendor } from "@/services/order-service.";

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(["ADMIN", "VENDOR"]);
    if (!authResult.ok) return authResult.response;

    const { user } = authResult;
    const vendorId = request.nextUrl.searchParams.get("vendorId");

    if (vendorId) {
      if (user.role !== "ADMIN" && user.id !== vendorId) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }
      const sales = await getSalesByVendor(vendorId);
      return NextResponse.json(sales);
    }

    if (user.role === "VENDOR") {
      const sales = await getSalesByVendor(user.id);
      return NextResponse.json(sales);
    }

    const sales = await getAllSales();
    return NextResponse.json(sales);
  } catch {
    return NextResponse.json(
      { message: "Unable to fetch Sales" },
      { status: 500 },
    );
  }
}
