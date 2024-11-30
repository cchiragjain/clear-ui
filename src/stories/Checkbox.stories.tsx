import { Meta, StoryFn } from "@storybook/react";

import { Checkbox, CheckboxProps } from "../components/base/Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    label: {
      control: { type: "text" },
      defaultValue: "Checkbox Label",
    },
    error: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    onChange: {
      action: "changed",
    },
  },
} as Meta<CheckboxProps>;

const Template: StoryFn<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Accept terms and conditions",
  error: false,
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  label: "This field is required",
  error: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Checkbox",
  disabled: true,
};

export const CustomClassName = Template.bind({});
CustomClassName.args = {
  label: "Custom Styled Checkbox",
  className: "border-purple-500 focus:ring-purple-500 text-purple-500",
};
