import { ListView } from "rune-ts";

// atoms
import { type IImageItemProps, ImageItemView } from "../../atoms";

// style
import style from "./style.module.scss";

export class ImageListView extends ListView<IImageItemProps, ImageItemView> {
  override ItemView = ImageItemView;
  override className = style.imageListView;
}
