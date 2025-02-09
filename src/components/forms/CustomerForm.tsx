"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

import { makePostRequest } from "@/lib/apiRequest";
import generateISOFormatDate from "@/lib/generateISOFormatDate";

import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import SubmitButton from "@/components/buttons/SubmitButton";

type CustomerProps = {
  id: string;
  name: string;
  phone: string;
  email: string;
  profileImage?: string;
  streetAddress: string;
  city: string;
  district: string;
  firstName: string;
  lastName: string;
  userName: string;
  dateOfBirth: string;
  country: string;
};

function CustomerForm({
  updateData,
  profileData,
}: {
  updateData?: CustomerProps;
  profileData?: CustomerProps;
}) {
  const router = useRouter();
  const id = profileData?.id ?? "";

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  //Convert updateData to required ISO date for display
  const isoDate = updateData?.dateOfBirth ?? "";
  const formattedDate = isoDate.split("T")[0];

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectUrl = () => {
    router.push("/dashboard/customers");
  };

  const onSubmit = async (data: FieldValues) => {
    if (!data.name || !data.email) return;

    data.profileImage = imageUrl;
    data.userId = updateData?.id ?? "";

    const formattedDate = generateISOFormatDate(data.dateOfBirth);
    data.dateOfBirth = formattedDate;

    //PUT request (update)
    makePostRequest({
      setLoading,
      endpoint: `api/customers/${id}`,
      data,
      method: "PUT",
      resourceName: "Customer Profile",
      reset,
      redirectUrl,
      successMsg: "Customer Profile Updated Successfully!",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <h2 className="text-xl font-semibold mb-2 dark:text-lime-400">
        Personal Details
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 border-b border-gray-700 pb-10">
        <TextInput
          label="Full Name"
          name="name"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={updateData?.name}
        />

        <TextInput
          label="Username"
          name="userName"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={profileData?.userName}
        />

        <TextInput
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={formattedDate}
        />

        <TextInput
          label="Email Address"
          name="email"
          type="email"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={updateData?.email}
        />

        <TextInput
          label="Phone Number"
          name="phone"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={profileData?.phone}
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
          defaultValue={profileData?.streetAddress}
        />

        <TextInput
          label="City"
          name="city"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={profileData?.city}
        />

        <TextInput
          label="Country"
          name="country"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={profileData?.country}
        />

        <TextInput
          label="District"
          name="district"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={profileData?.district}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Customer" : "Create Customer"}
        loadingButtonTitle={`${
          id ? "Updating" : "Creating"
        } Customer please wait...`}
      />
    </form>
  );
}

export default CustomerForm;
