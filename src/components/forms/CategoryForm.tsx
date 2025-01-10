"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";

import { FieldValues, useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import { makePostRequest } from "@/lib/apiRequest";

import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";

const CategoryForm = ({
  updateData = {
    id: "",
    title: "",
    description: "",
    slug: "",
    imageUrl: "",
  },
}: {
  updateData?: {
    id: string;
    title: string;
    description: string;
    slug: string;
    imageUrl: string;
  };
}) => {
  const router = useRouter();
  const id = updateData?.id ?? "";

  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [initialImage, setInitialImage] = useState(updateData?.imageUrl);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectUrl = () => {
    router.push("/dashboard/categories");
  };

  const onSubmit = async (data: FieldValues) => {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;

    if (id) {
      //PUT request (update)
      makePostRequest({
        setLoading,
        endpoint: `api/categories/${id}`,
        data,
        resourceName: "Category",
        reset,
        redirectUrl,
      });
    } else {
      //POST request (create)
      makePostRequest({
        setLoading,
        endpoint: "api/categories",
        data,
        resourceName: "Category",
        reset,
        redirectUrl,
      });

      setImageUrl("");
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
            label="Category Title"
            name="title"
            register={register}
            errors={errors}
            defaultValue={updateData?.title}
          />

          <TextAreaInput
            label="Category Description"
            name="description"
            register={register}
            errors={errors}
            defaultValue={updateData?.description}
          />

          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="categoryImageUpload"
            label="Category Image"
            initialImage={initialImage}
            setInitialImage={setInitialImage}
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
          buttonTitle={id ? "Update Category" : "Create Category"}
          loadingButtonTitle={`${
            id ? "Updating" : "Creating"
          } Category please wait...`}
        />
      </form>
    </div>
  );
};

export default CategoryForm;
