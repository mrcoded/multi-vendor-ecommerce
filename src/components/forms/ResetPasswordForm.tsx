import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { FieldValues, useForm } from "react-hook-form";
import { makePostRequest } from "@/lib/apiRequest";

import TextInput from "../inputs/TextInput";
import SubmitButton from "../buttons/SubmitButton";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const redirectUrl = () => {
    router.push("/login");
  };

  const onSubmit = async (data: FieldValues) => {
    if (!data.password) return;

    data.id = id;

    makePostRequest({
      setLoading,
      endpoint: "api/users/reset-password",
      data,
      resourceName: "User",
      successMsg: `Password Changed Successfully!`,
      method: "PUT",
      reset,
      redirectUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mx-6">
      <TextInput
        label="New Password"
        name="password"
        register={register}
        errors={errors}
        className="sm:col-span-2 mb-3"
        isRequired
      />

      <SubmitButton
        isLoading={loading}
        buttonTitle="Change Password"
        loadingButtonTitle="Changing Password..."
      />

      <div className="flex">
        <p>Remeber your password?</p>{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Login
        </Link>
      </div>
    </form>
  );
}

export default ResetPasswordForm;
