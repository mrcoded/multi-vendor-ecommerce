import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  Path,
} from "react-hook-form";

interface SelectInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  isRequired?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  className?: string;
  hasMultipleSelect?: boolean;
  options: {
    id: string;
    title?: string;
    name?: string;
  }[];
}

function SelectInput<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  isRequired = true,
  className = "sm:col-span-2",
  hasMultipleSelect = false,
  options = [],
}: SelectInputProps<T>) {
  const error = errors[name];

  return (
    <div className={className}>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-50 leading-6">
        {label}
      </label>

      <div className="mt-2">
        {hasMultipleSelect ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 border rounded-md bg-white dark:bg-slate-900 ring-1 ring-inset ring-gray-300 dark:ring-slate-700">
            {options.length > 0 ? (
              options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 p-1 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    value={option.id}
                    {...register(name, {
                      required: isRequired ? `${label} is required` : false,
                    })}
                    className="w-4 h-4 text-lime-600 border-gray-300 rounded focus:ring-lime-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-slate-300">
                    {option.title || option.name}
                  </span>
                </label>
              ))
            ) : (
              <p className="text-xs text-gray-500 italic p-1">
                No stores found for this vendor.
              </p>
            )}
          </div>
        ) : (
          <select
            {...register(name, {
              required: isRequired ? `${label} is required` : false,
            })}
            id={name}
            className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-lime-700 sm:text-sm dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.title || option.name}
              </option>
            ))}
          </select>
        )}

        {error && (
          <span className="text-xs text-red-600 mt-1 block">
            {(error.message as string) || `${label} is required`}
          </span>
        )}
      </div>
    </div>
  );
}

export default SelectInput;
