import { View, html, type Html } from "rune-ts";

import style from "./style.module.scss";
import { type ButtonSize, type ButtonType } from "../default";

export interface IconButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  onClick?: () => void;
  icon: Html | string;
  classes?: string;
}

export class ButtonIcon extends View<IconButtonProps> {
  override onMount() {
    this.addEventListener("click", () => {
      if (this.data.onClick) this.data.onClick();
    });
  }

  override template({
    classes = "",
    size = "md",
    type = "Filled",
  }: IconButtonProps) {
    return html`<button
      class="${classes} ${style.mp_btn} ${style[type]} ${style[size]}"
    >
      ${this.data.icon}
    </button> `;
  }
}
