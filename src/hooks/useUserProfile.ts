import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserProfileProps } from "@/types/user";

import { updateProfileAction } from "@/lib/actions/profile-actions";

import { invokeServerAction } from "@/lib/api/apiRequest";

export function useUpdateProfile() {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: UserProfileProps["profile"]) =>
      invokeServerAction(() => updateProfileAction(formData)),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["profile"] });
    },

    onSuccess: () => {
      toast.success("Profile updated successfully!");

      router.push("/dashboard");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
