import { html, on, View } from "rune-ts";

// components
import { AvatarView } from "../../atoms";
import { BackBtnView } from "../BackBtn";

// apis
import type { IProfile } from "../../../apis/user/types";

// style
import style from "./style.module.scss";

interface Props {
  profile: IProfile;
  is_back?: boolean;
}

export class HeaderView extends View<Props> {
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
