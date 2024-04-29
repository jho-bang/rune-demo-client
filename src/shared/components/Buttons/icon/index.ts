import { View, html, on, type Html } from "rune-ts";

import style from "./style.module.scss";

type ButtonType = "default" | "primary" | "danger";

interface Props {
  class?: string;
  type?: ButtonType;
  onclick?: () => void;
  icon: Html | string;
}

export class ButtonIcon extends View<Props> {
  class = this.data.class || "";
  type = this.data.type || "default";

  typeToStyle() {
    switch (this.type) {
      case "primary":
        return style.primary;
      case "danger":
        return style.danger;
      default:
        return "";
    }
  }

  @on("click")
  private _onclick() {
    if (this.data.onclick) {
      this.data.onclick();
    }
  }

  override template() {
    return html`<button
      class="${this.class} ${style.mp_btn} ${this.typeToStyle()}"
    >
      ${this.data.icon}
    </button> `;
  }
}
