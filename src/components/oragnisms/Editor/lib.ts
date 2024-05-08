const IMG_RESIZE_RATE = 0.6;

export function resizeImage(width: number, height: number) {
  if (width >= 1000 || height >= 1000) {
    const resizeWidth = width * IMG_RESIZE_RATE;
    const resizeHeight = height * IMG_RESIZE_RATE;
    return resizeImage(resizeWidth, resizeHeight);
  }

  return { resizeWidth: width, resizeHeight: height };
}
