"use client";

import React, { useState } from "react";
import { Row } from "@tanstack/react-table";

import { RowDatas } from "@/types/table";

import { makePostRequest } from "@/lib/apiRequest";

function StatusColumn({
  row,
  accessorKey,
}: {
  row: Row<RowDatas>;
  accessorKey: string;
}) {
  const userId = row.original.id;
  const savedStatus = row.getValue(`${accessorKey}`);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(savedStatus as boolean);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value === "true";
    setStatus(newStatus);
    const data = { status: newStatus, emailVerified: true };
    // console.log(data);

    try {
      setLoading(true);
      makePostRequest({
        setLoading,
        endpoint: `api/vendors/${userId}`,
        data,
        resourceName: "Vendor",
        method: "PUT",
        redirectUrl: () => {},
        reset: () => {},
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // const optionStyle = {
  //   color: status ? "green" : "red",
  // };

  const selectBorderStyle = {
    borderColor: status ? "green" : "red",
  };

  return (
    <div>
      {loading ? (
        <p>Updating...</p>
      ) : (
        <select
          id="status"
          defaultValue={status.toString()}
          className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
          value={status.toString()}
          onChange={handleChange}
          style={selectBorderStyle}
        >
          <option value="true" selected={status === true}>
            APPROVED
          </option>
          <option value="false" selected={status === false}>
            PENDING
          </option>
        </select>
      )}
    </div>
  );
}

export default StatusColumn;
