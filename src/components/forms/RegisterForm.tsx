"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { CreateUserProps } from "@/types/user";
import { FieldValues, useForm } from "react-hook-form";
import { useCreateUser } from "@/hooks/useUsers";

import TextInput from "@/components/inputs/TextInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import PasswordVisibility from "@/components/PasswordVisibility";

function RegisterForm({ role }: { role: string }) {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  //mutations
  const { mutate: registerUserAction, isPending } = useCreateUser(role);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: role,
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const formData = data as CreateUserProps;
    if (!formData.name || !formData.email || !formData.password) return;

    formData.plan = plan;

    // Call the Action directly
    registerUserAction(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 px-4 sm:px-6 pb-8"
    >
      <TextInput
        label=""
        name="role"
        register={register}
        errors={errors}
        type="hidden"
      />

      <TextInput
        label="Full Name"
        name="name"
        register={register}
        errors={errors}
      />

      <TextInput
        label="Email Address"
        name="email"
        type="email"
        register={register}
        errors={errors}
      />

      <div className="relative flex flex-col space-y-1.5">
        <TextInput
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          register={register}
          errors={errors}
          className="w-full"
        />
        <PasswordVisibility
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>

      <SubmitButton
        isLoading={isPending}
        buttonTitle="Sign up"
        loadingButtonTitle="Signing up..."
      />

      <div className="space-y-3 pt-4 mt-2 border-t border-gray-100 dark:border-gray-700">
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-lime-600 hover:underline"
          >
            Login here
          </Link>
        </p>

        <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg text-center">
          {role === "USER" ? (
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Want to sell on our platform?{" "}
              <Link
                href="/vendor-pricing"
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Become a Vendor
              </Link>
            </p>
          ) : (
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Looking to buy products?{" "}
              <Link
                href="/register"
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Register as a Customer
              </Link>
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
