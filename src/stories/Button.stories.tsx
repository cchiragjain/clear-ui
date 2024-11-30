import { Meta, StoryFn } from "@storybook/react";

import { Button, ButtonProps } from "../components/base/Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    isLoading: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    children: {
      control: { type: "text" },
    },
  },
} as Meta<ButtonProps>;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  size: "md",
  children: "Primary Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  size: "md",
  children: "Secondary Button",
};

export const Outline = Template.bind({});
Outline.args = {
  variant: "outline",
  size: "md",
  children: "Outline Button",
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: "ghost",
  size: "md",
  children: "Ghost Button",
};

export const Destructive = Template.bind({});
Destructive.args = {
  variant: "destructive",
  size: "md",
  children: "Destructive Button",
};

export const Small = Template.bind({});
Small.args = {
  variant: "primary",
  size: "sm",
  children: "Small Button",
};

export const Large = Template.bind({});
Large.args = {
  variant: "primary",
  size: "lg",
  children: "Large Button",
};

export const Loading = Template.bind({});
Loading.args = {
  variant: "primary",
  size: "md",
  isLoading: true,
  children: "Loading Button",
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: "primary",
  size: "md",
  disabled: true,
  children: "Disabled Button",
};
