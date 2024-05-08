import { html, View } from "rune-ts";

export interface ITitleProps {
  level: number;
  children: any;
}

export class TitleView extends View<ITitleProps> {
  override template({ level = 1, children }: ITitleProps) {
    return html`
        <h${level}>${children}</h${level}>
    `;
  }
}
