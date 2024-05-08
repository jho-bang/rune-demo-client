// base
import { Page, html } from "rune-ts";

// components
import { FloatListView, HeaderView } from "../../components";
import { EditorView } from "../../components/oragnisms/Editor";

// apis
import type { IDemoItem } from "../../apis/demo/types";
import type { IProfile } from "../../apis/user/types";

interface Props {
  item: IDemoItem;
  profile: IProfile;
}

export class DetailPage extends Page<Props> {
  editorView = new EditorView({ item: this.data.item });

  override template() {
    return html`
      <div>
        ${new HeaderView({ profile: this.data.profile, is_back: true })}
        ${this.editorView}
        ${new FloatListView({
          item: this.data.item,
          download: this.editorView.download,
          erase: this.editorView.erase,
          showOrigin: this.editorView.showOrigin,
          removeBG: this.editorView.removeBG,
        })}}
      </div>
    `;
  }
}
