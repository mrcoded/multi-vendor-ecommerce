import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params: { slug },
  }: {
    params: { slug: string };
  }
) {
  try {
    const product = await db.product.findUnique({
      where: {
        slug,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Product",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
