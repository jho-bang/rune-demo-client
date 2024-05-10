import { ButtonDefault, type DefaultBtnProps } from "./index";
import { action } from "@storybook/addon-actions";

export default {
  title: "Button",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    variant: {
      options: [
        "Default",
        "Filled",
        "Light",
        "Outline",
        "Subtle",
        "Transparent",
      ],
      control: { type: "select" },
    },
    color: { control: "color" },
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
    radius: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
    onClick: { action: "clicked" },
  },
  render: (args: DefaultBtnProps) => {
    return new ButtonDefault(args).render();
  },
};

const stories: DefaultBtnProps = {
  label: "Button",
  variant: "Filled",
  size: "md",
  radius: "md",
  color: "#4f5ee8",
  onClick: action("clicked"),
};

export const Default_Button = {
  args: stories,
};
