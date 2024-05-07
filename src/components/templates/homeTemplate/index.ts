// base
import { View, html } from "rune-ts";

// oragnisms
import { ImageSelectView, ImageListView } from "../../oragnisms";

// atoms
import { FloatListView } from "../../atoms";

// apis
import type { IDemoItem, IProfile } from "../../../apis/demo/types";

interface Props {
  images: IDemoItem[];
  profile: IProfile;
}

export class HomeTemplate extends View<Props> {
  override template() {
    return html`
      <div>${new ImageListView(this.data.images || [])}</div>
      <div>
        ${new FloatListView([
          {
            item: new ImageSelectView({
              text: "이미지를 업로드해주세용.",
              accept: "image/*",
            }),
          },
        ])}
      </div>
    `;
  }
}
