// base
import { Page, html } from "rune-ts";

// style
import style from "./style.module.scss";

// components
import {
  HeaderView,
  ImageListView,
  FloatButtonView,
  ImageSelectButton,
} from "../../components";

// apis
import type { IDemoItem } from "../../apis/demo/types";
import type { IProfile } from "../../apis/user/types";

interface Props {
  images: IDemoItem[];
  profile: IProfile;
}

export class HomePage extends Page<Props> {
  override template() {
    return html`
      <div>
        ${new HeaderView({ profile: this.data.profile })}
        <div class="${style.workspace}">
          ${new ImageListView(this.data.images || [])}
        </div>
        ${new FloatButtonView({
          children: new ImageSelectButton({
            text: "이미지를 업로드해주세용.",
            accept: "image/*",
          }), 
          bottom: 50, right: 20
        })}
      </div>
    `;
  }
}
