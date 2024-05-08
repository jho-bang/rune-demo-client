import { CardView, type ICardPros } from "./index";

export default {
  title: "Card",
  tags: ["autodocs"],
  argTypes: {},
  render: (args: ICardPros) => {
    return new CardView(args).render();
  },
};

const stories: ICardPros = {
  cover: "",
};

export const Card = {
  args: stories,
};
