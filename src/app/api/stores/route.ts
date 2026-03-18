import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { db } from "@/lib/db";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  try {
    const storeData = await request.json();

    if (!user || user.role === "USER") {
      return NextResponse.json(
        {
          data: null,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

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
        { status: 409 },
      );
    }

    const newStore = await db.store.create({
      data: {
        title: storeData.title,
        slug: storeData.slug,
        imageUrl: storeData.imageUrl,
        description: storeData.description,
        isActive: storeData.isActive,
        categoryIds: storeData.categoryIds,
        vendorId: storeData.vendorId,
        storeEmail: storeData.storeEmail,
        storePhone: storeData.storePhone,
        streetAddress: storeData.streetAddress,
        city: storeData.city,
        country: storeData.country,
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
      },
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
      },
    );
  }
}
