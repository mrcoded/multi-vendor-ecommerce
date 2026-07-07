"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";

import { ERROR_MESSAGES } from "@/constants/feedback";
import { toastApiError } from "@/lib/api/api-errors";
import { withClientRequest } from "@/lib/api/apiRequest";

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

    try {
      setLoading(true);
      const loginData = await withClientRequest(() =>
        signIn("credentials", {
          ...data,
          redirect: false,
        }),
      );

      if (loginData?.error) {
        if (loginData?.status === 401) {
          toast.error("Invalid email or password. Try again!");
        } else {
          toast.error(ERROR_MESSAGES.error);
        }
        return;
      }

      if (loginData?.ok) {
        toast.success("Login successful! Redirecting...");
        router.push(decodeURIComponent(callbackUrl));
        router.refresh();
      }
    } catch (error) {
      toastApiError(error);
    } finally {
      setLoading(false);
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
          className="font-medium text-primary transition-colors hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle="Sign in to your account"
        loadingButtonTitle="Authenticating..."
      />

      <p className="mt-4 text-center text-sm text-muted-foreground">
        New to the platform?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary transition-colors hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
