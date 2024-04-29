import { html, on, View } from "rune-ts";

import { onShowOriginClick } from "./lib";
import { onErase } from "./model";

// widgets
import { FloatView } from "../../../FloatList";

// shared
import {
  ButtonIcon,
  EditorImageIcon,
  IsLoading,
  WikiEditIcon,
} from "../../../../../shared";

interface Props {}

export class EditorFloatList extends View<Props> {
  isShowOrigin: boolean = false;

  @on("click", ".float-list .float-item > .show_origin")
  private async _show() {
    try {
      this.isShowOrigin = await onShowOriginClick(this.isShowOrigin);
    } catch (e) {
      console.log("이미지 로드 실패", e);
    }
  }

  @on("click", ".float-list .float-item > .erase_tikkle")
  private async _click() {
    try {
      this.dispatchEvent(IsLoading, { detail: true, bubbles: true });
      await onErase();
    } catch (e) {
      console.log(e);
    } finally {
      this.dispatchEvent(IsLoading, { detail: false, bubbles: true });
    }
  }

  override template() {
    return html`
      <div>
        ${new FloatView({
          floatList: [
            new ButtonIcon({
              class: `show_origin`,
              icon: EditorImageIcon,
              type: "primary",
            }),
            new ButtonIcon({
              class: `erase_tikkle`,
              icon: WikiEditIcon,
            }),
          ],
        })}
      </div>
    `;
  }
}
