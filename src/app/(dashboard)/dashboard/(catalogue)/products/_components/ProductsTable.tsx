"use client";

import React, { useState, useMemo } from "react";
import { Filter } from "lucide-react";

import { columns } from "../columns";
import { StoreFilter } from "./StoreFilter";
import { DataTable } from "@/components/tables/DataTable/page";

import { StoreProps } from "@/types/store";
import { ProductFormData } from "@/types/products";
import { Card, CardContent } from "@/components/ui/card";

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

  const vendorProducts = products.filter(
    (product: { userId?: string }) => product.userId === user?.id,
  );

  const productsData = user?.role === "ADMIN" ? products : vendorProducts;

  const filteredProducts = useMemo(() => {
    if (selectedStoreId === "all") {
      return productsData;
    }
    return productsData.filter(
      (product) => product.storeId === selectedStoreId,
    );
  }, [selectedStoreId, productsData]);

  const vendorStores = stores.filter(
    (store: { vendorId: string }) => store.vendorId === user?.id,
  );

  const storesDataByRole = user?.role === "ADMIN" ? stores : vendorStores;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="size-4 text-primary" />
            <span className="font-medium text-foreground">Filter by store</span>
          </div>
          <StoreFilter
            stores={storesDataByRole}
            onStoreChange={(id) => setSelectedStoreId(id)}
          />
        </CardContent>
      </Card>

      <DataTable data={filteredProducts} columns={columns} />
    </div>
  );
}
