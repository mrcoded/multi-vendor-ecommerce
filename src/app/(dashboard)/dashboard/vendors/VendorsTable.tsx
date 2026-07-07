"use client";

import { columns } from "./columns";

import { useVendors } from "@/hooks/useVendor";

import { DataTable } from "@/components/tables/DataTable/page";
import AsyncContent from "@/components/feedback/AsyncContent";

const VendorsTable = () => {
  const { data: vendors, isLoading, isError, refetch } = useVendors();

  const vendorRows = Array.isArray(vendors) ? vendors : [];

  return (
    <AsyncContent
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      loadingLabel="Loading vendors..."
      variant="inline"
      showHomeLink={false}
    >
      <div className="py-1">
        <DataTable data={vendorRows} columns={columns} filterKeys={["name"]} />
      </div>
    </AsyncContent>
  );
};

export default VendorsTable;
