import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { title, slug, imageUrl, description, isActive } =
      await request.json();

    const existingCategory = await db.category.findUnique({
      where: {
        slug,
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "Category already exists",
        },
        { status: 409 }
      );
    }

    const newCategory = await db.category.create({
      data: { title, slug, imageUrl, description, isActive },
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Unable to create Category",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request, params: { id: string }) {
  try {
    const category = await db.category.findUnique({
      where: {
        id: params.id,
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

export async function DELETE(request: Request, params: { id: string }) {
  try {
    const existingCategory = await db.category.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "Category Not Found",
        },
        {
          status: 404,
        }
      );
    }

    const deletedCategory = await db.category.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to Delete Category",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
