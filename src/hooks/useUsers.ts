import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  registerUserAction,
  fetchAllUsersAction,
  fetchUserByIdAction,
} from "@/lib/actions/user-actions";
import { CreateUserProps } from "@/types/user";

// --- GET Hooks ---
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetchAllUsersAction();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });
}

export function useUserDetail(id?: string) {
  if (!id) return null;
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const res = await fetchUserByIdAction(id!);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

//
export function useCreateUser(role: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: CreateUserProps) =>
      await registerUserAction(formData),

    onMutate: async () => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["users"] });
    },

    // Handle Specific Errors (Conflict, Server Error, etc.)
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Account successfully created!");
        // Redirect based on role
        if (role === "USER") router.push(`/login`);
        if (role === "VENDOR")
          router.push(`/verify-email?session=${res.userId}`);
      } else {
        // Handle specific business logic errors (e.g., "Email already exists")
        toast.error(res.error || "Failed to create user");
        // We throw so that 'onError' can handle the cache rollback
        throw new Error(res.error);
      }
    },

    onError: (err: any) => {
      console.error("Something went wrong", err);
      // Check if it's a known error message from your Action
      const errorMessage =
        err.message === "Email already exists"
          ? "This email is already registered."
          : "Something went wrong. Please try again.";

      toast.error(errorMessage);
    },

    // Always refetch after error or success to ensure sync with DB
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
