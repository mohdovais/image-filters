import { h, Component } from 'preact';
import CanvasDom from './CanvasDom.jsx';
import load_wasm from '../wasm/wasm.js';
//import load_wasm from '../../wasm-image-filters/pkg/wasm_image_filters';

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

let WASM;
function get_wasm() {
    return WASM === undefined
        ? load_wasm().then(exports => (WASM = exports))
        : Promise.resolve(WASM);
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
        if (image !== null && filter !== 'wasm') {
            this.worker.postMessage([
                filter,
                getImageData(image),
                (this.timestamp = performance.now()),
            ]);
        }

        if (image !== null && filter === 'wasm') {
            console.time('wasm');
            get_wasm().then(exports => {
                console.time('getContext');
                const ctx = this.canvas.getContext('2d');
                console.timeEnd('getContext');
                console.time('getImageData');
                const imageData = getImageData(image);
                console.timeEnd('getImageData');
                console.time('exports.RGB.new');
                const color = exports.RGB.new(255, 255, 0);
                console.timeEnd('exports.RGB.new');
                console.time('exports.CanvasImageData.new');
                const wasmImageData = exports.CanvasImageData.new(
                    imageData.width,
                    imageData.height,
                    imageData.data
                );
                console.timeEnd('exports.CanvasImageData.new');
                console.time('filter_custom_color');
                wasmImageData.filter_custom_color(color, 90);
                console.timeEnd('filter_custom_color');
                console.time('imageData.data.set');
                imageData.data.set(
                    new Uint8ClampedArray(
                        new Float32Array(
                            exports.wasm.memory.buffer,
                            wasmImageData.data(),
                            wasmImageData.width() * wasmImageData.height() * 4
                        )
                    )
                );
                console.timeEnd('imageData.data.set');
                console.time('putImageData');
                ctx.putImageData(imageData, 0, 0);
                console.timeEnd('putImageData');
                console.timeEnd('wasm');
            });
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

            console.log("complete", performance.now() - this.timestamp)
        }
    }
}
