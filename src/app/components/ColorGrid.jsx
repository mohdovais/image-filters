import { h } from 'preact';
import { pure } from '../../util/pure-component.js';
import { hsl2rgb } from '../../util/hsl2rgb.js';
import { rgb2hex } from '../../util/rgb2hex.js';

export default pure(function ColorGrid(props) {
    const count = props.count || 36;
    const unitSize = 360 / count;
    return (
        <div>
            {new Array(count)
                .join('-')
                .split('-')
                .map(function(v, i) {
                    const color = rgb2hex(hsl2rgb(i * unitSize, 1, 0.5));
                    return (
                        <div style={{ backgroundColor: color }}>{color}</div>
                    );
                })}
        </div>
    );
});
