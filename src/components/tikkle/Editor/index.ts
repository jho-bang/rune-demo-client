// base
import { View, html } from "rune-ts";

// style
import style from "./style.module.scss";

import { BackBtnView, EditorFloatList, EditorCanvas } from "./ui";
import { canvasInit } from "./share";

// stores
import { tikkleStore } from "../../../stores";

export class EditorView extends View<{ file: File }> {
  override template() {
    return html`
      <div class="${style.editor}">
        <div>${new BackBtnView({})}</div>
        <div>${new EditorCanvas({})}</div>
        <div>${new EditorFloatList({})}</div>
      </div>
    `;
  }

  override async onMount() {
    if (this.data.file) {
      const image = new Image();
      image.src = URL.createObjectURL(this.data.file);
      image.onload = () => {
        tikkleStore.setStore({ originImage: image.src });
        canvasInit("#image_canvas", image, image);
        canvasInit("#brush_canvas", image);
      };
    }
  }
}
