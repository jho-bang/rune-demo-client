import { html, on, View } from "rune-ts";

// style
import style from "./style.module.scss";

import { getCanvasContext } from "../../../pages/Detail/lib";

interface Props {}

export class BrushCanvasView extends View<Props> {
  isDrag: boolean = false;

  @on("mousedown")
  private _mouseDown(ev: MouseEvent) {
    this.isDrag = true;
    const ctx = getCanvasContext(`.${BrushCanvasView}`);

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
      const ctx = getCanvasContext(`.${this}`);
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

  override template() {
    return html` <canvas class="${style.brush_canvas}"></canvas> `;
  }
}
