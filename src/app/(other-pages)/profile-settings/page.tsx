import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Trash2, Key } from "lucide-react";

import { auth } from "@/auth";
import UserUpdateForm from "@/components/forms/UserUpdateForm";
import VendorProfileUpdate from "./_components/VendorProfileUpdate";
import { Button } from "@/components/ui/button";
import { noIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = noIndexMetadata(
  "Account Settings",
  "Manage your BelStore account profile and preferences.",
  "/profile-settings",
);
export default async function EditProfilePage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-2 py-4 sm:p-4">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border p-4 sm:p-6">
          <h1 className="text-lg font-semibold text-foreground sm:text-xl">
            Account Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Update your personal and residence information.
          </p>
        </div>

        {user?.role === "USER" ? (
          <UserUpdateForm user={user} />
        ) : (
          <VendorProfileUpdate user={user} />
        )}
      </div>

      <div className="space-y-4 rounded-xl border border-destructive/30 bg-destructive/5 p-4 sm:p-6">
        <h2 className="text-base font-semibold text-destructive">
          Danger Zone
        </h2>
        <p className="text-sm text-muted-foreground">
          Irreversible actions for your account.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="outline" size="sm">
            <Link href="/reset-password">
              <Key className="size-4" />
              Change Password
            </Link>
          </Button>
          <Button type="button" variant="destructive" size="sm">
            <Trash2 className="size-4" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
