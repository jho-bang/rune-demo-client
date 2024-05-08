import { html, View } from "rune-ts";

import style from "./style.module.scss";

import { ImageCanvasView } from "../ImageCanvas";
import { BrushCanvasView } from "../BrushCanvas";
import { LoadingView } from "../../atoms";

import type { IDemoItem } from "../../../apis/demo/types";
import { demo_apis, inpaint, removeBG } from "../../../apis";

import { BASE_URL, convertURLtoFile, loadImage } from "../../../shared";

interface Props {
  item: IDemoItem;
}

export class EditorView extends View<Props> {
  private loadingView = new LoadingView({ text: "로딩중..." });
  private brushCanvasView = new BrushCanvasView({ item: this.data.item });
  private imageCanvasView = new ImageCanvasView({ item: this.data.item });

  public isShowOrigin: boolean = false;

  public showLoadingView() {
    this.loadingView.show();
  }
  public hideLoadingView() {
    this.loadingView.hide();
  }

  public download = async () => {
    const a = document.createElement("a");
    const file = await convertURLtoFile(
      `${BASE_URL}/${this.data.item.origin_src}`,
    );
    a.href = URL.createObjectURL(file);
    a.download = "download.png";
    a.click();
    a.remove();
  };

  public erase = async () => {
    try {
      this.showLoadingView();

      const { canvas: image_canvas, base64: image_base64 } =
        this.imageCanvasView.getData();

      const { base64: brush_base64 } = this.brushCanvasView.getData();

      const blob = await inpaint({
        width: image_canvas.width,
        height: image_canvas.height,
        image: image_base64,
        mask: brush_base64,
      });

      const new_file = new File([blob], "new_file", { type: blob.type });
      const res = await demo_apis.upload(new_file);
      await demo_apis.insert({ origin_src: res.path });
      const src = URL.createObjectURL(blob);
      await this.draw(src);
    } catch (e) {
      console.error(e);
    } finally {
      this.hideLoadingView();
    }
  };

  public showOrigin = async () => {
    const beforeImage = this.imageCanvasView.beforeImage;
    const currentImage = this.imageCanvasView.currentImage;

    const image = await loadImage(
      this.isShowOrigin ? currentImage : beforeImage,
    );

    this.imageCanvasView.clear();
    this.imageCanvasView.draw(image);
    this.isShowOrigin = !this.isShowOrigin;
  };

  public removeBG = async () => {
    try {
      this.showLoadingView();
      const blob = await removeBG(`${this.imageCanvasView.currentImage}`);
      const newFile = new File([blob], "new_file", { type: blob.type });
      const { path } = await demo_apis.upload(newFile);
      await demo_apis.insert({ origin_src: path });
      const src = URL.createObjectURL(blob);
      await this.draw(src);
    } catch (e) {
      console.error(e);
    } finally {
      this.hideLoadingView();
    }
  };

  private async draw(src: string) {
    const newImage = await loadImage(src);
    this.brushCanvasView.clear();
    this.imageCanvasView.currentImage = src;
    this.imageCanvasView.clear();
    this.imageCanvasView.draw(newImage);
  }

  override template() {
    return html`<div class="${style.editor}">
      ${this.loadingView} ${this.brushCanvasView} ${this.imageCanvasView}
    </div>`;
  }
}
