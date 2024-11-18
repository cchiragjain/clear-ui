import React from "react";
import { cn } from "../../lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: boolean;
}

/**
 * A customizable checkbox component with support for error states and accessibility.
 *
 * @param {CheckboxProps} props - The props for the Checkbox component.
 * @param {string} props.label - Label text for the checkbox.
 * @param {boolean} [props.error=false] - Whether the checkbox has an error state.
 * @param {string} [props.className=""] - Additional CSS classes for the checkbox input.
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="Accept terms and conditions"
 *   error={false}
 *   onChange={(e) => console.log(e.target.checked)}
 * />
 * ```
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, className = "", error, ...props }, ref) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(
            "w-4 h-4 rounded border-gray-300",
            "text-blue-500 focus:ring-blue-500",
            error && "border-red-500",
            className
          )}
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className={cn(
            "text-sm select-none",
            error ? "text-red-500" : "text-gray-700"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);
