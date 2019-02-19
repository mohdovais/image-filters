import { h } from 'preact';
import { pure } from '../../util/pure-component.js';

function getImageData(image) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const width = image.width;
    const height = image.height;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0);

    return context.getImageData(0, 0, width, height);
}

function onImageLoad(callback) {
    return event => {
        const image = event.target;
        callback(getImageData(image));
        URL.revokeObjectURL(image.src);
    };
}

function onFileChange(image) {
    return event => {
        const file = event.target.files[0];
        file && (image.src = URL.createObjectURL(file));
    };
}

export default pure(function InputFile(props) {
    const image = new Image();
    image.onload = onImageLoad(props.onChange);
    return <input type="file" onChange={onFileChange(image)} />;
});
