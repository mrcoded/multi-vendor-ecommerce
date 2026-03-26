"use client";

import React, { useState } from "react";
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
import { useVendor } from "@/hooks/useVendor";

import { StoreProps } from "@/types/store";
import { ProductFormData } from "@/types/products";

import ProductInputForm from "./ProductInputForm";
import SubmitButton from "@/components/buttons/SubmitButton";
import { useUsers } from "@/hooks/useUsers";
import { useCategories } from "@/hooks/useCategories";

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
  const vendorId = vendor?.data?.id;

  const initialTags = product?.tags ?? [];
  const isWholeSale = product?.isWholesale ?? false;
  const initialProductImages = product?.productImages ?? [];

  // const [mounted, setMounted] = useState(false);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [isWholesaleCheck, setIsWholesaleCheck] = useState(false);
  const [productImages, setProductImages] = useState(initialProductImages);
  //mutations
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const {
    register,
    reset,
    setValue, // 👈 It comes from here!
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      sku: product?.sku,
      qty: product?.qty,
      title: product?.title,
      barcode: product?.barcode,
      salePrice: product?.salePrice,
      categoryId: product?.categoryId,
      // storeIds: product?.storeIds,
      description: product?.description,
      productPrice: product?.productPrice,
      wholesalePrice: product?.wholesalePrice,
      wholesaleQuantity: product?.wholesaleQuantity,
    },
    // Optional: Trigger validation only on change or blur
    mode: "onChange",
  });

  const onSubmit = async (data: FieldValues) => {
    const formData = data as ProductFormData;

    //Validation Guard
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
    console.log(formData);
    if (productId) {
      // UPDATE MUTATION
      // Call your server action with the cleaned data
      updateProduct({
        productId,
        formData,
      });
    } else {
      //CREATE MUTATION
      createProduct(formData);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 sm:p-6 md:p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <ProductInputForm
          register={register}
          errors={errors}
          reset={reset}
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
