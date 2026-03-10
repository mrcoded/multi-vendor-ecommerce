import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  },
) {
  try {
    const { slug } = await params;

    const store = await db.store.findUnique({
      where: {
        slug,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Store",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
