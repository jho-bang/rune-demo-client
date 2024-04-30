import { View, html } from "rune-ts";

// style
import style from "./style.module.scss";

export interface LoadingProps {
  text?: string;
  opacity?: number;
}

export class LoadingView extends View<LoadingProps> {
  override template() {
    return html`
      <div
        class="${style["loading-wrapper"]} loading-wrapper"
        style="background-color: rgba(0,0,0,${this.data.opacity || 0.5});"
      >
        <div class="${style["loading-container"]}">
          <div class="${style["loading"]}"></div>
          <div id="${style["loading-text"]}">
            ${this.data.text || "로딩중..."}
          </div>
        </div>
      </div>
    `;
  }
}
