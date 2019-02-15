import { h, Component } from 'preact';
import FilterSelect from './FilterSelect.jsx';

function onFileChange(image) {
    return event => {
        const file = event.target.files[0];
        if (file) {
            image.src = URL.createObjectURL(file);
        }
    };
}

function onImageLoad(callback) {
    return event => {
        const img = event.target;
        callback(img);
        URL.revokeObjectURL(img.src);
    };
}

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: new Image(),
        };
    }

    shouldComponentUpdate() {
        //return false; //
    }

    render(props, state) {
        console.log('render form');

        state.image.onload = onImageLoad(props.onImageChange);

        return (
            <form onSubmit={event => event.preventDefault()}>
                <input type="file" onChange={onFileChange(state.image)} />
                <FilterSelect
                    filters={props.filters}
                    selectedFilter={props.selectedFilter}
                    onFilterChange={props.onFilterChange}
                />
                <input type="color" />
                <input type="range" min="0" max="765" />
            </form>
        );
    }
}
