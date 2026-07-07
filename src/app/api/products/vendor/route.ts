import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await auth();
    const user = session?.user;

    const product = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(product);
  } catch (error) {

    return NextResponse.json(
      {
        message: "Unable to fetch Product",
        error,
      },
      {
        status: 500,
      },
    );
  }
}

