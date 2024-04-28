export function loadImage(src) {
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
