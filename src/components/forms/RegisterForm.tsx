import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FieldValues, useForm } from "react-hook-form";
import { makePostRequest } from "@/lib/apiRequest";

import TextInput from "../inputs/TextInput";
import SubmitButton from "../buttons/SubmitButton";

function RegisterForm({ role }: { role: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const redirectUrl = (id: string) => {
    if (role === "USER") router.push(`/login`);
    if (role === "VENDOR") router.push(`/onboarding/${id}`);
  };

  const onSubmit = async (data: FieldValues) => {
    if (!data.name || !data.email || !data.password) return;

    makePostRequest({
      setLoading,
      endpoint: "api/users",
      data,
      resourceName: "User",
      reset,
      redirectUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-6">
      <TextInput
        label=""
        name="role"
        register={register}
        errors={errors}
        type="hidden"
        defaultValue={role}
        className="sm:col-span-2 mb-3"
      />

      <TextInput
        label="Full Name"
        name="name"
        register={register}
        errors={errors}
        className="sm:col-span-2 mb-3"
      />

      <TextInput
        label="Email Address"
        name="email"
        type="email"
        register={register}
        errors={errors}
        className="sm:col-span-2 mb-3"
      />

      <TextInput
        label="Password"
        name="password"
        type="password"
        register={register}
        errors={errors}
        className="w-full"
      />

      <SubmitButton
        isLoading={loading}
        buttonTitle="Sign up"
        loadingButtonTitle="Signing up..."
      />

      <p className="text-sm font-light text-gray-500 dark:text-gray-400 py-4">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-lime-600 hover:underline dark:text-lime-500"
        >
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
