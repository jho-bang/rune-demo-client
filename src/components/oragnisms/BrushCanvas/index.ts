import { html, on, View } from "rune-ts";

// style
import style from "./style.module.scss";

import { resizeImage } from "../Editor/lib";
import type { IDemoItem } from "../../../apis/demo/types";
import { BASE_URL, loadImage } from "../../../shared";

interface Props {
  item: IDemoItem;
}

export class BrushCanvasView extends View<Props> {
  isDrag: boolean = false;

  @on("mousedown")
  private _mouseDown(ev: MouseEvent) {
    this.isDrag = true;
    const { ctx } = this.getData();

    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(ev.offsetX, ev.offsetY);
    }
  }

  @on("mouseup")
  private _mouseUp() {
    this.isDrag = false;
  }

  @on("mousemove")
  private _mouseMove(ev: MouseEvent) {
    if (this.isDrag) {
      const { ctx } = this.getData();
      if (ctx) {
        if (ev.buttons === 1) {
          ctx.lineTo(ev.offsetX, ev.offsetY);
          ctx.strokeStyle = "#faf026";
          ctx.lineWidth = 20;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          ctx.stroke();
        }
      }
    }
  }

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
    this.init(image);
  }

  init(image: HTMLImageElement) {
    const { ctx } = this.getData();

    const { resizeWidth, resizeHeight } = resizeImage(
      image.naturalWidth,
      image.naturalHeight,
    );

    if (ctx) {
      ctx.canvas.width = resizeWidth;
      ctx.canvas.height = resizeHeight;
    }
  }

  override async onMount() {
    if (this.data.item) {
      const image = await loadImage(`${BASE_URL}/${this.data.item.origin_src}`);
      this.draw(image);
    }
  }

  override template() {
    return html`<canvas class="${style.brush_canvas}"></canvas>`;
  }
}
