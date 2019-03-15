import {
    invert,
    grayscale,
    red,
    green,
    blue,
    hue,
} from '../util/filter-functions.js';
import saturation from './../filters/saturation';
import lightness from './../filters/lightness';
import changeHue from './../filters/hue';
import pixelate from './../filters/pixelate';

onmessage = function(event) {
    console.time('filter');

    const eventData = event.data;
    const data = eventData[0].data;
    const filter = eventData[1];

    switch (filter) {
        case 'INVERT':
            invert(data);
            break;
        case 'GRAYSCALE':
            grayscale(data);
            break;
        case 'RED_TONE':
            red(data);
            break;
        case 'RED':
            hue(data, [255, 0, 0], 45);
            break;
        case 'GREEN_TONE':
            green(data);
            break;
        case 'GREEN':
            hue(data, [0, 255, 0], 75);
            break;
        case 'BLUE_TONE':
            blue(data);
            break;
        case 'BLUE':
            hue(data, [0, 0, 255], 60);
            break;
        case 'HUE':
            changeHue(data, -30);
            break;
        case 'SATURATION':
            saturation(data, 0.2);
            break;
        case 'LIGHTNESS':
            lightness(data, 0.2);
            break;
        case 'PIXELATE':
            pixelate(eventData[0], 10);
            break;
    }

    postMessage(event.data);

    console.timeEnd('filter');
};
