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
  initialImage?: string;
  setInitialImage: React.Dispatch<React.SetStateAction<string>>;
}

function ImageInput({
  label,
  imageUrl = "",
  setImageUrl,
  className = "col-span-full",
  endpoint = "imageUploader",
  initialImage,
  setInitialImage,
}: ImageInputProps) {
  const actualImageUrl = initialImage || imageUrl;

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-50 leading-6"
        >
          {label}
        </label>

        {actualImageUrl && (
          <button
            onClick={() => {
              setImageUrl("");
              setInitialImage("");
            }}
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>
      {actualImageUrl ? (
        <Image
          src={actualImageUrl as string}
          alt="Item image"
          width={1000}
          height={667}
          className="w-full h-64 object-contain"
        />
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res: any) => {
            setImageUrl(res[0].url);
            toast.success("Image uploaded successfully");
          }}
          onUploadError={(error: Error) => {
            toast.error("Image Upload failed");
          }}
        />
      )}
    </div>
  );
}

export default ImageInput;
