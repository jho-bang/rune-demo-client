import { convertURLtoFile } from "../../../../shared";

export async function onClickImageItem(ev: Event) {
  const target = ev.currentTarget as HTMLElement;
  const image = target.querySelector("img") as HTMLImageElement;
  const src = image.getAttribute("src") as string;
  return convertURLtoFile(src);
}
