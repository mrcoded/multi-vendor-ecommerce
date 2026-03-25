"use client";

import React, { useEffect, useState } from "react";

import { FieldValues, useForm } from "react-hook-form";

import {
  useCategoryById,
  useCreateCategory,
  useUpdateCategory,
} from "@/hooks/useCategories";
import { generateSlug } from "@/lib/generateSlug";

import { CategoryFormProps } from "@/types/category";
import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";

const CategoryForm = ({ categoryId }: { categoryId?: string }) => {
  // Fetch existing category data if editing
  const { data: category } = useCategoryById(categoryId ?? "");

  const [imageUrl, setImageUrl] = useState("");
  //mutations
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: category?.title ?? "",
      description: category?.description ?? "",
      isActive: category?.isActive ?? false,
    },
  });

  useEffect(() => {
    if (category) {
      reset({
        title: category.title,
        description: category.description,
        isActive: category.isActive,
      });

      setImageUrl(category.imageUrl);
    }
  }, [category, reset]);

  //onSubmit function
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
            defaultCheck={category?.isActive}
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
