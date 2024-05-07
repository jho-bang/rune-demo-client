import { HeartView, type IHeartProps } from "./index";

export default {
  title: "Heart",
  tags: ["autodocs"],
  argTypes: {
    is_like: { control: "boolean" },
  },
  render: (args: IHeartProps) => {
    return new HeartView(args).render();
  },
};

const stories: IHeartProps = {
  is_like: false,
};

export const heart = {
  args: stories,
};
