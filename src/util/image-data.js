export default function getImageData(image, dWidth, dHeight) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const sWidth = image.width;
    const sHeight = image.height;

    dWidth = dWidth === undefined ? sWidth : dWidth;
    dHeight = dHeight === undefined ? sHeight : dHeight;
    canvas.width = dWidth;
    canvas.height = dHeight;
    context.drawImage(image, 0, 0, sWidth, sHeight, 0, 0, dWidth, dHeight);

    return context.getImageData(0, 0, dWidth, dHeight);
}
