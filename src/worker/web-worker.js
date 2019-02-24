import {
    invert,
    grayscale,
    red,
    red2,
    green,
    green2,
    blue,
    blue2,
    distance3d,
    contrast,
    hue,
} from '../util/filter-functions.js';
import { hex2rgb } from './../util/hex2rgb.js';

onmessage = function(event) {
    console.time('filter');
    const eventData = event.data;
    const data = eventData[0].data;
    const filter = eventData[1];
    const color = eventData[2];
    const threshold = eventData[3] | 0;

    switch (filter) {
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
            red2(data, threshold);
            break;
        case 'green':
            green(data);
            break;
        case 'green2':
            green2(data, threshold);
            break;
        case 'blue':
            blue(data);
            break;
        case 'blue2':
            blue2(data, threshold);
            break;
        case 'distance3d':
            distance3d(data, hex2rgb(color), threshold);
            break;
        case 'contrast':
            contrast(data, threshold);
            break;
        case 'hue':
            hue(data, hex2rgb(color), threshold);
    }
    console.timeEnd('filter');

    postMessage(event.data);
};
