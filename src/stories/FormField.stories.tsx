import { Meta, StoryFn } from "@storybook/react";
import React from "react";

import { FormField, FormFieldProps } from "../components/base/FormField";

// Mock Input component for the stories
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => (
  <input
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
    {...props}
  />
);

export default {
  title: "Components/FormField",
  component: FormField,
  argTypes: {
    label: {
      control: { type: "text" },
      defaultValue: "Label",
    },
    error: {
      control: { type: "text" },
    },
    helperText: {
      control: { type: "text" },
    },
    required: {
      control: { type: "boolean" },
    },
  },
} as Meta<FormFieldProps>;

const Template: StoryFn<FormFieldProps> = (args) => (
  <FormField {...args}>{args.children}</FormField>
);

export const Default = Template.bind({});
Default.args = {
  label: "Email Address",
  helperText: "We'll never share your email.",
  required: true,
  children: <Input placeholder="Enter your email" />,
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  label: "Email Address",
  error: "This field is required.",
  helperText: "We'll never share your email.",
  children: <Input placeholder="Enter your email" />,
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  helperText: "A field without a label.",
  children: <Input placeholder="No label here" />,
};

export const CustomStyling = Template.bind({});
CustomStyling.args = {
  label: "Custom Styled Field",
  helperText: "This field has custom styles.",
  className: "bg-gray-100 p-4 border border-gray-300 rounded-md",
  children: <Input placeholder="Custom styled input" />,
};
