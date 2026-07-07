"use client";

import React from "react";
import Image from "next/image";

import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { Button } from "@/components/ui/button";

interface ImageInputProps {
  label: string;
  imageUrl: string;
  className?: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  endpoint: keyof OurFileRouter;
}

function ImageInput({
  label,
  imageUrl = "",
  setImageUrl,
  className = "col-span-full",
  endpoint,
}: ImageInputProps) {
  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between">
        <label
          htmlFor="course-image"
          className="block text-xs font-medium leading-6 text-foreground sm:text-sm"
        >
          {label}
        </label>

        {imageUrl && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setImageUrl("")}
            className="gap-2"
          >
            <Pencil className="size-4" />
            Change Image
          </Button>
        )}
      </div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Item image"
          width={1000}
          height={667}
          unoptimized
          priority
          className="h-64 w-full rounded-lg border border-border object-contain"
        />
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res: { url: string }[]) => {
            setImageUrl(res[0].url);
            toast.success("Image uploaded successfully");
          }}
          onUploadError={() => {
            toast.error("Image upload failed");
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
      )}
    </div>
  );
}

export default ImageInput;
