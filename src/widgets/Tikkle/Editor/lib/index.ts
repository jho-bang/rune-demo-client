export function getCanvas(target: string) {
  return document.querySelector(target) as HTMLCanvasElement;
}

export function getCanvasContext(target: string) {
  const canvas = getCanvas(target);
  return canvas!.getContext("2d");
}

export function canvasInit(
  target: string,
  image: HTMLImageElement,
  newImage?: HTMLImageElement,
) {
  const ctx = getCanvasContext(target);
  const width = image.naturalWidth;
  const height = image.naturalHeight;

  if (ctx) {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    // ctx.clearRect(0, 0, width, height);
    if (newImage) {
      ctx.drawImage(newImage, 0, 0, width, height);
    }
  }
}

export function clearBrush() {
  const canvas = getCanvas("#brush_canvas");
  const ctx = getCanvasContext("#brush_canvas");

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

export function onMouseDown() {
  const canvas = getCanvas("#brush_canvas");
  const ctx = getCanvasContext("#brush_canvas");

  if (ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#faf026";
    canvas.style.opacity = "0.6";
  }
}

export function onMouseMove(ev: MouseEvent) {
  const ctx = getCanvasContext("#brush_canvas");
  if (ctx) {
    ctx.arc(ev.offsetX, ev.offsetY, 30, 0, Math.PI * 2, true);
    ctx.fill();
  }
}
