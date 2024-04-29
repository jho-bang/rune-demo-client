import { html, ListView, on, View } from "rune-ts";

import { onClickImageItem } from "./lib";

// features
import { OnFileSelect } from "../../../features";

// style
import style from "./style.module.scss";
import "./style.scss";

interface IProps {
  origin_src: string;
}

export class ImageItemView extends View<IProps> {
  @on("click")
  private async _click(ev: Event) {
    const file = await onClickImageItem(ev);
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
