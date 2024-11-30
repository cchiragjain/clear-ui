import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { TextArea, TextAreaProps } from "../components/base/TextArea";

export default {
  title: "Components/TextArea",
  component: TextArea,
  argTypes: {
    onChange: { action: "changed" },
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} as Meta<TextAreaProps>;

// Base template for controlled TextArea
const ControlledTemplate: StoryFn<TextAreaProps> = (args) => {
  const [value, setValue] = useState<string>("");

  return (
    <TextArea
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

// Default TextArea story
export const Default = ControlledTemplate.bind({});
Default.args = {
  placeholder: "Enter your message",
};

// Error State TextArea story
export const ErrorState = ControlledTemplate.bind({});
ErrorState.args = {
  placeholder: "Enter your message",
  error: true,
};

// Disabled TextArea story
export const Disabled = ControlledTemplate.bind({});
Disabled.args = {
  placeholder: "This textarea is disabled",
  disabled: true,
};

// Custom Styling TextArea story
export const CustomStyling = ControlledTemplate.bind({});
CustomStyling.args = {
  placeholder: "Custom styled textarea",
  className: "bg-gray-100 border-2 border-blue-500 rounded-xl p-4",
};

// Playground story with more interactive controls
export const Playground: StoryFn<TextAreaProps> = (args) => {
  const [value, setValue] = useState<string>("");

  return (
    <div className="space-y-4">
      <TextArea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="mt-2">
        <strong>Current Value:</strong>
        <pre className="bg-gray-100 p-2 rounded mt-1 whitespace-pre-wrap">
          {value || "No text entered"}
        </pre>
      </div>
    </div>
  );
};
Playground.args = {
  placeholder: "Type something here...",
  error: false,
  disabled: false,
};
Playground.argTypes = {
  error: {
    control: "boolean",
  },
  disabled: {
    control: "boolean",
  },
};
