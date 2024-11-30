import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { cn } from "../../lib/utils";

export interface DialogProps {
  /** Whether the dialog is currently open */
  isOpen: boolean;
  /** Callback fired when the dialog should close */
  onClose: () => void;
  /** The title of the dialog */
  title?: React.ReactNode;
  /** The content of the dialog */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A modal dialog component with focus management and keyboard interactions.
 * Provides a backdrop and smooth animations for modal content.
 *
 * @param {DialogProps} props - The props for the Dialog component.
 * @param {boolean} props.isOpen - Whether the dialog is open.
 * @param {() => void} props.onClose - Callback fired when the dialog should close.
 * @param {React.ReactNode} [props.title] - The title of the dialog.
 * @param {React.ReactNode} props.children - The content to be displayed inside the dialog.
 * @param {string} [props.className=""] - Additional CSS classes for styling the dialog.
 * @param {React.Ref<HTMLDivElement>} ref - Ref for the dialog element.
 *
 * @example
 * ```tsx
 * <Dialog
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirmation"
 * >
 *   <p>Are you sure you want to proceed?</p>
 * </Dialog>
 * ```
 */
export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ isOpen, onClose, title, children, className }, ref) => {
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, onClose]);

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                ref={ref}
                role="dialog"
                aria-modal="true"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "bg-white rounded-lg shadow-xl",
                  "w-full max-w-lg max-h-[90vh] overflow-auto",
                  className
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 border-b">
                  {title && <h2 className="text-lg font-semibold">{title}</h2>}
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">{children}</div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    );
  }
);
