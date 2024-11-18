import React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

/**
 * A reusable input component that extends the native HTML input element with additional styling
 * and error state handling.
 *
 * @param {InputProps} props - The props for the Input component.
 * @param {boolean} [props.error=false] - Indicates whether the input is in an error state.
 * @param {string} [props.className=""] - Additional CSS classes for styling the input.
 * @returns {JSX.Element} The Input component.
 *
 * @example
 * ```tsx
 * <Input
 *   type="text"
 *   placeholder="Enter your name"
 *   error={!!errors.name}
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full px-3 py-2 rounded-md border",
          "bg-white text-gray-900",
          "placeholder:text-gray-400",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
          "focus:outline-none focus:ring-2 focus:ring-opacity-50",
          "disabled:cursor-not-allowed disabled:opacity-75",
          "transition-colors duration-200",
          className
        )}
        {...props}
      />
    );
  }
);
