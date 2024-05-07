import { html, View } from "rune-ts";

import style from "./style.module.scss";
import { UserFillIcon } from "../../../shared";

export interface IAvatarProps {
  thumbnail_url: string;
  classes?: string;
  size?: "large" | "default" | "small";
}

export class AvatarView extends View<IAvatarProps> {
  override template({
    size = "default",
    classes,
    thumbnail_url,
  }: IAvatarProps) {
    return html`<div class="${style.avatar} ${classes} ${style[size]}">
      ${thumbnail_url
        ? html`<img src="${thumbnail_url}" alt="썸네일" />`
        : UserFillIcon}
    </div> `;
  }
}
