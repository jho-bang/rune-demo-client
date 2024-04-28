import { createRouter } from '@rune-ts/server';
import { TicTacToeRoute } from '../../pages/TicTacToe/route';
import { TikkleRoute } from '../../pages/Tikkle/route';

export type ClientRouter = typeof TikkleRoute & typeof TicTacToeRoute;
export const ClientRouter = createRouter<ClientRouter>({
  ...TicTacToeRoute,
  ...TikkleRoute,
});
