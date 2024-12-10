import React from "react";
import getData from "@/lib/getData";
import NewVendorForm from "@/components/forms/NewVendorForm";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  //GET user by ID
  const user = await getData(`users/${id}`);

  return (
    <div className="flex flex-col gap-6 p-16">
      <div className="max-w-4xl p-4 mx-auto">
        <h2>Hello {user?.name} Tell Us More About Yourself</h2>
      </div>
      <NewVendorForm user={user} />
    </div>
  );
};

export default page;
