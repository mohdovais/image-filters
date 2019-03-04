export default function filterReducer(state, filter) {
    let threshold = 8;
    let thresholdMax = 255;
    let showColor = false;

    if (state.filter === filter) {
        return state;
    }

    switch (filter) {
        case 'ORIGINAL':
        case 'INVERT':
        case 'GRAYSCALE':
        case 'RED_TONE':
        case 'GREEN_TONE':
        case 'BLUE_TONE':
            threshold = thresholdMax = 0;
            break;
        case 'RED':
            threshold = 30;
            break;
        case 'hue':
            (threshold = 30), (thresholdMax = 360), (showColor = true);
    }

    return Object.assign({}, state, {
        filter,
        threshold,
        thresholdMax,
        showColor,
    });
}
