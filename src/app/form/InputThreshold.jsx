import { h } from 'preact';
import { pure } from '../../util/pure-component.js';

export default pure(function InputThreshold(props) {
    return (
        <label>
            Threshold:
            <input
                type="range"
                id="threshold"
                min={props.min}
                max={props.max}
                value={props.value}
                onChange={props.onChange}
            />
            {props.value}
        </label>
    );
});
