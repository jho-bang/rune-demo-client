import { createRouter } from "@rune-ts/server";
import { TicTacToeRoute } from "../../pages/TicTacToe/route";
import { TikkleRoute } from "../../pages/Home/route";
import { TikkleDetailRoute } from "../../pages/Detail/route";

export type ClientRouter = typeof TikkleRoute &
  typeof TicTacToeRoute &
  typeof TikkleDetailRoute;

export const ClientRouter = createRouter<ClientRouter>({
  ...TicTacToeRoute,
  ...TikkleRoute,
  ...TikkleDetailRoute,
});
