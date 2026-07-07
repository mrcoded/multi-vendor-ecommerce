"use client";

import React, { useEffect, useState } from "react";

import { FieldValues, useForm } from "react-hook-form";

import { useUserDetail } from "@/hooks/useUsers";
import { useUpdateProfile } from "@/hooks/useUserProfile";
import generateISOFormatDate from "@/lib/generateISOFormatDate";

import { UserProfileProps } from "@/types/user";
import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import SubmitButton from "@/components/buttons/SubmitButton";

function UsersForm({ userId }: { userId: string }) {
  const userData = useUserDetail(userId);
  const user = userData?.data;
  const profile = user?.profile;

  const [imageUrl, setImageUrl] = useState("");
  //mutation
  const { mutate: updateMutation, isPending } = useUpdateProfile();

  //Convert customer to required ISO date for display
  const isoDate = profile?.dateOfBirth?.toISOString() ?? "";
  const formattedDate = isoDate.split("T")[0];

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
      dateOfBirth: new Date(formattedDate) || new Date(),
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
        dateOfBirth: new Date(formattedDate) || new Date(),
        streetAddress: profile?.streetAddress || "",
        firstName: profile?.firstName || user?.name || "",
      });
    }
    setImageUrl(profile?.profileImage || "");
  }, [profile, user]);

  //onSubmit function
  const onSubmit = async (data: FieldValues) => {
    if (!data.name || !data.email) return;
    const formData = data as UserProfileProps["profile"];

    formData.profileImage = imageUrl;
    formData.userId = user?.id ?? "";

    const formattedDate = generateISOFormatDate(new Date(formData.dateOfBirth));
    formData.dateOfBirth = new Date(formData.dateOfBirth);

    //PUT request (update)
    updateMutation(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto my-3 w-full max-w-3xl rounded-lg border border-border bg-card p-4 shadow sm:p-6 md:p-8"
    >
      <h2 className="mb-2 text-xl font-semibold text-foreground">
        Personal Details
      </h2>

      <div className="grid grid-cols-1 gap-4 border-b border-border pb-10 sm:grid-cols-2 sm:gap-6">
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

      <h2 className="mb-2 pt-10 text-xl font-semibold text-foreground">
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
