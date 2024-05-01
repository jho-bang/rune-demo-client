import "../style/reset.scss";

import { ClientRouter } from "../routes";
import { hydrate } from "@rune-ts/server";

hydrate(ClientRouter);
