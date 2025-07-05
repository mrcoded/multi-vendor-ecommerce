import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      title,
      slug,
      productImages,
      categoryId,
      description,
      isActive,
      isWholesale,
      qty = 1,
      sku,
      barcode,
      productPrice,
      productCode,
      salePrice,
      tags,
      wholesaleQuantity,
      wholesalePrice,
      vendorId,
    } = await request.json();

    //Check if product already exists in the db
    const existingProduct = await db.product.findUnique({
      where: {
        slug: slug,
      },
    });

    if (existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product already exists",
        },
        { status: 409 }
      );
    }

    const newProduct = await db.product.create({
      data: {
        title,
        slug,
        productImages,
        imageUrl: productImages[0],
        categoryId,
        description,
        isActive,
        isWholesale,
        qty: parseFloat(qty),
        sku,
        barcode,
        productPrice: parseFloat(productPrice),
        productCode,
        salePrice: parseFloat(salePrice),
        tags,
        wholesaleQuantity: parseFloat(wholesaleQuantity),
        wholesalePrice: parseFloat(wholesalePrice),
        userId: vendorId,
      },
    });

    console.log(newProduct);
    return NextResponse.json(newProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Unable to create Product",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: NextRequest) {
  const pageSize = 3;
  const min = request.nextUrl.searchParams.get("min");
  const max = request.nextUrl.searchParams.get("max");
  const page = request.nextUrl.searchParams.get("page") || "1";
  const sortBy = request.nextUrl.searchParams.get("sort");
  const searchTerm = request.nextUrl.searchParams.get("search");
  const categoryId = request.nextUrl.searchParams.get("catId");

  const where: Partial<{
    categoryId: string | undefined;
    salePrice?: {
      gte?: number;
      lte?: number;
    };
  }> = {};

  if (categoryId !== null) {
    where.categoryId = categoryId;
  }

  if (min && max) {
    where.salePrice = {
      gte: parseFloat(min),
      lte: parseFloat(max),
    };
  } else if (min) {
    where.salePrice = {
      gte: parseFloat(min),
    };
  } else if (max) {
    where.salePrice = {
      lte: parseFloat(max),
    };
  }
  let products;

  try {
    if (searchTerm) {
      products = await db.product.findMany({
        where: {
          OR: [
            {
              title: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          ],
        },
      });
    } else if (categoryId && page) {
      products = await db.product.findMany({
        where,
        skip: (parseInt(page) - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: "desc",
        },
      });
    } else if (categoryId && sortBy) {
      products = await db.product.findMany({
        where,
        orderBy: {
          salePrice: sortBy === "asc" ? "desc" : "desc",
        },
      });
    } else if (categoryId) {
      products = await db.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      products = await db.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Products",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
