import { TitleView, type ITitleProps } from "./index";

export default {
  title: "Typography",
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
    level: { control: "radio", options: [1, 2, 3, 4, 5] },
  },
  render: (args: ITitleProps) => {
    return new TitleView(args).render();
  },
};

const defaultStories: ITitleProps = {
  children: "Title",
  level: 1,
};

export const Title_Typography = {
  args: defaultStories,
};
