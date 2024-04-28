export function loadImage(src: string): Promise<HTMLImageElement> {
  const image = new Image();
  return new Promise((resolve, reject) => {
    const initSRC = image.src;
    const img = image;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (err) => {
      img.src = initSRC;
      reject(err);
    };
    img.src = src;
  });
}

export function blobToBase64(data: Blob): Promise<string | ArrayBuffer> {
  const reader = new FileReader();
  reader.readAsDataURL(data);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      const base64 = reader.result || '';
      resolve(base64);
    };
  });
}
