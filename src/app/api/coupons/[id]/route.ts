import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  {
    params: { id },
  }: {
    params: { id: string };
  }
) {
  try {
    const coupon = await db.coupon.findUnique({
      where: {
        id,
      },
    });

    return NextResponse.json(coupon);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Coupon",
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
  {
    params: { id },
  }: {
    params: { id: string };
  }
) {
  try {
    const existingCoupon = await db.coupon.findUnique({
      where: {
        id,
      },
    });

    if (!existingCoupon) {
      return NextResponse.json(
        {
          data: null,
          message: "Coupon Not Found",
        },
        {
          status: 404,
        }
      );
    }

    const deletedCoupon = await db.coupon.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedCoupon);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to Delete Coupon",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: Request,
  {
    params: { id },
  }: {
    params: { id: string };
  }
) {
  try {
    const { title, expiryDate, couponCode, isActive } = await request.json();

    const existingCoupon = await db.coupon.findUnique({
      where: {
        id,
      },
    });

    if (!existingCoupon) {
      return NextResponse.json(
        {
          data: null,
          message: "Coupon not found",
        },
        { status: 404 }
      );
    }

    const updatedCoupon = await db.coupon.update({
      where: {
        id,
      },
      data: { title, expiryDate, couponCode, isActive },
    });

    return NextResponse.json(updatedCoupon);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to update Coupon",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
