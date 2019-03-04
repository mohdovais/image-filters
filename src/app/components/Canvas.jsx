import { h, Component } from 'preact';
import { pure, shallowDiffers } from '../../util/pure-component.js';

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

const Dom = pure(function CanvasDom(props) {
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

export default class Canvas extends Component {
    constructor(props) {
        super(props);
        this.getRef = dom => (this.el = dom);
    }

    shouldComponentUpdate(props) {
        return shallowDiffers(this.props, props);
    }

    render() {
        return <Dom getRef={this.getRef} />;
    }

    componentDidMount() {
        putImageData(this.el, this.props.image);
    }

    componentDidUpdate() {
        putImageData(this.el, this.props.image);
    }
}
