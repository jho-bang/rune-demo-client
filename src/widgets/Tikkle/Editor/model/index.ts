import { loadImage } from "../../../../shared";
import { tikkleStore } from "../../../../features";
import { canvasInit, clearBrush, getCanvas, getCanvasContext } from "../lib";
import { apis, inpaint } from "../../../../apis";

export async function setNewImage(src: string, canvas: HTMLCanvasElement) {
  const newImage = await loadImage(src);
  tikkleStore.setStore({ newImage: src });
  const imageCanvasCtx = canvas!.getContext("2d");
  imageCanvasCtx!.drawImage(newImage, 0, 0, canvas.width, canvas.height);
  clearBrush();
}

export async function onClickShowOrigin(isShowOrigin: boolean) {
  const { originImage, newImage } = tikkleStore.getStore();
  const image = await loadImage(isShowOrigin ? newImage : originImage);
  const ctx = getCanvasContext("#image_canvas");
  ctx!.drawImage(image, 0, 0, image.width, image.height);

  document.querySelector(".show_origin")!.textContent = isShowOrigin
    ? "원본 보기"
    : "수정본 보기";

  return !isShowOrigin;
}

export async function onErase() {
  const image = getCanvas("#image_canvas");
  const image_base64 = image.toDataURL();

  const brush = getCanvas("#brush_canvas");
  const brush_base64 = brush.toDataURL();

  const blob = await inpaint({
    width: image.width,
    height: image.height,
    image: image_base64,
    mask: brush_base64,
  });

  const new_file = new File([blob], "new_file");
  const { path } = await apis.upload(new_file);

  const src = URL.createObjectURL(blob);
  await apis.insert({ origin_src: path });
  await setNewImage(src, image);
}

export function init(file: File) {
  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = () => {
    tikkleStore.setStore({ originImage: image.src });
    canvasInit("#image_canvas", image, image);
    canvasInit("#brush_canvas", image);
  };
}
