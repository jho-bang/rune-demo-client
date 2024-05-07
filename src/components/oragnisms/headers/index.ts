import { html, on, View } from "rune-ts";

// components
import { AvatarView } from "../../atoms/Avatar";
import { BackBtnView } from "../BackBtn";

// apis
import type { IProfile } from "../../../apis/user/types";

// shared
import { deleteCookie, getCookie } from "../../../shared";

// style
import style from "./style.module.scss";

interface Props {
  profile: IProfile;
  is_back?: boolean;
}

export class HeaderView extends View<Props> {
  @on("click", `.${style.avatarView}`)
  private _onClickAvatar() {
    const access_token = getCookie("access_token");
    if (access_token) {
      deleteCookie("access_token");
    }

    window.location.href = "/login";
  }

  override template() {
    return html`<div class="${style.header}">
      ${this.data.is_back ? new BackBtnView({}) : ""}
      ${new AvatarView({
        thumbnail_url: this.data.profile.data.thumbnail_url || "",
        classes: style.avatarView,
      })}
    </div>`;
  }
}
