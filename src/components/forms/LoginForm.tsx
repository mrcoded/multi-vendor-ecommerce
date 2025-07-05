import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";

import TextInput from "../inputs/TextInput";
import SubmitButton from "../buttons/SubmitButton";

function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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
      //Redirect
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-6">
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

      <div className="flex gap-4 items-center justify-between">
        <Link
          href="/forgot-password"
          className="shrink-0 font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Forgot password?
        </Link>

        <SubmitButton
          isLoading={loading}
          buttonTitle="Sign in"
          loadingButtonTitle="Signing in..."
        />
      </div>

      <p className="text-sm font-light text-gray-500 dark:text-gray-400 py-4">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-lime-600 hover:underline dark:text-lime-500"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
