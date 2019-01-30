//Observer. = 2°, Illuminant = D65
//http://www.easyrgb.com/index.php?X=MATH&H=07#text7

function r2R(r) {
    const x = r / 255;
    return x > 0.04045
        ? Math.pow((x + 0.055) / 1.055, 2.4) * 100
        : (x / 12.92) * 100;
}

export function RGB2XYZ(rgb) {
    const R = r2R(rgb[0]),
        G = r2R(rgb[1]),
        B = r2R(rgb[2]);

    return {
        X: R * 0.4124 + G * 0.3576 + B * 0.1805,
        Y: R * 0.2126 + G * 0.7152 + B * 0.0722,
        Z: R * 0.0193 + G * 0.1192 + B * 0.9505,
    };
}

function x2X(x) {
    return x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
}

export function XYZ2LAB(x, y, z) {
    var X = x2X(x / 95.047),
        Y = x2X(y / 100.0),
        Z = x2X(z / 108.883);

    return {
        L: 116 * Y - 16,
        a: 500 * (X - Y),
        b: 200 * (Y - Z),
    };
}

export function RGB2LAB(rgb) {
    var XYZ = RGB2XYZ(rgb);

    return XYZ2LAB(XYZ.X, XYZ.Y, XYZ.Z);
}

//https://en.wikipedia.org/wiki/Color_difference
//CIE76
export function CIE76RGB(rgb1, rgb2) {
    var Lab1 = RGB2LAB(rgb1),
        Lab2 = RGB2LAB(rgb2);

    return CIE76Lab(Lab1, Lab2);
}

export function CIE76Lab(Lab1, Lab2) {
    var dL = Lab1.L - Lab2.L,
        da = Lab1.a - Lab2.a,
        db = Lab1.b - Lab2.b;

    return Math.sqrt(Math.pow(dL, 2) + Math.pow(da, 2) + Math.pow(db, 2));
}
