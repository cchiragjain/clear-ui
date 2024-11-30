import { Meta, StoryFn } from "@storybook/react";
import { HoverCard, HoverCardProps } from "../components/base/HoverCard";

export default {
  title: "Components/HoverCard",
  component: HoverCard,
  argTypes: {
    openDelay: {
      control: { type: "number" },
      defaultValue: 200,
    },
    closeDelay: {
      control: { type: "number" },
      defaultValue: 200,
    },
    className: {
      control: { type: "text" },
    },
  },
} as Meta<HoverCardProps>;

const Template: StoryFn<HoverCardProps> = (args) => <HoverCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  trigger: (
    <button className="p-2 bg-blue-500 text-white rounded">Hover me</button>
  ),
  content: (
    <div>
      <p className="text-sm text-gray-700">This is the hover card content.</p>
    </div>
  ),
};

export const CustomStyling = Template.bind({});
CustomStyling.args = {
  trigger: (
    <button className="p-2 bg-green-500 text-white rounded">Hover over</button>
  ),
  content: (
    <div className="p-2 rounded">
      <p className="text-sm text-green-400">Custom styled hover content!</p>
    </div>
  ),
  className: "bg-red-700",
};

export const DelayedHover = Template.bind({});
DelayedHover.args = {
  trigger: (
    <span className="cursor-pointer underline text-blue-500">
      Hover over this text
    </span>
  ),
  content: (
    <div>
      <p className="text-sm text-gray-700">Content appears after a delay!</p>
    </div>
  ),
  openDelay: 500,
  closeDelay: 500,
};
