import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      title,
      slug,
      imageUrl,
      categoryId,
      description,
      isActive,
      isWholesale,
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
        imageUrl,
        categoryId,
        description,
        isActive,
        isWholesale,
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

export async function GET(request: Request) {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

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
