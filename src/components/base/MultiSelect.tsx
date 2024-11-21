import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
  image?: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

/**
 * A multi-select dropdown component that allows users to select multiple options from a list.
 * Includes search functionality, custom styling, and support for error and disabled states.
 *
 * @param {MultiSelectProps} props - The props for the MultiSelect component.
 * @param {MultiSelectOption[]} props.options - The list of options to display.
 * @param {string[]} [props.value=[]] - The selected values.
 * @param {(value: string[]) => void} [props.onChange] - Callback fired when the selected values change.
 * @param {string} [props.placeholder="Select options"] - Placeholder text when no options are selected.
 * @param {boolean} [props.disabled=false] - Whether the component is disabled.
 * @param {boolean} [props.error=false] - Whether the component is in an error state.
 * @param {string} [props.className=""] - Additional CSS classes to style the component.
 * @returns {JSX.Element} The MultiSelect component.
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   options={options}
 *   value={selectedValues}
 *   onChange={handleChange}
 *   placeholder="Choose your options"
 * />
 * ```
 */
export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value = [],
      onChange,
      placeholder = "Select options",
      disabled,
      error,
      className = "",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const selectedOptions = options.filter((opt) => value.includes(opt.value));
    const filteredOptions = options.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchTerm("");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
      if (isOpen && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen]);

    useEffect(() => {
      if (isOpen && listRef.current) {
        const highlightedElement = listRef.current.children[
          highlightedIndex
        ] as HTMLElement;
        highlightedElement?.scrollIntoView({ block: "nearest" });
      }
    }, [highlightedIndex, isOpen]);

    const toggleOption = (optionValue: string) => {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange?.(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
          e.preventDefault();
          if (isOpen && filteredOptions.length > 0) {
            toggleOption(filteredOptions[highlightedIndex].value);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex(
            (prev) =>
              (prev - 1 + filteredOptions.length) % filteredOptions.length
          );
          break;
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length);
          break;
        case "Escape":
          setIsOpen(false);
          setSearchTerm("");
          break;
        case "Tab":
          if (!e.shiftKey) {
            setIsOpen(false);
            setSearchTerm("");
          }
          break;
      }
    };

    const handleSearchInputKeyDown = (e: React.KeyboardEvent) => {
      // Allow backspace to work normally in search input
      if (e.key === "Backspace" && searchTerm === "" && value.length > 0) {
        e.preventDefault();
        const lastValue = value[value.length - 1];
        onChange?.(value.filter((v) => v !== lastValue));
      } else {
        handleKeyDown(e);
      }
    };

    return (
      <div ref={containerRef} className="relative">
        <div
          ref={ref}
          className={cn(
            "w-full px-3 py-2 rounded-md border",
            "bg-white",
            error ? "border-red-500" : "border-gray-300",
            disabled
              ? "cursor-not-allowed opacity-75"
              : "cursor-pointer hover:border-gray-400",
            "focus-within:outline-none focus-within:ring-2 focus-within:ring-opacity-50",
            error
              ? "focus-within:border-red-500 focus-within:ring-red-500"
              : "focus-within:border-blue-500 focus-within:ring-blue-500",
            "transition-colors duration-200",
            className
          )}
          onClick={() => !disabled && setIsOpen(true)}
        >
          <div className="flex flex-wrap gap-1">
            {selectedOptions.map((option) => (
              <motion.span
                key={option.value}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm bg-blue-100 text-blue-800"
              >
                {option.image && (
                  <img
                    src={option.image}
                    alt=""
                    className="w-4 h-4 rounded-full object-cover"
                  />
                )}
                {option.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(option.value);
                  }}
                  className="hover:text-blue-600 transition-colors duration-150"
                  aria-label={`Remove ${option.label}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
            {selectedOptions.length === 0 && (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <AnimatePresence>
          {isOpen && !disabled && (
            <motion.div
              className="absolute z-10 w-full mt-1 rounded-md shadow-lg bg-white border border-gray-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", duration: 0.2 }}
            >
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setHighlightedIndex(0);
                }}
                onKeyDown={handleSearchInputKeyDown}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none placeholder:text-gray-400"
                placeholder="Search options..."
                aria-label="Search options"
                onClick={(e) => e.stopPropagation()}
              />
              <ul
                ref={listRef}
                className="py-1 max-h-60 overflow-auto"
                role="listbox"
                aria-multiselectable="true"
                aria-label="Options"
              >
                {filteredOptions.map((option, index) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={value.includes(option.value)}
                    onClick={() => toggleOption(option.value)}
                    className={cn(
                      "px-3 py-2 cursor-pointer flex items-center justify-between",
                      "transition-colors duration-150",
                      value.includes(option.value) &&
                        "bg-blue-50 text-blue-600",
                      index === highlightedIndex && "bg-gray-100",
                      "hover:bg-gray-100"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {option.image && (
                        <img
                          src={option.image}
                          alt=""
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      )}
                      {option.label}
                    </div>
                    {value.includes(option.value) && (
                      <Check className="w-4 h-4" />
                    )}
                  </li>
                ))}
                {filteredOptions.length === 0 && (
                  <li className="px-3 py-2 text-gray-400">No options found</li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
