import React, { useEffect, useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";

interface ToggleInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  truthyValue: string;
  falsyValue: string;
  className?: string;
  register: UseFormRegister<T>;
  defaultCheck: boolean | undefined;
  setIsWholesaleCheck?: (value: boolean) => void;
}

function ToggleInput<T extends FieldValues>({
  label,
  name,
  truthyValue,
  falsyValue,
  register,
  defaultCheck = false,
  setIsWholesaleCheck,
  className = "sm:col-span-2 flex flex-wrap",
}: ToggleInputProps<T>) {
  const [value, setValue] = useState(defaultCheck ?? false);

  const { onChange, ...registerProps } = register(name);

  useEffect(() => {
    if (defaultCheck !== undefined) {
      setValue(defaultCheck);
    }
  }, [defaultCheck]);

  return (
    <div className={className}>
      <div className="w-full sm:w-1/2">
        <h2 className="mb-2 block text-sm font-medium leading-6 text-foreground">
          {label}
        </h2>
      </div>
      <div className="w-full sm:w-1/2">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            {...registerProps}
            type="checkbox"
            checked={value}
            className="peer sr-only"
            onChange={(e) => {
              onChange(e);
              setValue(e.target.checked);
              setIsWholesaleCheck?.(e.target.checked);
            }}
          />
          <div
            className={cn(
              "h-6 w-11 rounded-full bg-muted transition-colors",
              "after:absolute after:left-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-border after:bg-card after:transition-all",
              "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
              "peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-primary-foreground/20",
            )}
          />
          <span className="ml-3 text-sm font-medium text-muted-foreground">
            {value ? truthyValue : falsyValue}
          </span>
        </label>
      </div>
    </div>
  );
}

export default ToggleInput;
