import { h } from 'preact';
import SelectFilters from './form/SelectFilters.jsx';
import InputCustomColor from './form/InputCustomColor.jsx';
import InputThreshold from './form/InputThreshold.jsx';
import InputFile from './form/InputFile.jsx';
import { pure } from '../util/pure-component.js';

function getCustomColor(show, color, onColorChange) {
    return show === true ? (
        <InputCustomColor value={color} onChange={onColorChange} />
    ) : null;
}

export default pure(function Form(props) {
    return (
        <form
            onSubmit={event => event.preventDefault()}
            style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}
        >
            <InputFile onChange={props.onImageChange} />
            <SelectFilters
                value={props.filter}
                onChange={props.onFilterChange}
            />
            {getCustomColor(props.showColor, props.color, props.onColorChange)}
            <InputThreshold
                min={props.thresholdMin}
                max={props.thresholdMax}
                value={props.threshold}
                onChange={props.onThresholdChange}
            />
        </form>
    );
});
