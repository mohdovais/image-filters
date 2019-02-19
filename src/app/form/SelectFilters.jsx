import { h } from 'preact';
import filters from './../../filters.js';
import { pure } from './../../util/pure-component.js';

export default pure(function SelectFilters(props) {
    return (
        <select
            value={props.value}
            onChange={props.onChange}
        >
            {Object.keys(filters).map(filter => {
                return (
                    <option value={filter} key={filter}>
                        {filters[filter].label}
                    </option>
                );
            })}
        </select>
    );
});
