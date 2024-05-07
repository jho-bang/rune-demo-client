// base
import { Page, html } from "rune-ts";

// style
import style from "./style.module.scss";

// components
import { HomeTemplate, HeaderView } from "../../components";

// apis
import type { IDemoItem, IProfile } from "../../apis/demo/types";

interface Props {
  images: IDemoItem[];
  profile: IProfile;
}

export class TikklePage extends Page<Props> {
  override template() {
    return html`
      <div>
        <div>
          ${new HeaderView({
            profile: this.data.profile,
          })}
        </div>
        <div id="workspace" class="${style.workspace}">
          ${new HomeTemplate({
            images: this.data.images,
            profile: this.data.profile,
          })}
        </div>
      </div>
    `;
  }
}
