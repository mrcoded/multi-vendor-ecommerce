import { db } from "@/lib/db";
import { authOptions } from "@/lib/authOptions";
import { revalidateTag } from "next/cache";

import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 30;

export async function GET(request: NextRequest) {
  const pageSize = 10;
  const { searchParams } = request.nextUrl;

  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const page = searchParams.get("page") || "1";
  const sortBy = searchParams.get("sort");
  const searchTerm = searchParams.get("search");
  const categoryId = searchParams.get("catId");

  //Prisma's built-in types for the 'where' clause
  const where: Prisma.ProductWhereInput = {};

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (searchTerm) {
    where.OR = [
      { title: { contains: searchTerm, mode: "insensitive" } },
      { description: { contains: searchTerm, mode: "insensitive" } },
    ];
  }

  if (min || max) {
    where.salePrice = {
      gte: min ? parseFloat(min) : undefined,
      lte: max ? parseFloat(max) : undefined,
    };
  }

  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };

  if (sortBy === "asc" || sortBy === "desc") {
    orderBy = { salePrice: sortBy };
  }

  try {
    const products = await db.product.findMany({
      where,
      orderBy,
      skip: (parseInt(page) - 1) * pageSize,
      take: pageSize,
      include: {
        store: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET_PRODUCTS_ERROR", error);
    return NextResponse.json(
      { message: "Unable to fetch Products" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;
  if (!userId || session?.user?.role === "USER") {
    return NextResponse.json(
      {
        data: null,
        message: "User not found",
      },
      { status: 404 },
    );
  }

  try {
    const {
      title,
      slug,
      imageUrl,
      categoryId,
      description,
      isActive,
      isWholesale,
      qty,
      sku,
      barcode,
      productPrice,
      productCode,
      productImages,
      salePrice,
      tags,
      wholesaleQuantity,
      wholesalePrice,
      vendorId,
      storeId,
      storeIds,
    } = await request.json();

    // Loop through the array from the frontend
    const createdProduct = storeIds.map((id: string) => {
      return db.product.create({
        data: {
          title,
          slug: `${slug}/${id.slice(-4)}`, // Unique slug per store
          imageUrl,
          category: {
            connect: { id: categoryId },
          },
          user: {
            connect: { id: vendorId },
          },
          isActive,
          // storeIds,
          description,
          isWholesale,
          productImages,
          qty: parseFloat(qty),
          sku,
          barcode,
          productPrice: parseFloat(productPrice),
          productCode,
          salePrice: parseFloat(salePrice),
          tags,
          wholesaleQuantity: parseFloat(wholesaleQuantity),
          wholesalePrice: parseFloat(wholesalePrice),
          store: {
            connect: { id: id },
          },
        },
      });
    });

    await db.$transaction(createdProduct);

    // get store slugs
    const stores = await db.store.findMany({
      where: { id: { in: storeIds } },
      select: { slug: true },
    });

    // invalidate store products specific cache tag
    stores.forEach((store) => {
      revalidateTag(`store-${store.slug}`);
    });

    return NextResponse.json(createdProduct);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to create Product",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
