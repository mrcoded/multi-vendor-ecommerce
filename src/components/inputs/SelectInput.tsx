import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface SelectInputProps {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  className: string;
  hasMultipleSelect?: boolean;
  options: {
    id: string;
    title?: string;
    name?: string;
  }[];
}

function SelectInput({
  label,
  name,
  register,
  errors,
  className = "sm:col-span-2",
  hasMultipleSelect = false,
  options = [],
}: SelectInputProps) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-50 leading-6"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          {...register(`${name}`)}
          id={name}
          name={name}
          multiple={hasMultipleSelect}
          className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-700  sm:text-sm sm:leading-6"
        >
          {options.map((option, i) => {
            return (
              <option key={i} value={option.id}>
                {option.title ? option.title : option.name}
              </option>
            );
          })}
        </select>
        {errors[`${name}`] && (
          <span className="text-sm text-red-600">{label} is required</span>
        )}
      </div>
    </div>
  );
}

export default SelectInput;
