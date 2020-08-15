import { NAME } from './constants';

// need to bring created date from db. ID is not most recent
export const getMostRecentTags = (state) => {
    // give time for tags to load
    if (state && state[NAME]) {
        let tags = Object.entries(state[NAME]).map(([key, value]) => state[NAME][key].id).reverse();
        return tags;
    }
}

export const getTagById = (state, id) => {
    if (state && state[NAME]) {
        return state[NAME][id];
    }
}