import {
    invert,
    grayscale,
    red,
    green,
    blue,
    hue,
} from '../util/filter-functions.js';

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
            hue(data, [255, 0, 0], 60);
            break;
        case 'GREEN_TONE':
            green(data);
            break;
        case 'GREEN':
            hue(data, [0, 255, 0], 60);
            break;
        case 'BLUE_TONE':
            blue(data);
            break;
        case 'BLUE':
            hue(data, [0, 0, 255], 60);
            break;
    }

    postMessage(event.data);

    console.timeEnd('filter');
};
