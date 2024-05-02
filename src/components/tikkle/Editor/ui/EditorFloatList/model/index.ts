import { getCanvasesInfo, setNewImage } from "../lib";
import { apis, inpaint } from "../../../../../../apis";

export async function onErase() {
  const { image, image_base64, brush, brush_base64 } = getCanvasesInfo();

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
