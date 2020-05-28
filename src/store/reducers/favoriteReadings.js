import { LOAD_FAVORITES } from '../actionTypes';

const favorites = (state=[], action) => {
    switch (action.type) {
        case LOAD_FAVORITES:
            return [...action.favorites];
        default:
            return state;
    }
}

export default favorites;