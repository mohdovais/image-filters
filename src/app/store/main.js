import { createStore, applyMiddleware } from 'redux';
import filters from '../../util/filters';
import imageChangeReducer from './reducers/image-change';
import middleware from './reducers/middleware';

import {
    FILTER_CHANGE,
    IMAGE_CHANGE,
    IMAGE_FILTER_DONE,
    THUMBNAIL_FILTER_DONE,
} from './constants';

const defaultState = {
    image: null,
    filteredImage: null,
    thumbnail: null,
    filter: 'ORIGINAL',
    applyingFilter: false,
    filters,
};

const app = function(state = defaultState, action) {
    const data = action.data;

    switch (action.type) {
        case FILTER_CHANGE:
            return Object.assign({}, state, {
                filter: data,
                applyingFilter: true,
            });
        case IMAGE_CHANGE:
            return imageChangeReducer(state, data);
        case IMAGE_FILTER_DONE:
            return Object.assign({}, state, {
                filteredImage: data,
                applyingFilter: false,
            });
        case THUMBNAIL_FILTER_DONE:
            return Object.assign({}, state, {
                filters: data,
            });
    }

    return state;
};

export default createStore(app, applyMiddleware(middleware));
