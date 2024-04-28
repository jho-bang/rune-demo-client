// base
import { View, html, on } from "rune-ts";
import { pipe, each } from "@fxts/core";

// store
import { store } from "../../../features/TicTacToe/store";

// css
import style from "./style.module.scss";
import { ButtonDefault } from "../../../shared/components";

interface Props {}

export class ResetButtonView extends View<Props> {
  @on("click")
  private _click() {
    pipe(
      document.querySelectorAll(".square"),
      each((v) => (v.textContent = "")),
      () => store.resetStore(),
    );
  }

  override template() {
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

export function resetButtonRender() {
  const resetButton = new ResetButtonView({}).render();
  document.querySelector("#board")!.append(resetButton);
}
