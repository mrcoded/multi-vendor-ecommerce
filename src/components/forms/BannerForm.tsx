"use client";

import React, { useEffect, useState } from "react";

import { FieldValues, useForm } from "react-hook-form";
import { useBanner, useCreateBanner, useUpdateBanner } from "@/hooks/useBanner";

import { BannerFormProps } from "@/types/banner";
import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SubmitButton from "@/components/buttons/SubmitButton";

const BannerForm = ({ bannerId }: { bannerId?: string }) => {
  const { data: bannerData, error } = useBanner(bannerId ?? "");
  console.log(bannerData, error);
  const banner = bannerData?.data;
  const id = banner?.id;
  const [imageUrl, setImageUrl] = useState("");
  //mutation
  const { mutate: createBanner, isPending: isCreating } = useCreateBanner();
  const { mutate: updateBanner, isPending: isUpdating } = useUpdateBanner();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: banner?.title ?? "",
      link: banner?.link ?? "",
      isActive: banner?.isActive,
      imageUrl: banner?.imageUrl ?? "",
    },
  });

  useEffect(() => {
    if (banner) {
      reset(banner);
      setImageUrl(banner.imageUrl);
    }
  }, [banner, reset]);

  //onSubmit function
  const onSubmit = async (data: FieldValues) => {
    const formData = data as BannerFormProps;
    if (!formData.title || !formData.link) return;

    formData.imageUrl = imageUrl;
    console.log(formData);

    if (id) {
      //PUT request (update)
      updateBanner({ id, data: formData });
    } else {
      //POST request (create)
      createBanner(formData);

      // setImageUrl("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 sm:p-6 md:p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Banner Title"
          name="title"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Banner Link"
          name="link"
          type="url"
          register={register}
          errors={errors}
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
          defaultCheck={banner?.isActive}
        />
      </div>

      <SubmitButton
        isLoading={isCreating || isUpdating}
        buttonTitle={id ? "Update Banner" : "Create Banner"}
        loadingButtonTitle={`${
          bannerId ? "Updating" : "Creating"
        } Banner please wait...`}
      />
    </form>
  );
};

export default BannerForm;
