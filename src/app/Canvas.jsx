import { h, Component } from 'preact';
import CanvasDom from './CanvasDom.jsx';

function createWebWorker(config) {
    if (window.Worker) {
        const myWorker = new Worker('dist/web-worker.js');
        myWorker.onmessage = config.onmessage;
        myWorker.onerror = config.onerror;
        return myWorker;
    }
}

function setContext(component) {
    return canvas => {
        component.canvas = canvas;
    };
}

function getImageData(image) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const width = image.width;
    const height = image.height;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0);

    return context.getImageData(0, 0, width, height);
}

export default class Canvas extends Component {
    constructor(props) {
        super(props);
        this.worker = createWebWorker({
            onmessage: this.onMessage.bind(this),
            onerror: event => console.log,
        });
    }

    render(props) {
        return <CanvasDom getRef={setContext(this)} />;
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.postMessage(this.props.filterFn, this.canvas);
        });
    }

    componentDidUpdate() {
        requestAnimationFrame(() => {
            this.postMessage(this.props.filterFn, this.canvas);
        });
    }

    componentWillUnmount() {
        this.worker && this.worker.terminate();
    }

    postMessage(filter) {
        const image = this.props.image;
        if (image !== null) {
            this.worker.postMessage([
                filter,
                getImageData(image),
                (this.timestamp = performance.now()),
            ]);
        }
    }

    onMessage(event) {
        if (this.timestamp === event.data[2]) {
            const imageData = event.data[1];
            const canvas = this.canvas;

            if (canvas.width !== imageData.width) {
                canvas.width = imageData.width;
            }
            if (canvas.height !== imageData.height) {
                canvas.height = imageData.height; // this flash canvas
            }

            canvas.getContext('2d').putImageData(imageData, 0, 0);
        }
    }
}
