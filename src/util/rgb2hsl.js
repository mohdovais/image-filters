export function calculateHue(r, g, b) {
    const R = r / 255;
    const G = g / 255;
    const B = b / 255;
    const min = Math.min(R, G, B);
    const max = Math.max(R, G, B);
    let hue;

    if (min == max) {
        hue = 0;
    } else {
        const range = max - min;
        switch (max) {
            case R:
                hue = (G < B ? 6 : 0) + (G - B) / range;
                break;
            case G:
                hue = 2 + (B - R) / range;
                break;
            case B:
                hue = 4 + (R - G) / range;
                break;
        }
        hue = 60 * (hue < 0 ? 360 + hue : hue);
    }

    return hue;
}

export function rgb2hsl(r, g, b) {
    const R = r / 255;
    const G = g / 255;
    const B = b / 255;
    const min = Math.min(R, G, B);
    const max = Math.max(R, G, B);
    const lightness = (max + min) / 2;
    const saturation =
        max === 0 || min === 1
            ? 0
            : (max - lightness) / Math.min(lightness, 1 - lightness);
    const hue = calculateHue(r, g, b);

    return [hue, saturation, lightness];
}
