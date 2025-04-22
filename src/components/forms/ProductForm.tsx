"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import { makePostRequest } from "@/lib/apiRequest";
import generateUserCode from "@/lib/generateUserCode";

import TextInput from "@/components/inputs/TextInput";
import MultiImageInput from "@/components/inputs/MultiImageInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SelectInput from "@/components/inputs/SelectInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import ArrayItemsInput from "@/components/inputs/ArrayItemsInput";

interface ProductFormProps {
  categories: { id: string; title: string }[];
  vendors: { id: string; name: string }[];
}

interface ProductFormData {
  id: string;
  title: string;
  slug: string;
  productImages: Array<string>;
  categoryId: string;
  description: string;
  isWholesale: boolean;
  sku: string;
  barcode: string;
  productPrice: number;
  productCode: string;
  salePrice: number;
  qty: number;
  tags: string[];
  wholesaleQuantity: number;
  wholesalePrice: number;
  userId: string;
}

const ProductForm = ({
  categories,
  vendors,
  updateData,
}: {
  updateData?: ProductFormData;
  categories: ProductFormProps["categories"];
  vendors: ProductFormProps["vendors"];
}) => {
  const router = useRouter();
  const id = updateData?.id ?? "";
  const initialTags = updateData?.tags ?? [];
  const initialProductImages = updateData?.productImages ?? [];
  const isWholeSale = updateData?.isWholesale ?? false;

  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState(initialProductImages);
  const [isWholesaleCheck, setIsWholesaleCheck] = useState(false);

  const [tags, setTags] = useState<string[]>(initialTags);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectUrl = () => {
    router.push("/dashboard/products");
  };

  const onSubmit = async (data: FieldValues) => {
    const slug = generateSlug(data.title);
    const productCode = generateUserCode("MVEP", data.title);
    data.slug = slug;
    data.productImages = productImages;
    data.tags = tags;
    data.productCode = productCode;

    if (id) {
      //PUT request (update)
      makePostRequest({
        setLoading,
        endpoint: `api/products/${id}`,
        data,
        resourceName: "Product",
        method: "PUT",
        reset,
        redirectUrl,
      });
    } else {
      //POST request (create)
      makePostRequest({
        setLoading,
        endpoint: "api/products",
        data,
        resourceName: "Product",
        reset,
        redirectUrl,
      });

      setTags([]);
      setProductImages([]);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Product Title"
            name="title"
            register={register}
            errors={errors}
            defaultValue={updateData?.title}
          />

          <TextInput
            label="Product SKU"
            name="sku"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={updateData?.sku}
          />

          <TextInput
            label="Product Barcode"
            name="barcode"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={updateData?.barcode}
          />

          <TextInput
            label="Product Price (Before Discount)"
            name="productPrice"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={updateData?.productPrice}
          />

          <TextInput
            label="Product Sale Price(Discounted)"
            name="salePrice"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={updateData?.salePrice}
          />

          <SelectInput
            label="Select Category"
            name="categoryId"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
            hasMultipleSelect={false}
            defaultValue={updateData?.categoryId ?? ""}
          />

          <SelectInput
            label="Select Vendor"
            name="vendorId"
            register={register}
            errors={errors}
            className="w-full"
            options={vendors}
            hasMultipleSelect={false}
            defaultValue={updateData?.userId}
          />

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
                defaultValue={updateData?.wholesalePrice}
              />

              <TextInput
                label="WholeSale Available Quantity"
                name="wholesaleQuantity"
                type="number"
                register={register}
                errors={errors}
                className="w-full"
                defaultValue={updateData?.wholesaleQuantity}
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
            defaultValue={updateData?.wholesaleQuantity}
          />

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
            defaultValue={updateData?.description}
          />

          <ToggleInput
            label="Publish your Product"
            name="isActive"
            truthyValue="Active"
            falsyValue="Draft"
            register={register}
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? "Update Product" : "Create Product"}
          loadingButtonTitle={`${
            id ? "Updating" : "Creating"
          } Product please wait...`}
        />
      </form>
    </div>
  );
};

export default ProductForm;
