import { rgb2hsl } from '../util/rgb2hsl';
import { hsl2rgb } from '../util/hsl2rgb';

export default function saturation(data, delta) {
    for (let i = 0, l = data.length; i < l; i += 4) {
        const hsl = rgb2hsl(data[i], data[i + 1], data[i + 2]);
        const saturation = hsl[1] + delta;
        const rgb = hsl2rgb(
            hsl[0],
            saturation > 1 ? 1 : saturation < 0 ? 0 : saturation,
            hsl[2]
        );
        data[i] = rgb[0];
        data[i + 1] = rgb[1];
        data[i + 2] = rgb[2];
    }

    return data;
}
