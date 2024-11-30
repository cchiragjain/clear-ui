import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { DatePicker, DatePickerProps } from "../components/base/DatePicker";

export default {
  title: "Components/DatePicker",
  component: DatePicker,
  argTypes: {
    value: {
      control: "date",
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    onChange: { action: "date selected" },
  },
} as Meta<DatePickerProps>;

// Base template for controlled DatePicker
const Template: StoryFn<DatePickerProps> = (args) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    args.value
  );

  return (
    <DatePicker
      {...args}
      value={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
        args.onChange?.(date);
      }}
    />
  );
};

// Default DatePicker story
export const Default = Template.bind({});
Default.args = {
  placeholder: "Select a date",
};

// Disabled DatePicker story
export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: "Date picker is disabled",
  disabled: true,
};

// Preselected Date story
export const PreselectedDate = Template.bind({});
PreselectedDate.args = {
  value: new Date(),
  placeholder: "Select a date",
};

// Custom Placeholder story
export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholder: "Pick your appointment date",
};

// Playground story for interactive controls
export const Playground: StoryFn<DatePickerProps> = (args) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  return (
    <div className="space-y-4">
      <DatePicker
        {...args}
        value={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          args.onChange?.(date);
        }}
      />
      <div>
        <strong>Selected Date:</strong>{" "}
        {selectedDate ? selectedDate.toDateString() : "None"}
      </div>
    </div>
  );
};
Playground.args = {
  placeholder: "Pick a date...",
  disabled: false,
};
