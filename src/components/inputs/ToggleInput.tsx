import React, { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface ToggleInputProps {
  label: string;
  name: string;
  truthyValue: string;
  falsyValue: string;
  className?: string;
  register: UseFormRegister<FieldValues>;
  defaultCheck?: boolean;
  setIsWholesaleCheck?: (value: boolean) => void;
}

function ToggleInput({
  label,
  name,
  truthyValue,
  falsyValue,
  register,
  defaultCheck,
  setIsWholesaleCheck,
  className = "sm:col-span-2 flex flex-wrap",
}: ToggleInputProps) {
  const [value, setValue] = useState(false);

  return (
    <div className={className}>
      <div className="w-full sm:w-1/2">
        <h2 className="block text-sm mb-2 font-medium leading-6 text-slate-900 dark:text-slate-50">
          {label}
        </h2>
      </div>
      <div className="w-full sm:w-1/2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            {...register(name)}
            type="checkbox"
            defaultChecked={defaultCheck}
            checked={value}
            className="sr-only peer"
            onChange={(e) => {
              setValue(e.target.checked);
              setIsWholesaleCheck?.(e.target.checked);
            }}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer-focus:dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {value ? truthyValue : falsyValue}
          </span>
        </label>
      </div>
    </div>
  );
}

export default ToggleInput;
