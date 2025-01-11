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
    const product = await db.product.findUnique({
      where: {
        id,
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
        }
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
        { status: 404 }
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
      }
    );
  }
}
