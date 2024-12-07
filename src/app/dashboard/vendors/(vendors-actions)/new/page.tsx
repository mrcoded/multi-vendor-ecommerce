"use client";

import React from "react";

import NewVendorForm from "@/components/forms/NewVendorForm";
import FormHeader from "@/app/dashboard/_components/FormHeader";

const NewVendor = () => {
  return (
    <div>
      <FormHeader title="New Vendor" />
      <NewVendorForm />
    </div>
  );
};

export default NewVendor;
