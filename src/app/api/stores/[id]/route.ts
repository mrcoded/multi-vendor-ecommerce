import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params: { id },
  }: {
    params: { id: string };
  }
) {
  try {
    const store = await db.store.findUnique({
      where: {
        id,
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
        }
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
    const { title, description, categoryIds, imageUrl, isActive } =
      await request.json();

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
        { status: 404 }
      );
    }

    const updatedStore = await db.store.update({
      where: {
        id,
      },
      data: { title, description, categoryIds, imageUrl, isActive },
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
      }
    );
  }
}
