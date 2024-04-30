import { html, View } from "rune-ts";

// style
import style from "./style.module.scss";

// shared
import { ArrowLeftIcon, ButtonIcon } from "../../../../../shared";

interface Props {}

export class BackBtnView extends View<Props> {
  override template() {
    return html`
      <div class="${style.back_btn}">
        ${new ButtonIcon({
          type: "primary",
          icon: ArrowLeftIcon,
          onClick: () => {
            window.location.reload();
          },
        })}
      </div>
    `;
  }
}
