import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import {
  DateRange,
  DateRangePicker,
  DateRangePickerProps,
} from "../components/base/DateRangePicker";

export default {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  argTypes: {
    value: {
      control: false,
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    onChange: { action: "date range selected" },
  },
} as Meta<DateRangePickerProps>;

// Base template for controlled DateRangePicker
const Template: StoryFn<DateRangePickerProps> = (args) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    args.value
  );

  return (
    <DateRangePicker
      {...args}
      value={selectedRange}
      onChange={(range) => {
        setSelectedRange(range);
        args.onChange?.(range);
      }}
    />
  );
};

// Default DateRangePicker story
export const Default = Template.bind({});
Default.args = {
  placeholder: "Select date range",
};

// Disabled DateRangePicker story
export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: "Date range picker is disabled",
  disabled: true,
};

// Preselected Range story
export const PreselectedRange = Template.bind({});
PreselectedRange.args = {
  value: {
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 7)),
  },
  placeholder: "Select date range",
};

// Custom Placeholder story
export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholder: "Pick your travel dates",
};

// Playground story for interactive controls
export const Playground: StoryFn<DateRangePickerProps> = (args) => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  return (
    <div className="space-y-4">
      <DateRangePicker
        {...args}
        value={selectedRange}
        onChange={(range) => {
          setSelectedRange(range);
          args.onChange?.(range);
        }}
      />
      <div>
        <strong>Selected Range:</strong>{" "}
        {selectedRange
          ? `${selectedRange.start?.toDateString() || "Not selected"} - ${
              selectedRange.end?.toDateString() || "Not selected"
            }`
          : "None"}
      </div>
    </div>
  );
};
Playground.args = {
  placeholder: "Pick a date range...",
  disabled: false,
};
