import { NAME } from './constants';

// does created_at get updated whenever a row is updated in mysql?
export const getMostRecentTags = (state) => {
    // give time for tags to load
    if (state && state[NAME]) {
        let tags = Object.values(state[NAME])
                        .sort((a, b) => a.date > b.date)
                        .map(tag => state[NAME][tag.id].id).reverse()
                        .slice(0, 10);
        return tags;
    }
}

export const getTopTags = (state) => {
    if (state && state[NAME]) {
        let tags = Object.values(state[NAME])
                        .sort((a, b) => b.count - a.count)
                        .map(tag => state[NAME][tag.id].id)
                        .slice(0, 10);
        return tags;
    }
}

export const getTagById = (state, id) => {
    if (state && state[NAME]) {
        return state[NAME][id];
    }
}