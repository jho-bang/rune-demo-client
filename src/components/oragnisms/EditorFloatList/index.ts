import { html, View } from "rune-ts";

// shared
import {
  EditorImageIcon,
  IsLoading,
  loadImage,
  WikiEditIcon,
} from "../../../shared";

// oragnisms
import { BrushCanvasView } from "../BrushCanvas";
import { ImageCanvasView } from "../ImageCanvas";

// atoms
import { ButtonIcon, FloatListView } from "../../atoms";

// apis
import { demo_apis, inpaint } from "../../../apis";

import {
  canvasInit,
  clearBrush,
  getCanvasBase64,
  getCanvasContext,
} from "../../../pages/Detail/lib";

// style
import style from "./style.module.scss";

interface Props {}

export class EditorFloatListView extends View<Props> {
  isShowOrigin: boolean = false;
  originImage: string = "";
  newImage: string = "";

  private onShowOriginClick = async () => {
    try {
      this.isShowOrigin = await this.drawingOrigin(this.isShowOrigin);
    } catch (e) {
      console.log("이미지 로드 실패", e);
    }
  };

  private onEraseClick = async () => {
    try {
      this.dispatchEvent(IsLoading, { detail: true, bubbles: true });
      await this.onErase();
    } catch (e) {
      console.log(e);
    } finally {
      this.dispatchEvent(IsLoading, { detail: false, bubbles: true });
    }
  };

  private async onErase() {
    const { image, image_base64, brush, brush_base64 } = this.getCanvasesInfo();

    const blob = await inpaint({
      width: image.width,
      height: image.height,
      image: image_base64,
      mask: brush_base64,
    });

    const new_file = new File([blob], "new_file");
    const { path } = await demo_apis.upload(new_file);
    await demo_apis.insert({ origin_src: path });

    const src = URL.createObjectURL(blob);
    await this.drawingNewImage(src);
  }

  private async drawingOrigin(isShowOrigin: boolean) {
    const { originImage, newImage } = this;
    const image = await loadImage(isShowOrigin ? newImage : originImage);
    const ctx = getCanvasContext(`.${ImageCanvasView}`);
    ctx!.drawImage(image, 0, 0, image.width, image.height);
    return !isShowOrigin;
  }

  private async drawingNewImage(src: string) {
    const newImage = await loadImage(src);
    this.newImage = src;
    clearBrush(`.${BrushCanvasView}`);
    canvasInit(`.${ImageCanvasView}`, newImage, newImage);
  }

  private getCanvasesInfo() {
    const { canvas: image, base64: image_base64 } = getCanvasBase64(
      `.${ImageCanvasView}`,
    );
    const { canvas: brush, base64: brush_base64 } = getCanvasBase64(
      `.${BrushCanvasView}`,
    );

    return { image, image_base64, brush, brush_base64 };
  }

  override template() {
    return html`
      <div>
        ${new FloatListView([
          {
            item: new ButtonIcon({
              klass: style.ButtonIcon,
              icon: EditorImageIcon,
              type: "primary",
              onClick: this.onShowOriginClick,
            }),
          },
          {
            item: new ButtonIcon({
              klass: style.ButtonIcon,
              icon: WikiEditIcon,
              onClick: this.onEraseClick,
            }),
          },
        ])}
      </div>
    `;
  }
}
