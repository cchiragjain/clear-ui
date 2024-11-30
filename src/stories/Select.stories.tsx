import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Select, SelectProps } from "../components/base/Select";

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "dragonfruit", label: "Dragonfruit" },
  { value: "elderberry", label: "Elderberry" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "australia", label: "Australia" },
  { value: "germany", label: "Germany" },
];

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {
    onChange: { action: "changed" },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} as Meta<SelectProps>;

const ControlledTemplate: StoryFn<SelectProps> = (args) => {
  const [value, setValue] = useState<string>("");

  return (
    <Select
      {...args}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const Default = ControlledTemplate.bind({});
Default.args = {
  options: fruitOptions,
  placeholder: "Select a fruit",
};

export const WithCustomPlaceholder = ControlledTemplate.bind({});
WithCustomPlaceholder.args = {
  options: countryOptions,
  placeholder: "Choose a country",
};

export const DisabledSelect = ControlledTemplate.bind({});
DisabledSelect.args = {
  options: fruitOptions,
  disabled: true,
  placeholder: "Disabled dropdown",
};

export const ErrorState = ControlledTemplate.bind({});
ErrorState.args = {
  options: fruitOptions,
  error: true,
  placeholder: "Select with error",
};

export const Playground: StoryFn<SelectProps> = (args) => {
  const [value, setValue] = useState<string>("");

  return (
    <div className="space-y-4">
      <Select
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
      <div>
        <strong>Current Selection:</strong> {value || "None"}
      </div>
    </div>
  );
};
Playground.args = {
  options: countryOptions,
  placeholder: "Select a country",
};
Playground.argTypes = {
  disabled: {
    control: "boolean",
  },
  error: {
    control: "boolean",
  },
};
