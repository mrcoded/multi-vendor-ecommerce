"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

import { makePostRequest } from "@/lib/apiRequest";
import generateUserCode from "@/lib/generateUserCode";

import { VendorProps } from "@/types/vendors";

import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import ArrayItemsInput from "../inputs/ArrayItemsInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";

function VendorForm({
  updateData,
  user,
}: {
  updateData?: VendorProps;
  user?: VendorProps;
}) {
  const router = useRouter();
  const id = updateData?.id ?? "";

  const initialImageUrl = updateData?.imageUrl ?? "";
  const initialProducts = updateData?.products ?? [];

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<string[]>(initialProducts);

  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectUrl = () => {
    router.push("/login");
  };

  const onSubmit = async (data: FieldValues) => {
    const code = generateUserCode("MVE", data.name);
    data.code = code;
    data.products = products;
    data.imageUrl = imageUrl;
    data.userId = updateData?.id ?? user?.id;

    if (id) {
      //PUT request (update)
      makePostRequest({
        setLoading,
        endpoint: `api/vendors/${id}`,
        data,
        resourceName: "Vendor",
        reset,
        method: "PUT",
        redirectUrl,
      });
    } else {
      //POST request (create)
      makePostRequest({
        setLoading,
        endpoint: "api/vendors",
        data,
        resourceName: "Vendor",
        reset,
        redirectUrl,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Vendor's First Name"
          name="firstName"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={updateData?.name ?? user?.name}
        />

        <TextInput
          label="Vendor's Last Name"
          name="lastName"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={updateData?.name ?? user?.name}
        />

        <TextInput
          label="Vendor's Phone"
          name="phone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={updateData?.phone}
        />

        <TextInput
          label="Vendor's Email Address"
          name="email"
          type="email"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={updateData?.email ?? user?.email}
        />

        <TextInput
          label="Vendor's Physical Address"
          name="physicalAddress"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={updateData?.physicalAddress}
        />

        <TextInput
          label="Vendor's Contact Person"
          name="contactPerson"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={updateData?.contactPerson}
        />

        <TextInput
          label="Vendor's Contact Person Phone"
          name="contactPersonPhone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={updateData?.contactPersonPhone}
        />

        {/* Product Tags */}
        <ArrayItemsInput
          setItems={setProducts}
          items={products}
          itemTitle="Product"
        />

        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="vendorProfileImageUploader"
          label="Vendor Profile Image"
        />

        <TextAreaInput
          label="Vendor's Payment Terms"
          name="terms"
          register={register}
          errors={errors}
          isRequired={false}
          defaultValue={updateData?.terms}
        />

        <TextAreaInput
          label="Notes"
          name="notes"
          register={register}
          errors={errors}
          isRequired={false}
          defaultValue={updateData?.notes}
        />

        <ToggleInput
          label="Vendor Status"
          name="isActive"
          truthyValue="Active"
          falsyValue="Draft"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Vendor" : "Create Vendor"}
        loadingButtonTitle={`${
          id ? "Updating" : "Creating"
        } Vendor please wait...`}
      />
    </form>
  );
}

export default VendorForm;
