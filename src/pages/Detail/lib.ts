const IMG_RESIZE_RATE = 0.6;

export function getCanvas(target: string) {
  return document.querySelector(target) as HTMLCanvasElement;
}

export function getCanvasContext(target: string) {
  const canvas = getCanvas(target);
  return canvas!.getContext("2d");
}

export function getCanvasBase64(target: string) {
  const canvas = getCanvas(target);
  const base64 = canvas.toDataURL();
  return { canvas, base64 };
}

export function canvasInit(
  target: string,
  image: HTMLImageElement,
  newImage?: HTMLImageElement,
) {
  const ctx = getCanvasContext(target);

  const { resizeWidth, resizeHeight } = resizeImage(
    image.naturalWidth,
    image.naturalHeight,
  );

  console.log(resizeWidth, resizeHeight);

  if (ctx) {
    ctx.canvas.width = resizeWidth;
    ctx.canvas.height = resizeHeight;
    // ctx.clearRect(0, 0, width, height);
    if (newImage) {
      ctx.drawImage(newImage, 0, 0, resizeWidth, resizeHeight);
    }
  }
}

export function clearBrush(target: string) {
  const canvas = getCanvas(target);
  const ctx = getCanvasContext(target);

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export function resizeImage(width: number, height: number) {
  if (width >= 1000 || height >= 1000) {
    const resizeWidth = width * IMG_RESIZE_RATE;
    const resizeHeight = height * IMG_RESIZE_RATE;
    return resizeImage(resizeWidth, resizeHeight);
  }

  return { resizeWidth: width, resizeHeight: height };
}
