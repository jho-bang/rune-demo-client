import { View, html, on, type Html } from "rune-ts";

import style from "./style.module.scss";
import { type ButtonSize, type ButtonType } from "../default";

export interface IconButtonProps {
  class?: string;
  type?: ButtonType;
  size?: ButtonSize;
  onClick?: () => void;
  icon: Html | string;
}

export class ButtonIcon extends View<IconButtonProps> {
  class = this.data.class || "";
  type = this.data.type || "default";
  size = this.data.size || "medium";

  @on("click")
  private _onClick() {
    if (this.data.onClick) this.data.onClick();
  }

  override template() {
    return html`<button
      class="${this.class} ${style.mp_btn} ${style[this.type]} ${style[
        this.size
      ]}"
    >
      ${this.data.icon}
    </button> `;
  }
}
