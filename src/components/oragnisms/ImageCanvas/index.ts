import { html, View } from "rune-ts";

// style
import style from "./style.module.scss";
import { BASE_URL, loadImage } from "../../../shared";
import { resizeImage } from "../Editor/lib";
import type { IDemoItem } from "../../../apis/demo/types";

interface Props {
  item: IDemoItem;
}

export class ImageCanvasView extends View<Props> {
  beforeImage: string = "";
  currentImage: string = "";

  getData() {
    const canvas = document.querySelector(`.${this}`) as HTMLCanvasElement;
    const base64 = canvas.toDataURL();
    const ctx = canvas.getContext("2d");
    return { canvas, base64, ctx };
  }

  clear() {
    const { canvas, ctx } = this.getData();
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  draw(image: HTMLImageElement) {
    this.init(image, image);
  }

  private init(image: HTMLImageElement, newImage?: HTMLImageElement) {
    const { ctx } = this.getData();

    const { resizeWidth, resizeHeight } = resizeImage(
      image.naturalWidth,
      image.naturalHeight,
    );

    if (ctx) {
      ctx.canvas.width = resizeWidth;
      ctx.canvas.height = resizeHeight;
      if (newImage) {
        ctx.drawImage(newImage, 0, 0, resizeWidth, resizeHeight);
      }
    }
  }

  override async onMount() {
    if (this.data.item) {
      this.beforeImage = `${BASE_URL}/${this.data.item.origin_src}`;
      this.currentImage = this.beforeImage;
      const image = await loadImage(this.currentImage);
      this.draw(image);
    }
  }

  override template() {
    return html`<canvas class="${style.image_canvas}"></canvas>`;
  }
}
