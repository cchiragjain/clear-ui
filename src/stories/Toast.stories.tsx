import { Meta, StoryFn } from "@storybook/react";
import { ToastProvider } from "../components/base/Toast";
import { useToast } from "../hooks/use-toast"; // Assuming useToast is a custom hook

export default {
  title: "Components/ToastProvider",
  component: ToastProvider,
  argTypes: {
    message: { control: "text" },
    type: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
    },
  },
} as Meta;

export const Default: StoryFn = (args) => {
  function DefaultToastWrapper() {
    const { showToast } = useToast(); // Call hook directly inside component
    const handleClick = () => {
      showToast(args.message || "This is a default toast", args.type);
    };

    return (
      <div className="space-y-4">
        <button
          onClick={handleClick}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Show Toast
        </button>
      </div>
    );
  }

  return (
    <ToastProvider>
      <DefaultToastWrapper />
    </ToastProvider>
  );
};

Default.args = {
  message: "This is a toast message",
  type: "info",
};

export const AllVariants: StoryFn = () => {
  function ToastVariantsWrapper() {
    const { showToast } = useToast(); // Call hook directly inside component
    return (
      <div className="flex gap-4">
        <button
          onClick={() => showToast("Success toast!", "success")}
          className="px-4 py-2 text-white bg-green-500 rounded"
        >
          Show Success Toast
        </button>
        <button
          onClick={() => showToast("Success toast!", "info")}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Show Info Toast
        </button>
        <button
          onClick={() => showToast("Warning toast!", "warning")}
          className="px-4 py-2 text-white bg-yellow-500 rounded"
        >
          Show Warning Toast
        </button>
        <button
          onClick={() => showToast("Error toast!", "error")}
          className="px-4 py-2 text-white bg-red-500 rounded"
        >
          Show Error Toast
        </button>
      </div>
    );
  }

  return (
    <ToastProvider>
      <ToastVariantsWrapper />
    </ToastProvider>
  );
};
