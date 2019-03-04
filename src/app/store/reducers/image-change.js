import getImageData from '../../../util/image-data';

const THUMBNAIL_SIZE = 100;

export function createThumbnail(img) {
    return getImageData(
        img,
        Math.round((img.width * THUMBNAIL_SIZE) / img.height),
        THUMBNAIL_SIZE
    );
}

export default function imageReducer(state, img) {
    const image = getImageData(img);
    const thumbnail = createThumbnail(img);

    return Object.assign({}, state, {
        image,
        thumbnail,
        filter: 'ORIGINAL',
        filters: state.filters.map(filter =>
            Object.assign({}, filter, {
                thumbnail,
            })
        ),
        filteredImage: image,
    });
}