import { html, View } from "rune-ts";

import style from "./style.module.scss";

export interface IFloatButtonProps {
  children: any;
  bottom?: number;
  right?: number;
  onClick?: () => void;
}

export class FloatButtonView extends View<IFloatButtonProps> {
  override onMount() {
    this.element().addEventListener("click", () => {
      if (this.data.onClick) {
        this.data.onClick();
      }
    });
  }

  override template({ children, bottom = 0, right = 0 }: IFloatButtonProps) {
    return html`
      <div
        class="${style.float_button}"
        style="bottom: ${bottom}px; right: ${right}px"
      >${children}</div>
    `;
  }
}
