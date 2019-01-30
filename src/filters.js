import {
    invert,
    grayscale,
    red,
    red2,
    green,
    green2,
    blue,
    blue2,
    customColor
} from './filter-functions.js';

export default {
    invert: {
        label: 'Invert',
        fn: 'invert',
    },
    grayscale: {
        label: 'Grayscale',
        fn: 'grayscale',
    },
    red: {
        label: 'Red',
        fn: 'red',
    },
    red2: {
        label: 'Other Red',
        fn: 'red2',
    },
    green: {
        label: 'Green',
        fn: 'green',
    },
    green2: {
        label: 'Other Green',
        fn: 'green2',
    },
    blue: {
        label: 'Blue',
        fn: 'blue',
    },
    blue2: {
        label: 'Other Blue',
        fn: 'blue2',
    },
    customColor: {
        label: 'Custom Colour',
        fn: 'customColor'
    }
};
