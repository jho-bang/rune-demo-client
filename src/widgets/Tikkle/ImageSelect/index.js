var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// base
import { View, html, on } from 'rune-ts';
// style
import style from './style.module.scss';
import { FileIcon } from '../Icons';
export class ImageSelectView extends View {
    uploadElemId = `file-upload-${Math.random().toString()}`;
    _onChange(ev) {
        const file = ev.currentTarget.files?.[0];
        if (file) {
            this.data.onChange(file);
        }
    }
    template() {
        return html `<div class="${style.fileSelect}">
      <label class="${style.fileSelectLabel}" htmlFor="${this.uploadElemId}">
        <div class="${style.fileInput}">
          <input
            class="${style.hidden}"
            id="${this.uploadElemId}"
            name="${this.uploadElemId}"
            type="file"
            accept=${this.data.accept}
          />

          <p class="${style['text-center']}">${this.data.text}</p>
        </div>
      </label>
    </div> `;
    }
}
__decorate([
    on('change', `input`)
], ImageSelectView.prototype, "_onChange", null);
