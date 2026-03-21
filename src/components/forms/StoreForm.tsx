"use client";

import React, { useEffect, useState } from "react";
import { User } from "next-auth";
import { FieldValues, useForm } from "react-hook-form";

import { generateSlug } from "@/lib/generateSlug";
import {
  useCreateStore,
  useStoreById,
  useUpdateStore,
} from "@/hooks/useStores";
import { useUsers } from "@/hooks/useUsers";
import { useCategories } from "@/hooks/useCategories";

import { StoreProps } from "@/types/store";

import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SelectInput from "@/components/inputs/SelectInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";

const StoreForm = ({
  user,
  storeId,
}: {
  storeId?: string;
  user: User | undefined;
}) => {
  const role = user?.role;

  const { data: userData } = useUsers();
  const { data: categoriesData } = useCategories();
  // Fetch existing category data if editing
  const {
    data: store,
    isLoading: isFetching,
    error,
  } = useStoreById(storeId ?? "");

  // const id = store?.id ?? "";
  const initialImageUrl = store?.imageUrl ?? "";

  const [mounted, setMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  //mutations
  const { mutate: createStore, isPending: isCreating } = useCreateStore();
  const { mutate: updateStore, isPending: isUpdating } = useUpdateStore();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Trigger mount after first render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Wait for mount to avoid hydration mismatch
  if (!mounted) return null;

  //Get vendor ID
  const vendorId = user?.role === "VENDOR" ? user?.id : "";

  //map on all store categories
  const categories = categoriesData?.map(
    (category: { id: string; title: string }) => ({
      id: category.id,
      title: category.title,
    }),
  );

  //check all users that are vendors
  const vendorData = (userData ?? [])?.filter(
    (vendor: { role: string }) => vendor.role === "VENDOR",
  );

  //map on all vendors Data
  const vendors = vendorData?.map((vendor: { id: string; name: string }) => ({
    id: vendor.id,
    name: vendor.name,
  }));

  console.log("vendors", vendors, vendorData, userData);
  // if (storeId && isFetching) return <p>Loading Store Data...</p>;

  const onSubmit = async (data: FieldValues) => {
    const formData = data as StoreProps;

    const slug = generateSlug(formData.title);
    formData.slug = slug;
    formData.imageUrl = imageUrl;

    if (storeId) {
      // UPDATE MUTATION
      updateStore({ id: storeId, formData });
    } else {
      //CREATE MUTATION
      createStore(formData);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Store Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={store?.title}
          />

          <TextInput
            label="Store Email"
            name="storeEmail"
            type="email"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={store?.storeEmail}
          />

          <TextInput
            label="Store Phone Number"
            name="storePhone"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={store?.storePhone}
          />

          <TextInput
            label="Store Address"
            name="streetAddress"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={store?.streetAddress}
          />

          <TextInput
            label="City"
            name="city"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={store?.city}
          />

          <TextInput
            label="Country"
            name="country"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={store?.country}
          />

          <SelectInput
            label="Select Categories"
            name="categoryIds"
            register={register}
            errors={errors}
            className="w-full"
            options={categories ?? []}
            hasMultipleSelect={true}
            defaultValue={store?.categoryIds ?? []}
          />

          {/* //Set vendorId */}
          {role === "ADMIN" ? (
            <SelectInput
              label="Select Vendor"
              name="vendorId"
              register={register}
              errors={errors}
              className="w-full"
              options={vendors}
              hasMultipleSelect={false}
            />
          ) : (
            <input type="hidden" name="vendorId" value={vendorId} />
          )}

          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="storeLogoUploader"
            label="Store Logo"
          />

          <TextAreaInput
            label="Store Description"
            name="description"
            register={register}
            errors={errors}
            defaultValue={store?.description ?? ""}
          />

          <ToggleInput
            label="Store Status"
            name="isActive"
            truthyValue="Active"
            falsyValue="Draft"
            register={register}
          />
        </div>

        <SubmitButton
          isLoading={isCreating || isUpdating}
          buttonTitle={storeId ? "Update Store" : "Create Store"}
          loadingButtonTitle={`${
            storeId ? "Updating" : "Creating"
          } Store please wait...`}
        />
      </form>
    </div>
  );
};

export default StoreForm;
