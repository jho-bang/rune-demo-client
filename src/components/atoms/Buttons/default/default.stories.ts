import { ButtonDefault, type DefaultBtnProps } from "./index";
import { action } from "@storybook/addon-actions";

export default {
  title: "Button",
  tags: ["autodocs"],
  argTypes: {
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
  render: (args: DefaultBtnProps) => {
    return new ButtonDefault(args).render();
  },
};

const stories: DefaultBtnProps = {
  text: "Button",
  type: "default",
  size: "default",
  onClick: action("clicked"),
};

export const Default_Button = {
  args: stories,
};
