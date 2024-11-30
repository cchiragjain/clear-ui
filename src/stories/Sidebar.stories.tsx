import { Meta, StoryFn } from "@storybook/react";
import { Bell, HelpCircle, Settings, User } from "lucide-react";
import { Sidebar, SidebarProps } from "../components/base/Sidebar";

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    className: {
      control: "text",
    },
  },
} as Meta<SidebarProps>;

const DefaultTemplate: StoryFn<SidebarProps> = (args) => (
  <Sidebar {...args}>
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Sidebar Content</h2>
      <div className="flex items-center space-x-2 p-2 gap-2 hover:bg-gray-100 rounded-lg">
        <User className="w-5 h-5" />
        <span>Profile</span>
      </div>
      <div className="flex items-center space-x-2 p-2 gap-2 hover:bg-gray-100 rounded-lg">
        <Settings className="w-5 h-5" />
        <span>Settings</span>
      </div>
      <div className="flex items-center space-x-2 p-2 gap-2 hover:bg-gray-100 rounded-lg">
        <Bell className="w-5 h-5" />
        <span>Notifications</span>
      </div>
      <div className="flex items-center space-x-2 p-2 gap-2 hover:bg-gray-100 rounded-lg">
        <HelpCircle className="w-5 h-5" />
        <span>Help</span>
      </div>
    </div>
  </Sidebar>
);

export const LeftSidebar = DefaultTemplate.bind({});
LeftSidebar.args = {
  position: "left",
};

export const RightSidebar = DefaultTemplate.bind({});
RightSidebar.args = {
  position: "right",
};

export const CustomTrigger: StoryFn<SidebarProps> = (args) => (
  <Sidebar
    {...args}
    trigger={
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Open Custom Sidebar
      </button>
    }
  >
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Custom Trigger Sidebar</h2>
      <p>
        This sidebar uses a custom trigger button instead of the default menu
        icon.
      </p>
    </div>
  </Sidebar>
);

export const CustomStyled: StoryFn<SidebarProps> = (args) => (
  <Sidebar
    {...args}
    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
  >
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Styled Sidebar</h2>
      <p>This sidebar demonstrates custom styling using Tailwind classes.</p>
    </div>
  </Sidebar>
);
