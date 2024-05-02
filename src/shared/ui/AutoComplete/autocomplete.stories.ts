import { AutoComplete, type IAutoCompleteProps } from "./index";
import { action } from "@storybook/addon-actions";

export default {
  title: "Select",
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    onChange: { action: "onChange" },
  },
  render: (args: IAutoCompleteProps<string>) => {
    return new AutoComplete(args).render();
  },
};

const defaultStories: IAutoCompleteProps<string> = {
  onChange: action("onChange"),
  placeholder: "placeholder",
  dataSource: [
    {
      label: "Lucy",
      value: "Lucy",
    },
    {
      label: "Tom",
      value: "Tom",
    },
    {
      label: "Jack",
      value: "Jack",
    },
    {
      label: "Jason",
      value: "Jason",
    },
  ],
};

export const Auto_Complete = {
  args: defaultStories,
};
