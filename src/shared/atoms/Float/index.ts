import { html, ListView, View } from "rune-ts";
import style from "./style.module.scss";

interface Props {
  item: any;
}

export class FloatView extends View<Props> {
  override template() {
    return html`<div class="${style["float-item"]}">${this.data.item}</div>`;
  }
}

export class FloatListView extends ListView<Props, FloatView> {
  override ItemView = FloatView;
  override className = style.float;
}
