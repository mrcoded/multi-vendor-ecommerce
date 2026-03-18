import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { db } from "@/lib/db";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        {
          data: null,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    //extract data from request
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
        { status: 409 },
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
      },
    );
  }
}

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

    const category = await db.category.findUnique({
      where: {
        id,
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

    //check if category exists
    const existingCategory = await db.category.findUnique({
      where: {
        id,
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
        },
      );
    }

    //delete category
    const deletedCategory = await db.category.delete({
      where: {
        id,
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

    //extract data from request
    const { title, slug, imageUrl, description, isActive } =
      await request.json();

    //check if category exists
    const existingCategory = await db.category.findUnique({
      where: {
        id,
      },
    });

    if (!existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "Category not found",
        },
        { status: 404 },
      );
    }

    //update category
    const updatedCategory = await db.category.update({
      where: {
        id,
      },
      data: { title, slug, imageUrl, description, isActive },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to update Category",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
