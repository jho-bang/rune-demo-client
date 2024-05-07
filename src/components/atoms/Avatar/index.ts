import { html, View } from "rune-ts";

import style from "./style.module.scss";

export interface IAvatarProps {
  thumbnail_url: string;
  classes?: string;
}

export class AvatarView extends View<IAvatarProps> {
  override template() {
    return html`<div
      class="${style.avatar} ${this.data.classes}"
      style="background-image: url(${this.data
        .thumbnail_url}); background-position: center; background-repeat: no-repeat;"
    ></div> `;
  }
}
