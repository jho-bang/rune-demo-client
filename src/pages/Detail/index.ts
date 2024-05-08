// base
import { Page, html, on } from "rune-ts";

// components
import {
  BrushCanvasView,
  EditorFloatListView,
  HeaderView,
  ImageCanvasView,
  LoadingView,
} from "../../components";

// shared
import { BASE_URL, convertURLtoFile, IsLoading } from "../../shared";

// apis
import type { IDemoItem } from "../../apis/demo/types";
import type { IProfile } from "../../apis/user/types";

// style
import style from "./style.module.scss";

import { canvasInit } from "./lib";

interface Props {
  item: IDemoItem;
  profile: IProfile;
}

export class TikkleDetailPage extends Page<Props> {
  loadingView = new LoadingView({ text: "로딩중...", isShow: false });
  editorFloatListView = new EditorFloatListView({ item: this.data.item });

  @on(IsLoading)
  private _isLoading(ev: IsLoading) {
    this.loadingView.data.isShow = ev.detail;
    this.loadingView.redraw();
  }

  override async onMount() {
    if (this.data.item) {
      const image = new Image();

      const file = await convertURLtoFile(
        `${BASE_URL}/${this.data.item.origin_src}`,
      );

      image.src = URL.createObjectURL(file);
      this.editorFloatListView.originImage = image.src;
      image.onload = () => {
        canvasInit(`.${ImageCanvasView}`, image, image);
        canvasInit(`.${BrushCanvasView}`, image);
      };
    }
  }

  override template() {
    return html`
      <div>
        <div>${this.loadingView}</div>
        <div>
          <div>
            ${new HeaderView({ profile: this.data.profile, is_back: true })}
          </div>
        </div>
        <div id="workspace" class="${style.workspace}">
          <div>${new BrushCanvasView({})} ${new ImageCanvasView({})}</div>
          <div>${this.editorFloatListView}</div>
        </div>
      </div>
    `;
  }
}
