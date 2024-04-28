import { html, ListView, View } from "rune-ts";

// style
import style from "./style.module.scss";
import "./style.scss";

interface IProps {
  origin_src: string;
}

export class ImageItemView extends View<IProps> {
  override template() {
    return html`
      <div class="${style.imageList}">
        <img src="http://localhost:5002/${this.data.origin_src}" alt="" />
      </div>
    `;
  }
}

export class ImageListView extends ListView<IProps, ImageItemView> {
  override ItemView = ImageItemView;
}
