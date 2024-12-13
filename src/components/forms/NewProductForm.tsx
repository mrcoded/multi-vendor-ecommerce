"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import { makePostRequest } from "@/lib/apiRequest";
import generateUserCode from "@/lib/generateUserCode";

import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SelectInput from "@/components/inputs/SelectInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import ArrayItemsInput from "@/components/inputs/ArrayItemsInput";

interface NewProductFormProps {
  categories: { id: string; title: string }[];
  vendors: { id: string; name: string }[];
}

const NewProductForm = ({ categories, vendors }: NewProductFormProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [tags, setTags] = useState<string[]>([]);

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
    data.imageUrl = imageUrl;
    data.tags = tags;
    data.productCode = productCode;

    makePostRequest({
      setLoading,
      endpoint: "api/products",
      data,
      resourceName: "Product",
      reset,
      redirectUrl,
    });

    setTags([]);
    setImageUrl("");
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
            className="w-full"
            options={categories}
            hasMultipleSelect={false}
          />

          <SelectInput
            label="Select Vendor"
            name="vendorId"
            register={register}
            errors={errors}
            className="w-full"
            options={vendors}
            hasMultipleSelect={false}
          />

          <ToggleInput
            label="Supports Wholesales"
            name="isWholesale"
            truthyValue="Supported"
            falsyValue="Not Supported"
            register={register}
          />

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

          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="productImageUploader"
            label="Product Image"
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
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Product"
          loadingButtonTitle="Creating Product please wait..."
        />
      </form>
    </div>
  );
};

export default NewProductForm;
