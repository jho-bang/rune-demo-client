import { html, View } from "rune-ts";
import { extHexToRGB } from "../../../../shared";

import style from "./style.module.scss";

export interface IHighlightProps {
  children: string;
  highlight?: string;
  color?: string;
}

export class HighlightView extends View<IHighlightProps> {
  override onMount() {
    if (this.data.highlight) {
      const regex = new RegExp(`(${this.data.highlight})`, "gi");
      const text = this.data.children.replace(
        regex,
        `<span class="${style.highlight}">$1</span>`,
      );

      this.element()!.innerHTML = text;
    }
  }

  override template({ children, color = "" }: IHighlightProps) {
    return html`<div
      class="${style.container}"
      style="--mp-color: ${extHexToRGB(color)};"
    >
      ${children}
    </div>`;
  }
}
