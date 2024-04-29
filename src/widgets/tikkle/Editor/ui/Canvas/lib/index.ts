import { getCanvasContext } from "../../../share";

export function onMouseDown(ev: MouseEvent) {
  const ctx = getCanvasContext("#brush_canvas");

  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(ev.offsetX, ev.offsetY);
  }
}

export function onMouseMove(ev: MouseEvent) {
  const ctx = getCanvasContext("#brush_canvas");
  if (ctx) {
    if (ev.buttons === 1) {
      ctx.lineTo(ev.offsetX, ev.offsetY);
      ctx.strokeStyle = "#faf026";
      ctx.lineWidth = 20;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.stroke();
    }
  }
}
