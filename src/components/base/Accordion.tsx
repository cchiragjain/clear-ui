import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  /** Array of items to display in the accordion */
  items: AccordionItem[];
  /** Whether multiple sections can be expanded at once */
  multiple?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A collapsible content panel with support for multiple or single panel expansion.
 * Provides smooth animations and keyboard navigation.
 *
 * @param {AccordionProps} props - The props for the Accordion component.
 * @param {AccordionItem[]} props.items - Array of items to display in the accordion.
 * @param {boolean} [props.multiple=false] - Whether multiple sections can be expanded at once.
 * @param {string} [props.className=""] - Additional CSS classes for the accordion container.
 *
 * @example
 * ```tsx
 * <Accordion
 *   items={[
 *     { id: '1', title: 'Section 1', content: 'Content 1' },
 *     { id: '2', title: 'Section 2', content: 'Content 2' }
 *   ]}
 *   multiple={false}
 * />
 * ```
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, multiple = false, className = "" }, ref) => {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleItem = (itemId: string) => {
      if (multiple) {
        setExpandedItems((current) =>
          current.includes(itemId)
            ? current.filter((id) => id !== itemId)
            : [...current, itemId]
        );
      } else {
        setExpandedItems((current) =>
          current.includes(itemId) ? [] : [itemId]
        );
      }
    };

    const isExpanded = (itemId: string) => expandedItems.includes(itemId);

    return (
      <div
        ref={ref}
        className={cn(
          "divide-y divide-gray-200 border-y border-gray-200",
          className
        )}
      >
        {items.map((item) => (
          <div key={item.id} className="py-2">
            <button
              onClick={() => toggleItem(item.id)}
              className={cn(
                "flex w-full items-center justify-between px-4 py-2",
                "text-left text-sm font-medium text-gray-900",
                "hover:bg-gray-50 focus:outline-none focus:ring-2",
                "focus:ring-blue-500 focus:ring-offset-2",
                "rounded-lg transition-colors"
              )}
              aria-expanded={isExpanded(item.id)}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-gray-500 transition-transform duration-200",
                  isExpanded(item.id) && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isExpanded(item.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-2 text-sm text-gray-700">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    );
  }
);
