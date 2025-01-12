"use client";

import React from "react";

import VendorForm from "@/components/forms/VendorForm";
import FormHeader from "@/app/dashboard/_components/FormHeader";

const NewVendor = () => {
  return (
    <div>
      <FormHeader title="New Vendor" />
      <VendorForm />
    </div>
  );
};

export default NewVendor;
