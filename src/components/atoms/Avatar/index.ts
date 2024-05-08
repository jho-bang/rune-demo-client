import { html, on, View } from "rune-ts";

// style
import style from "./style.module.scss";

import { getCookie, UserFillIcon } from "../../../shared";
import { user_apis } from "../../../apis";

export interface IAvatarProps {
  thumbnail_url: string;
  classes?: string;
  size?: "large" | "default" | "small";
}

export class AvatarView extends View<IAvatarProps> {
  @on("click")
  private async _onClickAvatar() {
    const access_token = getCookie("access_token");
    if (access_token) {
      await user_apis.logout(access_token);
    }

    window.location.reload();
  }

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
