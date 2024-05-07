import { html, on, View } from "rune-ts";

// components
import { AvatarView } from "../../atoms/Avatar";
import { BackBtnView } from "../BackBtn";

// apis
import type { IProfile } from "../../../apis/user/types";

// shared
import { getCookie } from "../../../shared";

// style
import style from "./style.module.scss";
import { user_apis } from "../../../apis";

interface Props {
  profile: IProfile;
  is_back?: boolean;
}

export class HeaderView extends View<Props> {
  @on("click", `.${style.avatarView}`)
  private async _onClickAvatar() {
    const access_token = getCookie("access_token");
    if (access_token) {
      await user_apis.logout(access_token);
    }

    window.location.reload();
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
