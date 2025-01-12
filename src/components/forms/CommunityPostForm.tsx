"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import { makePostRequest } from "@/lib/apiRequest";

import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import SelectInput from "@/components/inputs/SelectInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";

const QuillEditor = dynamic(() => import("@/components/QuillEditor"), {
  ssr: false,
});

interface CommunityPostFormProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  content: string;
}

const CommunityPostForm = ({
  updateData,
  categories,
}: {
  updateData?: CommunityPostFormProps;
  categories: { id: string; title: string }[];
}) => {
  const router = useRouter();
  const id = updateData?.id ?? "";
  const initialImageUrl = updateData?.imageUrl ?? "";
  const initialContent = updateData?.content ?? "";

  const [loading, setLoading] = useState(false);

  const [content, setContent] = useState(initialContent);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectUrl = () => {
    router.push("/dashboard/community");
  };

  const onSubmit = async (data: FieldValues) => {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.content = content;

    if (id) {
      //PUT request (update)
      makePostRequest({
        setLoading,
        endpoint: `api/communityPosts/${id}`,
        data,
        resourceName: "Community Post",
        reset,
        redirectUrl,
      });
    } else {
      //POST request (create)
      makePostRequest({
        setLoading,
        endpoint: "api/communityPosts",
        data,
        resourceName: "Community Posts",
        reset,
        redirectUrl,
      });

      setImageUrl("");
      setContent("");
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
            label="Community Post Title"
            name="title"
            register={register}
            className="w-full"
            errors={errors}
            defaultValue={updateData?.title ?? ""}
          />

          <SelectInput
            label="Select Category"
            name="categoryId"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
            defaultValue={updateData?.categoryId ?? ""}
          />

          <TextAreaInput
            label="Community Post Description"
            name="description"
            register={register}
            errors={errors}
            defaultValue={updateData?.description ?? ""}
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
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? "Update Community Post" : "Create Community Post"}
          loadingButtonTitle={`${
            id ? "Updating" : "Creating"
          } Community Post please wait...`}
        />
      </form>
    </div>
  );
};

export default CommunityPostForm;
