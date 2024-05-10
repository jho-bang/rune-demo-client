import { HeartView, type IHeartProps } from "./index";

export default {
  title: "Heart",
  tags: ["autodocs"],
  argTypes: {
    is_liked: { control: "boolean" },
  },
  render: (args: IHeartProps) => {
    return new HeartView(args).render();
  },
};

const stories: IHeartProps = {
  is_liked: false,
};

export const heart = {
  args: stories,
};
