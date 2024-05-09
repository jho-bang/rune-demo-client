import { html, View } from "rune-ts";
import { HeartFillIcon, HeartOutlineIcon } from "../../../shared";

import style from "./style.module.scss";

export interface IHeartProps {
  is_liked: boolean;
}

export class HeartView extends View<IHeartProps> {
  override template() {
    return html`
      <div class="${this.data.is_liked ? style.on : ""}">
        ${this.data.is_liked ? HeartFillIcon : HeartOutlineIcon}
      </div>
    `;
  }
}
