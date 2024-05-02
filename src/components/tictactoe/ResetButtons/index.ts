// base
import { View, html, on } from "rune-ts";
import { pipe, each } from "@fxts/core";

// css
import style from "./style.module.scss";

// shared
import { ButtonDefault } from "../../../shared";

interface Props {
  reset: () => void;
}

export class ResetButtonView extends View<Props> {
  @on("click")
  private _onClick() {
    pipe(
      document.querySelectorAll(".square"),
      each((v) => (v.textContent = "")),
      () => this.data.reset(),
    );
  }

  override template() {
    return html`
      <div class="${style.restartButton}">
        ${new ButtonDefault({
          text: "다시 시작",
          type: "primary",
          size: "large",
        })}
      </div>
    `;
  }
}
