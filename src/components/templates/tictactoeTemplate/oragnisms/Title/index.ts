import { html, View } from "rune-ts";

import style from "./style.module.scss";

interface Props {
  title: string;
}

export class TitleView extends View<Props> {
  override template({ title }: Props) {
    return html`<h1 class="${style.title}">${title}</h1> `;
  }
}
