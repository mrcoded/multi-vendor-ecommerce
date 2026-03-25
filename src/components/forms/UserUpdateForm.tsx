"use client";

import React, { useState } from "react";
import { Loader2, Home } from "lucide-react";

import { User } from "next-auth";
import toast from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";

import { useUserDetail } from "@/hooks/useUsers";
import { useUpdateProfile } from "@/hooks/useUserProfile";

import { UploadButton } from "@/lib/uploadthing";
import generateInitials from "@/lib/generateInitials";

import { UserProfileProps } from "@/types/user";
import TextInput from "@/components/inputs/TextInput";

const UserUpdateForm = ({ user }: { user: User | undefined }) => {
  const { data: userData } = useUserDetail(user?.id);
  const [imageUrl, setImageUrl] = useState("");
  //mutation
  const { mutate: updateMutation, isPending } = useUpdateProfile();

  const userProfile = userData?.profile;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfileProps["profile"]>({
    defaultValues: {
      city: userProfile?.city || "",
      phone: userProfile?.phone || "",
      email: userProfile?.email || user?.email || "",
      country: userProfile?.country || "",
      district: userProfile?.district || "",
      lastName: userProfile?.lastName || "",
      userName: userProfile?.userName || "",
      dateOfBirth: userProfile?.dateOfBirth || new Date(),
      streetAddress: userProfile?.streetAddress || "",
      firstName: userProfile?.firstName || user?.name || "",
    },
  });

  // if (!userData) return <>Loading...</>;

  const onSubmit = (data: FieldValues) => {
    const formData = data as UserProfileProps["profile"];

    updateMutation(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-2 sm:p-6 space-y-8">
      {/* Avatar Upload */}
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
        <div className="relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              className="size-24 rounded-full object-cover border-4 border-white"
              alt="Profile"
            />
          ) : (
            <div className="size-24 rounded-full dark:bg-lime-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white">
              {generateInitials(user?.name || "User")}
            </div>
          )}
        </div>
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="font-medium">Profile Picture</h3>
          <UploadButton
            endpoint="customerProfileImageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].ufsUrl);
              toast.success("Image uploaded!");
            }}
            className="px-2 ut-button:bg-lime-600 ut-button:ut-readying:bg-lime-500/50"
          />
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Username"
          name="userName"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Email"
          name="email"
          register={register}
          errors={errors}
          className="w-full"
          disabled={true}
        />

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
          type="date"
          label="Date Of Birth"
          name="dateOfBirth"
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
      </div>
      <hr className="border-slate-100 dark:border-slate-800" />

      {/* Home Details */}
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Home className="size-5 text-lime-600" /> Home Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          label="District/State"
          name="district"
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
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-lime-600 hover:bg-lime-700 text-white px-8 py-2.5 rounded-lg font-bold flex items-center gap-2"
        >
          {isPending && <Loader2 className="animate-spin size-4" />}
          Save Profile
        </button>
      </div>
    </form>
  );
};

export default UserUpdateForm;
