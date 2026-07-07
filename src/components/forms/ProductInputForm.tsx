"use client";

import React, { useMemo } from "react";

import TextInput from "@/components/inputs/TextInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SelectInput from "@/components/inputs/SelectInput";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import ArrayItemsInput from "@/components/inputs/ArrayItemsInput";
import MultiImageInput from "@/components/inputs/MultiImageInput";

import { ProductInputFormProps } from "@/types/products";

const ProductInputForm = ({
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
  const selectedVendorId = watch("userId");
  const activeVendorId = role === "ADMIN" ? selectedVendorId : vendorId;

  const userData = users ?? [];
  const storesData = allStores ?? [];

  const storeVendorId = product?.store?.vendorId;

  const vendorStoreDatas = storesData.filter(
    (store: { vendorId: string }) => store.vendorId === vendorId,
  );

  const storesDataByRole = role === "ADMIN" ? storesData : vendorStoreDatas;

  const vendorData = userData.filter(
    (vendor: { role: string }) => vendor.role === "VENDOR",
  );

  const filteredStores = useMemo(() => {
    if (!activeVendorId) return [];
    return storesDataByRole.filter(
      (store) => store.vendorId === activeVendorId,
    );
  }, [activeVendorId, storesDataByRole]);

  const assignedVendorName = useMemo(() => {
    const ownerId = productId ? storeVendorId : activeVendorId;
    const vendor = vendorData.find(
      (v: { id: string; name?: string }) => v.id === ownerId,
    );
    return vendor?.name || "—";
  }, [productId, storeVendorId, activeVendorId, vendorData]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
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

      {role === "ADMIN" && !productId ? (
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
      ) : role === "ADMIN" && productId ? (
        <div className="w-full">
          <label className="mb-2 block text-sm font-medium leading-6 text-foreground">
            Vendor
          </label>
          <div className="rounded-md border border-border bg-muted/40 px-3 py-3 text-sm font-medium text-foreground">
            {assignedVendorName}
          </div>
          <input type="hidden" {...register("userId")} />
        </div>
      ) : (
        <input type="hidden" {...register("userId")} />
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
        <SelectInput
          label="Select Stores"
          name="storeIds"
          register={register}
          errors={errors}
          className="w-full"
          options={filteredStores}
          hasMultipleSelect={true}
        />
      ) : (
        <div className="flex flex-col text-sm font-medium leading-6 text-foreground">
          <span className="mb-2">Selected store</span>
          <span className="rounded-md border border-border bg-muted/40 px-3 py-3 text-base font-semibold">
            {product?.store?.title ?? "—"}
          </span>
        </div>
      )}

      <MultiImageInput
        imageUrls={productImages}
        setImageUrls={setProductImages}
        endpoint="multipleProductsUploader"
        label="Product Images"
      />

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
