import { h } from 'preact';
import { pure } from './../../util/pure-component.js';

export default pure(function SelectFilters(props) {
    return <input type="color" value={props.value} onChange={props.onChange} />;
});
