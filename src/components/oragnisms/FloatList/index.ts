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
import { LikeApis } from "../../../apis";

interface Props {
  item: IDemoItem;
  download(): void;
  erase(): void;
  showOrigin(): void;
  removeBG(): void;
}

export class FloatListView extends View<Props> {
  is_liked: boolean = this.data.item.is_liked;
  heartView = new HeartView({ is_liked: this.is_liked });

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

  private onClickLike = async () => {
    if (this.is_liked) {
      await LikeApis.remove({ demo_id: this.data.item.id });
    } else {
      await LikeApis.add({ demo_id: this.data.item.id });
    }

    this.is_liked = this.heartView.toggle();
  };

  override template({ item }: Props) {
    return html`
      <div>
        <div class="like_float_button">
          ${new FloatButtonView({
            children: this.heartView,
            right: 20,
            bottom: 250,
            onClick: this.onClickLike,
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
