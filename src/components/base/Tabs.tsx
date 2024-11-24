import { motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

export interface Tab {
  /** Unique identifier for the tab */
  id: string;
  /** Label text to display in the tab */
  label: string;
  /** Content to show when tab is active */
  content: React.ReactNode;
}

export interface TabsProps {
  /** Array of tab items */
  tabs: Tab[];
  /** ID of the default active tab */
  defaultTab?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A component that implements a tabbed interface, where users can switch between different sections of content.
 * This component supports smooth transitions between tabs and keyboard navigation.
 *
 * @param {TabsProps} props - The props for the Tabs component.
 * @param {Tab[]} props.tabs - An array of tabs, each containing an id, label, and content.
 * @param {string} [props.defaultTab] - The id of the default active tab.
 * @param {string} [props.className] - Additional CSS classes to apply.
 * @returns {JSX.Element} The Tabs component.
 *
 * @example
 * ```tsx
 * <Tabs
 *   tabs={[
 *     { id: 'tab1', label: 'First Tab', content: <FirstTabContent /> },
 *     { id: 'tab2', label: 'Second Tab', content: <SecondTabContent /> }
 *   ]}
 *   defaultTab="tab1"
 * />
 * ```
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ tabs, defaultTab, className }, ref) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "py-4 px-1 relative font-medium text-sm focus:outline-blue-600",
                  activeTab === tab.id
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                )}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <div>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              role="tabpanel"
              id={`tabpanel-${tab.id}`}
              aria-labelledby={tab.id}
              hidden={activeTab !== tab.id}
            >
              {activeTab === tab.id && tab.content}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
