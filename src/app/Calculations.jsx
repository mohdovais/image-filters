import { h, Component } from 'preact';
import { shallowDiffers } from '../util/pure-component.js';

function createWebWorker(config) {
    if (window.Worker) {
        const myWorker = new Worker('dist/web-worker.js');
        myWorker.onmessage = config.onmessage;
        myWorker.onerror = config.onerror;
        return myWorker;
    }
}

export default class Calculations extends Component {
    constructor(props) {
        super(props);
        const me = this;

        me.worker = createWebWorker({
            onmessage: this.onMessage.bind(this),
            onerror: event => console.log(event),
        });
    }

    render() {
        return null;
    }

    componentWillUnmount() {
        this.worker && this.worker.terminate();
    }

    shouldComponentUpdate(props) {
        return shallowDiffers(this.props, props);
    }

    componentDidUpdate() {
        const props = this.props;
        this.postMessage(
            props.image,
            props.filter,
            props.color,
            props.threshold
        );
    }

    postMessage(image, filter, color, threshold) {
        if (image !== null) {
            this.worker.postMessage([
                image,
                filter,
                color,
                threshold,
                (this.timestamp = performance.now()),
            ]);
        }
    }

    onMessage(event) {
        if (this.timestamp === event.data[4]) {
            this.props.onFilterImage(event.data[0]);
        }
    }
}
