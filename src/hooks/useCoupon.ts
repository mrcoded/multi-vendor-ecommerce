import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  createCouponAction,
  deleteCouponAction,
  getAllCouponsAction,
  getCouponByIdAction,
  updateCouponAction,
} from "@/lib/actions/coupon-actions";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Coupon } from "@prisma/client";
import { invokeServerAction, runQueryAction } from "@/lib/api/apiRequest";
import { CouponFormProps } from "@/components/forms/CouponForm";

export function useCreateCoupon() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CouponFormProps) =>
      invokeServerAction(() => createCouponAction(data), "action"),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["coupons-list"] });
      router.prefetch("/dashboard/coupons");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons-list"] });
    },
    onSuccess: () => {
      toast.success("Coupon created successfully!");
      router.push("/dashboard/coupons");
    },
  });
}

export function useUpdateCoupon() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CouponFormProps }) =>
      invokeServerAction(() => updateCouponAction(id, data)),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["coupons-list"] });
      router.prefetch("/dashboard/coupons");
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["coupons-list"] });
      queryClient.invalidateQueries({ queryKey: ["coupon", variables.id] });
    },
    onSuccess: () => {
      toast.success("Coupon successfully updated.");
      router.push("/dashboard/coupons");
    },
  });
}

export function useDeleteCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      invokeServerAction(() => deleteCouponAction(id), "action"),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["coupons-list"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons-list"] });
    },
    onSuccess: () => {
      toast.success("Coupon successfully deleted.");
    },
  });
}

export function useCoupons() {
  return useSuspenseQuery({
    queryKey: ["coupons-list"],
    queryFn: () => runQueryAction<Coupon[]>(() => getAllCouponsAction()),
    staleTime: 1000 * 60 * 10,
  });
}

export function useCouponById(id: string | undefined) {
  return useQuery({
    queryKey: ["coupon", id],
    queryFn: () =>
      runQueryAction<Coupon | null>(() => getCouponByIdAction(id!)),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
