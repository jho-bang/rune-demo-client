import { html, View } from "rune-ts";
import type { TPlayers } from "../../../../../types";

import style from "./style.module.scss";

interface Props {
  currentPlayer: TPlayers;
}

export class StateView extends View<Props> {
  override redraw() {
    this.element().innerHTML = `${this.data.currentPlayer} 차례`;
    return this;
  }

  override template() {
    return html`
      <h3 class="${style.status}">${this.data.currentPlayer} 차례</h3>
    `;
  }
}
