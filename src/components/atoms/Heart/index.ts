import { html, View } from "rune-ts";
import { HeartFillIcon, HeartOutlineIcon } from "../../../shared";

import style from "./style.module.scss";

export interface IHeartProps {
  is_like: boolean;
}

export class HeartView extends View<IHeartProps> {
  override template() {
    return html`
      <div class="${this.data.is_like ? style.on : ""}">
        ${this.data.is_like ? HeartFillIcon : HeartOutlineIcon}
      </div>
    `;
  }
}
