import { Meta, StoryFn } from "@storybook/react";
import { Label, LabelProps } from "../components/base/Label";

export default {
  title: "Components/Label",
  component: Label,
  argTypes: {
    error: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    required: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    className: {
      control: { type: "text" },
    },
  },
} as Meta<LabelProps>;

const Template: StoryFn<LabelProps> = (args) => <Label {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Email Address",
};

export const WithError = Template.bind({});
WithError.args = {
  children: "Email Address",
  error: true,
};

export const Required = Template.bind({});
Required.args = {
  children: "Email Address",
  required: true,
};

export const WithErrorAndRequired = Template.bind({});
WithErrorAndRequired.args = {
  children: "Email Address",
  error: true,
  required: true,
};
