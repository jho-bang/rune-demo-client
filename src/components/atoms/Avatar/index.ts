import { html, View } from "rune-ts";

import style from "./style.module.scss";
import { UserFillIcon } from "../../../shared";

export interface IAvatarProps {
  thumbnail_url: string;
  classes?: string;
}

export class AvatarView extends View<IAvatarProps> {
  override template() {
    return html`<div class="${style.avatar} ${this.data.classes}">
      ${this.data.thumbnail_url
        ? html`<img src="${this.data.thumbnail_url}" alt="썸네일" />`
        : UserFillIcon}
    </div> `;
  }
}
