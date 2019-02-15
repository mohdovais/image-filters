import {
    invert,
    grayscale,
    red,
    red2,
    green,
    green2,
    blue,
    blue2,
    customColor,
    distance,
} from './filter-functions.js';

onmessage = function(event) {
    console.time('filter');
    let data = event.data[1].data;

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
