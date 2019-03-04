const myWorker = new Worker('dist/web-worker.js');
const requests = {};

myWorker.onmessage = function(event) {
    const data = event.data;
    const timestamp = Array.isArray(data) ? data[4] : -1;
    const promise = requests[timestamp];
    if (promise !== undefined) {
        promise.resolve(data[0]);
        delete requests[timestamp];
    }
};

myWorker.onerror = function(event) {
    // no idea
};

export function requestImageFilter(options) {
    const { image, filter, color, threshold } = options;
    return new Promise(function(resolve, reject) {
        const timestamp = filter + '_' + performance.now() + Math.random();
        requests[timestamp] = {
            resolve,
            reject,
        };
        myWorker.postMessage([image, filter, color, threshold, timestamp]);
    });
}
