import { AutoComplete, type IAutoCompleteProps } from "./index";

export default {
  title: "AutoComplete",
  tags: ["autodocs"],
  render: (args: IAutoCompleteProps<string>) => {
    return new AutoComplete(args).render();
  },
};

const defaultStories: IAutoCompleteProps<string> = {
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

export const Auto_complete = {
  args: defaultStories,
};
