import React from "react";
import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TextInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  isRequired?: boolean;
  type?: string;
  disabled?: boolean;
  className?: string;
}

function TextInput<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  disabled = false,
  isRequired = true,
  type = "text",
  className = "sm:col-span-2",
}: TextInputProps<T>) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium leading-6 text-foreground"
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <Input
          {...register(name, { required: isRequired })}
          type={type}
          name={name}
          id={name}
          disabled={disabled}
          autoComplete={name}
          className={cn(errors[name] && "border-destructive")}
          placeholder={`Type the ${label.toLowerCase()}`}
        />
        {errors[name] && (
          <span className="text-sm text-destructive">{label} is required</span>
        )}
      </div>
    </div>
  );
}

export default TextInput;
