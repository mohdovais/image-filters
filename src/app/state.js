export const defaultState = {
    image: null,
    filter: 'original',
    filteredImage: null,
    color: '#ffff00',
    showColor: false,
    threshold: 0,
    thresholdMin: 0,
    thresholdMax: 0,
};

function getFilterState(data) {
    const filter = data.target.value;
    let threshold = 8;
    let thresholdMax = 255;
    let showColor = false;

    switch (filter) {
        case 'original':
        case 'invert':
        case 'grayscale':
        case 'red':
        case 'green':
        case 'blue':
            threshold = thresholdMax = 0;
            break;
        case 'distance3d':
            threshold = 382;
            thresholdMax = 765;
            showColor = true;
            break;
        case 'hue':
            (threshold = 30), (thresholdMax = 360), (showColor = true);
    }

    return {
        filter,
        threshold,
        thresholdMax,
        showColor,
    };
}

function getState(key, data, currentState) {
    let newState = {};
    switch (key) {
        case 'filter':
            newState = getFilterState(data);
            break;
        case 'filteredImage':
        case 'image':
            newState[key] = data;
            break;
        default:
            newState[key] = data.target.value;
    }

    return Object.assign({}, currentState, newState);
}

export const setState = (component, action) => data =>
    component.setState(state => getState(action, data, state));
