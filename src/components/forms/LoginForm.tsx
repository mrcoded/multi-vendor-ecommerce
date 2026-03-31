"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";

import TextInput from "@/components/inputs/TextInput";
import SubmitButton from "@/components/buttons/SubmitButton";
import PasswordVisibility from "@/components/PasswordVisibility";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Get the intent from the URL
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    if (!data.email || !data.password) return;

    setLoading(true);
    const loginData = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (loginData?.error) {
      // Handle login error
      console.log("data", loginData?.error);
      if (loginData?.status === 401) {
        toast.error("Invalid email or password, Try again!");
      }

      if (loginData?.status === 500) {
        toast.error("Something went wrong, Try again!");
      }

      setLoading(false);
      return;
    }

    if (loginData?.ok) {
      toast.success("Login successful! Redirecting...");
      // If we have a callbackUrl path
      router.push(decodeURIComponent(callbackUrl));
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 px-4 sm:px-6 pb-8"
    >
      <TextInput
        label="Email Address"
        name="email"
        type="email"
        register={register}
        errors={errors}
      />

      <div className="relative">
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

      <div className="flex items-center justify-between text-sm">
        <Link
          href="/forgot-password"
          className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle="Sign in to your account"
        loadingButtonTitle="Authenticating..."
      />

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
        New to the platform?{" "}
        <Link
          href="/register"
          className="font-semibold text-lime-600 hover:text-lime-500 transition-colors"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
