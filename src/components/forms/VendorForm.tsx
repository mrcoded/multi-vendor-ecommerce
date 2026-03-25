"use client";

import React, { useEffect, useState } from "react";
import { User } from "next-auth";
import { FieldValues, useForm } from "react-hook-form";

import generateUserCode from "@/lib/generateUserCode";
import { useCreateVendor, useUpdateVendor, useVendor } from "@/hooks/useVendor";

import { VendorProps } from "@/types/vendors";

import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import ArrayItemsInput from "../inputs/ArrayItemsInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";

function VendorForm({
  vendorId,
  user,
}: {
  vendorId?: string;
  user: User | undefined;
}) {
  const { data: vendorData } = useVendor(vendorId);
  const vendor = vendorData?.data;
  const vendorProfile = vendor?.vendorProfile;

  //mutations
  const { mutate: createVendor, isPending: isCreating } = useCreateVendor();
  const { mutate: updateVendor, isPending: isUpdating } = useUpdateVendor(
    vendorId ?? "",
  );

  const [imageUrl, setImageUrl] = useState("");
  const [products, setProducts] = useState<string[]>([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<VendorProps["vendorProfile"]>({
    defaultValues: {
      firstName: (vendorProfile?.firstName ?? user?.name) || "",
      lastName: vendorProfile?.lastName ?? "",
      email: vendor?.email ?? user?.email ?? "",
      phone: vendorProfile?.phone ?? "",
      physicalAddress: vendorProfile?.physicalAddress ?? "",
      notes: vendorProfile?.notes ?? "",
      isActive: vendorProfile?.isActive ?? false,
      terms: vendorProfile?.terms ?? "",
      contactPerson: vendorProfile?.contactPerson ?? "",
      contactPersonPhone: vendorProfile?.contactPersonPhone ?? "",
      userId: vendor?.id ?? user?.id ?? "",
      code: vendorProfile?.code ?? "",
      imageUrl: vendorProfile?.imageUrl ?? "",
      products: vendorProfile?.products ?? [],
    },
  });

  useEffect(() => {
    if (vendorProfile) {
      reset({
        firstName: (vendorProfile?.firstName ?? user?.name) || "",
        lastName: vendorProfile?.lastName ?? "",
        email: vendor?.email ?? user?.email ?? "",
        phone: vendorProfile?.phone ?? "",
        physicalAddress: vendorProfile?.physicalAddress ?? "",
        notes: vendorProfile?.notes ?? "",
        isActive: vendorProfile?.isActive ?? false,
        terms: vendorProfile?.terms ?? "",
        contactPerson: vendorProfile?.contactPerson ?? "",
        contactPersonPhone: vendorProfile?.contactPersonPhone ?? "",
        userId: vendor?.id ?? user?.id ?? "",
        code: vendorProfile?.code ?? "",
        imageUrl: vendorProfile?.imageUrl ?? "",
        products: vendorProfile?.products ?? [],
      });
    }

    setImageUrl(vendorProfile?.imageUrl ?? "");
    setProducts(vendorProfile?.products ?? []);
  }, [vendorProfile, reset]);

  //onSubmit function
  const onSubmit = async (data: FieldValues) => {
    const formData = data as VendorProps["vendorProfile"];

    const code = generateUserCode("MVE", user?.name ?? "");
    formData.code = code;
    formData.products = products;
    formData.imageUrl = imageUrl;
    formData.userId = vendor?.id ?? user?.id ?? "";

    if (vendorId) {
      updateVendor(formData);
    } else {
      createVendor(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Vendor's First Name"
          name="firstName"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Vendor's Last Name"
          name="lastName"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Vendor's Phone"
          name="phone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Vendor's Email Address"
          name="email"
          type="email"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Vendor's Physical Address"
          name="physicalAddress"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Vendor's Contact Person"
          name="contactPerson"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Vendor's Contact Person Phone"
          name="contactPersonPhone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
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
          falsyValue="Inactive"
          register={register}
          defaultCheck={vendorProfile?.isActive}
        />
      </div>

      <SubmitButton
        isLoading={isUpdating || isCreating}
        buttonTitle={vendorId ? "Update Vendor" : "Create Vendor"}
        loadingButtonTitle={`${
          vendorId ? "Updating" : "Creating"
        } Vendor please wait...`}
      />
    </form>
  );
}

export default VendorForm;
