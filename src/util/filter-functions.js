import { CIE76Lab, RGB2LAB } from './lab.js';

const THRESHOLD = 8;

export function invert(data) {
    let i = 0;
    const length = data.length;

    for (i = 0; i < length; i++) {
        data[i] = (i + 1) % 4 === 0 ? data[i] : 255 - data[i];
    }

    return data;
}

export function grayscale(data) {
    const length = data.length;
    let i, avg;

    for (i = 0; i < length; i += 4) {
        avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = data[i + 1] = data[i + 2] = avg;
    }

    return data;
}

export function red(data) {
    let avg, i, l;

    for (i = 0, l = data.length; i < l; i += 4) {
        avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = data[i] > avg ? data[i] : avg;
        data[i + 1] = data[i + 2] = avg;
    }

    return data;
}

export function red2(data) {
    let r, g, b, i, l;

    for (i = 0, l = data.length; i < l; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];

        if (r < g - THRESHOLD || r < b - THRESHOLD) {
            data[i] = data[i + 1] = data[i + 2] = (r + g + b) / 3;
        }
    }

    return data;
}

export function green(data) {
    let avg, i, l;

    for (i = 0, l = data.length; i < l; i += 4) {
        avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i + 1] = data[i + 1] > avg ? data[i + 1] : avg;
        data[i] = data[i + 2] = avg;
    }

    return data;
}

export function green2(data) {
    var r, g, b, i, l;

    for (i = 0, l = data.length; i < l; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
        if (g < r - THRESHOLD || g < b - THRESHOLD) {
            data[i] = data[i + 1] = data[i + 2] = (r + g + b) / 3;
        }
    }

    return data;
}

export function blue(data) {
    let avg, i, l;

    for (i = 0, l = data.length; i < l; i += 4) {
        avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (data[i + 2] < avg) {
            data[i] = data[i + 1] = data[i + 2] = avg;
        }
    }

    return data;
}

export function blue2(data) {
    let r, g, b, i, l;

    for (i = 0, l = data.length; i < l; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];

        if (b < r - THRESHOLD || b < g - THRESHOLD) {
            data[i] = data[i + 1] = data[i + 2] = (r + g + b) / 3;
        }
    }

    return data;
}

export function customColor(rgb, threshold) {
    const targetLab = RGB2LAB([rgb[0] | 0, rgb[1] | 0, rgb[2] | 0]);
    const th = threshold | 0;

    return function(data) {
        let r, g, b, i, l;
        for (i = 0, l = data.length; i < l; i += 4) {
            r = data[i];
            g = data[i + 1];
            b = data[i + 2];

            if (CIE76Lab(targetLab, RGB2LAB([r, g, b])) > th) {
                data[i] = data[i + 1] = data[i + 2] = (r + g + b) / 3;
            }
        }

        return data;
    };
}

export function distance3d(data, rgb, threshold) {
    let r, g, b, i, l, ΔR_square, ΔG_square, ΔB_square;
    for (i = 0, l = data.length; i < l; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];

        ΔR_square = Math.pow(rgb[0] - r, 2);
        ΔG_square = Math.pow(rgb[1] - g, 2);
        ΔB_square = Math.pow(rgb[2] - b, 2);

        let d = Math.sqrt(
            2 * ΔR_square +
                4 * ΔG_square +
                3 * ΔB_square +
                ((rgb[0] + r) * (ΔR_square - ΔB_square)) / 512
        );

        if (d > threshold) {
            data[i] = data[i + 1] = data[i + 2] = (r + g + b) / 3;
        }
    }

    return data;
}
