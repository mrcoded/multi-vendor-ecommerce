"use client";

import React from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("session");

  return (
    <div className="max-w-2xl mx-auto min-h-screen mt-8">
      <div
        id="alert-additional-content-1"
        className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        role="alert"
      >
        <div className="flex items-center">
          <Info className="flex-shrink-0 w-4 h-4 me-2" />
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">Verification Email Sent</h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
          Thank you for creating an account with Us, we have sent you a
          Verification email. Kindly check your inbox, click on the link to
          complete your onboarding process. OR click to
          <Link
            href={`/onboarding/${id}`}
            className="mx-4 text-white hover:underline hover:text-lg"
          >
            Verify Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
