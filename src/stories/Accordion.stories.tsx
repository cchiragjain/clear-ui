import { Meta, StoryFn } from "@storybook/react";

import { Accordion, AccordionProps } from "../components/base/Accordion";

export default {
  title: "Components/Accordion",
  component: Accordion,
  argTypes: {
    multiple: {
      control: { type: "boolean" },
    },
    className: {
      control: { type: "text" },
    },
  },
} as Meta<AccordionProps>;

const sampleItems = [
  {
    id: "1",
    title: "What is React?",
    content:
      "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.",
  },
  {
    id: "2",
    title: "What is Storybook?",
    content:
      "Storybook is an open-source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.",
  },
  {
    id: "3",
    title: "What is Framer Motion?",
    content:
      "Framer Motion is a library for creating animations and transitions in React applications. It provides simple APIs for managing motion and gestures.",
  },
];

const Template: StoryFn<AccordionProps> = (args) => <Accordion {...args} />;

export const SingleExpansion = Template.bind({});
SingleExpansion.args = {
  items: sampleItems,
  multiple: false,
};

export const MultipleExpansion = Template.bind({});
MultipleExpansion.args = {
  items: sampleItems,
  multiple: true,
};

export const CustomStyling = Template.bind({});
CustomStyling.args = {
  items: sampleItems,
  multiple: true,
  className: "bg-gray-100 border-gray-300",
};
