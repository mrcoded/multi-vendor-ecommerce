"use client";

import React, { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { ConfirmModal } from "../modals/ConfirmationModal";

interface DeleteBtnProps {
  title: string;
  onDelete: () => void;
  onCancel?: () => void;
  isDeleting: boolean;
}

function DeleteBtn({ title, onDelete, onCancel, isDeleting }: DeleteBtnProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onDelete();
    // The modal usually stays open until the mutation completes/fails
    // but you can close it immediately if the button shows a loader anyway.
    setOpen(false);
    onCancel?.();
  };

  return (
    <>
      <ConfirmModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          onCancel?.();
        }}
        onConfirm={handleConfirm}
        loading={isDeleting}
        title={`Delete ${title}?`}
        description={`Are you sure you want to delete this ${title.toLowerCase()}? This action cannot be undone.`}
      />

      {isDeleting ? (
        <button
          disabled
          className="flex items-center space-x-1 text-gray-400 cursor-not-allowed"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Deleting...</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="font-medium text-red-600 dark:text-red-500 flex items-center space-x-1 w-full text-left"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete {title}</span>
        </button>
      )}
    </>
  );
}

export default DeleteBtn;
