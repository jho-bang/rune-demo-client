import { html, View } from "rune-ts";

// style
import style from "./style.module.scss";

// atoms
import { ArrowButtonView } from "../../atoms";

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
