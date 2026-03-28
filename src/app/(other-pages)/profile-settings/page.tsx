import React, { Suspense } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { Trash2, Key } from "lucide-react";

import Loading from "@/app/loading";
import { authOptions } from "@/lib/authOptions";

import UserUpdateForm from "@/components/forms/UserUpdateForm";
import VendorProfileUpdate from "./_components/VendorProfileUpdate";

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="max-w-4xl mx-auto px-2 sm:p-4 space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-xl font-bold">Account Settings</h1>
          <p className="text-sm text-slate-500">
            Update your personal and residence information.
          </p>
        </div>

        <Suspense fallback={<Loading />}>
          <div className="min-h-screen">
            {user?.role === "USER" ? (
              <UserUpdateForm user={user} />
            ) : (
              <VendorProfileUpdate user={user} />
            )}
          </div>
        </Suspense>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900/30 p-6 space-y-4">
        <h2 className="text-lg font-bold text-red-700 dark:text-red-500">
          Danger Zone
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/reset-password"
            className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            <Key className="size-4" /> Change Password
          </Link>
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            <Trash2 className="size-4" /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
