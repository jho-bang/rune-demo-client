// base
import { View, html, on } from "rune-ts";

// style
import style from "./style.module.scss";

// shared
import { EditorAddIcon, SIZE_10MB } from "../../../shared";

// atoms
import { ButtonIcon } from "../../atoms";

// apis
import { DemoApis } from "../../../apis";

interface Props {
  text: string;
  accept: string;
  file?: File;
}

export class ImageSelectButton extends View<Props> {
  private uploadElemId = `file-upload-${Math.random().toString()}`;

  @on("change", `.${style.hidden}`)
  private async _onChange(ev: Event) {
    const currentTarget = ev.currentTarget as HTMLInputElement;
    const file = currentTarget.files?.[0];
    if (file) {
      const onChanged = this.onFileChange(file);
      if (onChanged) {
        const id = await this.onUpload(file);
        window.location.href = `/detail?id=${id}`;
      }
    }
  }

  private onClick = () => {
    const elem = this.element().querySelector(
      `.${style.fileSelectLabel}`,
    ) as HTMLInputElement;

    elem.click();
  };

  private async onUpload(file: File) {
    const { path } = await DemoApis.upload(file);
    const { data } = await DemoApis.insert({ origin_src: path });
    return data[0].id;
  }

  private onFileChange(file: File) {
    if (!file) {
      return false;
    }

    const isImage = file.type.match("image.*");
    if (!isImage) {
      return false;
    }

    // 10mb 이상 막기
    return file.size <= SIZE_10MB;
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

          <div>
            ${new ButtonIcon({
              classes: style.ButtonIcon,
              icon: EditorAddIcon,
              type: "Filled",
              onClick: this.onClick,
            })}
          </div>
        </div>
      </label>
    </div> `;
  }
}
