"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { FieldValues, useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import { makePostRequest } from "@/lib/apiRequest";

import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import FormHeader from "@/app/dashboard/_components/FormHeader";

const NewCategory = () => {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectUrl = () => {
    router.push("/dashboard/coupons");
  };

  const onSubmit = async (data: FieldValues) => {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;

    makePostRequest({
      setLoading,
      endpoint: "api/categories",
      data,
      resourceName: "Category",
      reset,
      redirectUrl,
    });

    setImageUrl("");
  };

  return (
    <div>
      <FormHeader title="New Category" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Category Title"
            name="title"
            register={register}
            errors={errors}
          />

          <TextAreaInput
            label="Category Description"
            name="description"
            register={register}
            errors={errors}
          />

          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="categoryImageUpload"
            label="Category Image"
          />

          <ToggleInput
            label="Publish your Category"
            name="isActive"
            truthyValue="Active"
            falsyValue="Draft"
            register={register}
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Category"
          loadingButtonTitle="Creating Category please wait..."
        />
      </form>
    </div>
  );
};

export default NewCategory;
