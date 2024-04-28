import { createRouter } from '@rune-ts/server';
import { TicTacToeRoute } from '../../pages/TicTacToe/route';
import { TikkleRoute } from '../../pages/Tikkle/route';
export const ClientRouter = createRouter({
    ...TicTacToeRoute,
    ...TikkleRoute,
});
