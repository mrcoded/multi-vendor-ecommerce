import React from "react";

import getData from "@/lib/getData";

import ProductForm from "@/components/forms/ProductForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const NewProduct = async () => {
  const userData = await getData("users");
  const categoriesData = await getData("categories");

  const vendorData = userData.filter(
    (vendor: { role: string }) => vendor.role === "VENDOR"
  );

  const vendors = vendorData.map((vendor: { id: string; name: string }) => ({
    id: vendor.id,
    name: vendor.name,
  }));

  const categories = categoriesData.map(
    (category: { id: string; title: string }) => ({
      id: category.id,
      title: category.title,
    })
  );

  return (
    <div>
      <FormHeader title="New Product" />
      <ProductForm categories={categories} vendors={vendors} />
    </div>
  );
};

export default NewProduct;
