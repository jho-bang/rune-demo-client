var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// base
import { Page, html, on } from 'rune-ts';
// component
import { ImageSelectView, EditorView, LoadingView } from './components';
// event
import { IsLoading } from './events';
// constants
import { SIZE_10MB } from './constants';
// style
import style from './style.module.scss';
export class TikklePage extends Page {
    _isLoading({ detail: loading }) {
        if (loading) {
            const element = new LoadingView({}).render();
            this.element().append(element);
        }
        else {
            this.element().querySelector('.LoadingView')?.remove();
        }
    }
    onChange(file) {
        if (!file) {
            return;
        }
        const isImage = file.type.match('image.*');
        if (!isImage) {
            return;
        }
        // 10mb 이상 막기
        if (file.size > SIZE_10MB) {
            return;
        }
        document.querySelector('#workspace').innerHTML = '';
        document.querySelector('#workspace').append(new EditorView({ file }).render());
    }
    template() {
        return html `
      <div id="workspace" class="${style.main}">
        <div>
          ${new ImageSelectView({
            text: '이미지를 업로드해주세용',
            accept: 'image/png, image/jpeg',
            onChange: this.onChange,
        })}
        </div>
      </div>
    `;
    }
}
__decorate([
    on(IsLoading)
], TikklePage.prototype, "_isLoading", null);
