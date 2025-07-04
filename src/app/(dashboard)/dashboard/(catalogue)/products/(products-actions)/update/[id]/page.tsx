import React from "react";
import getData from "@/lib/getData";

import ProductForm from "@/components/forms/ProductForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const UpdateProduct = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const userData = await getData("users");
  const product = await getData(`products/${id}`);
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
      <FormHeader title="Update Product" />
      <ProductForm
        updateData={product}
        categories={categories}
        vendors={vendors}
      />
    </div>
  );
};

export default UpdateProduct;
