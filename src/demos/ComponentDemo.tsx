import { useState } from "react";
import { Accordion } from "../components/base/Accordion";
import { Button } from "../components/base/Button";
import { Checkbox } from "../components/base/Checkbox";
import { Dialog } from "../components/base/Dialog";
import { HoverCard } from "../components/base/HoverCard";
import { Input } from "../components/base/Input";
import { Label } from "../components/base/Label";
import { LoadingSpinner } from "../components/base/LoadingSpinner";
import { MultiSelect } from "../components/base/MultiSelect";
import { RadioGroup } from "../components/base/RadioGroup";
import { RangeSlider } from "../components/base/RangeSlider";
import { Select } from "../components/base/Select";
import { Sidebar } from "../components/base/Sidebar";
import { Skeleton } from "../components/base/Skeleton";
import { TextArea } from "../components/base/TextArea";
import { useToast } from "../hooks/use-toast";
import { demoData } from "../lib/demo-data";

export function ComponentDemo() {
  const { showToast } = useToast();

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
  const [theme, setTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast("Loading complete!", "success");
    }, 2000);
  };

  const showToastDemo = (type: "info" | "success" | "warning" | "error") => {
    const messages = {
      info: "This is an information message",
      success: "Operation completed successfully!",
      warning: "Please proceed with caution",
      error: "An error has occurred",
    };
    showToast(messages[type], type);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-8"> Component Library Demo </h1>

        {/* Button Variants */}
        <section className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-xl font-semibold mb-4">Button Variants</h2>

          <div className="space-y-4">
            <div>
              <Label>Button Styles</Label>
              <div className="flex flex-wrap gap-2">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="destructive">Destructive Button</Button>
              </div>
            </div>

            <div>
              <Label>Button Sizes</Label>
              <div className="flex items-center gap-2">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <Label>Button States</Label>
              <div className="flex gap-2">
                <Button disabled>Disabled</Button>
                <Button isLoading>Loading</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Basic Input Components */}
        <section className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-xl font-semibold mb-4">Basic Input Components</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="demo-input">Text Input</Label>
              <Input id="demo-input" placeholder="Enter text..." />
            </div>

            <div>
              <Label htmlFor="demo-textarea">Text Area</Label>
              <TextArea id="demo-textarea" placeholder="Enter long text..." />
            </div>

            <div>
              <Label htmlFor="demo-checkbox">Checkbox</Label>
              <Checkbox id="demo-checkbox" label="Subscribe to newsletter" />
            </div>
          </div>
        </section>

        {/* Selection Components */}
        <section className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-xl font-semibold mb-4">Selection Components</h2>

          <div className="space-y-4">
            <div>
              <Label>Select</Label>
              <Select
                options={demoData.selectOptions}
                value={selectedValue}
                onChange={setSelectedValue}
                placeholder="Choose a framework"
              />
            </div>
            <div>
              <Label>Multi Select</Label>
              <MultiSelect
                options={demoData.interests}
                value={selectedValues}
                onChange={setSelectedValues}
                placeholder="Choose programming languages"
              />
            </div>
            <div>
              <Label>Multi Select with Images</Label>
              <MultiSelect
                options={demoData.multiSelectOptionsWithImages}
                value={selectedValues2}
                onChange={setSelectedValues2}
                placeholder="Choose programming languages"
              />
            </div>

            <div>
              <Label>Radio Group</Label>
              <RadioGroup
                name="theme"
                options={demoData.radioOptions}
                value={theme}
                onChange={setTheme}
              />
            </div>
          </div>
        </section>

        {/* Feedback Components */}
        <section className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-xl font-semibold mb-4">Feedback Components</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Toast Types</Label>
              <div className="flex gap-2 flex-wrap">
                <Button onClick={() => showToastDemo("info")} variant="outline">
                  Info Toast
                </Button>
                <Button
                  onClick={() => showToastDemo("success")}
                  variant="outline"
                >
                  Success Toast
                </Button>
                <Button
                  onClick={() => showToastDemo("warning")}
                  variant="outline"
                >
                  Warning Toast
                </Button>
                <Button
                  onClick={() => showToastDemo("error")}
                  variant="outline"
                >
                  Error Toast
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="space-y-2">
                <Label>Loading States</Label>
                <div className="space-y-2">
                  <Button onClick={handleLoadingDemo} isLoading={isLoading}>
                    {isLoading ? "Loading..." : "Start Loading"}
                  </Button>
                  <div className="space-y-2">
                    <Skeleton className="w-full h-8" variant={"circular"} />
                    <Skeleton className="w-1/2 h-8" />
                    <Skeleton className="w-3/4 h-4" variant={"text"} />
                    <Skeleton className="w-1/2 h-8" animation={"pulse"} />
                    <Skeleton className="w-1/2 h-8" animation={"wave"} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Loading Spinner</Label>
                <div className="flex items-center gap-4">
                  <LoadingSpinner size="sm" />
                  <LoadingSpinner size="md" />
                  <LoadingSpinner size="lg" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Components */}
        <section className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-xl font-semibold mb-4">Interactive Components</h2>

          <div className="space-y-4">
            <div>
              <Label>Accordion</Label>
              <Accordion items={demoData.accordionItems} />
            </div>

            <div>
              <Label>Accordion With Multiple Open at same time</Label>
              <Accordion items={demoData.accordionItems} multiple={true} />
            </div>

            <div>
              <Label>Range Slider</Label>
              <RangeSlider
                min={0}
                max={100}
                value={sliderValue}
                onChange={setSliderValue}
              />
            </div>

            <div>
              <Label>Hover Card</Label>
              <div className="flex gap-2">
                <HoverCard
                  trigger={<Button variant="outline">Product Info</Button>}
                  content={
                    <div>
                      <h3 className="font-semibold mb-2">Premium Package</h3>
                      <p className="text-sm text-gray-600">
                        Our premium package includes all features plus priority
                        support.
                      </p>
                      <div className="mt-2 font-semibold text-blue-600">
                        $99/month
                      </div>
                    </div>
                  }
                />
              </div>
            </div>

            <div>
              <Label>Sidebar</Label>
              <Sidebar>
                <div className="p-4">
                  <h3 className="font-semibold">Sidebar Content</h3>
                  <p>This is the sidebar content.</p>
                </div>
              </Sidebar>
              <Sidebar position="right">
                <div className="p-4">
                  <h3 className="font-semibold">Sidebar Content</h3>
                  <p>This is the sidebar content from right.</p>
                </div>
              </Sidebar>
            </div>

            <div>
              <Label>Dialog</Label>
              <Button onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>
              <Dialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title="Dialog Example"
              >
                <p>This is a dialog content example.</p>
                <div className="mt-4 flex justify-end">
                  <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
                </div>
              </Dialog>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
