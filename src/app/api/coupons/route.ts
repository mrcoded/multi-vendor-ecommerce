import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { title, couponCode, expiryDate, isActive } = await request.json();

    const newCoupon = await db.coupon.create({
      data: {
        title,
        couponCode,
        expiryDate,
        isActive,
      },
    });
    console.log(newCoupon);

    return NextResponse.json(newCoupon);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to create Coupon",
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
    const coupons = await db.coupon.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(coupons);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Coupons",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
