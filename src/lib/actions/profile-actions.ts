"use server";

import { revalidatePath } from "next/cache";
import { authenticatedAction } from "../auth-wrapper";
import { updateUserProfile } from "@/services/profile-service";

import { UserProfileProps } from "@/types/user";

export async function updateProfileAction(
  formData: UserProfileProps["profile"],
) {
  return authenticatedAction(
    "Update Profile",
    ["ADMIN", "USER"],
    async (user) => {
      try {
        const updatedProfile = await updateUserProfile(user.id, formData);

        // Trigger Next.js cache revalidation for SSR pages
        revalidatePath("/dashboard/profile-settings");

        return {
          success: true,
          data: updatedProfile,
        };
      } catch (error: any) {
        return {
          success: false,
          error: error.message || "Failed to update profile",
        };
      }
    },
  );
}
