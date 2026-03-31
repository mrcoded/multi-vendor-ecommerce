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
import { CouponFormProps } from "@/components/forms/CouponForm";

export function useCreateCoupon() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CouponFormProps) => {
      const res = await createCouponAction(data);
      if (!res.success || !res.data?.success)
        throw new Error("Failed to create Coupon.");
      return res;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["coupons-list"] });
      router.prefetch("/dashboard/coupons");
    },
    onError: (err, newCoupon, context) => {
      console.log(err);
      toast.error("Failed to create coupon.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons-list"] });
    },
    onSuccess: () => {
      toast.success("Coupon successfully deleted.");
      router.push("/dashboard/coupons");
    },
  });
}

// 🎯 UPDATE HOOK (Optimistic)
export function useUpdateCoupon() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CouponFormProps }) => {
      const res = await updateCouponAction(id, data);
      if (!res.success || !res.data?.success)
        throw new Error("Failed to update Coupon.");
      return res.data;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["coupons-list"] });
      router.prefetch("/dashboard/coupons");
    },
    onError: (err, variables, context) => {
      console.log(err);
      toast.error("Unable to Update Coupon");
    },
    onSettled: (data, error, variables) => {
      // 5. Always refetch to stay in sync with DB
      queryClient.invalidateQueries({ queryKey: ["coupons-list"] });
      queryClient.invalidateQueries({ queryKey: ["coupon", variables.id] });
      toast.success("Coupon updated!");
    },
    onSuccess: () => {
      toast.success("Coupon successfully updated.");
      router.push("/dashboard/coupons");
    },
  });
}

// 🎯 DELETE HOOK (Optimistic)
export function useDeleteCoupon() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteCouponAction(id);
      if (!res.success || !res.data?.success)
        throw new Error("Unable to delete Coupon.");
      return res;
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["coupons-list"] });
    },

    onError: (err) => {
      console.log(err);
      toast.error("Unable to Delete coupon!");
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
    queryFn: async () => {
      const response = await getAllCouponsAction();
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook: Fetch a single coupon for the Edit Form.
 * 🎯 PRAGMATIC: 'enabled' check prevents running on a "Create" page where id is null.
 */
export function useCouponById(id: string | undefined) {
  return useQuery({
    queryKey: ["coupon", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await getCouponByIdAction(id);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
