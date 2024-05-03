import { html, View } from "rune-ts";

// style
import style from "./style.module.scss";

// shared
import { ArrowButtonView } from "../../../../../shared";

interface Props {}

export class BackBtnView extends View<Props> {
  override template() {
    return html`
      <div class="${style.back_btn}">
        ${new ArrowButtonView({
          direction: "left",
          type: "primary",
          size: "large",
          onClick: () => {
            window.location.href = "/";
          },
        })}
      </div>
    `;
  }
}
