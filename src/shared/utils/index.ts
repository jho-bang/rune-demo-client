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
    img.crossOrigin = "Anonymous";
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

export function getServerCookie(req, name: string): string | null {
  const cookies = req.headers.cookie || "";
  return cookies
    .split("; ")
    .filter((cookie: string) => cookie.includes(name))[0];
}

export function wrapAsyncMiddleware(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

export function extHexToRGB(hex: string, alpha?: number) {
  if (!hex) return "";

  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

export function darkenColor(color: string, percent: number) {
  if (!color) return "";

  let f = parseInt(color.slice(1), 16), // HEX를 정수로 변환
    R = f >> 16, // 빨간색 값 추출
    G = (f >> 8) & 0x00ff, // 초록색 값 추출
    B = f & 0x0000ff; // 파란색 값 추출

  // 어두운 색 계산: 각 색상 값에서 percent만큼 감소
  R = Math.floor((R * (100 - percent)) / 100);
  G = Math.floor((G * (100 - percent)) / 100);
  B = Math.floor((B * (100 - percent)) / 100);

  // 다시 HEX 형식으로 변환하여 리턴
  return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
}

export function lightenColor(color: string, percent: number) {
  if (!color) return "";

  let f = parseInt(color.slice(1), 16), // HEX를 정수로 변환
    R = f >> 16, // 빨간색 값 추출
    G = (f >> 8) & 0x00ff, // 초록색 값 추출
    B = f & 0x0000ff; // 파란색 값 추출

  // 밝은 색 계산: 각 색상 값을 증가
  R = Math.floor(R + (255 - R) * (percent / 100));
  G = Math.floor(G + (255 - G) * (percent / 100));
  B = Math.floor(B + (255 - B) * (percent / 100));

  // 다시 HEX 형식으로 변환하여 리턴
  return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
}
