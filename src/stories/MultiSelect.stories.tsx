import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { MultiSelect, MultiSelectProps } from "../components/base/MultiSelect";

const sampleOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "ember", label: "Ember" },
];

const sampleOptionsWithImages = [
  {
    value: "typescript",
    label: "TypeScript",
    image:
      "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png",
  },
  {
    value: "javascript",
    label: "JavaScript",
    image:
      "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png",
  },
  {
    value: "python",
    label: "Python",
    image:
      "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/python/python.png",
  },
  {
    value: "rust",
    label: "Rust",
    image:
      "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/rust/rust.png",
  },
  {
    value: "go",
    label: "Go",
    image:
      "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/go/go.png",
  },
];

export default {
  title: "Components/MultiSelect",
  component: MultiSelect,
  argTypes: {
    onChange: { action: "changed" },
    placeholder: {
      control: { type: "text" },
      defaultValue: "Select options",
    },
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    error: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    className: {
      control: { type: "text" },
    },
  },
} as Meta<MultiSelectProps>;

const ControlledTemplate: StoryFn<MultiSelectProps> = (args) => {
  const [value, setValue] = useState<string[]>(args.value || []);

  return (
    <MultiSelect
      {...args}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const Default = ControlledTemplate.bind({});
Default.args = {
  placeholder: "Select frameworks",
  options: sampleOptions,
};

export const WithInitialValues = ControlledTemplate.bind({});
WithInitialValues.args = {
  placeholder: "Selected",
  value: ["react"],
  options: sampleOptions,
};

export const WithImages = ControlledTemplate.bind({});
WithImages.args = {
  placeholder: "Select from many options",
  options: sampleOptionsWithImages,
};

export const Disabled = ControlledTemplate.bind({});
Disabled.args = {
  disabled: true,
  placeholder: "Disabled multi-select",
  options: sampleOptions,
};

export const ErrorState = ControlledTemplate.bind({});
ErrorState.args = {
  error: true,
  placeholder: "Select with error",
  options: sampleOptions,
};

export const CustomStyling = ControlledTemplate.bind({});
CustomStyling.args = {
  placeholder: "Custom styled multi-select",
  className: "bg-green-300 border-2 border-yellow-300",
  options: sampleOptions,
};

export const LargeOptionSet = ControlledTemplate.bind({});
LargeOptionSet.args = {
  placeholder: "Select from many options",
  options: Array.from({ length: 50 }, (_, i) => ({
    value: `option-${i}`,
    label: `Large Option ${i + 1}`,
  })),
};
