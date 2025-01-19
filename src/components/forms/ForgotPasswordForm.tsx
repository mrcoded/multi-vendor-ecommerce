import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FieldValues, useForm } from "react-hook-form";
import { makePostRequest } from "@/lib/apiRequest";

import TextInput from "../inputs/TextInput";
import SubmitButton from "../buttons/SubmitButton";

function ForgotPasswordForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const redirectUrl = () => {};

  const onSubmit = async (data: FieldValues) => {
    if (!data.email) return;

    makePostRequest({
      setLoading,
      endpoint: "api/users/forgot-password",
      data,
      resourceName: "User",
      successMsg: `Password Reset Link sent to ${data.email}!`,
      method: "PUT",
      reset,
      redirectUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mx-6">
      <TextInput
        label="Enter Your email"
        name="email"
        register={register}
        errors={errors}
        className="sm:col-span-2 mb-3"
        isRequired
      />

      <SubmitButton
        isLoading={loading}
        buttonTitle="Send Password Reset Email"
        loadingButtonTitle="Sending Password Reset Email..."
      />

      <div className="flex">
        <p>Remember your password? </p>{" "}
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

export default ForgotPasswordForm;
