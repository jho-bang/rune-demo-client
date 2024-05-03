import { html, View } from "rune-ts";
import { ButtonIcon } from "../icon";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../assets";

export interface IArrowButtonProps {
  direction?: "left" | "right";
  onClick?: () => void;
}

export class ArrowButtonView extends View<IArrowButtonProps> {
  override template() {
    return html`
      <div>
        ${new ButtonIcon({
          type: "primary",
          icon: this.data.direction === "left" ? ArrowLeftIcon : ArrowRightIcon,
          onClick: this.data.onClick,
        })}
      </div>
    `;
  }
}
