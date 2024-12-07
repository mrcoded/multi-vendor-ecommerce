"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

import { makePostRequest } from "@/lib/apiRequest";

import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import ArrayItemsInput from "../inputs/ArrayItemsInput";

type NewVendorProps = {
  user: {
    id: string;
    name: string;
    phone: string;
    email: string;
    physicalAddress: string;
    contactPerson: string;
    contactPersonPhone: string;
  };
};

function NewVendorForm({ user }: NewVendorProps) {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<string[]>([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectUrl = () => {
    // router.push("/dashboard/coupons");
  };

  const onSubmit = async (data: FieldValues) => {
    const code = data.name;
    // const code = generateUserCode("LFF", data.name);
    data.code = code;
    data.products = products;
    data.imageUrl = imageUrl;
    data.userId = user.id;

    makePostRequest({
      setLoading,
      endpoint: "api/vendors",
      data,
      resourceName: "Vendor",
      reset,
      redirectUrl,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Vendor's Full Name"
          name="name"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={user.name}
        />

        <TextInput
          label="Vendor's Phone"
          name="phone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={user?.phone}
        />

        <TextInput
          label="Vendor's Email Address"
          name="email"
          type="email"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={user?.email}
        />

        <TextInput
          label="Vendor's Physical Address"
          name="address"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={user?.physicalAddress}
        />

        <TextInput
          label="Vendor's Contact Person"
          name="contactPerson"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={user?.contactPerson}
        />

        <TextInput
          label="Vendor's Contact Person Phone"
          name="contactPersonPhone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={user?.contactPersonPhone}
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
        />

        <TextAreaInput
          label="Notes"
          name="notes"
          register={register}
          errors={errors}
          isRequired={false}
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
        buttonTitle="Create Vendor"
        loadingButtonTitle="Creating Vendor please wait..."
      />
    </form>
  );
}

export default NewVendorForm;
