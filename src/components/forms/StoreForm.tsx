"use client";

import React, { useEffect, useMemo, useState } from "react";
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

import TextInput from "@/components/inputs/TextInput";
import ImageInput from "@/components/inputs/ImageInput";
import ToggleInput from "@/components/inputs/ToggleInput";
import SelectInput from "@/components/inputs/SelectInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import AsyncContent from "@/components/feedback/AsyncContent";

type VendorOption = { id: string; name: string | null };

const StoreForm = ({
  user,
  storeId,
}: {
  storeId?: string;
  user: User | undefined;
}) => {
  const role = user?.role;
  const isEditing = Boolean(storeId);
  const isAdmin = role === "ADMIN";
  const isVendor = role === "VENDOR";

  const {
    data: vendorProfile,
    isLoading: vendorLoading,
    isError: vendorProfileError,
    refetch: refetchVendorProfile,
  } = useVendor(isVendor ? user?.id : undefined);

  const {
    data: vendors,
    isLoading: vendorsLoading,
    isError: vendorsError,
    refetch: refetchVendors,
  } = useVendors();

  const { data: categoriesData } = useCategories();
  const {
    data: storeResult,
    isLoading: storeLoading,
    isError: storeError,
    refetch: refetchStore,
  } = useStoreById(storeId ?? "");

  const store = storeResult as StoreProps | undefined;

  const vendorList = useMemo<VendorOption[]>(
    () =>
      Array.isArray(vendors)
        ? vendors.map((v) => ({
            id: v.id,
            name: v.name ?? "Unnamed vendor",
          }))
        : [],
    [vendors],
  );

  const vendorOptions = useMemo(
    () =>
      vendorList.map((v) => ({
        id: v.id,
        name: v.name ?? "Unnamed vendor",
      })),
    [vendorList],
  );

  const assignedVendorUserId = isEditing
    ? store?.vendorId
    : isVendor
      ? user?.id
      : undefined;

  const { data: assignedVendor } = useVendor(
    isAdmin && isEditing ? assignedVendorUserId : undefined,
  );

  const assignedVendorName = useMemo(() => {
    if (isAdmin && !isEditing) return null;
    return (
      assignedVendor?.name ??
      vendorProfile?.name ??
      vendorList.find((v) => v.id === assignedVendorUserId)?.name ??
      user?.name ??
      "—"
    );
  }, [
    isAdmin,
    isEditing,
    assignedVendor?.name,
    vendorProfile?.name,
    vendorList,
    assignedVendorUserId,
    user?.name,
  ]);

  const [imageUrl, setImageUrl] = useState("");
  const { mutate: createStore, isPending: isCreating } = useCreateStore();
  const { mutate: updateStore, isPending: isUpdating } = useUpdateStore();

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreProps>({
    defaultValues: {
      title: "",
      description: "",
      isActive: true,
      categoryIds: [],
      vendorId: "",
      storeEmail: "",
      storePhone: "",
      streetAddress: "",
      city: "",
      country: "",
    },
  });

  useEffect(() => {
    if (store) {
      reset({
        title: store.title ?? "",
        description: store.description ?? "",
        isActive: store.isActive,
        categoryIds: store.categoryIds ?? [],
        vendorId: store.vendorId ?? "",
        storeEmail: store.storeEmail ?? "",
        storePhone: store.storePhone ?? "",
        streetAddress: store.streetAddress ?? "",
        city: store.city ?? "",
        country: store.country ?? "",
      });
      setImageUrl(store.imageUrl ?? "");
    }
  }, [store, reset]);

  useEffect(() => {
    if (assignedVendorUserId && !(isAdmin && !isEditing)) {
      setValue("vendorId", assignedVendorUserId);
    }
  }, [assignedVendorUserId, isAdmin, isEditing, setValue]);

  const onSubmit = async (data: FieldValues) => {
    const formData = data as StoreProps;
    formData.slug = generateSlug(formData.title);
    formData.imageUrl = imageUrl;

    if (isVendor && !isEditing) {
      formData.vendorId = user?.id ?? formData.vendorId;
    }

    if (storeId) {
      updateStore({ id: storeId, formData });
    } else {
      createStore(formData);
    }
  };

  const isQueryLoading =
    (isEditing && storeLoading) ||
    (isVendor && !isEditing && vendorLoading) ||
    (isAdmin && !isEditing && vendorsLoading);

  const queryIsError =
    (isEditing && storeError) ||
    (isVendor && !isEditing && vendorProfileError) ||
    (isAdmin && !isEditing && vendorsError);

  const handleRetry = () => {
    if (isEditing && storeError) refetchStore();
    if (isVendor && !isEditing && vendorProfileError) refetchVendorProfile();
    if (isAdmin && !isEditing && vendorsError) refetchVendors();
  };

  return (
    <AsyncContent
      isLoading={Boolean(isQueryLoading)}
      isError={Boolean(queryIsError)}
      onRetry={handleRetry}
      loadingLabel="Loading store form..."
      variant="inline"
      showHomeLink={false}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto my-3 w-full max-w-4xl rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6 md:p-8"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
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

          {isAdmin && !isEditing ? (
            <SelectInput
              label="Select Vendor"
              name="vendorId"
              register={register}
              errors={errors}
              className="w-full"
              options={vendorOptions}
              hasMultipleSelect={false}
            />
          ) : (
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium leading-6 text-foreground">
                Vendor
              </label>
              <div className="rounded-md border border-border bg-muted/40 px-3 py-3 text-sm font-medium text-foreground">
                {assignedVendorName}
              </div>
              <input type="hidden" {...register("vendorId")} />
            </div>
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
            defaultCheck={store?.isActive ?? true}
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
    </AsyncContent>
  );
};

export default StoreForm;
