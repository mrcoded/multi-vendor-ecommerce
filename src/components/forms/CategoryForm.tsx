"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { FieldValues, useForm } from "react-hook-form";

import {
  useCategoryById,
  useCreateCategory,
  useUpdateCategory,
} from "@/hooks/useCategories";
import { generateSlug } from "@/lib/generateSlug";

import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import { CategoryFormProps } from "@/types/category";

const CategoryForm = ({
  categoryId,
}: {
  categoryId?: string;
  // category?: CategoryFormProps;
}) => {
  // Fetch existing category data if editing
  const {
    data: category,
    isLoading: isFetching,
    error,
  } = useCategoryById(categoryId ?? "");
  // const id = category?.id ?? "";
  const initialImageUrl = category?.imageUrl ?? "";

  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(category, error);
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

  if (categoryId && isFetching) return <p>Loading Category Data...</p>;

  const onSubmit = async (data: FieldValues) => {
    const formData = data as CategoryFormProps;

    const slug = generateSlug(formData.title);
    formData.slug = slug;
    formData.imageUrl = imageUrl;

    if (categoryId) {
      // UPDATE MUTATION
      updateCategory({ id: categoryId, formData });
    } else {
      //CREATE MUTATION
      createCategory(formData, {
        onSuccess: () => {
          setImageUrl("");
        },
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Category Title"
            name="title"
            register={register}
            errors={errors}
            defaultValue={category?.title}
          />

          <TextAreaInput
            label="Category Description"
            name="description"
            register={register}
            errors={errors}
            defaultValue={category?.description}
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
          isLoading={isCreating || isUpdating}
          buttonTitle={categoryId ? "Update Category" : "Create Category"}
          loadingButtonTitle={`${
            categoryId ? "Updating" : "Creating"
          } Category please wait...`}
        />
      </form>
    </div>
  );
};

export default CategoryForm;
