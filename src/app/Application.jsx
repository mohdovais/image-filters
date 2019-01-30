import { h, Component } from 'preact';
import Form from './Form.jsx';
import Canvas from './Canvas.jsx';
import filters from './../filters.js';

export default class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            selectedFilter: null,
            filters,
        };
        this.onImageChange = this.onImageChange.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    onImageChange(image) {
        this.setState(function(state) {
            return Object.assign({}, state, {
                image,
            });
        });
    }

    onFilterChange(filter) {
        this.setState(function(state) {
            return Object.assign({}, state, {
                selectedFilter: filter,
            });
        });
    }

    render(props, state) {
        //const selectedFilter = state.filters[state.selectedFilter];
        const selectedFilter = state.selectedFilter;
        return (
            <div>
                <Form
                    filters={state.filters}
                    selectedFilter={selectedFilter}
                    onFilterChange={this.onFilterChange}
                    onImageChange={this.onImageChange}
                />
                <Canvas
                    image={state.image}
                    filterFn={selectedFilter}
                />
            </div>
        );
    }
}
