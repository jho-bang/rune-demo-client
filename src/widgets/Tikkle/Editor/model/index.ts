import { loadImage } from "../../../../shared";
import { store } from "../../../../features/Tikkle";
import { clearBrush } from "../lib";

export async function setNewImage(src: string, canvas: HTMLCanvasElement) {
  const newImage = await loadImage(src);
  store.setStore({ newImage: src });
  const imageCanvasCtx = canvas!.getContext("2d");
  imageCanvasCtx!.drawImage(newImage, 0, 0, canvas.width, canvas.height);
  clearBrush();
}
