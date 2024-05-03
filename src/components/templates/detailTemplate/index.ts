import { html, View } from "rune-ts";

// oragnisms
import {
  BrushCanvasView,
  EditorFloatListView,
  BackBtnView,
  ImageCanvasView,
} from "./oragnisms";

// shared
import { convertURLtoFile } from "../../../shared";

// apis
import type { IDemoItem } from "../../../apis/demo/types";

// lib
import { canvasInit } from "./lib";
import style from "./style.module.scss";

interface Props {
  item: IDemoItem;
}

export class DetailTemplateView extends View<Props> {
  editorFloatListView = new EditorFloatListView({});

  override async onMount() {
    if (this.data.item) {
      const image = new Image();

      const file = await convertURLtoFile(
        `http://localhost:5002/${this.data.item.origin_src}`,
      );

      image.src = URL.createObjectURL(file);
      this.editorFloatListView.originImage = image.src;
      image.onload = () => {
        canvasInit(`.${ImageCanvasView}`, image, image);
        canvasInit(`.${BrushCanvasView}`, image);
      };
    }
  }

  override template() {
    return html`
      <div class="${style.editor}">
        <div>${new BackBtnView({})}</div>
        <div>${new BrushCanvasView({})} ${new ImageCanvasView({})}</div>
        <div>${this.editorFloatListView}</div>
      </div>
    `;
  }
}
