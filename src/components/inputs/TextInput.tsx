import React from "react";
import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  Path,
} from "react-hook-form";

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
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-50 leading-6"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          {...register(name, { required: isRequired })}
          type={type}
          name={name}
          id={name}
          disabled={disabled}
          autoComplete={name}
          className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-700 dark:focus:ring-slate-500 sm:text-sm sm:leading-6 dark:bg-transparent dark:text-slate-100"
          placeholder={`Type the ${label.toLowerCase()}`}
        />
        {errors[`${name}`] && (
          <span className="text-sm text-red-600">{label} is required</span>
        )}
      </div>
    </div>
  );
}

export default TextInput;
