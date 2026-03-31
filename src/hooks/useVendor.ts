import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  createVendorAction,
  deleteVendorAction,
  fetchAllVendorsAction,
  fetchVendorByIdAction,
  updateVendorAction,
  updateVendorStatusAction,
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
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: VendorProps["vendorProfile"]) => {
      const res = await createVendorAction(formData);
      console.log(res);
      if (!res.success || !res.data?.success)
        throw new Error("Vendor creation failed.");
      return res.data;
    },

    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["vendors"] });
      router.prefetch("/dashboard/vendors");
    },
    onSuccess: () => {
      toast.success("Vendor created successfully!");
      router.push("/dashboard/vendors");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
}

export function useUpdateVendor(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: VendorProps["vendorProfile"]) => {
      const res = await updateVendorAction(id, formData);
      if (!res.success || !res.data?.success)
        throw new Error("Vendor update failed.");
      return res.data;
    },
    onMutate: () => {
      // 🎯 SYNC: Tell the "vendors" list it's time to refetch
      queryClient.cancelQueries({ queryKey: ["vendors"] });
      router.prefetch("/dashboard/vendors");
    },
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Store successfully updated!");
        router.push("/dashboard/vendors");
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
  if (!id) return null;
  return useQuery({
    queryKey: ["vendor", id],
    queryFn: async () => {
      const res = await fetchVendorByIdAction(id);
      if (!res.success || !res.data?.success)
        throw new Error("Vendor fetch failed!");
      return res.data.data;
    },
    // enabled: typeof window !== "undefined" && !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateVendorStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: boolean }) => {
      const result = await updateVendorStatusAction(id, status);
      if (!result.success || !result?.data?.success)
        throw new Error("Vendor status update failed");
      return result.data;
    },
    onSuccess: (data, variables) => {
      toast.success(`Vendor updated successfully`);
      // 🎯 Sync the client-side cache with the server-side revalidation
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
