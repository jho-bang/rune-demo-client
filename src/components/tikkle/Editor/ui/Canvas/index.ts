import { html, on, View } from "rune-ts";

// style
import style from "./style.module.scss";

import { onMouseDown, onMouseMove } from "./lib";

interface Props {}

export class EditorCanvas extends View<Props> {
  isDrag: boolean = false;

  @on("mousedown", "#brush_canvas")
  private _mouseDown(ev: MouseEvent) {
    this.isDrag = true;
    onMouseDown(ev);
  }

  @on("mouseup", "#brush_canvas")
  private _mouseUp() {
    this.isDrag = false;
  }

  @on("mousemove", "#brush_canvas")
  private _mouseMove(ev: MouseEvent) {
    if (this.isDrag) onMouseMove(ev);
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
