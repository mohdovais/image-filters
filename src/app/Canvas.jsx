import { h, Component } from 'preact';
import { pure, shallowDiffers } from '../util/pure-component.js';

const Dom = pure(function CanvasDom(props) {
    console.log('canvas dom')
    return (
        <canvas
            ref={props.getRef}
            style={{
                maxWidth: '100%',
                height: 'auto',
            }}
        />
    );
});

function putImageData(canvas, imageData) {
    const context = canvas.getContext('2d');

    if (imageData) {
        if (canvas.width !== imageData.width) {
            canvas.width = imageData.width;
        }
        if (canvas.height !== imageData.height) {
            canvas.height = imageData.height; // this flash canvas
        }

        context.putImageData(imageData, 0, 0);
    }
}

export default class Canvas extends Component {
    constructor(props) {
        super(props);
        this.getRef = canvas => (this.canvas = canvas);
    }

    shouldComponentUpdate(props) {
        return shallowDiffers(this.props, props);
    }

    render() {
        return <Dom getRef={this.getRef} />;
    }

    componentDidUpdate() {
        putImageData(this.canvas, this.props.image);
    }
}
