import { ArrowButtonView, type IArrowButtonProps } from "./index";
import { action } from "@storybook/addon-actions";

export default {
  title: "Button",
  tags: ["autodocs"],
  argTypes: {
    direction: {
      options: ["left", "right"],
      control: { type: "select" },
    },
    type: {
      options: ["primary", "default", "danger"],
      control: { type: "select" },
    },
    size: {
      options: ["large", "default", "small"],
      control: { type: "select" },
    },
    onClick: { action: "clicked" },
  },
  render: (args: IArrowButtonProps) => {
    return new ArrowButtonView(args).render();
  },
};

const stories: IArrowButtonProps = {
  direction: "left",
  type: "default",
  size: "default",
  onClick: action("clicked"),
};

export const arrow_Button = {
  args: stories,
};
