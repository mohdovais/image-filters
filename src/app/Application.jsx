import { h, Component } from 'preact';
import Form from './Form.jsx';
import Calculations from './Calculations.jsx';
import Canvas from './Canvas.jsx';
import {defaultState, setState} from './state.js';

export default class Application extends Component {
    constructor(props) {
        super(props);
        const me = this;

        me.state = defaultState;
        me.onImageChange = setState(me, 'image');
        me.onFilterChange = setState(me, 'filter');
        me.onColorChange = setState(me, 'color');
        me.onThresholdChange = setState(me, 'threshold');
        me.onFilterImage = setState(me, 'filteredImage');
    }

    render(props, state) {
        const me = this;
        return (
            <div>
                <Form
                    filter={state.filter}
                    color={state.color}
                    showColor={state.showColor}
                    threshold={state.threshold}
                    thresholdMin={state.thresholdMin}
                    thresholdMax={state.thresholdMax}
                    onFilterChange={me.onFilterChange}
                    onImageChange={me.onImageChange}
                    onColorChange={me.onColorChange}
                    onThresholdChange={me.onThresholdChange}
                />
                <Canvas image={state.filteredImage} />
                <Calculations
                    image={state.image}
                    filter={state.filter}
                    color={state.color}
                    threshold={state.threshold}
                    onFilterImage={me.onFilterImage}
                />
            </div>
        );
    }
}
