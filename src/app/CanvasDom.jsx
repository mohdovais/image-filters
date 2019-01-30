import { h, Component } from 'preact';

export default class CanvasDom extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render(props) {
        return (
            <canvas
                ref={props.getRef}
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                }}
            />
        );
    }
}
