// base
import { View, html, on } from "rune-ts";

// style
import style from "./style.module.scss";

import { canvasInit, getCanvas, getCanvasContext } from "./lib";
import { setNewImage } from "./model";

// features
import { store, IsLoading } from "../../../features/Tikkle";

// entities
import { apis, inpaint } from "../../../entities";

// shared
import { ButtonDefault, loadImage } from "../../../shared";

export class EditorView extends View<{ file: File }> {
  isDrag = false;
  isShowOrigin = false;

  override template() {
    return html`
      <div class="${style.editor}">
        <canvas id="image_canvas" class=${style.image_canvas}></canvas>
        <canvas id="brush_canvas" class="${style.brush_canvas}"></canvas>
        ${new ButtonDefault({
          class: `${style.tikkle_button} erase_tikkle`,
          text: "티끌 제거",
        })}
        ${new ButtonDefault({
          class: `${style.tikke_origin_button} show_origin`,
          text: "원본 보기",
          type: "primary",
        })}
      </div>
    `;
  }

  @on("click", ".show_origin")
  private async _show() {
    try {
      const { originImage, newImage } = store.getStore();
      const image = await loadImage(this.isShowOrigin ? newImage : originImage);
      const ctx = getCanvasContext("#image_canvas");
      ctx!.drawImage(image, 0, 0, image.width, image.height);

      this.element().querySelector(".show_origin")!.textContent = this
        .isShowOrigin
        ? "원본 보기"
        : "수정본 보기";

      this.isShowOrigin = !this.isShowOrigin;
    } catch (e) {
      console.log("이미지 로드 실패", e);
    }
  }

  @on("click", ".erase_tikkle")
  private async _click() {
    try {
      this.dispatchEvent(IsLoading, { detail: true, bubbles: true });

      const image = getCanvas("#image_canvas");
      const image_base64 = image.toDataURL();

      const brush = getCanvas("#brush_canvas");
      const brush_base64 = brush.toDataURL();

      const blob = await inpaint({
        width: image.width,
        height: image.height,
        image: image_base64,
        mask: brush_base64,
      });

      const new_file = new File([blob], "new_file");
      const { path } = await apis.upload(new_file);

      const src = URL.createObjectURL(blob);
      await apis.insert({ origin_src: path });

      this.dispatchEvent(IsLoading, { detail: false, bubbles: true });
      await setNewImage(src, image);
    } catch (e) {
      console.log(e);
    }
  }

  @on("mousedown", "#brush_canvas")
  private _mouseDown() {
    this.isDrag = true;

    const canvas = getCanvas("#brush_canvas");
    const ctx = getCanvasContext("#brush_canvas");

    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = "#faf026";
      canvas.style.opacity = "0.6";
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
        ctx.arc(ev.offsetX, ev.offsetY, 30, 0, Math.PI * 2, true);
        ctx.fill();
      }
    }
  }

  override async onMount() {
    if (!this.data.file) {
      return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(this.data.file);
    image.onload = () => {
      store.setStore({ originImage: image.src });
      canvasInit("#image_canvas", image, image);
      canvasInit("#brush_canvas", image);
    };
  }
}
