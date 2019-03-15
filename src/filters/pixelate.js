// function call is expensive
// therefore all in single function
export default function pixelate(imageData, size) {
    size = size | 0;
    const { width, height, data } = imageData;

    for (let row = 0; row < height; row += size) {
        for (let col = 0; col < width; col += size) {
            const indices = [];
            const reds = [];
            const blues = [];
            const greens = [];

            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    let index = 4 * (col + i + (row + j) * width);
                    if (data[index] !== undefined) {
                        indices.push(index);
                        reds.push(data[index]);
                        blues.push(data[index + 1]);
                        greens.push(data[index + 2]);
                    }
                }
            }
            const count = reds.length;
            const red = reds.reduce((accum, color) => accum + color, 0) / count;
            const blue =
                blues.reduce((accum, color) => accum + color, 0) / count;
            const green =
                greens.reduce((accum, color) => accum + color, 0) / count;

            indices.forEach(function(index) {
                data[index] = red;
                data[index + 1] = blue;
                data[index + 2] = green;
            });
        }
    }

    return data;
}
