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
import { useCategories } from "@/hooks/useCategories";
import { useVendor, useVendors } from "@/hooks/useVendor";

import { StoreProps } from "@/types/store";

import Loading from "@/app/loading";
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

  const vendor = useVendor(user?.id);
  const { data: vendors } = useVendors();
  const { data: categoriesData } = useCategories();
  const { data: storeData } = useStoreById(storeId ?? "");
  //Get datas
  const vendorId = vendor?.data?.id;
  const alVendors = vendors?.data ?? [];
  const store = storeData?.data;

  const [imageUrl, setImageUrl] = useState("");
  //mutations
  const { mutate: createStore, isPending: isCreating } = useCreateStore();
  const { mutate: updateStore, isPending: isUpdating } = useUpdateStore();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreProps>({
    defaultValues: {
      title: store?.title ?? "",
      description: store?.description ?? "",
      isActive: store?.isActive,
      categoryIds: store?.categoryIds ?? [],
      vendorId: store?.vendorId ?? "",
      storeEmail: store?.storeEmail ?? "",
      storePhone: store?.storePhone ?? "",
      streetAddress: store?.streetAddress ?? "",
      city: store?.city ?? "",
      country: store?.country ?? "",
    },
  });

  // Sync the state when the product data finally arrives
  useEffect(() => {
    if (store) {
      // Reset React Hook Form fields
      reset({
        title: store?.title ?? "",
        description: store?.description ?? "",
        isActive: store?.isActive,
        categoryIds: store?.categoryIds ?? [],
        vendorId: store?.vendorId ?? "",
        storeEmail: store?.storeEmail ?? "",
        storePhone: store?.storePhone ?? "",
        streetAddress: store?.streetAddress ?? "",
        city: store?.city ?? "",
        country: store?.country ?? "",
      });

      // Sync Local UI States
      setImageUrl(store.imageUrl ?? "");
    }
  }, [store, reset]);

  // Trigger mount after first render
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // Wait for mount to avoid hydration mismatch
  // if (!mounted) return <Loading />;

  //map on all store categories
  // const categories = categoriesData?.map(
  //   (category: { id: string; title: string }) => ({
  //     id: category.id,
  //     title: category.title,
  //   }),
  // );

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
          />

          <TextInput
            label="Store Email"
            name="storeEmail"
            type="email"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Store Phone Number"
            name="storePhone"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Store Address"
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

          <SelectInput
            label="Select Categories"
            name="categoryIds"
            register={register}
            errors={errors}
            className="w-full"
            options={categoriesData ?? []}
            hasMultipleSelect={true}
          />

          {/* //Set vendorId */}
          {role === "ADMIN" ? (
            <SelectInput
              label="Select Vendor"
              name="vendorId"
              register={register}
              errors={errors}
              className="w-full"
              options={alVendors}
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
          />

          <ToggleInput
            label="Store Status"
            name="isActive"
            truthyValue="Active"
            falsyValue="Draft"
            register={register}
            defaultCheck={store?.isActive}
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
