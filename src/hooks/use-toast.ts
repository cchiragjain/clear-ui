import { useContext } from "react";
import { ToastContext } from "../context/toast-context";

/**
 * Custom hook to use the Toast context.
 * Throws an error if used outside of the ToastProvider.
 *
 * @returns {ToastContextType} The context value containing the showToast function.
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
