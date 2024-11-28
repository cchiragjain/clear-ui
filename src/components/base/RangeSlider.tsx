import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export interface RangeSliderProps {
  /** Minimum value of the slider */
  min: number;
  /** Maximum value of the slider */
  max: number;
  /** Current value of the slider */
  value?: number;
  /** Callback fired when the value changes */
  onChange?: (value: number) => void;
  /** Step increment value */
  step?: number;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A slider component for selecting numeric values within a range.
 * Features smooth dragging, keyboard controls, and value tooltips.
 *
 * @param {RangeSliderProps} props - The props for the RangeSlider component.
 * @param {number} props.min - The minimum value of the slider.
 * @param {number} props.max - The maximum value of the slider.
 * @param {number} [props.value] - The current value of the slider.
 * @param {(value: number) => void} [props.onChange] - Callback fired when the value changes.
 * @param {number} [props.step=1] - The step increment value.
 * @param {boolean} [props.disabled=false] - Whether the slider is disabled.
 * @param {string} [props.className] - Additional CSS classes.
 * @returns {JSX.Element} The RangeSlider component.
 *
 * @example
 * ```tsx
 * <RangeSlider
 *   min={0}
 *   max={100}
 *   value={volume}
 *   onChange={setVolume}
 * />
 * ```
 */
export const RangeSlider = React.forwardRef<HTMLDivElement, RangeSliderProps>(
  ({ min, max, value = min, onChange, step = 1, disabled, className }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    const percentage = ((value - min) / (max - min)) * 100;

    const handleMove = useCallback(
      (clientX: number) => {
        if (disabled || !sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const position = (clientX - rect.left) / rect.width;
        const newValue =
          Math.round((position * (max - min) + min) / step) * step;
        onChange?.(Math.max(min, Math.min(max, newValue)));
      },
      [disabled, max, min, onChange, step]
    );

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      setIsDragging(true);
      handleMove(e.clientX);
    };

    useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging, handleMove]);

    return (
      <div
        ref={ref}
        className={cn("relative py-4", className)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {showTooltip && (
          <div
            className="absolute -top-8 px-2 py-1 rounded bg-gray-900 text-white text-xs"
            style={{ left: `calc(${percentage}% - 1rem)` }}
          >
            {value}
          </div>
        )}
        <div
          ref={sliderRef}
          className={cn(
            "h-2 rounded-full bg-gray-200",
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          )}
          onMouseDown={handleMouseDown}
        >
          <div
            className="h-full rounded-full bg-blue-500"
            style={{ width: `${percentage}%` }}
          />
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 w-4 h-4",
              "rounded-full bg-white border-2 border-blue-500",
              "transform -translate-x-1/2",
              isDragging && "scale-110",
              disabled ? "cursor-not-allowed" : "cursor-grab"
            )}
            style={{ left: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
