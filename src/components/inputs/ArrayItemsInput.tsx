"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";

function ArrayItemsInput({
  setItems,
  items,
  itemTitle,
}: {
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  items: string[];
  itemTitle: string;
}) {
  const [item, setItem] = useState("");
  const [showTagForm, setShowTagForm] = useState(false);

  const addItems = () => {
    if (!item) return;

    setItems([...items, item]);
    setItem("");
  };

  const removeItems = (index: number) => {
    // Remove from `items` if it's a newly added item
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className="sm:col-span-2">
      {showTagForm ? (
        <div className="flex items-center">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                />
              </svg>
            </div>
            <input
              value={item}
              type="text"
              id={itemTitle}
              onChange={(e) => setItem(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={`Create a ${itemTitle}...`}
              // required
            />
          </div>

          <button
            onClick={addItems}
            type="button"
            className="shrink-0 inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-lime-700 rounded-lg border border-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
          >
            <Plus className="w-4 h-4 me-2" />
            Add
          </button>
          <button
            type="button"
            onClick={() => setShowTagForm(false)}
            className="ml-3 shrink-0 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowTagForm(true)}
          className="flex items-center space-x-2 text-slate-800 dark:text-slate-300 py-2 px-4"
        >
          <Plus />
          <span>Add {itemTitle}</span>
        </button>
      )}

      <div className="flex flex-wrap gap-4 mt-4">
        {items.length === 0 && <p className="text-slate-400">No {itemTitle}</p>}
        {items?.map((tag, index) => {
          return (
            <div
              key={index}
              onClick={() => removeItems(index)}
              className="bg-slate-200 flex space-x-2 items-center dark:bg-slate-600 px-4 py-2 rounded-lg cursor-pointer dark:text-slate-300 text-slate-800"
            >
              <p>{tag}</p>
              <button type="button">
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ArrayItemsInput;
