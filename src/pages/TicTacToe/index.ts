import { Page, html, on } from "rune-ts";

// widgets
import {
  SquareListViewRender,
  resetButtonRender,
} from "../../widgets/TicTacToe";

// features
import { ticTacToeStore, RequestEvent } from "../../features";

// style
import mainClass from "./style.module.scss";

export class TicTacToePage extends Page<object> {
  @on(RequestEvent)
  private _on() {
    this.element().querySelector(".status")!.innerHTML =
      `${ticTacToeStore.getStore().currentPlayer} 차례`;
  }

  override template() {
    return html`<div>
      <h1 class="${mainClass.title}">와아 틱택토!</h1>
      <h3 class="${mainClass.status} status">
        ${ticTacToeStore.getStore().currentPlayer} 차례
      </h3>
      <div id="board"></div>
    </div>`;
  }

  override onRender() {
    SquareListViewRender();
    resetButtonRender();
  }
}
