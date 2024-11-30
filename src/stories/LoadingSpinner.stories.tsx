import { Meta, StoryFn } from "@storybook/react";
import {
  LoadingSpinner,
  LoadingSpinnerProps,
} from "../components/base/LoadingSpinner";

export default {
  title: "Components/LoadingSpinner",
  component: LoadingSpinner,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      defaultValue: "md",
    },
    className: {
      control: { type: "text" },
    },
  },
} as Meta<LoadingSpinnerProps>;

const Template: StoryFn<LoadingSpinnerProps> = (args) => (
  <LoadingSpinner {...args} />
);

export const Small = Template.bind({});
Small.args = {
  size: "sm",
};

export const Medium = Template.bind({});
Medium.args = {
  size: "md",
};

export const Large = Template.bind({});
Large.args = {
  size: "lg",
};
