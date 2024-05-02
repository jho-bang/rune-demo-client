// base
import { Page, html, on } from "rune-ts";

// style
import style from "./style.module.scss";

// components
import {
  FloatView,
  ImageListView,
  ImageSelectView,
  OnFileSelect,
} from "../../components";

// apis
import { apis } from "../../apis";

// shared
import { IsLoading, LoadingView, SIZE_10MB } from "../../shared";

export class TikklePage extends Page<{}> {
  @on(IsLoading)
  private _isLoading({ detail: loading }) {
    if (loading) {
      const element = new LoadingView({ text: "로딩중..." }).render();
      this.element().append(element);
    } else {
      this.element().querySelector(".LoadingView")?.remove();
    }
  }

  async imageListViewRender() {
    const images = await apis.getList({});
    const imageListView = new ImageListView(images).render();
    this.element().append(imageListView);
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

  @on(OnFileSelect)
  private _onFileSelect(ev) {
    const file = ev.detail;
    this.element().innerHTML = "";
    this.element().append(
      new FloatView({
        floatList: [
          new ImageSelectView({
            file,
            text: "이미지를 업로드해주세용.",
            accept: "image/*",
            onChange: this.onFileChange,
          }),
        ],
      }).render(),
    );
  }

  override async onRender() {
    await this.imageListViewRender();
  }

  override template() {
    return html`
      <div id="workspace" class="${style.main}">
        <div>
          ${new FloatView({
            floatList: [
              new ImageSelectView({
                text: "이미지를 업로드해주세용.",
                accept: "image/*",
                onChange: this.onFileChange,
              }),
            ],
          })}
        </div>
      </div>
    `;
  }
}
