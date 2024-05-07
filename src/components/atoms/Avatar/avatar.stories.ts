import { AvatarView, type IAvatarProps } from "./index";

export default {
  title: "Avatar",
  tags: ["autodocs"],
  argTypes: {
    thumbnail_url: { control: "text" },
  },
  render: (args: IAvatarProps) => {
    return new AvatarView(args).render();
  },
};

const stories: IAvatarProps = {
  thumbnail_url:
    "https://k.kakaocdn.net/dn/FVG15/btsGq8CWStV/N2ZYQNjUI21RbPJZEd0gD0/img_110x110.jpg",
};

export const Avatar = {
  args: stories,
};
