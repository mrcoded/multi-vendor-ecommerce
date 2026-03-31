import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@prisma/client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createOrderAction,
  deleteOrderAction,
  fetchAllOrdersAction,
  fetchAllSalesAction,
  fetchOrderByIdAction,
  fetchVendorSalesAction,
  updateOrderStatusAction,
} from "@/lib/actions/order-actions";

import { CheckoutProps } from "@/types/order";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: {
      checkoutFormData: CheckoutProps;
      orderItems: any[];
    }) => {
      const res = await createOrderAction(formData);
      console.log(res);
      if (!res.data?.success || !res.success)
        throw new Error("Unable to place order!");
      return res;
    },
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["orders"] });
    },

    onError: (err: any) => {
      toast.error(err.message);
      console.log(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Inventory changed
    },
  });
}

export function useUpdateOrderStatus() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
      const res = await updateOrderStatusAction(id, status);
      if (!res.data?.success || !res.success)
        throw new Error("Unable to update order status!");
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message);
      router.refresh();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update status");
    },
    onSettled: (res, err, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteOrderAction(id);
      if (!res.data?.success || !res.success)
        throw new Error("Unable to deleete order!");
      return res;
    },
    onSuccess: (res) => toast.success(res.message),
    onError: (err: any) => toast.error(err.message),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useSales() {
  return useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const res = await fetchAllSalesAction();

      if (!res.success || !res.data?.success) {
        toast.error(res.error || "Failed to load sales");
        throw new Error(res.error);
      }

      return res.data || [];
    },
    staleTime: 1000 * 60,
  });
}

export function useOrder(id: string) {
  if (!id) return null;
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await fetchOrderByIdAction(id);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetchAllOrdersAction();
      if (!res.success || !res.data?.success)
        throw new Error("Failed to load all orders");
      return res.data;
    },
    staleTime: 1000 * 60,
  });
}

export function useVendorSales(vendorId: string | undefined) {
  return useQuery({
    queryKey: ["sales", vendorId],
    queryFn: async () => {
      if (!vendorId) return [];

      const res = await fetchVendorSalesAction(vendorId);

      if (!res.success || !res.data?.success) {
        toast.error(res.error || "Failed to load sales");
        throw new Error(res.error);
      }

      return res.data || [];
    },
    enabled: !!vendorId,
    staleTime: 1000 * 60 * 5,
  });
}
