import { db } from "@/lib/db";
import { authOptions } from "@/lib/authOptions";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await params;

    const store = await db.store.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
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

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  try {
    const { id } = await params;

    if (!user || user.role === "USER") {
      return NextResponse.json(
        {
          data: null,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    //check if store exists
    const existingStore = await db.store.findUnique({
      where: {
        id,
      },
    });

    if (!existingStore) {
      return NextResponse.json(
        {
          data: null,
          message: "Store Not Found",
        },
        {
          status: 404,
        },
      );
    }

    const deletedStore = await db.store.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedStore);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to Delete Store",
        error,
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user || user.role === "USER") {
      return NextResponse.json(
        {
          data: null,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    //extract data from requests
    const {
      title,
      description,
      categoryIds,
      imageUrl,
      isActive,
      storeEmail,
      storePhone,
      streetAddress,
      country,
      vendorId,
      city,
    } = await request.json();

    //chec if store exists
    const existingStore = await db.store.findUnique({
      where: {
        id,
      },
    });

    if (!existingStore) {
      return NextResponse.json(
        {
          data: null,
          message: "Store not found",
        },
        { status: 404 },
      );
    }

    //update store
    const updatedStore = await db.store.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        vendorId,
        categoryIds,
        imageUrl,
        isActive,
        storeEmail,
        storePhone,
        streetAddress,
        country,
        city,
      },
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to update Store",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
