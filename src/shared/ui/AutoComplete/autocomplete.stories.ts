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
      label: "A",
      value: "a",
    },
    {
      label: "B",
      value: "b",
    },
  ],
};

export const Auto_complete = {
  args: defaultStories,
};
