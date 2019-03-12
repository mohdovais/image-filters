// https://www.rapidtables.com/convert/color/hsl-to-rgb.html

export function hsl2rgb(h, s, l) {
    const twiceL = 2 * l;
    const modH = (h / 60) % 2;

    const C = (twiceL > 1 ? 2 - twiceL : twiceL) * s * 255;
    const X = (modH > 1 ? 2 - modH : modH) * C;
    const m = l * 255 - C / 2;
    let r, g, b;

    switch ((h / 60) | 0) {
        case 0:
            r = C;
            g = X;
            b = 0;
            break;
        case 1:
            r = X;
            g = C;
            b = 0;
            break;
        case 2:
            r = 0;
            g = C;
            b = X;
            break;
        case 3:
            r = 0;
            g = X;
            b = C;
            break;
        case 4:
            r = X;
            g = 0;
            b = C;
            break;
        case 5:
            r = C;
            g = 0;
            b = X;
            break;
        default:
            r = g = b = 0;
    }

    return [r + m, g + m, b + m];
}
