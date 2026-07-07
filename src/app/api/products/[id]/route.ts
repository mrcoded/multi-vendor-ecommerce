import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { apiError, requireAuth } from "@/lib/api/api-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const product = await db.product.findUnique({
      where: { id },
      include: { store: true },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch {
    return apiError("Unable to fetch product");
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authResult = await requireAuth(["ADMIN", "VENDOR"]);
  if (!authResult.ok) return authResult.response;

  try {
    const { id } = await params;

    const existingProduct = await db.product.findUnique({ where: { id } });

    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    if (
      authResult.user.role === "VENDOR" &&
      existingProduct.userId !== authResult.user.id
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const deletedProduct = await db.product.delete({ where: { id } });
    return NextResponse.json(deletedProduct);
  } catch {
    return apiError("Unable to delete product");
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authResult = await requireAuth(["ADMIN", "VENDOR"]);
  if (!authResult.ok) return authResult.response;

  try {
    const { id } = await params;
    const body = await request.json();

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
    } = body;

    const existingProduct = await db.product.findUnique({ where: { id } });

    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    if (
      authResult.user.role === "VENDOR" &&
      existingProduct.userId !== authResult.user.id
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const resolvedStoreId =
      storeId ??
      (Array.isArray(storeIds) ? storeIds[0] : storeIds) ??
      existingProduct.storeId;

    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        title,
        slug,
        imageUrl,
        category: { connect: { id: categoryId } },
        user: { connect: { id: vendorId ?? existingProduct.userId } },
        store: { connect: { id: resolvedStoreId } },
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
        wholesaleQuantity: wholesaleQuantity
          ? parseFloat(wholesaleQuantity)
          : null,
        wholesalePrice: wholesalePrice ? parseFloat(wholesalePrice) : null,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch {
    return apiError("Unable to update product");
  }
}
