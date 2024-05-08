// base
import { Page, html } from "rune-ts";

// style
import style from "./style.module.scss";

// components
import {
  HeaderView,
  ImageListView,
  FloatListView,
  ImageSelectView,
} from "../../components";

// apis
import type { IDemoItem } from "../../apis/demo/types";
import type { IProfile } from "../../apis/user/types";

interface Props {
  images: IDemoItem[];
  profile: IProfile;
}

export class TikklePage extends Page<Props> {
  override template() {
    return html`
      <div>
        <div class="header">
          ${new HeaderView({ profile: this.data.profile })}
        </div>
        <div class="${style.workspace}">
          <div>${new ImageListView(this.data.images || [])}</div>
          <div>
            ${new FloatListView([
              {
                item: new ImageSelectView({
                  text: "이미지를 업로드해주세용.",
                  accept: "image/*",
                }),
              },
            ])}
          </div>
        </div>
      </div>
    `;
  }
}
