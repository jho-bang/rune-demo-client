import { View, html, on } from "rune-ts";

import style from "./style.module.scss";

export type ButtonType = "default" | "primary" | "danger";
export type ButtonSize = "small" | "default" | "large";

export interface DefaultBtnProps {
  text: HTMLElement | string;
  onClick?: () => void;
  type?: ButtonType;
  size?: ButtonSize;
}

export class ButtonDefault extends View<DefaultBtnProps> {
  text = this.data.text;
  type = this.data.type || "default";
  size = this.data.size || "large";

  override onMount() {
    if (this.data.onClick) {
      this.addEventListener("click", this.data.onClick);
    }
  }

  override template() {
    return html`
      <button class="${style.mp_btn} ${style[this.type]} ${style[this.size]}">
        ${this.text}
      </button>
    `;
  }
}
