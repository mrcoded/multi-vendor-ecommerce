"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

import { makePostRequest } from "@/lib/apiRequest";
import generateUserCode from "@/lib/generateUserCode";

import TextInput from "@/components/inputs/TextInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

interface StaffFormProps {
  id: string;
  name: string;
  nin: string;
  dob: string;
  email: string;
  phone: number;
  notes: string;
  address: string;
}

const StaffForm = ({ updateData }: { updateData?: StaffFormProps }) => {
  const router = useRouter();
  const id = updateData?.id ?? "";

  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectUrl = () => {
    router.push("/dashboard/staffs");
  };

  const onSubmit = async (data: FieldValues) => {
    const code = generateUserCode("MSM", data.name);
    data.code = code;

    makePostRequest({
      setLoading,
      endpoint: "api/staffs",
      data,
      resourceName: "Staff",
      reset,
      redirectUrl,
    });
  };

  return (
    <div>
      <FormHeader title="New Staff" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Staff's Full Name"
            name="name"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={updateData?.name}
          />

          <TextInput
            label="NIN (Id Number)"
            name="nin"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={updateData?.nin}
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Date of Birth"
            name="dob"
            type="date"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={updateData?.dob}
          />

          <TextInput
            label="Staff's Email Address"
            name="email"
            type="email"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={updateData?.email}
          />

          <TextInput
            label="Staff's Phone"
            name="phone"
            type="tel"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={updateData?.phone}
          />

          <TextInput
            label="Staff's Physical Address"
            name="address"
            register={register}
            errors={errors}
            className="w-full"
            defaultValue={updateData?.address}
          />

          <TextAreaInput
            label="Notes"
            name="notes"
            register={register}
            errors={errors}
            isRequired={false}
            defaultValue={updateData?.notes}
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Staff"
          loadingButtonTitle="Creating Staff please wait..."
        />
      </form>
    </div>
  );
};

export default StaffForm;
