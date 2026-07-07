"use client";

import React, { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";

import { User } from "next-auth";
import { FieldValues, useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import generateUserCode from "@/lib/generateUserCode";

import {
  useProductById,
  useCreateProduct,
  useUpdateProduct,
} from "@/hooks/useProducts";
import { useUsers } from "@/hooks/useUsers";
import { useVendor } from "@/hooks/useVendor";
import { useCategories } from "@/hooks/useCategories";

import { StoreProps } from "@/types/store";
import { ProductServicesProps } from "@/types/products";

import ProductInputForm from "./ProductInputForm";
import SubmitButton from "@/components/buttons/SubmitButton";

const ProductForm = ({
  user,
  stores,
  productId,
}: {
  productId?: string;
  user: User | undefined;
  stores: StoreProps[] | undefined;
}) => {
  const userId = user?.id;
  const { data: vendor } = useVendor(userId);
  const { data: users } = useUsers();
  const { data: categories } = useCategories();
  const { data: product } = useProductById(productId ?? "");

  const role = user?.role;

  const allStores = stores ?? [];

  const allUsers = users ?? [];

  const categoriesData = categories ?? [];

  const vendorId = vendor?.id;

  const prefilledProductIdRef = useRef<string | null>(null);

  const isWholeSale = product?.isWholesale ?? false;

  const [tags, setTags] = useState<string[]>([]);

  const [isWholesaleCheck, setIsWholesaleCheck] = useState(false);

  const [productImages, setProductImages] = useState<string[]>([]);

  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();

  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductServicesProps>({
    defaultValues: {
      sku: "",
      qty: 0,
      title: "",
      barcode: "",
      userId: "",
      salePrice: 0,
      categoryId: "",
      description: "",
      productPrice: 0,
      wholesalePrice: 0,
      wholesaleQuantity: 0,
      isWholesale: false,
      isActive: false,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!product?.id || prefilledProductIdRef.current === product.id) return;
    prefilledProductIdRef.current = product.id;
    const storeVendorId = product.store?.vendorId;
    reset({
      sku: product.sku ?? "",
      qty: product.qty ?? 0,
      title: product.title ?? "",
      barcode: product.barcode ?? "",
      userId: product.userId ?? storeVendorId ?? "",
      salePrice: product.salePrice ?? 0,
      categoryId: product.categoryId ?? "",
      description: product.description ?? "",
      productPrice: product.productPrice ?? 0,
      wholesalePrice: product.wholesalePrice ?? 0,
      wholesaleQuantity: product.wholesaleQuantity ?? 0,
      isWholesale: product.isWholesale ?? false,
      isActive: product.isActive ?? false,
    });
    setTags(product.tags ?? []);
    setProductImages(product.productImages ?? []);
    setIsWholesaleCheck(product.isWholesale ?? false);
  }, [product, reset]);

  useEffect(() => {
    if (productId || role === "ADMIN" || !vendorId) return;

    setValue("userId", vendorId);
  }, [productId, role, vendorId, setValue]);

  const onSubmit = async (data: FieldValues) => {
    const formData = data as ProductServicesProps;

    if (!productImages || productImages.length === 0) {
      toast.error("Please upload at least one product image.");

      return;
    }

    const slug = generateSlug(formData.title);

    const productCode = generateUserCode("MVEP", formData.title);

    formData.slug = slug;

    formData.productImages = productImages ?? productImages[0];

    formData.tags = tags;

    formData.productCode = productCode;

    if (productId) {
      updateProduct({
        productId,

        formData,
      });
    } else {
      createProduct(formData);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto my-3 w-full max-w-4xl rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6 md:p-8"
      >
        <ProductInputForm
          register={register}
          errors={errors}
          watch={watch}
          product={product}
          isWholeSale={isWholeSale}
          isWholesaleCheck={isWholesaleCheck}
          setIsWholesaleCheck={setIsWholesaleCheck}
          tags={tags}
          setTags={setTags}
          productImages={productImages}
          setProductImages={setProductImages}
          categoriesData={categoriesData}
          vendorId={vendorId}
          role={role}
          productId={productId}
          allStores={allStores}
          users={allUsers}
        />

        <SubmitButton
          isLoading={isCreating || isUpdating}
          buttonTitle={productId ? "Update Product" : "Create Product"}
          loadingButtonTitle={`${
            productId ? "Updating" : "Creating"
          } Product please wait...`}
        />
      </form>
    </div>
  );
};

export default ProductForm;
