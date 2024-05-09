import { html, View } from "rune-ts";

// shared
import {
  ArrowDownIcon,
  LaunchIcon,
  SmileOutlineIcon,
  WikiEditIcon,
} from "../../../shared";

// atoms
import { ButtonIcon, FloatButtonView, HeartView } from "../../atoms";

import type { IDemoItem } from "../../../apis/demo/types";

// style
import style from "./style.module.scss";

interface Props {
  item: IDemoItem;
  download(): void;
  erase(): void;
  showOrigin(): void;
  removeBG(): void;
}

export class FloatListView extends View<Props> {
  private onDownload = () => {
    this.data.download();
  };

  private onShowOrigin = () => {
    this.data.showOrigin();
  };

  private onRemoveBG = () => {
    this.data.removeBG();
  };

  private onRrase = () => {
    this.data.erase();
  };

  override template() {
    return html`
      <div>
        <div>
          ${new FloatButtonView({
            children: new HeartView({ is_liked: this.data.item.is_liked }),
            right: 20,
            bottom: 250,
            onClick: this.onDownload,
          })}
        </div>
        <div>
          ${new FloatButtonView({
            children: new ButtonIcon({
              classes: style.ButtonIcon,
              icon: ArrowDownIcon,
              type: "primary",
            }),
            right: 20,
            bottom: 200,
            onClick: this.onDownload,
          })}
        </div>
        <div>
          ${new FloatButtonView({
            children: new ButtonIcon({
              classes: style.ButtonIcon,
              icon: SmileOutlineIcon,
              type: "primary",
            }),
            onClick: this.onShowOrigin,
            right: 20,
            bottom: 150,
          })}
        </div>
        <div>
          ${new FloatButtonView({
            children: new ButtonIcon({
              classes: style.ButtonIcon,
              icon: LaunchIcon,
              type: "primary",
            }),
            onClick: this.onRemoveBG,
            right: 20,
            bottom: 100,
          })}
        </div>
        <div>
          ${new FloatButtonView({
            children: new ButtonIcon({
              classes: style.ButtonIcon,
              icon: WikiEditIcon,
              type: "primary",
            }),
            onClick: this.onRrase,
            right: 20,
            bottom: 50,
          })}
        </div>
      </div>
    `;
  }
}
