import { html, on, View } from "rune-ts";

// shared
import { BASE_URL } from "../../../../../../../shared";

// style
import style from "./style.module.scss";

export interface IImageItemProps {
  origin_src: string;
  id: number;
}

export class ImageItemView extends View<IImageItemProps> {
  @on("click")
  private async _click() {
    const id = this.data.id;
    window.location.href = `/detail?id=${id}`;
  }

  override template() {
    return html`
      <div class="${style.imageItem} grid-item">
        <img src="${BASE_URL}/${this.data.origin_src}" alt="" />
      </div>
    `;
  }
}
