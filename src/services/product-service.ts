import { db } from "@/lib/db";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/api/cache";
import { ProductServicesProps } from "@/types/products";
import {
  sanitizeProductInput,
  sanitizeProductSearchParams,
} from "@/lib/sanitize-payloads";

import { CATALOG_PAGE_SIZE } from "@/constants/catalog";
import { Prisma } from "@prisma/client";
import { cache } from "react";
import { unstable_cache } from "next/cache";

export interface ProductQueryParams {
  page?: string;
  catId?: string;
  search?: string;
  min?: string;
  max?: string;
  sort?: "asc" | "desc";
}

const getCachedFilteredProducts = unstable_cache(
  async (paramsJson: string) => {
    const params = sanitizeProductSearchParams(
      JSON.parse(paramsJson) as ProductQueryParams,
    );
    const pageSize = CATALOG_PAGE_SIZE;
    const { page = "1", catId, search, min, max, sort } = params;

    const where: Prisma.ProductWhereInput = {};
    if (catId) where.categoryId = catId;

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (min || max) {
      where.salePrice = {
        gte: min ? parseFloat(min) : undefined,
        lte: max ? parseFloat(max) : undefined,
      };
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput =
      sort === "asc" || sort === "desc"
        ? { salePrice: sort }
        : { createdAt: "desc" };

    return await db.product.findMany({
      where,
      orderBy,
      skip: (parseInt(page) - 1) * pageSize,
      take: pageSize,
      include: { category: true },
    });
  },
  ["products-filtered"],
  {
    tags: [CACHE_TAGS.productsList],
    revalidate: CACHE_TTL.products,
  },
);

export async function getFilteredProducts(params: ProductQueryParams) {
  return getCachedFilteredProducts(JSON.stringify(params));
}

export async function getProductById(id: string) {
  return await db.product.findUnique({
    where: { id },
    include: { store: true, category: true },
  });
}

export async function createStoreProducts(data: ProductServicesProps) {
  const safeData = sanitizeProductInput(data);
  const {
    productImages,
    storeIds,
    storeId,
    categoryId,
    userId,
    slug,
    store,
    ...rest
  } = safeData;

  const operations = storeIds.map((storeId: string, index: number) =>
    db.product.create({
      data: {
        ...rest,
        slug: `${slug}+${index}`,
        imageUrl:
          productImages && productImages.length > 0 ? productImages[0] : "",
        qty: Number(safeData.qty),
        productPrice: Number(safeData.productPrice),
        salePrice: Number(safeData.salePrice),
        wholesaleQuantity: Number(safeData.wholesaleQuantity),
        wholesalePrice: Number(safeData.wholesalePrice),
        category: { connect: { id: safeData.categoryId } },
        user: { connect: { id: userId } },
        store: { connect: { id: storeId } },
      },
    }),
  );

  return await db.$transaction(operations);
}

export const getProductBySlug = cache(async (slug: string) => {
  return unstable_cache(
    async () => {
      return await db.product.findUnique({
        where: { slug },
        include: { store: true, category: true },
      });
    },
    [`product-slug-${slug}`],
    {
      tags: [CACHE_TAGS.productsList, CACHE_TAGS.product(slug)],
      revalidate: CACHE_TTL.products,
    },
  )();
});

export async function getSimilarProducts(
  categoryId: string,
  excludeProductId: string,
  limit = 8,
) {
  return unstable_cache(
    async () => {
      return await db.product.findMany({
        where: {
          categoryId,
          isActive: true,
          id: { not: excludeProductId },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        select: {
          id: true,
          slug: true,
          title: true,
          imageUrl: true,
          salePrice: true,
        },
      });
    },
    [`similar-products-${categoryId}-${excludeProductId}-${limit}`],
    {
      tags: [CACHE_TAGS.productsList, CACHE_TAGS.categoryById(categoryId)],
      revalidate: CACHE_TTL.products,
    },
  )();
}

export async function updateProduct(
  productId: string,
  data: ProductServicesProps,
) {
  const safeData = sanitizeProductInput(data);
  const originalProduct = await db.product.findUnique({
    where: { id: productId },
  });

  if (!originalProduct) {
    throw new Error("Product not found.");
  }

  const existingConflict = await db.product.findFirst({
    where: {
      slug: safeData.slug,
      storeId: originalProduct.storeId,
      NOT: { id: productId },
    },
  });

  if (existingConflict) {
    throw new Error(
      `The name "${safeData.title}" is already taken in this store.`,
    );
  }

  const mainImage = safeData.productImages?.[0] || "";

  const { categoryId, storeId, userId, store, ...rest } = safeData;

  try {
    return await db.product.update({
      where: { id: productId },
      data: {
        ...rest,
        title: safeData.title,
        slug: safeData.slug,
        qty: Number(safeData.qty),
        productPrice: Number(safeData.productPrice),
        salePrice: Number(safeData.salePrice),
        description: safeData.description,
        imageUrl: mainImage,
        productImages: safeData.productImages,
        wholesaleQuantity: Number(safeData.wholesaleQuantity),
        wholesalePrice: Number(safeData.wholesalePrice),
        category: { connect: { id: safeData.categoryId } },
      },
    });
  } catch (error) {
    console.error("Update Error:", error);
    throw new Error("Failed to update product.");
  }
}

const getCachedAllProducts = unstable_cache(
  async () => {
    return await db.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  },
  ["all-products-list"],
  { tags: [CACHE_TAGS.productsList], revalidate: CACHE_TTL.products },
);

export async function getAllProducts() {
  return getCachedAllProducts();
}

export async function deleteProduct(productId: string) {
  try {
    return await db.product.delete({
      where: { id: productId },
    });
  } catch (error) {
    console.error("Delete Error:", error);
    throw new Error("Failed to delete the product from this store.");
  }
}
