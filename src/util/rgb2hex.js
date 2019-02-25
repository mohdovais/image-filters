function toHex(number) {
    return number === undefined ? '' : number.toString(16);
}

function twoDigits(digit) {
    return (digit.length === 1 ? '0' : '') + digit;
}

export function rgb2hex(r, g, b) {
    const rgb = typeof r.forEach === 'function' ? r : [r, g, b];
    return (
        '#' +
        twoDigits(toHex(rgb[0])) +
        twoDigits(toHex(rgb[1])) +
        twoDigits(toHex(rgb[2]))
    );
}
