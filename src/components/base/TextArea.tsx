import React from "react";
import { cn } from "../../lib/utils";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Whether the textarea is in an error state */
  error?: boolean;
}

/**
 * A multi-line text input component that supports error states and resizing.
 * It provides standard textarea functionality with customizable styles.
 *
 * @param {TextAreaProps} props - The props for the TextArea component.
 * @param {boolean} [props.error] - Whether the textarea is in an error state (optional).
 * @param {string} [props.className] - Additional CSS classes (optional).
 * @returns {JSX.Element} The TextArea component.
 *
 * @example
 * ```tsx
 * <TextArea
 *   placeholder="Enter your message"
 *   error={!!formErrors.message}
 *   onChange={handleChange}
 * />
 * ```
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = "", error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full px-3 py-2 rounded-md border",
          "bg-white text-gray-900",
          "placeholder:text-gray-400",
          "resize-y min-h-[80px]",
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
