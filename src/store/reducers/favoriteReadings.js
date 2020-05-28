import { LOAD_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE } from '../actionTypes';

const favorites = (state=[], action) => {
    switch (action.type) {
        case LOAD_FAVORITES:
            return [...action.favorites];
        case ADD_FAVORITE:
            return [state.data.map(reading =>
                        (reading.id === action.id) 
                        ? {...reading, favorite: reading.user_id}
                        : reading)];
        case REMOVE_FAVORITE:
            return [state.data.map(reading =>
                        (reading.id === action.id) 
                        ? {...reading, favorite: null}
                        : reading)]
        default:
            return state;
    }
}

export default favorites;