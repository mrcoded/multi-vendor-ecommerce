import React from "react";

import CustomerForm from "@/components/forms/CustomerForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const UpdateCustomer = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: userId } = await params;

  return (
    <div>
      <FormHeader title="Update All Users" />
      <CustomerForm userId={userId} />
    </div>
  );
};

export default UpdateCustomer;
