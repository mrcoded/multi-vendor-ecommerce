"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

function DeleteBtn({ endpoint, title }: { endpoint?: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  async function handleDelete() {
    setLoading(true);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${baseUrl}/api/${endpoint}`, {
          method: "DELETE",
        });
        console.log(res);
        if (res.ok) {
          router.refresh();
          setLoading(false);
          toast.success(`${title} Deleted Successfully`);
        } else {
          setLoading(false);
        }
      }
    });
  }

  return (
    <>
      {loading ? (
        <button
          disabled
          type="button"
          className="mt-4 text-white bg-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-[0.25rem] px-5 py-2.5 text-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 inline-flex items-center"
        >
          <Loader2 className="inline w-4 h-4 mr-3 text-white animate-spin" />
          Deleting Please wait...
        </button>
      ) : (
        <button
          type="button"
          onClick={handleDelete}
          className="font-medium text-red-600 dark:text-red-500 flex items-center space-x-1"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete {title}</span>
        </button>
      )}
    </>
  );
}

export default DeleteBtn;
