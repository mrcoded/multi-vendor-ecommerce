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
  reset: UseFormReset<FieldValues>;
  redirectUrl: (id: string) => void;
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

    // Consume and parse the response body
    const responseData = await response.json();
    console.log(responseData);

    // Handle server error
    if (!response.ok) {
      setLoading(false);

      const errorMessage =
        response.status === 500
          ? "Internal Server Error"
          : `Error ${response.status}: ${response.statusText}`;
      toast.error(errorMessage);
    }

    if (response.ok) {
      setLoading(false);
      toast.success(successMsg ?? `New ${resourceName} created succesfully`);
      reset();

      redirectUrl(responseData.data?.id ?? responseData?.id);
    }

    if (response.status === 409) {
      setLoading(false);
      toast.error(`${resourceName} already exists!`);
      reset();
    }

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
