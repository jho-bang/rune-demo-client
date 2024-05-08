import { FloatButtonView, type IFloatButtonProps } from "./index";
import { ButtonIcon } from "../icon";
import { SmileOutlineIcon } from "../../../../shared";

export default {
  title: "Button",
  tags: ["autodocs"],
  argTypes: {
    right: { control: "number" },
    bottom: { control: "number" },
  },
  render: (args: IFloatButtonProps) => {
    return new FloatButtonView(args).render();
  },
};

const stories: IFloatButtonProps = {
  right: 20,
  bottom: 20,
  children: new ButtonIcon({ icon: SmileOutlineIcon, type: "primary" }),
};

export const float_Button = {
  args: stories,
};
