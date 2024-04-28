import { View, html } from 'rune-ts';

// style
import style from './style.module.scss';

export class LoadingView extends View<{}> {
  override template() {
    return html`
      <div class="${style['loading-wrapper']} loading-wrapper">
        <div class="${style['loading-container']}">
          <div class="${style['loading']}"></div>
          <div id="${style['loading-text']}">loading</div>
        </div>
      </div>
    `;
  }
}
