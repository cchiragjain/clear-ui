import { Meta, StoryFn } from "@storybook/react";
import { Skeleton, SkeletonProps } from "../components/base/Skeleton";

export default {
  title: "Components/Skeleton",
  component: Skeleton,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["text", "circular", "rectangular"],
    },
    animation: {
      control: { type: "select" },
      options: ["pulse", "wave", "none"],
    },
    className: {
      control: "text",
    },
  },
} as Meta<SkeletonProps>;

export const Default: StoryFn<SkeletonProps> = (args) => (
  <div className="space-y-4">
    <Skeleton {...args} />
  </div>
);
Default.args = {
  variant: "text",
  animation: "pulse",
};

export const Variants: StoryFn<SkeletonProps> = () => (
  <div className="space-y-4">
    <div>
      <h3 className="mb-2">Text Variant</h3>
      <Skeleton variant="text" className="w-full h-4" />
    </div>
    <div>
      <h3 className="mb-2">Circular Variant</h3>
      <Skeleton variant="circular" className="w-16 h-16" />
    </div>
    <div>
      <h3 className="mb-2">Rectangular Variant</h3>
      <Skeleton variant="rectangular" className="w-full h-24" />
    </div>
  </div>
);

export const Animations: StoryFn<SkeletonProps> = () => (
  <div className="space-y-4">
    <div>
      <h3 className="mb-2">Pulse Animation</h3>
      <Skeleton
        variant="rectangular"
        animation="pulse"
        className="w-full h-16"
      />
    </div>
    <div>
      <h3 className="mb-2">Wave Animation</h3>
      <Skeleton
        variant="rectangular"
        animation="wave"
        className="w-full h-16"
      />
    </div>
    <div>
      <h3 className="mb-2">No Animation</h3>
      <Skeleton
        variant="rectangular"
        animation="none"
        className="w-full h-16"
      />
    </div>
  </div>
);

export const CardSkeleton: StoryFn<SkeletonProps> = () => (
  <div className="max-w-sm p-4 border rounded-lg shadow-md">
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton variant="circular" className="w-12 h-12" />
      <div className="flex-1">
        <Skeleton variant="text" className="w-3/4 h-4 mb-2" />
        <Skeleton variant="text" className="w-1/2 h-4" />
      </div>
    </div>
    <Skeleton variant="rectangular" className="w-full h-48 mb-4" />
    <div className="space-y-2">
      <Skeleton variant="text" className="w-full h-4" />
      <Skeleton variant="text" className="w-full h-4" />
      <Skeleton variant="text" className="w-3/4 h-4" />
    </div>
  </div>
);

export const ListSkeleton: StoryFn<SkeletonProps> = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4, 5].map((item) => (
      <div key={item} className="flex items-center space-x-4">
        <Skeleton variant="circular" className="w-10 h-10" />
        <div className="flex-1">
          <Skeleton variant="text" className="w-full h-4" />
        </div>
      </div>
    ))}
  </div>
);
