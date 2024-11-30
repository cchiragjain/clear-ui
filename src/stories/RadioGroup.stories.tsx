import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import {
  RadioGroup,
  RadioGroupProps,
  RadioOption,
} from "../components/base/RadioGroup";

const planOptions: RadioOption[] = [
  {
    value: "basic",
    label: "Basic Plan",
    description: "Perfect for individuals and small teams",
  },
  {
    value: "pro",
    label: "Pro Plan",
    description: "Advanced features for growing businesses",
  },
  {
    value: "enterprise",
    label: "Enterprise Plan",
    description: "Comprehensive solutions for large organizations",
  },
  {
    value: "disabled",
    label: "Disabled Plan",
    description: "This option is currently unavailable",
    disabled: true,
  },
];

const toppingOptions: RadioOption[] = [
  { value: "pepperoni", label: "Pepperoni" },
  { value: "mushroom", label: "Mushroom" },
  { value: "onion", label: "Onion" },
];

export default {
  title: "Components/RadioGroup",
  component: RadioGroup,
  argTypes: {
    onChange: { action: "changed" },
    orientation: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
    },
    className: {
      control: "text",
    },
  },
} as Meta<RadioGroupProps>;

const ControlledTemplate: StoryFn<RadioGroupProps> = (args) => {
  const [value, setValue] = useState<string>("");

  return (
    <RadioGroup
      {...args}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const Default = ControlledTemplate.bind({});
Default.args = {
  name: "plans",
  options: planOptions,
};

export const Horizontal = ControlledTemplate.bind({});
Horizontal.args = {
  name: "toppings",
  options: toppingOptions,
  orientation: "horizontal",
};

export const WithDisabledOption = ControlledTemplate.bind({});
WithDisabledOption.args = {
  name: "plans",
  options: planOptions,
};

export const CustomStyling = ControlledTemplate.bind({});
CustomStyling.args = {
  name: "custom",
  options: planOptions,
  className: "bg-gray-100 p-4 rounded-lg",
};

export const Playground: StoryFn<RadioGroupProps> = (args) => {
  const [value, setValue] = useState<string>("");

  return (
    <div className="space-y-4">
      <RadioGroup
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
  name: "playground",
  options: planOptions,
  orientation: "vertical",
};
Playground.argTypes = {
  orientation: {
    control: { type: "select" },
    options: ["vertical", "horizontal"],
  },
};
