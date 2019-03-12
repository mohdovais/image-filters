import { h } from 'preact';
import { pure } from '../../util/pure-component';
import './ImageSelection.css';

function prevent(event) {
    event.stopPropagation();
    event.preventDefault();
}

function onDragEnterOrOver(event) {
    prevent(event);
    event.currentTarget.classList.add('highlight');
}

function onDrop(image) {
    const reader = new FileReader();
    reader.onloadend = function() {
        image.src = reader.result;
    };

    return event => {
        prevent(event);
        reader.readAsDataURL(event.dataTransfer.files[0]);
    };
}

function onDragLeave(event) {
    prevent(event);
    event.currentTarget.classList.remove('highlight');
}

function onImageLoad(callback) {
    return event => {
        const image = event.target;
        callback(image);
        URL.revokeObjectURL(image.src);
    };
}

function onFileChange(image) {
    return event => {
        const file = event.target.files[0];
        file && (image.src = URL.createObjectURL(file));
    };
}

function ImageSelection(props) {
    const image = new Image();
    image.onload = onImageLoad(props.onChange);

    return (
        <div
            class="drop-target"
            onDragEnter={onDragEnterOrOver}
            onDragOver={onDragEnterOrOver}
            onDrop={onDrop(image)}
            onDragLeave={onDragLeave}
        >
            Drag &amp; drop or{' '}
            <label>
                click here to select
                <input
                    id="file"
                    type="file"
                    onChange={onFileChange(image)}
                    accept="image/*"
                    hidden
                />
            </label>{' '}
            an image
        </div>
    );
}

export default pure(ImageSelection);
