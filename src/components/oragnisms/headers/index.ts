import { html, View } from "rune-ts";

import type { IProfile } from "../../../apis/demo/types";
import { AvatarView } from "../../atoms/Avatar";

import style from "./style.module.scss";

interface Props {
  profile: IProfile;
}

export class HeaderView extends View<Props> {
  override template() {
    return html`<div class="${style.header}">
      ${new AvatarView({
        thumbnail_url: this.data.profile.data.properties.thumbnail_image || "",
        classes: style.avatarView,
      })}
    </div>`;
  }
}
