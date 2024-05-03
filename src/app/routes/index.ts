import { createRouter } from "@rune-ts/server";
import { TicTacToeRoute } from "../../pages/TicTacToe/route";
import { TikkleRoute } from "../../pages/Home/route";
import { TikkleDetailRoute } from "../../pages/Detail/route";
import { TikkleLoginRoute } from "../../pages/Login/route";

export type ClientRouter = typeof TikkleRoute &
  typeof TicTacToeRoute &
  typeof TikkleDetailRoute &
  typeof TikkleLoginRoute;

export const ClientRouter = createRouter<ClientRouter>({
  ...TicTacToeRoute,
  ...TikkleRoute,
  ...TikkleDetailRoute,
  ...TikkleLoginRoute,
});
