import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE } from '../actionTypes';
import { addLoader, removeLoader } from './loading';

export const loadFavorites = favorites => ({
    type: LOAD_FAVORITES,
    favorites
})

export const addFavorite = id => ({
    type: ADD_FAVORITE,
    id
});

export const removeFavorite = id => ({
    type: REMOVE_FAVORITE,
    id
});

export const fetchFavoriteReadings = userId => {
    return dispatch => {
        dispatch(addLoader('favoriteReadings'));
        return apiCall('get', `/readings/${userId}/favorites`)
            .then(res => {
                dispatch(loadFavorites(res));
                dispatch(removeLoader());
            })
            .catch(err => {
                dispatch(addError(err.message));
            })
    }
}

// add new favorite
export const markFavorite = id => {
    return (dispatch, getState) => {
        console.log(id);
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('post', `/readings/${id}/favorite/${user_id}`)
            .then(() => dispatch(addFavorite(id)))
            .catch(err => dispatch(addError(err.message)));
    }
}

// remove from favorites
export const unfavorite = id => {
    return (dispatch, getState) => {
        console.log(id);
        let { currentUser } = getState();
        const user_id = currentUser.user.id;
        return apiCall('delete', `/readings/${id}/favorite/${user_id}`)
            .then(() => dispatch(removeFavorite(id)))
            .catch(err => dispatch(addError(err.message)));
    }
}