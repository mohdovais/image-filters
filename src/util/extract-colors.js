import { rgb2hsl } from './rgb2hsl';
//import getImageData from './image-data';

export function extractColors(imageData) {
    if (!imageData) return [];

    const { width, height, data } = imageData;
    const colors = {};

    // group together
    for (let i = 0, l = data.length; i < l; i += 4) {
        const hsl = rgb2hsl(data[i], data[i + 1], data[i + 2]);
        const group = Math.floor(hsl[0] / 30);

        if (colors[group] === undefined) {
            colors[group] = [hsl];
        } else {
            colors[group].push(hsl);
        }
    }

    return Object.keys(colors)
        .map(function(hue) {
            const collection = colors[hue];
            const count = collection.length;
            return {
                value: [
                    collection.reduce((a, v) => a + v[0], 0) / count,
                    collection.reduce((a, v) => a + v[1], 0) / count,
                    collection.reduce((a, v) => a + v[2], 0) / count,
                ],
                count,
            };
        })
        .sort((a, b) => b.count - a.count)
        .map(x => x.value);
    //.map(key => colors[key]);
}
