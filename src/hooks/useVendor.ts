import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  createVendorAction,
  deleteVendorAction,
  fetchAllVendorsAction,
  fetchVendorByIdAction,
  updateVendorAction,
} from "@/lib/actions/vendor-actions";
import { VendorProps } from "@/types/vendors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useVendors() {
  return useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      const res = await fetchAllVendorsAction();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    // Prevent calling the Server Action during the very first SSR render
    enabled: typeof window !== "undefined",
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useCreateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: VendorProps) => {
      const res = await createVendorAction(formData);
      if (!res.success || !res.data?.success) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      // 🎯 SYNC: Tell the "vendors" list it's time to refetch
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      toast.success("Vendor created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });
}

export function useUpdateVendor(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: VendorProps) => {
      const res = await updateVendorAction(id, formData);
      if (!res.success || !res.data?.success) throw new Error(res.error);
      return res.data;
    },
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Store successfully updated!");
        router.push("/dashboard");
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Vendor update failed.");
      console.error(err);
    },
    onSettled: (res, err, variables) => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      queryClient.invalidateQueries({ queryKey: ["vendor", id] });
    },
  });
}

export function useDeleteVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteVendorAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      toast.success("Vendor deleted successfully");
    },
    onError: (err: any) => {
      console.log("Something went wrong", err);
      toast.error(err.message);
    },
  });
}

export function useVendor(id?: string) {
  return useQuery({
    queryKey: ["vendor", id],
    queryFn: async () => {
      const res = await fetchVendorByIdAction(id);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    // 🎯 Crucial: Only run on the client to avoid SSR Action errors
    enabled: typeof window !== "undefined" && !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
