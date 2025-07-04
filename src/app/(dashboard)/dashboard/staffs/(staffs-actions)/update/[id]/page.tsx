import React from "react";
import getData from "@/lib/getData";

import StaffForm from "@/components/forms/StaffForm";
import FormHeader from "@/app/(dashboard)/dashboard/_components/shared/FormHeader";

const UpdateStaff = async ({ params: { id } }: { params: { id: string } }) => {
  const staff = await getData(`staffs/${id}`);

  return (
    <div>
      <FormHeader title="Update Staff" />
      <StaffForm updateData={staff} />
    </div>
  );
};

export default UpdateStaff;
