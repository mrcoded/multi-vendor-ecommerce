import React from "react";
import getData from "@/lib/getData";

import CustomerForm from "@/components/forms/CustomerForm";
import FormHeader from "@/app/dashboard/_components/shared/FormHeader";

const UpdateCustomer = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const customer = await getData(`users/${id}`);
  const { profile } = customer;

  return (
    <div>
      <FormHeader title="Update Customer" />
      <CustomerForm updateData={customer} profileData={profile} />
    </div>
  );
};

export default UpdateCustomer;
