import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getAllUsersAction,
  getUserByIdAction,
  registerUserAction,
} from "@/lib/actions/user-actions";

import { invokeServerAction, runQueryAction } from "@/lib/api/apiRequest";

import { CreateUserProps, UserDetail, UserProps } from "@/types/user";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],

    queryFn: () => runQueryAction<UserProps[]>(() => getAllUsersAction()),
  });
}

export function useUserDetail(id?: string) {
  return useQuery({
    queryKey: ["users", id],

    queryFn: () =>
      runQueryAction<UserDetail | null>(() => getUserByIdAction(id!)),

    enabled: !!id,

    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateUser(role: string) {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: CreateUserProps) =>
      invokeServerAction<{
        success: boolean;

        message?: string;

        userId?: string;

        error?: string;
      }>(() => registerUserAction(formData), "action"),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
    },

    onSuccess: (res) => {
      toast.success(res.message || "Account successfully created!");

      if (role === "USER") router.push(`/login`);

      if (role === "VENDOR") router.push(`/verify-email?session=${res.userId}`);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
