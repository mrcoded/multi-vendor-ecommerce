import { NextResponse } from "next/server";

import { FieldValues, UseFormReset } from "react-hook-form";

import toast from "react-hot-toast";

interface PostRequestProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  endpoint: string;
  data: FieldValues;
  resourceName: string;
  successMsg?: string;
  method?: string;
  reset?: UseFormReset<FieldValues>;
  redirectUrl?: (id: string) => void;
}

export const makePostRequest = async ({
  setLoading,
  endpoint,
  data,
  method = "POST",
  resourceName,
  reset,
  redirectUrl,
  successMsg,
}: PostRequestProps) => {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    //Handle cases where the response might be empty (204 No Content)
    let responseData = null;
    if (response.status !== 204) {
      responseData = await response.json();
    }

    setLoading(false);

    //Handle Success (200, 201, etc.)
    if (response.ok) {
      toast.success(successMsg ?? `${resourceName} updated successfully`);
      reset?.();

      // Extract ID safely from top level or a nested 'data' object
      const extractedId = responseData?.id ?? responseData?.data?.id;

      if (redirectUrl) {
        redirectUrl(extractedId);
      }
      return responseData;
    }

    //Handle Specific Error Codes
    if (response.status === 409) {
      toast.error(`${resourceName} already exists!`);
      return responseData;
    }

    if (response.status === 403) {
      toast.error("Unauthorized");
      return responseData;
    }

    //Handle Generic Server Errors (500, etc.)
    const errorMessage =
      responseData?.message ||
      `Error ${response.status}: ${response.statusText}`;
    toast.error(errorMessage);
    return responseData;

    //return the response body
    return responseData;
  } catch (error) {
    console.log(error);
    setLoading(false);
    toast.error("Something went wrong!");

    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};
