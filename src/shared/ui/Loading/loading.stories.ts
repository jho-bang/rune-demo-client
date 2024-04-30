import type { Meta } from "@storybook/html";
import { LoadingView, type LoadingProps } from "./index";

const meta: Meta<LoadingProps> = {
  title: "Loading",
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    opacity: {
      control: "range",
      defaultValue: 50,
      min: 10,
      max: 100,
      step: 10,
    },
  },
  render: (args: LoadingProps) => {
    args["opacity"] = (args["opacity"] || 10) / 100;
    return new LoadingView(args).render();
  },
};

export default meta;

const loadingStories: LoadingProps = {
  text: "로딩중...",
};

export const Loading = {
  args: loadingStories,
};
