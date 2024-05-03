import { html, View } from "rune-ts";

// style
import style from "./style.module.scss";

interface Props {}

export class ImageCanvasView extends View<Props> {
  override template() {
    return html` <canvas class="${style.image_canvas}"></canvas> `;
  }
}
