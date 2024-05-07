import { html, View } from "rune-ts";
import { ButtonIcon } from "../icon";

import type { ButtonSize, ButtonType } from "../default";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../../shared";

export interface IArrowButtonProps {
  direction?: "left" | "right";
  onClick?: () => void;
  type?: ButtonType;
  size?: ButtonSize;
}

export class ArrowButtonView extends View<IArrowButtonProps> {
  override template() {
    return html`
      <div>
        ${new ButtonIcon({
          icon: this.data.direction === "left" ? ArrowLeftIcon : ArrowRightIcon,
          onClick: this.data.onClick,
          type: this.data.type,
          size: this.data.size,
        })}
      </div>
    `;
  }
}
