import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserProfileProps } from "@/types/user";
import { updateProfileAction } from "@/lib/actions/profile-actions";

export function useUpdateProfile() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: UserProfileProps["profile"]) =>
      updateProfileAction(formData),

    // 🎯 STEP 1: Optimistic Update Logic
    onMutate: async () => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["profile"] });
    },

    onError: (err) => {
      console.error(err);
      toast.error("Failed to update profile. Changes rolled back.");
    },

    onSettled: () => {
      // Invalidate to fetch the "source of truth" from the server
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },

    onSuccess: (res) => {
      if (res.success) {
        toast.success("Profile updated successfully!");
        router.push("/dashboard");
      } else {
        // If the server returns a logical error, trigger a rollback via invalidation
        toast.error(res.error || "Profile Update failed");
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      }
    },
  });
}
