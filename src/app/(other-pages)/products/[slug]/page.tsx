import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { buildPageMetadata } from "@/lib/seo";
import {
  getProductBySlug,
  getSimilarProducts,
} from "@/services/product-service";

import ProductDetail from "../_components/ProductDetail";
import ProductJsonLd from "@/components/seo/ProductJsonLd";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return buildPageMetadata({
    title: product.title,
    description: product.description,
    path: `/products/${slug}`,
    image: product.imageUrl,
  });
}

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  if (!slug) return notFound();

  const product = await getProductBySlug(slug);
  if (!product) return notFound();

  const similarProducts = product.categoryId
    ? await getSimilarProducts(product.categoryId, product.id)
    : [];

  return (
    <>
      <ProductJsonLd
        name={product.title}
        description={product.description}
        slug={product.slug}
        imageUrl={product.imageUrl}
        price={product.salePrice}
        availability={product.qty > 0 ? "InStock" : "OutOfStock"}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          ...(product.category
            ? [
                {
                  name: product.category.title,
                  path: `/category/${product.category.slug}`,
                },
              ]
            : []),
          { name: product.title, path: `/products/${product.slug}` },
        ]}
      />

      <ProductDetail product={product} similarProducts={similarProducts} />
    </>
  );
};

export default ProductDetailPage;
