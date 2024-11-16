import React from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Whether the associated field is in an error state */
  error?: boolean;
  /** Whether to show a required indicator (*) */
  required?: boolean;
}

/**
 * A label component for form inputs with support for required and error states.
 * It displays an optional asterisk for required fields and adjusts the text color
 * based on the error state.
 *
 * @param {LabelProps} props - The props for the Label component.
 * @param {boolean} [props.error=false] - Indicates whether the associated field is in an error state.
 * @param {boolean} [props.required=false] - Indicates whether the field is required.
 * @param {string} [props.className=""] - Additional CSS classes for styling the label.
 * @param {React.ReactNode} props.children - The content to be displayed within the label.
 * @returns {JSX.Element} The Label component.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email" required error={!!errors.email}>
 *   Email Address
 * </Label>
 * ```
 */
export const Label: React.FC<LabelProps> = ({
  children,
  className = "",
  error,
  required,
  ...props
}) => {
  return (
    <label
      className={`
        block text-sm font-medium
        ${error ? "text-red-500" : "text-gray-700"}
        ${className}
      `}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};
