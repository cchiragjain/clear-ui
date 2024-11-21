import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export interface SelectOption {
  /** The value to be used when the option is selected */
  value: string;
  /** The text to display for the option */
  label: string;
}

/**
 * A customizable select component with support for keyboard navigation and search.
 * Provides a dropdown interface for selecting a single option from a list.
 *
 * @param {SelectProps} props - The props for the Select component.
 * @param {SelectOption[]} props.options - The options to display in the dropdown.
 * @param {string} [props.value] - The currently selected value.
 * @param {(value: string) => void} [props.onChange] - Callback fired when the selection changes.
 * @param {string} [props.placeholder="Select an option"] - Placeholder text when no option is selected.
 * @param {boolean} [props.disabled=false] - Whether the select is disabled.
 * @param {boolean} [props.error=false] - Whether the select is in an error state.
 * @param {string} [props.className=""] - Additional CSS classes.
 * @returns {JSX.Element} The Select component.
 *
 * @example
 * ```tsx
 * <Select
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' }
 *   ]}
 *   value={selectedValue}
 *   onChange={handleChange}
 * />
 * ```
 */
export interface SelectProps {
  /** Array of options to display in the select dropdown */
  options: SelectOption[];
  /** Currently selected value */
  value?: string;
  /** Callback fired when selection changes */
  onChange?: (value: string) => void;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is in an error state */
  error?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select an option",
      disabled,
      error,
      className = "",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
      if (isOpen && listRef.current) {
        const highlightedElement = listRef.current.children[
          highlightedIndex
        ] as HTMLElement;
        highlightedElement?.scrollIntoView({ block: "nearest" });
      }
    }, [highlightedIndex, isOpen]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (isOpen) {
            onChange?.(options[highlightedIndex].value);
            setIsOpen(false);
          } else {
            setIsOpen(true);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex(
              (prev) => (prev - 1 + options.length) % options.length
            );
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex((prev) => (prev + 1) % options.length);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
        case "Tab":
          if (isOpen) {
            setIsOpen(false);
          }
          break;
      }
    };

    return (
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={selectedOption ? undefined : placeholder}
          className={`
            w-full px-3 py-2 text-left rounded-md border
            bg-white text-gray-900
            ${error ? "border-red-500" : "border-gray-300"}
            ${
              disabled
                ? "cursor-not-allowed opacity-75"
                : "hover:border-gray-400"
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            ${
              error
                ? "focus:border-red-500 focus:ring-red-500"
                : "focus:border-blue-500 focus:ring-blue-500"
            }
            transition-colors duration-200
            ${className}
          `}
          disabled={disabled}
        >
          <div className="flex items-center justify-between">
            <span className={!selectedOption ? "text-gray-400" : ""}>
              {selectedOption?.label || placeholder}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </button>

        <AnimatePresence>
          {isOpen && !disabled && (
            <motion.ul
              ref={listRef}
              role="listbox"
              aria-activedescendant={`option-${options[highlightedIndex].value}`}
              className="absolute z-10 w-full mt-1 rounded-md shadow-lg bg-white border border-gray-300 py-1 max-h-60 overflow-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", duration: 0.2 }}
            >
              {options.map((option, index) => (
                <li
                  key={option.value}
                  id={`option-${option.value}`}
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => {
                    onChange?.(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    px-3 py-2 cursor-pointer transition-colors duration-150
                    ${option.value === value ? "bg-blue-50 text-blue-600" : ""}
                    ${index === highlightedIndex ? "bg-gray-100" : ""}
                    hover:bg-gray-100
                  `}
                >
                  {option.label}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
