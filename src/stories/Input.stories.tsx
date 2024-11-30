import { Meta, StoryFn } from "@storybook/react";
import { Input, InputProps } from "../components/base/Input";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number"],
    },
    placeholder: {
      control: { type: "text" },
      defaultValue: "Enter text...",
    },
    error: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    className: {
      control: { type: "text" },
    },
  },
} as Meta<InputProps>;

const Template: StoryFn<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: "text",
  placeholder: "Enter your name",
};

export const WithError = Template.bind({});
WithError.args = {
  type: "text",
  placeholder: "Enter your name",
  error: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  type: "text",
  placeholder: "Input is disabled",
  disabled: true,
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  type: "password",
  placeholder: "Enter your password",
};
