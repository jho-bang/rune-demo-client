import { createRouter } from "@rune-ts/server";

import { Route } from "../../pages";

export type ClientRouter = typeof Route;

export const ClientRouter = createRouter<ClientRouter>({
  ...Route,
});
