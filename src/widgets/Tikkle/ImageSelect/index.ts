// base
import { View, html, on } from "rune-ts";

// widgets
import { EditorView } from "../Editor";

// style
import style from "./style.module.scss";

interface Props {
  text: string;
  accept: string;
  onChange(file: File): boolean;
}

export class ImageSelectView extends View<Props> {
  uploadElemId = `file-upload-${Math.random().toString()}`;

  @on("change", `input`)
  private _onChange(ev) {
    const file = ev.currentTarget.files?.[0];

    if (file) {
      const onChanged = this.data.onChange(file);
      if (onChanged) {
        document.querySelector("#workspace")!.innerHTML = "";
        document
          .querySelector("#workspace")!
          .append(new EditorView({ file }).render());
      }
    }
  }

  override template() {
    return html`<div class="${style.fileSelect}">
      <label class="${style.fileSelectLabel}" htmlFor="${this.uploadElemId}">
        <div class="${style.fileInput}">
          <input
            class="${style.hidden}"
            id="${this.uploadElemId}"
            name="${this.uploadElemId}"
            type="file"
            accept=${this.data.accept}
          />

          <p class="${style["text-center"]}">${this.data.text}</p>
        </div>
      </label>
    </div> `;
  }
}
