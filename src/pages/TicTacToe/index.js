var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Page, html, on } from 'rune-ts';
// component
import { SquareListViewRender, resetButtonRender } from './components';
// store
import { store } from './store';
// events
import { RequestEvent } from './events';
// css
import mainClass from './main.module.scss';
export class TicTacToePage extends Page {
    _on() {
        this.element().querySelector('.status').innerHTML =
            `${store.getStore().currentPlayer} 차례`;
    }
    template() {
        return html `<div>
      <h1 class="${mainClass.title}">와아 틱택토!</h1>
      <h3 class="${mainClass.status} status">
        ${store.getStore().currentPlayer} 차례
      </h3>
      <div id="board"></div>
    </div>`;
    }
    onRender() {
        SquareListViewRender();
        resetButtonRender();
    }
}
__decorate([
    on(RequestEvent)
], TicTacToePage.prototype, "_on", null);
