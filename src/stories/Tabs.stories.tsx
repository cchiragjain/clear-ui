import { Meta, StoryFn } from "@storybook/react";
import { Tabs, TabsProps } from "../components/base/Tabs";

export default {
  title: "Components/Tabs",
  component: Tabs,
  argTypes: {
    defaultTab: {
      control: "text",
    },
    className: {
      control: "text",
    },
  },
} as Meta<TabsProps>;

const DefaultTemplate: StoryFn<TabsProps> = (args) => <Tabs {...args} />;

export const Default = DefaultTemplate.bind({});
Default.args = {
  defaultTab: "profile",
  tabs: [
    {
      id: "profile",
      label: "Profile",
      content: (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Profile Information</h2>
          <p>View and edit your personal details here.</p>
        </div>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      content: (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Account Settings</h2>
          <p>Manage your account preferences and security options.</p>
        </div>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      content: (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
          <p>Customize how and when you receive notifications.</p>
        </div>
      ),
    },
  ],
};

export const WithCustomStyling: StoryFn<TabsProps> = () => (
  <Tabs
    className="bg-gray-100 p-4 rounded-lg"
    tabs={[
      {
        id: "design",
        label: "Design",
        content: (
          <div className="p-4 bg-white rounded-b-lg">
            <h2 className="text-xl font-bold mb-4">Design System</h2>
            <p>Explore our comprehensive design guidelines.</p>
          </div>
        ),
      },
      {
        id: "components",
        label: "Components",
        content: (
          <div className="p-4 bg-white rounded-b-lg">
            <h2 className="text-xl font-bold mb-4">Component Library</h2>
            <p>Browse our reusable UI components.</p>
          </div>
        ),
      },
    ]}
  />
);

export const WithComplexContent: StoryFn<TabsProps> = () => (
  <Tabs
    tabs={[
      {
        id: "overview",
        label: "Overview",
        content: (
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded">
                <h3 className="font-bold mb-2">Total Users</h3>
                <p className="text-2xl">1,234</p>
              </div>
              <div className="bg-green-100 p-4 rounded">
                <h3 className="font-bold mb-2">Revenue</h3>
                <p className="text-2xl">$45,678</p>
              </div>
              <div className="bg-purple-100 p-4 rounded">
                <h3 className="font-bold mb-2">Growth</h3>
                <p className="text-2xl">+12%</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "details",
        label: "Details",
        content: (
          <div className="p-4">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Metric</th>
                  <th className="p-2 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">Total Signups</td>
                  <td className="p-2">1,500</td>
                </tr>
                <tr>
                  <td className="p-2">Active Users</td>
                  <td className="p-2">950</td>
                </tr>
                <tr>
                  <td className="p-2">Conversion Rate</td>
                  <td className="p-2">63%</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
    ]}
  />
);
