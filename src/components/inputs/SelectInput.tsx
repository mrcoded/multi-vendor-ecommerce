import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  Path,
} from "react-hook-form";
import { cn } from "@/lib/utils";

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
      <label className="mb-2 block text-sm font-medium leading-6 text-foreground">
        {label}
      </label>

      <div className="mt-2">
        {hasMultipleSelect ? (
          <div className="grid grid-cols-1 gap-2 rounded-md border border-border bg-card p-3 md:grid-cols-2">
            {options.length > 0 ? (
              options.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center space-x-3 rounded p-1 transition-colors hover:bg-muted"
                >
                  <input
                    type="checkbox"
                    value={option.id}
                    {...register(name, {
                      required: isRequired ? `${label} is required` : false,
                    })}
                    className="size-4 rounded border-border text-primary focus-visible:ring-ring"
                  />
                  <span className="text-sm text-foreground">
                    {option.title || option.name}
                  </span>
                </label>
              ))
            ) : (
              <p className="p-1 text-xs italic text-muted-foreground">
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
            className="block w-full rounded-md border border-input bg-card px-3 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
          <span className="mt-1 block text-xs text-destructive">
            {(error.message as string) || `${label} is required`}
          </span>
        )}
      </div>
    </div>
  );
}

export default SelectInput;
