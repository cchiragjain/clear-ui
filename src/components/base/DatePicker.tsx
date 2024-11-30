import { cn } from "../../lib/utils";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export interface DatePickerProps {
  /** The currently selected date */
  value?: Date;
  /** Callback fired when a date is selected */
  onChange?: (date: Date) => void;
  /** Whether the date picker is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Placeholder text when no date is selected */
  placeholder?: string;
}

/**
 * A date picker component with a calendar dropdown and keyboard navigation.
 * Supports date selection with a visual calendar interface.
 *
 * @param {DatePickerProps} props - The props for the DatePicker component.
 * @param {Date} [props.value] - The currently selected date.
 * @param {(date: Date) => void} [props.onChange] - Callback function fired when a date is selected.
 * @param {boolean} [props.disabled=false] - Whether the date picker is disabled.
 * @param {string} [props.className=""] - Additional CSS classes for the date picker container.
 * @param {string} [props.placeholder="Select a date"] - Placeholder text displayed when no date is selected.
 *
 * @example
 * ```tsx
 * <DatePicker
 *   value={selectedDate}
 *   onChange={(date) => setSelectedDate(date)}
 *   placeholder="Select a date"
 * />
 * ```
 */
export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      disabled,
      className = "",
      placeholder = "Select a date",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(value || new Date());
    const containerRef = useRef<HTMLDivElement>(null);

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

    const days = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });

    return (
      <div ref={containerRef} className="relative">
        <div
          ref={ref}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-2 w-full px-3 py-2 rounded-md border",
            "bg-white cursor-pointer",
            disabled
              ? "cursor-not-allowed opacity-50"
              : "hover:border-gray-400",
            className
          )}
        >
          <CalendarIcon className="w-4 h-4 text-gray-400" />
          <span className={value ? "text-gray-900" : "text-gray-400"}>
            {value ? format(value, "PP") : placeholder}
          </span>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute z-50 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="font-semibold">
                  {format(currentMonth, "MMMM yyyy")}
                </h2>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-gray-400 p-2"
                  >
                    {day}
                  </div>
                ))}
                {days.map((day) => (
                  <motion.button
                    key={day.toISOString()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onChange?.(day);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "p-2 rounded-full text-sm relative",
                      !isSameMonth(day, currentMonth) && "text-gray-400",
                      isToday(day) && "border border-blue-500",
                      value &&
                        isSameDay(day, value) &&
                        "bg-blue-500 text-white",
                      "hover:bg-gray-100"
                    )}
                  >
                    {format(day, "d")}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
