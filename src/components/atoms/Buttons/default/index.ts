import { View, html } from "rune-ts";

import style from "./style.module.scss";
import { darkenColor, extHexToRGB, lightenColor } from "../../../../shared";

export type ButtonType =
  | "Default"
  | "Filled"
  | "Light"
  | "Outline"
  | "Subtle"
  | "Transparent";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface DefaultBtnProps {
  label: string;
  onClick?: () => void;
  variant: ButtonType;
  size: ButtonSize;
  color: string;
  radius: ButtonSize;
}

export class ButtonDefault extends View<DefaultBtnProps> {
  override onMount() {
    if (this.data.onClick) {
      this.addEventListener("click", this.data.onClick);
    }
  }

  override template({
    size = "md",
    label,
    color = "",
    radius = "md",
    variant = "Default",
  }: DefaultBtnProps) {
    return html`
      <button
        class="${style.mp_btn} ${style[variant]} ${style[size]} ${style[
          `radius-${radius}`
        ]}"
        style="--mp-color: ${extHexToRGB(
          color,
        )}; --mp-darken-color: ${darkenColor(
          color,
          20,
        )}; --mp-lighten-color: ${lightenColor(color, 80)}"
      >
        ${label}
      </button>
    `;
  }
}
