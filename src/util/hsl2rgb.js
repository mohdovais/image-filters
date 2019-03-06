// https://www.rapidtables.com/convert/color/hsl-to-rgb.html

export function hsl2rgb(h, s, l) {
    const twoL = 2 * l;
    const C = (1 - (twoL > 1 ? twoL - 1 : 1 - twoL)) * s;
    const modH = (h / 60) % 2;
    const X = C * (1 - (modH > 1 ? modH - 1 : 1 - modH));
    const m = l - C / 2;
    let r, g, b;

    if (h >= 0 && h < 60) {
        r = C;
        g = X;
        b = 0;
    } else if (h >= 60 && h < 120) {
        r = X;
        g = C;
        b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0;
        g = C;
        b = X;
    } else if (h >= 180 && h < 240) {
        r = 0;
        g = X;
        b = C;
    } else if (h >= 240 && h < 300) {
        r = X;
        g = 0;
        b = C;
    } else if (h >= 300 && h < 360) {
        r = C;
        g = 0;
        b = X;
    } else {
        r = g = b = 0;
    }

    return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}
