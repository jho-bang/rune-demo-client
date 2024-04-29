import { View, html } from 'rune-ts';

import style from './style.module.scss';

type ButtonType = 'default' | 'primary' | 'danger';

interface Props {
  text: HTMLElement | string;
  class: string;
  type?: ButtonType;
}

export class ButtonDefault extends View<Props> {
  text = this.data.text;
  class = this.data.class;
  type = this.data.type || 'default';

  typeToStyle() {
    switch (this.type) {
      case 'primary':
        return style.primary;
      case 'danger':
        return style.danger;
      default:
        return '';
    }
  }

  override template() {
    return html`<button
      class="${this.class} ${style.mp_btn} ${this.typeToStyle()}"
    >
      ${this.text}
    </button> `;
  }
}
