import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export interface SidebarProps {
  children: React.ReactNode;
  position?: "left" | "right";
  className?: string;
  trigger?: React.ReactNode;
}

/**
 * A sidebar component that can slide in from the left or right side of the screen.
 * It includes a close button and can be triggered by an external element like a button or icon.
 * The sidebar closes when clicking outside or pressing the Escape key.
 *
 * @param {SidebarProps} props - The props for the Sidebar component.
 * @param {React.ReactNode} props.children - The content inside the sidebar.
 * @param {"left" | "right"} [props.position="left"] - The position of the sidebar (left or right).
 * @param {string} [props.className=""] - Additional CSS classes.
 * @param {React.ReactNode} [props.trigger] - Trigger element to open the sidebar.
 * @returns {JSX.Element} The Sidebar component.
 *
 * @example
 * ```tsx
 * <Sidebar trigger={<Button>Open Sidebar</Button>}>
 *   <div>Sidebar content goes here</div>
 * </Sidebar>
 * ```
 */
export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ children, position = "left", className, trigger }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, []);

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
          aria-expanded={isOpen}
          aria-controls="sidebar"
        >
          {trigger || <Menu className="w-6 h-6" />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                ref={ref}
                className={cn(
                  "fixed top-0 bottom-0 w-80 bg-white shadow-xl z-50 p-4",
                  position === "left" ? "left-0" : "right-0",
                  className
                )}
                initial={{ x: position === "left" ? "-100%" : "100%" }}
                animate={{ x: 0 }}
                exit={{ x: position === "left" ? "-100%" : "100%" }}
                transition={{ type: "spring", damping: 20 }}
                role="dialog"
                aria-modal="true"
                id="sidebar"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="h-full overflow-auto">{children}</div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }
);
