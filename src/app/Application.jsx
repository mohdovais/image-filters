import { h, Component } from 'preact';
import Form from './Form.jsx';
import Calculations from './Calculations.jsx';
import Canvas from './Canvas.jsx';

const setState = (me, key) => data =>
    me.setState(state => {
        let newState = {};
        switch (key) {
            case 'filter':
                const filter = data.target.value;
                const isDistance3d = filter === 'distance3d'
                newState.filter = filter;
                newState.threshold = isDistance3d ? 382 : 8;
                newState.thresholdMax = isDistance3d ? 765: 255;
                newState.showColor = isDistance3d;
                break;
            case 'filteredImage':
            case 'image':
                newState[key] = data;
                break;
            default:
                newState[key] = data.target.value;
        }
        return Object.assign({}, state, newState);
    });

export default class Application extends Component {
    constructor(props) {
        super(props);
        const me = this;

        me.state = {
            image: null,
            filter: null,
            filteredImage: null,
            color: '#ffff00',
            showColor: false,
            threshold: 8,
            thresholdMin: 0,
            thresholdMax: 255,
        };

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
