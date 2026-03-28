"use client";

import React, { useState, useMemo } from "react";

import { columns } from "../columns";
import { StoreFilter } from "./StoreFilter";
import { DataTable } from "@/components/tables/DataTable/page";

import { StoreProps } from "@/types/store";
import { ProductFormData } from "@/types/products";

export default function ProductsTable({
  user,
  products,
  stores,
}: {
  user?: { role: string; id: string };
  products: ProductFormData[];
  stores: StoreProps[];
}) {
  const [selectedStoreId, setSelectedStoreId] = useState<string>("all");

  //Filter by vendorId => to get products for this vendor
  const vendorProducts = products.filter(
    (product: { userId?: string }) => product.userId === user?.id,
  );

  //Get products by user role
  const productsData = user?.role === "ADMIN" ? products : vendorProducts;

  //Filter products based on the dropdown selection
  const filteredProducts = useMemo(() => {
    if (selectedStoreId === "all") {
      return productsData;
    }
    return productsData.filter(
      (product) => product.storeId === selectedStoreId,
    );
  }, [selectedStoreId, productsData]);

  //Filter by vendorId => to get stores for this vendor
  const vendorStores = stores.filter(
    (store: { vendorId: string }) => store.vendorId === user?.id,
  );

  //Get stores by user role
  const storesDataByRole = user?.role === "ADMIN" ? stores : vendorStores;

  return (
    <div>
      <div className="flex items-center gap-2 justify-end">
        <h1 className="text-xs lg:text-sm font-medium">Filter by Store:</h1>

        {/* The Dropdown Component */}
        <StoreFilter
          stores={storesDataByRole}
          onStoreChange={(id) => setSelectedStoreId(id)}
        />
      </div>

      {/* The DataTable now only sees the filtered results */}
      <div className="py-1">
        <DataTable data={filteredProducts} columns={columns} />
      </div>
    </div>
  );
}
