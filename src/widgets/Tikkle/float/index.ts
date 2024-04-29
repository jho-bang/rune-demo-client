import { html, View } from "rune-ts";
import style from "./style.module.scss";

interface Props {
  floatList: any[];
}

export class FloatView extends View<Props> {
  override template() {
    return html`
      <div class="${style.float}">
        ${this.data.floatList.map((float) => {
          return html`<div class=${style["float-item"]}>${float}</div>`;
        })}
      </div>
    `;
  }
}
