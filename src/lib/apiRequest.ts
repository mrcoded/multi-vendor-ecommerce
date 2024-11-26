import { NextResponse } from "next/server";
import { FieldValues } from "react-hook-form";

import toast from "react-hot-toast";

interface PostRequestProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  endpoint: string;
  data: FieldValues;
  resourceName: string;
  reset: any;
}

export const makePostRequest = async ({
  setLoading,
  endpoint,
  data,
  resourceName,
  reset,
}: PostRequestProps) => {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setLoading(false);
      toast.success(`New ${resourceName} created successfully!`);
      reset();
    }
  } catch (error) {
    setLoading(false);
    toast.error("Something went wrong!");

    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};
