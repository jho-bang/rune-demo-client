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

export function setCookie(
  name: string,
  value: string,
  options: {
    expires?: Date | number | string;
    path?: string;
    domain?: string;
    secure?: boolean;
    "max-age"?: number;
  } = {},
) {
  options = {
    path: "/",
    // 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, "", {
    "max-age": -1,
  });
}
