import { TextView, type ITextProps } from "./index";

export default {
  title: "Typography",
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["default", "secondary", "success", "warning", "danger"],
    },
    mode: {
      control: "radio",
      options: ["default", "delete", "underline", "italic", "strong"],
    },
  },
  render: (args: ITextProps) => {
    return new TextView(args).render();
  },
};

const defaultStories: ITextProps = {
  children: "Text",
  type: "secondary",
};

export const Text_Typography = {
  args: defaultStories,
};
