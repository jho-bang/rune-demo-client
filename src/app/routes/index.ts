import { createRouter } from "@rune-ts/server";

import { TikkleRoute } from "../../pages/Home/route";
import { TikkleDetailRoute } from "../../pages/Detail/route";
import { TikkleLoginRoute } from "../../pages/Login/route";

export type ClientRouter = typeof TikkleRoute &
  typeof TikkleDetailRoute &
  typeof TikkleLoginRoute;

export const ClientRouter = createRouter<ClientRouter>({
  ...TikkleRoute,
  ...TikkleDetailRoute,
  ...TikkleLoginRoute,
});
