"use client";

import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";
import { useVendors } from "@/hooks/useVendor";

const VendorsTable = () => {
  const { data: vendorProfile } = useVendors();
  const vendors = vendorProfile?.data ?? [];

  return (
    <div className="py-1">
      <DataTable data={vendors} columns={columns} filterKeys={["name"]} />
    </div>
  );
};

export default VendorsTable;
