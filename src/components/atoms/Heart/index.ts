import { html, View } from "rune-ts";
import { HeartFillIcon, HeartOutlineIcon } from "../../../shared";

import style from "./style.module.scss";

export interface IHeartProps {
  is_liked: boolean;
}

class HeartIcon extends View<{ is_liked: boolean }> {
  override template() {
    return html`<div class="${this.data.is_liked ? style.on : style.off}">
      ${this.data.is_liked ? HeartFillIcon : HeartOutlineIcon}
    </div>`;
  }
}

export class HeartView extends View<IHeartProps> {
  is_liked = this.data.is_liked;

  public toggle = () => {
    this.is_liked = !this.is_liked;
    const heart = this.element();
    if (heart) {
      heart.innerHTML = "";
      heart.append(new HeartIcon({ is_liked: this.is_liked }).render());
    }

    return this.is_liked;
  };

  override template() {
    return html`
      <div class="${style.heart}">
        ${new HeartIcon({ is_liked: this.is_liked })}
      </div>
    `;
  }
}
