"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Home } from "lucide-react";

import toast from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";

import { UploadButton } from "@/lib/uploadthing";
import { makePostRequest } from "@/lib/apiRequest";
import generateInitials from "@/lib/generateInitials";

import TextInput from "@/components/inputs/TextInput";

interface UserProfileProps {
  name: string;
  email: string;
  profile: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    phone: string;
    streetAddress: string;
    city: string;
    district: string;
    country: string;
    dateOfBirth: string;
    profileImage: string;
  };
}

const UserUpdateForm = ({ user }: { user: UserProfileProps }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(user?.profile.profileImage || "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: FieldValues) {
    if (user?.profile.userId) {
      console.log(data);
      //PUT request (update)
      makePostRequest({
        setLoading,
        endpoint: `api/users/${user?.profile.userId}`,
        data,
        resourceName: "User Profile",
        method: "PATCH",
        reset,
        redirectUrl: () => router.refresh(),
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
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
              {generateInitials(user?.name)}
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
            className="ut-button:bg-lime-600 ut-button:ut-readying:bg-lime-500/50"
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
          defaultValue={user?.profile.userName}
        />

        <TextInput
          label="Email"
          name="email"
          register={register}
          errors={errors}
          className="w-full"
          disabled={true}
          defaultValue={user?.email || user?.profile.email || ""}
        />

        <TextInput
          label="First Name"
          name="firstName"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={user?.profile.firstName || ""}
        />

        <TextInput
          label="Last Name"
          name="lastName"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={user?.profile.lastName || ""}
        />

        <TextInput
          type="date"
          label="Date Of Birth"
          name="dateOfBirth"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={user?.profile.dateOfBirth || ""}
        />

        <TextInput
          label="Phone Number"
          name="phone"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={user?.profile.phone || ""}
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
          defaultValue={user?.profile.streetAddress || ""}
        />

        <TextInput
          label="City"
          name="city"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={user?.profile.city || ""}
        />

        <TextInput
          label="District/State"
          name="district"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={user?.profile.district || ""}
        />

        <TextInput
          label="Country"
          name="country"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={user?.profile.country || ""}
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-lime-600 hover:bg-lime-700 text-white px-8 py-2.5 rounded-lg font-bold flex items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin size-4" />}
          Save Profile
        </button>
      </div>
    </form>
  );
};

export default UserUpdateForm;
