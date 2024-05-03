// base
import { Page, html, on } from "rune-ts";

// templates
import { DetailTemplateView } from "../../components/templates";

// shared
import { IsLoading, LoadingView } from "../../shared";

// apis
import type { IDemoItem } from "../../apis/demo/types";

// style
import style from "./style.module.scss";

export class TikkleDetailPage extends Page<{
  item: IDemoItem;
}> {
  loadingView = new LoadingView({ text: "로딩중...", isShow: false });

  @on(IsLoading)
  private _isLoading(ev: IsLoading) {
    this.loadingView.data.isShow = ev.detail;
    this.loadingView.redraw();
  }

  override template() {
    return html`
      <div id="workspace" class="${style.workspace}">
        <div>${this.loadingView}</div>
        <div>${new DetailTemplateView({ item: this.data.item })}</div>
      </div>
    `;
  }
}
