import React from "react";

import PageHeader from "../../_components/PageHeader";
import TableActions from "../../_components/TableActions";

const page = () => {
  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Categories"
        href="/dashboard/categories/new"
        linkAction="Add Category"
      />

      {/* Table Actions */}
      <TableActions />

      <div className="py-8">
        <h2>Table</h2>
      </div>
    </div>
  );
};

export default page;
