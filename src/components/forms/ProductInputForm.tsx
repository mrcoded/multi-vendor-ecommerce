"use client";

import React, { useEffect, useMemo } from "react";

import TextInput from "@/components/inputs/TextInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SelectInput from "@/components/inputs/SelectInput";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import ArrayItemsInput from "@/components/inputs/ArrayItemsInput";
import MultiImageInput from "@/components/inputs/MultiImageInput";

import { ProductInputFormProps } from "@/types/products";

const ProductInputForm = ({
  reset,
  register,
  errors,
  categoriesData,
  watch,
  role,
  productId,
  productImages,
  setProductImages,
  vendorId,
  isWholeSale,
  isWholesaleCheck,
  setIsWholesaleCheck,
  tags,
  setTags,
  product,
  users,
  allStores,
}: ProductInputFormProps) => {
  // Watch the userId field
  const selectedVendorId = watch("userId");
  const userData = users ?? [];
  const storesData = allStores ?? [];

  // Sync the state when the product data finally arrives
  useEffect(() => {
    if (product) {
      // Reset React Hook Form fields
      reset({
        sku: product.sku ?? "",
        qty: product.qty ?? 0,
        title: product.title ?? "",
        barcode: product.barcode ?? "",
        salePrice: product.salePrice ?? 0,
        categoryId: product.categoryId ?? "",
        description: product.description ?? "",
        productPrice: product.productPrice ?? 0,
        wholesalePrice: product.wholesalePrice ?? 0,
        wholesaleQuantity: product.wholesaleQuantity ?? 0,
        isWholesale: product.isWholesale ?? false,
        isActive: product.isActive ?? false,
        // storeIds: product.storeIds ?? [],
        userId: product.userId ?? "",
      });

      // Sync Local UI States
      setTags(product.tags ?? []);
      setProductImages(product.productImages ?? []);
      setIsWholesaleCheck(product.isWholesale ?? false);
    }
  }, [product, reset]);

  //get all stores for current vendor
  const vendorStoreDatas = storesData.filter(
    (store: { vendorId: string }) => store.vendorId === vendorId,
  );

  //Get products by user role
  const storesDataByRole = role === "ADMIN" ? storesData : vendorStoreDatas;

  //all vendors for ADMIN
  const vendorData = userData?.filter(
    (vendor: { role: string }) => vendor.role === "VENDOR",
  );

  // Memoize the filtered stores so they only recalculate when vendor or stores change
  const filteredStores = useMemo(() => {
    if (!selectedVendorId) return [];

    // Filter the original stores list by the vendor ID
    return storesDataByRole.filter(
      (store) => store.vendorId === selectedVendorId,
    );
  }, [selectedVendorId, storesDataByRole]);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 sm:gap-6">
      <TextInput
        label="Product Title"
        name="title"
        register={register}
        errors={errors}
      />

      <TextInput
        label="Product SKU"
        name="sku"
        register={register}
        errors={errors}
        className="w-full"
      />

      <TextInput
        label="Product Barcode"
        name="barcode"
        register={register}
        errors={errors}
        className="w-full"
      />

      <TextInput
        label="Product Price (Before Discount)"
        name="productPrice"
        type="number"
        register={register}
        errors={errors}
        className="w-full"
      />

      <TextInput
        label="Product Sale Price(Discounted)"
        name="salePrice"
        type="number"
        register={register}
        errors={errors}
        className="w-full"
      />

      <SelectInput
        label="Select Category"
        name="categoryId"
        register={register}
        errors={errors}
        isRequired={true}
        className="w-full"
        options={categoriesData}
        hasMultipleSelect={false}
      />

      {/* //Set vendorId */}
      {role === "ADMIN" ? (
        <SelectInput
          label="Select Vendor"
          name="userId"
          register={register}
          isRequired={true}
          errors={errors}
          className="w-full"
          options={vendorData}
          hasMultipleSelect={false}
        />
      ) : (
        <input type="hidden" {...register("userId")} value={selectedVendorId} />
      )}

      <ToggleInput
        label="Supports Wholesales"
        name="isWholesale"
        truthyValue="Supported"
        falsyValue="Not Supported"
        register={register}
        setIsWholesaleCheck={setIsWholesaleCheck}
        defaultCheck={isWholeSale}
      />

      {isWholesaleCheck && (
        <>
          <TextInput
            label="WholeSale Price"
            name="wholesalePrice"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="WholeSale Available Quantity"
            name="wholesaleQuantity"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
        </>
      )}

      <TextInput
        label="Available Quantity"
        name="qty"
        type="number"
        register={register}
        errors={errors}
        className="w-full"
      />

      {!productId ? (
        <span>
          <SelectInput
            label="Select Stores"
            name="storeIds"
            register={register}
            errors={errors}
            className="w-full"
            options={filteredStores}
            hasMultipleSelect={true}
          />
        </span>
      ) : (
        <span className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-slate-50 leading-6">
          Selected store:{" "}
          <span className="ml-2 text-base line-clamp-2">
            {product?.store?.title}
          </span>
        </span>
      )}

      <MultiImageInput
        imageUrls={productImages}
        setImageUrls={setProductImages}
        endpoint="multipleProductsUploader"
        label="Product Images"
      />

      {/* Tags */}
      <ArrayItemsInput setItems={setTags} items={tags} itemTitle="Tag" />

      <TextAreaInput
        label="Product Description"
        name="description"
        register={register}
        errors={errors}
      />

      <ToggleInput
        label="Publish your Product"
        name="isActive"
        truthyValue="Active"
        falsyValue="Draft"
        register={register}
        defaultCheck={product?.isActive}
      />
    </div>
  );
};

export default ProductInputForm;
