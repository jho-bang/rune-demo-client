// base
import { Page, html, on } from "rune-ts";

// style
import style from "./style.module.scss";

// lib
import { SIZE_10MB } from "./lib/consts";

// widgets
import { ImageSelectView, ImageListView } from "../../widgets/Tikkle";

// features
import { IsLoading } from "../../features/Tikkle/lib";

// entities
import { apis } from "../../entities";

// shared
import { LoadingView } from "../../shared";

export class TikklePage extends Page<object> {
  @on(IsLoading)
  private _isLoading({ detail: loading }) {
    if (loading) {
      const element = new LoadingView({}).render();
      this.element().append(element);
    } else {
      this.element().querySelector(".LoadingView")?.remove();
    }
  }

  async imageListViewRender() {
    const images = await apis.getList();
    const imageListView = new ImageListView([
      ...images,
      ...images,
      ...images,
    ]).render();
    this.element().append(imageListView);
  }

  imageSelectViewRender() {
    const imageSelect = new ImageSelectView({
      text: "이미지를 업로드해주세용",
      accept: "image/*",
      onChange: this.onFileChange,
    }).render();

    this.element().append(imageSelect);
  }

  override async onRender() {
    this.imageSelectViewRender();
    await this.imageListViewRender();
  }

  onFileChange(file: File) {
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
    return html` <div id="workspace" class="${style.main}"></div> `;
  }
}
