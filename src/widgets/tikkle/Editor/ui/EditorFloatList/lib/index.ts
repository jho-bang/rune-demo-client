import { tikkleStore } from "../../../../../../stores";
import { loadImage } from "../../../../../../shared";

import {
  canvasInit,
  clearBrush,
  getCanvasBase64,
  getCanvasContext,
} from "../../../share";

export async function onShowOriginClick(isShowOrigin: boolean) {
  const { originImage, newImage } = tikkleStore.getStore();
  const image = await loadImage(isShowOrigin ? newImage : originImage);
  const ctx = getCanvasContext("#image_canvas");
  ctx!.drawImage(image, 0, 0, image.width, image.height);
  return !isShowOrigin;
}

export async function setNewImage(src: string, canvas: HTMLCanvasElement) {
  const newImage = await loadImage(src);
  tikkleStore.setStore({ newImage: src });
  clearBrush("#brush_canvas");
  canvasInit("#image_canvas", newImage, newImage);
}

export function getCanvasesInfo() {
  const { canvas: image, base64: image_base64 } =
    getCanvasBase64("#image_canvas");
  const { canvas: brush, base64: brush_base64 } =
    getCanvasBase64("#brush_canvas");

  return { image, image_base64, brush, brush_base64 };
}
