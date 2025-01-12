"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import { makePostRequest } from "@/lib/apiRequest";

import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SelectInput from "@/components/inputs/SelectInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";

interface StoreFormProps {
  id: string;
  title: string;
  categoryIds: string[];
  imageUrl: string;
  description: string;
  isActive: boolean;
}

const StoreForm = ({
  updateData,
  categories,
}: {
  updateData?: StoreFormProps;
  categories: { id: string; title: string }[];
}) => {
  const router = useRouter();
  const id = updateData?.id ?? "";
  const initialImageUrl = updateData?.imageUrl ?? "";

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectUrl = () => {
    router.push("/dashboard/stores");
  };

  const onSubmit = async (data: FieldValues) => {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.logoUrl = imageUrl;

    if (id) {
      //PUT request (update)
      makePostRequest({
        setLoading,
        endpoint: `api/stores/${id}`,
        data,
        resourceName: "Store",
        reset,
        redirectUrl,
      });
    } else {
      //POST request (create)
      makePostRequest({
        setLoading,
        endpoint: "api/stores",
        data,
        resourceName: "Store",
        reset,
        redirectUrl,
      });
    }

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
            label="Store Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={updateData?.title}
          />

          <SelectInput
            label="Select Categories"
            name="categoryIds"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
            hasMultipleSelect={true}
            defaultValue={updateData?.categoryIds ?? []}
          />

          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="storeLogoUploader"
            label="Store Logo"
          />

          <TextAreaInput
            label="Store Description"
            name="description"
            register={register}
            errors={errors}
            defaultValue={updateData?.description}
          />

          <ToggleInput
            label="Store Status"
            name="isActive"
            truthyValue="Active"
            falsyValue="Draft"
            register={register}
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? "Update Store" : "Create Store"}
          loadingButtonTitle={`${
            id ? "Updating" : "Creating"
          } Store please wait...`}
        />
      </form>
    </div>
  );
};

export default StoreForm;
