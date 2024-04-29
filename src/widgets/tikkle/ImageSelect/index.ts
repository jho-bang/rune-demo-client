// base
import { View, html, on } from "rune-ts";

// style
import style from "./style.module.scss";

// widgets
import { EditorView } from "../Editor";

// shared
import { EditorAddIcon } from "../../../shared";

interface Props {
  text: string;
  accept: string;
  onChange(file: File): boolean;
  file?: File;
}

export class ImageSelectView extends View<Props> {
  uploadElemId = `file-upload-${Math.random().toString()}`;

  private showEditorView(file: File) {
    document.querySelector("#workspace")!.innerHTML = "";
    document
      .querySelector("#workspace")!
      .append(new EditorView({ file }).render());
  }

  override onMount() {
    if (this.data.file) {
      this.showEditorView(this.data.file);
    }
  }

  @on("change", `input`)
  private _onChange(ev) {
    const file = ev.currentTarget.files?.[0];

    if (file) {
      const onChanged = this.data.onChange(file);
      if (onChanged) this.showEditorView(file);
    }
  }

  override template() {
    return html`<div>
      <label class="${style.fileSelectLabel}" htmlFor="${this.uploadElemId}">
        <div>
          <input
            class="${style.hidden}"
            id="${this.uploadElemId}"
            name="${this.uploadElemId}"
            type="file"
            accept=${this.data.accept}
          />

          <div class="${style.icon}">${EditorAddIcon}</div>
        </div>
      </label>
    </div> `;
  }
}
