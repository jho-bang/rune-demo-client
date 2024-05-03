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
      const base64 = reader.result || "";
      resolve(base64);
    };
  });
}

export async function convertURLtoFile(url: string) {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
  const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` };
  return new File([data], filename!, metadata);
}

export function qs(obj: object) {
  return Object.entries(obj)
    .map(([k, v]) => {
      if (typeof v === "boolean" || v) {
        return `${k}=${v}`;
      }
    })
    .join("&");
}

export function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
