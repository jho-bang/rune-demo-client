import { html, on, View } from "rune-ts";

// shared
import { BASE_URL } from "../../../shared";
import { like_apis } from "../../../apis";
import { HeartView } from "../Heart";

// style
import style from "./style.module.scss";

export interface IImageItemProps {
  origin_src: string;
  is_like: boolean;
  id: number;
}

export class ImageItemView extends View<IImageItemProps> {
  @on("click", `.${style.image}`)
  private async _click() {
    const id = this.data.id;
    window.location.href = `/detail?id=${id}`;
  }

  @on("click", `.${style.heart}`)
  private async _onLike() {
    if (this.data.is_like) {
      await like_apis.remove({ demo_id: this.data.id });
    } else {
      await like_apis.add({ demo_id: this.data.id });
    }
    this.redraw();
  }

  override redraw() {
    this.data.is_like = !this.data.is_like;
    const heart = this.element().querySelector(`.${style.heart}`);
    heart!.innerHTML = "";
    heart!.append(new HeartView({ is_like: this.data.is_like }).render());
    return this;
  }

  override template() {
    return html`
      <div class="${style.imageItem} grid-item">
        <div class="${style.heart}">
          ${new HeartView({ is_like: this.data.is_like })}
        </div>
        <img
          src="${BASE_URL}/${this.data.origin_src}"
          alt="상품 썸네일"
          class="${style.image}"
        />
      </div>
    `;
  }
}
