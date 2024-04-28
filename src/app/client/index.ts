import "../style/reset.scss";
import "../style/main/main.scss";

import { ClientRouter } from "../routes";
import { hydrate } from "@rune-ts/server";

hydrate(ClientRouter);
