import { h, Component } from 'preact';

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
        return false; //
    }

    render(props, state) {
        console.log('render form');

        state.image.onload = onImageLoad(props.onImageChange);

        return (
            <form onSubmit={event => event.preventDefault()}>
                <input type="file" onChange={onFileChange(state.image)} />
                <select
                    value={props.selectedFilter}
                    onChange={event => props.onFilterChange(event.target.value)}
                >
                    {Object.keys(props.filters).map(filter => {
                        return (
                            <option value={filter} key={filter}>
                                {props.filters[filter].label}
                            </option>
                        );
                    })}
                </select>
            </form>
        );
    }
}
