import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { RangeSlider, RangeSliderProps } from "../components/base/RangeSlider";

export default {
  title: "Components/RangeSlider",
  component: RangeSlider,
  argTypes: {
    min: {
      control: { type: "number" },
      defaultValue: 0,
    },
    max: {
      control: { type: "number" },
      defaultValue: 100,
    },
    step: {
      control: { type: "number" },
      defaultValue: 1,
    },
    disabled: {
      control: "boolean",
    },
    onChange: { action: "changed" },
  },
} as Meta<RangeSliderProps>;

const ControlledTemplate: StoryFn<RangeSliderProps> = (args) => {
  const [value, setValue] = useState(args.value || args.min);

  return (
    <div className="space-y-4 m-8 p-8">
      <RangeSlider
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
      <div>
        <strong>Current Value:</strong> {value}
      </div>
    </div>
  );
};

export const Default = ControlledTemplate.bind({});
Default.args = {
  min: 0,
  max: 100,
};

export const WithCustomRange = ControlledTemplate.bind({});
WithCustomRange.args = {
  min: 10,
  max: 50,
  step: 2,
};

export const Disabled = ControlledTemplate.bind({});
Disabled.args = {
  min: 0,
  max: 100,
  disabled: true,
  value: 50,
};

export const SmallStep = ControlledTemplate.bind({});
SmallStep.args = {
  min: 0,
  max: 1,
  step: 0.1,
};

export const CustomStyling = ControlledTemplate.bind({});
CustomStyling.args = {
  min: 0,
  max: 100,
  className: "bg-gray-100 p-4 rounded-lg",
};

export const Playground: StoryFn<RangeSliderProps> = (args) => {
  const [value, setValue] = useState(args.value || args.min);

  return (
    <div className="space-y-4 m-8 p-8">
      <RangeSlider
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Value: {value}
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Min: {args.min} | Max: {args.max} | Step: {args.step}
          </label>
        </div>
      </div>
    </div>
  );
};
Playground.args = {
  min: 0,
  max: 100,
  step: 1,
};
Playground.argTypes = {
  min: { control: { type: "number" } },
  max: { control: { type: "number" } },
  step: { control: { type: "number" } },
};
