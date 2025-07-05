// @typescript-eslint/no-explicit-any

"use client";

import React from "react";
import Image from "next/image";

import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { UploadDropzone } from "@/lib/uploadthing";

interface ImageInputProps {
  label: string;
  imageUrl: string;
  className?: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  endpoint: any;
}

function ImageInput({
  label,
  imageUrl = "",
  setImageUrl,
  className = "col-span-full",
  endpoint = "imageUploader",
}: ImageInputProps) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-50 leading-6"
        >
          {label}
        </label>

        {imageUrl && (
          <button
            onClick={() => {
              setImageUrl("");
            }}
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>
      {imageUrl ? (
        <Image
          src={imageUrl as string}
          alt="Item image"
          width={1000}
          height={667}
          className="w-full h-64 object-contain"
        />
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res: { url: string }[]) => {
            setImageUrl(res[0].url);
            toast.success("Image uploaded successfully");
          }}
          onUploadError={(error: Error) => {
            console.log(error);
            toast.error("Image Upload failed");
          }}
        />
      )}
    </div>
  );
}

export default ImageInput;
