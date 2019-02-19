export function hex2rgb(hexcolor) {
    const color = (hexcolor || '#000000').toString().replace('#', '');
    const length = color.length / 3;

    return [0, 1, 2].map(i => {
        const chunk = color.substr(i * length, length);
        return parseInt(length === 1 ? chunk + chunk : chunk, 16);
    });
}
