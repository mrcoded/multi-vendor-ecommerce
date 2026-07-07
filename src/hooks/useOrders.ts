import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@prisma/client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrderAction,
  deleteOrderAction,
  getAllOrdersAction,
  getOrderByIdAction,
  getSalesAction,
  updateOrderStatusAction,
} from "@/lib/actions/order-actions";
import {
  invokeServerAction,
  runQueryAction,
  type ServiceResult,
  type SuccessfulActionResult,
} from "@/lib/api/apiRequest";

import {
  CheckoutProps,
  OrderCardProps,
  OrderItemProps,
  OrderWithItems,
} from "@/types/order";
import { SalesProps } from "@/types/sales";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: {
      checkoutFormData: CheckoutProps;
      orderItems: OrderItemProps[];
    }) =>
      invokeServerAction<ServiceResult<{ id: string }>>(
        () => createOrderAction(formData),
        "service",
      ),
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["orders"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      invokeServerAction<SuccessfulActionResult>(
        () => updateOrderStatusAction(id, status),
        "action",
      ),
    onSuccess: (res) => {
      toast.success(res.message || "Order status updated!");
      router.refresh();
    },
    onSettled: (_res, _err, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      invokeServerAction<SuccessfulActionResult>(
        () => deleteOrderAction(id),
        "action",
      ),
    onSuccess: (res) => toast.success(res.message || "Order deleted."),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useSales() {
  return useQuery({
    queryKey: ["sales"],
    queryFn: () => runQueryAction<SalesProps[]>(() => getSalesAction()),
    staleTime: 1000 * 60,
  });
}

export function useOrder(id?: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () =>
      runQueryAction<OrderWithItems | null>(() => getOrderByIdAction(id!)),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => runQueryAction<OrderCardProps[]>(() => getAllOrdersAction()),
    staleTime: 1000 * 60,
  });
}

export function useVendorSales(vendorId: string | undefined) {
  return useQuery({
    queryKey: ["sales", vendorId],
    queryFn: async () => {
      if (!vendorId) return [];
      return runQueryAction<SalesProps[]>(() => getSalesAction(vendorId));
    },
    enabled: !!vendorId,
    staleTime: 1000 * 60 * 5,
  });
}
