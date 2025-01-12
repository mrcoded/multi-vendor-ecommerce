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

interface BannerFormProps {
  id: string;
  title: string;
  link: string;
  imageUrl: string;
  isActive: boolean;
}

const BannerForm = ({ updateData }: { updateData?: BannerFormProps }) => {
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
    router.push("/dashboard/banners");
  };

  const onSubmit = async (data: FieldValues) => {
    if (!data.title || !data.link) return;

    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;

    if (id) {
      //PUT request (update)
      makePostRequest({
        setLoading,
        endpoint: `api/banners/${id}`,
        data,
        resourceName: "Banner",
        reset,
        redirectUrl,
      });
    } else {
      //POST request (create)
      makePostRequest({
        setLoading,
        endpoint: "api/banners",
        data,
        resourceName: "Banner",
        reset,
        redirectUrl,
      });

      setImageUrl("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Banner Title"
          name="title"
          register={register}
          errors={errors}
          defaultValue={updateData?.title}
        />

        <TextInput
          label="Banner Link"
          name="link"
          type="url"
          register={register}
          errors={errors}
          defaultValue={updateData?.link}
        />

        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="bannerImageUploader"
          label="Banner Image"
        />

        <ToggleInput
          label="Publish your Banner"
          name="isActive"
          truthyValue="Active"
          falsyValue="Draft"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Banner" : "Create Banner"}
        loadingButtonTitle={`${
          id ? "Updating" : "Creating"
        } Banner please wait...`}
      />
    </form>
  );
};

export default BannerForm;
