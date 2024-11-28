import { createContext } from "react";
import { ToastType } from "../components/base/Toast";

export interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
