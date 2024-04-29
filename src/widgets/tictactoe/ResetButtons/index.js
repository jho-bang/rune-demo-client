var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
// base
import { View, html, on } from "rune-ts";
import { pipe, each } from "@fxts/core";
// store
import { store } from "../../../features/TicTacToe/store/index.js";
// css
import style from "./style.module.scss";
import { ButtonDefault } from "../../shared/components/index.js";
export class ResetButtonView extends View {
  _click() {
    pipe(
      document.querySelectorAll(".square"),
      each((v) => (v.textContent = "")),
      () => store.resetStore(),
    );
  }
  template() {
    return html`
      <div>
        ${new ButtonDefault({
          text: "다시 시작",
          class: `${style.restartButton}`,
          type: "primary",
        })}
      </div>
    `;
  }
}
__decorate([on("click")], ResetButtonView.prototype, "_click", null);
export function resetButtonRender() {
  const resetButton = new ResetButtonView({}).render();
  document.querySelector("#board").append(resetButton);
}
