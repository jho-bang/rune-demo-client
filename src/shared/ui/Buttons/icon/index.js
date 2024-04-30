import { View, html } from 'rune-ts';
import style from './style.module.scss';
export class ButtonDefault extends View {
    text = this.data.text;
    class = this.data.class;
    type = this.data.type || 'default';
    getTypeToClass() {
        switch (this.type) {
            case 'primary':
                return style.primary;
            case 'danger':
                return style.danger;
            default:
                return '';
        }
    }
    template() {
        return html `<button
      class="${this.class} ${style.mp_btn} ${this.getTypeToClass()}"
    >
      ${this.text}
    </button> `;
    }
}
