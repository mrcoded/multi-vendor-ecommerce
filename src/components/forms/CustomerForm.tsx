"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import { useUserDetail } from "@/hooks/useUsers";
import { UserProfileProps } from "@/types/user";
import { useUpdateProfile } from "@/hooks/useUserProfile";

function UsersForm({ userId }: { userId: string }) {
  const { data: user } = useUserDetail(userId);
  const profile = user?.profile;

  const [imageUrl, setImageUrl] = useState("");
  //mutation
  const { mutate: updateMutation, isPending } = useUpdateProfile();

  //Convert customer to required ISO date for display
  // const isoDate = profile?.dateOfBirth ?? "";
  // const formattedDate = isoDate.split("T")[0];

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileProps["profile"]>({
    defaultValues: {
      city: profile?.city || "",
      phone: profile?.phone || "",
      email: profile?.email || user?.email || "",
      country: profile?.country || "",
      district: profile?.district || "",
      lastName: profile?.lastName || "",
      userName: profile?.userName || "",
      // dateOfBirth: profile?.dateOfBirth || Date.now(),
      streetAddress: profile?.streetAddress || "",
      firstName: profile?.firstName || user?.name || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        city: profile?.city || "",
        phone: profile?.phone || "",
        email: profile?.email || user?.email || "",
        country: profile?.country || "",
        district: profile?.district || "",
        lastName: profile?.lastName || "",
        userName: profile?.userName || "",
        dateOfBirth: profile?.dateOfBirth || new Date(),
        streetAddress: profile?.streetAddress || "",
        firstName: profile?.firstName || user?.name || "",
      });
    }
    setImageUrl(profile?.profileImage || "");
  }, [profile, user]);

  //onSubmit function
  const onSubmit = async (data: FieldValues) => {
    const formData = data as UserProfileProps["profile"];
    if (!data.name || !data.email) return;

    formData.profileImage = imageUrl;
    formData.userId = user?.id ?? "";

    // const formattedDate = generateISOFormatDate(formData.dateOfBirth);
    // formData.dateOfBirth = formattedDate;

    //PUT request (update)
    updateMutation(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <h2 className="text-xl font-semibold mb-2 dark:text-lime-400">
        Personal Details
      </h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 sm:gap-6 border-b border-gray-700 pb-10">
        <TextInput
          label="First Name"
          name="firstName"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Last Name"
          name="lastName"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Username"
          name="userName"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Email Address"
          name="email"
          type="email"
          disabled={true}
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Phone Number"
          name="phone"
          register={register}
          errors={errors}
          className="w-full"
        />

        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="customerProfileImageUploader"
          label="Customer Image"
        />
      </div>

      <h2 className="text-xl font-semibold mb-2 dark:text-lime-400 pt-10">
        Shipping Details
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Street Address"
          name="streetAddress"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="City"
          name="city"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Country"
          name="country"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="District"
          name="district"
          register={register}
          errors={errors}
          className="w-full"
        />
      </div>

      <SubmitButton
        isLoading={isPending}
        buttonTitle={userId ? "Update User" : "Create User"}
        loadingButtonTitle={`${
          userId ? "Updating" : "Creating"
        } User please wait...`}
      />
    </form>
  );
}

export default UsersForm;
