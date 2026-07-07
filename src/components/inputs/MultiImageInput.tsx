"use client";

import React from "react";
import Image from "next/image";
import { XCircle } from "lucide-react";

import toast from "react-hot-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

interface MultiImageInputProps {
  label: string;
  imageUrls: Array<string>;
  className?: string;
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  endpoint: keyof OurFileRouter;
}

function MultiImageInput({
  label,
  imageUrls,
  setImageUrls,
  className = "col-span-full",
  endpoint,
}: MultiImageInputProps) {
  const handleImageRemove = (imageIndex: number) => {
    const updatedImages = imageUrls.filter(
      (image, index) => index !== imageIndex,
    );
    setImageUrls(updatedImages);
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="product-image"
          className="mb-2 block text-sm font-medium leading-6 text-foreground"
        >
          {label}
        </label>
      </div>
      {imageUrls.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls.map((imageUrl: string, index: number) => {
            return (
              <div key={index} className="relative mb-6">
                <button
                  onClick={() => handleImageRemove(index)}
                  className="absolute -right-2 -top-4 rounded-full bg-card text-foreground shadow-sm ring-1 ring-border"
                >
                  <XCircle />
                </button>
                <Image
                  src={imageUrl}
                  alt="Item image"
                  width={1000}
                  height={667}
                  unoptimized
                  priority={index === 0}
                  className="w-full h-32 object-contain"
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="">
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res: { url: string }[]) => {
            const urls = res.map((item: { url: string }) => item.url);
            setImageUrls((prev) => [...prev, ...urls]);

            toast.success("Image uploaded successfully");
          }}
          onUploadError={(error: Error) => {
            toast.error("Image Upload failed");
          }}
          appearance={{
            container:
              "border-border bg-muted/30 ut-uploading:opacity-60 rounded-lg",
            label: "text-foreground font-medium",
            allowedContent: "text-muted-foreground text-xs",
            button:
              "bg-primary text-primary-foreground ut-ready:bg-primary ut-uploading:bg-primary/70 ut-readying:bg-primary/50 rounded-md px-4 py-2 text-sm font-medium transition-colors",
          }}
        />
      </div>
    </div>
  );
}

export default MultiImageInput;
