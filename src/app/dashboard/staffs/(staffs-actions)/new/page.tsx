import React from "react";

import StaffForm from "@/components/forms/StaffForm";
import FormHeader from "@/app/dashboard/_components/shared/FormHeader";

const NewStaff = () => {
  return (
    <div>
      <FormHeader title="New Staff" />
      <StaffForm />
    </div>
  );
};

export default NewStaff;
