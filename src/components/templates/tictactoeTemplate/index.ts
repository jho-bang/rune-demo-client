import { html, on, View } from "rune-ts";
import { map, pipe, range, toArray } from "@fxts/core";

import {
  RequestEvent,
  ResetButtonView,
  SquareListView,
  StateView,
  TitleView,
} from "./oragnisms";

interface Props {}

export class TictactoeTemplate extends View<Props> {
  stateView = new StateView({ currentPlayer: "X" });
  squareListView = new SquareListView(
    pipe(
      range(0, 9),
      map((v) => ({ value: v })),
      toArray,
    ),
  );
  resetButtonView = new ResetButtonView({
    reset: this.squareListView.resetState,
  });

  @on(RequestEvent)
  private _on(ev: RequestEvent) {
    this.stateView.data.currentPlayer = ev.detail;
    this.stateView.redraw();
  }

  override template() {
    return html` <div>
      <div>${new TitleView({ title: "와아 틱택토!" })}</div>
      <div>${this.stateView}</div>
      <div id="board">
        <div>${this.squareListView}</div>
        <div>${this.resetButtonView}</div>
      </div>
    </div>`;
  }
}
