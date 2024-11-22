import { motion } from "framer-motion";
import React from "react";
import { cn } from "../../lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

/**
 * A group of radio buttons that allows the user to select one option from a list.
 * The group supports custom orientations (horizontal or vertical), and includes accessibility features.
 *
 * @param {RadioGroupProps} props - The props for the RadioGroup component.
 * @param {RadioOption[]} props.options - The list of radio options to display.
 * @param {string} [props.value] - The currently selected value.
 * @param {(value: string) => void} [props.onChange] - Callback fired when the selected value changes.
 * @param {string} props.name - The name attribute of the radio group.
 * @param {string} [props.className] - Additional CSS classes to style the component.
 * @param {"horizontal" | "vertical"} [props.orientation="vertical"] - The orientation of the radio group.
 * @returns {JSX.Element} The RadioGroup component.
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   name="example"
 *   options={radioOptions}
 *   value={selectedOption}
 *   onChange={handleRadioChange}
 * />
 * ```
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { options, value, onChange, name, className, orientation = "vertical" },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent, optionValue: string) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onChange?.(optionValue);
      }
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn(
          "space-y-2",
          orientation === "horizontal" && "flex space-x-4 space-y-0",
          className
        )}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "relative flex items-start p-4 cursor-pointer",
              "rounded-lg border transition-colors",
              value === option.value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:bg-gray-50",
              option.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="flex items-center h-5">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange?.(option.value)}
                onKeyDown={(e) => handleKeyDown(e, option.value)}
                disabled={option.disabled}
                className="sr-only"
                aria-describedby={
                  option.description ? `${option.value}-description` : undefined
                }
              />
              <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                {value === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-blue-600"
                  />
                )}
              </div>
            </div>
            <div className="ml-3">
              <span className="block text-sm font-medium text-gray-900">
                {option.label}
              </span>
              {option.description && (
                <span
                  id={`${option.value}-description`}
                  className="block text-sm text-gray-500"
                >
                  {option.description}
                </span>
              )}
            </div>
          </label>
        ))}
      </div>
    );
  }
);
