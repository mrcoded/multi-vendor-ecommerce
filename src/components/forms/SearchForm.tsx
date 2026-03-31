"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { DoorOpen, Loader2, Search } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";

function SearchForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const handleSearch = (data: FieldValues) => {
    const { searchTerm } = data;
    reset();
    router.push(`/search?search=${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className="flex items-center max-w-lg mx-auto"
    >
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <DoorOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          {...register("searchTerm")}
          type="text"
          id="search"
          disabled={isSubmitting}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
          placeholder="Search Products, Categories, Markets..."
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-lime-700 rounded-lg border border-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 me-2 animate-spin" />
        ) : (
          <Search className="w-4 h-4 me-2" />
        )}
        {isSubmitting ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchForm;
