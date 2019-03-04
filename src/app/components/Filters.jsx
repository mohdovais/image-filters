import { h } from 'preact';
import { pure } from '../../util/pure-component';
import Canvas from './Canvas';
import './Filters.css';

function Button(props) {
    const filter = props.filter;

    if (filter.thumbnail === undefined) {
        return null;
    }

    return (
        <button
            class={props.selected && 'selected'}
            onClick={() => props.onSelect(filter.fn)}
        >
            <span>{filter.label}</span>
            <Canvas image={filter.thumbnail} filter={filter.fn} />
        </button>
    );
}

const PureButton = pure(Button);

function Filters(props) {
    return (
        <div class="filters">
            {props.filters.map(filter => (
                <PureButton
                    key={filter.fn}
                    filter={filter}
                    selected={filter.fn === props.selected}
                    onSelect={props.onSelect}
                />
            ))}
        </div>
    );
}

const PureFilters = pure(Filters);

export default pure(function(props) {
    const filters = props.filters;
    return filters.length === 0 ? null : (
        <PureFilters
            filters={filters}
            selected={props.selected}
            onSelect={props.onSelect}
        />
    );
});
