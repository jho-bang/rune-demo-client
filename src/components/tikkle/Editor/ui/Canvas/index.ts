import { html, on, View } from "rune-ts";

// style
import style from "./style.module.scss";

import { getCanvasContext } from "../../share";

interface Props {}

export class EditorCanvas extends View<Props> {
  isDrag: boolean = false;

  @on("mousedown", "#brush_canvas")
  private _mouseDown(ev: MouseEvent) {
    this.isDrag = true;
    const ctx = getCanvasContext("#brush_canvas");

    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(ev.offsetX, ev.offsetY);
    }
  }

  @on("mouseup", "#brush_canvas")
  private _mouseUp() {
    this.isDrag = false;
  }

  @on("mousemove", "#brush_canvas")
  private _mouseMove(ev: MouseEvent) {
    if (this.isDrag) {
      const ctx = getCanvasContext("#brush_canvas");
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
    return html`
      <div>
        <canvas id="image_canvas" class=${style.image_canvas}></canvas>
        <canvas id="brush_canvas" class="${style.brush_canvas}"></canvas>
      </div>
    `;
  }
}
