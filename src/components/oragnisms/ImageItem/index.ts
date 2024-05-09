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
  @on("click", `.${style.image}`)
  private async _click() {
    const id = this.data.id;
    window.location.href = `/detail?id=${id}`;
  }

  @on("click", `.${style.heart}`)
  private async _onLike() {
    if (this.data.is_liked) {
      this.data.is_liked = false;
      await LikeApis.remove({ demo_id: this.data.id });
    } else {
      this.data.is_liked = true;
      await LikeApis.add({ demo_id: this.data.id });
    }

    this.heartToggle();
  }

  private heartToggle() {
    const heart = this.element().querySelector(`.${style.heart}`);
    heart!.innerHTML = "";
    heart!.append(new HeartView({ is_liked: this.data.is_liked }).render());
  }

  override template() {
    return html`
      <div class="${style.imageItem} grid-item">
        <div class="${style.heart}">
          ${new HeartView({ is_liked: this.data.is_liked })}
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
