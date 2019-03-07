import { requestImageFilter } from '../../../util/worker';
import { createThumbnail } from './image-change';
import {
    IMAGE_CHANGE,
    THUMBNAIL_FILTER_DONE,
    FILTER_CHANGE,
    IMAGE_FILTER_DONE,
} from './../constants';

export default store => next => action => {
    const state = store.getState();
    const data = action.data;
    let image;
    switch (action.type) {
        case IMAGE_CHANGE:
            image = createThumbnail(data);
            Promise.all(
                state.filters.map(filter =>
                    requestImageFilter({
                        filter: filter.fn,
                        image,
                    })
                )
            ).then(function(data) {
                next({
                    type: THUMBNAIL_FILTER_DONE,
                    data: state.filters.map((filter, index) => {
                        return Object.assign({}, filter, {
                            thumbnail: data[index],
                        });
                    }),
                });
            });
            break;
        case FILTER_CHANGE:
            setTimeout(function() {
                requestImageFilter({
                    filter: data,
                    image: state.image,
                }).then(data =>
                    next({
                        type: IMAGE_FILTER_DONE,
                        data,
                    })
                );
            });
    }

    next(action);
};
