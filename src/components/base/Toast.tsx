import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useCallback } from "react";
import { ToastContext } from "../../context/toast-context";
import { cn } from "../../lib/utils";

export type ToastType = "info" | "success" | "warning" | "error";

interface ToastState {
  id: number;
  message: string;
  type: ToastType;
}

/**
 * A toast notification system with different types and animations.
 * Manages multiple toast messages with automatic dismissal.
 *
 * @example
 * ```tsx
 * const { showToast } = useToast();
 *
 * // Show a toast notification
 * showToast('Operation successful!', 'success');
 * ```
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = React.useState<ToastState[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type }]);

    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  const toastStyles = {
    info: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "flex items-center justify-between",
                "px-4 py-3 rounded-lg shadow-lg",
                "text-white min-w-[300px]",
                toastStyles[toast.type]
              )}
            >
              <span>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 hover:opacity-75"
                aria-label="Close toast"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
