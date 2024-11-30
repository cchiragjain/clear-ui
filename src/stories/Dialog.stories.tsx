import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Dialog, DialogProps } from "../components/base/Dialog";

export default {
  title: "Components/Dialog",
  component: Dialog,
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
    },
    title: {
      control: { type: "text" },
      defaultValue: "Dialog Title",
    },
    className: {
      control: { type: "text" },
    },
    onClose: { action: "closed" },
  },
} as Meta<DialogProps>;

const Template: StoryFn<DialogProps> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen || false);

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </button>
      <Dialog
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          args.onClose?.();
        }}
      >
        {args.children}
      </Dialog>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
  title: "Default Dialog",
  children: <p>This is a simple dialog.</p>,
};

export const WithLongContent = Template.bind({});
WithLongContent.args = {
  isOpen: false,
  title: "Dialog with Long Content",
  children: (
    <div>
      <p>This is an example of a dialog with long content.</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        vulputate euismod nisi, eget tincidunt lacus sagittis a.
      </p>
      <p>
        Morbi ac dui bibendum, ultricies massa sit amet, interdum ligula. Nullam
        vulputate orci vel urna condimentum.
      </p>
    </div>
  ),
};
