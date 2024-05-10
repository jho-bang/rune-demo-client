import { HighlightView, type IHighlightProps } from "./index";

export default {
  title: "Typography",
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
    highlight: { control: "text" },
    color: { control: "color" },
  },
  render: (args: IHighlightProps) => {
    return new HighlightView(args).render();
  },
};

const stories: IHighlightProps = {
  children: "Highlight This, definitely THIS and also this!",
  highlight: "this",
  color: "#c0abff",
};

export const HighLight_Typography = {
  args: stories,
};
