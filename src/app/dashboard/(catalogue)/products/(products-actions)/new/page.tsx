import React from "react";

import getData from "@/lib/getData";

import NewProductForm from "@/components/forms/NewProductForm";
import FormHeader from "@/app/dashboard/_components/FormHeader";

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
      <NewProductForm categories={categories} vendors={vendors} />
    </div>
  );
};

export default NewProduct;
