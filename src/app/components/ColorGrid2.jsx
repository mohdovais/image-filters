import { h } from 'preact';
import { pure } from '../../util/pure-component.js';
import { hsl2rgb } from '../../util/hsl2rgb.js';
import { rgb2hex } from '../../util/rgb2hex.js';

import { extractColors } from '../../util/extract-colors';

export default pure(function ColorGrid2(props) {
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                fontFamily: 'monospace',
            }}
        >
            {extractColors(props.image).map(function(hsl) {
                const color = rgb2hex(hsl2rgb(hsl[0], hsl[1], hsl[2]));
                return (
                    <div style={{ padding: 5, backgroundColor: color }}>
                        {hsl[0]}
                    </div>
                );
            })}
        </div>
    );
});
