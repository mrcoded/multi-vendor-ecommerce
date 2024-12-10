import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { title, slug, logoUrl, description, isActive } =
      await request.json();

    const newStore = await db.store.create({
      data: {
        title,
        slug,
        logoUrl,
        description,
        isActive,
      },
    });
    console.log(newStore);

    return NextResponse.json(newStore);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to create Store",
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
    const stores = await db.store.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(stores);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Stores",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
