import { h, Component } from 'preact';

function shallowDiffers(a, b) {
	for (let i in a) if (!(i in b)) return true;
	for (let i in b) if (a[i]!==b[i]) return true;
	return false;
}

export default class FilterSelect extends Component {

    shouldComponentUpdate (props, state) {
        return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
    }

    render(props) {
        return (
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
        );
    }
}
