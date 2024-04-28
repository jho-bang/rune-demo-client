import { html, ListView, on, View } from "rune-ts";

import { OnFileSelect } from "../../../features/Tikkle";
import { convertURLtoFile } from "../../../shared";

// style
import style from "./style.module.scss";
import "./style.scss";
import { apis } from "../../../entities";

interface IProps {
  origin_src: string;
}

export class ImageItemView extends View<IProps> {
  @on("click")
  private async _click(ev) {
    const target = ev.currentTarget;
    const image = target.querySelector("img");
    const src = image.getAttribute("src");
    const file = await convertURLtoFile(src);

    this.dispatchEvent(OnFileSelect, { detail: file, bubbles: true });
  }

  override template() {
    return html`
      <div class="${style.imageList} grid-item">
        <img src="http://localhost:5002/${this.data.origin_src}" alt="" />
      </div>
    `;
  }
}

export class ImageListView extends ListView<IProps, ImageItemView> {
  override ItemView = ImageItemView;
}
