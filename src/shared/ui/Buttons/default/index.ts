import { View, html } from "rune-ts";

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
  override onMount() {
    if (this.data.onClick) {
      this.addEventListener("click", this.data.onClick);
    }
  }

  override template({
    size = "default",
    text,
    type = "default",
  }: DefaultBtnProps) {
    return html`
      <button class="${style.mp_btn} ${style[type]} ${style[size]}">
        ${text}
      </button>
    `;
  }
}
