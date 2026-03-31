import { db } from "@/lib/db";
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

    const product = await db.product.findUnique({
      where: {
        id,
      },
      include: {
        store: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to fetch Product",
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

    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product Not Found",
        },
        {
          status: 404,
        },
      );
    }

    const deletedProduct = await db.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to Delete Product",
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
      storeIds,
    } = await request.json();

    const existingProducts = await db.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProducts) {
      return NextResponse.json(
        {
          data: null,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    const updatedPoduct = await db.product.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        imageUrl,
        category: {
          connect: { id: categoryId },
        },
        user: {
          connect: { id: vendorId },
        },
        store: {
          connect: { id: id },
        },
        description,
        isActive,
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
      },
    });

    return NextResponse.json(updatedPoduct);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Unable to update Product",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
