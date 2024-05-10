import { html, on, View } from "rune-ts";

// shared
import { BASE_URL } from "../../../shared";
import { LikeApis } from "../../../apis";

// atoms
import { HeartView } from "../../atoms";

// style
import style from "./style.module.scss";

export interface IImageItemProps {
  origin_src: string;
  is_liked: boolean;
  id: number;
}

export class ImageItemView extends View<IImageItemProps> {
  heartView = new HeartView({ is_liked: this.data.is_liked });

  @on("click", `.${style.image}`)
  private async _click() {
    const id = this.data.id;
    window.location.href = `/detail?id=${id}`;
  }

  @on("click", `.${style.heart}`)
  private async _onLike() {
    if (this.data.is_liked) {
      await LikeApis.remove({ demo_id: this.data.id });
    } else {
      await LikeApis.add({ demo_id: this.data.id });
    }

    this.data.is_liked = this.heartView.toggle();
  }

  override template() {
    return html`
      <div class="${style.imageItem}">
        <div class="${style.heart}">${this.heartView}</div>
        <img
          src="${BASE_URL}/${this.data.origin_src}"
          alt="상품 썸네일"
          class="${style.image}"
        />
      </div>
    `;
  }
}
