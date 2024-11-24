import React from "react";
import { cn } from "../../lib/utils";
import { Label } from "./Label";

export interface FormFieldProps {
  /** Label text for the form field */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the field */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** The form field content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A form field wrapper component that handles labels, errors, and helper text.
 * Provides consistent styling and layout for form inputs.
 *
 * @example
 * ```tsx
 * <FormField
 *   label="Email"
 *   error={formErrors.email}
 *   helperText="We'll never share your email"
 *   required
 * >
 *   <Input {...register('email')} />
 * </FormField>
 * ```
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  required,
  children,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label error={!!error} required={required}>
          {label}
        </Label>
      )}
      {children}
      {(error || helperText) && (
        <p className={cn("text-sm", error ? "text-red-500" : "text-gray-500")}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};
