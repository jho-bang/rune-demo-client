import { ListView } from "rune-ts";

import { type IImageItemProps, ImageItemView } from "../ImageItem";

// style
import style from "./style.module.scss";

export class ImageListView extends ListView<IImageItemProps, ImageItemView> {
  override ItemView = ImageItemView;
  override className = style.imageListView;
}
