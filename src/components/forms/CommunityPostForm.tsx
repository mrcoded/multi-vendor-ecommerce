"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FieldValues, useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import { CommunityPostFormProps } from "@/types/communityPost";

import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import SelectInput from "@/components/inputs/SelectInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";

import {
  useCommunityPostById,
  useCreateCommunityPost,
  useUpdateCommunityPost,
} from "@/hooks/useCommunity";
import { useCategories } from "@/hooks/useCategories";

const QuillEditor = dynamic(() => import("@/components/QuillEditor"), {
  ssr: false,
});

const CommunityPostForm = ({ postId }: { postId?: string }) => {
  const { data: categories } = useCategories();
  const categoriesData = categories ?? [];

  const { data: community } = useCommunityPostById(postId ?? "");

  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  //mutation
  const { mutate: createCommunityPost, isPending: isCreating } =
    useCreateCommunityPost();
  const { mutate: updateCommunityPost, isPending: isUpdating } =
    useUpdateCommunityPost();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunityPostFormProps>({
    defaultValues: {
      title: community?.title ?? "",
      categoryId: community?.categoryId ?? "",
      isActive: community?.isActive,
      slug: community?.slug ?? "",
      description: community?.description ?? "",
      imageUrl: community?.imageUrl ?? "",
      content: community?.content ?? "",
    },
  });

  useEffect(() => {
    if (community) {
      reset({
        title: community?.title ?? "",
        categoryId: community?.categoryId ?? "",
        isActive: community?.isActive,
        slug: community?.slug ?? "",
        description: community?.description ?? "",
        imageUrl: community?.imageUrl ?? "",
        content: community?.content ?? "",
      });
    }

    setContent(community?.content ?? "");
    setImageUrl(community?.imageUrl ?? "");
  }, [community, reset]);

  const onSubmit = async (data: FieldValues) => {
    const formData = data as CommunityPostFormProps;
    if (!formData || !content) return;

    const slug = generateSlug(formData.title);
    formData.slug = slug;
    formData.imageUrl = imageUrl;
    formData.content = content;

    if (postId) {
      //PUT request (update)
      updateCommunityPost({ id: postId, data: formData });
    } else {
      //POST request (create)
      createCommunityPost(formData);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Community Post Title"
            name="title"
            register={register}
            className="w-full"
            errors={errors}
          />

          <SelectInput
            label="Select Category"
            name="categoryId"
            register={register}
            errors={errors}
            className="w-full"
            options={categoriesData}
          />

          <TextAreaInput
            label="Community Post Description"
            name="description"
            register={register}
            errors={errors}
          />

          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="communityImageUploader"
            label="Community Post Thumbnail"
          />

          {/* Blog Editor */}
          <QuillEditor
            label="Community Post Content"
            value={content}
            onChange={setContent}
          />

          <ToggleInput
            label="Publish your Community Post"
            name="isActive"
            truthyValue="Active"
            falsyValue="Draft"
            register={register}
            defaultCheck={community?.isActive}
          />
        </div>

        <SubmitButton
          isLoading={isCreating || isUpdating}
          buttonTitle={
            postId ? "Update Community Post" : "Create Community Post"
          }
          loadingButtonTitle={`${
            postId ? "Updating" : "Creating"
          } Community Post please wait...`}
        />
      </form>
    </div>
  );
};

export default CommunityPostForm;
