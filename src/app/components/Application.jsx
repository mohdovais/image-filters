import { h, Component } from 'preact';
import ImageSelection from './ImageSelection';
import Canvas from './Canvas';
import Filters from './Filters';
import LoaderMask from './LoaderMask';
import store from '../store/main';
import { IMAGE_CHANGE, FILTER_CHANGE } from '../store/constants';
import './Application.css';

export default class Application extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }

    componentDidMount() {
        store.subscribe(() => this.setState(store.getState()));
    }

    onImageChange(image) {
        store.dispatch({
            type: IMAGE_CHANGE,
            data: image,
        });
    }

    onFilterChange(filter) {
        filter !== store.getState().filter &&
            store.dispatch({
                type: FILTER_CHANGE,
                data: filter,
            });
    }

    render(props, state) {
        return (
            <main>
                <ImageSelection onChange={this.onImageChange} />
                <LoaderMask loading={state.applyingFilter}>
                    <Canvas image={state.filteredImage} />
                </LoaderMask>
                <Filters
                    filters={state.filters}
                    selected={state.filter}
                    onSelect={this.onFilterChange}
                />
            </main>
        );
    }
}
