// base
import { Page, html } from "rune-ts";

// style
import style from "./style.module.scss";

// template
import { HomeTemplate } from "../../components";

// apis
import type { IDemoItem, IProfile } from "../../apis/demo/types";

export class TikklePage extends Page<{
  images: IDemoItem[];
  profile: IProfile;
}> {
  override async onRender() {
    console.log(this.data.profile);
  }

  override template() {
    return html`
      <div id="workspace" class="${style.workspace}">
        ${new HomeTemplate({ images: this.data.images })}
      </div>
    `;
  }
}
