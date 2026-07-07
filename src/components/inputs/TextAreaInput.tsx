"use client";

import React from "react";
import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  Path,
} from "react-hook-form";
import { cn } from "@/lib/utils";

interface TextAreaInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  isRequired?: boolean;
  disabled?: boolean;
  className?: string;
  rows?: number;
}

function TextAreaInput<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  isRequired = true,
  className = "sm:col-span-2",
}: TextAreaInputProps<T>) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium leading-6 text-foreground"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          {...register(name, { required: isRequired })}
          name={name}
          id={name}
          rows={3}
          className={cn(
            "block w-full rounded-md border border-input bg-transparent px-3 py-3 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            errors[name] && "border-destructive",
          )}
          placeholder={`Type the ${label.toLowerCase()}`}
        />
        {errors[name] && (
          <span className="text-sm text-destructive">{label} is required</span>
        )}
      </div>
    </div>
  );
}

export default TextAreaInput;
