"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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
import { Button } from "@/components/ui/button";

const UserUpdateForm = ({ user }: { user: User | undefined }) => {
  const { data: userData } = useUserDetail(user?.id);
  const userProfile = userData?.profile;

  const [imageUrl, setImageUrl] = useState("");
  const { mutate: updateMutation, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfileProps["profile"]>({
    defaultValues: {
      city: "",
      phone: "",
      email: user?.email || "",
      country: "",
      district: "",
      lastName: "",
      userName: "",
      dateOfBirth: new Date(),
      streetAddress: "",
      firstName: user?.name || "",
    },
  });

  useEffect(() => {
    if (!userData) return;

    reset({
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
    });

    if (userProfile?.profileImage) {
      setImageUrl(userProfile.profileImage);
    }
  }, [userData, userProfile, user?.email, user?.name, reset]);

  const onSubmit = (data: FieldValues) => {
    const formData = data as UserProfileProps["profile"];
    updateMutation(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-secondary p-4 sm:flex-row sm:p-5">
        <div className="relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              width={96}
              height={96}
              className="size-24 rounded-full border-4 border-card object-cover"
              alt="Profile"
              unoptimized
            />
          ) : (
            <div className="flex size-24 items-center justify-center rounded-full border-4 border-card bg-primary text-2xl font-bold text-primary-foreground">
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
            className="px-2 ut-button:bg-primary ut-button:ut-readying:bg-primary/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
      <hr className="border-border" />

      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Home className="size-5 text-primary" /> Home Details
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="accent" size="sm" disabled={isPending}>
          {isPending && <Loader2 className="size-4 animate-spin" />}
          Save Profile
        </Button>
      </div>
    </form>
  );
};

export default UserUpdateForm;
