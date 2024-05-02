import { html, View } from "rune-ts";

// components
import { FloatView } from "../../../FloatList";

// shared
import {
  ButtonIcon,
  EditorImageIcon,
  IsLoading,
  loadImage,
  WikiEditIcon,
} from "../../../../../shared";
import { tikkleStore } from "../../../../../stores";
import {
  canvasInit,
  clearBrush,
  getCanvasBase64,
  getCanvasContext,
} from "../../share";
import { apis, inpaint } from "../../../../../apis";

interface Props {}

export class EditorFloatList extends View<Props> {
  isShowOrigin: boolean = false;

  private async onShowOriginClick() {
    try {
      this.isShowOrigin = await this.drawingOrigin(this.isShowOrigin);
    } catch (e) {
      console.log("이미지 로드 실패", e);
    }
  }

  private onEraseClick() {
    return async () => {
      try {
        this.dispatchEvent(IsLoading, { detail: true, bubbles: true });
        await this.onErase();
      } catch (e) {
        console.log(e);
      } finally {
        this.dispatchEvent(IsLoading, { detail: false, bubbles: true });
      }
    };
  }

  private async onErase() {
    const { image, image_base64, brush, brush_base64 } = this.getCanvasesInfo();

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
    await this.drawingNewImage(src);
  }

  private async drawingOrigin(isShowOrigin: boolean) {
    const { originImage, newImage } = tikkleStore.getStore();
    const image = await loadImage(isShowOrigin ? newImage : originImage);
    const ctx = getCanvasContext("#image_canvas");
    ctx!.drawImage(image, 0, 0, image.width, image.height);
    return !isShowOrigin;
  }

  private async drawingNewImage(src: string) {
    const newImage = await loadImage(src);
    tikkleStore.setStore({ newImage: src });
    clearBrush("#brush_canvas");
    canvasInit("#image_canvas", newImage, newImage);
  }

  private getCanvasesInfo() {
    const { canvas: image, base64: image_base64 } =
      getCanvasBase64("#image_canvas");
    const { canvas: brush, base64: brush_base64 } =
      getCanvasBase64("#brush_canvas");

    return { image, image_base64, brush, brush_base64 };
  }

  override template() {
    return html`
      <div>
        ${new FloatView({
          floatList: [
            new ButtonIcon({
              class: `show_origin`,
              icon: EditorImageIcon,
              type: "primary",
              onClick: this.onShowOriginClick,
            }),
            new ButtonIcon({
              class: `erase_tikkle`,
              icon: WikiEditIcon,
              onClick: this.onEraseClick(),
            }),
          ],
        })}
      </div>
    `;
  }
}
