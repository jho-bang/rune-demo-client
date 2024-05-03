import { Page, html, on } from "rune-ts";

import { TictactoeTemplate } from "../../components/templates";

export class TicTacToePage extends Page<object> {
  override template() {
    return html`<div>${new TictactoeTemplate({})}</div>`;
  }
}
