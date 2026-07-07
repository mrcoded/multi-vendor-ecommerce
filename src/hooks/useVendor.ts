import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import {
  createVendorAction,
  deleteVendorAction,
  getAllVendorsAction,
  getVendorByIdAction,
  updateVendorAction,
  updateVendorStatusAction,
} from "@/lib/actions/vendor-actions";
import {
  invokeServerAction,
  runQueryAction,
  type SuccessfulActionResult,
} from "@/lib/api/apiRequest";
import { VendorProps } from "@/types/vendors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useVendors() {
  // #region agent log
  fetch("http://127.0.0.1:7704/ingest/beb5adb7-ea2f-4f2d-9f5d-fd3483b578e0", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "c1eccc",
    },
    body: JSON.stringify({
      sessionId: "c1eccc",
      runId: "post-fix",
      hypothesisId: "B",
      location: "useVendor.ts:useVendors",
      message: "useVendors hook invoked",
      data: { isServer: typeof window === "undefined" },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return useQuery({
    queryKey: ["vendors"],
    queryFn: () => runQueryAction<VendorProps[]>(() => getAllVendorsAction()),
    enabled: typeof window !== "undefined",
    staleTime: 1000 * 60 * 10,
  });
}

export function useCreateVendor() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: VendorProps["vendorProfile"]) =>
      invokeServerAction(() => createVendorAction(formData), "service"),
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["vendors"] });
      router.prefetch("/dashboard/vendors");
    },
    onSuccess: () => {
      toast.success("Vendor created successfully!");
      router.push("/dashboard/vendors");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
}

export function useUpdateVendor(
  id: string,
  options?: { redirectTo?: string; refreshSession?: boolean },
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { update: updateSession } = useSession();

  return useMutation({
    mutationFn: (formData: VendorProps["vendorProfile"]) =>
      invokeServerAction<SuccessfulActionResult>(
        () => updateVendorAction(id, formData),
        "service",
      ),
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["vendors"] });
      router.prefetch(options?.redirectTo ?? "/dashboard/vendors");
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Store successfully updated!");
      if (options?.refreshSession) {
        await updateSession();
      }
      router.push(options?.redirectTo ?? "/dashboard/vendors");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      queryClient.invalidateQueries({ queryKey: ["vendor", id] });
    },
  });
}

export function useDeleteVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      invokeServerAction(() => deleteVendorAction(id), "action"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      toast.success("Vendor deleted successfully");
    },
  });
}

export function useVendor(id?: string) {
  return useQuery({
    queryKey: ["vendor", id],
    queryFn: () =>
      runQueryAction<VendorProps | null>(() => getVendorByIdAction(id!)),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateVendorStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) =>
      invokeServerAction(() => updateVendorStatusAction(id, status), "service"),
    onSuccess: () => {
      toast.success("Vendor updated successfully");
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
}
