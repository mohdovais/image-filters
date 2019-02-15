'use strict';

//Observer. = 2°, Illuminant = D65
//http://www.easyrgb.com/index.php?X=MATH&H=07#text7

function r2R(r) {
    var x = r / 255;
    return x > 0.04045
        ? Math.pow((x + 0.055) / 1.055, 2.4) * 100
        : (x / 12.92) * 100;
}

function RGB2XYZ(rgb) {
    var R = r2R(rgb[0]),
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

function XYZ2LAB(x, y, z) {
    var X = x2X(x / 95.047),
        Y = x2X(y / 100.0),
        Z = x2X(z / 108.883);

    return {
        L: 116 * Y - 16,
        a: 500 * (X - Y),
        b: 200 * (Y - Z),
    };
}

function RGB2LAB(rgb) {
    var XYZ = RGB2XYZ(rgb);

    return XYZ2LAB(XYZ.X, XYZ.Y, XYZ.Z);
}

function CIE76Lab(Lab1, Lab2) {
    var dL = Lab1.L - Lab2.L,
        da = Lab1.a - Lab2.a,
        db = Lab1.b - Lab2.b;

    return Math.sqrt(Math.pow(dL, 2) + Math.pow(da, 2) + Math.pow(db, 2));
}

var THRESHOLD = 8;

function invert(data) {
    var i = 0;
    var length = data.length;

    for (i = 0; i < length; i++) {
        data[i] = (i + 1) % 4 === 0 ? data[i] : 255 - data[i];
    }

    return data;
}

function grayscale(data) {
    var length = data.length;
    var i, avg;

    for (i = 0; i < length; i += 4) {
        avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = data[i + 1] = data[i + 2] = avg;
    }

    return data;
}

function red(data) {
    var avg, i, l;

    for (i = 0, l = data.length; i < l; i += 4) {
        avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = data[i] > avg ? data[i] : avg;
        data[i + 1] = data[i + 2] = avg;
    }

    return data;
}

function red2(data) {
    var r, g, b, avg, i, l;

    for (i = 0, l = data.length; i < l; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
        avg = (r + g + b) / 3;

        if (r < g + THRESHOLD || r < b + THRESHOLD) {
            data[i] = data[i + 1] = data[i + 2] = avg;
        }
    }

    return data;
}

function green(data) {
    var avg, i, l;

    for (i = 0, l = data.length; i < l; i += 4) {
        avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i + 1] = data[i + 1] > avg ? data[i + 1] : avg;
        data[i] = data[i + 2] = avg;
    }

    return data;
}

function green2(data) {
    var r, g, b, avg, i, l;

    for (i = 0, l = data.length; i < l; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
        avg = (r + g + b) / 3;
        if (g < r + THRESHOLD || g < b + THRESHOLD) {
            data[i] = data[i + 1] = data[i + 2] = avg;
        }
    }

    return data;
}

function blue(data) {
    var avg, i, l;

    for (i = 0, l = data.length; i < l; i += 4) {
        avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (data[i + 2] < avg) {
            data[i] = data[i + 1] = data[i + 2] = avg;
        }
    }

    return data;
}

function blue2(data) {
    var r, g, b, avg, i, l;

    for (i = 0, l = data.length; i < l; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
        avg = (r + g + b) / 3;

        if (b < r + THRESHOLD || b < g + THRESHOLD) {
            data[i] = data[i + 1] = data[i + 2] = avg;
        }
    }

    return data;
}

function customColor(rgb, threshold) {
    var targetLab = RGB2LAB([rgb[0] | 0, rgb[1] | 0, rgb[2] | 0]);
    var th = threshold | 0;

    return function(data) {
        var r, g, b, i, l;
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

function distance(data, rgb, threshold) {
    var r, g, b, i, l, dR2, dG2, dB2;
    for (i = 0, l = data.length; i < l; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];

        dR2 = Math.pow(rgb[0] - r, 2);
        dG2 = Math.pow(rgb[1] - g, 2);
        dB2 = Math.pow(rgb[2] - b, 2);

        var d = Math.sqrt(
            2 * dR2 + 4 * dG2 + 3 * dB2 + ((rgb[0] + r) * (dR2 - dB2)) / 512
        );

        if (d > threshold) {
            data[i] = data[i + 1] = data[i + 2] = (r + g + b) / 3;
        }
    }

    return data;
}

onmessage = function(event) {
    console.time('filter');
    var data = event.data[1].data;

    switch (event.data[0]) {
        case 'invert':
            invert(data);
            break;
        case 'grayscale':
            grayscale(data);
            break;
        case 'red':
            red(data);
            break;
        case 'red2':
            red2(data);
            break;
        case 'green':
            green(data);
            break;
        case 'green2':
            green2(data);
            break;
        case 'blue':
            blue(data);
            break;
        case 'blue2':
            blue2(data);
            break;
        case 'distance':
            distance(data, [0, 255, 0], 382.5);
            break;
        case 'customColor':
            customColor([255, 255, 0], 50)(data);
    }
    console.timeEnd('filter');

    postMessage(event.data);
};
