import React from "react";
import { cn } from "../../lib/utils";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * A loading spinner component with configurable size.
 * It renders a spinner with a circular animation to indicate a loading state.
 *
 * @param {LoadingSpinnerProps} props - The props for the LoadingSpinner component.
 * @param {string} [props.size="md"] - The size of the spinner, can be "sm", "md", or "lg".
 * @param {string} [props.className=""] - Additional CSS classes for styling the spinner.
 * @returns {JSX.Element} The LoadingSpinner component.
 *
 * @example
 * ```tsx
 * <LoadingSpinner size="lg" />
 * ```
 */
export const LoadingSpinner = React.forwardRef<
  HTMLDivElement,
  LoadingSpinnerProps
>(({ size = "md", className }, ref) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      ref={ref}
      className={cn("relative", sizeClasses[size], className)}
      role="status"
      aria-label="Loading"
    >
      <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
      <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
    </div>
  );
});
