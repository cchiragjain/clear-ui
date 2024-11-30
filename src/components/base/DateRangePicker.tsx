import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinInterval,
  startOfMonth,
  subMonths,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export interface DateRange {
  start?: Date;
  end?: Date;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

/**
 * A date range picker component with a calendar dropdown and keyboard navigation.
 * Supports selecting a start and end date with a visual calendar interface.
 *
 * @param {DateRangePickerProps} props - The props for the DateRangePicker component.
 * @param {DateRange} [props.value] - The currently selected date range.
 * @param {(range: DateRange) => void} [props.onChange] - Callback function fired when a date range is selected.
 * @param {boolean} [props.disabled=false] - Whether the date picker is disabled.
 * @param {string} [props.className=""] - Additional CSS classes for the date picker container.
 * @param {string} [props.placeholder="Select date range"] - Placeholder text displayed when no date range is selected.
 * @param {React.Ref<HTMLDivElement>} ref - Ref for the date range picker container element.
 *
 * @example
 * ```tsx
 * <DateRangePicker
 *   value={{ start: selectedStartDate, end: selectedEndDate }}
 *   onChange={(range) => setDateRange(range)}
 *   placeholder="Select date range"
 * />
 * ```
 */
export const DateRangePicker = React.forwardRef<
  HTMLDivElement,
  DateRangePickerProps
>(
  (
    {
      value,
      onChange,
      disabled,
      className = "",
      placeholder = "Select date range",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(
      value?.start || new Date()
    );
    const [selecting, setSelecting] = useState<"start" | "end">("start");
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

    const handleDateSelect = (date: Date) => {
      if (selecting === "start") {
        onChange?.({ start: date, end: undefined });
        setSelecting("end");
      } else {
        if (value?.start && isBefore(date, value.start)) {
          onChange?.({ start: date, end: value.start });
        } else {
          onChange?.({ start: value?.start, end: date });
        }
        setSelecting("start");
        setIsOpen(false);
      }
    };

    const isInRange = (day: Date) => {
      if (!value?.start || !value?.end) return false;
      return isWithinInterval(day, { start: value.start, end: value.end });
    };

    return (
      <div ref={containerRef} className="relative">
        <div
          ref={ref}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            flex items-center gap-2 w-full px-3 py-2 rounded-md border
            bg-white  cursor-pointer
            ${
              disabled
                ? "cursor-not-allowed opacity-50"
                : "hover:border-gray-400"
            }
            ${className}
          `}
        >
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className={value?.start ? "text-gray-900 " : "text-gray-400"}>
            {value?.start
              ? `${format(value.start, "PP")} ${
                  value.end ? `- ${format(value.end, "PP")}` : ""
                }`
              : placeholder}
          </span>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute z-50 mt-2 p-4 bg-white  rounded-lg shadow-lg border border-gray-200 "
            >
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="p-1 hover:bg-gray-100  rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="font-semibold">
                  {format(currentMonth, "MMMM yyyy")}
                </h2>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="p-1 hover:bg-gray-100  rounded-full"
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
                {days.map((day) => {
                  const isRangeStart =
                    value?.start && isSameDay(day, value.start);
                  const isRangeEnd = value?.end && isSameDay(day, value.end);

                  return (
                    <motion.button
                      key={day.toISOString()}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDateSelect(day)}
                      className={`
                        p-2 rounded-full text-sm relative
                        ${!isSameMonth(day, currentMonth) && "text-gray-400"}
                        ${isToday(day) && "border border-blue-500"}
                        ${
                          isRangeStart || isRangeEnd
                            ? "bg-blue-500 text-white"
                            : ""
                        }
                        ${isInRange(day) ? "bg-blue-100 " : ""}
                        hover:bg-gray-100 
                      `}
                    >
                      {format(day, "d")}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-4 text-sm text-gray-500">
                {selecting === "start"
                  ? "Select start date"
                  : "Select end date"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
