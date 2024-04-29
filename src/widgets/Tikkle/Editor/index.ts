// base
import { View, html, on } from "rune-ts";

// style
import style from "./style.module.scss";

import { onMouseDown, onMouseMove } from "./lib";
import { onErase, onClickShowOrigin, init } from "./model";

// widgets
import { FloatView } from "../float";

// features
import { IsLoading } from "../../../features";

// shared
import {
  ButtonIcon,
  ArrowLeftIcon,
  EditorImageIcon,
  WikiEditIcon,
} from "../../../shared";

export class EditorView extends View<{ file: File }> {
  isDrag = false;
  isShowOrigin = false;

  override template() {
    return html`
      <div class="${style.editor}">
        <div class="${style.back_btn}">
          ${new ButtonIcon({
            type: "primary",
            icon: ArrowLeftIcon,
            class: "",
            onclick: () => {
              window.location.reload();
            },
          })}
        </div>
        <canvas id="image_canvas" class=${style.image_canvas}></canvas>
        <canvas id="brush_canvas" class="${style.brush_canvas}"></canvas>

        <div>
          ${new FloatView({
            floatList: [
              new ButtonIcon({
                class: `erase_tikkle`,
                icon: EditorImageIcon,
              }),
              new ButtonIcon({
                class: `show_origin`,
                icon: WikiEditIcon,
                type: "primary",
              }),
            ],
          })}
        </div>
      </div>
    `;
  }

  @on("click", ".show_origin")
  private async _show() {
    try {
      this.isShowOrigin = await onClickShowOrigin(this.isShowOrigin);
    } catch (e) {
      console.log("이미지 로드 실패", e);
    }
  }

  @on("click", ".erase_tikkle")
  private async _click() {
    try {
      this.dispatchEvent(IsLoading, { detail: true, bubbles: true });
      await onErase();
    } catch (e) {
      console.log(e);
    } finally {
      this.dispatchEvent(IsLoading, { detail: false, bubbles: true });
    }
  }

  @on("mousedown", "#brush_canvas")
  private _mouseDown() {
    this.isDrag = true;
    onMouseDown();
  }

  @on("mouseup", "#brush_canvas")
  private _mouseUp() {
    this.isDrag = false;
  }

  @on("mousemove", "#brush_canvas")
  private _mouseMove(ev: MouseEvent) {
    if (this.isDrag) onMouseMove(ev);
  }

  override async onMount() {
    if (this.data.file) init(this.data.file);
  }
}
