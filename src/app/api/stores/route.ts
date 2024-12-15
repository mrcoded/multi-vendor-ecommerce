import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const storeData = await request.json();

    //Check if store already exists
    const existingStore = await db.store.findUnique({
      where: {
        slug: storeData.slug,
      },
    });

    if (existingStore) {
      return NextResponse.json(
        {
          data: null,
          message: "Store already exists",
        },
        { status: 409 }
      );
    }

    const newStore = await db.store.create({
      data: {
        title: storeData.title,
        slug: storeData.slug,
        logoUrl: storeData.logoUrl,
        description: storeData.description,
        isActive: storeData.isActive,
        categoryIds: storeData.categoryIds,
      },
    });

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
