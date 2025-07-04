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
    const category = await db.category.findUnique({
      where: {
        slug,
      },
      include: {
        products: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Category",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
