import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  registerUserAction,
  fetchAllUsersAction,
  fetchUserByIdAction,
} from "@/lib/actions/user-actions";

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

// --- POST Mutation ---
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => await registerUserAction(formData),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Account successfully created!");
        // Invalidate to trigger a fresh fetch on the Users table
        queryClient.invalidateQueries({ queryKey: ["users"] });
      } else {
        toast.error(res.error || "Failed to create user");
      }
    },
    onError: (err: any) => {
      console.error("Failed to create use:", err);
      toast.error("Something went wrong");
    },
  });
}
