import { CustomEventWithDetail, html, ListView, on, View } from "rune-ts";

// style
import style from "./style.module.scss";
import "./style.scss";

// shared
import { convertURLtoFile } from "../../../shared";

export class OnFileSelect extends CustomEventWithDetail<File> {}

interface IProps {
  origin_src: string;
}

export class ImageItemView extends View<IProps> {
  @on("click")
  private async _click(ev: Event) {
    const file = await this.onClickImageItem(ev);
    this.dispatchEvent(OnFileSelect, { detail: file, bubbles: true });
  }

  private onClickImageItem(ev: Event) {
    const target = ev.currentTarget as HTMLElement;
    const image = target.querySelector("img") as HTMLImageElement;
    const src = image.getAttribute("src") as string;
    return convertURLtoFile(src);
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
