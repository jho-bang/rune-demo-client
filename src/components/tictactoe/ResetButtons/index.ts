// base
import { View, html, on } from "rune-ts";
import { pipe, each } from "@fxts/core";

// css
import style from "./style.module.scss";

// stores
import { ticTacToeStore } from "../../../stores";

// shared
import { ButtonDefault } from "../../../shared";

interface Props {}

export class ResetButtonView extends View<Props> {
  private onClick() {
    pipe(
      document.querySelectorAll(".square"),
      each((v) => (v.textContent = "")),
      () => ticTacToeStore.resetStore(),
    );
  }

  override template() {
    return html`
      <div class="${style.restartButton}">
        ${new ButtonDefault({
          text: "다시 시작",
          type: "primary",
          onClick: this.onClick,
          size: "large",
        })}
      </div>
    `;
  }
}

export function resetButtonRender() {
  const resetButton = new ResetButtonView({}).render();
  document.querySelector("#board")!.append(resetButton);
}
