import { html, View } from "rune-ts";

import style from "./style.module.scss";

export interface ICardPros {
  cover?: string;
}

export class CardView extends View<ICardPros> {
  override template() {
    return html`
      <div class="${style.card}">
        ${this.data.cover &&
        html`<div class="cover">
          <img src="${this.data.cover}" alt="커버" />
        </div>`}
        <div class="${style.body}"></div>
      </div>
    `;
  }
}
