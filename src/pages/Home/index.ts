// base
import { Page, html } from "rune-ts";

// style
import style from "./style.module.scss";

// template
import { HomeTemplate } from "../../components";

// apis
import type { IDemoItem } from "../../apis/demo/types";
import { apis } from "../../apis";

export class TikklePage extends Page<{
  images: IDemoItem[];
}> {
  override async onRender() {
    const res = await apis.kakao_profile();
    console.log(res);
  }

  override template() {
    return html`
      <div id="workspace" class="${style.workspace}">
        ${new HomeTemplate({ images: this.data.images })}
      </div>
    `;
  }
}
