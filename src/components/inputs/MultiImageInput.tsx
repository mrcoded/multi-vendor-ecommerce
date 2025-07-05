"use client";

import React from "react";
import Image from "next/image";
import { XCircle } from "lucide-react";

import toast from "react-hot-toast";
import { UploadDropzone } from "@/lib/uploadthing";

interface MultiImageInputProps {
  label: string;
  imageUrls: Array<string>;
  className?: string;
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  endpoint: any;
}

function MultiImageInput({
  label,
  imageUrls,
  setImageUrls,
  className = "col-span-full",
  endpoint = "imageUploader",
}: MultiImageInputProps) {
  const handleImageRemove = (imageIndex: number) => {
    const updatedImages = imageUrls.filter(
      (image, index) => index !== imageIndex
    );
    setImageUrls(updatedImages);
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-50 leading-6"
        >
          {label}
        </label>
      </div>
      {imageUrls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls.map((imageUrl: string, index: number) => {
            return (
              <div key={index} className="relative mb-6">
                <button
                  onClick={() => handleImageRemove(index)}
                  className="absolute -top-4 -right-2 bg-slate-100 text-slate-900 rounded-full"
                >
                  <XCircle />
                </button>
                <Image
                  src={imageUrl}
                  alt="Item image"
                  width={1000}
                  height={667}
                  className="w-full h-32 object-contain"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res: { url: string }[]) => {
            const urls = res.map((item: { url: string }) => item.url);
            setImageUrls(urls);
            toast.success("Image uploaded successfully");
          }}
          onUploadError={(error: Error) => {
            console.log("Upload failed:", error);
            toast.error("Image Upload failed");
          }}
        />
      )}
    </div>
  );
}

export default MultiImageInput;
