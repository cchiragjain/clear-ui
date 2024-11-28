import React from "react";
import { cn } from "../../lib/utils";

export interface SkeletonProps {
  /** The variant of the skeleton */
  variant?: "text" | "circular" | "rectangular";
  /** The animation type */
  animation?: "pulse" | "wave" | "none";
  /** Additional CSS classes */
  className?: string;
}

/**
 * A loading skeleton component that serves as a placeholder during content loading.
 * It offers different variants (text, circular, rectangular) and animation types (pulse, wave).
 *
 * @param {SkeletonProps} props - The props for the Skeleton component.
 * @param {"text" | "circular" | "rectangular"} [props.variant="text"] - The variant of the skeleton.
 * @param {"pulse" | "wave" | "none"} [props.animation="pulse"] - The animation effect to use.
 * @param {string} [props.className] - Additional CSS classes to apply.
 * @returns {JSX.Element} The Skeleton component.
 *
 * @example
 * ```tsx
 * <Skeleton
 *   variant="text"
 *   animation="pulse"
 *   className="w-full h-4"
 * />
 * ```
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = "text", animation = "pulse", className }, ref) => {
    const baseStyles = "bg-gray-200";

    const variants = {
      text: "w-full h-4 rounded",
      circular: "rounded-full",
      rectangular: "rounded-md",
    };

    const animations = {
      pulse: "animate-pulse",
      wave: "animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]",
      none: "",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          animations[animation],
          className
        )}
        role="status"
        aria-label="Loading..."
      />
    );
  }
);
